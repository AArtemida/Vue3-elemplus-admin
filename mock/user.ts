/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 17:31:16
 * @LastEditors: hy
 * @LastEditTime: 2022-05-26 17:39:38
 */
import { MockMethod } from 'vite-plugin-mock'

const login = {
  url: '/mock/login', // 模拟登录的链接
  method: 'get', // 请求方式
  // timeout: 5000, // 超时时间
  statusCode: 200, // 返回的http状态码
  response: ({ query }) => {
    // 返回的结果集
    let n = query.username
    return {
      code: 1,
      data: {
        username: n,
        token: Math.random().toString(36).substring(2),
        role: n === 'admin' ? 'admin' : 'user',
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

export default [login, logout] as MockMethod[]
