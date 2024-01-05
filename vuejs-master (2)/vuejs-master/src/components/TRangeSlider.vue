<script lang="ts" setup>
import { convertTimestampToTime } from '@@/utils'

const slider = ref(null as HTMLDivElement | null)
const touchLeft = ref(null as HTMLDivElement | null)
const touchRight = ref(null as HTMLDivElement | null)
const lineSpan = ref(null as HTMLSpanElement | null)

const props = withDefaults(defineProps<{
  min: number,
  max: number,
  step: number,
  minValue: number,
  maxValue: number,
  color?: 'primary' | 'secondary' | 'tertiary',
  type?: 'date' | 'number',
}>(), { color: 'primary', type: 'number' })

const emit = defineEmits([
  'update:min-value',
  'update:max-value',
])

const NORMALIZE_FACT = 26
let startX = 0
let x = 0
let maxX = 0
let initialValue = 0
let selectedTouch: HTMLElement | null = null

onMounted(() => {
  init()
  window.addEventListener('resize', init)
})

onUnmounted(() => {
  removeListeners()
  window.removeEventListener('resize', init)
})

function init() {
  reset()

  maxX = slider.value!.offsetWidth - touchRight.value!.offsetWidth
  initialValue = (lineSpan.value!.offsetWidth - NORMALIZE_FACT)
  setDefaultMinValue()
  setDefaultMaxValue()

  touchLeft.value!.addEventListener('mousedown', onStart)
  touchRight.value!.addEventListener('mousedown', onStart)
  touchLeft.value!.addEventListener('touchstart', onStart)
  touchRight.value!.addEventListener('touchstart', onStart)
}

function reset() {
  touchLeft.value!.style.left = '0px'
  touchRight.value!.style.left = `${slider.value!.offsetWidth - touchLeft.value!.offsetWidth}px`

  lineSpan.value!.style.marginLeft = '0px'
  lineSpan.value!.style.width = `${slider.value!.offsetWidth - touchLeft.value!.offsetWidth}px`
  startX = 0
  x = 0
}

function setDefaultMinValue() {
  const ratio = (props.minValue - props.min) / (props.max - props.min)
  touchLeft.value!.style.left = `${Math.ceil(ratio * (slider.value!.offsetWidth - (touchLeft.value!.offsetWidth + NORMALIZE_FACT)))}px`
  lineSpan.value!.style.marginLeft = `${touchLeft.value!.offsetLeft}px`
  lineSpan.value!.style.width = `${touchRight.value!.offsetLeft - touchLeft.value!.offsetLeft}px`
}

function setDefaultMaxValue() {
  const ratio = (props.maxValue - props.min) / (props.max - props.min)
  touchRight.value!.style.left = `${Math.ceil(ratio * (slider.value!.offsetWidth - (touchLeft.value!.offsetWidth + NORMALIZE_FACT)) + NORMALIZE_FACT)}px`
  lineSpan.value!.style.marginLeft = `${touchLeft.value!.offsetLeft}px`
  lineSpan.value!.style.width = `${touchRight.value!.offsetLeft - touchLeft.value!.offsetLeft}px`
}

function onStart(this: HTMLDivElement, event: MouseEvent | TouchEvent) {
  event.preventDefault()

  if (this === touchLeft.value!) {
    x = touchLeft.value!.offsetLeft
  } else {
    x = touchRight.value!.offsetLeft
  }

  if ('touches' in event) {
    startX = event.touches[0].pageX - x
  } else {
    startX = event.pageX - x
  }
  selectedTouch = this
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onStop)
  document.addEventListener('touchmove', onMove)
  document.addEventListener('touchend', onStop)
}

