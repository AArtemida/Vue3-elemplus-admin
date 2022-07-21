<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-23 15:23:50
 * @LastEditors: hy
 * @LastEditTime: 2022-06-06 17:11:20
-->
<template>
  <el-tabs class="center-card" v-model="activeName" @tab-change="handleClick">
    <el-tab-pane
      v-for="(label, tab) in tabs"
      :key="'tab_' + tab"
      :label="$t(`dashboard.${label}`)"
      :name="tab"
    >
      <div class="tab-left tab-content">
        <h4 class="tab-content__title">
          <span>{{ $t(`dashboard.${label}`) }}</span>
          {{ $t('dashboard.annualStatistics') }}
        </h4>
        <Chart class="chart-content" :chart-data="datas[tab]" v-loading="loading"/>
      </div>

      <div class="tab-right tab-content">
        <h4 class="tab-content__title">{{ $t('dashboard.ranking') }}</h4>
        <ul class="tab-right__ul">
          <li v-for="index in listLength" :key="'tab-right' + index">
            <div class="li-title">
              <span class="li-number">{{ index }}</span>
              <span>雪花路 {{ index }} 号店</span>
            </div>
            <div class="li-value" v-text="getRankRandom(index - 1)"></div>
          </li>
        </ul>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import Chart from '@components/chart/Chart.vue'
import { ref, reactive, toRefs } from 'vue'
import { formatNumber } from '@/utils/format'
import { getCenterChartDataApi } from '@/api/dashboard'
import { ChartListItem } from '@/model/ListModel'

let activeName = ref('sale')
const tabs = {
  sale: 'saleVolume',
  visit: 'visits',
}
let clicked : Array<string> = ['sale']

interface CenterData {
  sale: Array<ChartListItem>,
  visit: Array<ChartListItem>
}
// 定义初始数据
let datas = reactive({
  'sale': [] as ChartListItem[],
  'visit': [] as ChartListItem[],
})

const listLength = 6
const getRankRandom = function (index: number): string {
  let value: string = Math.random().toString().slice(-5)
  let newVal: string = listLength - index + value.substring(1)
  return formatNumber(newVal)
}

// 请求数据
let loading = ref(false)
async function getChartData() {
  loading.value = true
  let res = await getCenterChartDataApi()
  loading.value = false
  if (res && res.data) {
    let active : string = activeName.value
    console.log(active)
    let arr = datas[active as keyof CenterData]
    arr.push(...res.data)
  }
}
getChartData()

// 点击tab
function handleClick() {
  let active : string = activeName.value
  if(!clicked.includes(active)) {
    getChartData()
    clicked.push(active)
  }
}
</script>

<style lang="scss" scoped>
.center-card {
  height: 320px;
  background: var(--color-card-bg);
  padding: 10px 20px;
  :deep(.el-tabs__content) {
    height: calc(100% - 50px);
  }
  :deep(.el-tab-pane) {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }
  .tab-content {
    height: 100%;
    text-align: left;
    &__title {
      margin: 2px 0 14px 0;
      font-size: 15px;
    }
  }
  .chart-content {
    height: calc(100% - 30px);
    width: 100%;
  }
  .tab-left {
    flex: 1 auto;
  }
  .tab-right {
    width: 30%;
    margin-left: 30px;
  }
}
/* 排名列表 */
.tab-right__ul {
  .li-number {
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    border-radius: 50%;
    line-height: 20px;
    margin-right: 8px;
  }
  > li {
    line-height: 22px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    &:nth-child(-n + 3) {
      .li-number {
        background: var(--color-black);
        color: var(--color-white);
      }
    }
  }
}
</style>
