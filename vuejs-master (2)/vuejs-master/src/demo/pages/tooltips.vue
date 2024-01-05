<script setup lang="ts">
import { tooltipDirective as vTooltip } from '@@/directive/tooltip'
</script>

<template>
  <div class="p-3">
    <p class="@text-title mb-4">
      ورودی‌ها
    </p>
    <div class="flex my-2">
      <p class="font-extrabold">
        رنگ (color):
      </p>
      <p dir="ltr">
        <samp>primary | secondary | tertiary | warning | black (default: primary)</samp>
      </p>
    </div>
    <p class="font-extrabold my-2">
      متن تیتر (title)
    </p>
    <p class="font-extrabold my-2">
      متن پیام (message)
    </p>
  </div>

  <div class="@flex-center mt-4">
    <p v-tooltip="{title:'تیتر',message:'این یک پیام تست برای تولتیپ است',color:'primary'}">
      موس را به اینجا بیاورید
    </p>
  </div>
</template>
