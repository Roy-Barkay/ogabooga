import { useVibrate } from '@vueuse/core'

export const Toast_IsOpen = ref(false)
export const Toast_Message = ref('')
export const Toast_Status_Color = ref<'success' | 'error' | 'warning' | 'info'>()
const showTime = ref()
let timer: number | null = null

export function Toast_Show(toastStatus: 'success' | 'error' | 'warning' | 'info', toastMessage: string, duration = 5000) {
  const { vibrate, isSupported } = useVibrate({ pattern: 200 })

  Toast_IsOpen.value = true
  if (isSupported && ['error', 'warning'].includes(toastStatus)) {
    vibrate()
  }
  Toast_Message.value = toastMessage
  Toast_Status_Color.value = toastStatus

  showTime.value = duration

  if (timer) window.clearTimeout(timer)

  timer = window.setTimeout(() => {
    Toast_IsOpen.value = false
    timer = null
  }, showTime.value)
}

export function Toast_Close() {
  Toast_IsOpen.value = false
}
