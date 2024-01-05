<script setup lang="ts">
import { BaseInput_CommonProps } from '@@/components/base/BaseInput.vue'
import BaseInput from './base/BaseInput.vue'
import TModal from './TModal.vue'
import TIcon from './TIcon.vue'
import TInputSearch from '@@/components/TInputSearch.vue'
import { useTranslation } from '@@/hooks/useTranslation'
import { PropType } from 'vue'

const __ = useTranslation()

export type Option = {
  text: string
  value: string
  icon?: string
}

const props = defineProps({
  ...BaseInput_CommonProps,
  options: {
    type: Array as PropType<Option[]>,
    required: true,
  },
  /** آیا اینپوت سرچ داشته باشد؟ */
  searchable: {
    type: Boolean,
    default: false,
  },
  /** ردیوس مودال چطوری باشه */
  corners: {
    type: String as PropType<'curve' | 'simple'>,
    default: 'simple',
  },
})

const modelValue = defineModel<Option | undefined | null>({ required: false })

const isMenuOpen = ref(false)

/** کلمه سرچ شده */
const searchText = ref('')

function handleSelect(option: Option) {
  modelValue.value = option
  isMenuOpen.value = false
}

function isActiveOption(option: Option) {
  return modelValue.value?.value === option.value
}

/** سرچ کردن کلمه */
function searchWord(source: string, searchWord: string) {
  return source.toLowerCase().includes(searchWord.toLowerCase())
}

/** لیست فیلتر شده براساس کلمه سرچ شده */
const filtered = computed(() => props.options.filter(option => searchWord(option.text, searchText.value)))

/** لیست فیلتر ها خالی شده؟ */
const isEmptyList = computed(() => !filtered.value.length)

/** هنگام بسته شدن مودال کلمه سرچ شده خالی شود */
watch(isMenuOpen, () => {
  searchText.value = ''
})

</script>

<template>
  <BaseInput
    v-bind="$attrs"
    :label="props.label"
    :model-value="modelValue?.text || ''"
    readonly
    cursor-pointer
    :show-reset-button="false"
    :append-icon="require('@icons/tt-arrow-down.svg')"
    :prepend-icon="modelValue?.icon"
    :disabled="props.disabled"
    @click="isMenuOpen = true"
  />
  <TModal
    v-if="!disabled"
    v-model="isMenuOpen"
    :corners="corners"
    close-icon
    no-drag
  >
    <template #header>
      <h2 class="@text-h2 text-center my-4 sm:mt-8 sm:mb-6">
        {{ label }}
      </h2>
    </template>
    <div class="w-full px-6 sm:px-8 pb-6 sm:pb-8">
      <TInputSearch
        v-if="searchable"
        v-model="searchText"
        :label="__('tsitfy.search')"
        class="mb-6 sm:mb-5"
      />
      <div v-if="isEmptyList" class="@flex-center flex-col">
        <img src="@@/assets/images/notFound.png" class="s-160px sm:s-230px mb-3 sm:mb-6">
        <span class="@text-body @text-black-600">
          {{ __('tsitfy.not-found') }}
        </span>
      </div>
      <ul v-else>
        <li
          v-for="option in filtered"
          :key="option.value"
          class="cursor-pointer py-2 px-5 @text-body flex items-center my-2 border-2"
          :class="[
            isActiveOption(option)? '@border-tertiary-500 @bg-tertiary-100' : 'hover:@bg-black-200 border-transparent',
            corners === 'simple'? 'rounded-12px' : 'rounded-7'
          ]"
          dir="auto"
          @click="handleSelect(option)"
        >
          <TIcon v-if="option.icon" :src="option.icon" class="s-7 me-2 @text-black-600" />
          <span class="@text-black-600"> {{ option.text }} </span>
        </li>
      </ul>
    </div>
  </TModal>
</template>
