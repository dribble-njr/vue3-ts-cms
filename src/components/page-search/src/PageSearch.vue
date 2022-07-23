<template>
  <div class="page-search">
    <base-form v-bind="searchFormConfig" v-model="formData">
      <template #header></template>
      <template #footer>
        <div class="btns">
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="queryClick">搜索</el-button>
        </div>
      </template>
    </base-form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits, defineExpose } from 'vue'
import BaseForm from '@/base-ui/from/src/BaseForm.vue'

const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['resetBtnClick', 'queryBtnClick'])

// 初始化表单数据
const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)

// 重置表单
const resetForm = () => {
  // for (const key in formOriginData) {
  //   formData.value[`${key}`] = formOriginData[key]
  // }
  formData.value = formOriginData
  emit('resetBtnClick')
}

// 搜索
const queryClick = () => {
  emit('queryBtnClick', formData.value)
}

defineExpose({ formData })
</script>

<style scoped>
.btns {
  padding: 0 0 20px;
}
</style>
