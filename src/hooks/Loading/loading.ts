// useLoading.ts 优化后
import { createApp } from 'vue'
import LoadingComponent from './index.vue'

interface LoadingInstance {
  open: (msg: string) => void
  close: () => void
}

let loadingInstance: LoadingInstance | null = null
let loadingApp: any = null
let mountNode: HTMLElement | null = null
let openTimestamp = 0
let closeTimer: ReturnType<typeof setTimeout> | null = null

const useLoading = () => {
  const open = (msg: string = '加载中...') => {
    // 清除正在等待的关闭操作
    if (closeTimer) {
      clearTimeout(closeTimer)
      closeTimer = null
    }

    if (!loadingInstance) {
      mountNode = document.createElement('div')
      document.body.appendChild(mountNode)
      loadingApp = createApp(LoadingComponent)
      loadingInstance = loadingApp.mount(mountNode) as LoadingInstance
    }

    openTimestamp = Date.now()
    loadingInstance?.open(msg)
  }

  const close = () => {
    if (!loadingInstance) return

    const elapsed = Date.now() - openTimestamp
    const remainingDelay = Math.max(300 - elapsed, 0)

    closeTimer = setTimeout(() => {
      loadingInstance!.close()
      // 销毁实例
      loadingApp?.unmount()
      if (mountNode && document.body.contains(mountNode)) {
        document.body.removeChild(mountNode)
      }
      loadingApp = null
      loadingInstance = null
      mountNode = null
      closeTimer = null
    }, remainingDelay)
  }

  return { open, close }
}

export default useLoading
