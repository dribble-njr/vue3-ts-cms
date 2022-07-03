<template>
  <div class="login">
    <login-panel class="children"></login-panel>
  </div>
</template>

<script lang="ts" setup>
import LoginPanel from './components/LoginPanel.vue'
</script>

<style scoped lang="less">
.login {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  height: 100%;
  width: 100%;
  background: url('../../assets/img/login-bg.svg');
  position: relative;
}

.children {
  position: absolute;
  top: 50%;
  left: 50%;
  // bottom: 0;
  // right: 0;
  margin: auto;
}
</style>
