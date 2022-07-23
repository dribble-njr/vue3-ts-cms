<template>
  <div class="role-manage">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleReset"
      @queryBtnClick="handleQuery"
    />
    <page-table
      :tableData="roleList"
      :tableCount="roleCount"
      :tableConfig="tableConfig"
    ></page-table>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search'
import PageTable from '@/components/page-table'

import { usePageSearch } from '@/hooks/usePageSearch'

import { searchFormConfig } from './config/search.config' // 搜索表单配置
import { tableConfig } from './config/table.config' // 表格配置

// const {
//   pageList: roleList,
//   handleReset,
//   handleQuery
// } = await usePageSearch('/role/list')
const {
  pageList: roleList,
  pageCount: roleCount,
  handleReset,
  handleQuery
} = await usePageSearch('/role/list')
</script>

<style scoped></style>
