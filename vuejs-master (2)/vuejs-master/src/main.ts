import Demo from './demo/Demo.vue'
import { router } from './demo/router'
import './styles/main.css'
import 'uno.css'
import { createApp } from 'vue'
import { Theme_Init } from '@@/repository/Theme'
import { createPinia } from 'pinia'

Theme_Init()

const app = createApp(Demo)
const pinia = createPinia()

app.use(router)
app.use(pinia)

app.mount('#app')

declare global {
  interface NodeRequire {
    context: any
  }
}
