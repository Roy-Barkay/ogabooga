<script setup lang="ts">
import { TDate } from '@@/repository/Date'
import { BaseInput_CommonProps } from '@@/components/base/BaseInput.vue'
import { useVModels } from '@vueuse/core'
import TDateTimePicker from './TDateTimePicker.vue'
import { useTranslation } from '@@/hooks/useTranslation'

const __ = useTranslation()

const props = defineProps({
  ...BaseInput_CommonProps,
  from: {
    type: TDate,
    required: false,
    default: undefined,
  },
  to: {
    type: TDate,
    required: false,
    default: undefined,
  },
  fromInfoText: {
    type: String,
    default: '',
  },
  toInfoText: {
    type: String,
    default: '',
  },
  fromError: {
    type: String,
    default: '',
  },
  toError: {
    type: String,
    default: '',
  },
  fromLabel: {
    type: String,
    default: '',
  },
  toLabel: {
    type: String,
    default: '',
  },
})

const { from, to } = useVModels(props)
const fromLabel = computed(() => props.fromLabel || __('tsitfy.from-date'))
const toLabel = computed(() => props.toLabel || __('tsitfy.to-date'))

</script>

<template>
  <div class="flex">
    <TDateTimePicker
      v-bind="props"
      v-model="from"
      :info-text="fromInfoText"
      :error="fromError"
      class="grow"
      :label="fromLabel"
    />
    <div class="w-2 h-2px @bg-black-600 mx-2 mt-6 shrink-0 sm:mt-27px" />
    <TDateTimePicker
      v-bind="props"
      v-model="to"
      :info-text="toInfoText"
      :error="toError"
      class="grow"
      :label="toLabel"
    />
  </div>
</template>
