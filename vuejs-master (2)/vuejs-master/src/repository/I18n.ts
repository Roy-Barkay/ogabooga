import { Static_I18n_GetStrings } from '@@/datasource/I18n'
import { KV_I18n_GetLang, KV_I18n_SetLang } from '@@/datasource/kv/I18nKV'
import { isClient } from '@vueuse/core'
import { defineStore } from 'pinia'
import { FunctionalComponent } from 'vue'

export const useI18nStore = defineStore('i18n', () => {
  const languageConfig: Record<Language, LanguageConfig> = {
    fa: {
      rtl: true,
      thousandsSeparator: '٬',
      decimalSeparator: '٫',
      comma: '،',
      percent: '٪',
      title: 'فارسی',
      code: 'fa',
    },
    en: {
      rtl: false,
      thousandsSeparator: ',',
      decimalSeparator: '.',
      comma: ',',
      percent: '%',
      title: 'English',
      code: 'en',
    },
  }

  const supportedLanguages: LanguageList = ['fa', 'en']
  const currentLanguage = ref<Language>('en')

  const strings = ref<Record<string, string>>({})

  function getDefaultLanguage() {
    if (isClient) {
      // اگر در منطقه زمانی ایران یا افغانستان بود
      const timezoneOffset = new Date('Feb 11, 1979 00:00:00 GMT').getTimezoneOffset() / -60
      if (timezoneOffset === 3.5 || timezoneOffset === 4.5) {
        return 'fa'
      }

      if (navigator.language && !navigator.language.includes('en')) {
        return navigator.language.split('-')[0]
      }

      for (let i = 0; i < navigator.languages.length; i++) {
        if (!navigator.languages[i].includes('en')) {
          return navigator.languages[i].split('-')[0]
        }
      }

      return 'en'
    } else {
      return 'fa' // as default lang
    }
  }

  async function I18n_GetLanguage(): Promise<Language> {
    const storedLanguage = await getLang()
    if (storedLanguage) return storedLanguage

    const defaultLanguage = getDefaultLanguage()
    const defaultLanguageSupported = supportedLanguages.includes(defaultLanguage as any)
    const finalLanguage = defaultLanguageSupported ? defaultLanguage as Language : 'en'

    setLang({ lang: finalLanguage })
    return finalLanguage
  }

  async function init(stringImporter?: (lang: Language) => Promise<Record<string, string>>) {
    const lang = await I18n_GetLanguage()
    currentLanguage.value = lang

    const isRtl = languageConfig[lang].rtl
    const direction = isRtl ? 'rtl' : 'ltr'

    const [designSystemStrings, otherProjectStrings] = await Promise.all([
      Static_I18n_GetStrings(lang),
      stringImporter?.(lang),
    ])
    strings.value = { ...designSystemStrings, ...otherProjectStrings }

    currentLanguage.value = lang

    // update ui
    document.documentElement.dir = direction
    document.documentElement.lang = lang
    document.documentElement.classList.remove(isRtl ? 'ltr' : 'rtl')
    document.documentElement.classList.add(direction)
  }

  async function I18n_SetLanguage(lang: Language) {
    await setLang({ lang })
    window.location.reload()
  }

  if (process.env.NODE_ENV === 'development') {
    Object.defineProperty(window, 'setLanguage', { value: I18n_SetLanguage })
  }

  function __(key: string, params?: Array<string | number>) {
    let output = strings.value[key]
    if (params) {
      output = output.replace(/\{(\d+)\}/g, (match, i) => params[i] as string || match)
    }
    return output || key
  }

  function toggleLanguage() {
    const lang = currentLanguage.value === 'fa' ? 'en' : 'fa'
    I18n_SetLanguage(lang)
  }

  function setLang(body: { lang: Language }) {
    return KV_I18n_SetLang(body.lang)
  }

  function getLang() {
    return KV_I18n_GetLang()
  }

  return { __, init, currentLanguage, languageConfig, toggleLanguage, I18n_SetLanguage }
})

/** این تابع برای این هست که بین یک کلید ترجمه بتوانیم از عبارت های متفاوت و متغیر
 * یا حتی از کامپوننت ها و ... استفاده کنیم و همچنین به هرکدام استایل های متفاوت بدهیم.
 */
export const BaseI18n: FunctionalComponent<{i18n: string, class?: string}> = (props, context) => {
  const paramsRegex = /{\d+}/g

  const { __ } = useI18nStore()

  const value = __(props.i18n)
  const parts = value.split(paramsRegex)
  const slots = (value.match(paramsRegex) || [])
    .map(x => x.slice(1, -1))

  const children = []
  for (let i = 0; i < parts.length; i++) {
    children.push(parts[i])
    if (slots[i] && context.slots[slots[i]]) {
      children.push(context.slots[slots[i]]!({}))
    }
  }

  return h('span', context.attrs, children)
}
