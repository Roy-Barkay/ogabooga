import {
  BrowserSource_GetDeviceType,
} from '@@/datasource/browser/BrowserSource'

export {
  BrowserSource_Copy as Browser_Copy,
  BrowserSource_Screens as Browser_Screens,
  BrowserSource_IsTouchDevice as Browser_IsTouchDevice,
} from '@@/datasource/browser/BrowserSource'

export function Browser_IsWebOTPSupported() {
  return ['mobile', 'tablet'].includes(BrowserSource_GetDeviceType()) && ('OTPCredential' in window)
}

export function Browser_IsScrollBehaviorSupported() {
  return 'scrollBehavior' in document.documentElement.style
}
