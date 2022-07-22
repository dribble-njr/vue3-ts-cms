import { App } from 'vue'
import {
  Edit,
  Goods,
  Monitor,
  Setting,
  ChatLineRound,
  Fold,
  Expand,
  ArrowDown,
  Delete
} from '@element-plus/icons-vue'

const icons = [
  Edit,
  Setting,
  Monitor,
  Goods,
  ChatLineRound,
  Fold,
  Expand,
  ArrowDown,
  Delete
]

export default function (app: App) {
  for (const icon of icons) {
    app.component(icon.name, icon)
  }
}
