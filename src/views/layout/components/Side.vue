<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-20 15:33:57
 * @LastEditors: hy
 * @LastEditTime: 2022-05-25 10:27:53
-->
<template>
  <el-aside width="200px">
    <h2 class="layout-title">
      ElementAdmin
    </h2>
    <el-menu
      :router="true"
      :default-active="activeIndex"
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
            <span>{{ menu.name }}</span>
          </template>
          <el-menu-item
            v-for="child in menu.children"
            :key="'menu_child_' + child.name"
            :index="child.route"
            :route="child.route"
          >
            {{ child.name }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item
          v-else
          :key="'menu_' + menu.name"
          :index="menu.route"
          :route="menu.route"
        >
          <!-- <el-icon><setting /></el-icon> -->
          <i class="menu-icon iconfont" :class="menu.icon"></i>
          <span>{{ menu.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import menus from '../constant/menus.ts'
const route = useRoute()

const activeIndex = ref(route.path)
const menuList = reactive(menus)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value = key
}

/* 路由 */
watch(
  () => route,
  n => {
    activeIndex.value = n.path
  }
)
</script>

<style lang="scss" scoped>
.el-aside {
  background: $menuBg;
  .menu-icon {
    margin-right: 8px;
  }
}
.layout-title {
  color: $white;
  margin: 20px auto;
}
</style>
