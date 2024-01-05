<script setup lang="ts">
import TRadioButton from '@@/components/TRadioButton.vue'

const active1 = ref('yearly')

const items0 = ref([
  { title: 'روزانه', value: 'daily' },
  { title: 'ماهانه', value: 'monthly' },
  { title: 'سالانه', value: 'yearly' },
])

const items1 = ref([
  { title: 'روزانه', description: 'این متن توضیحات هست', value: 'daily' },
  { title: 'ماهانه', description: 'این متن توضیحات هست', value: 'monthly' },
  { title: 'سالانه', description: 'این متن توضیحات هست', value: 'yearly' },
])

const items2 = ref([
  { title: 'روزانه', description: 'این متن توضیحات هست', value: 'daily1' },
  { title: 'ماهانه', description: 'این متن توضیحات هست', value: 'monthly2' },
  { title: 'سالانه', description: 'این متن توضیحات هست', value: 'yearly3' },
])

const items3 = ref([
  { title: 'روزانه', value: 'daily4' },
  { title: 'ماهانه', value: 'monthly5' },
  { title: 'سالانه', value: 'yearly6' },
])

</script>

<template>
  <div class="flex flex-col">
    <div class="mt-5 @text-title @text-black-600">
      size :small-text only
    </div>
    <div>
      <TRadioButton
        v-for="item in items0"
        :key="item.value"
        v-model="active1"
        size="small"
        class="mt-4"
        :title="item.title"
        :value="item.value"
        style-type="text"
      />
    </div>
    <div class="mt-5 @text-title @text-black-600">
      size :small
    </div>
    <div>
      <TRadioButton
        v-for="item in items3"
        :key="item.value"
        v-model="active1"
        size="small"
        class="mt-4"
        :title="item.title"
        :value="item.value"
        style-type="outline"
      />
    </div>
    <div class="mt-5 @text-title @text-black-600">
      size :medium
    </div>
    <div>
      <TRadioButton
        v-for="item in items2"
        :key="item.value"
        v-model="active1"
        size="medium"
        class="mt-4"
        :description="item.description"
        :title="item.title"
        :value="item.value"
        style-type="outline"
      />
    </div>
    <div class="mt-5 @text-title @text-black-600">
      size :large
    </div>
    <div>
      <TRadioButton
        v-for="item in items1"
        :key="item.value"
        v-model="active1"
        :description="item.description"
        size="large"
        class="mt-4"
        :title="item.title"
        :value="item.value"
        style-type="outline"
      />
    </div>
  </div>
</template>
