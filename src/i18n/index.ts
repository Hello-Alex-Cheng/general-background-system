import { createI18n } from 'vue-i18n'
import store from '@/store'
import localZh from './lang/zh'
import localEn from './lang/en'

const messages = {
  en: {
    msg: {
      logo: 'Hello_AlexCc',
      ...localEn
    }
  },
  zh: {
    msg: {
      logo: '你好_AlexCc',
      ...localZh
    }
  }
}

const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: store && store.getters && store.getters.language,
  fallbackLocale: 'en',
  messages
})

export default i18n
