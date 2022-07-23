<template>
  <div class="page-table">
    <base-table
      :tableData="pageList"
      :tableCount="pageCount"
      v-bind="tableConfig"
      v-model:page="pageInfo"
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
import {
  defineProps,
  defineExpose,
  defineEmits,
  ref,
  computed,
  watch
} from 'vue'

import { getPageList } from '@/service/api/system'

import BaseTable from '@/base-ui/table'

const props = defineProps({
  tableConfig: {
    type: Object,
    required: true
  },
  pageUrl: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['handlePageChange'])

// 用户列表数据
const pageData = ref()
// 分页信息
const pageInfo = ref({ currentPage: 1, pageSize: 5 })
watch(pageInfo, () => {
  emit('handlePageChange')
})

const getPageData = async (queryInfo?: any) => {
  const { data } = await getPageList(props.pageUrl, {
    offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
    size: pageInfo.value.pageSize,
    ...queryInfo
  })
  pageData.value = data
}

await getPageData()
const pageList = computed(() => pageData.value?.list)
const pageCount = computed(() => pageData.value?.totalCount)

defineExpose({
  getPageData
})
</script>

<style scoped>
.page-table {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
