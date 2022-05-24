<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 14:47:25
 * @LastEditors: hy
 * @LastEditTime: 2022-05-24 11:47:57
-->
<template>
  <el-radio-group v-model="selectTheme">
    <div
      class="theme-radio"
      v-for="(theme, index) in themeList"
      :key="'theme_' + index"
    >
      <el-radio :label="theme.type" size="large">
        {{ theme.name }}
      </el-radio>
      <div class="theme-color" :class="`theme-color-${theme.type}`"></div>
    </div>
  </el-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const selectTheme = ref('default')
const themeList = [
  {
    name: '默认',
    type: 'default',
  },
  {
    name: '蓝色',
    type: 'blue',
  },
  {
    name: '深夜',
    type: 'dark',
  },
]
</script>

<style lang="scss" scoped>
.theme-radio {
  background: $white;
  margin: 10px 20px;
  border-radius: 5px;
  .theme-color {
    width: 100px;
    height: 60px;
    border-radius: 5px;
    margin: 5px 20px 20px 20px;
    background: $primary;
    &.theme-color-blue {
      background: $blue;
    }
    &.theme-color-dark {
      background: $menuBg;
    }
  }
}
</style>
