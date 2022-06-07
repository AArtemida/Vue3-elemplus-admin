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
      <el-input v-model="searchName">
        <template #prefix>
          <i class="el-input__icon iconfont icon-sousuo"></i>
        </template>
      </el-input>
    </div>

    <div class="user-search__input">
      {{ $t('manage.searchPermission') }} :
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
      <h4>{{ $t('manage.userManage') }}</h4>
      <el-button type="primary">{{ $t('manage.addUser') }}</el-button>
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
          <span class="name-txt">{{ row.name }}</span>
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
        :total="userParams.total"
      />
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
  total: 100,
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
