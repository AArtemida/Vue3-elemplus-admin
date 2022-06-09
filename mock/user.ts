/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 17:31:16
 * @LastEditors: hy
 * @LastEditTime: 2022-06-08 17:12:19
 */
import { MockMethod } from 'vite-plugin-mock'
import menus from "../src/router/data"

const login = {
  url: '/mock/login', // 模拟登录的链接
  method: 'get', // 请求方式
  // timeout: 5000, // 超时时间
  statusCode: 200, // 返回的http状态码
  response: ({ query }) => {
    // 返回的结果集
    const n = query.username
    const role = n.startsWith('admin') ? 'admin' : 'user'
    return {
      code: 1,
      data: {
        username: n,
        token: Math.random().toString(36).substring(2),
        role,
      },
    }
  },
}

const logout = {
  url: '/mock/logout',
  method: 'get',
  statusCode: 200,
  response: () => {
    return {
      code: 1,
      data: true,
    }
  },
}

/* 过滤菜单 */
function filterMenu(menus, role) {
  let newMenus = []
  menus.forEach(menu => {
    if(menu.meta?.permission && menu.meta.permission.includes(role)) {
      let newItem = {
        ...menu
      }
      if(menu.children) newItem.children = filterMenu(menu.children, role)

      newMenus.push(newItem)
    }
  })
  return newMenus
}

const getPermissionMenu = {
  url: '/mock/getPermissionMenu',
  method: 'get',
  statusCode: 200,
  response: ({ query }) => {
    const role = query.role
    let newMenus = filterMenu(menus, role)
    return {
      code: 1,
      data: newMenus,
    }
  },
}

export default [login, logout, getPermissionMenu] as MockMethod[]
