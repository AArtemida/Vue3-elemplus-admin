/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 16:00:00
 * @LastEditors: hy
 * @LastEditTime: 2022-06-08 17:29:18
 */
import { defineStore } from 'pinia'
import { loginApi, logoutApi, getPermissionMenu } from '@/api/user'
import { UserInfo, LoginParams } from '@/model/userModel'
import { MenuItem, ElMenuItem } from '@/model/MenuModel'
import { generateRouter } from '@/router/generateRouter'
import router from '@/router/index'
// import { store } from '@/store'

interface UserState {
  userInfo: UserInfo | null
  token?: string
  roles: Array<string>,
  currentRole: string | null,
  menus?: Array<MenuItem>
}
/* 获取侧边菜单 */
function transformMenu(menus: Array<MenuItem>) {
  let list: Array<ElMenuItem> = []
  menus.forEach((menu: MenuItem) => {
    let item : ElMenuItem = {
      name: menu.meta?.title,
      route: menu.path,
    }
    if(menu.meta?.icon) item.icon = menu.meta?.icon
    if(menu.children) item.children = transformMenu(menu.children)
    list.push(item)
  })
  return list
}

export const useUserStore = defineStore({
  id: 'storeUser',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roles: ['user', 'admin'],
    // 当前权限
    currentRole: null,
    // 菜单
    menus: [],
  }),
  getters: {
    getUserInfo(): UserInfo | null {
      return this.userInfo
    },
    getToken(): string | undefined {
      return this.token
    },
    getCurrentRole(): string | null {
      return this.currentRole
    },
    getRoles(): Array<string> {
      return this.roles.length > 0 ? this.roles : []
    },
    getMenus() : Array<MenuItem> {
      return this.menus || []
    },
    getSideMenus() : Array<ElMenuItem> {
      const menus = this.menus || []
      return transformMenu(menus)
    }
  },
  actions: {
    setUserInfo(state: UserInfo | null) {
      this.userInfo = state
    },
    setToken(state: string | undefined) {
      this.token = state || ''
    },
    setMenus(state: Array<MenuItem>) {
      this.menus = state || []
    },
    /* 异步方法 */
    async setCurrentRole(state: string | null) {
      this.currentRole = state || ''

      await this.changePermissionMenu()
    },
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

          router.replace({ name: 'index' })

          this.setCurrentRole(role)
          return loginParams
        }
        return null
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async changePermissionMenu() {
      if (!this.getCurrentRole) return null
      const res = await getPermissionMenu({
        role: this.getCurrentRole
      })
      const menus = res?.data
      this.setMenus(menus)

      generateRouter(menus)
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
