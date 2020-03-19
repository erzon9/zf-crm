<template>
  <div class="layout-header">
    <h1 class="logo">CRM 客户管理系统</h1>
    <el-menu
      :default-active="activeIndex"
      class="nav-box"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">组织结构</el-menu-item>
      <el-menu-item index="2">客户管理</el-menu-item>
    </el-menu>
    <div class="base-box">
      <span>你好，jjjj</span>
      <el-button type='text'>安全退出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
    }
  },
  methods: {
    handleSelect() {

    }
  }
};
</script>

<style lang="less" scoped>
.layout-header {
  height: 56px;

  .logo {
    float: left;
    height: 100%;
    line-height: 56px;
    width: 240px;
    text-align: center;
    font-size: 20px;
    color: rgb(255, 255, 255);
    letter-spacing: 3px;
  }

  .nav-box {
    height: 100%;
    float: left;
    margin-left: 100px;
    .el-menu-item {
      height: 100%;
      background-color: #b3c0d1;
      color: #ffffff;

      &:hover {
        background-color: #d3dce6;
      }
    }
  }

  .base-box {
    float: right;
    height: 100%;
    line-height: 56px;

    span {
      margin-right: 15px;
    }
  }
}
</style>