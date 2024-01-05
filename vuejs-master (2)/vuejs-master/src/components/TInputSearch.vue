<script setup lang="ts">
import { BaseInput_CommonProps } from '@@/components/base/BaseInput.vue'
import BaseInput from './base/BaseInput.vue'

const props = defineProps({
  ...BaseInput_CommonProps,
  modelValue: {
    type: String,
    required: true,
  },
})

const modelValue = defineModel<string>({ required: true })
</script>

<template>
  <BaseInput
    v-bind="props"
    v-model="modelValue"
    :floating-label="false"
    type="search"
    prepend-icon="@icons/tt-search.svg"
  />
</template>

<style>
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
}
</style>
