/*
 * @Description:
 * @Author: hy
 * @Date: 2022-06-07 16:39:04
 * @LastEditors: hy
 * @LastEditTime: 2022-06-08 16:28:06
 */
export interface MenuItem {
  path: string
  name: string
  meta: Object
  componentName?: string,
  component?: any,
  children?: Array<MenuItem>
}

export interface ElMenuItem {
  name: string
  route: string
  icon?: string
  children?: Array<ElMenuItem>
}