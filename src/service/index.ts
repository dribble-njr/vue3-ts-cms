// 自定义 axios 配置
import Request from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 可以额外添加拦截
  interceptors: {
    requestInterceptor: (config) => {
      // console.log('实例请求成功拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('实例请求失败拦截')
      return err
    },
    responseInterceptor: (res) => {
      // console.log('实例响应成功拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log('实例响应失败拦截')
      return err
    }
  }
})

export default request
