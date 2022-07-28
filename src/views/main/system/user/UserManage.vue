<template>
  <div class="user-manage">
    <page-search
      ref="pageSearchRef"
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleReset"
      @queryBtnClick="handleQuery"
    />
    <page-table
      ref="pageTableRef"
      pageName="users"
      :tableConfig="tableConfig"
      @handlePageChange="handlePageChange"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-table>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfigRef"
      @newOrEdit="handleReset"
    ></page-modal>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import PageSearch from '@/components/page-search'
import PageTable from '@/components/page-table'
import PageModal from '@/components/page-modal'

import { useSystem } from '@/stores/system'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

import { searchFormConfig } from './config/search.config' // 搜索表单配置
import { tableConfig } from './config/table.config' // 表格配置
import { modalConfig } from './config/modal.config'

const {
  pageTableRef,
  pageSearchRef,
  handleReset,
  handleQuery,
  handlePageChange
} = await usePageSearch()

// usePageModal 相关的回调逻辑
// 1.处理密码的逻辑
const newCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  if (passwordItem) passwordItem.isHidden = false
}
const editCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  if (passwordItem) passwordItem.isHidden = true
}

// 2.动态添加部门和角色列表
const systemStore = useSystem()
// await systemStore.getInitialData()
const modalConfigRef = computed(() => {
  const departmentItem = modalConfig.formItems.find(
    (item) => item.field === 'departmentId'
  )
  if (departmentItem) {
    departmentItem.options = systemStore.entireDepartment.map((item: any) => {
      return { title: item.name, value: item.id }
    })
  }
  const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')
  if (roleItem) {
    roleItem.options = systemStore.entireRole.map((item: any) => {
      return { title: item.name, value: item.id }
    })
  }
  return modalConfig
})

const { pageModalRef, defaultInfo, handleEditData, handleNewData } =
  usePageModal(newCallback, editCallback)
</script>

<style scoped></style>
