<script lang="ts">
export const key = Symbol('id')
export const header = Symbol('headerElement')
export const footer = Symbol('footerElement')
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import TBottomSheet from './TBottomSheet.vue'
import TDialog from './TDialog.vue'
import { BrowserSource_Screens } from '@@/datasource/browser/BrowserSource'

const props = withDefaults(defineProps<{
  modelValue: boolean
  closeIcon?: boolean
  fixHeight?: boolean
  fullHeight?: boolean
  maxWidth?: number
  noDrag?: boolean
  noClose?: boolean
  corners?: 'simple' | 'curve'
}>(), {
  maxWidth: 480,
  corners: 'simple',
})

const modelValue = useVModel(props)

/** یک عدد رندوم برای منحصر به فرد بودن آیدی */
const random = Math.floor(Math.random() * 1000)

/** آیدی یونیک برای هر مودال */
const id = Date.now() + random

provide(key, id)

/** آیا عنصر هدر ساخته شده؟ */
const headerElement = ref<HTMLElement | null>(null)
provide(header, headerElement)

/** آیا عنصر فوتر ساخته شده؟ */
const footerElement = ref<HTMLElement | null>(null)
provide(footer, footerElement)

</script>

<template>
  <TDialog
    v-if="BrowserSource_Screens.sm"
    v-model="modelValue"
    :fix-height="fixHeight"
    :close-icon="closeIcon"
    :max-width="maxWidth"
    :corners="corners"
  >
    <template #header>
      <slot name="header">
        <div :id="`header-${id}`" ref="headerElement" />
      </slot>
    </template>
    <slot />
    <template #footer>
      <slot name="footer">
        <div :id="`footer-${id}`" ref="footerElement" />
      </slot>
    </template>
  </TDialog>
  <TBottomSheet
    v-else
    v-model="modelValue"
    :no-drag="noDrag"
    :full-height="fullHeight"
    :no-close="noClose"
    :corners="corners"
  >
    <template #header>
      <slot name="header">
        <div :id="`header-${id}`" ref="headerElement" />
      </slot>
    </template>
    <slot />
    <template #footer>
      <slot name="footer">
        <div :id="`footer-${id}`" ref="footerElement" />
      </slot>
    </template>
  </TBottomSheet>
</template>
