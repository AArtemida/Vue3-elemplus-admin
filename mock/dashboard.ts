import { MockMethod } from 'vite-plugin-mock'

/* 顶部数据 */
const getTopChartData = {
  url: '/mock/getTopChartData',
  method: 'get',
  statusCode: 200,
  response: () => {
    // 返回的结果集
    return {
      code: 1,
      data: [
        { value: 335, name: 'Commodity 1' },
        { value: 310, name: 'Commodity 2' },
        { value: 234, name: 'Commodity 3' },
        { value: 135, name: 'Commodity 4' },
        { value: 1548, name: 'Commodity 5' },
      ],
    }
  },
}

/* 中间的数据 */
function getRandom() {
  let value: string = Math.random().toString().slice(-4)
  if (value.startsWith('0')) {
    value = 1 + value.substring(1)
  }
  return parseInt(value)
}

const getCenterChartData = {
  url: '/mock/getCenterChartData',
  method: 'get',
  statusCode: 200,
  response: () => {
    // 返回的结果集
    let list = []
    for (let i = 0; i < 12; i++) {
      list.push({
        value: getRandom(),
        name: `${i + 1}月`,
      })
    }
    return {
      code: 1,
      data: list
    }
  },
}

export default [getTopChartData, getCenterChartData] as MockMethod[]
