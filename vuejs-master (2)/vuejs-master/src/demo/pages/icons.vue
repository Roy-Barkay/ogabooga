<script setup lang="ts">
import TIcon from '@@/components/TIcon.vue'
import { BrowserSource_Copy } from '@@/datasource/browser/BrowserSource'
import { Toast_Show } from '@@/repository/Toast'

const requireIcons = require.context('@icons/', true, /\.svg$/)

const icons: string[] = requireIcons.keys()
  .map((x: string) => x.replace(/^(?:\.\/)(.*)\.svg$/, '$1'))

const selectedColor = ref('@text-primary-500')
const query = ref('')
const displayIcons = ref(icons)
function copy(name: string) {
  BrowserSource_Copy(`<TIcon name="@icons/${name}.svg" />`)
  Toast_Show('success', 'کامپوننت کپی شد')
}

watch(query, () => {
  const filteredIcons = icons.filter(icon => icon.includes(query.value))
  displayIcons.value = filteredIcons
})
</script>

<template>
  <p class="@text-h2 p-3">
    آیکن‌ها
  </p>

  <div class="flex items-center border-2 @border-tertiary-500 rounded-2 px-2 w-2/3 mx-auto my-4">
    <TIcon :src="require('@icons/b-search.svg')" class="block w-6" />
    <input
      v-model="query"
      type="text"
      class="outline-none border-none bg-inherit text-15px py-2 px-1 grow ms-2"
      placeholder="نام آیکن را جستجو نمایید"
    >
  </div>
  <div class="@flex-center flex-wrap gap-4 my-4 ">
    <label
      class="font-bold @bg-primary-100 px-4 py-2 rounded-2 @text-primary-500 border-2 border-transparent"
      :class="{'@border-primary-500': selectedColor === '@text-primary-500'}"
    >
      <input
        id="primary"
        v-model="selectedColor"
        type="radio"
        name="colors"
        class="appearance-none"
        value="@text-primary-500"
      >
      primary
    </label>
    <label
      class="font-bold @bg-secondary-100 px-4 py-2 rounded-2 @text-secondary-500 border-2 border-transparent"
      :class="{'@border-secondary-500': selectedColor === '@text-secondary-500'}"
    >
      <input
        id="secondary"
        v-model="selectedColor"
        type="radio"
        name="colors"
        class="appearance-none"
        value="@text-secondary-500"
      >
      secondary
    </label>
    <label
      class="font-bold @bg-tertiary-100 px-4 py-2 rounded-2 @text-tertiary-500 border-2 border-transparent"
      :class="{'@border-tertiary-500': selectedColor === '@text-tertiary-500'}"
    >
      <input
        id="tertiary"
        v-model="selectedColor"
        type="radio"
        name="colors"
        class="appearance-none"
        value="@text-tertiary-500"
      >
      tertiary
    </label>
    <label
      class="font-bold @bg-warning-100 px-4 py-2 rounded-2 @text-warning-500 border-2 border-transparent"
      :class="{'@border-warning-500': selectedColor === '@text-warning-500'}"
    >
      <input
        id="warning"
        v-model="selectedColor"
        type="radio"
        name="colors"
        class="appearance-none"
        value="@text-warning-500"
      >
      warning
    </label>
    <label
      class="font-bold @bg-black-50 px-4 py-2 rounded-2 @text-black-700 border-2 border-transparent"
      :class="{'@border-black-700': selectedColor === '@text-black-500'}"
    >
      <input
        id="black"
        v-model="selectedColor"
        type="radio"
        name="colors"
        class="appearance-none"
        value="@text-black-700"
      >
      black
    </label>
  </div>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))]">
    <div
      v-for="icon in displayIcons"
      :key="icon"
      class="flex flex-col items-center p-3 m-2 border-2 border-transparent hover:opacity-60 hover:@border-primary-500 cursor-pointer"
      @click="copy(icon)"
    >
      <TIcon :src="requireIcons('./' + icon + '.svg')" class="block w-6" :class="[selectedColor]" />
      <p class="truncate mt-4">
        {{ icon }}
      </p>
    </div>
  </div>
</template>
