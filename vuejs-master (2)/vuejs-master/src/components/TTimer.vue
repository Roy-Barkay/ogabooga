<script setup lang="ts">
import { convertIntToTimeString } from '../utils'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: number
}>()

const timer = ref()
const modelValue = useVModel(props)

onMounted(() => {
  timer.value = setInterval(() => {
    modelValue.value--
  }, 1000)
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})

watch(modelValue, () => {
  if (modelValue.value < 0) {
    clearInterval(timer.value)
  }
})

</script>

<template>
  <p class="tabular-nums">
    {{ convertIntToTimeString(modelValue) }}
  </p>
</template>
