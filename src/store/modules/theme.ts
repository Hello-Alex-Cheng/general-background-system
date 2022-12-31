import { MAIN_COLOR, DEFAULT_COLOR } from '@/constants'
import { getItem, setItem } from '@/utils/storage'

// 使 variables 响应式
import variables from '@/styles/variables.scss'

console.log('getItem(MAIN_COLOR)', getItem(MAIN_COLOR))

export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables
  }),
  mutations: {
    /**
     * 设置主题色
     */
    setMainColor(state: any, newColor: string) {
      state.mainColor = newColor
      state.variables.menuBg = newColor
      setItem(MAIN_COLOR, newColor)
    }
  }
}
