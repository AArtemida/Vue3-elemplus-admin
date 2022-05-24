/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 16:00:00
 * @LastEditors: hy
 * @LastEditTime: 2022-05-20 16:30:10
 */
import { defineStore } from 'pinia'
// import { store } from '@/store'

interface UserInfo {
  userId: string | number
  username: string
  roles: []
}

interface UserState {
  userInfo: UserInfo | null,
  token?: string
  roles: []
}

export const useUserStore = defineStore({
  id: 'store-user',
  state: (): UserState => ({
    userInfo: null,
    token: '',
    roles: [],
  }),
  getters: {
    getUserInfo(): (UserInfo | null) {
      return this.userInfo
    },
    getRoles(): any {
      return this.roles.length > 0 ? this.roles : []
    },
  },
})
