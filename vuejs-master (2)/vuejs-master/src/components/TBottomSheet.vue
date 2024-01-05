<script setup lang="ts">
import { useModal } from '@@/hooks/useModal'
import { Browser_Screens } from '@@/repository/Browser'
import { getCssTransform } from '@@/utils'
import { useVModel } from '@vueuse/core'
import TIcon from './TIcon.vue'
import { Ref } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: boolean
  fullHeight?: boolean
  noDrag?: boolean
  noClose?: boolean
  corners?: 'simple' | 'curve'
}>(), {
  corners: 'simple',
})

const slots = useSlots()
const hasSlot = computed(() => slots?.default)

const modelValue = useVModel(props) as Ref<boolean>

const START_DRAG_THRESHOLD = 5
const MINIMUM_MOVE_TO_CLOSE = 20

const animating = ref(false)
const noClose = toRef(props, 'noClose')

const { show } = useModal(modelValue, { noClose })

const element = ref<HTMLDivElement>()
const isDragging = ref(false)
const translateY = ref(0)

const draggable = computed(() => !props.noDrag && !props.fullHeight && !Browser_Screens.sm)

const getTransform = computed(() => {
  if (Browser_Screens.sm) {
    return getCssTransform('translateY(-50%)')
  } else {
    if (props.fullHeight) {
      return getCssTransform('translateY(0)')
    } else {
      return getCssTransform(`translateY(${translateY.value}px)`)
    }
  }
})

function handleDragStart(event: MouseEvent | TouchEvent) {
  if (noClose.value) return
  if (!draggable.value) return

  const start = 'clientY' in event ? event.clientY : event.touches[0].clientY
  const initialHeight = element.value!.offsetHeight
  const maxHeight = Math.min(window.innerHeight, element.value!.offsetHeight)
  const expansibleHeight = maxHeight - initialHeight

  function handleMove(event: MouseEvent | TouchEvent) {
    event.preventDefault()

    const current = 'clientY' in event ? event.clientY : event.touches[0].clientY
    const isDraggingDownside = current - start > START_DRAG_THRESHOLD
    const isDraggingUpside = start - current > START_DRAG_THRESHOLD

    if (isDraggingDownside || isDraggingUpside) {
      isDragging.value = true
    }
    if (isDragging.value) {
      translateY.value = current - start < -expansibleHeight ? -expansibleHeight : current - start
    }
  }

  try {
    document.addEventListener('touchmove', handleMove, { passive: false })
  } catch (err) {
    document.addEventListener('touchmove', handleMove)
  }
  document.addEventListener('mousemove', handleMove)

  function handleDragEnd() {
    if (translateY.value < -MINIMUM_MOVE_TO_CLOSE) {
          element.value!.style.top = element.value!.getBoundingClientRect().top + 'px'
          requestAnimationFrame(() => {
            element.value!.style.top = ''
          })
    } else if (translateY.value > MINIMUM_MOVE_TO_CLOSE) {
      modelValue.value = false
    }
    isDragging.value = false
    translateY.value = 0
    document.removeEventListener('touchmove', handleMove)
    document.removeEventListener('mousemove', handleMove)

    document.removeEventListener('touchend', handleDragEnd)
    document.removeEventListener('mouseup', handleDragEnd)
  }
  document.addEventListener('touchend', handleDragEnd)
  document.addEventListener('mouseup', handleDragEnd)
}

function close() {
  if (noClose.value) return
  modelValue.value = false
}

watch(modelValue, value => {
  if (!value) animating.value = true
})

</script>

<template>
  <Teleport v-if="modelValue || animating" to="body">
    <div>
      <Transition
        appear
        name="fade"
        @after-leave="animating = false"
      >
        <div v-if="modelValue && show" class="bg-black/50 fixed inset-0 @z-backdrop" @click="close" />
      </Transition>
      <Transition appear :name="Browser_Screens.sm ? 'fade' : 'bottom-sheet'">
        <div
          v-show="modelValue && show"
          ref="element"
          class="@bg-black-50 fixed w-full inset-x-0 flex flex-col sm:max-w-400px @z-modal"
          :class="{
            'inset-y-0 h-full rounded-none': fullHeight && !Browser_Screens.sm,
            'bottom-0 max-h-90vh': !fullHeight && !Browser_Screens.sm,
            'top-50% rounded-16px max-h-90vh py-5': Browser_Screens.sm,
            'h-90vh': Browser_Screens.sm && fullHeight,

            'rounded-t-4': hasSlot && props.corners === 'simple',
            'rounded-t-8': hasSlot && props.corners === 'curve',
            'rounded-full': !hasSlot,
          }"
          :style="{ ...getTransform }"
          @touchstart.stop="handleDragStart"
          @mousedown="handleDragStart"
        >
          <div v-if="draggable" class="w-8 h-1 rounded-5px @bg-black-600/50 mt-4 mx-auto shrink-0" />
          <div v-if="$slots.header" class="w-full">
            <slot name="header" />
          </div>
          <button
            v-if="fullHeight"
            class="absolute top-6 start-4 rounded-3 s-11 hover:@bg-black-200 @flex-center"
            @click="modelValue = false"
          >
            <TIcon
              src="@icons/tt-close.svg"
              class="s-7"
            />
          </button>
          <div class="flex flex-col px-1 overflow-auto mt-1 scroll-container h-full">
            <slot />
          </div>
          <div
            v-if="$slots.footer"
            class="w-full @shadow-toasts"
            :class="{
              'rounded-t-4':props.corners === 'simple',
              'rounded-t-8':props.corners === 'curve'}"
          >
            <slot name="footer" />
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>
