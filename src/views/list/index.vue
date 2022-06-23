<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-24 11:36:40
 * @LastEditors: hy
 * @LastEditTime: 2022-06-09 10:35:54
-->
<template>
  <section class="list-form"></section>
  <section class="list-content">
    <ListItem
      v-for="(item, index) in list"
      :item="item"
      :key="'list_item' + index"
    ></ListItem>
  </section>
</template>

<script lang="ts" setup>
import ListItem from '@components/listItem/index.vue'
import { reactive } from 'vue'

const img =
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
interface ListItemModel {
  id: string | number
  title: string
  img?: string
  content?: String
  time?: string | number
}
const list: ListItemModel[] = reactive([])
for (let i = 0; i < 10; i++) {
  let item : ListItemModel = {
    id: i,
    img: i % 2 ? img : '',
    title: `列表项${i + 1}`,
    time: '2022-06-06',
    content: '列表内容'
  }
  list.push(item)
}
</script>
