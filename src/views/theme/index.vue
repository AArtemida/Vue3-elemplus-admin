<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 14:47:25
 * @LastEditors: hy
 * @LastEditTime: 2022-06-06 17:11:52
-->
<template>
  <el-radio-group v-model="selectTheme" @change="changeTheme">
    <div
      class="theme-radio"
      v-for="(theme, index) in themeList"
      :key="'theme_' + index"
    >
      <el-radio :label="theme.type" size="large">
        {{ $t(`theme.${theme.type}`) }}
      </el-radio>
      <div class="theme-color" :class="`theme-color-${theme.type}`"></div>
    </div>
  </el-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useHeaderStore } from '@/store/modules/header'
import { storeToRefs } from 'pinia'
const headerStore = useHeaderStore()
const { selectTheme } = storeToRefs(headerStore)

// const selectTheme = ref<string>('default')
const themeList = [
  {
    type: 'default',
  },
  {
    type: 'blue',
  },
  {
    type: 'dark',
  },
]

const changeTheme = (type: string): void => {
  headerStore.changeTheme(type)
}
</script>

<style lang="scss" scoped>
.theme-radio {
  background: var(--color-card-bg);
  margin: 10px 20px;
  border-radius: 5px;
  .theme-color {
    width: 100px;
    height: 60px;
    border-radius: 5px;
    margin: 5px 20px 20px 20px;
    background: var(--color-purple);
    &.theme-color-blue {
      background: var(--color-blue);
    }
    &.theme-color-dark {
      background: var(--color-black);
    }
  }
}
.el-radio-group {
  text-align: center;
  margin: 20px auto;
}
</style>
