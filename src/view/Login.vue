<script setup lang="ts">
import { loginAPI } from '@/api/user'
import { setToken } from '@/utils/token'
import { useMainStore } from '@/store'
import { useRouter } from 'vue-router'
const router = useRouter()

const store = useMainStore()

/** 登录 */
async function login() {
  const { data } = await loginAPI<{ data: string }>('/sys/login', { mobile: '13800000002', password: 'hm#qd@23!' })
  setToken(data)
  router.replace({ name: 'Home' })
}
</script>

<template>
  <div class="user">
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>

<style lang="scss" scoped>
.user {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
