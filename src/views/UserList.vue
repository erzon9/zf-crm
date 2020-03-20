<template>
  <div class="user-list">
    <div class="header">
      <el-button type="primary" @click='handleDeleteMany'>批量删除</el-button>
      <el-select class="search-select" v-model="departmentId" placeholder="请选择">
        <el-option
          v-for="item in departmentList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-input class="search-input" v-model="search" placeholder="请输入内容" @change="renderPage"></el-input>
    </div>
    <div class="main">
      <el-table
        ref="multipleTable"
        :data="userList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="用户名" width="120"></el-table-column>
        <el-table-column prop="sex" label="性别" width="70">
          <template v-slot='scope'>
            {{parseInt(scope.row.sex) === 0 ? '女': '男'}}
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
        <el-table-column prop="phone" label="电话" width="150"></el-table-column>
        <el-table-column prop="department" label="部门" width="150"></el-table-column>
        <el-table-column prop="job" label="职务" width="150"></el-table-column>
        <el-table-column prop="desc" label="描述信息" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="left" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              :disabled="(scope.row.id === 1 || scope.row.id === userInfo.id)"
              @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  async mounted() {
    await this.fetchDepartList();
    await this.fetchUserList();
  },
  data() {
    return {
      departmentList: [],
      userList: [],
      search: "",
      departmentId: 0,
      multipleSelection: []
    };
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async fetchUserList() {
      try {
        let rst = await this.$http.get("/api/user/list", {
          params: {
            departmentId: this.departmentId,
            search: this.search
          }
        });
        console.log(rst);
        if (parseInt(rst.code) !== 0) throw new Error();
        this.userList = rst.data;
      } catch (e) {
        console.log("获取用户信息出错" + e.message);
      }
    },
    async fetchDepartList() {
      try {
        let rst = await this.$http.get("/api/department/list");
        if (parseInt(rst.code) !== 0) throw new Error();
        this.departmentList = [{ id: 0, name: "全部" }, ...rst.data];
      } catch (e) {
        console.log("获取 departlist 出错" + e.message);
      }
    },
    renderPage() {
      console.log(this.input);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleDeleteMany() {
      console.log(this.multipleSelection)
    }
  }
};
</script>

<style lang="less" scoped>
.user-list {
  position: relative;
  .header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 60px;

    .search-select {
      margin-left: 30px;
    }

    .search-input {
      width: 300px;
      margin-left: 30px;
    }
  }
  .main {
    margin-top: 20px;
    width: 100%;
  }
}
</style>