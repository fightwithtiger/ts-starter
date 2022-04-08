import { createApp } from 'vue'
import { useCanvas } from '../../src/index'
import App from './App.vue'

const r = useCanvas()
console.log(r)

createApp(App).mount('#app')
