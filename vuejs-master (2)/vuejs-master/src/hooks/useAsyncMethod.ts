import { handleCommonError } from '@@/utils'
import BaseLoadingContainer from '@@/components/BaseLoadingContainer.vue'
import TButton from '@@/components/TButton.vue'
import { useTranslation } from './useTranslation'
import { EffectScope, FunctionalComponent } from 'vue'

export default function useAsyncMethod<O>(fn: () => Promise<O>) {
  const __ = useTranslation()

  const loading = ref(true)
  const error = ref<any>()
  const result = ref<O>()
  let scope: EffectScope | undefined

  let firstApiCall = true
  let lastRunNumber = 1
  const showLoading = ref(true)

  const reset = ({
    clearData = false,
    hasLoading = true,
    showError = true,
  } = {}) => {
    loading.value = true
    error.value = null
    if (clearData) {
      result.value = undefined
    }
    firstApiCall = true
    return retry({ hasLoading, showError })
  }

  const retry = ({ hasLoading = true, showError = true } = {}) => {
    scope?.stop()
    scope = effectScope()
    showLoading.value = hasLoading

    lastRunNumber++
    loading.value = true
    const currentRun = lastRunNumber
    return scope
      .run(() => fn())!
      .then(r => {
        if (currentRun !== lastRunNumber) return
        result.value = r
        error.value = null
      })
      .catch(err => {
        if (currentRun !== lastRunNumber) return
        if (result.value !== undefined && showError) {
          handleCommonError(err)
          return
        }

        error.value = err

        if (!firstApiCall && showError) {
          handleCommonError(err)
        }
      })
      .finally(() => {
        if (currentRun !== lastRunNumber) return
        firstApiCall = false
        loading.value = false
      })
  }

  const LoadingContainer: FunctionalComponent<{
    errorClass?: string
    loadingClass?: string
    contentClass?: string
    class?: string
  }> = (props, context) => (
    h(BaseLoadingContainer, {
      ...props,
      ...context.attrs,
      loading: showLoading.value && loading.value,
      deepLoading: result.value === undefined,
      error: result.value === undefined ? error.value : undefined,
    }, {
      ...context.slots,
      'error-append': () => h(
        TButton,
        {
          loading: loading.value,
          onClick: retry,
          class: 'mt-5',
        },
        () => [
          __('tsitfy.retry'),
        ],
      ),
    })
  )

  retry()

  return {
    result,
    LoadingContainer,
    reset,
    loading,
    error,
  }
}
