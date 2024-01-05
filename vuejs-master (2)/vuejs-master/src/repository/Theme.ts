import { BrowserSource_IsSystemDark } from '@@/datasource/browser/BrowserSource'
import { KV_Theme_Get, KV_Theme_Set } from '@@/datasource/kv/ThemeKV'

const isDark = ref(false)
export const Theme_IsDark = readonly(isDark)

export async function Theme_ToggleTheme() {
  isDark.value = !isDark.value
  await KV_Theme_Set(isDark.value ? 'dark' : 'light')
}

watchEffect(() => {
  document.body.classList.toggle('dark', isDark.value)
})

export async function Theme_Init() {
  const theme = await KV_Theme_Get()

  if (theme === 'dark') isDark.value = true
  else if (theme === 'light') isDark.value = false
  else isDark.value = BrowserSource_IsSystemDark()
}

export async function Theme_Set(theme: 'dark' | 'light') {
  isDark.value = theme === 'dark'
  await KV_Theme_Set(theme)
}
