<template>
  <div class="page-modal">
    <el-dialog
      title="新建"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <base-form v-bind="modalConfig" v-model="formData"></base-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineExpose, defineEmits } from 'vue'

import BaseForm from '@/base-ui/from'

import { createPageData, editPageData } from '@/service/api/system'

const props = defineProps({
  modalConfig: {
    type: Object,
    required: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  otherInfo: {
    type: Object,
    default: () => ({})
  },
  pageName: {
    type: String,
    require: true
  }
})

const dialogVisible = ref(false)
const formData = ref<any>({})

watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)

defineExpose({
  dialogVisible
})

const emit = defineEmits(['newOrEdit'])
// 点击确定按钮的逻辑
const handleConfirmClick = () => {
  dialogVisible.value = false

  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    console.log('编辑用户')
    const pageUrl = `/${props.pageName}/${props.defaultInfo.id}`
    editPageData(pageUrl, {
      ...formData.value,
      ...props.otherInfo
    })
  } else {
    // 新建
    console.log('新建用户')
    const pageUrl = `/${props.pageName}`
    createPageData(pageUrl, {
      ...formData.value,
      ...props.otherInfo
    })
  }

  // 重新请求数据
  emit('newOrEdit')
}
</script>

<style scoped></style>
