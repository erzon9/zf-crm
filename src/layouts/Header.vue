<template>
  <div class="layout-header">
    <h1 class="logo">CRM 客户管理系统</h1>
    <el-menu :default-active="activeIndex" class="nav-box" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">组织结构</el-menu-item>
      <el-menu-item index="2">客户管理</el-menu-item>
    </el-menu>
    <div class="base-box">
      <span>你好，{{username}}</span>
      <el-button type="text" @click="signout">安全退出</el-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    userInfo: {
      type: Object,
      required: true,
      default: {
        name: "匿名"
      }
    },
    activeIndex: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    username() {
      return this.userInfo.name;
    }
  },
  methods: {
    ...mapMutations(["setIsLogin", "setUserInfo", "setPowers"]),
    handleSelect(key, keyPath) {
      this.$emit('update:activeIndex', key + '');
    },
    async signout() {
      console.log(123);
      try {
        let rst = await this.$http.get("/api/user/signout");
        if (parseInt(rst.code) !== 0) throw new Error();
        // 推出成功，将 isLogin 职位 false 将 userinfo 置为 {}
        this.setIsLogin({ login: false });
        this.setUserInfo({ userInfo: {} });
        this.setPowers({ powers: [] });
        // 路由跳转到 login
        this.$router.push("/login");
      } catch (error) {
        this.$alert("推出失败，请稍后重试", "操作失败", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
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