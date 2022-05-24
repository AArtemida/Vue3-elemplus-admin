<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-23 15:23:45
 * @LastEditors: hy
 * @LastEditTime: 2022-05-24 11:06:07
-->
<template>
  <section class="board-top">
      <el-card v-for="card in topCardList" :key="'dashTopCard_' + card.name">
        <template #header>
          <div class="card-header">
            <span>{{ card.name }}</span>
            <b>{{ formatNumber(card.value) }}</b>
          </div>
        </template>
        <div class="chart-content" v-if="card.name === '访问量'">
          <p>周同比 12%</p>
          <p>日同比 11%</p>
        </div>
        <Chart
          v-else
          class="chart-content"
          :chart-data="card.data"
          :chart-type="card.type"
          :custom="card.custom"
        />
      </el-card>
    </section>
</template>

<script lang="ts" setup>
import Chart from '@components/chart/Chart.vue'
import { formatNumber } from '@/utils/format'
const topCardList = [
  {
    name: '访问量',
    value: 126560,
    type: 'line',
    data: [
      { value: 335, name: 'Direct' },
      { value: 310, name: 'Email' },
      { value: 234, name: 'Ad Networks' },
      { value: 135, name: 'Video Ads' },
      { value: 1548, name: 'Search Engines' },
    ],
    custom: {
      showAxisLine: false,
    },
  },
  {
    name: '消息数',
    value: 8846,
    type: 'line',
    data: [
      { value: 335, name: 'Direct' },
      { value: 310, name: 'Email' },
      { value: 234, name: 'Ad Networks' },
      { value: 135, name: 'Video Ads' },
      { value: 1548, name: 'Search Engines' },
    ],
    custom: {
      showAxisLine: false,
      showCategoryAxisLabel: false,
      showValueAxisLabel: false,
      color: ['#e0c3fc']
    },
  },
  {
    name: '销售额',
    value: 6560,
    data: [
      { value: 335, name: 'Direct' },
      { value: 310, name: 'Email' },
      { value: 234, name: 'Ad Networks' },
      { value: 135, name: 'Video Ads' },
      { value: 1548, name: 'Search Engines' },
    ],
    custom: {
      showAxisLine: false,
      showCategoryAxisLabel: false,
      showValueAxisLabel: false,
    },
  },
  {
    name: '购物数',
    value: '78%',
    data: [
      { value: 335, name: 'Direct' },
      { value: 310, name: 'Email' },
      { value: 234, name: 'Ad Networks' },
      { value: 135, name: 'Video Ads' },
      { value: 1548, name: 'Search Engines' },
    ],
    custom: {
      showAxisLine: false,
      showCategoryAxisLabel: false,
      showValueAxisLabel: false,
      color: ['#e0c3fc']
    },
  },
]
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
      color: $fontColor3;
      font-size: 20px;
    }
  }
}
</style>