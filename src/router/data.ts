/*
 * @Description:
 * @Author: hy
 * @Date: 2022-06-07 11:36:21
 * @LastEditors: hy
 * @LastEditTime: 2022-06-08 17:25:06
 */
const menus: Array<any> = [
  {
    path: '/dashboard',
    name: 'index',
    meta: {
      title: '工作台',
      icon: 'icon-gongzuotai',
      permission: ['admin', 'user']
    },
    componentName: 'dashboard/index',
  },
  {
    path: '/permission',
    name: 'permission',
    meta: {
      title: '权限控制',
      icon: 'icon-quanxian',
      permission: ['admin', 'user']
    },
    componentName: 'permission/index',
    children: [
      {
        path: '/permission/page',
        name: 'pagePermission',
        meta: {
          title: '页面权限',
          permission: ['admin', 'user']
        },
        componentName: 'permission/Page',
      },
      {
        path: '/permission/button',
        name: 'buttonPermission',
        meta: {
          title: '按钮权限',
          permission: ['admin', 'user']
        },
        componentName: 'permission/Button',
      },
    ],
  },
  {
    path: '/list',
    name: 'list',
    meta: {
      title: '列表',
      icon: 'icon-caidan',
      permission: ['admin', 'user']
    },
    componentName: 'list/index',
  },
  {
    path: '/manage',
    name: 'manage',
    meta: {
      title: '用户管理',
      icon: 'icon-jiaosequanxian',
      permission: ['admin']
    },
    componentName: 'manage/index',
    children: [
      {
        path: '/manage/role',
        name: 'roleManage',
        meta: {
          title: '角色管理',
          permission: ['admin']
        },
        componentName: 'manage/Role',
      },
      {
        path: '/manage/user',
        name: 'userManage',
        meta: {
          title: '用户管理',
          permission: ['admin']
        },
        componentName: 'manage/User',
      },
    ],
  },
  {
    path: '/theme',
    name: 'theme',
    meta: {
      title: '主题',
      icon: 'icon-zhuti',
      permission: ['admin', 'user']
    },
    componentName: 'theme/index',
  },
  {
    path: '/errorPage',
    name: 'errorPage',
    meta: {
      title: '错误页',
      icon: 'icon-icon-test',
      permission: ['admin', 'user']
    },
    componentName: 'errorPage/index',
  },
]

export default menus
