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
        :chart-data="card.data"
        :chart-type="card.type"
        :custom="card.custom"
      />
    </el-card>
  </section>
</template>

<script lang="ts" setup>
import Chart from '@components/chart/Chart.vue'
const bottomCardList = [
  {
    name: 'topSearch',
    type: 'line',
    data: [
      { value: 335, name: 'Direct' },
      { value: 310, name: 'Email' },
      { value: 234, name: 'Ad Networks' },
      { value: 135, name: 'Video Ads' },
      { value: 1548, name: 'Search Engines' },
    ],
    custom: {},
  },
  {
    name: 'categoryProportion',
    type: 'pie',
    data: [
      { value: 335, name: 'Direct' },
      { value: 310, name: 'Email' },
      { value: 234, name: 'Ad Networks' },
      { value: 135, name: 'Video Ads' },
      { value: 1548, name: 'Search Engines' },
    ],
    custom: {
      showRingPie: true,
    },
  },
]
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
