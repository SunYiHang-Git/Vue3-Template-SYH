<script setup lang="ts">
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const goReadPage = () => {
  console.log('阅读--->')
  router.push('/read')
}
</script>

<template>
  <div class="box">
    <div class="common-layout">
      <el-container class="container">
        <el-header class="header"></el-header>
        <el-container>
          <el-aside width="200px" class="aside">
            <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              default-active="2"
              text-color="#fff"
              class="el-menu-vertical-demo menu"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>菜单一</span>
                </template>
                <el-menu-item-group title="第一组" class="menu-item-group">
                  <el-menu-item index="1-1" @click="goReadPage">阅读</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="第二组">
                  <el-menu-item index="1-3">2-1</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                  <template #title>2-2</template>
                  <el-menu-item index="1-4-1">2-2-1</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>
              <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <span>菜单二</span>
              </el-menu-item>
              <el-menu-item index="3">
                <el-icon><document /></el-icon>
                <span>菜单三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <el-icon><setting /></el-icon>
                <span>菜单四</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main class="main"></el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .common-layout {
    height: 100%;
    .container {
      height: 100%;
    }
    .header {
      background-color: #65b2ff;
    }
    .aside {
      height: 100%;
      ::v-deep(.el-menu-item-group__title) {
        font-size: 18px;
      }
      ::v-deep(.el-menu-item) {
        font-size: 14px;
      }
      .menu {
        height: 100%;
      }
    }
    .main {
      background-color: #fff;
    }
  }
}
</style>
