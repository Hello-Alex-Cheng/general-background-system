import { RouteRecordRaw } from 'vue-router'
import path from 'path'

const getChildrenRoutes = (routes: RouteRecordRaw[]) => {
  const result: RouteRecordRaw[] = []

  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })

  return result
}

/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
export const filterRouters = (routes: RouteRecordRaw[]) => {
  const childrenRoutes = getChildrenRoutes(routes)

  return routes.filter(route => {
    // 如果 route 存在于 childRoute 中，表示路由重复了，需要剔除
    return !childrenRoutes.find(childRoute => {
      return childRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 */
function isNull(data: unknown) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

/**
 * @param routes 已经被 filterRouters 处理过的，不包含重复路由的数据
 * @param basePath
 * @returns
 */
export const generateMenus = (routes: RouteRecordRaw[], basePath = '') => {
  const result: RouteRecordRaw[] = []

  // 不满足该条件 `meta && meta.title && meta.icon` 的数据不应该存在，不需要展示的，比如 401，404，login 等
  routes.forEach(item => {
    // 不存在 children && 不存在 meta 直接 return，不需要展示出来的数据
    if (isNull(item.meta) && isNull(item.children)) return

    // 如果存在 children，不存在 meta，进入迭代，遍历 children
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children as RouteRecordRaw[]))
      return
    }

    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find(item => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }

      // icon 与 title 必须全部存在
      if (route.meta && route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children && route.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })

  return result
}
