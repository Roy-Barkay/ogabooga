<script setup lang="ts">
import TIcon from './TIcon.vue'
import { useVModel } from '@vueuse/core'
import { useTranslation } from '@@/hooks/useTranslation'

const __ = useTranslation()

const props = defineProps<{
  modelValue : boolean,
  hasText?: boolean
}>()

const modelValue = useVModel(props)

function onToggle() {
  modelValue.value = !modelValue.value
}
</script>

<template>
  <div class="flex items-center">
    <div v-if="hasText" class="text-center @text-title w-60px">
      {{ modelValue ? __('tsitfy.active') : __('tsitfy.inactive') }}
    </div>
    <TIcon v-if="hasText" src="@icons/vector.svg" class="w-2px mx-3" />
    <button
      type="button"
      class="flex items-center @bg-black-300 h-9 w-64px px-1 rounded-9"
      :class="modelValue ? 'justify-start @bg-success-100' : 'justify-end'"
      @click="onToggle"
    >
      <div v-if="!modelValue" class="@bg-black-600 s-7 rounded-full" />
      <TIcon v-else src="@icons/b-check.svg" class="@bg-success-500 @text-black-50 s-7 left-0 rounded-full" />
    </button>
  </div>
</template>
