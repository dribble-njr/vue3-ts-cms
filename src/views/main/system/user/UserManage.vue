<template>
  <div class="user-manage">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleReset"
      @queryBtnClick="handleQuery"
    />
    <page-table
      :tableData="userList"
      :tableCount="userCount"
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
//   pageList: userList,
//   handleReset,
//   handleQuery
// } = await usePageSearch('/users/list')
const {
  pageList: userList,
  pageCount: userCount,
  handleReset,
  handleQuery
} = await usePageSearch('/users/list')
</script>

<style scoped></style>
