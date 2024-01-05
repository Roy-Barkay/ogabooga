<script setup lang="ts">
import TInputCurrency from '@@/components/TInputCurrency.vue'
import TButton from '@@/components/TButton.vue'
import { currencySeperator } from '@@/utils'
import { useVModel } from '@vueuse/core'
import TChips from './TChips.vue'
import { useTranslation } from '@@/hooks/useTranslation'

const __ = useTranslation()

const props = defineProps<{
  handleSubmit: (e:MouseEvent) => Promise<any>
  modelValue: number
}>()

const TAX = 9
const modelValue = useVModel(props)

const finalTax = computed(() => {
  return (Number(modelValue.value) * TAX / 100)
})

const finalTaxString = computed(() => {
  return currencySeperator(finalTax.value)
})

const finalAmount = computed(() => {
  return currencySeperator(finalTax.value + Number(modelValue.value))
})

</script>

<template>
  <div class="@flex-center w-full">
    <div class="mt-3 relative py-5" @submit.prevent>
      <div class="@text-h2 text-center mb-4">
        {{ __('tsitfy.add-balance') }}
      </div>
      <TInputCurrency
        v-model="modelValue"
        class="w-full"
        :label="__('tsitfy.charge-amount')"
      />
      <div class="flex items-center justify-between my-3 w-full">
        <TChips
          class="px-6"
          type="input"
          title="100000"
          @click="modelValue = 100000"
        />
        <TChips
          class="px-6"
          type="input"
          title="200000"
          @click="modelValue = 200000"
        />
        <TChips
          class="px-6"
          type="input"
          title="300000"
          @click="modelValue = 300000"
        />
      </div>

      <div class="flex items-center justify-between my-3 w-full mt-6">
        <p class="@text-subtitle1 @text-black-600 shrink-0">
          {{ __('tsitfy.VAT') }}
        </p>
        <div class="h-1px w-full grow @bg-black-300 mx-3" />
        <p class="@text-subtitle1 @text-black-600 shrink-0">
          {{ finalTaxString }} {{ __('tsitfy.rial') }}
        </p>
      </div>
      <div class="flex items-center justify-between my-3 w-full">
        <p class="@text-subtitle1 @text-secondary-700 shrink-0">
          {{ __('tsitfy.final-amount') }}
        </p>
        <div class="h-1px w-full grow @bg-secondary-100 mx-3" />
        <div class="@bg-secondary-100 rounded-3 p-1 @text-secondary-700 @text-subtitle1 shrink-0">
          {{ finalAmount }} {{ __('tsitfy.rial') }}
        </div>
      </div>
      <TButton
        class="mx-auto mt-7"
        size="large"
        :action="handleSubmit"
      >
        {{ __('tsitfy.pay') }}
      </TButton>
    </div>
  </div>
</template>
