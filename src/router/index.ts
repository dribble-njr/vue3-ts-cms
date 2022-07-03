import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const Login = () => import('@/views/login/LoginComponent.vue')
const Home = () => import('@/views/main/main-comp.vue')

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
