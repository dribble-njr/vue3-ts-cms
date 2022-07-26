interface DataType {
  value: any
  time: number
  expire: number
}

class LocalCache {
  setCache(
    key: string,
    value: any,
    type = 'localStorage',
    expire = 24 * 60 * 60
  ) {
    expire = expire * 1000

    const data: DataType = {
      value,
      time: Date.now(),
      expire
    }

    // fix ts 7015
    // https://stackoverflow.com/questions/42193262/
    // element-implicitly-has-an-any-type-because-type-window-has-no-index-signatur
    ;(window as any)[type].setItem(key, JSON.stringify(data))
  }

  getCache(key: string) {
    let data: DataType
    let type: string

    if (window.localStorage.getItem(key)) {
      data = JSON.parse(window.localStorage.getItem(key) as string)
      type = 'localStorage'
    } else if (window.sessionStorage.getItem(key)) {
      data = JSON.parse(window.sessionStorage.getItem(key) as string)
      type = 'sessionStorage'
    } else {
      return null
    }

    const nowTime = Date.now()
    if (data.expire < nowTime - data.time) {
      // 过期直接删除
      this.deleteCache(key, type)
      return null
    } else {
      // 未过期使用则自动续期
      this.setCache(key, data.value, type, data.expire)
      return data.value
    }
  }

  deleteCache(key: string, type = 'localStorage') {
    if (type == 'localStorage') {
      window.localStorage.removeItem(key)
    } else {
      window.sessionStorage.removeItem(key)
    }
  }

  clearCache(type = 'localStorage') {
    if (type == 'localStorage') {
      window.localStorage.clear()
    } else {
      window.sessionStorage.clear()
    }
  }
}

export default new LocalCache()
