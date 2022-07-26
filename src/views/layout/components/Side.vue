<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 15:33:57
 * @LastEditors: hy
 * @LastEditTime: 2022-06-08 16:39:13
-->
<template>
  <el-aside :width="isCollapse ? '64px' : '200px'">
    <h2 class="layout-title">
      {{ isCollapse ? 'Admin' : 'Element Admin' }}
    </h2>
    <el-menu
      :router="true"
      :default-active="activeIndex"
      :collapse="isCollapse"
      @select="handleSelect"
      @open="handleOpen"
    >
      <template v-for="menu in menuList">
        <el-sub-menu
          v-if="menu.children"
          :key="'menu_' + menu.name"
          :index="menu.route"
          :route="menu.route"
        >
          <template #title>
            <!-- <el-icon><location /></el-icon> -->
            <i class="menu-icon iconfont" :class="menu.icon"></i>
            <span>{{ $t(menu.name) }}</span>
          </template>
          <el-menu-item
            v-for="child in menu.children"
            :key="'menu_child_' + child.name"
            :index="child.route"
            :route="child.route"
          >
            {{ $t(child.name) }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item
          v-else
          :key="'menu_other_' + menu.name"
          :index="menu.route"
          :route="menu.route"
        >
          <!-- <el-icon><setting /></el-icon> -->
          <i class="menu-icon iconfont" :class="menu.icon"></i>
          <span>{{ $t(menu.name) }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHeaderStore } from '@/store/modules/header'
import { useUserStore } from '@/store/modules/user'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
const route = useRoute()

const activeIndex = ref(route.path)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value = key
}

// 用户
const userStore = useUserStore()
const menuList = userStore.getSideMenus

const i18n = useI18n()
/* 路由 */
watch(
  () => route.path,
  n => {
    activeIndex.value = n
    let title: any = route.meta.title ? route.meta.title : 'project'
    window.document.title = i18n.t(title)
  }
)

// 收起
const headerStore = useHeaderStore()
const { isCollapse } = storeToRefs(headerStore)
</script>

<style lang="scss" scoped>
.el-aside {
  background: var(--color-menu-bg);
  transition: all ease .2s;
  .menu-icon {
    margin-right: 8px;
  }
  .el-menu:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
.layout-title {
  color: var(--color-white);
  margin: 20px auto;
  word-wrap: break-word;
  text-align: center;
}
</style>
