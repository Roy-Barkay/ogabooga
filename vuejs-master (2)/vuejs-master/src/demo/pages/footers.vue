<script setup lang="ts">
import TFooter from '@@/components/TFooter.vue'
import { BrowserSource_Screens } from '@@/datasource/browser/BrowserSource'
import TModal from '@@/components/TModal.vue'
import TLanguage from '@@/components/TLanguage.vue'

const footerItems = computed(() => [
  { title: 'FAQ', src: '/faq' },
  { title: 'Privacy Policy', src: '/privacypolicy' },
  { title: 'Contact Us', src: '/contact' },
  { title: 'About Us', src: '/about' },
])

const modalModel = ref(false)

const languages = ref([
  { text: 'فارسی', value: 'fa' },
  { text: 'English', value: 'en' },
])
const active = ref('fa')

function handleLangugeAction() {
  modalModel.value = true
}

</script>

<template>
  <TFooter
    :language-action="handleLangugeAction"
    current-language="فارسی"
    :items="footerItems"
  />

  <TModal v-model="modalModel" :max-width="BrowserSource_Screens.sm ? 410 : 344">
    <TLanguage v-model="active" :languages="languages" />
  </TModal>
</template>
