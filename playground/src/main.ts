import { createApp } from 'vue'
import WebVitals from '../../src/index'
import App from './App.vue'

const wv = new WebVitals()
const app = createApp(App)

app.config.globalProperties.$wv = wv

app.mount('#app')
