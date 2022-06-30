<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <el-button type="primary">hhh</el-button>
  <el-input placeholder="Please input" />
  <router-link to="/login">登录</router-link>
  <router-link to="/home">首页</router-link>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import Login from '@/views/login/login-comp.vue'
// import Home from '@/views/main/main-comp.vue'

export default defineComponent({
  name: 'App',
  components: {
    // Login,
    // Home
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
