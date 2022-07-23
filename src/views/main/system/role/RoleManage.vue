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
      pageUrl="/role/list"
      :tableConfig="tableConfig"
      @handlePageChange="handlePageChange"
    ></page-table>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search'
import PageTable from '@/components/page-table'

import { usePageSearch } from '@/hooks/usePageSearch'

import { searchFormConfig } from './config/search.config' // 搜索表单配置
import { tableConfig } from './config/table.config' // 表格配置

const {
  pageTableRef,
  pageSearchRef,
  handleReset,
  handleQuery,
  handlePageChange
} = await usePageSearch()
</script>

<style scoped></style>
