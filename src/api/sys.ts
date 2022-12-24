import request from '@/utils/request'

export const login = (data: {
  username: string
  password: string
}): Promise<any> => {
  return request({
    url: '/login',
    method: 'GET'
    // data
  })
}

export const getUserInfo = (): Promise<any> => {
  return request({
    url: '/userinfo',
    method: 'GET'
  })
}
