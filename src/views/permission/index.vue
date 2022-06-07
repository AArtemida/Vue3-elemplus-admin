<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 14:24:41
 * @LastEditors: hy
 * @LastEditTime: 2022-06-06 17:13:23
-->
<template>
  <h3>{{ $t('permission.example') }}</h3>
  <p>
    {{ $t('permission.currentRole') }} :
    <span class="cur-role">{{ currentRole }}</span>
  </p>
  <p>
    {{ $t('permission.switch') }} :
    <el-radio-group v-model="currentRole" @change="changeRole">
      <el-radio-button
        v-for="role in roles"
        :key="'role_radio' + role"
        :label="role"
      ></el-radio-button>
    </el-radio-group>
  </p>
  <router-view />
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'
import { storeToRefs } from 'pinia'
// 用户
const userStore = useUserStore()
const { currentRole, roles } = storeToRefs(userStore)

function changeRole(role: string | null) {
  userStore.setCurrentRole(role)
}
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
