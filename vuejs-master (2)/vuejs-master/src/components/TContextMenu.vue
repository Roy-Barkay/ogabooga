<script setup lang="ts">
import { conditionalScope } from '@@/hooks/conditionalScope'
import { useModal } from '@@/hooks/useModal'
import { useEventListener, useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: boolean
  containerClasses?: string
  backdropClasses?: string
  noBackdrop?: boolean
}>()

defineEmits([
  'mouseenter',
  'mouseleave',
  'update:modelValue', // because of vue warning in console
])

const modelValue = useVModel(props, 'modelValue')

const { show } = useModal(modelValue, { visibleParent: true })

const element = ref<HTMLDivElement | null>(null)

const clientX = ref(0)
const clientY = ref(0)

const THRESHOLD = 20

const showBackdrop = computed(() => !props.noBackdrop && modelValue.value && show.value)

function closeMenu() {
  modelValue.value = false
}

function setPosition(e: { clientX: number, clientY: number }) {
  clientX.value = e.clientX
  clientY.value = e.clientY
}

defineExpose({
  setPosition,
})

conditionalScope(modelValue, () => {
  useEventListener('scroll', closeMenu)
})

watchEffect(() => {
  if (!element.value) return

  const { clientWidth, clientHeight } = document.documentElement

  element.value.style.top = clientY.value + 'px'
  element.value.style.left = clientX.value + 'px'

  const diffX = clientWidth - (clientX.value + element.value.clientWidth)
  const diffY = clientHeight - (clientY.value + element.value.clientHeight)

  if (diffX < THRESHOLD) {
    element.value.style.left = clientX.value + diffX - THRESHOLD + 'px'
  }

  if (diffY < THRESHOLD) {
    element.value.style.top = clientY.value + diffY - THRESHOLD + 'px'
  }
})

</script>

<template>
  <Teleport to="body">
    <div>
      <Transition name="fade">
        <div
          v-if="showBackdrop"
          class="fixed @z-tooltip inset-0"
          :class="backdropClasses"
          @click.prevent="closeMenu"
        />
      </Transition>
      <Transition name="fade">
        <div
          v-if="modelValue"
          v-show="show"
          ref="element"
          class=":uno: fixed whitespace-nowrap px-2 @bg-black-50 @z-tooltip @shadow-tooltips rounded-6 p-1"
          :class="containerClasses"
          @mouseenter="$emit('mouseenter')"
          @mouseleave="$emit('mouseleave')"
        >
          <slot />
        </div>
      </Transition>
    </div>
  </Teleport>
</template>
