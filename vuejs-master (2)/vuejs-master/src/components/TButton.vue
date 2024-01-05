<script lang="ts">

const config = {
  primary: {
    solid: ':uno: @bg-primary-500 @text-black-50 hover:@bg-primary-700 disabled:@bg-black-400 disabled:hover:@bg-black-400',
    tonal: ':uno: @bg-primary-500/10 @text-primary-500 hover:@bg-primary-500/20 disabled:@bg-black-300 disabled:@text-black-500 disabled:hover:@bg-black-300',
    outlined: ':uno: @bg-black-50 @text-primary-500 @border-primary-200 hover:@border-primary-500 disabled:@text-black-500  disabled:@border-black-400 disabled:hover:@border-black-400',
    text: ':uno: @text-primary-500 hover:@bg-primary-500/10 disabled:@text-black-500 disabled:hover:bg-transparent',
  },
  secondary: {
    solid: ':uno: @bg-secondary-500 @text-black-50 hover:@bg-secondary-700 disabled:@bg-black-400 disabled:hover:@bg-black-400',
    tonal: ':uno: @bg-secondary-500/10 @text-secondary-500 hover:@bg-secondary-500/20 disabled:@bg-black-300 disabled:@text-black-500 disabled:hover:@bg-black-300',
    outlined: ':uno: @bg-black-50 @text-secondary-500 @border-secondary-200 hover:@border-secondary-500 disabled:@text-black-500  disabled:@border-black-400 disabled:hover:@border-black-400',
    text: ':uno: @text-secondary-500 hover:@bg-secondary-500/10 disabled:@text-black-500 disabled:hover:bg-transparent',
  },
  tertiary: {
    solid: ':uno: @bg-tertiary-500 @text-black-50 hover:@bg-tertiary-700 disabled:@bg-black-400 disabled:hover:@bg-black-400',
    tonal: ':uno: @bg-tertiary-500/10 @text-tertiary-500 hover:@bg-tertiary-500/20 disabled:@bg-black-300 disabled:@text-black-500 disabled:hover:@bg-black-300',
    outlined: ':uno: @bg-black-50 @text-tertiary-500 @border-tertiary-200 hover:@border-tertiary-500 disabled:@text-black-500  disabled:@border-black-400 disabled:hover:@border-black-400',
    text: ':uno: @text-tertiary-500 hover:@bg-tertiary-500/10 disabled:@text-black-500 disabled:hover:bg-transparent',
  },
  error: {
    solid: ':uno: @bg-error-500 @text-black-50 hover:@bg-error-700 disabled:@bg-black-400 disabled:hover:@bg-black-400',
    tonal: ':uno: @bg-error-500/10 @text-error-500 hover:@bg-error-500/20 disabled:@bg-black-300 disabled:@text-black-500 disabled:hover:@bg-black-300',
    outlined: ':uno: @bg-black-50 @text-error-500 @border-error-200 hover:@border-error-500 disabled:@text-black-500  disabled:@border-black-400 disabled:hover:@border-black-400',
    text: ':uno: @text-error-500 hover:@bg-error-500/10 disabled:@text-black-500 disabled:hover:bg-transparent',
  },
  success: {
    solid: ':uno: @bg-success-500 @text-black-50 hover:@bg-success-700 disabled:@bg-black-400 disabled:hover:@bg-black-400',
    tonal: ':uno: @bg-success-500/10 @text-success-500 hover:@bg-success-500/20 disabled:@bg-black-300 disabled:@text-black-500 disabled:hover:@bg-black-300',
    outlined: ':uno: @bg-black-50 @text-success-500 @border-success-200 hover:@border-success-500 disabled:@text-black-500  disabled:@border-black-400 disabled:hover:@border-black-400',
    text: ':uno: @text-success-500 hover:@bg-success-500/10 disabled:@text-black-500 disabled:hover:bg-transparent',
  },
  gray: {
    solid: ':uno: @bg-black-500 @text-black-50 hover:@bg-black-700 disabled:@bg-black-400 disabled:hover:@bg-black-400',
    tonal: ':uno: @bg-black-500/10 @text-black-500 hover:@bg-black-500/20 disabled:@bg-black-300 disabled:@text-black-500 disabled:hover:@bg-black-300',
    outlined: ':uno: @bg-black-50 @text-black-500 @border-black-200 hover:@border-black-500 disabled:@text-black-500  disabled:@border-black-400 disabled:hover:@border-black-400',
    text: ':uno: @text-black-600 hover:@bg-black-600/10 disabled:@text-black-500 disabled:hover:bg-transparent',
  },
  black: {
    solid: ':uno: @bg-black-700/90 @text-black-50 disabled:@bg-black-400 disabled:hover:@bg-black-400',
    tonal: ':uno: @bg-black-100 @text-black-700 disabled:@bg-black-300 disabled:@text-black-500 disabled:hover:@bg-black-300',
    outlined: ':uno: @bg-black-50 @text-black-700 @border-black-700/40 disabled:@text-black-500 disabled:@border-black-400 disabled:hover:@border-black-400',
    text: ':uno: @bg-black-50 @text-black-700 hover:@bg-black-700/10 disabled:@text-black-500 disabled:hover:bg-transparent @shadow-toasts',
  },
  info: {
    solid: ':uno: @bg-info-500 @text-black-50 hover:@bg-info-200 disabled:@bg-black-400 disabled:hover:@bg-black-400',
    tonal: ':uno: @bg-info-500/10 @text-info-500 hover:@bg-info-500/20 disabled:@bg-black-300 disabled:@text-black-500 disabled:hover:@bg-black-300',
    outlined: ':uno: @bg-black-50 @text-info-500 @border-info-200 hover:@border-info-500 disabled:@text-black-500  disabled:@border-black-400 disabled:hover:@border-black-400',
    text: ':uno: @text-info-500 hover:@bg-info-500/10 disabled:@text-black-500 disabled:hover:bg-transparent',
  },
}

