<template>
  <div>
    <page-search :searchFormConfig="searchFormConfig" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'
</script>

<style scoped></style>
