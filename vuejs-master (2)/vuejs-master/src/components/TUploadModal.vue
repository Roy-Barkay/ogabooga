<script setup lang="ts">
import TButton from './TButton.vue'
import TIcon from './TIcon.vue'
import TLoading from './TLoading.vue'
import TInputText from '@@/components/TInputText.vue'
import { useVModels } from '@vueuse/core'
import { useTranslation } from '@@/hooks/useTranslation'

const __ = useTranslation()

const selectedFile = ref<File | null>()
const SID = ref('')
const loading = ref(false)
const mode = ref<'address' | 'upload'>('upload')
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const { modelValue } = useVModels(props)

const emit = defineEmits<{
  (event: 'confirm', payload: Record<'SID' | 'fileName', string>): void
  (event: 'cancel'): void
}>()

function handleUploadDrop(e: DragEvent) {
  e.preventDefault()
  if (e.dataTransfer!.items && !selectedFile.value) {
    for (let i = 0; i < e.dataTransfer!.items.length; i++) {
      if (e.dataTransfer!.items[i].kind === 'file') {
        selectedFile.value = e.dataTransfer!.items[i].getAsFile()
        break
      }
    }
  }
}

function handleDragOver(e: DragEvent) {
  e.preventDefault()
}

function handleUpload() {
  // upload file
}

function handleFileChange(e: Event) {
  const eventTarget = e.target as HTMLInputElement
  const files = eventTarget.files
  if (!files?.length) return
  selectedFile.value = files[0]
}

function deleteFile() {
  selectedFile.value = null
}

watch(selectedFile, value => {
  if (value) {
    loading.value = true

    setTimeout(() => {
      loading.value = false
    }, 3000)
    console.log('value changed')
  }
})
</script>

<template>
  <p class="@text-h2 mb-7">
    {{ __('tsitfy.select-picture') }}
  </p>
  <div class="sm:@flex-center w-90% sm:w-80 sm:me-5">
    <div class=" me-6">
      <TIcon
        v-if="mode === 'upload'"
        :src="require('@icons/b-check-mark.svg')"
        class="@text-primary-500 w-7 shrink-0 hidden sm:flex"
      />
      <TIcon
        v-else
        :src="require('@icons/b-circle.svg')"
        class="@text-black-600 w-7 shrink-0 cursor-pointer hidden sm:flex"
        @click="mode = 'upload'"
      />
    </div>
    <div class="grow">
      <label
        id="upload_dropzone"
        for="upload"
        class="w-full overflow-x-hidden h-42 sm:h-58 w-80 border-2 border-dashed @border-black-500
         rounded-8 @bg-black-700/4 px-3 flex flex-col justify-center items-center cursor-pointer min-w-0"
        @drop.prevent="handleUploadDrop($event)"
        @dragover="handleDragOver($event)"
        @click="handleUpload()"
      >
        <template v-if="!selectedFile">
          <TIcon
            :src="require('@icons/b-picture.svg')"
            class="w-18 @text-secondary-500 cursor-pointer shrink-0"
          />
          <p class="text-center @text-title mt-2 hidden sm:block mt-2">تصویر مورد نظر را بکشید و اینجا رها کنید</p>

          <div class="@flex-center hidden sm:flex w-full @text-body @text-black-500 mt-2">
            <div class="h-1px @bg-black-500 grow" />
            <p class="mx-4">یا</p>
            <div class="h-1px @bg-black-500 grow" />
          </div>

          <p class="@text-title @text-secondary-500 w-72 text-center mt-4">
            {{ __('tsitfy.select-file') }}
          </p>
        </template>
        <template v-else-if="selectedFile && loading">
          <TLoading />
          <p class="mt-7 font-black w-72 text-center">{{ __('tsitfy.uploading') }}</p>
        </template>

        <template v-else-if="!loading && selectedFile">
          <TIcon
            :src="require('@icons/b-paper.svg')"
            class="w-18 @text-tertiary-500"
          />
          <p class="font-black text-center w-72 sm:mt-4">{{ selectedFile.name }}</p>

          <TButton class="sm:mt-4" size="small" @click.stop="deleteFile()">{{ __('tsitfy.remove') }}</TButton>
        </template>
      </label>
    </div>
  </div>

  <div class="sm:@flex-center mt-7 w-90%">
    <div class="w-12 pe-4">
      <TIcon
        v-if="mode === 'address'"
        :src="require('@icons/b-check-mark.svg')"
        class="@text-primary-500 w-7 shrink-0 hidden sm:flex"
      />
      <TIcon
        v-else
        :src="require('@icons/b-circle.svg')"
        class="@text-black-600 w-7 shrink-0 cursor-pointer hidden sm:flex"
        @click="mode = 'address'"
      />
    </div>
    <div class="grow">
      <TInputText
        v-model="modelValue"
        class="w-full sm:w-79 outline-none"
        label="آدرس تصویر"
      />
    </div>
  </div>

  <div class="flex justify-center mt-7">
    <TButton style-type="solid" color="gray" @click="emit('cancel')">
      {{ __('tsitfy.cancel') }}
    </TButton>
    <TButton class="ms-2" @click="emit('confirm', { SID, fileName: selectedFile!.name })">
      {{ __('tsitfy.confirm') }}
    </TButton>
  </div>

  <input
    id="upload"
    :disabled="selectedFile !== null && selectedFile !== undefined"
    class="hidden"
    type="file"
    accept="image/*, .pdf, .zip"
    @change="handleFileChange"
  >
</template>
