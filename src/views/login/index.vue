<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-19 16:45:43
 * @LastEditors: hy
 * @LastEditTime: 2022-06-07 16:43:01
-->
<template>
  <div class="login-content">
    <div class="login-form">
      <h2 class="login-form__title">后台管理系统</h2>
      <el-form
        ref="loginFormRef"
        label-width="0"
        :model="loginForm"
        :rules="rules"
        @keypress.enter="submitForm(loginFormRef)"
      >
        <el-form-item label="" prop="username">
          <el-input size="large" v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            size="large"
            type="password"
            v-model="loginForm.password"
            show-password
          />
        </el-form-item>
        <el-form-item label="">
          <el-button
            type="primary"
            class="login-btn"
            :loading="loading"
            @click="submitForm(loginFormRef)"
          >
            {{ $t('login.login') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'

import { useI18n } from 'vue-i18n'

const i18n = useI18n()

const loading = ref(false)
const loginForm = reactive({
  username: 'admin',
  password: '123456',
})

const loginFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: i18n.t('login.pleaseInputName'),
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: i18n.t('login.pleaseInputPsd'),
      trigger: 'blur',
    },
  ],
})
// 提交登录
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  loading.value = true
  await formEl.validate((valid: boolean, fields) => {
    loading.value = false
    if (valid) {
      // setTimeout(() => {
      const userInfo = {
        ...loginForm,
      }
      //   console.log(userInfo)
      //   router.push({ name: 'index' })
      // }, 300)
      handleLogin(userInfo)
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 调用登录
let timeout: any = null
const router = useRouter()
const userStore = useUserStore()
async function handleLogin(form: any) {
  try {
    const userInfo = await userStore.login({
      password: form.password,
      username: form.username,
    })
    if (userInfo) {
      ElMessage.success(i18n.t('login.loginSuccess'))
      // clearTimeout(timeout)
      // timeout = setTimeout(() => {
      //   router.replace({ name: 'index' })
      // }, 300)
    }
  } catch (error) {
    ElMessage.error(i18n.t('login.loginFailed'))
  }
}

// 清空
function clear() {
  localStorage.clear()
  sessionStorage.clear()
}
clear()
</script>

<style lang="scss" scoped>
.login-content {
  background-image: linear-gradient(180deg, #eebed5 0%, #7154bc 100%);
  height: 100vh;
  width: 100vw;
}
.login-form {
  min-width: 400px;
  width: 28vw;
  max-width: 480px;
  text-align: center;
  padding: 50px 45px 0 45px;
  box-sizing: border-box;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  :deep(.el-input__wrapper) {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
    border-radius: 30px;
  }
  :deep(.el-input__inner),
  :deep(.login-btn) {
    width: 100%;
    border-radius: 30px;
    height: 46px;
  }
  :deep(.login-btn) {
    margin-top: 20px;
    font-size: 15px;
    background: var(--color-white);
    color: var(--color-primary)
  }
  .el-form-item {
    margin-bottom: 40px;
  }
  &__title {
    margin-bottom: 30px;
    color: var(--color-white)
  }
}
</style>
