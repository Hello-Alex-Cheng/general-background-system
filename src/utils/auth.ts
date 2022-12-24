import { getItem, setItem } from './storage'
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constants'

/**
 * @name 获取时间戳
 */
export const getTimeStamp = () => {
  return getItem(TIME_STAMP)
}

/**
 * @name 设置时间戳
 */
export const setTimeStamp = () => {
  return setItem(TIME_STAMP, Date.now())
}

/**
 * @name 是否超时
 */
export const isCheckTimeout = () => {
  const now = Date.now()

  const cachedTimeStamp = getTimeStamp() as number

  return now - cachedTimeStamp > TOKEN_TIMEOUT_VALUE
}
