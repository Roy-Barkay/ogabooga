<script setup lang="ts">
import useAsyncMethod from '@@/hooks/useAsyncMethod'
import { AppState_MenuItems } from '@@/demo/repository/AppState'
import { useI18nStore } from '@@/repository/I18n'
import TSidebar from '@@/components/TSidebar.vue'
import { useThemeStore } from '@@/repository/NewTheme'
import { Browser_Screens } from '@@/repository/Browser'
import TAvatar from '@@/components/TAvatar.vue'

const i18nStore = useI18nStore()
const theme = useThemeStore()

const TToast = defineAsyncComponent(() => import('../components/TToast.vue'))
const TTooltip = defineAsyncComponent(() => import('../components/TTooltip.vue'))
const TConfirm = defineAsyncComponent(() => import('../components/TConfirm.vue'))

const { LoadingContainer } = useAsyncMethod(() => {
  return Promise.all([
    i18nStore.init(),
    theme.init(),
  ])
})

</script>

<template>
  <LoadingContainer>
    <div class="sm:flex sm:items-start mt-10">
      <TSidebar
        class="mx-6 lg:min-w-268px"
        :items="AppState_MenuItems"
      >
      <template #header>
          <div class="flex justify-center items-center lg:px-3 lg:justify-start">
            <TAvatar
              :avatar-id="13"
              size="medium"
              class="lg:me-4"
            />

            <div v-if="Browser_Screens.lg" class="truncate">
              <p class="@text-subtitle2 truncate">
              اسم یارو
              </p>
              <p class="@text-subtitle1 @text-black-700 mt-1">
                <span dir="ltr">
                  ۰۹۳۰۲۱۰۰۰۰
                </span>
              </p>
            </div>
          </div>

          <div
            class=" mt-5 cursor-pointer sm:@flex-center lg:px-3"
          >
            <div v-if="Browser_Screens.lg" class="grow @text-overline @bg-complementary-300 w-184px @text-complementary-400 py-10px px-14px rounded-12 me-14px @text-subtitle2">
              موجودی یارو: ‌<strong> ۲۰۰۰۰ </strong>
            </div>
            <TIcon src="@icons/b-plus.svg" class="w-7 h-7 block @text-complementary-400" />
          </div>
        </template>
        <template #footer>
          <div
            class="flex items-center flex-col lg:start-0 lg:justify-between lg:w-full lg:px-5 lg:flex-row"
          >
            <button class="flex items-center">
              <TIcon class="@text-error-500 s-7 block" />
              <span v-if="Browser_Screens.lg" class="@text-body @text-error-500 grow text-start ms-4">
                 هر چی تو فوتر
              </span>
            </button>
          </div>
        </template>
    </TSidebar>
      <router-view v-slot="{ Component, route }">
        <Transition name="slide-fade" mode="out-in" :duration="200">
          <div :key="route.path" class="grow min-w-0">
            <component :is="Component" />
          </div>
        </Transition>
      </router-view>
    </div>
  </LoadingContainer>
  <TConfirm />
  <TToast />
  <TTooltip />
</template>
