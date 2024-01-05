<script lang="ts" setup>

import { computedAsync } from '@vueuse/core'
import TIcon from './TIcon.vue'

defineProps<{
  /** عنوان */
  title: string,
  /** آیکن */
  src: string,
  /** بردر ردیوس */
  borderStyle?: 'simple' | 'curve'
}>()

/** آیا عنوان نمایش داده شود یا خیر */
const isVisibleTitle = ref(true)

/** حفظ آخرین موقعیت اسکرول */
const lastScrollTop = ref(0)

/** المنت فب */
const fab = ref<HTMLElement>()

/** محاسبه ی عرض اولیه المنت فب */
const width = computedAsync(async () => {
  if (!fab.value) return
  await document.fonts.load(getComputedStyle(fab.value).font)
  return fab.value.offsetWidth + 'px'
})

/** مدیریت رویداد اسکرول صفحه */
function handleScroll() {
  const currentScroll = window.scrollY
  isVisibleTitle.value = currentScroll < lastScrollTop.value
  lastScrollTop.value = currentScroll
}

/** ⁧اضافه کردن event listener وقتی که کامپوننت mount شده است ⁩ */
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

/** ⁧اضافه کردن event listener وقتی که کامپوننت unmount شده است ⁩ */
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>

<template>
  <transition
    name="fab"
    enter-from-class="w-56px"
    :style="{'--width': width}"
    fab-leave-from="w-$width"
  >
    <button
      ref="fab"
      :class="borderStyle === 'curve' ? 'rounded-full' : 'rounded-4'"
      class="fixed flex items-center will-change-transform p-4 transition-width duration-200"
      :style="{width: isVisibleTitle ? width : '56px'}"
    >
      <TIcon :src="src" class="s-7 shrink-0" />
      <transition name="fade">
        <div v-if="isVisibleTitle" class="whitespace-nowrap @text-title ms-3">
          {{ title }}
        </div>
      </transition>
    </button>
  </transition>
</template>
