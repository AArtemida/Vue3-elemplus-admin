import $axios from '../utils/request'

export function getChartDataApi() {
  return $axios.get('/mock/getTopChartData')
}

export function getCenterChartDataApi() {
  return $axios.get('mock/getCenterChartData')
}
