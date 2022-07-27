import { defineStore } from 'pinia'

import { getPageList } from '@/service/api/system'

export const useSystem = defineStore('system', {
  state: () => {
    return {
      // 搜索表单
      queryInfo: <any>null,
      entireDepartment: <any>[],
      entireRole: <any>[],
      entireMenu: <any>[]
    }
  },
  actions: {
    setQueryInfo(payload: any) {
      this.queryInfo = payload
    },
    async getInitialData() {
      // 1.请求部门和角色数据
      const departmentResult = await getPageList('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageList('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      const menuResult = await getPageList('/menu/list', {})
      const { list: menuList } = menuResult.data

      // 2.保存数据
      this.entireDepartment = departmentList
      this.entireRole = roleList
      this.entireMenu = menuList
    }
  }
})
