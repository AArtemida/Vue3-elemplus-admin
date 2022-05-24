import axios from 'axios'

const service = axios.create({
    baseURL: '/',
    timeout: 1000000, // 请求超时时间
})

service.interceptors.request.use(config => {
    return config
  }, error => {
    return Promise.reject(error)
  })

  service.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    return Promise.reject(error)
  })

export default service