/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 16:00:00
 * @LastEditors: hy
 * @LastEditTime: 2022-05-27 15:06:03
 */
import { defineStore } from 'pinia'
import { loginApi, logoutApi } from '@/api/user'
import { UserInfo, LoginParams } from '@/model/userModel'
// import { store } from '@/store'

interface UserState {
  userInfo: UserInfo | null
  token?: string
  roles: Array<string>
}

export const useUserStore = defineStore({
  id: 'storeUser',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roles: ['user', 'admin'],
  }),
  getters: {
    getUserInfo(): UserInfo | null {
      return this.userInfo
    },
    getToken(): string | undefined {
      return this.token
    },
    getRoles(): Array<string> {
      return this.roles.length > 0 ? this.roles : []
    },
  },
  actions: {
    setUserInfo(state: UserInfo | null) {
      this.userInfo = state
    },
    setToken(state: string | undefined) {
      this.token = state || ''
    },
    // 异步方法
    // 登录
    async login(loginParams: LoginParams): Promise<UserInfo | null> {
      try {
        const res = await loginApi(loginParams)
        if (res && res.data) {
          const { token, role } = res.data
          this.setToken(token)
          this.setUserInfo({
            ...loginParams,
            role,
          })
          return loginParams
        }
        return null
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 退出登录
    async logout() {
      await logoutApi()
      this.setToken(undefined)
      this.setUserInfo(null)
      return 1
    },
  },
  //使用插件自定义存储
  persist: {
    enabled: true,
    strategies: [
      {
        // key: 'storeUser',  //自定义 Key值,不填的话默认就是这个store的ID
        storage: sessionStorage, // 选择存储方式
      },
    ],
  },
})
