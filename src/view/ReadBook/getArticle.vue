<script setup lang="ts">
import { getArticleNameListAPI, getBooksListAPI } from '@/api/read'
import { getStorageByKey, setStorageByKey } from '@/utils/token'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import CataLogList from './CatalogList.vue'

export interface IDataAPI {
  title: string
  content: string
  pageNumber: number
  [key: string]: any
}
export interface IDataList {
  title: string
  page: number
}

const emits = defineEmits<{
  (e: 'sendData', data: IDataAPI): void
}>()

const PAGE_KEY = 'page_article'
const page = ref<number>(1)
const text = ref<string>('1')
const data = ref<IDataAPI>() // 文章内容
const articleNameList = ref<IDataList[]>([])
const handleChange = () => {
  text.value = page.value.toString()
}

/** 获取小说 */
const getArticle = async (num: number) => {
  try {
    const res = await getBooksListAPI<IDataAPI>('/get/article', { page: num })
    if (res.code === 10000) {
      return res.data
    }
  } catch (error) {
    console.error('Error reading file:', error)
  }
  return { title: '获取失败', content: '获取失败', pageNumber: page.value }
}
/**
 * 处理回车事件
 * @param evt - 事件对象
 */
const handleClick = (evt: Event) => {
  const inputValue = (evt.target as HTMLInputElement).value
  let pageNumber = parseInt(inputValue, 10)
  if (isNaN(pageNumber)) {
    pageNumber = 1
    ElMessage.warning('请输入有效的数字')
  } else if (pageNumber < 1) {
    pageNumber = 1
    ElMessage.warning('页码不能小于1')
  } else {
    ElMessage.success(`当前页码为 ${pageNumber}`)
  }
  page.value = pageNumber
  handleData(page.value)
}

/** 上一章/下一章 */
const handlePageSum = async (num: number) => {
  if (page.value <= 1 && num === -1) {
    ElMessage.warning('已经是第一页了')
    return
  }
  page.value = page.value + num
  handleData(page.value)
}

async function handleData(num: number) {
  handleChange()
  const res = await getArticle(num)
  data.value = res
  emits('sendData', res)
  setStorageByKey(PAGE_KEY, num.toString())
}

function init() {
  page.value = getStorageByKey(PAGE_KEY)
  handleData(page.value)
}

/** 获取小说章节列表 */
const getArticleNameList = async () => {
  const res = await getArticleNameListAPI<IDataList[]>('/get/article/names')
  if (res.code !== 10000) return
  articleNameList.value = res.data
}
const sendPage = (item: IDataList) => {
  page.value = item.page
  handleData(item.page)
}

onMounted(() => {
  init()
  getArticleNameList()
  console.log('000--->', page.value)
})
</script>

<template>
  <div class="get-article">
    <div class="top">
      <el-button @click="handlePageSum(-1)"><</el-button>
      <el-input v-model="text" class="input" @keydown.enter="handleClick" @change="handleChange"></el-input>
      <el-button @click="handlePageSum(1)">></el-button>
    </div>
    <div class="catalog">
      <CataLogList :articleNameList="articleNameList" :page="page" @sendPage="sendPage" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.get-article {
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f0f0f0;
  .top {
    display: flex;
    align-items: center;
    max-height: 100px;
    justify-content: space-between;
    .input {
      width: 100%;
    }
  }
  .catalog {
    flex: 1;
  }
}
</style>
