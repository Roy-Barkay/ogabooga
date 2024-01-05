<script setup lang="ts">
import TFilePicker from './TFilePicker.vue'
import TButton from './TButton.vue'
import { useTranslation } from '@@/hooks/useTranslation'
import { useVModels } from '@vueuse/core'

const __ = useTranslation()

const props = defineProps<{
  /** عکسی که آپلود میشود */
  file: Blob | undefined
  /** ⁧rounded مودال و دکمه ها چگونه باشد⁩ */
  modalCorners: 'simple' | 'curve'
  /** باز و بسته شدن مودال */
  modelValue: boolean
}>()

const { modelValue, file } = useVModels(props)

/** عکسی که آپلود میشود */
const files = ref<Blob[]>([])

/** اگر عکس از قبل وجود داشت آن را نمایش دهد */
if (file.value) files.value[0] = file.value

/** بستن مودال آپلود عکس */
function closeTFilePicker() {
  modelValue.value = false
}

/** آپلود عکس */
function uploadImage() {
  file.value = files.value[0]
  closeTFilePicker()
}

</script>

<template>
  <div class="px-6 w-full @flex-center flex-col py-4 sm:p-8">
    <h2 class="@text-h2 mb-8 text-center sm:mb-10">
      {{ __('tsitfy.select-picture') }}
    </h2>
    <TFilePicker
      v-model="files"
      :icon="require('@icons/b-document-upload.svg')"
      :title="__('tsitfy.drag-drop-image')"
      type="image"
      :multiple="false"
      class="mx-6"
    />
    <div class="@flex-center w-full mt-48px sm:mt-10">
      <TButton
        style-type="text"
        :btn-corners="modalCorners"
        size="large"
        class="w-full me-4"
        :action="closeTFilePicker"
      >
        {{ __('tsitfy.cancel') }}
      </TButton>
      <TButton
        :btn-corners="modalCorners"
        size="large"
        class="w-full"
        :action="uploadImage"
      >
        {{ __('tsitfy.confirm') }}
      </TButton>
    </div>
  </div>
</template>
