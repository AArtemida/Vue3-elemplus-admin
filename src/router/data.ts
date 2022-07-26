/*
 * @Description:
 * @Author: hy
 * @Date: 2022-06-07 11:36:21
 * @LastEditors: hy
 * @LastEditTime: 2022-06-09 14:18:10
 */
import { MenuItem } from '@/model/MenuModel'
const menus: Array<MenuItem> = [
  {
    path: '/dashboard',
    name: 'index',
    meta: {
      title: 'menu.dashboard',
      icon: 'icon-gongzuotai',
      permission: ['admin', 'user'],
    },
    componentName: 'dashboard/index',
  },
  {
    path: '/permission',
    name: 'permission',
    meta: {
      title: 'menu.permission',
      icon: 'icon-quanxian',
      permission: ['admin', 'user'],
    },
    componentName: 'permission/index',
    children: [
      {
        path: '/permission/page',
        name: 'pagePermission',
        meta: {
          title: 'permission.page',
          permission: ['admin', 'user'],
        },
        componentName: 'permission/Page',
      },
      {
        path: '/permission/button',
        name: 'buttonPermission',
        meta: {
          title: 'permission.button',
          permission: ['admin', 'user'],
        },
        componentName: 'permission/Button',
      },
    ],
  },
  {
    path: '/list',
    name: 'list',
    meta: {
      title: 'menu.list',
      icon: 'icon-caidan',
      permission: ['admin', 'user'],
    },
    componentName: 'list/index',
  },
  {
    path: '/manage',
    name: 'manage',
    meta: {
      title: 'menu.manage',
      icon: 'icon-jiaosequanxian',
      permission: ['admin'],
    },
    componentName: 'manage/index',
    children: [
      {
        path: '/manage/role',
        name: 'roleManage',
        meta: {
          title: 'manage.roleManage',
          permission: ['admin'],
        },
        componentName: 'manage/Role',
      },
      {
        path: '/manage/user',
        name: 'userManage',
        meta: {
          title: 'manage.userManage',
          permission: ['admin'],
        },
        componentName: 'manage/User',
      },
    ],
  },
  {
    path: '/theme',
    name: 'theme',
    meta: {
      title: 'menu.theme',
      icon: 'icon-zhuti',
      permission: ['admin', 'user'],
    },
    componentName: 'theme/index',
  },
  {
    path: '/errorPage',
    name: 'errorPage',
    meta: {
      title: 'menu.errorPage',
      icon: 'icon-icon-test',
      permission: ['admin', 'user'],
    },
    componentName: 'errorPage/index',
  },
]

export default menus
