<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-23 09:47:47
 * @LastEditors: hy
 * @LastEditTime: 2022-05-25 14:21:34
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
  AxisPointerComponent
} from 'echarts/components'

import ChartDrawer from './js/ChartDrawer'
import VChart from 'vue-echarts'
import { reactive, defineProps } from 'vue'

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
  AxisPointerComponent
])

const props = defineProps({
	// dom: String,
  chartType: String,
  chartData: Array,
  custom: Object
})

const chart = new ChartDrawer({
  // dom: props.dom || 'chart_dom',
  chartType: props.chartType || 'bar',
  chartData: props.chartData || [],
  custom: props.custom
})
chart.initChart()
let option: object = reactive(chart.chartOptions)
</script>
