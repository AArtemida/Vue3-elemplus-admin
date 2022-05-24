<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 14:50:36
 * @LastEditors: hy
 * @LastEditTime: 2022-05-23 17:21:40
-->
<template>
  <div class="error-page">
    <img class="error-img" src="../../assets/img/404.png" />
    <div>
      <el-button type="primary" @click="back">返回首页</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function back() {
  router.push({ name: 'index' })
}
</script>

<style lang="scss" scoped>
.error-page {
  height: calc(100vh - 60px);
  text-align: center;
  .error-img {
    height: 70%;
  }
}
</style>