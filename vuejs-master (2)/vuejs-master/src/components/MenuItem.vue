<script lang="ts">

export type MenuItemType = {
  name: string
  activeIcon: string
  inactiveIcon: string
  bgClass?: string
  textClass?: string
  path: string
  admin?: boolean
  children?: {
    name: string
    activeIcon: string
    inactiveIcon: string
    path: string
    bgClass?: string
    textClass?: string
    admin?: boolean
  }[]
}

</script>

<script setup lang="ts">
import { Browser_Screens } from '@@/repository/Browser'
import TIcon from './TIcon.vue'

const props = defineProps<{
  item: MenuItemType
  isActive: boolean
  currentPath: string
}>()

defineEmits<{
  (event: 'onItemClick'): void
}>()

const isRotated = ref(false)

/** اگر رشته ی مسیر کنونی با رشته ی مسیر آیتمی که روی رو آن هستیم شروع می شد آیتم فعال هست */
function isActiveItem() {
  return props.currentPath.startsWith(props.item.path)
}

</script>
<template>
  <div :key="item.path" class="list-none pb-2 lg:me-3">
    <li class="cursor-pointer relative lg:hover:@bg-primary-500/10 group transition-colors duration-200 rounded-3 justify-center ms-18px">
      <div v-if="isActiveItem() && !item.children" class="@bg-primary-500 h-44px w-1 absolute top-1/2 -translate-y-1/2 -start-4 rounded-e-38px" />
      <div v-if="item.children" @click="isRotated = !isRotated">
        <button class="flex items-center w-full py-2 lg:px-2 lg:group-hover:@text-primary-500" @click="$emit('onItemClick')">
          <div class="flex w-full items-center">
            <TIcon :src="item.inactiveIcon" class="block w-7 me-4 @text-black-600 lg:group-hover:@text-primary-500" />
            <span
              v-if="Browser_Screens.lg"
              class="lg:group-hover:@text-primary-500"
              :class="isActiveItem() ? '@text-title @text-black-700' : '@text-body @text-black-600'"
            >
              {{ item.name }}
            </span>
          </div>
          <TIcon
            v-if="Browser_Screens.lg"
            :class="[{ 'rotate': isRotated , 'rotate-back': !isRotated }]"
            src="@@/assets/icons/tt-arrow-down.svg"
            class="s-7 me-6px"
          />
        </button>
      </div>
      <router-link
        v-else
        :to="item.path"
        class="flex items-center w-full py-2 lg:px-2"
        :class="{ 'justify-between': item.children }"
      >
        <div class="s-7 me-4 relative">
          <Transition name="fade">
            <TIcon v-if="isActiveItem()" :src="item.activeIcon" class="s-full block absolute @text-primary-500" />
            <TIcon v-else :src="item.inactiveIcon" class="s-full block absolute @text-black-600 lg:group-hover:@text-primary-500" />
          </Transition>
        </div>
        <span
          v-if="Browser_Screens.lg"
          class="transition-colors duration-200"
          :class="isActiveItem() ? '@text-title @text-primary-500' : '@text-body @text-black-600 lg:group-hover:@text-primary-500'"
        >
          {{ item.name }}
        </span>
      </router-link>
    </li>

    <Transition name="slide-down">
      <ul v-if="isActive && item.children && Browser_Screens.lg" :key="item.name" class="ms-3 my-3 lg:px-2">
        <li :key="item.name">
          <router-link
            v-for="child in item.children"
            :key="child.path"
            :to="child.path"
            class="block flex items-center whitespace-nowrap border-s-3px @border-black-300 ps-4 py-2.5 @text-subtitle1 @text-black-500 lg:hover:@bg-primary-500/10 group rounded-e-3"
            :class="{ '@border-primary-500 @text-primary-500': currentPath === child.path }"
          >
            <TIcon v-if="currentPath === child.path" :src="child.activeIcon" class="block s-6 me-4 @text-primary-500" />
            <TIcon
              v-else
              :src="child.inactiveIcon"
              class="block s-6 me-4 @text-black-600 lg:group-hover:@text-primary-500"
              :class="{ '@text-primary-500': currentPath === child.path }"
            />
            <span class="lg:group-hover:@text-primary-500">{{ child.name }}</span>
          </router-link>
        </li>
      </ul>
    </Transition>
    <Transition name="fade">
      <div v-if="isActive && item.children && !Browser_Screens.lg" class="absolute min-w-150px rounded-6 @card ms-62px -mt-8 @z-tooltip @bg-black-100">
        <router-link
          v-for="child in item.children"
          :key="child.path"
          :to="child.path"
          class="flex whitespace-nowrap ps-4 py-4 @text-subtitle1 @text-black-600"
          :class="{ '@text-primary-500': currentPath === child.path }"
        >
          <TIcon v-if="currentPath === child.path" :src="child.activeIcon" class="block s-6 me-4 @text-primary-500" />
          <TIcon
            v-else
            :src="child.inactiveIcon"
            class="block s-6 me-4 @text-black-600"
            :class="{ '@text-primary-500': currentPath === child.path }"
          />
          <span>{{ child.name }}</span>
        </router-link>
      </div>
    </Transition>
  </div>
</template>
