import { defineStore } from 'pinia'
import router from '@/router'

import localCache from '@/utils/cache'
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
      userMenu: []
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

      // 跳到首页
      router.push('/home')
    }
  }
})
