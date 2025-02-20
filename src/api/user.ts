import request from '@/utils/request'

/** 登录账号 */
export const loginAPI = <T>(url: string, data: any) => {
  return request<T>(url, 'POST', data)
}
