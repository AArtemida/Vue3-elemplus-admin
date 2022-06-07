<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-27 16:14:11
 * @LastEditors: hy
 * @LastEditTime: 2022-06-06 17:49:32
-->
<template>
  <div>
    <!-- 表格 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        prop="role"
        :label="$t('manage.permission')"
        align="center"
        width="150"
      />
      <el-table-column
        prop="desc"
        :label="$t('manage.description')"
        align="center"
      />
      <el-table-column :label="$t('manage.operation')" align="center">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)">
            {{ $t('manage.editPermission') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑权限框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="$t('manage.editPermission')"
      width="42%"
      :before-close="handleClose"
    >
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">
            {{ $t('cancel') }}
          </el-button>
          <el-button type="primary" @click="dialogVisible = false">
            {{ $t('confirm') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()

const dialogVisible = ref(false)
let selectItem = reactive({})

const tableData = [
  {
    role: 'admin',
    desc: i18n.t('manage.admin'),
  },
  {
    role: 'user',
    desc: i18n.t('manage.user'),
  },
]
const handleEdit = (select: any) => {
  dialogVisible.value = true
  selectItem = select
}
const handleClose = function () {}
</script>
