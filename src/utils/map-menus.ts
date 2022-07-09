/* eslint @typescript-eslint/no-var-requires: "off" */
import { RouteRecordRaw } from 'vue-router'

export function mapMenuToRoutes(userMenu: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 默认加载所有路由
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.slice(1))
    allRoutes.push(route.default)
  })

  // 根据菜单动态添加路由
  const traverse = function (menus: any[]) {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        traverse(menu.children)
      }
    }
  }

  traverse(userMenu)

  return routes
}
