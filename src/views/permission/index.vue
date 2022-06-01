<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 14:24:41
 * @LastEditors: hy
 * @LastEditTime: 2022-05-27 16:13:34
-->
<template>
  <h3>权限示例</h3>
  <p>
    当前用户权限：
    <span class="cur-role">{{ currentRole }}</span>
  </p>
  <p>
    切换权限：
    <el-radio-group v-model="currentRole" @change="changeRole">
      <el-radio-button
        v-for="role in roles"
        :key="'role_radio' + role"
        :label="role"
      ></el-radio-button>
    </el-radio-group>
  </p>
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
