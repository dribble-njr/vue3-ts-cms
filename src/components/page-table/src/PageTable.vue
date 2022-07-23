<template>
  <div class="page-table">
    <base-table
      :tableData="tableData"
      :tableCount="tableCount"
      v-bind="tableConfig"
    >
      <template #header-handler>
        <el-button type="primary">新建用户</el-button>
        <el-button type="primary">刷新</el-button>
      </template>
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>

      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>

      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>

      <template #handler>
        <div class="hanle-btns">
          <el-button size="small" type="primary" text>
            <el-icon><Edit /></el-icon>
            编辑
          </el-button>
          <el-button size="small" type="primary" text>
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </div>
      </template>
    </base-table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import BaseTable from '@/base-ui/table'

defineProps({
  tableData: {
    type: Array,
    required: true
  },
  tableCount: {
    type: Number,
    default: 0
  },
  tableConfig: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.page-table {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
