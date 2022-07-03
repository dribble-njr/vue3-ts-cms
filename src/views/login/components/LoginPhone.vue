<template>
  <div class="login-phone">
    <el-form labelWidth="60px">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>

      <el-form-item label="验证码" prop="code">
        <div class="code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const phone = reactive({
  num: '',
  code: ''
})
</script>

<style lang="less" scoped>
.code {
  display: flex;
}

.btn {
  width: 85px;
  margin-left: 10px;
}
</style>
