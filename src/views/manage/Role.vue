<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-27 16:14:11
 * @LastEditors: hy
 * @LastEditTime: 2022-06-09 15:02:16
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
      custom-class="edit-dialog"
      v-model="dialogVisible"
      :title="$t('manage.editPermission')"
      width="42%"
      :before-close="handleClose"
    >
      <p class="select-role">
        {{ $t('manage.selectRole') }} : 
        <span  class="select-role__text" v-if="currentSelect.item">{{ currentSelect.item.role }}</span>
      </p>
      <div>
        <p>{{ $t('manage.editMenu') }} : </p>
        <el-tree
          v-if="currentSelect.item"
          :key="'tree_' + currentSelect.item.role"
          :data="treeList"
          node-key="label"
          :default-checked-keys="defaultChecks"
          :props="defaultProps"
          @check-change="changeTreeCheck"
          show-checkbox
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">
            {{ $t('cancel') }}
          </el-button>
          <el-button type="primary" @click="handleClose">
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
import { MenuItem } from '@/model/MenuModel'
import menuList from "@/router/data"

const i18n = useI18n()

//  保持当前选中项
let currentSelect = reactive({
  item: {
    role: null
  }
})

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

// 菜单
const defaultProps = {
  children: 'children',
  label: 'label',
  disabled: 'disabled',
}

// 默认选中
let defaultChecks : any = ref([])
let treeList : any = ref([])
// 转格式
function handleTreeData(menus: Array<MenuItem>, role: string) {
  return menus.map((menu: MenuItem) => {
    let newItem: any = {
      label: i18n.t(menu.meta?.title),
    }
    if (menu.children) newItem.children = handleTreeData(menu.children, role)

    if(menu.meta?.permission && menu.meta.permission.includes(role)) {
      defaultChecks.value.push(newItem.label)
    }
    return newItem
  })
}

// 弹出框
const dialogVisible = ref(false)
const handleEdit = (select: any) => {
  dialogVisible.value = true
  currentSelect.item = select

  defaultChecks.value = []
  treeList.value = handleTreeData(menuList, select?.role)
}
const handleClose = function () {
  dialogVisible.value = false
}
// 修改菜单
function changeTreeCheck() {

}
</script>

<style lang="scss">
.edit-dialog {
  .select-role {
    margin-top: 0;
    &__text {
      color: var(--color-primary);
    }
  }
}
</style>
