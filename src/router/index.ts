/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-19 16:21:52
 * @LastEditors: hy
 * @LastEditTime: 2022-06-08 16:20:48
 */
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import { generateRouter } from '@/router/generateRouter'


// 公用路由
const publicRoutes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: { path: '/login' }
  // },
  {
    path: '/login',
    meta: {
      title: 'Login',
      keepAlive: true,
    },
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '/',
        name: 'index',
        meta: {
          title: 'menu.dashboard',
          icon: 'icon-gongzuotai',
          affix: true,
        },
        component: () => import('@/views/dashboard/index.vue'),
      },
      {
        path: '/dashboard',
        name: 'index',
        meta: {
          title: 'menu.dashboard',
          icon: 'icon-gongzuotai',
          affix: true,
        },
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/errorPage/index.vue'),
  },
]
const routes: Array<RouteRecordRaw> = [...publicRoutes]

const router = createRouter({
  // base: process.env.BASE_URL,
  history: createWebHistory(), //createWebHashHistory(''),
  routes,
})

// 路由拦截
let registerRouteFresh = true
router.beforeEach((to, from, next) => {
  // let title: any = to.meta.title ? to.meta.title : 'project'
  // window.document.title = title

  // 登录权限
  const userSession = sessionStorage.getItem('storeUser')
  let token = null,
    menus = []
  if (userSession && userSession !== 'null') {
    const storeUser = JSON.parse(userSession)
    token = storeUser.token || ''
    menus = storeUser.menus || []
  }
  // 刷新页面时添加路由
  if (registerRouteFresh) {
    generateRouter(menus).then(() => {
      next(to)
    })
    registerRouteFresh = false
  } else if (to.path !== '/login' && !token) {
    // token失效退出登录
    // const fullPath = to.fullPath || ''
    // const path = to.path || ''
    // let params = ''
    // if(fullPath && fullPath.includes("?")){
    //   params = fullPath.replace(path,'').replace("?",'')
    // }
    next({
      path: '/login',
      // query:{
      //   redirect: path,
      //   queryparam: params
      // }
    })
  } else {
    next()
  }
})

router.afterEach((to, from, failure) => {
  window.scrollTo(0, 0)
})

export default router
