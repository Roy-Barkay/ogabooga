<script setup lang="ts">
import TAvatar from '@@/components/TAvatar.vue'
import { tooltipDirective as vTooltip } from '@@/directive/tooltip'
import type { Avatar_ID_Range } from '@@/components/TAvatar.vue'

const avatarId = ref<Avatar_ID_Range[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24])
</script>

<template>
  <p class="@text-h2 p-3">
    اندازه: small
  </p>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] p-4">
    <TAvatar
      v-for="i in 24"
      :key="i"
      v-tooltip="{message: `id: ${i}`, color: 'black'}"
      :avatar-id="avatarId[i]"
      class="m-3"
      size="small"
    />
    <TAvatar
      v-for="i in 4"
      :key="i"
      url="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
      class="m-3"
      size="small"
    />
    <TAvatar size="small" class="m-3" />
  </div>

  <p class="@text-h2 p-3">
    اندازه: 36x
  </p>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] p-4">
    <TAvatar
      v-for="i in 24"
      :key="i"
      v-tooltip="{message: `id: ${i}`, color: 'black'}"
      :avatar-id="avatarId[i]"
      class="m-3"
      size="36x"
    />
    <TAvatar
      v-for="i in 4"
      :key="i"
      url="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
      class="m-3"
      size="36x"
    />

    <TAvatar size="36x" class="m-3" />
  </div>

  <p class="@text-h2 p-3">
    اندازه: mini
  </p>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] p-4">
    <TAvatar
      v-for="i in 24"
      :key="i"
      v-tooltip="{message: `id: ${i}`, color: 'black'}"
      :avatar-id="avatarId[i]"
      class="m-3"
      size="mini"
    />
    <TAvatar
      v-for="i in 4"
      :key="i"
      url="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
      class="m-3"
      size="mini"
    />

    <TAvatar size="mini" class="m-3" />
  </div>

  <p class="@text-h2 p-3">
    اندازه: medium
  </p>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] p-4">
    <TAvatar
      v-for="i in 24"
      :key="i"
      :avatar-id="avatarId[i]"
      class="m-3"
      size="medium"
    />
    <TAvatar
      v-for="i in 4"
      :key="i"
      url="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
      class="m-3"
      size="medium"
    />

    <TAvatar size="medium" class="m-3" />
  </div>

  <p class="@text-h2 p-3">
    اندازه: regular
  </p>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] p-4">
    <TAvatar
      v-for="i in 24"
      :key="i"
      v-tooltip="{message: `id: ${i}`, color: 'black'}"
      :avatar-id="avatarId[i]"
      class="m-3"
      size="regular"
    />
    <TAvatar
      v-for="i in 4"
      :key="i"
      url="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
      class="m-3"
      size="regular"
    />
    <TAvatar size="regular" class="m-3" />
  </div>

  <p class="@text-h2 p-3">
    اندازه: large
  </p>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] p-4">
    <TAvatar
      v-for="i in 24"
      :key="i"
      v-tooltip="{message: `id: ${i}`, color:'black'}"
      :avatar-id="avatarId[i]"
      class="m-3"
      size="large"
    />
    <TAvatar
      v-for="i in 4"
      :key="i"
      url="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
      class="m-3"
      size="large"
    />
    <TAvatar size="large" class="m-3" />
  </div>

  <p class="@text-h2 p-3">
    admin mode
  </p>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] p-4">
    <TAvatar
      :avatar-id="1"
      class="m-3"
      size="small"
      is-admin
    />

    <TAvatar
      :avatar-id="1"
      class="m-3"
      size="mini"
      is-admin
    />

    <TAvatar
      :avatar-id="1"
      class="m-3"
      size="medium"
      is-admin
    />

    <TAvatar
      url="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
      class="m-3"
      size="large"
      is-admin
    />
  </div>

  <p class="@text-h2 p-3">
    has warning
  </p>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] p-4">
    <TAvatar
      url="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
      class="m-3"
      size="mini"
      has-warning
    />
  </div>
</template>
