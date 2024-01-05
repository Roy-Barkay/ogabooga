<template>
  <teleport to="body">
    <div v-if="Tooltip_IsOpen && isTouchDevice" class="fixed inset-0 @z-tooltip" @click="Tooltip_SetIsOpen(false)" />
    <div
      ref="tooltipElement"
      :style="{ visibility: Tooltip_IsOpen ? 'visible' : 'hidden', width: width + 'px' }"
      class="fixed @bg-black-50 @shadow-tooltips @z-tooltip px-3 py-2 rounded-6 select-none -translate-y-4/3 -translate-x-30px"
    >
      <div v-if="Tooltip_Title" class="title ps-6 @text-title">
        <div>
          <div v-for="(line, index) in multiLineTitle" :key="index" dir="auto">
            {{ line }}
            <br>
          </div>
        </div>
      </div>
      <p
        v-if="Tooltip_Message"
        class="@text-body ps-6"
        :class="{
          '@text-primary-500': Tooltip_Color === 'primary',
          '@text-secondary-500': Tooltip_Color === 'secondary',
          '@text-tertiary-500': Tooltip_Color === 'tertiary',
          '@text-black-600': Tooltip_Color === 'black',
          '@text-warning-500': Tooltip_Color === 'warning',
        }"
      >
        {{ Tooltip_Message }}
      </p>

      <div class="absolute -bottom-3 rounded-4px end-6 w-7 h-7 @bg-black-50 -rotate-45" />
    </div>
  </teleport>
</template>

<script setup lang="ts">
import {
  Tooltip_IsOpen,
  Tooltip_SetIsOpen,
  Tooltip_Position,
  Tooltip_Title,
  Tooltip_Message,
  Tooltip_Color,
} from '@@/repository/Tooltip'
import { Browser_IsTouchDevice } from '@@/repository/Browser'

const tooltipElement = ref(null as HTMLDivElement | null)
const isTouchDevice = Browser_IsTouchDevice()

const width = 210

watchEffect(() => {
  const { clientWidth } = document.documentElement
  const element = tooltipElement.value
  const tooltipPosition = Tooltip_Position.value
  if (!element || !tooltipPosition || !tooltipPosition.x || !tooltipPosition.y) return
  element.style.left = tooltipPosition.x + 'px'
  const diff = clientWidth - (tooltipPosition.x + width)

  element.style.top = tooltipPosition.y + 'px'
  if (diff < 0) {
    element.style.left = tooltipPosition.x + diff + 'px'
  }
})

const multiLineTitle = computed(() =>
  Tooltip_Title.value?.split('\n'))

</script>
