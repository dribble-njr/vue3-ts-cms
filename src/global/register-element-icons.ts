import { App } from 'vue'
import {
  Edit,
  Goods,
  Monitor,
  Setting,
  ChatLineRound,
  Fold,
  Expand,
  ArrowDown
} from '@element-plus/icons-vue'

const icons = [
  Edit,
  Setting,
  Monitor,
  Goods,
  ChatLineRound,
  Fold,
  Expand,
  ArrowDown
]

export default function (app: App) {
  for (const icon of icons) {
    app.component(icon.name, icon)
  }
}
