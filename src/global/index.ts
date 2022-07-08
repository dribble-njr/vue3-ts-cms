import { App } from 'vue'
import registerElementIcons from './register-element-icons'

export function globalRegister(app: App) {
  app.use(registerElementIcons)
}
