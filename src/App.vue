<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'

import { useLang } from './stores/lang'

const locale = computed(() => (useLang().lang === 'zh-cn' ? zhCn : en))
</script>

<style lang="less"></style>