const shadowsConfig = {
  primary: 'shadow-[0px_15px_40px_rgba(var(--primary-500),0.4)] hover:shadow-[0px_8px_20px_rgba(var(--primary-500),0.4)]',
  secondary: 'shadow-[0px_15px_40px_rgba(var(--secondary-500),0.4)] hover:shadow-[0px_8px_20px_rgba(var(--secondary-500),0.4)]',
  tertiary: 'shadow-[0px_15px_40px_rgba(var(--tertiary-500),0.4)] hover:shadow-[0px_8px_20px_rgba(var(--tertiary-500),0.4)]',
  error: 'shadow-[0px_15px_40px_rgba(var(--error-500),0.4)] hover:shadow-[0px_8px_20px_rgba(var(--error-500),0.4)]',
  success: 'shadow-[0px_15px_40px_rgba(var(--success-500),0.4)] hover:shadow-[0px_8px_20px_rgba(var(--success-500),0.4)]',
  gray: 'shadow-[0px_15px_40px_rgba(var(--black-500),0.4)] hover:shadow-[0px_8px_20px_rgba(var(--black-500),0.4)]',
  black: 'shadow-[0px_15px_40px_rgba(var(--black-700),0.4)] hover:shadow-[0px_8px_20px_rgba(var(--black-700),0.4)]',
  info: 'shadow-[0px_15px_40px_rgba(var(--black-500),0.4)] hover:shadow-[0px_8px_20px_rgba(var(--black-500),0.4)]',
}

export default {}
</script>

<script lang="ts" setup>
import TIcon from './TIcon.vue'
import { handleCommonError } from '@@/utils'
import TCircleLoading from './TCircleLoading.vue'

const props = withDefaults(defineProps<{
  icon?: string,
  size?: 'xlarge' | 'large' | 'xmedium' | 'medium' | 'small',
  styleType?: 'solid' | 'tonal' | 'outlined' | 'text',
  btnCorners?: 'simple' | 'curve',
  type?: 'button' | 'submit' | 'reset',
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'black' | 'success' | 'info' | 'gray'
  loading?: boolean
  disabled?: boolean
  shadow?: boolean
  action?: (e: MouseEvent) => any,
  /** آیدی فرمی که دکمه به آن تعلق دارد  */
  form?: string
}>(), {
  icon: '',
  size: 'medium',
  styleType: 'solid',
  btnCorners: 'simple',
  type: 'submit',
  color: 'primary',
  loading: false,
  disabled: false,
  shadow: false,
  form: undefined,
  action: (e: any) => { return null },
})

const innerLoading = ref(false)
const generalLoading = computed(() => props.loading || innerLoading.value)
const button = ref<HTMLButtonElement | undefined>()

const emit = defineEmits(['click', 'prev', 'next'])

const slots = useSlots()
const hasSlot = computed(() => slots?.default)

function fixButtonWidthOnLoading() {
  const buttonWidth = button.value!.offsetWidth
  button.value!.style.minWidth = buttonWidth + 'px'
}

