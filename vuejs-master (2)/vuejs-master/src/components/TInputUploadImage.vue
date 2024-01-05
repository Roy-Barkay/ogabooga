<script setup lang="ts">
import TIcon from './TIcon.vue'
import TModal from './TModal.vue'
import { useVModel } from '@vueuse/core'
import ModalSelectImage from './ModalSelectImage.vue'

const props = withDefaults(defineProps<{
  /** آدرس آیکونی که قبل از آپلود تصویر نمایش داده میشود */
  iconSrc?: string
  /** تایتلی که قبل از آپلود تصویر نمایش داده میشود */
  title?: string
  /** عکسی که آپلود میشود */
  modelValue: Blob | undefined
  /** ⁧rounded مودال و دکمه ها چگونه باشد⁩ */
  modalCorners?: 'simple' | 'curve'
}>(), {
  iconSrc: require('@icons/image-add.svg') as string,
  modalCorners: 'simple',
  title: '',
})

const modelValue = useVModel(props, 'modelValue')

/** آیا مودال آپلود عکس باز است؟ */
const isTFilePickerOpen = ref(false)

/** باز کردن مودال آپلود عکس */
function openTFilePicker() {
  isTFilePickerOpen.value = true
}

/** گرفتن آدرس عکس برای نمایش بعد از بسته شدن مودال */
function getImageSrc() {
  if (!modelValue.value) return
  return URL.createObjectURL(modelValue.value)
}

</script>

<template>
  <div class=":uno: s-132px @flex-center cursor-pointer relative" @click="openTFilePicker">
    <img v-if="modelValue" :src="getImageSrc()" class="h-full rounded-6">
    <div v-else class="@bg-black-700/6 s-full @flex-center flex-col rounded-6 @text-black-600">
      <TIcon :src="iconSrc" class="s-56px" />
      <span class="@text-title mt-3">{{ title }}</span>
    </div>
    <TIcon v-if="modelValue" src="@icons/tt-edit.svg" class="s-7 p-1 @bg-black-600 @text-black-50 rounded-3 absolute bottom-0 right-0 border-3 @border-black-50" />
    <TModal v-model="isTFilePickerOpen" :max-width="550" :corners="modalCorners">
      <ModalSelectImage v-model:file="modelValue" v-model:modelValue="isTFilePickerOpen" :modal-corners="modalCorners" />
    </TModal>
  </div>
</template>
