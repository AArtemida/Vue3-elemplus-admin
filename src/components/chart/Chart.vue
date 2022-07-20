<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-23 09:47:47
 * @LastEditors: hy
 * @LastEditTime: 2022-05-25 18:27:42
-->
<template>
  <div>
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script lang="ts" setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
/* 引入图表 */
import { PieChart, BarChart, LineChart, TreemapChart } from 'echarts/charts'
/* 引入图表组件 */
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  AxisPointerComponent,
} from 'echarts/components'

import ChartDrawer from './js/ChartDrawer'
import VChart from 'vue-echarts'
import { ref, defineProps, watch } from 'vue'

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  TreemapChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  AxisPointerComponent,
])

const props = defineProps({
  // dom: String,
  chartType: String,
  chartData: Array,
  custom: Object,
})
let data = props.chartData || []
const chart = new ChartDrawer({
  // dom: props.dom || 'chart_dom',
  chartType: props.chartType || 'bar',
  chartData: data,
  custom: props.custom,
})
chart.initChart()

let option: any = ref(chart.chartOptions)

// 监听数据变化
watch(
  () => props.chartData,
  () => {
    chart.initChart()
    option.value = chart.chartOptions
  },
  { deep: true }
)
</script>
