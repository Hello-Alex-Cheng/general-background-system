import md5 from 'md5'
import { setItem, getItem } from '@/utils/storage'
import { login } from '@/api/sys'

interface IState {
  token: string
}

export default {
  namespaced: true,
  state: () => ({
    token: getItem('token') || ''
  }),
  mutations: {
    setToken(state: IState, token: string): void {
      state.token = token
      setItem('token', token)
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
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
