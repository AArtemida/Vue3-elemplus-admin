/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-19 16:21:52
 * @LastEditors: hy
 * @LastEditTime: 2022-05-23 14:07:31
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'

import '@/styles/common.scss'
import '@/assets/icons/iconfont.css'

const app = createApp(App)

// 挂载vuex状态管理
app.use(ElementPlus)
.use(store)
.use(router)

// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'))
