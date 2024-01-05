<script setup lang="ts">
import TButton from './TButton.vue'
import { Browser_Screens } from '@@/repository/Browser'
import TIcon from './TIcon.vue'
import { useThemeStore } from '@@/repository/NewTheme'

const theme = useThemeStore()

const props = defineProps<{
/** آیکن مربوط به هدر */
  headerIcon: string
/** دکمه های فوتر */
// eslint-disable-next-line no-use-before-define
  buttons: ActionSheetButton[]
/** چیدمان دکمه ها به چه صورت باشند */
  buttonsStyle: 'single' | 'double'
/** بیشترین عرض اکشن شیت */
  maxWidth?: number
/** رنگ آیکون و بکگراندش */
  iconColor: 'primary' | 'secondary' | 'tertiary' | 'error' | 'black' | 'success'
}>()

const modelValue = defineModel<boolean>({ required: true })

/** تم در چه حالتی است؟ */
const themeMode = computed(() => theme.darkMode ? 'dark' : 'light')

/** درحال انیمیت است یا خیر */
const animating = ref(false)

/** بیشترین عرض اکشن شیت */
const maxWidthStyle = computed(() => {
  return `${props.maxWidth}px`
})

/** بستن اکشن شیت */
function closeActionSheet() {
  modelValue.value = false
}

watch(modelValue, value => {
  if (!value) animating.value = true
})

</script>

<script lang="ts">

/** تایپ دکمه های اکشن شیت */
export type ActionSheetButton = {
  /** عنوان */
  title: string
  /** اکشن */
  action: (e: MouseEvent) => any,
}

/** رنگ آیکن ها و بکگراند آنها بر اساس تم روشن و تیره */
const iconConfig = {
  light: {
    primary: '@text-primary-500 @bg-primary-50',
    secondary: '@text-secondary-500 @bg-secondary-50',
    tertiary: '@text-tertiary-500 @bg-tertiary-50',
    error: '@text-error-500 @bg-error-50',
    success: '@text-success-500 @bg-success-50',
    black: '@text-black-600 @bg-black-50',
  },
  dark: {
    primary: '@text-primary-200 @bg-primary-50',
    secondary: '@text-secondary-200 @bg-secondary-50',
    tertiary: '@text-tertiary-200 @bg-tertiary-50',
    error: '@text-error-200 @bg-error-50',
    success: '@text-success-200 @bg-success-50',
    black: '@text-black-200 @bg-black-50',
  },
}

</script>

<template>
  <Teleport v-if="modelValue || animating" to="body">
    <div v-bind="$attrs">
      <Transition name="fade" appear @after-leave="animating = false">
        <div
          v-if="modelValue"
          class="@bg-black-700/60 fixed inset-0 @z-backdrop"
          @click="modelValue = false"
        />
      </Transition>
      <Transition
        :name="Browser_Screens.sm ? 'fade-zoom' : 'bottom-sheet'"
        appear
        :leave-to-class="Browser_Screens.sm ? 'scale-75 opacity-0' : 'translate-y-120%'"
        :enter-from-class="Browser_Screens.sm ? 'scale-75 opacity-0' : 'translate-y-120%'"
      >
        <div
          v-show="modelValue"
          class=":uno: @z-modal sm:max-w-441px rounded-8 fixed flex flex-col mx-auto max-h-[calc(100%-5rem)] inset-x-3 sm:inset-x-0 bottom-0 sm:-translate-y-1/2 sm:top-1/2"
          :style="{ 'max-width': maxWidthStyle }"
        >
          <div class="pt-8 relative rounded-8 @bg-black-50 @shadow-dialogs">
            <div class="w-full">
              <TButton
                :icon="require('@icons/tt-close.svg')"
                color="black"
                btn-corners="curve"
                style-type="tonal"
                :action="closeActionSheet"
                class="absolute top-0 -translate-y-1/2 start-3 @shadow-float"
              />
              <div
                class="absolute top-0 -translate-1/2 end-1/2 s-56px sm:s-72px @bg-black-200 rounded-full @flex-center @shadow-float"
                :class="[
                  iconConfig[themeMode][iconColor]
                ]"
              >
                <TIcon
                  :src="headerIcon"
                  class="s-8 sm:s-10"
                />
              </div>
              <slot name="header" />
            </div>
            <div
              class="@bg-black-100 overflow-y-scroll rounded-7 w-full grow flex flex-col items-center scroll-container"
            >
              <slot />
            </div>
          </div>
          <div
            class="w-full grid mt-2 mb-3 gap-2"
            :class="{
              'grid-cols-2' : buttonsStyle === 'double'
            }"
          >
            <TButton
              v-for="(button,index) in buttons"
              :key="index"
              color="black"
              style-type="text"
              btn-corners="curve"
              size="large"
              class="@bg-black-50"
              :action="button.action"
              :class="{
                'last:col-span-2' : buttonsStyle === 'double'
              }"
            >
              {{ button.title }}
            </TButton>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>
