<script setup lang="ts">
import TButton from '@@/components/TButton.vue'
import TInputText from '@@/components/TInputText.vue'
import { Toast_Show } from '@@/repository/Toast'

const type = ref<'success' | 'warning' | 'error' | 'info'>('success')
const duration = ref<number>(5000)
const text = ref('')

function showToast() {
  Toast_Show(type.value, text.value, duration.value)
}
</script>

<template>
  <div class="p-3">
    <p class="@text-body mb-4">
      این کامپوننت در واقع با یک تابع فعال می‌شود. <br>
      ورودی اول این تابع نوع توست می‌باشد که یکی از سه مقدار (<strong>success, warning, error, info</strong>) می‌باشد. <br>
      ورودی دوم این تابع متن توست می‌باشد. <br>
      ورودی سوم هم مدت زمان نمایش توست را دریافت می‌کند که در حالت اولیه‌ ، مقدار ۵۰۰۰ که معادل ۵ ثانیه می‌باشد را دارا است.
    </p>
  </div>

  <samp class="@bg-black-300 px-2 mx-2 py-1 rounded-8px @text-subtitle2" dir="ltr">Toast_Show(status: 'success' | 'warning' | 'error' | 'info', message: string, duration: number)</samp>

  <div class="flex justify-around items-center flex-wrap mt-4">
    <select v-model="type" class="border-2 my-2 @border-secondary-500 @bg-secondary-100 py-2 px-3 outline-none rounded-8px px-3 py-1 ms-3 @text-black-700">
      <option value="success">
        Success
      </option>
      <option value="warning">
        Warning
      </option>
      <option value="error">
        Error
      </option>
      <option value="info">
        Info
      </option>
    </select>

    <TInputText
      v-model="duration"
      type="number"
      label="مدت زمان"
      style-type="filled"
    />

    <TInputText
      v-model="text"
      label="متن توست"
      style-type="filled"
    />
  </div>

  <div class="@flex-center mt-4">
    <TButton @click="showToast()">
      تست
    </TButton>
  </div>
</template>
