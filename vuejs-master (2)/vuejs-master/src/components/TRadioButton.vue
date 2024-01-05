<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = withDefaults(defineProps<{
  /** عنوان */
  title: string
  /** توضیحات  */
  description?: string | undefined
  /** مقدار کامپوننت */
  value: string
  /** اندازه  */
  size: 'small'|'medium'|'large'
  /** ایتم انتخاب شده  */
  modelValue: string | undefined,
  /** نوع فقط متن */
  styleType?: 'text'|'outline'
}>(), {
  styleType: 'outline',
  description: undefined,
})
const modelValue = useVModel(props)

/** آیا فعال است یا نه  */
const isActive = computed(() => modelValue.value === props.value)

</script>

<template>
  <div
    class="group cursor-pointer flex items-center rounded-7 w-full px-2 sm:px-3"
    :class="{
      '@border-primary-500 @bg-primary-100': isActive && styleType === 'outline',
      'border-3 @border-black-400': styleType === 'outline',
      'hover:@border-primary-300': !isActive && styleType === 'outline',
      'hover:@bg-black-200': !isActive && styleType === 'text',
      'h-55px sm:h-70px': size === 'large',
      'h-46px sm:h-56px': size === 'medium',
      'h-36px sm:h-52px': size === 'small'
    }"
    @click="modelValue = value"
  >
    <button
      type="button"
      class="s-22px border-2 shrink-0 @border-black-300 rounded-full @flex-center me-2"
      :class="{
        '@border-primary-500': isActive,
        'group-hover:@border-primary-300': !isActive && styleType === 'outline',
        'group-hover:@border-black-400': !isActive && styleType === 'text',
      }"
    >
      <div v-if="isActive" class="s-14px @bg-primary-500 rounded-full" :class="{ 'group-hover:@bg-black-400': !isActive && styleType === 'text' }" />
    </button>
    <div class="flex flex-col justify-center grow min-w-0">
      <div
        class="@text-black-600 @text-subtitle2 truncate sm:@text-title"
        :class="{
          '@text-primary-500': isActive,
          'group-hover:@text-primary-400': !isActive && styleType === 'outline',
          'group-hover:@text-black-600': !isActive && styleType === 'text',
        }"
      >
        {{ title }}
      </div>
      <div
        v-if="description && styleType === 'outline'"
        class="truncate @text-black-500 @text-subtitle2"
        :class="{
          '@text-primary-600': isActive,
          'group-hover:@text-primary-300': !isActive
        }"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>
