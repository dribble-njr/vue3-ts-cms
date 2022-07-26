<template>
  <div>
    <page-search
      ref="pageSearchRef"
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleReset"
      @queryBtnClick="handleQuery"
    />
    <page-table
      ref="pageTableRef"
      pageName="goods"
      :tableConfig="tableConfig"
      @handlePageChange="handlePageChange"
    >
      <template #oldPrice="scope">
        {{ '￥' + scope.row.oldPrice }}
      </template>
      <template #newPrice="scope">
        {{ '￥' + scope.row.newPrice }}
      </template>
      <template #image="scope">
        <el-image
          style="width: 50px; height: 100%"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
          preview-teleported
        ></el-image>
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
</script>

<style scoped></style>
