<template>
  <div class="nav-header">
    <el-icon @click="handleFoldClick">
      <template v-if="isFold">
        <Expand />
      </template>
      <template v-else>
        <Fold />
      </template>
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isFold = ref(false)

const emit = defineEmits(['foldChange'])

const handleFoldClick = function () {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less"></style>
