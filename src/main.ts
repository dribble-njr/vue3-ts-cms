// 单独引入 element plus 样式
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router'
// import store from '@/store'
import pinia from '@/store'

import request from './service'

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

const getData = () => {
  console.log(1)
  return request.request<DataType>({
    url: '/home/multidata',
    interceptors: {
      requestInterceptor: (config) => {
        const token = '接口'
        if (token && config.headers) {
          config.headers.Authorization = token
        }
        return config
      }
    }
  })
}

getData()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
// setTimeout(() => {
//   getData()
//     .then((res) => {
//       console.log(res)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }, 200)
// setTimeout(() => {
//   getData()
//     .then((res) => {
//       console.log(res)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }, 400)

// getData()
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// setTimeout(() => {
//   request.cancelRequest(config)
// }, 100)

createApp(App).use(router).use(pinia).mount('#app')
