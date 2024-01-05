<script setup lang="ts">
import { BaseInput_CommonProps } from '@@/components/base/BaseInput.vue'
import BaseInput from './base/BaseInput.vue'

const props = defineProps({
  ...BaseInput_CommonProps,
})

const emit = defineEmits<{
  (event: 'paste', payload: ClipboardEvent): void
}>()

const modelValue = defineModel<string | number | bigint>({ required: false })

</script>

<template>
  <BaseInput v-bind="props" v-model="modelValue" @paste="emit('paste', $event)" />
</template>
