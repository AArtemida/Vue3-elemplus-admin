<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-27 16:20:18
 * @LastEditors: hy
 * @LastEditTime: 2022-05-27 17:55:40
-->
<template>
  <div class="tab-view-box">
    <span
      v-for="tag in visitedViews"
      ref="tag"
      :key="tag.path"
      :class="isActive(tag) ? 'active' : ''"
      class="tag-view-item"
      @click="!isAffix(tag) ? changeSelectedTag(tag) : ''"
    >
      {{ $t(tag.title) }}
      <i
        class="iconfont icon-cuowu"
        v-if="!isAffix(tag)"
        @click.stop="closeSelectedTag(tag)"
      ></i>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useTabViewStore } from '@/store/modules/tabViews'
import { storeToRefs } from 'pinia'
import { ref, reactive, watch } from 'vue'
import { useRoute, useRouter, RouteRecordRaw } from 'vue-router'
const route = useRoute(),
  router = useRouter()
let selectedTag = reactive(route)

const tabStore = useTabViewStore()
const { visitedViews } = storeToRefs(tabStore)

// 是否固定
function isAffix(tag: RouteRecordRaw) {
  return tag.meta && tag.meta.affix
}

// 是否当前选中
function isActive(tag: RouteRecordRaw) {
  return tag.path === route.path
}

// 右键菜单
function openMenu(tag: any) {
  selectedTag = tag
}

// 改变选中项
function changeSelectedTag(tag: RouteRecordRaw) {
  router.push({ name: tag.name })
}

// 选中最后
function selectLastTab(views: RouteRecordRaw[]) {
  let length = views.length
  const latestView = views[length - 1]
  if (latestView) {
    router.push({ name: latestView.name })
  }
}

// 删除标签
function closeSelectedTag(tag: RouteRecordRaw) {
  tabStore.deleteTabView(tag).then((views: RouteRecordRaw[]) => {
    if (isActive(tag)) {
      selectLastTab(views)
    }
  })
}

// 添加标签
function addTags() {
  const { name } = route
  if (name) {
    tabStore.addTabView(route)
  }
}
addTags()

/* 路由 */
watch(
  () => route.path,
  () => {
    // console.log('路由变化', route)
    addTags()
  }
)
</script>

<style lang="scss" scoped>
.tab-view-box {
  background: var(--color-header-bg);
  border-bottom: 1px solid var(--color-border);
  padding: 5px 10px;
  box-sizing: border-box;
  .tag-view-item {
    border: 1px solid var(--color-border);
    padding: 3px 18px 3px 10px;
    display: inline-block;
    font-size: 12px;
    position: relative;
    margin-right: 10px;
    cursor: pointer;
    .iconfont {
      font-size: 12px;
      color: var(--color-primary);
      display: none;
      position: absolute;
      right: 4px;
      top: 5px;
    }
    &:hover {
      .iconfont {
        display: inline-block;
      }
    }
    &.active {
      background: var(--color-primary);
      color: var(--color-white);
      border-color: var(--color-primary);
      .iconfont {
        color: var(--color-white);
      }
    }
  }
}
</style>
