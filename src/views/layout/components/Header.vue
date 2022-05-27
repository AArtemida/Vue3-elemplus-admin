<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 15:38:30
 * @LastEditors: hy
 * @LastEditTime: 2022-05-27 14:51:48
-->
<template>
  <el-header class="header">
    <span class="header-left iconfont icon-shouqi" @click="changeCollapse"></span>
    <!-- 右侧 -->
    <div class="header-right">
      <!-- 搜索框 -->
      <div class="header-search">
        <i
          class="iconfont icon-sousuo"
          @click="changeInputStatus"
          v-show="!showInput"
        ></i>
        <el-input v-model="searchWord" :class="{ 'show-input': showInput }">
          <template #prefix>
            <i
              class="el-input__icon iconfont icon-sousuo"
              @click="changeInputStatus"
            ></i>
          </template>
        </el-input>
      </div>

      <!-- 语言切换 -->
      <el-popover :width="80" trigger="hover" popper-class="user-popover">
        <template #reference>
          <span
            class="header-language iconfont icon-zhongyingwenyingwen"
          ></span>
        </template>
        <ul class="header-options">
          <li
            v-for="(label, lang) in languages"
            :key="'langauge_' + lang"
            :class="{select: locale.value === lang}"
            @click="changeSelectLocale(lang)"
          >
            {{ label }}
          </li>
        </ul>
      </el-popover>

      <!-- 用户 -->
      <el-popover :width="100" trigger="hover" popper-class="user-popover">
        <template #reference>
          <div class="header-user">
            <div class="user-portrait">
              <i class="iconfont icon-yonghu"></i>
            </div>
            <span v-if="userInfo">{{ userInfo.username }}</span>
          </div>
        </template>
        <ul class="header-options">
          <li>用户中心</li>
          <li @click="logout">退出登录</li>
        </ul>
      </el-popover>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import { useUserStore } from '@/store/modules/user'
import { useLocaleStore } from '@/store/modules/locale'
import { useHeaderStore } from '@/store/modules/header'
import { storeToRefs } from 'pinia'

// 搜索词
const searchWord = ref('')
const showInput = ref(false)

function changeInputStatus() {
  showInput.value = !showInput.value
}

// 语言
const localeStore = useLocaleStore()
const { locale } = storeToRefs(localeStore)
const languages = localeStore.getLanguages
// 切换语言
function changeSelectLocale(lang: string) {
  localeStore.setLocale(lang)
}

// 用户
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

// 退出登录
const router = useRouter()
async function logout() {
  try {
    const status = await userStore.logout()
    if (status) {
      ElMessage.success('退出成功！')
      router.push({ name: 'login' })
    }
  } catch (error) {
    ElMessage.error('退出失败，请重新尝试')
  }
}

// 收起
const headerStore = useHeaderStore()
const { isCollapse } = storeToRefs(headerStore)
function changeCollapse() {
  let status: boolean = !isCollapse.value
  headerStore.setCollapse(status)
}

</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-left {
  cursor: pointer;
  &:hover {
    color: var(--color-primary);
  }
}
.header-right {
  display: flex;
  align-items: center;
}
.user-portrait {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background: var(--color-primary);
  margin-right: 10px;
  text-align: center;
  color: var(--color-white);
  .iconfont {
    font-size: 18px;
    line-height: 28px;
  }
}
.header-user {
  display: inline-flex;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
}
.header-language {
  font-size: 20px;
}
.header-search {
  margin-right: 20px;
  .icon-sousuo {
    cursor: pointer;
    transition: display 0.3s ease 0.3s;
    &:hover {
      color: var(--color-primary);
    }
  }
  .el-input {
    width: 0;
    overflow: hidden;
    transition: width 0.3s ease;
    &.show-input {
      width: 200px;
    }
  }
}
</style>

<style lang="scss">
$primary: var(--color-primary);
.el-popover.user-popover {
  min-width: 50px;
  text-align: center;
  .header-options {
    text-align: center;
    margin: 0;
    li {
      line-height: 30px;
      cursor: pointer;
      border-radius: 5px;
      &:hover, &.select {
        color: var(--color-primary);
        background: rgba($primary, 0.5);
      }
    }
  }
}
</style>
