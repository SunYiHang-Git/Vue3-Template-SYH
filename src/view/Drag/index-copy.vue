<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isResizing = ref(false)
const initialWidth = ref(0)

const resizeHandleMouseDown = (e: MouseEvent) => {
  isResizing.value = true
  initialWidth.value = e.clientX

  const onMouseMove = (moveEvent: MouseEvent) => {
    if (isResizing.value) {
      const newWidth = initialWidth.value - moveEvent.clientX
      const leftBox = document.querySelector('.left') as HTMLElement
      if (leftBox) {
        leftBox.style.width = `${Math.max(100, 300 - newWidth)}px` // 最小宽度为100px
      }
    }
  }

  const onMouseUp = () => {
    isResizing.value = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}
</script>

<template>
  <div class="drag-box">
    <div class="left">111</div>
    <div class="resize-handle" @mousedown="resizeHandleMouseDown"></div>
    <div class="right">222</div>
  </div>
</template>

<style lang="scss" scoped>
.drag-box {
  display: flex;
  gap: 18px;
  width: 100%;
  height: 100%;
  background-color: #f1f5f9;
  position: relative;

  .left {
    width: 300px;
    height: 100%;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    // transition: width 0.3s ease;
  }

  .resize-handle {
    width: 10px;
    height: 100%;
    background-color: #df6565;
    cursor: ew-resize;
    // position: absolute;
    // right: 0;
    // top: 0;
    // z-index: 10;
  }

  .right {
    flex: 1;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
