<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-23 15:23:50
 * @LastEditors: hy
 * @LastEditTime: 2022-05-24 11:04:51
-->
<template>
  <el-tabs class="center-card" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane
      v-for="(label, tab) in tabs"
      :key="'tab_' + tab"
      :label="label"
      :name="tab"
    >
      <div class="tab-left tab-content">
        <h4 class="tab-content__title">统计图</h4>
        <Chart class="chart-content" :chart-data="saleData" />
      </div>

      <div class="tab-right tab-content">
        <h4 class="tab-content__title">排名</h4>
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
import { ref, reactive } from 'vue'
import { formatNumber } from '@/utils/format'

const activeName = ref('sale')
const tabs = {
  sale: '销售额',
  visit: '访问量',
}

function getRandom() {
  let value: string = Math.random().toString().slice(-4)
  if(value.startsWith('0')) {
    value = 1 + value.substring(1)
  }
  return parseInt(value)
}
const saleData: Array<any> = reactive([]), visitData: Array<any> = reactive([])
for(let i = 0; i < 12; i ++) {
  saleData.push({
    value: getRandom(),
    name: `${i + 1 }月`
  })
  visitData.push({
    value: getRandom(),
    name: `${i + 1 }月`
  })
}

const listLength = 6
const getRankRandom = function(index: number) : string {
  let value: string = Math.random().toString().slice(-5)
  let newVal: string = (listLength - index) + value.substring(1)
  return formatNumber(newVal)
}
</script>

<style lang="scss" scoped>
.center-card {
  height: 320px;
  background: $white;
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
        background: $menuBg;
        color: $white;
      }
    }
  }
}
</style>
