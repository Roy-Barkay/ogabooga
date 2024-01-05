<script setup lang="ts">
import { conditionalScope } from '@@/hooks/conditionalScope'
import { Confirm_Store, Confirm_Cancel, Confirm_OK } from '@@/repository/Confirm'
import TButton from './TButton.vue'
import { useRoute } from 'vue-router'
import TDialog from './TDialog.vue'

const route = useRoute()

const isOpen = computed({
  set(value: boolean) {
    if (!value) {
      Confirm_Cancel()
    }
  },
  get() {
    return Confirm_Store.open
  },
})

conditionalScope(isOpen, () => {
  watch(route, () => {
    Confirm_Cancel()
  })
})

</script>

<template>
  <TDialog v-model="isOpen" close-icon :corners="Confirm_Store.corners">
    <div class="sm:p-6 p-4 w-full">
      <h2 class="@text-h2 mb-6 text-center">
        {{ Confirm_Store.title }}
      </h2>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="Confirm_Store.isMessageHTML" class="@text-title text-center mb-2 sm:mb-3" v-html="Confirm_Store.message" />
      <p v-else class="@text-subtitle1 @text-black-700 text-center mb-2 sm:mb-3">
        {{ Confirm_Store.message }}
      </p>
      <div class="@text-body @text-black-600 text-center mb-6 sm:mb-8">
        {{ Confirm_Store.details }}
      </div>
      <div class="@flex-center w-full">
        <TButton
          size="xmedium"
          style-type="text"
          color="gray"
          class="me-4 basis-0 grow"
          :action="Confirm_Cancel"
          :btn-corners="Confirm_Store.corners"
        >
          {{ Confirm_Store.cancelText }}
        </TButton>
        <TButton
          size="xmedium"
          style-type="tonal"
          :action="Confirm_OK"
          class="basis-0 grow"
          :color="Confirm_Store.okColor"
          :btn-corners="Confirm_Store.corners"
        >
          {{ Confirm_Store.okText }}
        </TButton>
      </div>
    </div>
  </TDialog>
</template>
