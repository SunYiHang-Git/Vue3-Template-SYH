<script setup lang="ts">
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { downServerFile, findLatestVersion, getUpdateLogAPI, getVersionListAPI, IOptions, IVersion } from './tools'

const system = ref('')
const version = ref('')
const pluginValue = ref<string>()
/** 系统选项 */
const systemOptions = ref<IOptions[]>([])
/** 版本选项 */
const versionOptions = ref<IOptions[]>([])
/** 系统版本对象 */
const versionObject = ref<IVersion>({})
const markdownContent = ref<string>('')

// 初始化时设置默认版本
const initData = async () => {
  versionObject.value = (await getVersionListAPI()) as any
  const systemKeys = Object.keys(versionObject.value)
  if (systemKeys.length === 0) return
  systemOptions.value = systemKeys.map((item) => {
    return { value: item, label: item }
  })
  system.value = systemKeys[0]
}
/** 获取日志 */
const getLog = async () => {
  await nextTick()
  const logData = await getUpdateLogAPI(`/${system.value}/${version.value}/changeLog.md`)
  const htmlContent = await marked.parse(logData)
  const cleanHtml = DOMPurify.sanitize(htmlContent)
  markdownContent.value = cleanHtml
}

onMounted(async () => {
  initData()
})

const isAllowDown = computed(() => {
  return !!(system.value && version.value)
})

const downloadRPA = () => {
  if (!isAllowDown) return
  const fullPath = '/' + system.value + '/' + version.value + '/K-RPA Lite.zip'
  downServerFile(fullPath, version.value + '.zip')
}
const downloadPlugin = () => {
  if (!isAllowDown) return
  const fullPath = '/plugin/' + pluginValue.value + '.zip'
  downServerFile(fullPath, pluginValue.value + '.zip')
}

const changeSystem = (key: string) => {
  const systemKeys = Object.keys(versionObject.value)
  if (systemKeys.length === 0) return
  const arr: { version: string; plugin: string }[] = []
  for (let item in versionObject.value) {
    if (item === key) {
      arr.push(...(versionObject.value[item] as any[]))
      break
    }
  }
  versionOptions.value = arr.map((item) => {
    return { value: item.version, label: item.version, plugin: item.plugin }
  })
  const maxVersion = findLatestVersion(versionOptions.value, 'value')
  const { plugin, value } = maxVersion
  version.value = value
  pluginValue.value = plugin
  getLog()
}

const changeVersion = (v: string) => {
  const systemList = versionObject.value[system.value]
  const findItem = systemList?.find((item) => item.version === v)
  if (!findItem) return
  version.value = findItem.version
  pluginValue.value = findItem.plugin
  getLog()
}

watch(
  system,
  (key) => {
    if (!key) return
    changeSystem(key)
  },
  {
    once: true
  }
)
</script>

<template>
  <div class="update-about">
    <div class="main">
      <div class="box">
        <div class="title">下载 K-RPA Lite®</div>
        <div class="version">
          <div class="text">获取 K-RPA Lite®</div>
          <div class="select">
            <el-select v-model="system" placeholder="系统" style="width: 100%" @change="changeSystem">
              <el-option v-for="item in systemOptions" :key="item.value" :label="item.label" :value="item.value" />
              <template #empty>暂无系统</template>
            </el-select>
          </div>
          <div class="text">环境中的</div>
          <div class="select">
            <el-select v-model="version" placeholder="版本" style="width: 100%" @change="changeVersion">
              <el-option v-for="item in versionOptions" :key="item.value" :label="item.label" :value="item.value" />
              <template #empty>先选系统系统</template>
            </el-select>
          </div>
          <div class="text">版本。</div>
        </div>
        <div class="remark">
          <el-scrollbar height="100%">
            <div class="content" v-html="markdownContent"></div>
          </el-scrollbar>
        </div>
        <el-button :disabled="!isAllowDown" type="primary" class="btn" @click="downloadRPA">
          下载 K-RPA Lite 至本地
        </el-button>
        <el-button :disabled="!isAllowDown" type="primary" class="btn" @click="downloadPlugin">下载插件</el-button>
      </div>
    </div>
    <div class="footer">
      <div class="left">
        <p>版权所有：©2025 金智维</p>
        <p>粤ICP备16115221号-1</p>
      </div>
      <div class="right">
        <div class="policy">商业策略</div>
        <div class="line"></div>
        <div class="policy">隐私策略</div>
        <div class="line"></div>
        <div class="policy">安全政策</div>
        <div class="line"></div>
        <div class="bgcImg"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.update-about {
  --primary-color: #4a90e2;
  --secondary-color: #adb5bd;
  --background-color: #343a40;
  --text-color: #e9ecef;
}
[data-theme='la'] {
  --primary-color: #4a90e2;
  --secondary-color: #adb5bd;
  --background-color: #343a40;
  --text-color: #e9ecef;
}
.update-about {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--background-color);
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .box {
      width: 960px;
      .title {
        font-size: 32px;
        font-weight: bold;
        line-height: normal;
        letter-spacing: 0em;
        color: #ffffff;
        margin-bottom: 16px;
      }
      .version {
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 8px;
        margin-bottom: 12px;
        color: #ffffff;
        .text {
          font-size: 14px;
          font-weight: normal;
          line-height: normal;
          letter-spacing: 0em;
          color: #ffffff;
        }
        .select {
          width: 168px;
          height: 32px;
          border-radius: 6px;
          background: #38363c;

          box-sizing: border-box;
          /* --k-gray-400 */
          border: 1px solid #736f78;
          // background-color: red;
        }
      }
      .remark {
        display: flex;
        flex-direction: column;
        padding: 12px;
        gap: 12px;
        background: #0e121b;
        box-sizing: border-box;
        border: 1px solid #38363c;
        width: 960px;
        height: 420px;
        border-radius: 4px;
        overflow: hidden;
        .content {
          color: #ffffff;
        }
        .mark-title {
          font-size: 18px;
          font-weight: bold;
          line-height: normal;
          letter-spacing: 0em;
          font-feature-settings: 'kern' on;
          color: #ffffff;
        }
        .li-box {
          margin-top: 12px;
          color: #ffffff;
          ol,
          li {
            list-style: none; /* 移除列表项标记 */
            padding: 0;
            margin: 0;
          }
          li {
            padding: 2px;
          }
        }
      }
      .btn {
        margin-top: 12px;
        font-size: 14px;
        font-weight: normal;
        line-height: 20px;
        letter-spacing: 0em;
        color: #ffffff;
      }
    }
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 14px 48px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    width: 100%;
    height: 48px;
    .left {
      display: flex;
      justify-content: start;
      gap: 24px;
      p {
        font-size: 12px;
        font-weight: normal;
        line-height: 16px;
        letter-spacing: 0em;
        color: #9e9e9e;
      }
    }
    .right {
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 24px;
      .policy {
        font-size: 12px;
        font-weight: normal;
        line-height: 16px;
        letter-spacing: 0em;
        color: #9e9e9e;
        cursor: pointer;
      }
      .line {
        width: 1px;
        height: 12px;
        background-color: #9e9e9e;
      }
      .bgcImg {
        width: 64px;
        height: 16px;
        background-image: url('./imgs//ksware.png'); /* 设置背景图片的路径 */
        background-size: cover; /* 背景图片根据容器大小自动调整 */
        background-position: center; /* 图片居中显示 */
      }
    }
  }
}
</style>
