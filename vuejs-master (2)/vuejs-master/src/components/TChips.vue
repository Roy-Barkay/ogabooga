<script setup lang="ts">
import TIcon from './TIcon.vue'
import TAvatar, { Avatar_ID_Range } from './TAvatar.vue'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  type: 'filter' | 'input'
  avatarId?: Avatar_ID_Range
  icon?: string
  close?: boolean
  title?: string
  noToggle?: boolean
  modelValue?: boolean
  /** تایپ فیلتر چیپس ها سایه داشته باشه یا خیر ؟ */
  filterTypeShadow?: boolean
}>()

const emit = defineEmits(['close', 'update:modelValue'])

const modelValue = useVModel(props)

function toggle(e: MouseEvent) {
  if (e.defaultPrevented) return
  if (!props.noToggle) modelValue.value = !modelValue.value
}

function handleClose(e: MouseEvent) {
  e.preventDefault()
  emit('close')
}

</script>

<script lang="ts">

export type ChipsType = {
  type: 'filter' | 'input'
  avatarId?: Avatar_ID_Range
  icon?: string
  close?: boolean
  title?: string
  noToggle?: boolean
  modelValue?: boolean
  /** تایپ فیلتر چیپس ها سایه داشته باشه یا خیر ؟ */
  filterTypeShadow?: boolean
}

</script>

<template>
  <button
    type="button"
    class="p-2 rounded-4 sm:rounded-5 @flex-center h-9 sm:h-11 border-2 @border-black-700/07 group"
    :class="{
      '@bg-primary-100 @border-primary-200 @text-primary-500 hover:@border-primary-200 hover:@bg-primary-100': modelValue && type === 'filter',
      '@border-black-300 @bg-black-50 hover:@border-primary-200 hover:@bg-black-200 @text-black-700': !modelValue && type === 'input' ,
      '@border-black-300 @bg-black-50 hover:@border-primary-200 @text-black-700': !modelValue && type === 'filter',
      '@border-black-300 @bg-black-50 hover:@border-primary-200 hover:@bg-black-200 @text-black-700 shadow-[0_0_20px_0_rgb(33,33,33,0.12)]': !modelValue && type === 'filter' && filterTypeShadow,
      '@bg-primary-500 hover:@border-primary-200 @text-black-50': modelValue && type === 'input',
      'cursor-default' : noToggle
    }"
    @click="toggle"
  >
    <TIcon
      v-if="icon"
      :src="icon"
      class="block s-6 shrink-0"
      :class="{
        '@text-black-600 group-hover:@text-primary-500':!modelValue ,
        '@text-black-50': modelValue && type === 'input',
      }"
    />
    <TAvatar v-else-if="avatarId" :avatar-id="avatarId" size="small" />
    <span
      v-if="title"
      class="mx-1 @text-subtitle2"
      :class="{
        '@text-primary-500': modelValue && type === 'filter' ,
        '@text-black-600' : !modelValue && type === 'filter',
        'group-hover:@text-primary-500':!modelValue
      }"
    >
      {{ title }}
    </span>
    <button>
      <TIcon
        v-if="close"
        src="@icons/b-close-circle2.svg"
        class="block w-6 h-6 shrink-0 cursor-pointer"
        :class="{
          '@text-primary-500': modelValue && type === 'filter',
          '@text-black-50' : modelValue && type === 'input',
          'group-hover:@text-primary-500': !modelValue
        }"
        @click="handleClose"
      />
    </button>
  </button>
</template>
