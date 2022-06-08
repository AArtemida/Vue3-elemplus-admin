<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 14:24:41
 * @LastEditors: hy
 * @LastEditTime: 2022-06-07 10:35:42
-->
<template>
  <h3>{{ $t('permission.example') }}</h3>
  <p>
    {{ $t('permission.currentRole') }} :
    <span class="cur-role">{{ currentRole }}</span>
  </p>
  <router-view />
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'
import { storeToRefs } from 'pinia'
// 用户
const userStore = useUserStore()
const { currentRole, roles } = storeToRefs(userStore)
</script>

<style lang="scss" scoped>
.cur-role {
  background: var(--color-primary);
  padding: 4px 10px;
  border-radius: 2px;
  display: inline-block;
  color: var(--color-white);
}
</style>
