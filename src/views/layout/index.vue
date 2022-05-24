<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-19 16:21:52
 * @LastEditors: hy
 * @LastEditTime: 2022-05-20 15:40:05
-->
<template>
  <el-container class="layout">
    <Side />
    <el-container direction="vertical">
      <Header />
      <el-main>
        <router-view :key="$route.fullPath"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Side from './components/Side.vue'
import Header from './components/Header.vue'
</script>

<style lang="scss" scoped>
.el-aside {
  background: $menuBg;
}
.layout {
  height: 100vh;
  background: #f6f6f6;
}
.el-header {
  background: $white;
  border-bottom: 1px solid #e5e7eb;
}
</style>
