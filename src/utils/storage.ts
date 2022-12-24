/**
 * 存储数据
 */
export const setItem = (key: string, value: unknown): void => {
  // 将数组、对象类型的数据转化为 JSON 字符串进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value as string)
}

/**
 * 获取数据
 */
export const getItem = (key: string): unknown => {
  const data = window.localStorage.getItem(key) as string
  try {
    return JSON.parse(data)
  } catch (err) {
    // 如果报错了，直接将数据发送给使用端
    return data
  }
}

/**
 * 删除数据
 */
export const removeItem = (key: string): void => {
  window.localStorage.removeItem(key)
}

/**
 * 删除所有数据
 */
export const removeAllItem = (key: string): void => {
  window.localStorage.clear()
}
