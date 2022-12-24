import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { login, getUserInfo } from '@/api/sys'
import router from '@/router'
import { TOKEN } from '@/constants'
import { setTimeStamp } from '@/utils/auth'

interface IState {
  token: string
  userinfo: any
}

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userinfo: {}
  }),
  mutations: {
    setToken(state: IState, token: string): void {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state: IState, userinfo: any): void {
      state.userinfo = userinfo
    }
  },
  actions: {
    login(context: any, userInfo: { username: string; password: string }) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then(res => {
            context.commit('setToken', res.token)

            // 用户已成功登录，保存登录时间，登录 2h 后，会清除 token
            setTimeStamp()

            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    async getUserInfo(context: any) {
      const res = await getUserInfo()
      context.commit('setUserInfo', res)
      return res
    },
    logout(context: any) {
      context.commit('setToken', '')
      removeAllItem()
      router.push('/login')
    }
  }
}
