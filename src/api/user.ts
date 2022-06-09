/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-19 16:21:52
 * @LastEditors: hy
 * @LastEditTime: 2022-06-08 17:14:28
 */
import $axios from '../utils/request'
import { LoginParams, PermissionParams } from '@/model/userModel'

export function loginApi(param: LoginParams) {
  return $axios.get(
    '/mock/login',{
    params: param,
  })
}

export function logoutApi() {
  return $axios.get(
    '/mock/logout',
  )
}

export function getPermissionMenu(param: PermissionParams) {
  return $axios.get(
    '/mock/getPermissionMenu',{
    params: param,
  })
}