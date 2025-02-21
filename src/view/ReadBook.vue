<script setup lang="ts">
import { computed, ref } from 'vue'
import GetArticle, { IDataAPI } from '@/view/ReadBook/getArticle.vue'

const fileContent = ref<string>('选择章节')
const title = ref<string>('')
const page = ref<number>(0)
const sendData = (data: IDataAPI) => {
  fileContent.value = data.content
  title.value = data.title
  page.value = data.pageNumber
}

const titleH2 = computed(() => {
  if (!title.value) return '选择章节'
  return `第${page.value}章: ${title.value}`
})
</script>

<template>
  <div class="read-box">
    <div class="setting">
      <GetArticle @sendData="sendData" />
    </div>
    <div class="read">
      <el-scrollbar height="100%">
        <h2>{{ titleH2 }}</h2>
        <pre>{{ fileContent }}</pre>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.read-box {
  display: flex;
  justify-content: space-between;
  gap: 1px;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  overflow: auto;
  .setting {
    width: 200px;
    height: 100%;
    border-right: 1px solid #ccc;
  }
  .read {
    flex: 1;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;
    pre {
      height: 100%;
      width: 100%;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow: auto;
      padding-bottom: 15px;
      font-size: 25px;
    }
  }
}
</style>
