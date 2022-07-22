import { App } from 'vue'

import { formatUtcString } from '@/utils/date-format'

export default function (app: App) {
  app.config.globalProperties.$filters = {
    foo() {
      console.log('foo')
    },
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
  console.log('注册')
}
