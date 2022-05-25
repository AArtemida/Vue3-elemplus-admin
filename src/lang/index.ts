/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-25 09:50:01
 * @LastEditors: hy
 * @LastEditTime: 2022-05-25 10:12:56
 */
import { createI18n } from 'vue-i18n'
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
import enLocale from './en'
import zhLocale from './zh'

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

const locale = 'zh'//store.getters.getLocale

const i18n = createI18n({
  locale: locale, // set locale
  messages, // set locale messages
  silentTranslationWarn: true
})

export default i18n