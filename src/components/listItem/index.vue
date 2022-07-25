<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-24 16:05:21
 * @LastEditors: hy
 * @LastEditTime: 2022-06-09 10:37:36
-->
<template>
  <el-card class="list-item">
    <el-image class="list-item__img" :src="item?.img" fit="fill">
      <template #error>
        <div class="image-slot">
          <i class="iconfont icon-ku"></i>
        </div>
      </template>
    </el-image>
    <div class="list-item__content">
      <h4>{{ item?.title }}</h4>
      <p v-if="item?.content">{{ item.content }}</p>
      <p class="list-item__time" v-if="item?.time">{{ $t('time') }} : {{ item.time }}</p>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
  item: Object,
})
</script>

<style lang="scss" scoped>
.list-item {
  margin-bottom: 12px;
  :deep(.el-card__body) {
    display: flex;
    padding: 15px 20px;
    box-sizing: border-box;
  }
  &__img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
    flex: none;
    background-color: var(--color-content-bg);
    .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    .iconfont {
      color: var(--el-text-color-secondary);
      font-size: 30px;
    }
  }
  &__time {
    font-size: 12px;
    color: var(--color-font-subtitle);
  }
  &__content {
    padding: 5px 0;
    word-break: break-word;
  }
}
</style>
