import { MAIN_COLOR, DEFAULT_COLOR } from '@/constants'
import { getItem, setItem } from '@/utils/storage'

console.log('getItem(MAIN_COLOR)', getItem(MAIN_COLOR))

export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR
  }),
  mutations: {
    /**
     * 设置主题色
     */
    setMainColor(state: any, newColor: string) {
      state.mainColor = newColor
      setItem(MAIN_COLOR, newColor)
    }
  }
}
