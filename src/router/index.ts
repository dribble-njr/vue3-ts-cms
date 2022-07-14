import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const Login = () => import('@/views/login/LoginComponent.vue')
const Main = () => import('@/views/main/MainComp.vue')
const NotFound = () => import('@/views/notfound/NotFound.vue')

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/main' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/main', name: 'Main', component: Main, children: [] },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }

  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