function handleClick(e: MouseEvent) {
  if (props.disabled) return
  if (generalLoading.value) return
  emit('click', e)

  if (props.action != null) {
    fixButtonWidthOnLoading()

    const result = props.action(e)
    if (result instanceof Promise) {
      innerLoading.value = true
      result
        .catch(handleCommonError)
        .finally(() => {
          innerLoading.value = false
        })
    }
  }
}

function getShadow() {
  if (props.shadow && props.styleType === 'solid') {
    return shadowsConfig[props.color]
  }
}

</script>

<template>
  <button
    v-bind="$attrs"
    ref="button"
    class=":uno: relative outline-none border-2 border-solid border-transparent @flex-center font-extrabold cursor-pointer transition-colors duration-200 disabled:cursor-default "
    :type="props.type"
    :disabled="disabled"
    :form="props.form"
    :class="[
      {

        ':uno: px-6 md:px-8': hasSlot && props.size === 'xlarge',
        ':uno: px-5 md:px-7': hasSlot && props.size === 'large',
        ':uno: px-5': hasSlot && ['medium', 'xmedium'].includes(props.size),
        ':uno: px-4 md:px-5': hasSlot && props.size === 'small',

        'rounded-3 md:rounded-4': props.btnCorners === 'simple' && ['xlarge', 'large'].includes(props.size),
        'rounded-10px md:rounded-3': props.btnCorners === 'simple' && ['xmedium'].includes(props.size),
        'rounded-2 md:rounded-3': props.btnCorners === 'simple' && ['medium', 'small'].includes(props.size),
        'rounded-32px md:rounded-44px': hasSlot && props.btnCorners === 'curve' && ['xlarge', 'large'].includes(props.size),
        'rounded-18px md:rounded-22px': hasSlot && props.btnCorners === 'curve' && ['medium', 'small'].includes(props.size),
        'rounded-9': props.btnCorners === 'curve' && ['xmedium'].includes(props.size),
        'rounded-34px': !hasSlot && props.btnCorners === 'curve' && ['xlarge', 'large'].includes(props.size),
        'rounded-22px': !hasSlot && props.btnCorners === 'curve' && ['medium', 'small'].includes(props.size),

        ':uno: h-13 min-w-120px md:h-17 md:min-w-156px text-13px md:text-15px': hasSlot && props.size === 'xlarge',
        ':uno: h-48px min-w-112px md:h-14 md:min-w-152px text-13px md:text-15px': hasSlot && props.size === 'large',
        ':uno: h-44px min-w-80px md:h-48px md:min-w-100px text-12px md:text-13px': hasSlot && props.size === 'xmedium',
        ':uno: h-9 min-w-80px md:h-11 md:min-w-100px text-12px md:text-13px': hasSlot && props.size === 'medium',
        ':uno: h-7 min-w-80px md:h-10 md:min-w-88px text-12px md:text-13px': hasSlot && props.size === 'small',

        ':uno: h-7 min-w-7 md:h-10 md:min-w-10': !hasSlot && props.size === 'small',
        ':uno: h-9 min-w-9 md:h-44px md:min-w-44px': !hasSlot && props.size === 'medium',
        ':uno: h-44px min-w-44px md:h-48px md:min-w-48px': !hasSlot && props.size === 'xmedium',
        ':uno: h-48px min-w-48px md:h-56px md:min-w-56px': !hasSlot && props.size === 'large',
        ':uno: h-52px min-w-52px md:h-68px md:min-w-68px': !hasSlot && props.size === 'xlarge',
        'duration-300 disabled:hover:shadow-[0px_15px_40px_rgba(var(--black-400),0.4)] disabled:shadow-[0px_15px_40px_rgba(var(--black-400),0.4)]': shadow,
      },
      config[props.color][props.styleType],
      getShadow(),
    ]"
    @click="handleClick"
  >
    <template v-if="generalLoading">
      <TCircleLoading />
    </template>

    <template v-else>
      <TIcon
        v-if="props.icon"
        class="block shirnk-0"
        :class="{
          'me-2 s-6': hasSlot,
          's-18px md:s-6': !hasSlot && props.size === 'small',
          's-6 md:s-7': !hasSlot && ['medium', 'xmedium'].includes(props.size),
          's-7 md:s-8': !hasSlot && props.size === 'large',
          's-8 md:s-10': !hasSlot && props.size === 'xlarge',
        }"
        :src="props.icon"
      />
      <span v-if="hasSlot">
        <slot name="default" />
      </span>
    </template>
  </button>
</template>
