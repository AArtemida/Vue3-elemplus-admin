<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-27 16:20:18
 * @LastEditors: hy
 * @LastEditTime: 2022-05-27 17:55:40
-->
<template>
  <div class="tab-view-box">
    <router-link
      v-for="tag in visitedViews"
      ref="tag"
      :key="tag.path"
      :class="isActive(tag) ? 'active' : ''"
      :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
      tag="span"
      class="tag-view-item"
      @click="!isAffix(tag) ? closeSelectedTag(tag) : ''"
    >
      {{ tag.title }}
      <i
        class="iconfont icon-cuowu"
        v-if="!isAffix(tag)"
        @click.stop="closeSelectedTag(tag)"
      ></i>
    </router-link>
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

function isAffix(tag: RouteRecordRaw) {
  return tag.meta && tag.meta.affix
}

function isActive(tag: RouteRecordRaw) {
  return tag.path === route.path
}

// 右键菜单
function openMenu(tag: any) {
  selectedTag = tag
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
  n => {
    console.log('路由变化')
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
