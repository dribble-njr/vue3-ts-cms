import { defineStore } from 'pinia'

export const useSystem = defineStore('system', {
  state: () => {
    return {
      userList: <any[]>[],
      userCount: 0,
      roleList: <any[]>[],
      roleCount: 0
    }
  },
  getters: {},
  actions: {
    // async getPageList(payload: any) {
    //   // const pageListResponse = await getPageListData(payload.url, payload.query)
    //   return pageListResponse.data
    // }
  }
})
