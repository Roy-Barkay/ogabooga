<script setup lang="ts">
import { BaseInput_CommonProps } from '@@/components/base/BaseInput.vue'
import BaseInput from './base/BaseInput.vue'

const props = defineProps({
  ...BaseInput_CommonProps,
  rows: {
    type: Number,
    default: 4,
  },
})

const emit = defineEmits<{
  (event: 'paste', payload: ClipboardEvent): void
}>()

const modelValue = defineModel<string | number>({ required: false })

</script>

<template>
  <BaseInput
    v-bind="props"
    v-model="modelValue"
    type="textarea"
    @paste="emit('paste', $event)"
  />
</template>
