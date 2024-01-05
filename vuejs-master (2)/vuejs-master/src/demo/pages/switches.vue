<script setup lang="ts">
import TSwitch from '@@/components/TSwitch.vue'
import TSelectButton from '@@/components/TSelectButton.vue'

const isActive = ref(true)
const isActive2 = ref(true)
const items2 = ref([
  { text: 'روزانه', value: 'daily' },
  { text: 'ماهانه', value: 'monthly' },
  { text: 'سالانه', value: 'yearly' },
])

const items1 = ref([
  { text: 'نام کاربر', value: '‌user' },
  { text: 'شماره موبایل', value: 'mobile' },
])
const active1 = ref('yearly')
const active2 = ref('‌user')
</script>

<template>
  <p class="@text-h2 mb-10 mx-5">
    سوییچ ها
  </p>
  <div class="p-20">
    <div>
      <p class="@text-h2 mb-5">
        TSwitch
      </p>
      <p class="@text-h2 mb-5 @card @text-title @text-black-600">
        ورودی ها : isActive:boolean
      </p>
      <p class="@text-body">
        has-text
      </p>
      <TSwitch v-model="isActive" has-text />

      <TSwitch v-model="isActive2" class="mt-8" />
    </div>
    <div class="mt-10">
      <p class="@text-h2 mb-5">
        TSelectButton
      </p>
      <p class="@text-h2 mb-5 @card @text-title @text-black-600">
        ورودی ها : Item = {
        text: string
        value: string
        }
        <br>
        modelValue: string
      </p>
      <div class="flex">
        <TSelectButton
          v-model="active2"
          type="surface"
          :items="items1"
          class="w-full"
        />
      </div>
      <div class="flex mt-10">
        <TSelectButton
          v-model="active1"
          type="solid"
          color="secondary"
          :items="items2"
          class="w-full"
        />
      </div>
    </div>
  </div>
</template>
