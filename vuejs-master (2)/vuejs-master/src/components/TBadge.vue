<script lang="ts">

/** کانفیگ رنگ ها */
const config = {
  primary: {
    solid: ':uno: @bg-primary-500 @text-black-50',
    tonal: ':uno: @bg-primary-500/12 @text-primary-500',
    outlined: ':uno: @bg-primary-500/12 @text-primary-500 @border-primary-200',
  },
  warning: {
    solid: ':uno: @bg-warning-500 @text-black-50',
    tonal: ':uno: @bg-warning-500/12 @text-warning-500',
    outlined: ':uno: @bg-warning-500/12 @text-warning-500 @border-warning-200',
  },
  error: {
    solid: ':uno: @bg-error-500 @text-black-50',
    tonal: ':uno: @bg-error-500/12 @text-error-500',
    outlined: ':uno: @bg-error-500/12 @text-error-500 @border-error-200',
  },
  success: {
    solid: ':uno: @bg-success-500 @text-black-50',
    tonal: ':uno: @bg-success-500/12 @text-success-500',
    outlined: ':uno: @bg-success-500/12 @text-success-500 @border-success-200',
  },
  black: {
    solid: ':uno: @bg-black-600 @text-black-50',
    tonal: ':uno: @bg-black-600/12 @text-black-600',
    outlined: ':uno: @bg-black-600/12 @text-black-600 @border-black-200',
  },
  info: {
    solid: ':uno: @bg-info-500 @text-black-50',
    tonal: ':uno: @bg-info-500/12 @text-info-500',
    outlined: ':uno: @bg-info-500/12 @text-info-500 @border-info-200',
  },
  secondary: {
    solid: ':uno: @bg-secondary-500 @text-black-50',
    tonal: ':uno: @bg-secondary-500/12 @text-secondary-500',
    outlined: ':uno: @bg-secondary-500/12 @text-secondary-500 @border-secondary-200',
  },
  tertiary: {
    solid: ':uno: @bg-tertiary-500 @text-black-50',
    tonal: ':uno: @bg-tertiary-500/12 @text-tertiary-500',
    outlined: ':uno: @bg-tertiary-500/12 @text-tertiary-500 @border-tertiary-200',
  },
}

</script>

<script setup lang="ts">
import TIcon from './TIcon.vue'

const props = withDefaults(defineProps<{
  /** آیکون */
  icon?: string,
  /** سایز */
  size?: 'large' | 'medium' | 'small',
  /** استایل تایپ */
  styleType?: 'solid' | 'tonal' | 'outlined',
  /** گوشه های کامپوننت */
  btnCorners?: 'simple' | 'curve',
  /** رنگ */
  color?: 'primary' | 'error' | 'black' | 'success' | 'warning' | 'info'
  /** بج فعال است یا غیر فعال؟ */
  disabled?: boolean
  /**  نوع بج ها */
  type?: 'text' | 'icon' | 'number' | 'empty'

}>(), {
  icon: '',
  size: 'medium',
  styleType: 'solid',
  btnCorners: 'simple',
  color: 'primary',
  disabled: false,
  type: 'empty',
})

const slots = useSlots()

/** اسلات از نوع دیفالت برای تایپ متن */
const hasSlot = computed(() => slots?.default)

</script>

