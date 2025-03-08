<!-- ParentComponent.vue -->
<template>
  <div class="drag-container">
    <div class="left">
      <LeftMenu :list="list" groupName="group" />
    </div>
    <div class="right">
      <RightMain groupName="group" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RightMain from './components/RightMain.vue'
import LeftMenu from './components/LeftMenu.vue'
import { IList } from './components/NestedFunction.vue'

const list = ref<IList[]>([
  {
    name: 'Joao',
    id: '1',
    children: []
  },
  {
    name: 'Jean',
    id: '2',
    children: []
  },
  {
    name: 'Johanna',
    id: '3',
    children: []
  },
  {
    name: 'Juan',
    id: '4',
    children: []
  }
])
</script>

<style scoped>
.drag-container {
  display: flex;
  justify-content: space-between;
  height: 100%;
  gap: 15px;
  background-color: #f1f5f9;
  .left {
    width: 300px;
    height: 100%;
    background-color: #fff;
  }
  .right {
    flex: 1;
    height: 100%;
    background-color: #fff;
  }
}
</style>
