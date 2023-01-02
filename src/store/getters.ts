import { MAIN_COLOR } from '@/constants'
import { getItem } from '@/utils/storage'
import { generateColors } from '@/utils/theme'

// generateColors(getItem(MAIN_COLOR)
//
// {
//   primary: 'rgba(0, 206, 209, 1)',
//   'shade-1': '#00b9bc',
//   'light-1': '#19d3d6',
//   'light-2': '#33d8da',
//   ...
//   subMenuHover: '#b3f0f1',
//   subMenuBg: '#ccf5f6',
//   menuHover: '#e6fafa',
//   menuBg: '#00ced1'
// }

const getters = {
  token: (state: any) => state.user.token,
  userInfo: (state: any) => state.user.userinfo,
  hasUserInfo: (state: any) => {
    // 如果用户信息存在，return true
    return JSON.stringify(state.user.userinfo) !== '{}'
  },
  cssVars: (state: any) => ({
    ...state.theme.variables,
    ...generateColors(getItem(MAIN_COLOR) as string | undefined)
  }),
  sidebarOpened: (state: any) => state.app.sidebarOpened,
  language: (state: any) => state.app.language,
  mainColor: (state: any) => state.theme.mainColor,
  tagsViewList: (state: any) => state.app.tagsViewList
}

export default getters
