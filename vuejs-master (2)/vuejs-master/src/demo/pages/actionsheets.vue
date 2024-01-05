<script setup lang="ts">
import TActionSheet, { ActionSheetButton } from '@@/components/TActionSheet.vue'
import TButton from '@@/components/TButton.vue'
import { useTranslation } from '@@/hooks/useTranslation'

const __ = useTranslation()

/** آیا اکشن شیت باز است؟ */
const isActionSheetOpen = ref(false)

const buttons: ActionSheetButton[] = [
  {
    title: 'دکمه اول',
    action: buttonAction,
  },
  {
    title: 'دکمه دوم',
    action: buttonAction,
  },
  {
    title: 'دکمه سوم',
    action: buttonAction,
  },
]

/** باز کردن اکشن شیت */
function openActionSheet() {
  isActionSheetOpen.value = true
}

/** اکشن تستی دکمه های اکشن شیت */
function buttonAction() {
  console.log('فشرده شدم')
}

</script>

<template>
  <div>
    <TButton :action="openActionSheet">
      {{ __('open-actionsheet') }}
    </TButton>
    <TActionSheet
      v-model="isActionSheetOpen"
      :header-icon="require('@icons/b-security-user.svg')"
      :buttons="buttons"
      buttons-style="single"
      :max-width="360"
      icon-color="black"
    >
      <template #header>
        <div class="text-center mb-7">
          من هدرم
        </div>
      </template>
      <span class="h-300px">من بدنه ام</span>
    </TActionSheet>
  </div>
</template>