<template>
  <div>
    <div
      v-if="type === 'text'"
      class=":uno: outline-none border-2 border-solid border-transparent inline-block"
      :class="[
        {
          ':uno: px-3 md:min-w-59px min-w-57px @text-subtitle2 h-8 md:h-9': props.size === 'large',
          ':uno: px-10px md:min-w-55px min-w-53px @text-subtitle2 h-7 md:h-8': props.size === 'medium',
          ':uno: px-2 md:min-w-48px min-w-46px @text-subtitle2 h-6 md:h-7': props.size === 'small',

          'rounded-10px md:rounded-3': props.btnCorners === 'simple' && props.size === 'large',
          'rounded-2 md:rounded-10px': props.btnCorners === 'simple' && props.size === 'medium',
          'rounded-6px md:rounded-10px': props.btnCorners === 'simple' && props.size === 'small',
          'rounded-22px': props.btnCorners === 'curve' && ['small', 'medium', 'large'].includes(props.size),

          ':uno: @bg-black-400': props.disabled && props.styleType === 'solid',
          ':uno: @bg-black-300 @text-black-500': props.disabled && props.styleType === 'tonal',
          ':uno: @text-black-500 @border-black-400 @bg-black-300': props.disabled && props.styleType === 'outlined',
        },
        config[props.color][props.styleType],
      ]"
    >
      <div class="@flex-center h-full">
        <span v-if="hasSlot">
          <slot name="default" />
        </span>
      </div>
    </div>
    <div
      v-else-if="type === 'icon'"
      class=":uno: outline-none border-2 border-solid border-transparent inline-block"
      :class="[
        {
          'rounded-10px md:rounded-3': props.btnCorners === 'simple',
          'rounded-2 md:rounded-10px': props.btnCorners === 'simple' && props.size === 'medium',
          'rounded-6px md:rounded-10px': props.btnCorners === 'simple' && props.size === 'small',
          'rounded-17px': props.btnCorners === 'curve' && ['medium', 'small'].includes(props.size),

          ':uno: h-6 w-8 md:h-7 md:w-9':props.size === 'small',
          ':uno: h-7 w-10 md:h-8 md:w-48px': props.size === 'medium',

          ':uno: @bg-black-400': props.disabled && props.styleType === 'solid' ,
          ':uno: @bg-black-300 @text-black-500': props.disabled && props.styleType === 'tonal',
          ':uno: @text-black-500 @border-black-400 @bg-black-300': props.disabled && props.styleType === 'outlined',
        },
        config[props.color][props.styleType],
      ]"
    >
      <div class="@flex-center h-full">
        <TIcon
          v-if="props.icon"
          :src="props.icon"
          :class="[
            {
              's-4 md:s-5': props.size === 'small',
              's-5 md:s-6': props.size === 'medium',
            },
          ]"
        />
      </div>
    </div>
    <div
      v-else-if="type === 'number'"
      class=":uno: outline-none border-2 border-solid border-transparent inline-block"
      :class="[
        {
          'rounded-6px md:rounded-2': props.btnCorners === 'simple',
          'rounded-full': props.btnCorners === 'curve',

          ':uno: h-4 px-1 md:h-5 @text-overline': ['medium', 'large'].includes(props.size),

          ':uno: @bg-black-400': props.disabled && props.styleType === 'solid',
          ':uno: @bg-black-300 @text-black-500': props.disabled && props.styleType === 'tonal',
          ':uno: @text-black-500 @border-black-400 @bg-black-300': props.disabled && props.styleType === 'outlined',
        },
        config[props.color][props.styleType],
      ]"
    >
      <div class="@flex-center h-full">
        <span v-if="hasSlot">
          <slot name="default" />
        </span>
      </div>
    </div>
    <div
      v-else
      class=":uno: outline-none border-2 border-solid border-transparent inline-block"
      :class="[
        {
          ':uno: rounded-100px s-6px md:s-10px': props.btnCorners === 'simple',
          ':uno: rounded-6px s-6px md:s-10px': props.btnCorners === 'curve',

          ':uno: w-16px md:w-5': props.size === 'medium',
          ':uno: h-4 w-22px md:h-5 md:w-23px': props.size === 'large',

          ':uno: @bg-black-400': props.disabled && props.styleType === 'solid',
          ':uno: @bg-black-300 @text-black-500': props.disabled && props.styleType === 'tonal',
          ':uno: @text-black-500 @border-black-400 @bg-black-300': props.disabled && props.styleType === 'outlined',
        },
        config[props.color][props.styleType],
      ]"
    />
  </div>
</template>
