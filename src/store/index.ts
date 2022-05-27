/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-19 16:21:52
 * @LastEditors: hy
 * @LastEditTime: 2022-05-26 14:54:54
 */
import type { App } from "vue"
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

const store = createPinia()
store.use(piniaPersist)

export function setupStore(app: App<Element>) {
  app.use(store)
}

export default { store }
