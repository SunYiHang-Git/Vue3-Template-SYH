<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDraggable } from 'vue-draggable-plus'
import { IList } from './NestedFunction.vue'

const { list: propsList = [], groupName } = defineProps<{
  /** 拖拽数据列表 */
  list: IList[]
  /** 拖拽数据分组名称 */
  groupName: string
}>()
const el = ref()
const list = computed(() => {
  return propsList
})
useDraggable(el, list, {
  animation: 150,
  ghostClass: 'ghost',
  group: { name: groupName, pull: 'clone', put: true },
  onStart() {
    console.log('start')
  },
  onUpdate() {
    console.log('update')
  }
})
</script>

<template>
  <div class="left-menu">
    <div class="box">
      <div class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded" ref="el">
        <div v-for="item in list" :key="item.id" class="h-30 bg-gray-500/5 rounded p-3 cursor-move">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.left-menu {
  width: 100%;
  height: 100%;
  .box {
    width: 200px;
    min-height: 400px;
  }
}
</style>
