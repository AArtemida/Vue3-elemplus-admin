/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 16:00:00
 * @LastEditors: hy
 * @LastEditTime: 2022-05-27 16:53:35
 */
import { defineStore } from 'pinia'

interface HeaderState {
  isCollapse: boolean
  searchWord: string | null
  selectTheme: string
}

export const useHeaderStore = defineStore({
  id: 'storeHeader',
  state: (): HeaderState => ({
    isCollapse: false,
    searchWord: '',

    selectTheme: 'default',
  }),
  actions: {
    setCollapse(state: boolean) {
      this.isCollapse = state
    },
    setSearchWord(state: string | null) {
      this.searchWord = state || ''
    },
    setTheme(state: string) {
      this.selectTheme = state
    },
    changeTheme(type: string) {
      this.setTheme(type)
      document.body.setAttribute('data-theme', type)
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
