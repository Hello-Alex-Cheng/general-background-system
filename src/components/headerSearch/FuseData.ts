import { RouteRecordRaw } from 'vue-router'
import path from 'path'
import i18n from '@/i18n'

interface IRes {
  path?: string
  title?: string[]
}

/**
 * 筛选出可供搜索的路由对象
 * @param routes 路由表
 * @param basePath 基础路径，默认为 /
 * @param prefixTitle 父级title，子集title集合 [文章，文章排名]
 */

export const generateRoutes = (
  routes: RouteRecordRaw[],
  basePath = '/',
  prefixTitle: string[] = []
): IRes[] => {
  let res: IRes[] = []

  for (const route of routes) {
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }

    // 当前存在 meta 时，使用 i18n 解析国际化数据，组合成新的 title 内容
    // 动态路由不允许被搜索（类似：user/:id 这种）
    // 匹配动态路由的正则
    const reg = /.*\/:.*/
    if (route.meta && route.meta.title && !reg.exec(route.path)) {
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`)

      data.title = [...data.title, i18nTitle]

      res.push(data)
    }

    if (route.children && route.children.length) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)

      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }

  return res
}
