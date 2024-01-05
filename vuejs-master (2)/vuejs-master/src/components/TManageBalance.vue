<script setup lang="ts">
import TInputCurrency from '@@/components/TInputCurrency.vue'
import TSelectButton from '@@/components/TSelectButton.vue'
import TButton from '@@/components/TButton.vue'
import type { Item } from '@@/components/TSelectButton.vue'
import { useVModels } from '@vueuse/core'
import { useTranslation } from '@@/hooks/useTranslation'

const __ = useTranslation()

const props = defineProps<{
  handleSubmit : (e:MouseEvent) => Promise<any>
  balance: string
  userName?: string
  selectItems: Item[]
  mode : 'increase'|'decrease'
  modelValue : number
}>()

const emit = defineEmits([
  'close',
])
const { modelValue, mode } = useVModels(props)

function handleClose() {
  emit('close')
}

</script>

<template>
  <div class="@flex-center w-full">
    <form class="mt-3 relative py-5" @submit.prevent>
      <div class="@text-h2 text-center">
        {{ __('tsitfy.change-balance') }}
      </div>
      <div class="flex justify-between items-center my-5">
        <p class="@text-subtitle1 shrink-0">
          {{ userName }}
        </p>
        <div class="h-1px w-full grow @bg-black-300 mx-3" />
        <div class="@text-subtitle2 text-center shrink-0">
          {{ balance }}
        </div>
      </div>
      <div class="flex justify-center my-6">
        <TSelectButton v-model="mode" :items="selectItems" type="solid" />
      </div>
      <TInputCurrency
        v-model="modelValue"
        class="w-full"
        :label="__('tsitfy.charge-amount')"
      />
      <div class="@flex-center mt-10">
        <TButton
          size="large"
          color="gray"
          :action="handleClose"
          class="me-6"
        >
          {{ __('tsitfy.cancel') }}
        </TButton>

        <TButton
          size="large"
          type="submit"
          :action="handleSubmit"
        >
          {{ __('tsitfy.confirm') }}
        </TButton>
      </div>
    </form>
  </div>
</template>
