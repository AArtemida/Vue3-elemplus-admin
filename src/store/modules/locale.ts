/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 16:00:00
 * @LastEditors: hy
 * @LastEditTime: 2022-05-27 14:44:35
 */
import { defineStore } from 'pinia'
// import { store } from '@/store'

enum LanguageTypeEnum {
  zh = '中文',
  en = 'English',
}

interface LocaleState {
  locale: string
  languages: object
}

export const useLocaleStore = defineStore({
  id: 'storeLocale',
  state: (): LocaleState => ({
    locale: 'zh',

    languages: {
      zh: '中文',
      en: 'English',
    },
  }),
  getters: {
    getLanguages(state): object {
      return state.languages
    },
  },
  actions: {
    setLocale(state: string) {
      this.locale = state || ''
    },
  },
  //使用插件自定义存储
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
      },
    ],
  },
})
