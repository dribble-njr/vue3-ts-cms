<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script lang="ts" setup>
import LoginPanel from './components/LoginPanel.vue'
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
