<template>
  <div class="page-search">
    <base-form v-bind="searchFormConfig" v-model="formData">
      <template #header></template>
      <template #footer>
        <div class="btns">
          <el-button>重置</el-button>
          <el-button type="primary">搜索</el-button>
        </div>
      </template>
    </base-form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import BaseForm from '@/base-ui/from/src/BaseForm.vue'

defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})

const formData = ref({
  name: '',
  password: '',
  sport: '',
  createTime: ''
})
</script>

<style scoped>
.btns {
  padding: 0 0 20px;
}
</style>
