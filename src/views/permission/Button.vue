<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-24 14:50:26
 * @LastEditors: hy
 * @LastEditTime: 2022-06-09 10:08:03
-->
<template>
  <h4>{{ $t('permission.button') }}</h4>
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
    description="点击切换后请查看按钮变化"
    show-icon
  />

  <div class="btns">
    <el-button type="primary" v-permission="['admin']">仅admin可见的按钮</el-button>
    <el-button >普通按钮</el-button>
    <el-button type="info" v-permission="['user']">仅user可见的按钮</el-button>
  </div>
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
.btns {
  margin-top: 20px;
}
</style>