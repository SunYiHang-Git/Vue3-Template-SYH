<template>
  <div v-if="visible" class="loading-overlay">
    <div class="close-button" v-show="visibleClose" @click="handleClose" title="关闭"></div>
    <div class="loading-spinner"></div>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'

const visible = ref(false)
const message = ref('')
const visibleClose = ref(false)
const timer = ref<any>()
const openTime = ref(0)

const open = (msg: string) => {
  message.value = msg
  visible.value = true
  visibleClose.value = false
  openTime.value = Date.now()

  timer.value = setTimeout(() => {
    visibleClose.value = true
  }, 5000)
}

const handleClose = () => {
  const elapsed = Date.now() - openTime.value
  const remaining = Math.max(300 - elapsed, 0)

  setTimeout(() => {
    close()
  }, remaining)
}

const close = () => {
  clearTimeout(timer.value)
  visibleClose.value = false
  visible.value = false
}

onBeforeUnmount(close)
defineExpose({ open, close })
</script>

<style lang="scss" scoped>
.loading-overlay {
  /* 添加滚动锁定 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  touch-action: none;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  /* 阻止事件穿透 */
  pointer-events: auto;

  p {
    font-size: 1.2rem;
    margin-top: 15px;
    color: #409eff;
    user-select: none;
  }

  .loading-spinner {
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    will-change: transform;
  }

  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 10000;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 2px;
      background-color: #3498db;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      transition: all 0.2s;
    }

    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    &:hover {
      &::before,
      &::after {
        background-color: #206a9d;
        width: 22px;
      }
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
