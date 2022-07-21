<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-23 15:23:45
 * @LastEditors: hy
 * @LastEditTime: 2022-06-06 17:11:17
-->
<template>
  <section class="board-top">
    <el-card
      v-for="card in topCardList"
      :key="'dashTopCard_' + card.name"
    >
      <template #header>
        <div class="card-header">
          <span>
            <i class="iconfont" :class="card.icon"></i>
            {{ $t(`dashboard.${card.name}`) }}
          </span>
          <b>{{ formatNumber(card.value) }}</b>
        </div>
      </template>
      <div class="chart-content" v-if="card.name === 'visits'">
        <p>周同比 12%</p>
        <p>日同比 11%</p>
      </div>
      <Chart
        v-else
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
import { formatNumber } from '@/utils/format'
import { getChartDataApi } from '@/api/dashboard'
import { ref } from 'vue'

const topCardList = [
  {
    name: 'visits',
    icon: 'icon-zhuye',
    value: 126560,
    type: 'line',
    custom: {
      showAxisLine: false,
    },
  },
  {
    name: 'messageNumber',
    icon: 'icon-xiaoxi-xiaoxi',
    value: 8846,
    type: 'line',
    custom: {
      showAxisLine: false,
      showCategoryAxisLabel: false,
      showValueAxisLabel: false,
    },
  },
  {
    name: 'saleVolume',
    icon: 'icon-jiage',
    value: 6560,
    custom: {
      showAxisLine: false,
      showCategoryAxisLabel: false,
      showValueAxisLabel: false,
    },
  },
  {
    name: 'purchasesNumber',
    icon: 'icon-gouwuchefill',
    value: '78%',
    custom: {
      showAxisLine: false,
      showCategoryAxisLabel: false,
      showValueAxisLabel: false,
    },
  },
]
let cardData: any = ref([])
// 请求数据
let loading = ref(false)
async function getChartData() {
  loading.value = true
  let res = await getChartDataApi()
  loading.value = false
  if (res && res.data) {
    cardData.value.push(...res.data)
  }
}

getChartData()
</script>

<style lang="scss" scoped>
.board-top {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  height: 160px;
  margin-bottom: 30px;
  .chart-content {
    height: 100%;
    width: 100%;
  }
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > b {
      color: var(--color-font-regular);
      font-size: 20px;
    }
  }
}
</style>
