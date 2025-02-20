import axios from 'axios'
import { getToken, removeToken } from './token'
import { ElMessage } from 'element-plus'
import { globalRouter } from '@/router'

// 创建 Axios 实例
const axiosClient = axios.create({
  baseURL: '/api/api', // 替换为你的 API 基础 URL
  timeout: 10000, // 请求超时时间（毫秒）
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosClient.interceptors.response.use(
  (response) => {
    // 返回数据而不是整个响应对象
    return response.data
  },
  (error) => {
    console.error('Error:', error)

    if (error.response) {
      const { status } = error.response
      const { message } = error.response.data || '未知错误'

      handleHttpError(status, message)
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('Request Error:', error.request)
      ElMessage({
        message: '请求超时或网络异常，请稍后再试。',
        type: 'error'
      })
    } else {
      // 其他错误
      console.error('Error Message:', error.message)
      ElMessage({
        message: '发生了一个错误，请联系管理员。',
        type: 'error'
      })
    }

    return Promise.reject(error)
  }
)

/**
 * 处理 HTTP 错误
 * @param {number} status - HTTP 状态码
 * @param {string} message - 错误消息
 */
function handleHttpError(status: number, message: string) {
  switch (status) {
    case 401:
      ElMessage({
        message: '登录已失效，请重新登录！',
        type: 'error'
      })
      // 这里可以添加跳转登录页的逻辑
      globalRouter.replace({ name: 'Login' })
      removeToken()
      break
    case 403:
      ElMessage({
        message: message || '您没有权限访问该资源。',
        type: 'error'
      })
      break
    case 404:
      ElMessage({
        message: message || '请求的资源未找到。',
        type: 'error'
      })
      break
    case 500:
      ElMessage({
        message: message || '服务器内部错误。',
        type: 'error'
      })
      break
    case 502:
      ElMessage({
        message: message || '网关错误。',
        type: 'error'
      })
      break
    case 503:
      ElMessage({
        message: message || '服务不可用，请稍后再试。',
        type: 'error'
      })
      break
    case 504:
      ElMessage({
        message: message || '网关超时。',
        type: 'error'
      })
      break
    default:
      ElMessage({
        message: message || '发生了一个未知错误。',
        type: 'error'
      })
      break
  }
}

/** http方法类型 */
type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE'
/**
 * 封装的请求函数
 * @param url - 请求的URL
 * @param HttpMethods - 请求的方法，默认为 GET
 * @param data - 请求的数据
 * @param option - 额外的配置选项
 */
interface RequestOptions {
  [key: string]: any
}

async function request<T>(url: string, method: HttpMethods, data: any, options: RequestOptions = {}): Promise<T> {
  try {
    const response = await axiosClient({
      url,
      method,
      data: method === 'GET' ? undefined : data,
      params: method === 'GET' ? data : undefined,
      ...options
    })

    return response as T
  } catch (error) {
    return Promise.reject(error)
  }
}

export default request
