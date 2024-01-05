import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    public?: boolean
    admin?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/start-pwa',
    redirect: '/home',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('./pages/home.vue'),
  },
  {
    path: '/buttons',
    component: () => import('./pages/buttons.vue'),
  },
  {
    path: '/modals',
    component: () => import('./pages/modals.vue'),
  },
  {
    path: '/icons',
    component: () => import('./pages/icons.vue'),
  },
  {
    path: '/toasts',
    component: () => import('./pages/toasts.vue'),
  },
  {
    path: '/tooltips',
    component: () => import('./pages/tooltips.vue'),
  },
  {
    path: '/menus',
    component: () => import('./pages/menus.vue'),
  },
  {
    path: '/avatars',
    component: () => import('./pages/avatars.vue'),
  },
  {
    path: '/sliders',
    component: () => import('./pages/rangeSliders.vue'),
  },
  {
    path: '/inputs',
    component: () => import('./pages/inputs.vue'),
  },
  {
    path: '/chips',
    component: () => import('./pages/chips.vue'),
  },
  {
    path: '/switches',
    component: () => import('./pages/switches.vue'),
  },
  {
    path: '/footers',
    component: () => import('./pages/footers.vue'),
  },
  {
    path: '/misc',
    component: () => import('./pages/misc.vue'),
  },
  {
    path: '/radioButtons',
    component: () => import('./pages/radioButtons.vue'),
  },
  {
    path: '/badges',
    component: () => import('./pages/badges.vue'),
  },
  {
    path: '/actionsheets',
    component: () => import('./pages/actionsheets.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('./pages/404.vue'),
  },

]

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory('/'),
  routes, // short for `routes: routes`
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})
