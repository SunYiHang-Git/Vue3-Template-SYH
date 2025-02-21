import request from '@/utils/request'
interface ArticleData<T> {
  code: number
  data: T
  msg: string
  state?: number
}

/** 获取小说章节列表 */
export const getBooksListAPI = <T>(url: string, data?: any) => {
  return request<ArticleData<T>>(url, 'GET', data)
}

/** 获取小说章节列表 */
export const getArticleNameListAPI = <T>(url: string, data?: any) => {
  return request<ArticleData<T>>(url, 'GET', data)
}
