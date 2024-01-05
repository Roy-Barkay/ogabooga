import { WatchSource } from 'vue-demi'
import { conditionalScope } from './conditionalScope'
import { useEventListener } from '@vueuse/core'

export function usePeriodicUpdate(callback: () => void, {
  /** ⁧آیا در ابتدای اولین دوره تناوب callback اجرا شود یا نه⁩ */
  lazy = false,
  /** دوره تناوب اجرا (میلی ثانیه) */
  intervalTime = 60_000,
  /** ⁧در زمان رویداد pageshow روی document، تابع callback اجرا شود یا نه⁩ */
  pageShow = true,
  /** ⁧یک WatchSource که اجرای callback نسبت به این پارامتر reactive است و در صورتی callback را اجرا می‌کند که این مقدار true باشد⁩ */
  active = ref(true) as WatchSource<boolean>,
} = {}) {
  let lastUpdateTime: number
  let interval: any

  /** بروز رسانی دوره ای */
  function triggerUpdate(force = false) {
    const now = Date.now()
    if (!force && lastUpdateTime && now - lastUpdateTime < intervalTime) return
    if (interval) {
      window.clearInterval(interval)
      interval = undefined
    }
    if (intervalTime) {
      interval = window.setInterval(triggerUpdate, intervalTime)
    }
    lastUpdateTime = now
    callback()
  }

  conditionalScope(active, () => {
    onScopeDispose(() => {
      window.clearInterval(interval)
    })

    if (lazy && intervalTime) {
      interval = window.setInterval(triggerUpdate, intervalTime)
    }

    if (!lazy) {
      triggerUpdate()
    }

    if (pageShow) {
      useEventListener(document, 'pageshow', callback)
    }
  })

  return {
    triggerUpdate,
  }
}
