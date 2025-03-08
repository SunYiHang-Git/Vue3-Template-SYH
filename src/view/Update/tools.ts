import useLoading from '@/hooks/Loading/loading'

export interface IOptions {
  value: string
  label: string
  plugin?: string
}
export interface IVersion {
  [key: string]: {
    version: string
    plugin: string
  }[]
}

const { open, close } = useLoading()

export const baseUrl = 'http://k-rpa-lite.kingsware.cn:48080'
export const standbyUrlList = ['https://k-rpa-lite.donxj.com']

/** 超时时间 */
const timeoutDuration = 15000
/**  默认使用第一个 baseUr */
let lastCheckedBaseUrl = baseUrl //
/** 上次检查的时间戳, 初始化为0，强制首次检查 */
let lastCheckedTime = 0
/** 缓存有效期（10分钟） */
const CACHE_DURATION = 10 * 60 * 1000
/** 用于并发控制的检查锁 */
let checkingPromise: Promise<string> | null = null //

// 自定义错误类型
class NetworkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NetworkError'
  }
}

class HttpError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.name = 'HttpError'
    this.statusCode = statusCode
  }
}

class TimeoutError extends Error {
  constructor() {
    super('Request timeout')
    this.name = 'TimeoutError'
  }
}

/** 获取全部候选地址列表 */
function getAllUrls(): string[] {
  return [baseUrl, ...standbyUrlList]
}

// 专用健康检查方法（带超时）
const checkUrlAvailability = async (url: string): Promise<boolean> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)
  try {
    const response = await fetch(`${url}/config.json`, {
      method: 'HEAD',
      signal: controller.signal,
      cache: 'no-cache'
    })
    return response.ok
  } catch {
    return false
  } finally {
    clearTimeout(timeoutId)
  }
}

// 顺序检查地址可用性
const findAvailableUrl = async (): Promise<string> => {
  // 优先检查主地址
  if (await checkUrlAvailability(baseUrl)) {
    return baseUrl
  }

  // 顺序检查备用地址
  for (const url of standbyUrlList) {
    if (await checkUrlAvailability(url)) {
      return url
    }
  }

  throw new NetworkError('请求地址不可用')
}

/**
 * 获取当前可用的 baseUrl
 * @returns {Promise<string>}
 */
async function getAvailableBaseUrl(): Promise<string> {
  const shouldCheck = Date.now() - lastCheckedTime > CACHE_DURATION || !lastCheckedBaseUrl
  // 使用缓存结果
  if (!shouldCheck) {
    return lastCheckedBaseUrl
  }
  // 处理并发请求
  if (!checkingPromise) {
    checkingPromise = (async () => {
      try {
        const availableUrl = await findAvailableUrl()
        lastCheckedBaseUrl = availableUrl
        lastCheckedTime = Date.now()
        return availableUrl
      } finally {
        checkingPromise = null
      }
    })()
  }
  return checkingPromise
}

/**
 * 发起 API 请求
 * @param {string} url 相对于基础 URL 的路径
 * @param {'json'|'text'|'blob'} format 响应体的解析格式，默认为 'json'
 * @param {number} retries 默认重试次数
 * @returns {Promise<Object>} 返回一个 Promise 对象，该对象解析为从 API 获取的数据
 * @throws {Error} 如果请求失败或响应不是有效的格式，则抛出错误
 */
export const ajaxAPI = async <T = any>(url: string, format = 'json', retries = 2): Promise<T> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutDuration)

  try {
    const currentBaseUrl = await getAvailableBaseUrl()
    const fullUrl = `${currentBaseUrl}${url}`

    const response: any = await fetch(fullUrl, {
      signal: controller.signal,
      cache: 'no-cache'
    })
    clearTimeout(timeoutId)
    if (!response.ok) {
      throw new HttpError(response.status, `请求失败，状态码：${response.status}`)
    }

    return await response[format]()
  } catch (error: any) {
    clearTimeout(timeoutId)
    // 处理重试逻辑
    if (retries > 0) {
      const urls = getAllUrls()
      const currentIndex = urls.indexOf(lastCheckedBaseUrl)
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % urls.length : 0
      lastCheckedBaseUrl = urls[nextIndex]
      return ajaxAPI<T>(url, format, retries - 1)
    }
    // 错误类型处理
    if (error instanceof HttpError) throw error
    if (error.name === 'AbortError') throw new TimeoutError()
    throw new NetworkError(`网络请求失败: ${error.message}`)
  }
}

/**
 * 获取系统版本对象
 * @returns
 */
export const getVersionListAPI = async () => {
  return await ajaxAPI('/config.json?t=' + Date.now())
}

/**
 * 获取更新日志
 * @param url
 * @returns
 */
export const getUpdateLogAPI = async (url: string) => {
  return await ajaxAPI(url, 'text')
}

/** 下载文件 */
export const downServerFile = async (url: string, name: string = '', retries = 1): Promise<void> => {
  try {
    open()
    const currentBaseUrl = await getAvailableBaseUrl()
    const fullUrl = `${currentBaseUrl}${url}`

    const response = await fetch(fullUrl)
    if (!response.ok) {
      throw new HttpError(response.status, '文件下载失败')
    }

    const blob = await response.blob()
    await downloadBlob(blob, `K-RPA Lite${name}`)
  } catch (error) {
    if (retries > 0) {
      lastCheckedTime = 0 // 强制刷新缓存
      return downServerFile(url, name, retries - 1)
    }
    throw error
  } finally {
    close()
  }
}
/**
 * 创建下载文件，解决浏览器直接打开文件的问题
 * @param blob
 * @param fileName
 */
async function downloadBlob(blob: Blob, fileName: string = '下载文件') {
  try {
    const { showSaveFilePicker }: any = window
    if (showSaveFilePicker) {
      const handle = await showSaveFilePicker({
        types: [
          {
            description: 'All Files', // 描述可以自定义
            accept: { '*/*': [] } // 使用通配符表示所有文件类型
          }
        ],
        suggestedName: fileName // 建议的文件名
      })
      const writableStream = await handle.createWritable()
      await writableStream.write(await blob.arrayBuffer())
      await writableStream.close()
    } else {
      const href = window.URL.createObjectURL(blob) //创建下载的链接
      const downloadElement = document.createElement('a')
      downloadElement.href = href
      downloadElement.target = '_blank'
      downloadElement.download = fileName
      document.body.appendChild(downloadElement)
      downloadElement.click() // 点击下载
      document.body.removeChild(downloadElement) // 下载完成移除元素
      window.URL.revokeObjectURL(href) // 释放掉blob对象
    }
  } catch (e) {
    console.error('文件保存失败:', e)
  }
}

// 定义一个函数来比较两个版本号
function compareVersions(v1: string, v2: string) {
  const parts1 = v1.split('.').map(Number)
  const parts2 = v2.split('.').map(Number)

  const longestLength = Math.max(parts1.length, parts2.length)

  for (let i = 0; i < longestLength; i++) {
    const num1 = i < parts1.length ? parts1[i] : 0
    const num2 = i < parts2.length ? parts2[i] : 0

    if (num1 > num2) return 1
    if (num1 < num2) return -1
  }

  return 0
}

// 定义一个函数来找到最新版本的对象

/**
 * @param items 传入对象数组
 * @param key 比较的版本key值
 */
export function findLatestVersion(items: any[], key: string) {
  if (!items || items.length === 0) {
    return {}
  }

  let latestItem = items[0]
  for (let i = 1; i < items.length; i++) {
    if (compareVersions(items[i][key], latestItem[key]) > 0) {
      latestItem = items[i]
    }
  }
  return latestItem
}
