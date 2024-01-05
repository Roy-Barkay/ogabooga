<script setup lang="ts">
import { useI18nStore } from '@@/repository/I18n'
import { useTranslation } from '@@/hooks/useTranslation'
import TModal from '@@/components/TModal.vue'
import TModalLanguage from '@@/components/TModalLanguage.vue'
import TIcon from './TIcon.vue'

const __ = useTranslation()
const { currentLanguage, I18n_SetLanguage } = useI18nStore()

defineProps<{
  /** اگر این پارامتر مقداردهی شود، متن دکمه نمایش داده نخواهد شد */
  noText?: boolean
}>()

const showModal = ref(false)
const languages = ref([
  { text: 'فارسی', value: 'fa' },
  { text: 'English', value: 'en' },
])

const language = computed({
  get: () => currentLanguage,
  set(language: Language) {
    I18n_SetLanguage(language)
  },
})

</script>

<template>
  <button class="@shadow-chips p-1 rounded-10 h-9 min-w-9 @flex-center" @click="showModal = true">
    <div class="flex justify-between items-center">
      <TIcon class="@text-black-600 s-6 rounded-full shrink-0" src="@icons/tt-language.svg" />
      <p v-if="!noText" class="@text-black-600 @text-subtitle1 ms-2">
        {{ __('language') }}
      </p>
    </div>
  </button>
  <TModal v-model="showModal">
    <TModalLanguage v-model="language" :languages="languages" />
  </TModal>
</template>
