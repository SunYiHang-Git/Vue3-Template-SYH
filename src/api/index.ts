import request from '@/utils/request'

export const getData = <T>(url: string, data: any = {}) => {
  return request<T>(url, 'POST', data)
}

export const postData = <T>(url: string, data: any) => {
  return request<T>(url, 'POST', data)
}
