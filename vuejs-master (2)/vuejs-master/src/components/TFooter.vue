<script setup lang="ts">
import { Browser_Screens } from '../repository/Browser'
import TLanguage from './TLanguage.vue'
import TTheme from './TTheme.vue'

const props = defineProps<{
  currentLanguage?: string,
  languageAction: (e: MouseEvent) => any,
  items: { title: string, src: string }[]
}>()

</script>

<template>
  <footer
    v-if="Browser_Screens.sm"
    class="border-t-1px px-1 py-10px @border-black-700/10 flex items-center justify-between z-footer @text-subtitle1 mt-6 @text-black-600"
  >
    <div class="flex">
      <router-link
        v-for="item in props.items"
        :key="item.title"
        class="me-10"
        :to="item.src"
      >
        {{ item.title }}
      </router-link>
    </div>
    <div class="@flex-center">
      <TLanguage />
      <TTheme view-mode="double" class="ms-4" />
    </div>
  </footer>
</template>
