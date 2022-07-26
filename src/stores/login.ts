import { defineStore } from 'pinia'
import router from '@/router'

import localCache from '@/utils/cache'
import { mapMenuToRoutes, mapMenuToPermission } from '@/utils/map-menus'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenuById
} from '@/service/api/login'

interface Account {
  name: string
  password: string
}

export const useLogin = defineStore('login', {
  state: () => {
    return {
      token: '',
      userInfo: null,
      userMenu: <any[]>[],
      permissions: <any[]>[]
    }
  },
  getters: {},
  actions: {
    async accountLogin(payload: Account) {
      // 登录
      const loginResponse = await accountLoginRequest(payload)
      const { id, token } = loginResponse.data
      this.token = token
      localCache.setCache('token', token)

      // 请求用户信息
      const userInfoResponse = await getUserInfoById(id)
      this.userInfo = userInfoResponse.data
      localCache.setCache('userInfo', this.userInfo)

      // 请求用户菜单
      const userMenuResponse = await getUserMenuById(id)
      this.userMenu = userMenuResponse.data
      localCache.setCache('userMenu', this.userMenu)
      this._registerDynamicRoutes(this.userMenu)
      this._getPermissions(this.userMenu)

      // 跳到首页
      router.push('/main')
    },
    $loadLocalLogin() {
      const token = localCache.getCache('token')
      if (token) {
        this.token = token
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
      }
      const userMenu = localCache.getCache('userMenu')
      if (userMenu) {
        this.userMenu = userMenu
        this._registerDynamicRoutes(userMenu)
        this._getPermissions(userMenu)
      }
    },
    _registerDynamicRoutes(userMenu: any[]) {
      // 动态添加路由
      // 在这里做保证登录或者刷新界面后都能成功动态添加路由
      const routes = mapMenuToRoutes(userMenu)
      routes.forEach((route) => {
        router.addRoute('Main', route)
      })
    },
    _getPermissions(userMenu: any[]) {
      // 获取用户按钮权限
      this.permissions = mapMenuToPermission(userMenu)
    }
  }
})
