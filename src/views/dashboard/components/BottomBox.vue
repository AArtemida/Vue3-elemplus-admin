<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-23 15:23:56
 * @LastEditors: hy
 * @LastEditTime: 2022-06-06 17:03:50
-->
<template>
  <section class="board-bottom">
    <el-card v-for="card in bottomCardList" :key="'bottomCard_' + card.name">
      <template #header>
        <div class="card-header">
          <span>{{ $t(`dashboard.${card.name}`) }}</span>
        </div>
      </template>
      <Chart
        class="chart-content"
        v-loading="loading"
        :chart-data="cardData"
        :chart-type="card.type"
        :custom="card.custom"
      />
    </el-card>
  </section>
</template>

<script lang="ts" setup>
import Chart from '@components/chart/Chart.vue'
import { getChartDataApi } from '@/api/dashboard'
import { ref } from 'vue'

const bottomCardList = [
  {
    name: 'topSearch',
    type: 'line',
    custom: {},
  },
  {
    name: 'categoryProportion',
    type: 'pie',
    custom: {
      showRingPie: true,
    },
  },
]

let cardData: any = ref([])
// 请求数据
let loading = ref(false)
async function getChartData() {
  loading.value = true
  let res = await getChartDataApi('bottom')
  loading.value = false
  if (res && res.data) {
    cardData.value.push(...res.data)
  }
}
getChartData()
</script>

<style lang="scss" scoped>
.board-bottom {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  margin-top: 30px;
  height: 300px;
  .chart-content {
    height: 100%;
    width: 100%;
  }
}
</style>
