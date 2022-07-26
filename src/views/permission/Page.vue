<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-24 14:47:49
 * @LastEditors: hy
 * @LastEditTime: 2022-06-09 10:06:56
-->
<template>
  <h4>{{ $t('permission.page') }}</h4>
  <p class="switch-box">
    {{ $t('permission.switch') }} :
    <el-radio-group v-model="currentRole" @change="changeRole">
      <el-radio-button
        v-for="role in roles"
        :key="'role_radio' + role"
        :label="role"
      ></el-radio-button>
    </el-radio-group>
  </p>
  <el-alert
    title=""
    type="warning"
    :description="$t('permission.menuTip')"
    show-icon
  />
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'
import { storeToRefs } from 'pinia'
// 用户
const userStore = useUserStore()
const { currentRole, roles } = storeToRefs(userStore)

async function changeRole(role: string | null) {
  await userStore.setCurrentRole(role)
  location.reload()
}
</script>

<style lang="scss" scoped>
.switch-box {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>
