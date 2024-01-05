<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { ChipsType } from 'src/components/TChips.vue'
import TChips from '@@/components/TChips.vue'

const props = defineProps<{
  /** آرایه ای از چیپس ها */
  items: ChipsType[]
  /** استایل چیپس ها */
  itemClass?: string
  /** چیپس انتخاب شده */
  modelValue: number | null
}>()

const modelValue = useVModel(props, 'modelValue')

/** آیا چیپس انتخاب شده؟ */
function isSelected(index: number) {
  return index === modelValue.value
}

/** انتخاب یک چیپس */
function handleSelectItem(index: number) {
  if (modelValue.value === index) {
    modelValue.value = null
  } else {
    modelValue.value = index
  }
}
</script>

<template>
  <div>
    <TChips
      v-for="(chips, index) in items"
      :key="index"
      :model-value="isSelected(index)"
      :avatar-id="chips.avatarId"
      :type="chips.type"
      :icon="chips.icon"
      :title="chips.title"
      :class="itemClass"
      @update:model-value="handleSelectItem(index)"
    />
  </div>
</template>
