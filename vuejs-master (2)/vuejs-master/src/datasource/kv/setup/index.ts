import { set, get, clear } from 'idb-keyval'

let cache: Record<string, any> = {}

export function setKeyValue(key: string, value: any) {
  cache[key] = value
  return set(key, value)
}

export async function getKeyValue(key: string) {
  if (cache[key]) return cache[key]

  const data = await get(key)
  if (data == null) return null
  cache[key] = data
  return cache[key]
}

export async function clearAllKeys() {
  cache = {}
  return clear()
}
