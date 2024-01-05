import { getKeyValue, setKeyValue } from './setup'

export function KV_I18n_SetLang(lang: Language) {
  return setKeyValue('lang', lang)
}

export function KV_I18n_GetLang(): Promise<Language> {
  return getKeyValue('lang')
}
