<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import TIcon from './TIcon.vue'
import { Browser_Screens } from '@@/repository/Browser'
import { useTranslation } from '@@/hooks/useTranslation'

const __ = useTranslation()

type Item = {
  text: string
  value: string
}

const props = defineProps<{
  languages: Item[]
  modelValue: string
}>()

const modelValue = useVModel(props)

</script>

<template>
  <div class="w-full my-4 px-3">
    <h2 class="@text-h2 text-center mb-5">
      {{ __('tsitfy.select-language') }}
    </h2>
    <button
      v-for="language in languages"
      :key="language.value"
      class="flex justify-between items-center @text-body rounded-8 w-full mt-2 pe-4 ps-5"
      :class="[
        { '@bg-tertiary-100 @text-tertiary-500 border-2px @border-tertiary-500': modelValue === language.value },
        Browser_Screens.sm ? 'h-13' : 'h-12'
      ]"
      @click="modelValue = language.value"
    >
      <span>
        {{ language.text }}
      </span>
      <TIcon v-if="modelValue === language.value" src="@@/assets/icons/b-check.svg" class="s-7" />
    </button>
  </div>
</template>
