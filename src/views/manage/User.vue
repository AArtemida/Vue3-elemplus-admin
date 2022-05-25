<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-05-24 14:47:53
 * @LastEditors: hy
 * @LastEditTime: 2022-05-25 14:25:14
-->
<template>
  <!-- 顶部搜索 -->
  <section class="user-search">
    <div class="user-search__input">
      账号查询：
      <el-input v-model="searchName">
        <template #prefix>
          <i
            class="el-input__icon iconfont icon-sousuo"
          ></i>
        </template>
      </el-input>
    </div>

    <div class="user-search__input">
      权限查询：
      <el-select v-model="selectRole" placeholder="Select">
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
      <h4>用户管理</h4>
      <el-button type="primary">添加用户</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" align="center" width="100" />
      <el-table-column prop="name" label="用户名" align="center">
        <template #default="{ row }">
          <i
            class="iconfont icon-renzhengyonghu"
            v-if="row.role === 'admin'"
          ></i>
          <span class="name-txt">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="权限" align="center">
        <template #default="{ row }">
          <el-tag class="role-txt">{{ row.role }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination background layout="prev, pager, next, jumper" :total="userParams.total" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
const searchName = ref(''),
  selectRole = ref('')

const roleOptions = ['user', 'admin']

interface User {
  id: string | number
  name: string
  role: string
}
const tableData: User[] = []
const userParams = {
  page: 1,
  rows: 10,
  total: 100
}
function getUserList(params: any) {
  let start = (params.page - 1) * params.rows + 1
  for (let i = 0; i < params.rows; i++) {
    let index = start + i
    let item: User = {
      id: index,
      name: 'User' + index,
      role: index < 4 ? 'admin' : 'user',
    }

    tableData.push(item)
  }
}

getUserList(userParams)

const handleDelete = function () {}
const handleEdit = function () {}
const handleSelectionChange = function () {}
</script>

<style lang="scss" scoped>
.user-content {
  background: $white;
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
    color: $blue;
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
