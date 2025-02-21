<script setup lang="ts">
import { getBooksListAPI } from '@/api/read'
import type { UploadUserFile } from 'element-plus'
import { ref } from 'vue'

const fileList = ref<UploadUserFile[]>([])
const fileContent = ref<string>('')
const CHUNK_SIZE = 1024 * 1024 // 每次读取1MB

const readChunk = (file: File, start: number, encoding: string, reader: FileReader): Promise<string> => {
  return new Promise((resolve, reject) => {
    const blobSlice = file.slice(start, Math.min(start + CHUNK_SIZE, file.size))

    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string)
      }
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsText(blobSlice, encoding)
  })
}

const handleChange = async (uploadFile: any) => {
  const file = uploadFile.file
  console.log('file--->', file)
  console.log('fileList--->', fileList.value)
  if (file) {
    let result = ''
    let start = 0
    try {
      const reader = new FileReader()
      while (start < file.size) {
        const chunk = await readChunk(file.slice(start, CHUNK_SIZE), start, 'UTF-8', reader)
        result += chunk
        start += CHUNK_SIZE
      }

      // fileContent.value = result
      console.log('result--->', result.slice(0, 500))
    } catch (error) {
      console.error('Error reading file:', error)
    }
  }
}

/** 获取文章 */
const getArticle = async () => {
  try {
    const res = await getBooksListAPI('/get/article', {})
    console.log('res--->', res)
  } catch (error) {
    console.error('Error reading file:', error)
  }
}
</script>

<template>
  <div class="read-box">
    <div class="setting">
      <el-button type="primary" @click="getArticle">获取文章</el-button>
    </div>
    <div class="read">
      <pre>{{ fileContent }}</pre>
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
    }
  }
}
</style>
