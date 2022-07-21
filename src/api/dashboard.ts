import $axios from '../utils/request'

export function getChartDataApi(type: string) {
  return $axios.get('/mock/getTopChartData', {
    params: {
      type,
    },
  })
}

export function getCenterChartDataApi() {
  return $axios.get('mock/getCenterChartData')
}
