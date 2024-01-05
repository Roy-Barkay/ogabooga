<script lang="ts">
import { PropType, Ref } from 'vue'

export const BaseInput_CommonProps = {
  name: {
    type: String,
    required: false,
  },
  infoText: {
    type: String,
    required: false,
  },
  appendIcon: {
    type: String,
    required: false,
  },
  appendIconAction: {
    type: Function as PropType<() => void>,
    required: false,
  },
  prependIcon: {
    type: String,
    required: false,
  },
  prependIconAction: {
    type: Function as PropType<() => void>,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  floatingLabel: {
    type: Boolean,
    default: true,
  },
  error: {
    type: String,
    required: false,
  },
  styleType: {
    type: String as PropType<'outlined' | 'filled'>,
    default: 'outlined',
  },
  type: {
    type: String as PropType<'text' | 'number' | 'search' | 'tel' | 'select' | 'password' | 'textarea'>,
    default: 'text',
  },
  showResetButton: {
    type: Boolean,
    default: true,
  },
  textCenter: {
    type: Boolean,
    default: false,
  },
  inputDirection: {
    type: String as PropType<'ltr' | 'rtl'>,
    required: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  cursorPointer: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: Number,
    required: false,
  },
  autocomplete: {
    type: String,
    required: false,
  },
  inputClass: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}

export const BaseInput_Config = {
  outlined: {
    label: {
      enabled: {
        default: '@text-black-600',
        error: '@text-primary-500',
      },
      focused: {
        default: '@text-tertiary-500',
        error: '@text-primary-500',
      },
      filledOut: {
        default: '@text-black-600',
        error: '@text-black-600',
      },
    },
    border: {
      enabled: {
        default: 'border-2px @border-black-500',
        error: 'border-2px @border-primary-500',
      },
      focused: {
        default: 'border-2px @border-tertiary-500',
        error: 'border-2px @border-primary-500',
      },
      filledOut: {
        default: 'border-2px @border-black-500',
        error: 'border-2px @border-primary-500',
      },
    },
    text: '@text-black-700',
    background: {
      enabled: {
        default: '',
        error: '',
      },
      focused: {
        default: '',
        error: '',
      },
      filledOut: {
        default: '',
        error: '',
      },
    },
    icon: {
      enabled: {
        default: '@text-black-600',
        error: '@text-primary-500',
      },
      focused: {
        default: '@text-tertiary-500',
        error: '@text-primary-500',
      },
      filledOut: {
        default: '@text-black-600',
        error: '@text-primary-500',
      },
    },
    helperText: {
      enabled: {
        default: '@text-black-600',
        error: '@text-primary-500',
      },
      focused: {
        default: '@text-tertiary-500',
        error: '@text-primary-500',
      },
      filledOut: {
        default: '@text-black-600',
        error: '@text-primary-500',
      },
    },
  },
  filled: {
    label: {
      enabled: {
        default: '@text-black-600',
        error: '@text-black-600',
      },
      focused: {
        default: '@text-tertiary-500',
        error: '@text-primary-500',
      },
      filledOut: {
        default: '@text-black-600',
        error: '@text-black-600',
      },
    },
    border: {
      enabled: {
        default: '',
        error: '',
      },
      focused: {
        default: '[box-shadow:inset_0_-2px_0_rgb(var(--tertiary-500))]',
        error: '[box-shadow:inset_0_-2px_0_rgb(var(--primary-500))]',
      },
      filledOut: {
        default: '[box-shadow:inset_0_-2px_0_rgb(var(--black-600))]',
        error: '[box-shadow:inset_0_-2px_0_rgb(var(--primary-500))]',
      },
    },
    text: '@text-black-700',
    background: {
      enabled: {
        default: '@bg-black-300',
        error: '@bg-primary-100',
      },
      focused: {
        default: '@bg-tertiary-100',
        error: '@bg-primary-100',
      },
      filledOut: {
        default: '@bg-black-300',
        error: '@bg-primary-100',
      },
    },
    icon: {
      enabled: {
        default: '@text-black-600',
        error: '@text-black-600',
      },
      focused: {
        default: '@text-tertiary-500',
        error: '@text-primary-500',
      },
      filledOut: {
        default: '@text-black-600',
        error: '@text-primary-500',
      },
    },
    helperText: {
      enabled: {
        default: '@text-black-600',
        error: '@text-primary-500',
      },

      focused: {
        default: '@text-tertiary-500',
        error: '@text-primary-500',
      },
      filledOut: {
        default: '@text-black-600',
        error: '@text-primary-500',
      },
    },
  },
}

</script>

<script setup lang="ts">
import { TDate } from '@@/repository/Date'
import { useVModel } from '@vueuse/core'
import TIcon from '@@/components/TIcon.vue'
import useNumberInput from '@@/hooks/useNumberInput'

const props = defineProps({
  ...BaseInput_CommonProps,
  rows: {
    type: Number,
    default: 4,
  },
  modelValue: {
    type: [String, Number, TDate, BigInt] as PropType<any>,
    default: undefined,
  },
})

const emit = defineEmits<{
  (event: 'appendIconClick'): void
  (event: 'prependIconClick'): void
  (event: 'update:modelValue'): void
  (event: 'update:mobile'): void
  (event: 'paste', payload: ClipboardEvent): void
}>()

const inputElement = ref<HTMLInputElement | null>(null)

const isNumeric = computed(() => props.type === 'number' || props.type === 'tel')

if (isNumeric.value) {
  useNumberInput(inputElement as Ref<HTMLInputElement | null>, 'n')
}

const modelValue = useVModel(props)
const isFocused = ref(false)
const isLabelMoved = computed(() => isFocused.value || isFilledOut.value)
const isFilledOut = computed(() => !!modelValue.value || modelValue.value === 0)

const showResetButton = computed(() => !props.readonly && !props.disabled && props.showResetButton)

const state = computed(() => {
  if (isFocused.value) return 'focused'
  if (isFilledOut.value) return 'filledOut'
  return 'enabled'
})

const mode = computed(() => {
  if (props.error) return 'error'
  return 'default'
})

const inputClasses = [
  ':uno: border-none bg-transparent w-full focus:outline-none h-full @text-body grow placeholder:@text-black-600 placeholder:@text-title',
  {
    'text-center': props.textCenter,
    'pt-4 resize-none scroll-container': props.type === 'textarea',
  },
  props.inputClass,
]

function reset() {
  modelValue.value = ''
  inputElement.value?.focus()
}

function getLabelClass() {
  if (!isLabelMoved.value && props.prependIcon) {
    return 'rtl:-translate-y-50% rtl:-translate-x-32px ltr:-translate-y-50% ltr:translate-x-32px'
  }
  if (!isLabelMoved.value && !props.prependIcon) {
    return '-translate-y-50%'
  }
  if (isLabelMoved.value) {
    return '-translate-y-150% scale-85 @bg-black-200'
  }
}

function getBorderColor() {
  return BaseInput_Config[props.styleType].border[state.value][mode.value]
}

function getBackgroundColor() {
  return BaseInput_Config[props.styleType].background[state.value][mode.value]
}

function getLabelColor() {
  return BaseInput_Config[props.styleType].label[state.value][mode.value]
}

function getIconColor() {
  return BaseInput_Config[props.styleType].icon[state.value][mode.value]
}

function getHelperTextColor() {
  return BaseInput_Config[props.styleType].helperText[state.value][mode.value]
}

function appendIconHandler(e: Event) {
  e.preventDefault()
  props.appendIconAction?.()
}

function prependIconHandler(e: Event) {
  e.preventDefault()
  props.prependIconAction?.()
}

function handleInput(event: InputEvent) {
  modelValue.value = (event.target as HTMLInputElement).value
}

defineExpose({
  input: inputElement,
})
</script>

<template>
  <div>
    <div
      class="flex px-3 rounded-14px relative"
      :class="[
        getBackgroundColor(),
        getBorderColor(),
        {
          'cursor-pointer': cursorPointer,
          'h-48px sm:h-54px items-center': type !== 'textarea',
          'opacity-50': disabled,
        }
      ]"
    >
      <span
        v-if="floatingLabel && label"
        class="transition-transform transform-origin-start duration-300 absolute px-1 @text-title rounded-8px pointer-events-none start-3 min-w-0"
        :class="[
          getLabelClass(),
          getLabelColor(),
          {
            'top-50%': type !== 'textarea',
            'top-6': type === 'textarea',
          }
        ]"
      >
        {{ label }}
      </span>
      <button
        v-if="prependIcon"
        type="button"
        class="shrink-0 w-6 h-6 me-3 cursor-pointer"
        :class="[getIconColor(), { 'mt-4': type === 'textarea' }]"
        @click="prependIconHandler"
      >
        <TIcon :src="prependIcon" />
      </button>
      <component
        :is="type === 'textarea' ? 'textarea' : 'input'"
        ref="inputElement"
        spellcheck="false"
        :dir="inputDirection"
        :value="modelValue"
        :type="type !== 'textarea' ? type : undefined"
        :placeholder="!floatingLabel && label ? label : ''"
        :class="inputClasses"
        :readonly="readonly"
        :maxlength="maxlength"
        :disabled="disabled"
        :autocomplete="props.autocomplete"
        :rows="type === 'textarea' ? rows : undefined"
        @input="handleInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @paste="emit('paste', $event)"
      />
      <div v-if="showResetButton || appendIcon" class="shrink-0 w-6 h-6 relative ms-1" :class="{ 'mt-4': type === 'textarea' }">
        <Transition name="fade">
          <button
            v-if="isFilledOut && showResetButton"
            type="button"
            class="absolute inset-0"
            :class="BaseInput_Config[styleType].text"
            @click="reset"
          >
            <TIcon src="@icons/tt-time-circle.svg" />
          </button>
          <button
            v-else-if="appendIcon"
            type="button"
            class="absolute inset-0"
            :class="getIconColor()"
            @click="appendIconHandler"
          >
            <TIcon :src="appendIcon" />
          </button>
        </Transition>
      </div>
    </div>
    <p
      v-if="infoText"
      class="@text-overline mt-3px ps-1"
      :class="getHelperTextColor()"
    >
      {{ error ? error : infoText }}
    </p>
  </div>
</template>
