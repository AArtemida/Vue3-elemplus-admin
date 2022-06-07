/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-25 09:50:01
 * @LastEditors: hy
 * @LastEditTime: 2022-06-06 17:35:33
 */
import type { App } from "vue"
import { createI18n } from 'vue-i18n'
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
import enLocale from './en'
import zhLocale from './zh'

import { useLocaleStore } from '@/store/modules/locale'

// 语言
let messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
}

export function installI18n(app: App<Element>) {
  const i18n = createI18n({
    locale: useLocaleStore().locale, // set locale
    fallbackLocale: 'zh', // set fallback locale
    messages, // set locale messages
  })
  app.use(i18n)
  return i18n
}