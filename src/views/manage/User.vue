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
      <el-button type="primary">{{ $t('manage.addUser') }}</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData.list"
      stripe
      style="width: 100%"
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
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { getUserListApi } from '@/api/mange'
import { UserInfo } from '../src/model/userModel'

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
const handleDelete = function () {}
const handleEdit = function () {}
const handleSelectionChange = function () {}
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
