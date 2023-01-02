import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constants'
import { RouteRecordRaw } from 'vue-router'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSidebarOpened(state: any) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state: any, lang: string) {
      state.language = lang

      // 本地存储
      setItem(LANG, lang)
    },
    addTagsViewList(state: any, tag: RouteRecordRaw) {
      const isFind = state.tagsViewList.find(
        (t: RouteRecordRaw) => t.path === tag.path
      )

      if (!isFind) {
        state.tagsViewList.push(tag)

        setItem(TAGS_VIEW, state.tagsViewList)
      }
    }
  }
}
