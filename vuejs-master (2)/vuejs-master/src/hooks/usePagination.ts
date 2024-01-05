import useAsyncMethod from './useAsyncMethod'
import { handleCommonError } from '@@/utils'
import AbstractPagination from '@@/components/AbstractPagination.vue'
import { FunctionalComponent, Ref } from 'vue'

type ID = string

/**
 * @param fn ⁧تابعی که پاس می‌دهیم تا برای دریافت هر page فراخوانی شود
 * @param param1 ⁧آبجکتی که در آن یک سری تنظیمات را برای usePagination تعیین می‌کنیم. مثلا شماره پیج آخر را تعیین می‌کنیم.
 */
export function usePagination<O extends Array<unknown>>(
  fn: (options: { action: 'up' | 'down' | ''}) => Promise<O>,
  {
    autoFinish = true,
    autoFinishUp = true,
    /** ⁧جهت pagination ⁩ */
    direction = 'down' as 'down' | 'both',
    /** ⁧شماره page ⁩ */
    pageID = undefined as Ref<ID | number | undefined> | undefined,
  } = {}) {
  /** ⁧مقدار پیش فرض pageID ⁩ */
  const pageInitalValue = pageID?.value

  /** آیا از سمت پایین به آخرین آیتم رسیده‌ایم یا نه */
  const finishedDown = ref(false)

  /** آیا از سمت بالا به آخرین آیتم رسیده‌ایم یا نه */
  const finishedUp = ref(false)

  /** آیا لودینگ پایین نمایش داده می‌شود یا نه  */
  const loadingDown = ref(false)

  /** آیا در دریافت پیج پایینی به ارور خورده یا نه  */
  const errorDown = ref(false)

  /** آیا لودینگ بالا نمایش داده می‌شود یا نه  */
  const loadingUp = ref(false)

  /** آیا در دریافت پیج بالایی به ارور خورده یا نه  */
  const errorUp = ref(false)

  /** آیا پیج پایینی در حال لود شدن است یا خیر   */
  const isIntersectingDown = ref(false)

  /** آیا پیج بالایی در حال لود شدن است یا خیر   */
  const isIntersectingUp = ref(false)

  /** مقدار نهایی لودینگ رو به پایین را مشخص می‌کند  */
  const generalLoadingDown = computed(() => loadingDown.value || useAsyncMethodLoading.value)

  /** مقدار نهایی لودینگ رو به بالا را مشخص می‌کند  */
  const generalLoadingUp = computed(() => loadingUp.value || useAsyncMethodLoading.value)

  /** برای تعیین اینکه از بالا به آخرین آیتم رسیده ایم  */
  function finishUp() {
    finishedUp.value = true
  }

  /** برای تعیین اینکه از پایین به آخرین آیتم رسیده ایم  */
  function finishDown() {
    finishedDown.value = true
  }

  /** ⁧تابعی که برای ریست کردن pagination و بردن آن به State اولیه مورد استفاده قرار می‌گیرد ⁩  */
  function reset(options?: Parameters<typeof resetAsyncMethod>[0]) {
    if (pageID) {
      pageID.value = pageInitalValue
    }
    finishedDown.value = false
    finishedUp.value = false
    loadingDown.value = false
    errorDown.value = false
    loadingUp.value = false
    errorUp.value = false
    return resetAsyncMethod(options)
  }

  /** ⁧دریافت page بعدی را مدیریت می‌کند ⁩
   * @param action جهت دریافت صفحه بعدی را مشخص می‌کند
   */
  function getNextPage(action: 'up' | 'down') {
    if (generalLoadingDown.value && action === 'down') return
    if (generalLoadingUp.value && action === 'up') return

    if (action === 'up' && finishedUp.value) return
    else if (action !== 'up' && finishedDown.value) return

    if (action === 'down') loadingDown.value = true
    else loadingUp.value = true

    fn({ action })
      .then(response => {
        if (autoFinishUp && response.length <= 0 && action === 'up') {
          finishUp()
        }
        if (autoFinish && response.length <= 0 && action !== 'up') {
          finishDown()
        }

        if (action === 'up') {
          // @ts-ignore
          result.value.unshift(...response)
          errorUp.value = false
          loadingUp.value = false
        } else {
          // @ts-ignore
          result.value = result.value.concat(response)
          errorDown.value = false
          loadingDown.value = false
        }
      })
      .catch(err => {
        // بار اول نباید خطا را نمایش دهیم، مگر اینکه در مرورگرهای قدیمی باشیم
        if (action === 'down' && errorDown.value) handleCommonError(err)
        if (action === 'up' && errorUp.value) handleCommonError(err)
        if (action === 'down') {
          errorDown.value = true
          loadingDown.value = false
        } else {
          errorUp.value = true
          loadingUp.value = false
        }
      })
  }

  /** ⁧برای بروزکردن مقدار isIntersectingDown ⁩ */
  function onIntersectingDownChanged(intersecting: boolean) {
    isIntersectingDown.value = intersecting
  }

  /** ⁧برای بروزکردن مقدار isIntersectingUp ⁩ */
  function onIntersectingUpChanged(intersecting: boolean) {
    isIntersectingUp.value = intersecting
  }

  const {
    LoadingContainer,
    result,
    reset: resetAsyncMethod,
    loading: useAsyncMethodLoading,
  } = useAsyncMethod(async () => {
    const result = await fn({ action: '' })
    if (result.length <= 0) {
      if (autoFinish) finishDown()
      if (autoFinishUp) finishUp()
    }
    return result
  })

  /** ⁧ مقادیر به عنوان پراپ به کامپوننت AbstractPagination پاس داده می‌شوند و بعد از فراخوانی usePagination این کامپوننت برای استفاده در دسترس است ⁩ */
  const WrapperContainer: FunctionalComponent<{
    class?: string
    errorClass?: string
    intersectionOptions?: IntersectionObserverInit
    noBottomNavSpacing?: boolean
  }> = (props, context) => {
    return h(AbstractPagination, {
      ...props,
      loadingDown: loadingDown.value,
      loadingUp: loadingUp.value,
      finishedDown: finishedDown.value,
      finishedUp: finishedUp.value,
      result: result.value,
      getNextPage,
      loadingComponent: LoadingContainer,
      errorDown: errorDown.value,
      errorUp: errorUp.value,
      direction,
      onIntersectingDownChanged,
      onIntersectingUpChanged,
    }, {
      default: context.slots.default,
      'finish-up': context.slots['finish-up'],
    })
  }

  return {
    WrapperContainer,
    result,
    finish: finishDown,
    finishUp,
    loading: generalLoadingDown,
    reset,
    isIntersectingDown,
    isIntersectingUp,
    finishedDown,
  }
}
