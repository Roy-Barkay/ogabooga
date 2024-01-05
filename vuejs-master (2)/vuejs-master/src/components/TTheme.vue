<script setup lang="ts">
import TIcon from './TIcon.vue'
import { useThemeStore } from '@@/repository/NewTheme'

withDefaults(defineProps<{
  /** حالت نمایش دکمه‌ها (تک یا دوگانه) */
  viewMode: 'single' | 'double'
}>(), {
  viewMode: 'double',
})

const theme = useThemeStore()

/** تم در حالت تاریک است یا نه  */
const isDarkTheme = computed(() => theme.darkMode)

/** مدیریت انتخاب تم  */
function setTheme(selectedTheme: 'dark' | 'light') {
  theme.set(selectedTheme)
}

</script>

<template>
  <div v-if="viewMode === 'single'" class="@flex-center s-9 @shadow-chips p-1 rounded-10">
    <button v-if="!isDarkTheme" @click="setTheme('dark')">
      <TIcon
        class="@text-black-300 s-7 rounded-full"
        src="@@/assets/icons/b-sun.svg"
      />
    </button>
    <button v-else @click="setTheme('light')">
      <TIcon
        class="@text-black-300 s-7 rounded-full"
        src="@@/assets/icons/b-moon.svg"
      />
    </button>
  </div>
  <div v-else-if="viewMode === 'double'" class="flex justify-between items-center w-68px h-9 @shadow-chips p-1 rounded-10">
    <button @click="setTheme('light')">
      <TIcon
        :class="{'@bg-black-600': !isDarkTheme}"
        class="@text-black-300 s-7 p-1 rounded-full"
        src="@@/assets/icons/b-sun.svg"
      />
    </button>
    <button @click="setTheme('dark')">
      <TIcon
        :class="{'@bg-black-600': isDarkTheme}"
        class="@text-black-300 s-7 p-1 rounded-full"
        src="@@/assets/icons/b-moon.svg"
      />
    </button>
  </div>
</template>
