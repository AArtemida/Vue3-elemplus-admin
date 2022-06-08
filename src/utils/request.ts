/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-19 16:21:52
 * @LastEditors: hy
 * @LastEditTime: 2022-06-07 11:34:24
 */
import axios from 'axios'
let pending : any = {}
const CancelToken = axios.CancelToken
const removePending = (key: string, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]('取消重复请求')
  }
  delete pending[key]
}
const getRequestIdentify = (config: any, isRequest = false) => {
  let url = config.url
  if (isRequest) {
    url = config.baseURL + config.url.substring(1, config.url.length)
  }
  const arr = ['put', 'post']
  return arr.includes(config.method)
    ? encodeURIComponent(url + JSON.stringify(config.params))
    : encodeURIComponent(config.url + JSON.stringify(config.data))
}

// 创建axios
const service = axios.create({
  baseURL: '/',
  timeout: 1000000, // 请求超时时间
})

service.interceptors.request.use(
  config => {
    let requestData = getRequestIdentify(config, true)
    removePending(requestData, true)
    config.cancelToken = new CancelToken(c => {
      pending[requestData] = c
    })

    // token
    const userSession = sessionStorage.getItem('storeUser')
    let token = null
    if(userSession && userSession !== 'null') {
      const storeUser = JSON.parse(userSession)
      token = storeUser.token || ''
    }
    if (token && token != 'null') {
      config.headers.Authorization = `${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  function (response) {
    // 把已经完成的请求从 pending 中移除
    let requestData = getRequestIdentify(response.config)
    removePending(requestData)
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default service
