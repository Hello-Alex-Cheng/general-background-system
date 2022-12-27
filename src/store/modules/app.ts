import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constants'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh'
  }),
  mutations: {
    triggerSidebarOpened(state: any) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state: any, lang: string) {
      state.language = lang

      // 本地存储
      setItem(LANG, lang)
    }
  }
}