function onMove(event: MouseEvent | TouchEvent) {
  if ('touches' in event) {
    x = event.touches[0].pageX - startX
  } else {
    x = event.pageX - startX
  }

  if (selectedTouch === touchLeft.value) {
    if (x > (touchRight.value!.offsetLeft - selectedTouch!.offsetWidth + 10)) {
      x = (touchRight.value!.offsetLeft - selectedTouch!.offsetWidth + 10)
    } else if (x < 0) {
      x = 0
    }

    selectedTouch!.style.left = `${x}px`
  } else if (selectedTouch === touchRight.value) {
    if (x < (touchLeft.value!.offsetLeft + touchLeft.value!.offsetWidth - 10)) {
      x = (touchLeft.value!.offsetLeft + touchLeft.value!.offsetWidth - 10)
    } else if (x > maxX) {
      x = maxX
    }
    selectedTouch!.style.left = `${x}px`
  }

  lineSpan.value!.style.marginLeft = `${touchLeft.value!.offsetLeft}px`
  lineSpan.value!.style.width = `${touchRight.value!.offsetLeft - touchLeft.value!.offsetLeft}px`

  calculateValue()
}

function onStop() {
  removeListeners()
  selectedTouch = null

  calculateValue()
}

function calculateValue() {
  const newValue = (lineSpan.value!.offsetWidth - NORMALIZE_FACT) / initialValue

  let multi
  if (selectedTouch === touchLeft.value) {
    multi = Math.floor((((lineSpan.value!.offsetLeft / initialValue) * (props.max - props.min) + props.min) / props.step))
    emit('update:min-value', props.step * multi)
  } else if (selectedTouch === touchRight.value) {
    multi = Math.floor(((((lineSpan.value!.offsetLeft / initialValue) + newValue) * (props.max - props.min) + props.min) / props.step))
    emit('update:max-value', props.step * multi)
  }
}

function removeListeners() {
  document.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseup', onStop)
  document.removeEventListener('touchmove', onMove)
  document.removeEventListener('touchend', onStop)
}
</script>

<template>
  <div class="w-full" dir="ltr">
    <div
      ref="slider"
      class="relative w-full h-9 select-none"
    >
      <div class="absolute w-[calc(100%-36px)] left-18px top-4 h-1 rounded-1 @bg-black-300 overflow-hidden">
        <span
          ref="lineSpan"
          class="block h-full w-0"
          :class="{
            '@bg-primary-500': props.color === 'primary',
            '@bg-secondary-500': props.color === 'secondary',
            '@bg-tertiary-500': props.color === 'tertiary'}"
        />
      </div>
      <div
        ref="touchLeft"
        class="absolute w-9 h-9 p-6px"
      >
        <span
          class="block w-full h-full rounded-50% border-3px border-solid @bg-black-300"
          :class="{
            '@border-primary-500': props.color === 'primary',
            '@border-secondary-500': props.color === 'secondary',
            '@border-tertiary-500': props.color === 'tertiary'}"
        />
        <span
          class="value absolute left-1/2 -translate-x-1/2 font-extrabold"
          :class="{
            '@text-primary-500': props.color === 'primary',
            '@text-secondary-500': props.color === 'secondary',
            '@text-tertiary-500': props.color === 'tertiary'}"
        >
          {{ props.type === 'number' ? minValue : convertTimestampToTime(minValue) }}
        </span>
      </div>
      <div
        ref="touchRight"
        class="block absolute w-9 h-9 p-6px"
      >
        <span
          class="block w-full h-full rounded-50% border-3px border-solid @bg-black-300"
          :class="{
            '@border-primary-500': props.color === 'primary',
            '@border-secondary-500': props.color === 'secondary',
            '@border-tertiary-500': props.color === 'tertiary'}"
        />
        <span
          class="absolute left-1/2 -translate-x-1/2 font-extrabold"
          :class="{
            '@text-primary-500': props.color === 'primary',
            '@text-secondary-500': props.color === 'secondary',
            '@text-tertiary-500': props.color === 'tertiary'}"
        >
          {{ props.type === 'number' ? maxValue : convertTimestampToTime(maxValue) }}
        </span>
      </div>
    </div>
  </div>
</template>
