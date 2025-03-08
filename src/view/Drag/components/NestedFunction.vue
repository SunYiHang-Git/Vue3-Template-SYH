<template>
  <ul class="drag-area" ref="el">
    <li v-for="el in modelValue" :key="el.name">
      <p>{{ el.name }}</p>
      <NestedFunction v-model="el.children" :groupName="groupName" />
    </li>
  </ul>
</template>
<script setup lang="ts">
import { useDraggable, VueDraggable } from 'vue-draggable-plus'
import { computed, useTemplateRef } from 'vue'

export interface IList {
  id: string
  name: string
  children: IList[]
}

interface Props {
  modelValue: IList[]
  /** 拖拽数据分组名称 */
  groupName: string
}

const { groupName, modelValue } = defineProps<Props>()

interface Emits {
  (e: 'update:modelValue', value: IList[]): void
}

const el = useTemplateRef('el')

const emits = defineEmits<Emits>()
const list = computed({
  get: () => modelValue,
  set: (value) => emits('update:modelValue', value)
})
useDraggable(el, list, {
  group: groupName
})
</script>
<style scoped>
.drag-area {
  margin-bottom: 20px;
  min-height: 350px;
  padding: 5px;
  outline: 1px dashed blue;
}
</style>
