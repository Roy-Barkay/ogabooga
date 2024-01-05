<script setup lang="ts">
import { useVModels } from '@vueuse/core'
import TIcon from './TIcon.vue'
import { useModal } from '@@/hooks/useModal'

const props = withDefaults(defineProps<{
  modelValue: boolean
  closeIcon?: boolean
  fixHeight?: boolean
  maxWidth?: number
  noClose?: boolean
  corners?: 'simple' | 'curve'
}>(), {
  maxWidth: 480,
  corners: 'simple',
})

const slots = useSlots()
const hasSlot = computed(() => slots?.default)

/** درحال انیمیت است یا خیر */
const animating = ref(false)

const { modelValue } = useVModels(props)

const noClose = toRef(props, 'noClose')

const { show } = useModal(modelValue, { noClose })

const maxWidthStyle = computed(() => {
  return `${props.maxWidth}px`
})

watch(modelValue, value => {
  if (!value) animating.value = true
})

</script>

<template>
  <teleport v-if="modelValue || animating" to="body">
    <div v-bind="$attrs">
      <transition name="fade" appear @after-leave="animating = false">
        <div
          v-if="modelValue && show"
          class="@bg-black-700/60 fixed inset-0 @z-backdrop"
          @click="modelValue = false"
        />
      </transition>
      <transition
        name="fade-zoom"
        appear
        leave-to-class="scale-75 opacity-0"
        enter-from-class="scale-75 opacity-0"
      >
        <div
          v-show="modelValue && show"
          class="@z-modal fixed flex flex-col mx-auto @bg-black-50 max-h-[calc(100%-5rem)] inset-x-3 sm:inset-x-0 -translate-y-1/2 top-1/2"
          :class="
            {
              'h-[calc(100vh-5rem)]': fixHeight,

              'rounded-6': hasSlot && props.corners === 'simple',
              'rounded-48px': hasSlot && props.corners === 'curve',
              'rounded-full': !hasSlot,
            }"
          :style="{ 'max-width': maxWidthStyle }"
        >
          <div v-if="$slots.header" class="w-full">
            <slot name="header" />
          </div>
          <button
            v-if="closeIcon"
            class="absolute top-6 start-4 s-11 hover:@bg-black-200 @flex-center"
            :class="
              {
                'rounded-3 sm:rounded-4': props.corners === 'simple',
                'rounded-full': props.corners === 'curve',
              }"
            @click="modelValue = false"
          >
            <TIcon
              src="@icons/tt-close.svg"
              class="block w-full s-7"
            />
          </button>
          <div
            class="overflow-y-scroll w-full grow flex flex-col items-center h-full scroll-container"
          >
            <slot />
          </div>
          <div
            v-if="$slots.footer"
            class="w-full @shadow-toasts"
            :class="{
              'rounded-6':props.corners === 'simple',
              'rounded-48px':props.corners === 'curve'}"
          >
            <slot name="footer" />
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>
