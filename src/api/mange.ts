import $axios from '../utils/request'
import { UserListParams } from '@/model/userModel'

export function getUserListApi(param: UserListParams) {
  return $axios.get('/mock/getUserList', {
    params: param,
  })
}
