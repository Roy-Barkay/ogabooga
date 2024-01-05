<script lang="ts" setup>
import { currencySeperator, fromFarsiNumbers } from '@@/utils'
import { useVModel } from '@vueuse/core'
import TIcon from '@@/components/TIcon.vue'
import TInputText from './TInputText.vue'
import { BaseInput_CommonProps, BaseInput_Config } from './base/BaseInput.vue'
import { useTranslation } from '@@/hooks/useTranslation'

const __ = useTranslation()

const props = defineProps({
  ...BaseInput_CommonProps,
  modelValue: {
    type: Number,
    default: undefined,
  },
  currencyTitle: {
    type: String,
    default: 'rial',
  },
})
const emit = defineEmits<{
  (event: 'update:modelValue', payload: number): void
}>()

const modelValue = useVModel(props)
const inputValue = ref('')
const elem = ref<HTMLInputElement | null>()
const isFocused = ref(false)
const isFilledOut = computed(() => !!modelValue.value)
const shouldAnimateLabelToTop = computed(() => isFocused.value || isFilledOut.value)
const config = BaseInput_Config
const state = computed(() => {
  if (isFocused.value) return 'focused'
  if (isFilledOut.value) return 'filledOut'
  return 'enabled'
})

const mode = computed(() => {
  if (props.error) return 'error'
  return 'default'
})

/** واحد پولی که درون اینپوت نوشته می‌شود  */
const currency = computed(() => props.currencyTitle === 'rial' ? __('tsitfy.rial') : props.currencyTitle)

watch(() => props.modelValue, newValue => {
  autoCorrect(`${newValue || ''}`)
})

function reset() {
  modelValue.value = ''
  elem.value?.focus()
}

function prependIconHandler(e: Event) {
  e.preventDefault()
  props.prependIconAction?.()
}

function autoCorrect(newValue?: string) {
  // eslint-disable-next-line prefer-regex-literals
  const validPattern = new RegExp(`^(?:(?:\\d\\d?\\d?)(?:,\\d{3})*|\\d{4})$`)
  const value = elem.value!.value.replace(/[۰۱۲۳۴۵۶۷۸۹]/g, char => fromFarsiNumbers[char as keyof typeof fromFarsiNumbers])

  let numberValue = value.replace(/\D/g, '')
  if (numberValue === newValue) {
    // اگر از قبل پردازش انجام شده بود دوباره انجام نشود
    return
  } else if (newValue != null) {
    // اگر مقدار جدیدی فرستاده شده بود باید اعمال شود
    numberValue = newValue
  } else if (validPattern.test(value)) {
    // اگر مقدار جدیدی تعیین نشده بود، باید دید که مقدار کنونی معتبر است یا نه
    emit('update:modelValue', +numberValue)
    return
  }

  const finalValue = currencySeperator(numberValue)
  const caretPosition = elem.value!.selectionStart
  const countOfDigitsAfterCaret = value.substr(caretPosition!).replace(/\D/g, '').length
  const countOfSeparatorsAfterCaret = Math.max(Math.ceil(countOfDigitsAfterCaret / 3) - 1, 0)
  const newCaretPosition = finalValue.length - (countOfSeparatorsAfterCaret + countOfDigitsAfterCaret)

  elem.value!.value = finalValue
  elem.value!.setSelectionRange(newCaretPosition, newCaretPosition)
  emit('update:modelValue', +numberValue)
}

onMounted(() => {
  elem.value!.addEventListener('keydown', (event: KeyboardEvent) => {
    const key = event.key
    const prevChar = elem.value!.value[elem.value!.selectionStart! - 1]
    const nextChar = elem.value!.value[elem.value!.selectionStart!]

    if (key === 'Backspace' || event.which === 8) {
      if (prevChar === ',') {
        event.preventDefault()
        elem.value!.setSelectionRange(elem.value!.selectionStart! - 2, elem.value!.selectionStart! - 1)
        document.execCommand('delete')
      }
    }
    if (key === 'Delete' || event.which === 46) {
      if (nextChar === ',') {
        event.preventDefault()
        elem.value!.setSelectionRange(elem.value!.selectionStart! + 1, elem.value!.selectionStart! + 2)
        document.execCommand('delete')
      }
    }
  })

  autoCorrect(`${props.modelValue || ''}`)
})

</script>

<template>
  <div class="flex">
    <div class="select-none grow">
      <div
        class="flex items-center h-48px  px-3 rounded-14px relative sm:h-54px"
        :class="[
          config[styleType].background[state][mode], config[styleType].border[state][mode],
          { 'cursor-pointer': cursorPointer }
        ]"
      >
        <span
          v-if="floatingLabel && label"
          class="transition-transform transform-origin-right duration-300 absolute px-1 @text-title rounded-8px pointer-events-none start-3 min-w-0"
          :class="[
            { 'scale-85 -translate-y-full @bg-black-200': shouldAnimateLabelToTop },
            { '-translate-x-7': !shouldAnimateLabelToTop && prependIcon },
            config[styleType].label[state][mode],
          ]"
        >
          {{ label }}
        </span>
        <TIcon
          v-if="prependIcon"
          :src="prependIcon"
          class="shrink-0 w-6 h-6 me-1 cursor-pointer"
          :class="[config[styleType].icon[state][mode]]"
          @click="prependIconHandler"
        />
        <input
          ref="elem"
          :model-value="inputValue"
          class="border-none bg-transparent w-full focus:outline-none h-full @text-body grow placeholder:@text-black-600 placeholder:@text-title"
          v-bind="$attrs"
          type="text"
          maxlength="15"
          autocomplete="off"
          @input="autoCorrect()"
          @focus="isFocused = true"
          @blur="isFocused = false"
        >
        <div v-if="showResetButton" class="shrink-0 w-6 h-6 relative ms-1">
          <transition name="fade">
            <TIcon
              v-if="isFilledOut && showResetButton"
              class="absolute inset-0 cursor-pointer"
              :class="[config[styleType].text]"
              :src="require('@icons/tt-time-circle.svg')"
              @click="reset"
            />
          </transition>
        </div>
      </div>
      <p
        v-if="infoText"
        class="@text-overline mt-3px ps-1"
        :class="[config[styleType].helperText[state][mode]]"
      >
        {{ error ? error : infoText }}
      </p>
    </div>
    <TInputText
      :model-value="currency"
      :style-type="props.styleType"
      readonly
      text-center
      class="w-60px ms-2 pointer-events-none"
    />
  </div>
</template>
