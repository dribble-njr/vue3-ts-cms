<template>
  <div class="role-manage">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-table :tableData="roleList" :tableConfig="tableConfig"></page-table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import PageSearch from '@/components/page-search'
import PageTable from '@/components/page-table'

import { getPageList } from '@/service/api/system'

import { searchFormConfig } from './config/search.config' // 搜索表单配置
import { tableConfig } from './config/table.config' // 表格配置

// 用户列表数据
const { data } = await getPageList('/role/list', {
  offset: 0,
  size: 100
})
console.log(data)
const roleList = computed(() => data.list)
// const roleCount = computed(() => data.count)
</script>

<style scoped></style>
