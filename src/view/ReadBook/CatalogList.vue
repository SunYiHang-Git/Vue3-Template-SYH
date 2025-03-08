<script setup lang="ts">
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'
import { IDataList } from './getArticle.vue'
interface IProps {
  articleNameList: IDataList[]
  page: number
}
const props = defineProps<IProps>()
const emits = defineEmits<{
  (e: 'sendPage', data: IDataList): void
}>()
const logRef = ref<HTMLDivElement>()
const activeIndex = ref<number>(1)

const handleClick = (item: IDataList) => {
  emits('sendPage', item)
  activeIndex.value = item.page
}
const handleScroll = async () => {
  await nextTick()
  console.log('logRef.value--->', logRef.value)
  if (logRef.value) {
    console.log('滚动')
    logRef.value?.scrollBy({
      top: -50,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  ////
  //
  handleScroll()
})

watch(
  () => props.page,
  (val) => {
    activeIndex.value = val
  }
)
</script>

<template>
  <div class="catalog-box">
    <el-scrollbar height="80%">
      <div
        class="log"
        v-for="item in articleNameList"
        :key="item.page"
        :class="activeIndex === item.page ? 'activeBox' : ''"
        @click="handleClick(item)"
      >
        {{ '第' + item.page + '章：' + item.title }}
      </div>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.catalog-box {
  width: 100%;
  height: 100%;
  .log {
    width: 100%;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    padding-left: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    &:hover {
      color: #ad8484;
    }
  }
  .activeBox {
    color: #ad8484;
  }
}
</style>
