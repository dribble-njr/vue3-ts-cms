<template>
  <router-link to="/login">登录</router-link>
  <router-link to="/home">首页</router-link>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="less"></style>
