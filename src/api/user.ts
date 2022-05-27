/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-19 16:21:52
 * @LastEditors: hy
 * @LastEditTime: 2022-05-26 17:33:34
 */
import $axios from '../utils/request'
import { LoginParams } from '@/model/userModel'

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