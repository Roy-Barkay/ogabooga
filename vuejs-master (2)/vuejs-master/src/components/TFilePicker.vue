<script setup lang="ts">
import TIcon from './TIcon.vue'
import { useDropZone, useVModel } from '@vueuse/core'
import { summerizeFileSize } from '@@/utils/index'
import { useTranslation } from '@@/hooks/useTranslation'

const __ = useTranslation()

const props = withDefaults(defineProps<{
  modelValue: Blob[]
  icon?: string
  title?: string
  description?: string
  type?: 'file' | 'image' | 'both'
  multiple?: boolean
  sizeLimitDescription?: string
}>(), {
  icon: '',
  title: '',
  description: '',
  type: 'both',
  sizeLimitDescription: '',
  multiple: true,
})

const modelValue = useVModel(props, 'modelValue')

const dropZoneRef = ref<HTMLDivElement>()

const acceptType = computed(() => {
  if (props.type === 'file') {
    return '.pdf, .zip, .xlsx, .xls'
  }
  if (props.type === 'image') {
    return 'image/*'
  }
  return '.pdf, .xls, .xlsx, .zip, image/*'
})
const { isOverDropZone } = useDropZone(dropZoneRef)

const dropZoneBorderClass = computed(() => {
  if (isOverDropZone.value) return '@border-primary-500 border-dashed'
  return '@border-black-500'
})

function handleDrop(e: DragEvent) {
  if (e.dataTransfer!.items) {
    let dropedFiles = Array.from(e.dataTransfer!.items)
      .filter(item => item.kind === 'file')
      .map(item => item.getAsFile())
      .filter(Boolean)

    if (props.type === 'image') {
      dropedFiles = dropedFiles.filter(file => file && file.type.startsWith('image/'))
    }

    if (!props.multiple) modelValue.value = [dropedFiles[0] as File]
    else modelValue.value.push(...dropedFiles as File[])
  }
}

function handleFileChange(e: Event) {
  const eventTarget = e.target as HTMLInputElement
  let files = Array.from(eventTarget.files || [])
  if (!files.length) return
  if (props.type === 'image') {
    files = files.filter(file => file.type.startsWith('image/'))
  }

  if (props.multiple) modelValue.value.push(...files)
  else modelValue.value = [files[0]]
}

function deleteFile(index: number) {
  modelValue.value.splice(index, 1)
}

function getImageSrc(index: number) {
  if (!modelValue.value[index]) return
  return URL.createObjectURL(modelValue.value[index])
}

function getFileType(index: number) {
  if (!modelValue.value[index]) return
  if (modelValue.value[index].type.startsWith('image/')) return 'image'
  return 'file'
}

</script>

<template>
  <div v-bind="$attrs" class=":uno: w-full">
    <label
      ref="dropZoneRef"
      :class="dropZoneBorderClass"
      class="w-full border-2 border-dashed rounded-8 px-5 @flex-center flex-col cursor-pointer"
      @drop.prevent="handleDrop"
    >
      <TIcon
        :src="icon"
        class="s-88px @text-primary-500 shrink-0 mx-auto sm:mt-6"
      />
      <p class="text-center @text-title mt-17px sm:mt-7px">{{ props.title }}</p>

      <div class="@flex-center w-full @text-body @text-black-500 mt-2">
        <div class="h-1px @bg-black-500 w-0 w-55px" />
        <p class="mx-4">{{ __('tsitfy.or') }}</p>
        <div class="h-1px @bg-black-500 w-0 w-55px" />
      </div>

      <p class="@text-title @text-primary-500 w-full text-center mt-4 mb-1">
        {{ props.description || __('tsitfy.select-file') }}
      </p>
      <p class="text-center @text-subtitle1 @text-black-500 mb-4 sm:mb-6">
        {{ props.sizeLimitDescription }}
      </p>
      <input
        class="hidden"
        type="file"
        :multiple="multiple"
        :accept="acceptType"
        @change="handleFileChange"
      >
    </label>

    <template v-if="modelValue.length">
      <div class="min-w-0 w-full border-3 @border-black-200 rounded-6 p-4 mt-4 sm:mt-6 grid grid-cols-1 gap-y-4">
        <div
          v-for="file, index in modelValue"
          :key="index"
          class="flex items-center min-w-0"
        >
          <img v-if="getFileType(index) === 'image'" :src="getImageSrc(index)" class="s-48px sm:s-56px rounded-3 shrink-0 object-cover">
          <div v-else-if="getFileType(index) === 'file'" class="s-48px sm:s-56px @flex-center rounded-3 shrink-0 @bg-black-200">
            <TIcon src="@@/assets/icons/b-document-2.svg" class="s-6 @text-black-600" />
          </div>
          <div class="grow min-w-0 ps-3">
            <div class="truncate text-center w-full @text-subtitle2 @text-black-600 text-start">
              {{ (file as File).name }}
            </div>
            <div class="@text-subtitle1 @text-black-500 @border-black-500 dir-ltr text-start">
              {{ summerizeFileSize(file.size) }}
            </div>
          </div>
          <button class="s-6 sm:s-7 @text-error-500 shrink-0 ms-4" @click="deleteFile(index)">
            <TIcon src="@@/assets/icons/tt-delete.svg" />
          </button>
        </div>
      </div>
    </template>
  </div>
</template>
