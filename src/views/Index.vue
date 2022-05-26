<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-19 16:21:52
 * @LastEditors: hy
 * @LastEditTime: 2022-05-20 10:30:41
-->
<template>
  <div class="index"></div>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import HelloWorld from '@/components/HelloWorld.vue'
export default defineComponent({
  components: {
    // HelloWorld
  },
})
</script>

<style lang="scss" scoped>
.index {
  color: var(--color-primary);
}
</style>
