/* eslint @typescript-eslint/no-var-requires: "off" */
import { RouteRecordRaw } from 'vue-router'

interface Breadcrumb {
  name: string
  path?: string
}

let firstMenu: any = null

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
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        traverse(menu.children)
      }
    }
  }

  traverse(userMenu)

  return routes
}

// 返回面包屑
export function mapPathToBreadcrumb(
  userMenu: any[],
  path: string
): Breadcrumb[] {
  const breadcrumbs: Breadcrumb[] = []
  mapPathToDefaultMenu(userMenu, path, breadcrumbs)
  return breadcrumbs
}

// 返回当前 URL 默认菜单
export function mapPathToDefaultMenu(
  userMenu: any[],
  path: string,
  breadcrumbs?: Breadcrumb[]
): any {
  for (const menu of userMenu) {
    if (menu.type === 1) {
      const res = mapPathToDefaultMenu(menu.children ?? [], path)
      if (res) {
        // 一级面包屑
        breadcrumbs?.push({ name: menu.name })
        // 当前面包屑
        breadcrumbs?.push({ name: res.name })
        return res
      }
    } else if (menu.type === 2 && menu.url === path) {
      return menu
    }
  }
}

export function mapMenuToPermission(userMenu: any[]) {
  const permissions: string[] = []

  const traverse = function (menus: any[]) {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        traverse(menu.children ?? [])
      } else {
        permissions.push(menu.permission)
      }
    }
  }

  traverse(userMenu)

  return permissions
}

export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []

  const traverse = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        traverse(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }

  traverse(menuList)

  return leftKeys
}

export { firstMenu }
