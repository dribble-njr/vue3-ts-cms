import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler
} from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

import localCache from '@/utils/cache'

const DEAFULT_LOADING = true

interface RequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse | any) => AxiosResponse | any
  responseInterceptorCatch?: (error: any) => any
}

interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors
  loading?: boolean
}

class Request {
  instance: AxiosInstance
  interceptors?: RequestInterceptors
  loading?: boolean
  loadingInstance?: LoadingInstance
  static pendingRequestMap: Map<string, Canceler> = new Map()

  constructor(config?: RequestConfig) {
    this.instance = axios.create(config)
    // 接收自定义拦截方法
    this.interceptors = config?.interceptors
    this.loading = config?.loading ?? DEAFULT_LOADING

    // 拦截器顺序
    // 请求拦截：先注册的后执行(unshift)
    // [class, instance, interface] -> [interface, instance, class]
    // 响应拦截：先注册的先执行(push)
    // [class, instance, interface] -> [class, instance, interface]

    // 注册全局请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        // 全局 loading
        if (this.loading) {
          this.loadingInstance = ElLoading.service({
            fullscreen: true,
            lock: true,
            text: 'loading...'
          })
        }

        // 自动携带 token
        const token = localCache.getCache('token')
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      (err) => {
        console.log('类请求失败拦截')
        return err
      }
    )
    // 注册全局响应拦截
    this.instance.interceptors.response.use(
      (res) => {
        // 移除 loading
        this.loadingInstance?.close()

        // 处理状态码
        if (res.data.returnCode === '-1001') {
          console.log('请求失败')
        } else {
          ElMessage({
            type: 'success',
            message: '请求成功'
          })
          return res
        }
      },
      (err) => {
        // 移除 loading
        this.loadingInstance?.close()

        // 处理错误状态码
        Request.httpErrorStatusHandle(err)

        return err
      }
    )

    // 注册实例请求拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 注册实例响应拦截
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }

  /**
   * 生成请求的唯一键
   * @param {RequestConfig} config
   * @return {*}  {string}
   * @memberof Request
   */
  static generateRequestKey(config: RequestConfig): string {
    const { url, method, params } = config
    let { data } = config
    if (typeof data === 'string') data = JSON.parse(data)
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
  }

  /**
   * 将每个请求信息
   * 存在 cancelRequestMap 中
   * @static
   * @param {RequestConfig} config
   * @memberof Request
   */
  static addPendingRequest(config: RequestConfig) {
    const requestKey = this.generateRequestKey(config)

    config.cancelToken = new axios.CancelToken((c) => {
      if (!this.pendingRequestMap.has(requestKey)) {
        this.pendingRequestMap.set(requestKey, c)
      }
    })
  }

  /**
   * 检查是否存在重复请求
   * 若存在则取消已发的请求
   * @static
   * @param {RequestConfig} config
   * @memberof Request
   */
  static removePendingRequest(config: RequestConfig) {
    const requestKey = Request.generateRequestKey(config)

    if (Request.pendingRequestMap.has(requestKey)) {
      const cancel = Request.pendingRequestMap.get(requestKey)
      if (cancel) cancel(requestKey)
      Request.pendingRequestMap.delete(requestKey)
    }
  }

  static httpErrorStatusHandle(error: any) {
    if (axios.isCancel(error))
      return console.error('重复请求：' + error.message)

    let message = ''
    if (error && error.response) {
      switch (error.response.status) {
        case 302:
          message = '接口重定向了！'
          break
        case 400:
          message = '参数不正确！'
          break
        case 401:
          message = '您未登录，或者登录已经超时，请先登录！'
          break
        case 403:
          message = '您没有权限操作！'
          break
        case 404:
          message = `请求地址出错: ${error.response.config.url}`
          break // 在正确域名下
        case 408:
          message = '请求超时！'
          break
        case 409:
          message = '系统已存在相同数据！'
          break
        case 500:
          message = '服务器内部错误！'
          break
        case 501:
          message = '服务未实现！'
          break
        case 502:
          message = '网关错误！'
          break
        case 503:
          message = '服务不可用！'
          break
        case 504:
          message = '服务暂时无法访问，请稍后再试！'
          break
        case 505:
          message = 'HTTP版本不受支持！'
          break
        default:
          message = '异常问题，请联系管理员！'
          break
      }
    }
    if (error.message.includes('timeout')) message = '网络请求超时！'
    if (error.message.includes('Network'))
      message = window.navigator.onLine ? '服务端异常！' : '您断网了！'

    ElMessage({
      type: 'error',
      message
    })
  }

  cancelRequest(config: RequestConfig) {
    Request.removePendingRequest(config)
  }

  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 为单个接口设置 请求 拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 移除重复请求
      Request.removePendingRequest(config)
      // 把当前请求信息添加到 pendingRequestMap 中
      Request.addPendingRequest(config)

      // 为单个接口设置是否显示 loading
      if (config.loading === false) this.loading = config.loading

      this.instance
        .request(config)
        .then((res) => {
          res.config && Request.removePendingRequest(res.config)

          // 单个接口设置 响应 拦截
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          this.loading = DEAFULT_LOADING
          resolve(res.data)
        })
        .catch((err) => {
          err.config && Request.removePendingRequest(err.config)
          this.loading = DEAFULT_LOADING

          reject(err)
          return err
        })
    })
  }

  get<T>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'get' })
  }

  post<T>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'post' })
  }

  delete<T>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'delete' })
  }

  patch<T>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'patch' })
  }
}

export default Request
