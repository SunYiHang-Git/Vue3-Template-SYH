import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  // state 存储全局状态
  state: () => ({
    count: 88,
    name: 'Pinia'
  }),
  // getters 类似于计算属性
  getters: {
    doubleCount: (state) => state.count * 2
  },
  // actions 用于修改状态
  actions: {
    increment() {
      this.count++
    },
    updateName(newName: string) {
      this.name = newName
    }
  }
})
