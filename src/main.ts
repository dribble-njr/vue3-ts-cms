import 'normalize.css'
import './assets/css/index.less'

// element plus 以组件 API 使用需要单独引入样式
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router'
import pinia from '@/stores'
import { globalRegister } from './global'
import { useLogin } from '@/stores/login'

const app = createApp(App)

// 注册 element-plus-icons / other
globalRegister(app)
app.use(pinia)
useLogin().$loadLocalLogin()
app.use(router)
app.mount('#app')
