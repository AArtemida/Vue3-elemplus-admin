import $axios from '../utils/request'

export function login(username: string, password: string) {
  return $axios.post(
    `/api/login?username=${username}&password=${password}`,
  )
}