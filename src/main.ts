/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-19 16:21:52
 * @LastEditors: hy
 * @LastEditTime: 2022-05-25 14:24:11
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import i18n from '@/lang/index'

import '@/styles/common.scss'
import '@/assets/icons/iconfont.css'

const app = createApp(App)

// 挂载vuex状态管理
app.use(ElementPlus, {
  i18n: (key:string, value:string) => i18n.t(key, value)
})
.use(store)
.use(router)
.use(i18n)

// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'))
