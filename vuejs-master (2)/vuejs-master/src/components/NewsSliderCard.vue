<script lang="ts">

export type NewsCardType = {
  /** عنوان خبر */
  title: string
  /** عنوان مودال خبر */
  modalTitle: string
  /** توضیحات مودال خبر */
  modalDescription: string
  /** تاریخ */
  date: string
  /** ردیوس مودال خبر */
  rounded: 'curve' | 'simple'
}

</script>

<script setup lang="ts">
import TButton from './TButton.vue'
import TIcon from './TIcon.vue'
import TModal from './TModal.vue'
import { useTranslation } from '@@/hooks/useTranslation'
import { useVModel } from '@vueuse/core'

const __ = useTranslation()

const props = defineProps<{
  /** اطلاعات خبر */
  news: NewsCardType
  /** حرکت کردن اسلایدر */
  modelValue: number
}>()

const modelValue = useVModel(props)

/** آیا مودال خبر باز است؟ */
const isNewsModalOpen = ref(false)

/** باز کردن مودال خبر */
function openNewsModal() {
  modelValue.value = 0
  isNewsModalOpen.value = true
}

/** بستن مودال خبر */
function closeNewsModal() {
  isNewsModalOpen.value = false
}

/** اگر مودال بسته شد دوباره اسلایدر حرکت کند */
watch(isNewsModalOpen, value => {
  if (!value) modelValue.value = 2500
})

</script>

<template>
  <button
    class="@flex-center h-44px sm:h-56px truncate max-w-90%"
    @click="openNewsModal"
  >
    <TIcon
      src="@icons/b-megaphone.svg"
      class="s-6 sm:s-7 shrink-0 @text-secondary-500"
    />
    <h2 class="@text-body ms-3 truncate">
      {{ news.title }}
    </h2>
  </button>
  <TModal v-model="isNewsModalOpen" :corners="news.rounded" :max-width="500">
    <template #header>
      <h2 class="mt-4 @text-h2 px-6 text-center sm:mt-8">
        {{ news.modalTitle }}
      </h2>
    </template>
    <div class="px-6 sm:px-8 h-210px flex flex-col w-full">
      <span class="@text-body mt-3 text-center">{{ news.date }}</span>
      <div class="@text-body my-4 leading-200%">
        {{ news.modalDescription }}
      </div>
    </div>
    <template #footer>
      <div class="p-6 sm:px-8">
        <TButton
          style-type="outlined"
          size="large"
          :btn-corners="news.rounded"
          class="w-full"
          :action="closeNewsModal"
        >
          {{ __('tsitfy.i-understood') }}
        </TButton>
      </div>
    </template>
  </TModal>
</template>
