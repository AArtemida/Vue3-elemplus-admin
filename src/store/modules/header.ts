/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 16:00:00
 * @LastEditors: hy
 * @LastEditTime: 2022-05-27 14:58:57
 */
import { defineStore } from 'pinia'

interface HeaderState {
  isCollapse: boolean,
  searchWord: string | null,
  theme: string,
}

export const useHeaderStore = defineStore({
  id: 'storeHeader',
  state: (): HeaderState => ({
    isCollapse: false,
    searchWord: '',

    theme: 'default'
  }),
  actions: {
    setCollapse(state: boolean) {
      this.isCollapse = state
    },
    setSearchWord(state: string | null) {
      this.searchWord = state || ''
    },
    setTheme(state: string) {
      this.theme = state
    }
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
