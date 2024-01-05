<script setup lang="ts">
import { PropType } from 'vue'
import BaseLoading from './BaseLoading.vue'
import { useTranslation } from '@@/hooks/useTranslation'
import TIcon from './TIcon.vue'

const __ = useTranslation()

const props = defineProps({
  /** ⁧هرگاه true شود spinner loading نمایش داده می‌شود ⁩  */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * ⁧هر گاه که بخواهیم spinner loading روی محتوا نمایش داده شود
   * ⁧این prop را true می‌کنیم.⁩
   * ⁧این کار باعث می‌شود که loading computed هرگز true نشود.
   * ⁧در نتیجه با لود شدن محتوا و falseشدن مقدار پراپ loading توسط useAsyncMethod ⁩
   * ⁧و با وجود true بودن deepLoading هم محتوای لودشده نمایش داده می‌شود و هم لودینگ. ⁩
   */
  deepLoading: {
    type: Boolean,
    default: true,
  },
  /** کلاس هایی که به تگ والد لودینگ اعمال می‌شود  */
  loadingClass: {
    type: String,
    default: '',
  },
  /** کلاس هایی که در حالت ارور به تگ والد کامپوننت اعمال می‌شود  */
  errorClass: {
    type: String,
    default: 'pt-100px',
  },
  /** کلاس هایی که به تگ والد محتوای صفحه اعمال می‌شود  */
  contentClass: {
    type: String,
    default: '',
  },
  /** آبجکت ارور  */
  error: {
    type: [Object, Error] as PropType<{ message?: string } | null | undefined>,
    default: null,
  },
})

/** ⁧اگر این مقدار false شد محتوای اصلی نمایش داده می شود ⁩  */
const loading = computed(() => props.loading && props.deepLoading)

/** پیامی که در حالت ارور به کاربر نمایش داده می‌شود  */
const message = computed(() => {
  const error = props.error
  if (error?.message) return error.message
  console.error(error)
  return __('tsitfy.some-problem-happened')
})
</script>

<template>
  <div
    class=":uno: w-full flex flex-col grow"
    :class="error && props.errorClass ? props.errorClass : ''"
  >
    <div v-if="error">
      <TIcon
        src="@icons/tt-offline.svg"
        class="s-10 block mt-5 mx-auto @text-black-800"
      />
      <div class="block text-center mt-5">
        {{ message }}
      </div>
      <div class="flex justify-center mb-8">
        <slot name="error-append" />
      </div>
    </div>
    <div v-else class=":uno: w-full relative flex flex-col grow" :class="contentClass">
      <slot v-if="!loading" />
      <Transition appear name="fade-zoom">
        <div
          v-if="props.loading"
          class=":uno: absolute mt-10 mx-auto inset-x-0 @flex-center s-10 shadow-xl rounded-full"
          :class="loadingClass"
        >
          <BaseLoading class="s-6" />
        </div>
      </Transition>
    </div>
  </div>
</template>
