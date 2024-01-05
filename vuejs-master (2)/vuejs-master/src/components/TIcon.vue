<script setup lang="ts">
defineProps<{
  src: string
}>()

// const icon = props.type === 'bulk' ? '@icons/b?raw'
// TODO: transformer-compile-class for unocss
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <i class=":uno: @flex-center" v-html="src" />
</template>
