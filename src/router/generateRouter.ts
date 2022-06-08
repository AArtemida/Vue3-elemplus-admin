/*
 * @Description:
 * @Author: hy
 * @Date: 2022-06-07 15:34:56
 * @LastEditors: hy
 * @LastEditTime: 2022-06-08 16:58:36
 */
import router from './index'

const modules = import.meta.glob('../views/*/*.vue')

const filterAsyncRoutes = (routes: any) => {
  //对返回的路由进行格式转换
  const asyncRoutes: Array<any> = []
  routes.forEach((route: any) => {
    if (route.redirect) {
      if (route.redirect.indexOf('/') < 0) {
        route.redirect = { name: route.redirect }
      }
    }

    try {
      route.component = modules['../views/' + route.componentName + '.vue']
    } catch (e) {
      console.log(e)
    }
    //处理children嵌套路由
    if (route?.children?.length) {
      route.children = filterAsyncRoutes(route.children)
    }
    asyncRoutes.push(route)
  })
  return asyncRoutes
}

// 添加路由
export const generateRouter = (asyncRoutes: any) => {
  return new Promise((resolve: any) => {
    const routes = filterAsyncRoutes(asyncRoutes)
    routes.forEach((route: any) => {
      let parentName = 'layout'
      if (!router.hasRoute(route.name)) {
        router.addRoute(parentName, {
          ...route,
        })
      }

      // 添加404
      if(!router.hasRoute('404')) {
        router.addRoute({
          path: '/:catchAll(.*)',
          name: '404',
          component: () => import('@/views/errorPage/index.vue')
        })
      }
    })

    resolve()
  })
}

// 清空
export const resetRouter = (asyncRoutes: any) => {
  asyncRoutes.forEach((route: any) => {
    router.removeRoute(route.name)
  })
}
