import { createI18n } from 'vue-i18n'
import { getItem } from '@/utils/storage'
import { LANG } from '@/constants'

const messages = {
  en: {
    message: {
      logo: 'Hello_AlexCc'
    }
  },
  zh: {
    message: {
      logo: '你好_AlexCc'
    }
  }
}

const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: (getItem(LANG) || 'zh') as string,
  fallbackLocale: 'en',
  messages
})

export default i18n
