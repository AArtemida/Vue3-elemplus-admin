/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 17:31:16
 * @LastEditors: hy
 * @LastEditTime: 2022-05-20 17:33:06
 */
const login = {
  url: "/users/login", // 模拟登录的链接
  method: "post", // 请求方式
  timeout: 500, // 超时时间
  statusCode: 200, // 返回的http状态码
  response: { // 返回的结果集
    code: 200,
    message: "登录成功",
    data: {
      code: 0,
      message: "用户登录成功",
      result: {
        token: "123456789"
      }
    },
  },
}

export default [
  login
]