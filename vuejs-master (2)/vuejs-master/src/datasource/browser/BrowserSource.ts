function BrowserSource_CopyOld(text: string) {
  // Create a fake textarea
  const textAreaEle = document.createElement('textarea')

  // Reset styles
  textAreaEle.style.border = '0'
  textAreaEle.style.padding = '0'
  textAreaEle.style.margin = '0'

  // Set the absolute position
  // User won't see the element
  textAreaEle.style.position = 'absolute'
  textAreaEle.style.left = '-9999px'
  textAreaEle.style.top = '0px'

  // Set the value
  textAreaEle.value = text

  // Append the textarea to body
  document.body.appendChild(textAreaEle)

  // Focus and select the text
  textAreaEle.focus()
  textAreaEle.select()

  // Execute the "copy" command
  try {
    document.execCommand('copy')
  } catch (err) {
    // Unable to copy
  } finally {
    // Remove the textarea
    document.body.removeChild(textAreaEle)
  }
}

export function BrowserSource_Copy(text: string) {
  try {
    navigator.clipboard.writeText(text)
      .catch(() => BrowserSource_CopyOld(text))
  } catch {
    BrowserSource_CopyOld(text)
  }
}

function isMatchMedia(media: string) {
  if (typeof window === 'undefined') return ref(true)
  const matcher = window.matchMedia(media)
  const matching = ref(matcher.matches)
  matcher.addListener(() => {
    matching.value = !matching.value
  })
  return matching
}

export const BrowserSource_Screens = reactive({
  xs: isMatchMedia('(min-width: 480px'),
  sm: isMatchMedia('(min-width: 640px'),
  md: isMatchMedia('(min-width: 768px'),
  lg: isMatchMedia('(min-width: 1024px'),
  xl: isMatchMedia('(min-width: 1280px'),
  xxl: isMatchMedia('(min-width: 1536px'),
})

export function BrowserSource_IsSystemDark() {
  const isDarkMatcher = window.matchMedia('(prefers-color-scheme: dark)')
  return isDarkMatcher.matches
}

export function BrowserSource_IsTouchDevice() {
  return 'ontouchstart' in window
}

export function BrowserSource_GetDeviceType() {
  const userAgent = navigator.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    return 'tablet'
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    return 'mobile'
  }
  return 'desktop'
}

export function BrowserSource_IsAndroid() {
  return /Android/.test(navigator.userAgent)
}
