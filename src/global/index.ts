import { App } from 'vue'
import registerElementIcons from './register-element-icons'
import registerProperties from './register-properties'

export function globalRegister(app: App) {
  app.use(registerElementIcons)
  app.use(registerProperties)
}
