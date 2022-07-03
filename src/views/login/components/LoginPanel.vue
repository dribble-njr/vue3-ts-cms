<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <el-tabs type="border-card" stretch>
      <el-tab-pane label="User">
        <template #label>
          <span>账号登录</span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>

      <el-tab-pane label="Config">
        <template #label>
          <span>手机登录</span>
        </template>
        <login-phone></login-phone>
      </el-tab-pane>
    </el-tabs>

    <div class="password-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="login">
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'

const isKeepPassword = ref(false)
const accountRef = ref<InstanceType<typeof LoginAccount> | null>(null)

const login = () => {
  accountRef.value?.login()
}
</script>

<style lang="less" scoped>
.login-panel {
  // margin-top: -200px;
  width: 320px;

  .title {
    text-align: center;
  }

  .password-control {
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
  }
}
</style>
