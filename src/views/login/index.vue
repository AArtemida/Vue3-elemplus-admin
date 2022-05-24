<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-19 16:45:43
 * @LastEditors: hy
 * @LastEditTime: 2022-05-20 10:23:32
-->
<template>
  <div class="login-content">
    <div class="login-form">
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
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()

const loading = ref(false)
const loginForm = reactive({
  username: 'admin',
  password: '123456',
})

const loginFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  loading.value = true
  await formEl.validate((valid: boolean, fields: string) => {
    loading.value = false
    if (valid) {
      setTimeout(() => {
        const userInfo = {
          ...loginForm,
        }
        console.log(userInfo)
        router.push({ name: 'index' })
      }, 300)
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="scss" scoped>
.login-content {
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
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
  :deep(.el-input__inner) {
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
  }
  .el-form-item {
    margin-bottom: 40px;
  }
}
</style>
