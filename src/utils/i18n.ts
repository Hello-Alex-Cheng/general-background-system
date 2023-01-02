import i18n from '@/i18n'

// 菜单和面包屑 显示的文本是我们在定义路由表时的 `title`
export const generateTitle = (title: string): string => {
  return i18n.global.t('msg.route.' + title)
}
