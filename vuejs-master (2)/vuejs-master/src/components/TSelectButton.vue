<script lang="ts">

const buttonConfig = {
  solid: {
    primary: {
      active: '@bg-primary-500 @text-black-50',
      deactive: '@text-primary-500',
    },
    secondary: {
      active: '@bg-secondary-500 @text-black-50',
      deactive: '@text-secondary-500',
    },
    tertiary: {
      active: '@bg-tertiary-500 @text-black-50',
      deactive: '@text-tertiary-500',
    },
    error: {
      active: '@bg-error-500 @text-black-50',
      deactive: '@text-error-500',
    },
    black: {
      active: '@bg-black-500 @text-black-50',
      deactive: '@text-black-500',
    },
  },
  surface: {
    black: {
      active: '@bg-black-50',
      deactive: '@bg-black-300 @text-black-600',
    },
  },
}

const containerConfig = {
  solid: {
    primary: '@bg-primary-500/10 rounded-12',
    secondary: '@bg-secondary-500/10 rounded-12',
    tertiary: '@bg-tertiary-500/10 rounded-12',
    error: '@bg-error-500/10 rounded-12',
    black: '@bg-black-500/10 rounded-12',
  },
  surface: {
    black: '@bg-black-300 rounded-3',
  },
}

</script>

<script setup lang="ts">
import { useVModels } from '@vueuse/core'

export type Item = {
  text: string
  value: string
}

const props = withDefaults(defineProps<{
  items: Item[]
  type: 'surface' | 'solid'
  modelValue: string
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'black'
}>(), {
  color: 'tertiary',
})

const { modelValue } = useVModels(props)

function getMode(item: Item) {
  return modelValue.value === item.value ? 'active' : 'deactive'
}

</script>

<template>
  <div
    class=":uno: flex items-center lg:h-12 h-11 px-1"
    :class="[
      type === 'solid' ? containerConfig[type][color] : containerConfig[type]['black']
    ]"
  >
    <button
      v-for="item in items"
      :key="item.value"
      class="w-full min-w-40px h-9 lg:h-9.5 @flex-center @text-body whitespace-nowrap"
      :class="[
        {
          'rounded-full': type === 'solid',
          'rounded-3': type === 'surface',
        },
        type === 'solid' ? buttonConfig[type][color][getMode(item)] : buttonConfig[type]['black'][getMode(item)]
      ]"
      @click="modelValue = item.value"
    >
      {{ item.text }}
    </button>
  </div>
</template>
