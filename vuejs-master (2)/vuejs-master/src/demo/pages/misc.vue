<script setup lang="ts">
import { type NewsCardType } from '@@/components/NewsSliderCard.vue'
import TAdaptiveMenu from '@@/components/TAdaptiveMenu.vue'
import TCheckBox from '@@/components/TCheckBox.vue'
import TFab from '@@/components/TFab.vue'
import TIcon from '@@/components/TIcon.vue'
import TNewsSlider from '@@/components/TNewsSlider.vue'
import { useTranslation } from '@@/hooks/useTranslation'
import { BaseI18n } from '@@/repository/I18n'

const __ = useTranslation()

const isOpen = ref(false)

const isCheckBoxActive = ref(false)

const newses = [
  {
    title: 'مثل دیجی کالا پیامک بزن / افزونه هوشمند پیامک ووکامرس',
    modalTitle: 'افزونه هوشمند پیامک ووکامرس',
    modalDescription: 'اگر شما هم جزو آن دسته از والدین هستید که تربیت صحیح فرزندان مخصوصا در سنین پایین، برایتان یک دغدغه خاص و ویژه است، این ویدیو را از دست ندهید.چگونه فرزندمان را به استفاده از کلمات مودبانه عادت دهیم؟ چگونه فرزندمان را به خوردن مواد غذایی سالم، به ویژه سبزیجات عادت دهیم؟ این کلیپ پاسخ سوالات شما را فراهم کرده‌است!#ویدیو_کامنت',
    date: '1400/08/21',
    rounded: 'curve',
  },
  {
    title: 'مثل دیجی کالا پیامک بزن',
    modalTitle: 'افزونه هوشمند پیامک ووکامرس',
    modalDescription: 'اگر شما هم جزو آن دسته از والدین هستید که تربیت صحیح فرزندان مخصوصا در سنین پایین، برایتان یک دغدغه خاص و ویژه است، این ویدیو را از دست ندهید.چگونه فرزندمان را به استفاده از کلمات مودبانه عادت دهیم؟ چگونه فرزندمان را به خوردن مواد غذایی سالم، به ویژه سبزیجات عادت دهیم؟ این کلیپ پاسخ سوالات شما را فراهم کرده‌است!#ویدیو_کامنت',
    date: '1400/08/21',
    rounded: 'curve',
  },
  {
    title: 'افزونه هوشمند پیامک ووکامرس',
    modalTitle: 'افزونه هوشمند پیامک ووکامرس',
    modalDescription: 'اگر شما هم جزو آن دسته از والدین هستید که تربیت صحیح فرزندان مخصوصا در سنین پایین، برایتان یک دغدغه خاص و ویژه است، این ویدیو را از دست ندهید.چگونه فرزندمان را به استفاده از کلمات مودبانه عادت دهیم؟ چگونه فرزندمان را به خوردن مواد غذایی سالم، به ویژه سبزیجات عادت دهیم؟ این کلیپ پاسخ سوالات شما را فراهم کرده‌است!#ویدیو_کامنت',
    date: '1400/08/21',
    rounded: 'curve',
  },
  {
    title: 'مثل دیجی کالا پیامک بزن / افزونه هوشمند پیامک ووکامرس',
    modalTitle: 'افزونه هوشمند پیامک ووکامرس',
    modalDescription: 'اگر شما هم جزو آن دسته از والدین هستید که تربیت صحیح فرزندان مخصوصا در سنین پایین، برایتان یک دغدغه خاص و ویژه است، این ویدیو را از دست ندهید.چگونه فرزندمان را به استفاده از کلمات مودبانه عادت دهیم؟ چگونه فرزندمان را به خوردن مواد غذایی سالم، به ویژه سبزیجات عادت دهیم؟ این کلیپ پاسخ سوالات شما را فراهم کرده‌است!#ویدیو_کامنت',
    date: '1400/08/21',
    rounded: 'curve',
  },
  {
    title: 'مثل دیجی کالا پیامک بزن / افزونه هوشمند پیامک ووکامرس',
    modalTitle: 'افزونه هوشمند پیامک ووکامرس',
    modalDescription: 'اگر شما هم جزو آن دسته از والدین هستید که تربیت صحیح فرزندان مخصوصا در سنین پایین، برایتان یک دغدغه خاص و ویژه است، این ویدیو را از دست ندهید.چگونه فرزندمان را به استفاده از کلمات مودبانه عادت دهیم؟ چگونه فرزندمان را به خوردن مواد غذایی سالم، به ویژه سبزیجات عادت دهیم؟ این کلیپ پاسخ سوالات شما را فراهم کرده‌است!#ویدیو_کامنت',
    date: '1400/08/21',
    rounded: 'curve',
  },
] as NewsCardType[]

</script>

<template>
  <div class="p-3">
    <h2 class="@text-h2 mb-4">
      کامپوننت منوی انطباقی (TAdaptiveMenu)
    </h2>
    <TAdaptiveMenu
      v-model="isOpen"
      active-button-class="w-auto @bg-tertiary-500 @text-black-50 p-2 rounded-2"
      contextmenu-class="w-220px"
    >
      <template #active-button>
        دکمه فعال‌ساز
      </template>

      <template #default>
        <div class="w-full">
          <button class="w-full flex items-center h-44px mb-1 px-4 @text-primary-500">
            <TIcon class="s-6 sm:s-7" src="@icons/b-archive.svg" />
            <span class="ms-3 @text-subtitle2">باز</span>
          </button>
          <button class="w-full flex items-center h-44px mb-1 px-4 @text-secondary-500">
            <TIcon class="s-6 sm:s-7" src="@icons/b-search.svg" />
            <span class="ms-3 @text-subtitle2">در حال بررسی</span>
          </button>
          <button class="w-full flex items-center h-44px mb-1 px-4 @text-tertiary-500">
            <TIcon class="s-6 sm:s-7" src="@icons/b-clock.svg" />
            <span class="ms-3 @text-subtitle2">منتظر پاسخ مشتری</span>
          </button>
          <button class="w-full flex items-center h-44px px-4 @text-warning-500">
            <TIcon class="s-6 sm:s-7" src="@icons/b-check.svg" />
            <span class="ms-3 @text-subtitle2">بسته</span>
          </button>
        </div>
      </template>
    </TAdaptiveMenu>

    <TCheckBox v-model="isCheckBoxActive" :hover="false" class="mt-5 w-200px">
      چک باکس
    </TCheckBox>
    <TNewsSlider :newses="newses" class="mt-5" />

    <div class="mt-10">
      <BaseI18n i18n="test-for-basei18n">
        <template #0>
          <span class="@text-primary-500">{{ __('tsitfy.dark-mode') }}</span> |
          <span class="@text-success-500">{{ __('tsitfy.light-mode') }}</span>
        </template>
      </BaseI18n>
    </div>
    <TFab
      title="افزودن کد تخفیف"
      :src="require('@@/assets/icons/tt-edit.svg')"
      border-style="curve"
      class="bottom-4 end-4 h-56px @bg-tertiary-500 @text-black-100"
    />
  </div>
</template>
