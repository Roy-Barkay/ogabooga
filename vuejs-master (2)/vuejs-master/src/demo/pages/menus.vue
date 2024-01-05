<script setup lang="ts">
import THeader from '@@/components/THeader.vue'
import TMenu from '@@/components/TMenu.vue'
import TModal from '@@/components/TModal.vue'
import TSidebar from '@@/components/TSidebar.vue'
import { Browser_Screens } from '@@/repository/Browser'
import TModalLanguage from '@@/components/TModalLanguage.vue'

const modalModel = ref(false)
const modalModel2 = ref(false)
const modalModel3 = ref(false)
const languages = ref([
  { text: 'فارسی', value: 'fa' },
  { text: 'English', value: 'en' },
])
const active = ref('fa')

const logo = { class: '@text-black', iconSrc: require('@icons/b-category.svg') }
const menuItems = [{ title: 'پشتیبانی', src: '/home' }, { title: 'تعرفه', src: '/home' }, { title: ' مستندات فنی ', src: '/home' }]
function showModal() {
  modalModel.value = true
}

const fakeItems2 = [
  {
    name: 'منو ها',
    activeIcon: require('@icons/b-category.svg'),
    inactiveIcon: require('@icons/tt-category.svg'),
    path: '/menus',
  },
  {
    name: 'بنرها',
    activeIcon: require('@icons/b-category.svg'),
    inactiveIcon: require('@icons/tt-category.svg'),
    path: '/banners',
  },
  {
    name: 'مستندات فنی',
    activeIcon: require('@icons/b-setting.svg'),
    inactiveIcon: require('@icons/tt-setting.svg'),
    path: '/technical-docs',
  },
  {
    name: 'گزارشات ویدئو',
    activeIcon: require('@icons/b-play-1.svg'),
    inactiveIcon: require('@icons/tt-play-1.svg'),
    path: '/videos',
  },
  {
    name: 'بنرها',
    activeIcon: require('@icons/b-category.svg'),
    inactiveIcon: require('@icons/tt-category.svg'),
    path: '/banners',
  },
]
const fakeMenu = [
  {
    name: 'بنرها',
    activeIcon: require('@icons/b-category.svg'),
    inactiveIcon: require('@icons/tt-category.svg'),
    path: '/banners',
  },
  {
    name: 'بنرها',
    activeIcon: require('@icons/b-category.svg'),
    inactiveIcon: require('@icons/tt-category.svg'),
    path: '/banners',
  },
  {
    name: 'بنرها',
    activeIcon: require('@icons/b-category.svg'),
    inactiveIcon: require('@icons/tt-category.svg'),
    path: '/banners',
  },
  {
    name: '2تودرتو',
    activeIcon: require('@icons/b-setting.svg'),
    inactiveIcon: require('@icons/tt-setting.svg'),
    path: '/banners',
    children: [
      {
        name: 'باز',
        activeIcon: require('@icons/b-setting.svg'),
        inactiveIcon: require('@icons/tt-setting.svg'),
        path: '/technical-docs',
      },
      {
        name: 'در حال بررسی',
        activeIcon: require('@icons/b-play-1.svg'),
        inactiveIcon: require('@icons/tt-play-1.svg'),
        path: '/videos',
      },
      {
        name: 'منتظر پاسخ',
        activeIcon: require('@icons/b-category.svg'),
        inactiveIcon: require('@icons/tt-category.svg'),
        path: '/banners',
      },
      {
        name: 'بسته',
        activeIcon: require('@icons/b-play-1.svg'),
        inactiveIcon: require('@icons/tt-play-1.svg'),
        path: '/videos',
      },
    ],
  },
]

function handleLangugeAction() {
  modalModel3.value = true
}
function handleAddFundAction() {
  console.log('handleAddFundAction')
}
</script>

<template>
  <div class="p-3">
    <p class="@text-h1">
      سایدبار
    </p>
    <div class="flex">
      <TSidebar
        :items="fakeMenu"
      />
    </div>

    <p class="p-3 @text-h1">
      منو
    </p>

    <TMenu
      v-model="modalModel"
      :user-is-login="true"
      :menu-items="fakeItems2"
      :avatar-id="12"
      :user-name="'مهران محمدی'"
      :phone-number="'+989302191512'"
      :inventory="'50000 ریال'"
      :language-action="handleLangugeAction"
      :handle-add-fund-action="handleAddFundAction"
      :is-admin="true"
      corners="curve"
    />

    <TMenu
      v-model="modalModel2"
      :user-is-login="false"
      :menu-items="fakeItems2"
      :avatar-id="12"
      :user-name="'مهران محمدی'"
      :phone-number="''"
      :inventory="'50000 ریال'"
      :language-action="handleLangugeAction"
      :handle-add-fund-action="handleAddFundAction"
      :is-admin="true"
      corners="simple"
    >
      <TModal v-model="modalModel3" :max-width="Browser_Screens.sm ? 410 : 344">
        <TModalLanguage v-model="active" :languages="languages" />
      </TModal>
    </TMenu>

    <div class="p-3">
      <p class="@text-title mb-4">
        هدر
      </p>
      <THeader
        :user-is-login="true"
        :menu-items="menuItems"
        :logo="logo"
        :avatar-id="12"
        :hamburger-action="showModal"
        :avatar-action="showModal"
        :is-admin="true"
      />
      <TModal v-model="modalModel3" :max-width="Browser_Screens.sm ? 410 : 344">
        <TModalLanguage v-model="active" :languages="languages" />
      </TModal>
    </div>
    <p class="mb-16" />

    <THeader
      :user-is-login="false"
      :menu-items="menuItems"
      :logo="logo"
      :avatar-id="12"
      :hamburger-action="showModal"
      :avatar-action="showModal"
      :is-admin="true"
    />
  </div>
</template>
