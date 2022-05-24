/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 14:22:50
 * @LastEditors: hy
 * @LastEditTime: 2022-05-24 11:36:26
 */
export default [
  {
    name: '工作台',
    route: '/dashboard',
    icon: 'icon-gongzuotai'
  },
  {
    name: '权限管理',
    route: '/permission',
    icon: 'icon-quanxian',
    children: [
      {name: '页面权限', route: '/permission/page'},
      {name: '按钮权限', route: '/permission/button'}
    ]
  },
  {
    name: '列表',
    route: '/list',
    icon: 'icon-gongzuotai'
  },
  {
    name: '主题色',
    route: '/theme',
    icon: 'icon-zhuti',
  },
  {
    name: '错误页',
    route: '/errorPage',
    icon: 'icon-icon-test'
  }
]