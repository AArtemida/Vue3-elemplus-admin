/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-26 15:45:04
 * @LastEditors: hy
 * @LastEditTime: 2022-05-26 15:50:35
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface UserInfo {
  userId: string | number
  username: string
  role: string
}