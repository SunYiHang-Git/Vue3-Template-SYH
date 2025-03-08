<script setup lang="ts">
import { ref, useTemplateRef, watch } from 'vue'
import NestedFunction from './NestedFunction.vue'
import { useDraggable } from 'vue-draggable-plus'
interface IList {
  id: string
  name: string
  children: IList[]
}
const { groupName } = defineProps<{
  /** 拖拽数据分组名称 */
  groupName: string
}>()
const rightRef = useTemplateRef('rightRef')

const treeList = ref<IList[]>([])

useDraggable(rightRef, treeList, {
  animation: 150,
  group: 'people'
  // ,onUpdate: () => {
  //   console.log('update list1')
  // },
  // onAdd: () => {
  //   console.log('add list1')
  // },
  // onRemove: () => {
  //   console.log('remove list1')
  // }
})

watch(
  () => treeList.value,
  () => {
    console.log('treeList.value--->', treeList.value)
  },
  {
    deep: true
  }
)
</script>

<template>
  <div class="right-main" ref="rightRef">
    <NestedFunction v-model="treeList" :groupName="groupName" />
  </div>
</template>

<style lang="scss" scoped>
.right-main {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
