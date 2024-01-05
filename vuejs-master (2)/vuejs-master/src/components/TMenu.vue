<script setup lang="ts">
import { Theme_IsDark, Theme_ToggleTheme } from '@@/repository/Theme'
import { useVModels } from '@vueuse/core'
import { useModal } from '@@/hooks/useModal'
import TIcon from './TIcon.vue'
import TAvatar, { Avatar_ID_Range } from './TAvatar.vue'
import { useTranslation } from '@@/hooks/useTranslation'

const __ = useTranslation()

const props = withDefaults(defineProps<{
  handleAddFundAction?: (e: MouseEvent) => void
  languageAction?:(e: MouseEvent) => void
  inventory?: string
  userName: string
  phoneNumber: string
  avatarId: Avatar_ID_Range
  userIsLogin: boolean
  modelValue: boolean
  corners?: 'simple' | 'curve'
  hideInventory?: boolean
  noClose?: boolean
  menuItems: {
    name: string,
    activeIcon: string,
    inactiveIcon: string,
    path: string
  }[],
  // eslint-disable-next-line vue/require-default-prop
  footerItems?: {
    title: string,
    src: string
  }[]
  isAdmin?: boolean
}>(), {
  inventory: '',
  corners: 'simple',
  handleAddFundAction: undefined,
  languageAction: undefined,
})

const language = ref<'fa' | 'en'>('fa')

const { modelValue } = useVModels(props)
const noClose = toRef(props, 'noClose')

const { show } = useModal(modelValue, { noClose })

const currentPath = ref('/home')

</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="modelValue && show" class="@bg-black-700/60 fixed inset-0 @z-menubackdrop" @click="modelValue = false" />
    </transition>
    <transition name="fade-zoom" leave-to-class="scale-75 opacity-0" enter-from-class="scale-75 opacity-0">
      <div v-if="modelValue" v-show="show" class="fixed inset-x-4 bottom-1/2 m-auto max-w-460px max-h-[calc(100%-5rem)] translate-y-1/2 @z-menu">
        <div
          class="@flex-center flex-col @bg-black-200 @shadow-cards relative w-full px-6"
          :class="corners==='simple'? 'rounded-6' : 'rounded-48px'"
        >
          <TAvatar
            v-if="userIsLogin"
            class="-translate-y-50% left-0 @shadow-dialogs"
            :avatar-id="avatarId"
            size="medium"
            :is-admin="isAdmin"
          />
          <div class="absolute end-4 flex" :class="userIsLogin ? 'top-4':'-translate-y-10 top-7'">
            <!-- @todo: move i18n into design system and remove slot tag -->
            <div class="w-7 me-3" @click="languageAction">
              <TIcon
                v-model="language"
                src="@icons/tt-language.svg"
                class="@text-black-600 mt-1 cursor-pointer"
              />
            </div>
            <button class="w-7" @click="Theme_ToggleTheme">
              <TIcon
                v-if="!Theme_IsDark"
                src="@icons/b-moon.svg"
                class="@text-black-600 mt-1 cursor-pointer"
              />
              <TIcon
                v-else
                src="@icons/b-sun.svg"
                class="@text-black-600 mt-1 cursor-pointer"
              />
            </button>
          </div>
          <button class="absolute start-4 w-7 rounded-full" :class="userIsLogin ? 'top-4':'-translate-y-10  top-7'">
            <TIcon
              src="@icons/b-close-circle.svg"
              @click="modelValue = false"
            />
          </button>
          <div
            class="@flex-center -mt-8"
          >
            <div>
              <div class="@text-title font-bold mt-2 text-center truncate max-w-50 @flex-center" :class="userIsLogin ? '':'hidden'">
                <span class="truncate @text-title">{{ userName }}</span>
              </div>
              <div v-if="userIsLogin" dir="ltr" class="@text-subtitle1 @text-black-600 text-center mt-2">
                {{ phoneNumber }}
              </div>
            </div>
          </div>

          <div
            v-if="userIsLogin && !props.hideInventory"
            class="@flex-center mt-3"
            @click="handleAddFundAction"
          >
            <div class="grow @text-subtitle2 @bg-secondary-300/12 @text-secondary-400 py-10px px-14px rounded-12 me-14px">
              <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
              {{ __('tsitfy.remaining-credit') }} :‌<strong class="ms-3 @text-h2"> {{ inventory }}</strong>
            </div>
            <TIcon
              src="@icons/b-plus.svg"
              class="w-8 h-8 block @text-secondary-400 cursor-pointer"
            />
          </div>
          <ul
            class="grid grid-cols-3 gap-2 w-full my-3 max-h-292px overflow-y-auto scroll-container"
          >
            <li
              v-for="item in menuItems"
              :key="item.name"
              class="@flex-center rounded-7"
              :class="{ '@bg-primary-500/12': currentPath === item.path , 'hidden': !userIsLogin }"
              @click="currentPath = item.path"
            >
              <router-link :to="item.path" class="flex h-full px-4 py-2 w-full flex-col items-center cursor-pointer @text-black-600" @click="modelValue = false">
                <div class="w-6 h-6 mx-auto">
                  <TIcon
                    v-if="currentPath === item.path"
                    class="@text-primary-500"
                    :src="item.activeIcon"
                  />
                  <TIcon
                    v-else
                    :src="item.inactiveIcon"
                  />
                </div>
                <p class="@text-subtitle1 mt-4 @text-black-600 text-center" :class="{'@text-subtitle2 @text-black-800': currentPath === item.path}">
                  {{ item.name }}
                </p>
              </router-link>
            </li>
          </ul>
        </div>
        <div
          v-if="footerItems?.length"
          class="@bg-black-200 px-3 -z-1 "
          :class="[
            {
              'rounded-6': !userIsLogin && corners==='simple',
              'rounded-48px': !userIsLogin && corners==='curve',
            },
            userIsLogin? 'pt-9 -mt-44px' : 'pt-50px -mt-33px',
            corners==='simple'? 'rounded-b-6' : 'rounded-b-48px',
          ]"
        >
          <div class="pb-6 grid grid-cols-3 gap-x-1 gap-y-3 mt-5">
            <button
              v-for="item in footerItems"
              :key="item.title"
              class="h-7 @text-black-600 @bg-black-300 rounded-7 @text-subtitle1"
            >
              <router-link :to="item.src" @click="modelValue = false">
                {{ item.title }}
              </router-link>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
