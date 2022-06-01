/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 16:00:00
 * @LastEditors: hy
 * @LastEditTime: 2022-05-27 17:47:26
 */
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'

interface ViewState {
  visitedViews: Array<RouteRecordRaw>
}

export const useTabViewStore = defineStore({
  id: 'storeTabView',
  state: (): ViewState => ({
    visitedViews: [],
  }),
  actions: {
    // 新增
    addTabView(view: RouteRecordRaw) {
      const names = this.visitedViews.map(r => r.name)
      if(!(names.includes(view.name))) {
        this.visitedViews.push(
          Object.assign({}, view, {
            title: view && view.meta ? view.meta.title : 'no-name',
          })
        )
      }
    },
    // 删除
    deleteTabView(view: RouteRecordRaw) {
      return new Promise(resolve => {
        this.visitedViews = this.visitedViews.filter(r => {
          return r.name !== view.name
        })
        resolve([...this.visitedViews])
      })
    },
    // 清空
    clearTabView() {
      this.visitedViews = []
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
