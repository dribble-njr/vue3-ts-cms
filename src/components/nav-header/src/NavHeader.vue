<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <template v-if="isFold">
        <Expand />
      </template>
      <template v-else>
        <Fold />
      </template>
    </el-icon>

    <div class="content">
      <div>
        <el-breadcrumb separator="/">
          <template v-for="item in breadcrumbs" :key="item.name">
            <el-breadcrumb-item>
              {{ item.name }}
            </el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </div>
      <div class="right">
        <el-button @click="changeLang" text style="margin-right: 10px">
          <template v-if="lang == 'zh-cn'">English</template>
          <template v-else>中文</template>
        </el-button>

        <el-dropdown>
          <span class="el-dropdown-link">
            {{ name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleExitClick">
                退出登录
              </el-dropdown-item>
              <el-dropdown-item>用户信息</el-dropdown-item>
              <el-dropdown-item>系统管理</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLogin } from '@/stores/login'
import { useLang } from '@/stores/lang'
import { useRoute } from 'vue-router'
import { mapPathToBreadcrumb } from '@/utils/map-menus'

import localCache from '@/utils/cache'
import router from '@/router'

// 折叠 aside
const isFold = ref(false)
const emit = defineEmits(['foldChange'])
const handleFoldClick = function () {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}

// 面包屑
const breadcrumbs = computed(() => {
  const userMenu = loginStore.userMenu
  const route = useRoute()
  const currentPath = route.path

  return mapPathToBreadcrumb(userMenu, currentPath)
})

// element plus 语言
const langStore = useLang()
const lang = computed(() => langStore.lang)
const changeLang = function () {
  console.log('改变语言')

  langStore.changeLang()
  console.log(lang.value, langStore.lang)
}

// 用户
const loginStore = useLogin()
const name = loginStore.userInfo ? loginStore.userInfo['name'] : ''

// 退出登录
const handleExitClick = () => {
  localCache.deleteCache('token')
  router.push('/main')
}
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 20px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
    .right {
      display: flex;
      .el-dropdown-link {
        cursor: pointer;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
