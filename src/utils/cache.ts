interface DataType {
  value: any
  time: number
  expire: number
}

class LocalCache {
  setCache(key: string, value: any, expire: number = 24 * 60 * 60) {
    expire = expire * 1000

    const data: DataType = {
      value,
      time: Date.now(),
      expire
    }

    window.localStorage.setItem(key, JSON.stringify(data))
  }

  getCache(key: string) {
    let data: DataType

    if (window.localStorage.getItem(key)) {
      data = JSON.parse(window.localStorage.getItem(key) as string)
    } else {
      return null
    }

    const nowTime = Date.now()
    if (data.expire < nowTime - data.time) {
      // 过期直接删除
      this.deleteCache(key)
      return null
    } else {
      // 未过期使用则自动续期
      this.setCache(key, data.value)
      return data.value
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
