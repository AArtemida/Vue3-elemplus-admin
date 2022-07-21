/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-26 15:45:04
 * @LastEditors: hy
 * @LastEditTime: 2022-06-08 17:14:18
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

export interface PermissionParams {
  role: string
}

export interface UserListParams {
  start: number
  rows: number
  role?: string
  search?: string
}
