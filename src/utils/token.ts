import { KEY } from '@/const'

const KET_TOKEN = KEY + '_YYY_TOKEN'

const Storage_KEY = 'YYY_STORAGE'
/** 获取token */
export const getToken = () => {
  return sessionStorage.getItem(KET_TOKEN) || ''
}

/** 设置token */
export const setToken = (token: string) => {
  return sessionStorage.setItem(KET_TOKEN, token)
}

/** 删除token */
export const removeToken = () => {
  return sessionStorage.removeItem(KET_TOKEN)
}

/** 清空全部临时存储 */
export const clearStorage = () => {
  return sessionStorage.clear()
}

/** 获取指定Key的数据 */
export const getStorageByKey = (key: string) => {
  const strKey = getKey(key)
  const value = localStorage.getItem(strKey) || '1'
  return parseInt(value, 10)
}
/** 设置指定Key的数据 */
export const setStorageByKey = (key: string, value: string) => {
  const strKey = getKey(key)
  localStorage.setItem(strKey, value)
}
/** 删除指定Key的数据 */
export const removeStorageByKey = (key: string) => {
  const strKey = getKey(key)
  localStorage.removeItem(strKey)
}

function getKey(key: string) {
  return Storage_KEY + '__' + key
}
