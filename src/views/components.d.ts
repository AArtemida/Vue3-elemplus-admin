/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 15:07:02
 * @LastEditors: hy
 * @LastEditTime: 2022-05-20 15:07:54
 */
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BaseHeader: typeof import('./components/layouts/BaseHeader.vue')['default']
    BaseSide: typeof import('./components/layouts/BaseSide.vue')['default']
    ElButton: typeof import('element-plus/es')['ElButton']
    ElConfigProvider: typeof import('element-plus/es')['ElConfigProvider']
    ElDatePicker: typeof import('element-plus/es')['ElDatePicker']
    ElIcon: typeof import('element-plus/es')['ElIcon']
    ElInput: typeof import('element-plus/es')['ElInput']
    ElMenu: typeof import('element-plus/es')['ElMenu']
    ElMenuItem: typeof import('element-plus/es')['ElMenuItem']
    ElMenuItemGroup: typeof import('element-plus/es')['ElMenuItemGroup']
    ElSubMenu: typeof import('element-plus/es')['ElSubMenu']
    ElTag: typeof import('element-plus/es')['ElTag']
    HelloWorld: typeof import('./components/HelloWorld.vue')['default']
  }
}

export {}