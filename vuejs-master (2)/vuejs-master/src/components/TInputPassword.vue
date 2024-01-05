<script setup lang="ts">
import { BaseInput_CommonProps } from '@@/components/base/BaseInput.vue'
import BaseInput from './base/BaseInput.vue'
import ShowIcon from '@icons/tt-show.svg'
import HideIcon from '@icons/tt-hide.svg'

const props = defineProps({
  ...BaseInput_CommonProps,
})

const modelValue = defineModel<string>({ required: true })
const passwordType = ref<'password' | 'text'>('password')

const prependIcon = computed(() => passwordType.value === 'password' ? ShowIcon : HideIcon)

function toggleIputType() {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}

</script>

<template>
  <BaseInput
    ref="input"
    v-bind="props"
    v-model="modelValue"
    floating-label
    :label="label"
    :info-text="infoText"
    :type="passwordType"
    :prepend-icon="prependIcon"
    :prepend-icon-action="toggleIputType"
  />
</template>
