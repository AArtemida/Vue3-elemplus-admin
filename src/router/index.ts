import { store } from '@/store';
/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-19 16:21:52
 * @LastEditors: hy
 * @LastEditTime: 2022-05-27 15:09:39
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
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
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '/',
        name: 'index',
        meta: {
          title: '工作台',
        },
        component: () => import('@/views/dashboard/index.vue'),
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '工作台',
        },
        component: () => import('@/views/dashboard/index.vue'),
      },
      {
        path: '/permission',
        name: 'permission',
        meta: {
          title: '权限控制',
        },
        component: () => import('@/views/permission/index.vue'),
        children: [
          {
            path: '/permission/page',
            name: 'pagePermission',
            meta: {
              title: '页面权限',
            },
            component: () => import('@/views/permission/Page.vue'),
          },
          {
            path: '/permission/button',
            name: 'buttonPermission',
            meta: {
              title: '按钮权限',
            },
            component: () => import('@/views/permission/Button.vue'),
          },
        ]
      },
      {
        path: '/theme',
        name: 'theme',
        meta: {
          title: '主题',
        },
        component: () => import('@/views/theme/index.vue'),
      },
      {
        path: '/errorPage',
        name: 'errorPage',
        meta: {
          title: '错误页',
        },
        component: () => import('@/views/errorPage/index.vue'),
      },
      {
        path: '/list',
        name: 'list',
        meta: {
          title: '列表',
        },
        component: () => import('@/views/list/index.vue'),
      },
      {
        path: '/manage',
        name: 'manage',
        meta: {
          title: '用户管理',
        },
        component: () => import('@/views/manage/User.vue'),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/errorPage/index.vue'),
  },
  // 404 page must be placed at the end !!!
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  // base: process.env.BASE_URL,
  history: createWebHistory(), //createWebHashHistory(''),
  routes,
})

router.beforeEach((to, from, next) => {
  let title: any = to.meta.title ? to.meta.title : 'project'
  window.document.title = title

  // 登录权限
  const userSession = sessionStorage.getItem('storeUser')
  let token = null
  if(userSession && userSession !== 'null') {
    const storeUser = JSON.parse(userSession)
    token = storeUser.token || ''
  }
  if(to.path !== '/login' && !token) {
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
