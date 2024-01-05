<script setup lang="ts">
import { key, footer } from '@@/components/TModal.vue'

/** آیدی مودال پرنت */
const id = inject(key)
/** آیا فوتر مودال پرنت ساخته شده؟ */
const footerElement = inject(footer)

</script>

<template>
  <Teleport v-if="footerElement" :to="`#footer-${id}`">
    <slot />
  </Teleport>
</template>
