<script setup lang="ts">
import { Browser_Screens } from '@@/repository/Browser'
import { useVModel } from '@vueuse/core'
import TBottomSheet from './TBottomSheet.vue'
import TContextMenu from './TContextMenu.vue'

const props = defineProps<{
  modelValue: boolean
  activeButtonClass?: string
  contextmenuClass?: string
}>()

const modelValue = useVModel(props)

const contextMenu = ref<InstanceType<typeof TContextMenu>>()

function openMenu(e: MouseEvent) {
  modelValue.value = true

  if (!contextMenu.value) return
  contextMenu.value.setPosition(e)
}

defineExpose({
  contextMenu,
})

</script>

<template>
  <div>
    <button :class="activeButtonClass" @click.prevent="openMenu">
      <slot name="active-button" />
    </button>

    <TContextMenu
      v-if="Browser_Screens.sm"
      ref="contextMenu"
      v-model="modelValue"
      :container-classes="contextmenuClass"
    >
      <slot />
    </TContextMenu>

    <TBottomSheet v-else v-model="modelValue">
      <slot />
    </TBottomSheet>
  </div>
</template>
