import axios from 'axios'
import store from '@/store'
import { isCheckTimeout } from '@/utils/auth'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 在接口请求之前，判断 token 是否已经失效
      if (isCheckTimeout()) {
        store.dispatch('user/logout')

        // 失败的话，会走到 interceptors.response 的 error 方法。
        return Promise.reject(new Error('token 已失效'))
      }

      config.headers.Authorization = `Baerer ${store.getters.token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data

    if (success) {
      return data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  error => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout')
    }

    if (error.response && error.response.data && error.response.data.message) {
      ElMessage.error(error.response.data.message) // 提示错误信息
    } else {
      ElMessage.error(error.message)
    }

    console.log('errorerrorerrorerror', error.response)

    return Promise.reject(error)
  }
)

export default service
