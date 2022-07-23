<template>
  <div class="base-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="header-handler"></slot>
        </div>
      </slot>
    </div>
    <el-table :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        align="center"
        width="60"
        v-if="showSelect"
      ></el-table-column>
      <el-table-column
        v-if="showIndex"
        type="index"
        label="序号"
        align="center"
        width="60"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          :page-sizes="[5, 10, 20, 40]"
          :page-size="page.pageSize"
          @size-change="handleSizeChange"
          :current-page="page.currentPage"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableCount"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'

const props = defineProps({
  title: {
    type: String
  },
  propList: {
    type: Array as PropType<any[]>
  },
  tableData: {
    type: Array as PropType<any[]>,
    required: true
  },
  tableCount: {
    type: Number
  },
  showIndex: {
    type: Boolean,
    default: true
  },
  showSelect: {
    type: Boolean,
    default: false
  },
  page: {
    type: Object,
    default: () => ({ currentPage: 0, pageSize: 10 })
  }
})

const emit = defineEmits(['selectionChange', 'update:page'])

// 选中抛出事件
const handleSelectionChange = (value: any) => {
  emit('selectionChange', value)
}

// 分页抛出事件
const handleSizeChange = (pageSize: number) => {
  emit('update:page', { ...props.page, pageSize })
}
const handleCurrentChange = (currentPage: number) => {
  emit('update:page', { ...props.page, currentPage })
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  // .handler {
  //   align-items: center;
  // }
}

.footer {
  margin-top: 15px;
  display: flex;

  .el-pagination {
    margin-left: auto;
  }
}
</style>
