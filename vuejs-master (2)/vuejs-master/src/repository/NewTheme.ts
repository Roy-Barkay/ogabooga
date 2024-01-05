import { BrowserSource_IsSystemDark } from '@@/datasource/browser/BrowserSource'
import { KV_Theme_Get, KV_Theme_Set } from '@@/datasource/kv/ThemeKV'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  /** آیا تم دارک است یا نه  */
  const darkMode = ref(false)

  /** برای تغییر تم  */
  async function toggle() {
    const theme = darkMode.value ? 'light' : 'dark'
    return set(theme)
  }

  /** ⁧وقتی مقدار darkMode تغییر می‌کند باید کلاس dark به تگ بادی اعمال شود ⁩  */
  watchEffect(() => {
    document.body.classList.toggle('dark', darkMode.value)
  })

  /** ⁧مدیریت اعمال تم بر اساس مقدار درون indexedDB یا تم سیسستم عامل کاربر ⁩  */
  async function init() {
    const theme = await KV_Theme_Get()

    if (theme === 'dark') darkMode.value = true
    else if (theme === 'light') darkMode.value = false
    else darkMode.value = BrowserSource_IsSystemDark()
  }

  /** مدیریت ست کردن تم جدید  */
  async function set(theme: 'dark' | 'light') {
    darkMode.value = theme === 'dark'
    await KV_Theme_Set(theme)
  }

  return { init, set, toggle, darkMode }
})
