<script setup lang="ts">
import { Avatar_ID_Range } from '@@/components/TAvatar.vue'
import TChips, { ChipsType } from '@@/components/TChips.vue'
import TChipsGroup from '@@/components/TChipsGroup.vue'

type Chips = {
  type: 'filter' | 'input'
  avatarId?: Avatar_ID_Range
  icon?: string
  close?: boolean
  title?: string
  noToggle?: boolean
  modelValue?: boolean
}

const filterChipses = ref<Chips[]>([
  {
    type: 'filter',
    close: true,
    title: 'test',
    noToggle: true,
  },
  {
    type: 'filter',
    icon: require(`@icons/b-building-4.svg`),
    modelValue: false,
  },
  {
    type: 'filter',
    icon: require(`@icons/b-building-4.svg`),
    modelValue: false,
  },
  {
    type: 'filter',
    icon: require(`@icons/b-building-4.svg`),
    modelValue: false,
  },
  {
    type: 'filter',
    icon: require(`@icons/b-building-4.svg`),
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'filter',
    icon: require(`@icons/b-building-4.svg`),
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'filter',
    icon: require(`@icons/b-building-4.svg`),
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'filter',
    avatarId: 18,
    icon: require(`@icons/b-building-4.svg`),
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'filter',
    avatarId: 18,
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'filter',
    avatarId: 18,
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'filter',
    avatarId: 18,
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'filter',
    avatarId: 18,
    icon: require(`@icons/b-building-4.svg`),
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'filter',
    avatarId: 18,
    icon: require(`@icons/b-building-4.svg`),
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'filter',
    avatarId: 18,
    icon: require(`@icons/b-building-4.svg`),
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'filter',
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'filter',
    avatarId: 18,
    icon: require(`@icons/b-building-4.svg`),
    close: true,
    title: 'title',
    modelValue: false,
  },
])

const inputChipses = ref<Chips[]>([
  {
    type: 'input',
    icon: require(`@icons/b-building-4.svg`),
    modelValue: false,
  },
  {
    type: 'input',
    icon: require(`@icons/b-building-4.svg`),
    title: 'title',
    modelValue: false,
  },
  {
    type: 'input',
    icon: require(`@icons/b-building-4.svg`),
    title: 'title',
    modelValue: false,
  },
  {
    type: 'input',
    icon: require(`@icons/b-building-4.svg`),
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'input',
    icon: require(`@icons/b-building-4.svg`),
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'input',
    icon: require(`@icons/b-building-4.svg`),
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'input',
    avatarId: 18,
    icon: require(`@icons/b-building-4.svg`),
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'input',
    avatarId: 18,
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'input',
    avatarId: 18,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'input',
    avatarId: 18,
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'input',
    avatarId: 18,
    close: false,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'input',
    avatarId: 18,
    close: false,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'input',
    avatarId: 18,
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'input',
    avatarId: 18,
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'input',
    avatarId: 18,
    close: true,
    title: 'title',
    modelValue: false,
  },
  {
    type: 'input',
    avatarId: 18,
    close: true,
    title: 'test',
    noToggle: true,
  },
])

const selectedChipsItem = ref<number | null>(null)
const chipsGroup = ref<ChipsType[]>([
  {
    type: 'filter',
    title: 'test',
    noToggle: true,
    modelValue: false,
  },
  {
    type: 'filter',
    icon: require(`@icons/b-building-4.svg`),
    modelValue: false,
  },
  {
    type: 'filter',
    icon: require(`@icons/b-building-4.svg`),
    modelValue: false,
  },
  {
    type: 'filter',
    icon: require(`@icons/b-building-4.svg`),
    modelValue: false,
  },
  {
    type: 'filter',
    icon: require(`@icons/b-building-4.svg`),
    title: 'title',
    modelValue: false,
  },
  {
    type: 'filter',
    icon: require(`@icons/b-building-4.svg`),
    title: 'title',
    modelValue: false,
  },
  {
    type: 'filter',
    icon: require(`@icons/b-building-4.svg`),
    title: 'title',
    modelValue: false,
  },
])

</script>

<template>
  <div class="p-3">
    <p class="@text-title">
      چیپس‌ها
    </p>

    <p class="@text-body mt-4">
      ورودی‌ها :
    </p>
    <p><strong>type:</strong> filter | input (default: filter)</p>
    <p><strong>no-toggle?:</strong> boolean </p>
    <p><strong>avatar-id?:</strong> number </p>
    <p><strong>title?:</strong> string </p>
    <p><strong>close?:</strong> boolean </p>
    <p><strong>icon?:</strong> string </p>

    <p class="@text-body my-2">
      چیپس‌های فیلتر
    </p>
    <div class="mt-4 @flex-center flex-wrap">
      <TChips
        v-for="(chips, index) in filterChipses"
        :key="index"
        v-model="chips.modelValue"
        :type="chips.type"
        :avatar-id="chips.avatarId"
        :icon="chips.icon"
        :close="chips.close"
        :title="chips.title"
        :no-toggle="chips.noToggle"
        class="m-3"
      />
    </div>
    <hr>
    <p class="@text-body my-2">
      چیپس‌های اینپوت
    </p>
    <div class="@flex-center flex-wrap">
      <TChips
        v-for="(chips, index) in inputChipses"
        :key="index"
        v-model="chips.modelValue"
        :type="chips.type"
        :avatar-id="chips.avatarId"
        :icon="chips.icon"
        :close="chips.close"
        :title="chips.title"
        :no-toggle="chips.noToggle"
        class="m-3"
      />
    </div>
    <hr>
    <p class="@text-body my-2">
      چیپس های گروهی
    </p>
    <TChipsGroup
      v-model="selectedChipsItem"
      :items="chipsGroup"
      class="@flex-center mb-10"
      item-class="mx-3"
    />
  </div>
</template>
