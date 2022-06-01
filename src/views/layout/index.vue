<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-19 16:21:52
 * @LastEditors: hy
 * @LastEditTime: 2022-05-27 16:56:44
-->
<template>
  <el-container class="layout">
    <Side />
    <el-container direction="vertical">
      <Header />
      <TabViews v-if="needTagsView" />
      <el-main>
        <router-view :key="$route.fullPath"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Side from './components/Side.vue'
import Header from './components/Header.vue'
import TabViews from './components/TabViews.vue'

const needTagsView = true
</script>

<style lang="scss" scoped>
.el-aside {
  background: var(--color-menu-bg);
}
.layout {
  height: 100vh;
  background: var(--color-content-bg);
  text-align: left;
}
.el-header {
  background: var(--color-header-bg);
  border-bottom: 1px solid var(--color-border);
}
</style>
