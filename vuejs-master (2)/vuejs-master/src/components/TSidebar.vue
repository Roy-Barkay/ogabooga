<script setup lang="ts">
import { Browser_Screens } from '@@/repository/Browser'
import MenuItem, { MenuItemType } from './MenuItem.vue'
import { useRoute } from 'vue-router'

defineProps<{
  /** گزینه های روی ساید بار */
  items: MenuItemType[],
}>()

const route = useRoute()

const currentPath = computed(() => route.path)

const activeIndex = ref(-1)

function handleItemClick(index: number) {
  if (activeIndex.value === index) {
    activeIndex.value = -1
  } else {
    activeIndex.value = index
  }
}

</script>

<template>
  <div
    v-if="Browser_Screens.sm"
    class="bg-gradient-to-b from-[rgb(var(--black-200))] to-[rgb(var(--black-50))] @shadow-cards pt-6 rounded-35px pb-4 w-71px lg:w-268px flex flex-col"
  >
    <slot name="header" />
    <div class="mt-4 mb-5 overflow-y-scroll scroll-container w-full grow">
      <TransitionGroup name="slide">
        <MenuItem
          v-for="(item, i) in items"
          :key="item.path"
          :item="item"
          :current-path="currentPath"
          :is-active="activeIndex === i"
          @on-item-click="handleItemClick(i)"
        />
      </TransitionGroup>
    </div>
    <slot name="footer" />
  </div>
</template>
