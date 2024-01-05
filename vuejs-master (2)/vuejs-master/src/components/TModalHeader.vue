<script setup lang="ts">
import { key, header } from '@@/components/TModal.vue'

/** آیدی مودال پرنت */
const id = inject(key)
/** آیا هدر مودال پرنت ساخته شده؟ */
const headerElement = inject(header)

</script>

<template>
  <Teleport v-if="headerElement" :to="`#header-${id}`">
    <slot />
  </Teleport>
</template>
