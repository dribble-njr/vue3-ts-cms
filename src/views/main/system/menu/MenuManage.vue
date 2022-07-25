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
      pageUrl="/menu/list"
      :tableConfig="tableConfig"
      @handlePageChange="handlePageChange"
    >
      <template #icon="scope">
        <template v-if="scope.row.icon">
          <el-icon>
            <component :is="formatIcon(scope.row.icon)"></component>
          </el-icon>
        </template>
        <template v-else>暂无图标</template>
      </template>
    </page-table>
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

const formatIcon = (icon: string) => {
  return icon.slice(8)
}
</script>

<style scoped></style>
