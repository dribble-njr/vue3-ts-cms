import { defineStore } from 'pinia'

export const useSystem = defineStore('system', {
  state: () => {
    return {
      queryInfo: <any>null
    }
  },
  actions: {
    setQueryInfo(payload: any) {
      this.queryInfo = payload
    }
  }
})
