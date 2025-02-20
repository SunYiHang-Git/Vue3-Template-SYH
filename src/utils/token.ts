import { KEY } from '@/const'

//
const KET_TOKEN = KEY + '_YYY_TOKEN'
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
