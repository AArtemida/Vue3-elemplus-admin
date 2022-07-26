<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-24 14:47:53
 * @LastEditors: hy
 * @LastEditTime: 2022-06-06 17:10:05
-->
<template>
  <!-- 顶部搜索 -->
  <section class="user-search">
    <div class="user-search__input">
      {{ $t('manage.searchAccount') }} :
      <el-input v-model="searchName" clearable @change="changeSearch">
        <template #prefix>
          <i class="el-input__icon iconfont icon-sousuo"></i>
        </template>
      </el-input>
    </div>

    <div class="user-search__input">
      {{ $t('manage.searchPermission') }} :
      <el-select
        v-model="selectRole"
        clearable
        placeholder="Select"
        @change="changeRole"
      >
        <el-option
          v-for="item in roleOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
  </section>

  <section class="user-content">
    <div class="user-content__title">
      <h4>{{ $t('manage.userManage') }}</h4>
      <el-button type="primary" @click="openAddUser">
        {{ $t('manage.addUser') }}
      </el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData.list"
      stripe
      style="width: 100%"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="userId" label="ID" align="center" width="100" />
      <el-table-column
        prop="name"
        :label="$t('manage.userName')"
        align="center"
      >
        <template #default="{ row }">
          <i
            class="iconfont icon-renzhengyonghu"
            v-if="row.role === 'admin'"
          ></i>
          <span class="name-txt">{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="role"
        :label="$t('manage.permission')"
        align="center"
      >
        <template #default="{ row }">
          <el-tag class="role-txt">{{ row.role }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('manage.operation')" align="center">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            {{ $t('manage.edit') }}
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            {{ $t('manage.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :total="userTotal"
        :current-page="userParams.page"
        @current-change="changePage"
      />
    </div>
  </section>

  <!-- 添加用户 -->
  <el-dialog
    v-model="dialogVisible"
    :title="$t('manage.addUser')"
    width="42%"
    :before-close="handleDialogClose"
  >
    <el-form
      ref="addUserFormRef"
      label-width="120"
      :model="addUserForm"
      :rules="rules"
      label-position="right"
    >
      <el-form-item :label="$t('manage.userName')" prop="username">
        <el-input v-model="addUserForm.username" />
      </el-form-item>
      <el-form-item :label="$t('manage.permission')" prop="role">
        <el-radio-group v-model="addUserForm.role">
          <el-radio
            v-for="r in roleOptions"
            :key="'raido_' + r"
            :label="r"
          ></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleDialogClose">
          {{ $t('cancel') }}
        </el-button>
        <el-button type="primary" @click="handleDialogClose">
          {{ $t('confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { getUserListApi } from '@/api/mange'
import { UserInfo } from '.@/model/userModel'

let searchName = ref(''),
  selectRole = ref('')

const roleOptions = ['user', 'admin']

let tableData = reactive({
  list: [],
})
let userParams = {
  page: 1,
  rows: 10,
}
let userTotal = ref(0)
// 请求数据
let loading = ref(false)
async function getUserList({ page, rows }: { page: number; rows: number }) {
  let start = (page - 1) * rows
  loading.value = true
  let res = await getUserListApi({
    role: selectRole.value,
    search: searchName.value,
    start,
    rows,
  })
  loading.value = false
  if (res && res.data) {
    tableData.list = res.data
  }
  userTotal.value = res && res.total ? res.total : 0
}

getUserList(userParams)

// 选择角色
const changeRole = () => {
  userParams.page = 1
  getUserList(userParams)
}
// 搜索
const changeSearch = () => {
  userParams.page = 1
  getUserList(userParams)
}
// 翻页
const changePage = function (page: number) {
  userParams.page = page
  getUserList(userParams)
}
// 操作按钮
const handleDelete = function () {}
const handleEdit = function () {}
const handleSelectionChange = function () {}

// 添加用户弹出框
const addUserFormRef = ref<FormInstance>()
const dialogVisible = ref(false)
const addUserForm = reactive({
  username: '',
  role: '',
})

const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
  ],
  role: [
    {
      required: true,
      message: '权限不能为空',
      trigger: 'change',
    },
  ],
})
const openAddUser = (select: any) => {
  dialogVisible.value = true
  addUserForm.username = ''
  addUserForm.role = ''
}
const handleDialogClose = function () {
  dialogVisible.value = false
}
</script>

<style lang="scss" scoped>
.user-content {
  background: var(--color-card-bg);
  padding: 20px;
  .pagination {
    margin: 12px auto 0 auto;
    text-align: center;
    display: flex;
    justify-content: center;
  }
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
}
.el-table {
  .icon-renzhengyonghu {
    margin-right: 10px;
    color: var(--color-blue);
  }
  .name-txt {
    font-weight: 700;
  }
}

.user-search {
  display: flex;
  margin-bottom: 20px;
  &__input {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    & + .user-search__input {
      margin-left: 30px;
    }
  }
}
</style>
