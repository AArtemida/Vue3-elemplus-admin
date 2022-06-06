<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-27 16:14:11
 * @LastEditors: hy
 * @LastEditTime: 2022-06-06 15:27:47
-->
<template>
  <div>
    <!-- 表格 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="role" label="权限" align="center" width="150" />
      <el-table-column prop="desc" label="说明" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleEdit(scope.row)"
          >
            编辑权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑权限框 -->
    <el-dialog
      v-model="dialogVisible"
      title="编辑权限"
      width="42%"
      :before-close="handleClose"
    >
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
const dialogVisible = ref(false)
let selectItem = reactive({})

const tableData = [
  {
    role: 'admin',
    desc: '管理员',
  },
  {
    role: 'user',
    desc: '普通用户',
  },
]
const handleEdit = (select : any) => {
  dialogVisible.value = true
  selectItem = select
}
const handleClose = function () {}
</script>
