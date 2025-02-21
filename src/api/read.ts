import request from '@/utils/request'

/** 获取小说章节列表 */
export const getBooksListAPI = <T>(url: string, data?: any) => {
  return request<T>(url, 'GET', data)
}
