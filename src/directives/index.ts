/*
 * @Description:
 * @Author: hy
 * @Date: 2022-06-09 09:52:49
 * @LastEditors: hy
 * @LastEditTime: 2022-06-09 09:53:26
 */
import type { App } from 'vue'
import { setupPermissionDirective } from './permission'

export function setupGlobDirectives(app: App) {
  setupPermissionDirective(app)
}
