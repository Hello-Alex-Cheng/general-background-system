import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constants'
import { RouteRecordRaw } from 'vue-router'

// tags view 删除的类型
type TRemoveMenus = 'other' | 'right' | 'left' | 'current'

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
    },
    changeTagsView(
      state: any,
      { index, tag }: { index: number; tag: RouteRecordRaw }
    ) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    removeTagsView(state: any, payload: { type: TRemoveMenus; index: number }) {
      const { type, index } = payload
      if (type === 'right') {
        if (index === state.tagsViewList.length - 1) return

        const result = state.tagsViewList.slice(0, index + 1)
        state.tagsViewList = result
        setItem(TAGS_VIEW, result)
      } else if (type === 'other') {
        // 关闭其他
        const result = [state.tagsViewList[index]]
        state.tagsViewList = result
        setItem(TAGS_VIEW, result)
      } else if (type === 'current') {
        // 关闭当前
        state.tagsViewList.splice(index, 1)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    }
  }
}
