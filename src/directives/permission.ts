/*
 * @Description:
 * @Author: hy
 * @Date: 2022-06-09 09:52:40
 * @LastEditors: hy
 * @LastEditTime: 2022-06-09 10:06:14
 */
import type { App, Directive, DirectiveBinding } from 'vue'
import { useUserStore } from '@/store/modules/user'

function checkPermission(el: Element, binding: any) {
  const { value } = binding

  const userStore = useUserStore()

  const role: string = userStore.getCurrentRole || ''
  if (value && value instanceof Array) {
    const hasPermission = value.includes(role)

    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  checkPermission(el, binding)
}

const permissionDirective: Directive = {
  mounted,
}

export function setupPermissionDirective(app: App) {
  app.directive('permission', permissionDirective)
}

export default permissionDirective
