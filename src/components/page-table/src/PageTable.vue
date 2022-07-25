<template>
  <div class="page-table">
    <base-table
      :tableData="pageList"
      :tableCount="pageCount"
      v-bind="tableConfig"
      v-model:page="pageInfo"
    >
      <!-- header slot -->
      <template #header-handler>
        <el-button type="primary">新建用户</el-button>
        <el-button type="primary">刷新</el-button>
      </template>

      <!-- table column common slot -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="
            scope.row.enable
              ? 'success'
              : scope.row.status
              ? 'success'
              : 'danger'
          "
        >
          {{ scope.row.enable ? '启用' : scope.row.status ? '启用' : '禁用' }}
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

      <!-- 动态插入其他插槽 -->
      <template
        v-for="item in otherSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <slot :name="item.slotName" :row="scope.row"></slot>
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

// 获取表格数据
const getPageData = async (queryInfo?: any) => {
  const { data } = await getPageList(props.pageUrl, {
    offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
    size: pageInfo.value.pageSize,
    ...queryInfo
  })
  console.log(data)

  pageData.value = data
}

await getPageData()
const pageList = computed(() => pageData.value?.list)
const pageCount = computed(
  () => pageData.value?.totalCount ?? pageData.value?.list.length
)

defineExpose({
  getPageData
})

// 计算其他插槽
const otherSlots = props.tableConfig?.propList.filter((item: any) => {
  if (!item.slotName) return false
  if (item.slotName === 'status') return false
  if (item.slotName === 'createAt') return false
  if (item.slotName === 'updateAt') return false
  if (item.slotName === 'handler') return false
  return true
})
</script>

<style scoped>
.page-table {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
