<script lang="ts" setup>
defineProps<{
  aspectRatio?: number | null
}>()
</script>

<template>
  <div class=":uno: relative flex flex-col grow-0 shrink-0 basis-auto before:content-none before:table of-hidden">
    <div v-if="aspectRatio != null" :style="{ paddingTop: 100 / aspectRatio + '%' }" />
    <div v-if="aspectRatio != null" class="absolute inset-0 [contain:strict]">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>
