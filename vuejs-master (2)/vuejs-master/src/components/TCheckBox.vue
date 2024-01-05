<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import TIcon from './TIcon.vue'

const slots = useSlots()

const props = defineProps<{
  /** آیا چک باکس فعال است یا نه؟ */
  modelValue: boolean
  /** هاور کل چک باکس */
  hover?: boolean
}>()

const modelValue = useVModel(props)

/** چک باکس اسلات دارد؟ */
const hasSlot = computed(() => slots?.default)

/** فعال و غیر فعال شدن چک باکس */
function toggle() {
  modelValue.value = !modelValue.value
}
</script>

<template>
  <div
    class="flex items-center group rounded-4 cursor-pointer select-none"
    :class="{ 'hover:@bg-black-200 check-box-inside p-3': hover }"
    @click="toggle"
  >
    <div class="relative me-3">
      <div
        class="s-5 sm:s-6 rounded-2 sm:rounded-9px check-box-inside"
        :class="modelValue ? 'border-10 sm:border-12 @border-primary-500 check-box-ease' : 'border-2 @border-black-600 group-hover:border-3'"
      />
      <TIcon
        v-if="modelValue"
        :src="require('@@/assets/icons/tt-check.svg')"
        class="s-3 sm:s-4 @text-black-50 absolute top-1/2 -translate-y-50% start-1"
      />
    </div>
    <span
      v-if="hasSlot"
      class=":uno: @text-body"
      :class="modelValue ? '@text-primary-600' : '@text-black-600'"
    >
      <slot name="default" />
    </span>
  </div>
</template>
