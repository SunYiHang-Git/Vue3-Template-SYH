import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import router from '@/router/index'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/store/index'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(createPinia())
app.mount('#app')
