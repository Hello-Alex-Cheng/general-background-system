import { createApp, h } from 'vue'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import App from './App.vue'

const app = createApp(App)

app.config.globalProperties.appName = 'alex.cheng'

app.component('my-component', {
  render() {
    return h('button', '123')
  },
})

app.mount('#app')
