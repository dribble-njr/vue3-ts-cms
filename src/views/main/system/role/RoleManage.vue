<template>
  <div class="role-manage">
    <page-search
      ref="pageSearchRef"
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleReset"
      @queryBtnClick="handleQuery"
    />
    <page-table
      ref="pageTableRef"
      pageName="role"
      :tableConfig="tableConfig"
      @handlePageChange="handlePageChange"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-table>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="role"
      :modalConfig="modalConfig"
      :otherInfo="otherInfo"
      @newOrEdit="handleReset"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        ></el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'

import PageSearch from '@/components/page-search'
import PageTable from '@/components/page-table'
import PageModal from '@/components/page-modal'

import { ElTree } from 'element-plus'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useSystem } from '@/stores/system'
import { menuMapLeafKeys } from '@/utils/map-menus'

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

// 编辑回显菜单
const elTreeRef = ref<InstanceType<typeof ElTree>>()
const editCallback = (item: any) => {
  const leafKeys = menuMapLeafKeys(item.menuList)
  nextTick(() => {
    console.log(elTreeRef.value)
    elTreeRef.value?.setCheckedKeys(leafKeys, false)
  })
}

const { pageModalRef, defaultInfo, handleEditData, handleNewData } =
  usePageModal(undefined, editCallback)

const systemStore = useSystem()
// await systemStore.getInitialData()
const menus = computed(() => systemStore.entireMenu)

const otherInfo = ref({})
const handleCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys
  const halfCheckedKeys = data2.halfCheckedKeys
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  otherInfo.value = { menuList }
}
</script>

<style scoped>
.menu-tree {
  margin-left: 25px;
}
</style>
