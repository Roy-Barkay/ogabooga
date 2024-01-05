import { MenuItemType } from '@@/components/MenuItem.vue'

export const AppState_MenuItems = computed(() => {
  const items: MenuItemType[] = [
    {
      path: '/buttons',
      name: 'دکمه ها',
      activeIcon: require('@@/assets/icons/b-3-user.svg'),
      inactiveIcon: require('@@/assets/icons/tt-3-user.svg'),
    },
    {
      path: '/modals',
      name: 'مودال ها',
      activeIcon: require('@@/assets/icons/b-3-user.svg'),
      inactiveIcon: require('@@/assets/icons/tt-3-user.svg'),
    },
    {
      path: '/icons',
      name: 'آیکن ها',
      activeIcon: require('@@/assets/icons/b-3-user.svg'),
      inactiveIcon: require('@@/assets/icons/tt-3-user.svg'),
    },
    {
      path: '/toasts',
      name: 'توست ها',
      activeIcon: require('@@/assets/icons/b-3-user.svg'),
      inactiveIcon: require('@@/assets/icons/tt-3-user.svg'),
    },
    {
      path: '/tooltips',
      name: 'تولتیپ ها',
      activeIcon: require('@@/assets/icons/b-3-user.svg'),
      inactiveIcon: require('@@/assets/icons/tt-3-user.svg'),
    },
    {
      path: '/menus',
      name: 'منو ها',
      activeIcon: require('@@/assets/icons/b-3-user.svg'),
      inactiveIcon: require('@@/assets/icons/tt-3-user.svg'),
    },
    {
      path: '/avatars',
      name: 'آواتار ها',
      activeIcon: require('@@/assets/icons/b-3-user.svg'),
      inactiveIcon: require('@@/assets/icons/tt-3-user.svg'),
    },
    {
      path: '/sliders',
      name: 'اسلایدر ها',
      activeIcon: require('@@/assets/icons/b-3-user.svg'),
      inactiveIcon: require('@@/assets/icons/tt-3-user.svg'),
    },
    {
      path: '/inputs',
      name: 'اینپوت ها',
      activeIcon: require('@@/assets/icons/b-3-user.svg'),
      inactiveIcon: require('@@/assets/icons/tt-3-user.svg'),
    },
    {
      path: '/chips',
      name: 'چیپس‌ها',
      activeIcon: require('@@/assets/icons/b-3-user.svg'),
      inactiveIcon: require('@@/assets/icons/tt-3-user.svg'),
    },
    {
      path: '/switches',
      name: 'سوییچ ها',
      activeIcon: require('@@/assets/icons/b-3-user.svg'),
      inactiveIcon: require('@@/assets/icons/tt-3-user.svg'),
    },
    {
      path: '/footers',
      name: 'فوترها',
      activeIcon: require('@@/assets/icons/b-3-user.svg'),
      inactiveIcon: require('@@/assets/icons/tt-3-user.svg'),
    },
    {
      path: '/radioButtons',
      name: 'رادیوها',
      activeIcon: require('@@/assets/icons/b-3-user.svg'),
      inactiveIcon: require('@@/assets/icons/tt-3-user.svg'),
    },
    {
      path: '/badges',
      name: 'بج ها',
      activeIcon: require('@@/assets/icons/b-3-user.svg'),
      inactiveIcon: require('@@/assets/icons/tt-3-user.svg'),
    },
    {
      path: '/actionsheets',
      name: 'اکشن شیت ها',
      activeIcon: require('@@/assets/icons/b-3-user.svg'),
      inactiveIcon: require('@@/assets/icons/tt-3-user.svg'),
    },
    {
      path: '/misc',
      name: 'متفرقه',
      activeIcon: require('@@/assets/icons/b-3-user.svg'),
      inactiveIcon: require('@@/assets/icons/tt-3-user.svg'),
    },
  ]

  return items
})
