<script setup lang="ts">
import TAvatar, { Avatar_ID_Range } from './TAvatar.vue'
import TIcon from './TIcon.vue'

defineProps<{
  userIsLogin: boolean,
  hamburgerAction: (e: MouseEvent) => any
  avatarAction?: (e: MouseEvent) => any
  avatarId: Avatar_ID_Range,
  logo: {
    iconSrc: string,
    class: string
  },
  menuItems: {
    title: string,
    src: string
  }[]
  isAdmin?: boolean
}>()

</script>

<template>
  <div
    class="@flex-center justify-between items-center flex-row h-72px w-full gradient-box-1 rounded-4 pt-[5px] px-4 pb-[3px] sm:w-[100%] sm:justify-between"
  >
    <button
      class="cursor-pointer w-11 h-11 bg-gradient-to-t from-[rgba(200,48,25,1)] to-[rgba(233,152,139,1)] rounded-[22px] shadow-lg shadow-red-500/30 sm:hidden"
      @click="hamburgerAction"
    >
      <TIcon class="text-white m-3" src="@icons/b-category.svg" />
    </button>
    <router-link to="/" class="cursor-ponter sm:flex" :class="userIsLogin ? '':'ml-15' ">
      <TIcon :class="logo.class" :src="logo.iconSrc" class="cursor-ponter" />
    </router-link>
    <button class="sm:hidden">
      <TAvatar
        v-if="userIsLogin"
        :class="{
          'shadow-lg': !isAdmin ,
          'cursor-pointer' : avatarAction
        }"
        :avatar-id="avatarId"
        size="mini"
        :is-admin="isAdmin"
        @click="avatarAction!"
      />
    </button>
    <div class="hidden sm:flex sm:@flex-center sm:justify-end  me-5 cursor-ponter w-60%">
      <button
        v-for="item in menuItems"
        :key="item.title"
        class="@flex-center flex-row @text-body mx-4"
      >
        <router-link :to="item.src">
          {{ item.title }}
        </router-link>
      </button>

      <TAvatar
        v-if="userIsLogin"
        class="ms-4 cursor-pointer"
        :class="{'shadow-lg': !isAdmin}"
        :avatar-id="avatarId"
        size="mini"
        :is-admin="isAdmin"
        @click="avatarAction!"
      />
    </div>
  </div>
</template>
