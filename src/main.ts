import { createApp, h } from 'vue'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import App from './App.vue'
import router from './router'
import store from './store/index'
import i18n from './i18n'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import '@/styles/cover-element-plus.scss'

// Element Plus 国际化语言
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

// 全局样式文件
// import '@/assets/scss/index.scss'
import '@/styles/index.scss'

// 导入 SvgIcon
import installIcons from '@/icons'

// 权限控制
import './permission'

const app = createApp(App)

app.config.globalProperties.appName = 'alex.cheng'

// 注册全局组件
app.component('my-component', {
  render() {
    return h('button', '123')
  }
})

console.log('环境变量: ', process.env)

// 注册全局的 Icon 组件
installIcons(app)

app.use(ElementPlus, {
  locale: store.getters.language === 'en' ? en : zhCn
})

app.use(router)
app.use(store)
app.use(i18n)

app.mount('#app')
