import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/view/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/view/Login.vue')
  }
  // 可以添加更多路由
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes
})

export default router

export { router as globalRouter } // 导出路由实例
