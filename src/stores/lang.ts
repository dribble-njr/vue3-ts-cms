import { defineStore } from 'pinia'

export const useLang = defineStore('lang', {
  state: () => {
    return {
      lang: 'zh-cn'
    }
  },
  getters: {},
  actions: {
    changeLang() {
      this.lang = this.lang == 'zh-cn' ? 'en' : 'zh-cn'
    }
  }
})
