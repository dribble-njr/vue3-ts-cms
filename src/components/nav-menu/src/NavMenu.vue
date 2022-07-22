<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!props.isCollapse" class="title">Vue3 + TS CMS</span>
    </div>
    <el-menu
      :default-active="defaultMenu"
      class="el-menu-vertical"
      :collapse="props.isCollapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenu" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="formatIcon(item.icon)"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="menuItemClick(subitem)"
              >
                <el-icon v-if="subitem.icon">
                  <component :is="formatIcon(subitem.icon)"></component>
                </el-icon>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>

        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="formatIcon(item.icon)"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useLogin } from '@/stores/login'
import { mapPathToDefaultMenu } from '@/utils/map-menus'

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: Boolean
  }
})

const formatIcon = (icon: string) => {
  return icon.slice(8)
}

// pinia
const loginStore = useLogin()
const userMenu = loginStore.userMenu

// router
const router = useRouter()
const route = useRoute()
const currentPath = route.path

// data
const defaultMenu = mapPathToDefaultMenu(userMenu, currentPath).id + ''

// event
const menuItemClick = (item: any) => {
  router.push({
    path: item.url ?? '/not-found'
  })
}
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    justify-content: space-evenly;
    align-items: center;

    .img {
      height: 100%;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  .el-sub-menu {
    background-color: #001529 !important;
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
    .el-menu-item:hover {
      color: #fff !important; // 菜单
    }

    .el-menu-item.is-active {
      color: #fff !important;
      background-color: #0a60bd !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
