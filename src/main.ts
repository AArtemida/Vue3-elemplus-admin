/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-19 16:21:52
 * @LastEditors: hy
 * @LastEditTime: 2022-06-09 10:05:48
 */
import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from "./store/index"

import router from './router'

import ElementPlus from 'element-plus'
import { installI18n } from '@/lang/index'
import { useLocaleStore } from '@/store/modules/locale'
import { setupGlobDirectives } from '@/directives'

import '@/styles/common.scss'
import '@/assets/icons/iconfont.css'

const app = createApp(App)

// 挂载pinia
setupStore(app)

// 挂载i18n
const i18n = installI18n(app)

const l = useLocaleStore()
l.$subscribe((_: any, state: any) => {
  i18n.global.locale = state.locale
})

// 挂载vuex状态管理.use(store)
app.use(ElementPlus, {
  i18n: (key:string, value:string) => i18n.t(key, value)
})
.use(router)

// 注册全局指令
setupGlobDirectives(app)

// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'))
