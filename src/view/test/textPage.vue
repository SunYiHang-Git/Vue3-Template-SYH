<script setup lang="ts">
import { pinyin } from '@/utils/pinyin'
import { nextTick, onMounted, ref } from 'vue'
const inputRef = ref()
async function setFocus() {
  await nextTick()
  if (inputRef.value) {
    inputRef.value?.focus?.()
  }
}

const text = ref<string>('')
const textCopt = ref<string>('')
function handleClick() {
  const a = pinyin(text.value, { style: 0 })
  textCopt.value = a[0]
}
function handleEnter() {
  handleClick()
}

onMounted(() => {
  setFocus()
})
</script>

<template>
  <div class="test-page">
    测试功能页面
    <div class="box">
      <el-input ref="inputRef" v-model="text" @keydown.enter="handleEnter" class="input-text" />
      <el-button @click="handleClick">转换</el-button>
      <br />
      <el-input v-model="textCopt" class="input-text" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.test-page {
  width: 100%;
  height: 100%;
  .box {
    .input-text {
      width: 300px;
    }
  }
}
</style>
