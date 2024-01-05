<script setup lang="ts">
import { Toast_IsOpen, Toast_Message, Toast_Status_Color, Toast_Close } from '@@/repository/Toast'
import TIcon from './TIcon.vue'
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <teleport to="body">
    <transition name="fade" mode="out-in">
      <div
        v-if="Toast_IsOpen"
        :key="Toast_Message"
        style="box-shadow:0px 0px 50px rgba(0, 0, 0, 0.2);"
        class="flex items-center fixed max-w-690px rounded-32px inset-x-2.5 bottom-44px mx-auto min-h-48px sm:min-h-60px border-3px border-solid border-transparent @shadow-toasts @z-toast px-4 py-1"
        :class="{
          '@bg-error-100 @border-error-200 shadow-sm': Toast_Status_Color === 'error',
          '@bg-success-100 @border-success-200 shadow-sm': Toast_Status_Color === 'success',
          '@bg-warning-100 @border-warning-200 shadow-sm': Toast_Status_Color === 'warning',
          '@bg-info-100 @border-info-200 shadow-sm': Toast_Status_Color === 'info',
        }"
      >
        <div

          class="w-11 h-11 @flex-center rounded-full shrink-0"
          :class="{
            '@bg-error-500': Toast_Status_Color === 'error',
            '@bg-warning-500': Toast_Status_Color === 'warning',
            '@bg-success-500': Toast_Status_Color === 'success',
            '@bg-info-500': Toast_Status_Color === 'info',
          }"
        >
          <TIcon
            v-if="Toast_Status_Color === 'warning' || Toast_Status_Color === 'error'"
            :src="require('@icons/b-danger.svg')"
            class="w-7 h-7 flex-shrink-0 block @text-black-50"
          />
          <TIcon
            v-else-if="Toast_Status_Color === 'success'"
            :src="require('@icons/b-check-mark.svg')"
            class="w-7 h-7 flex-shrink-0 @text-black-50 block"
          />
          <TIcon
            v-else-if="Toast_Status_Color === 'info'"
            :src="require('@icons/b-info-circle2.svg')"
            class="w-7 h-7 flex-shrink-0 @text-black-50 block"
          />
        </div>

        <div class="@text-body px-3 flex justify-between w-full">
          <span v-html="Toast_Message" />
        </div>
        <TIcon
          :src="require('@icons/b-close-circle.svg')"
          class="w-11 ps-1 cursor-pointer ms-auto @text-black-500"
          @click="Toast_Close()"
        />
      </div>
    </transition>
  </teleport>
</template>
