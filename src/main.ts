import 'normalize.css'
import './assets/css/index.less'

// element plus 以组件 API 使用需要单独引入样式
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router'
import pinia from '@/store'

createApp(App).use(router).use(pinia).mount('#app')
