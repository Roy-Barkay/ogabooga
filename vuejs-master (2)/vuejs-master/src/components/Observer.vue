<script setup lang="ts">

/** ⁧آبجکتی که از کلاس IntersectionObserver ساخته می‌شود ⁩  */
let observer: IntersectionObserver | null = null

/** ⁧تگ root این کامپوننت که قرار است IntersectionObserver روی آن عمل کند ⁩  */
const thisElement = ref<HTMLDivElement>()

const props = defineProps<{
  /** ⁧تنظیمات مربوط به آبجکت IntersectionObserver ⁩ */
  options?: IntersectionObserverInit,
}>()

const emit = defineEmits<{
  /** ⁧وقتی Observer به viewport وارد می‌شود به کامپوننت بالایی اطلاع می‌دهد تا handler مربوطه اجرا شود ⁩  */
  (e: 'intersect'): void
  /** ⁧هرگاه Observer بیرون از viewport قرار گرفت یعنی به ابتدا یا انتنهای لیست نرسیده‌ایم و به کامپوننت بالایی اطلاع می‌دهد ⁩  */
  (e: 'out-of-viewport'): void
}>()

onMounted(() => {
  const options = props.options || {}
  /** ⁧rootMargin فاصله‌ای است که Observer تا ورود به viewport دارد و وقتی به این فاصله رسید مقدار isIntersecting برابر true می شود ⁩  */
  if (!options.rootMargin) options.rootMargin = '100px'

  observer = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      /** ⁧وقتی که isIntersecting برابر true شود یعنی Observer درون viewport است و باید پیج بعدی گرفته شود. بنابر این به کامپوننت بالایی اطلاع می‌دهیم ⁩  */
      emit('intersect')
    } else {
      /** ⁧وقتی که isIntersecting برابر false شود یعنی پیج بعدی لود شده و باعث شده Observer از viewport خارج شود. ⁩
       * بنابر این به کامپوننت بالایی اطلاع می‌دهیم.
       */
      emit('out-of-viewport')
    }
  }, options)

  observer.observe(thisElement.value!)
})

onScopeDispose(() => {
  observer?.disconnect()
})

</script>

<template>
  <div ref="thisElement" class="observer" />
</template>
