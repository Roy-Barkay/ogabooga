import { getKeyValue, setKeyValue } from './setup'

export function KV_Theme_Set(theme: 'dark' | 'light') {
  return setKeyValue('theme', theme)
}

export function KV_Theme_Get() {
  return getKeyValue('theme')
}
