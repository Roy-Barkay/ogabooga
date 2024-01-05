<script setup lang="ts">
import TIcon from '@@/components/TIcon.vue'

export type Avatar_ID_Range = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24

const props = defineProps<{
  /** آیدی آواتار */
  avatarId?: Avatar_ID_Range,
  /** url آواتار */
  url?: string,
  /** اندازه آواتار */
  size: 'small' | '36x' | 'mini' | 'medium' | 'regular' | 'large',
  /** آواتار ادمین هست یا خیر */
  isAdmin?: boolean,
  /** وارنینگ دارد یا خیر */
  hasWarning?: boolean
}>()

let map: Record<string, string>

function getUrl() {
  if (props.url) return props.url
  if (props.avatarId) {
    if (VITE) {
      if (map) {
        return map[props.avatarId]
      }
      const avatarRegex = /avatar_(.*)\.png$/
      const modules = import.meta.glob('@@/assets/avatars/avatar_*.png', {
        eager: true,
        import: 'default',
      })

      const entries = Object.entries(modules).map(([key, val]) => [avatarRegex.exec(key)![1], val])

      map = Object.fromEntries(entries)
      return map[props.avatarId]
    }
    return require(`@@/assets/avatars/avatar_${props.avatarId}.png`)
  }

  return require('@@/assets/avatars/avatar_unknown.png')
}

</script>

<template>
  <div
    class=":uno: relative rounded-45% select-none shrink-0"
    :class="{
      's-84px': props.size === 'large',
      's-64px': props.size === 'regular',
      's-56px': props.size === 'medium',
      's-44px': props.size === 'mini',
      's-9': props.size === '36x',
      's-7': props.size === 'small',
      'shadow-[0_0_0_2px_rgb(var(--complementary-500))] @border-black-50 border-2px border-solid': props.isAdmin,
      'shadow-[0_0_0_2px_rgb(var(--warning-500))] @border-black-50 border-2': props.hasWarning
    }"
  >
    <div class="relative rounded-45% overflow-hidden">
      <img
        class="block w-full h-auto transition-all duration-200 hover:scale-110"
        :src="getUrl()"
        alt="profile image"
      >
    </div>

    <TIcon
      v-if="props.isAdmin"
      class="block absolute @text-complementary-500 -right-2"
      :class="{
        's-7 bottom-0': props.size === 'large',
        's-6 -bottom-6px': props.size === 'medium',
        's-5 -bottom-1': props.size === 'mini',
        's-4 -bottom-1': props.size === 'small'
      }"
      src="@icons/b-admin.svg"
    />

    <TIcon
      v-if="props.hasWarning"
      class="block absolute @text-warning-500 -right-2 rounded-full [filter:drop-shadow(0px_3px_5px_rgba(var(--warning-500)))]"
      :class="{
        's-5 -bottom-1': props.size === 'mini'
      }"
      src="@icons/b-info-circle2.svg"
    />
  </div>
</template>
