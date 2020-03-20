<template>
  <div class="app-wrapper">
    <el-container>
      <el-header height="56px">
        <Header :userInfo='userInfo' :activeIndex.sync='activeIndex'></Header>
      </el-header>
      <el-container>
        <el-aside width="280px">
          <Sider :powers='powers' :activeIndex="activeIndex"></Sider>
        </el-aside>
        <el-main>
          <router-view v-if="isRouterAlive"></router-view>
        </el-main>
      </el-container>

      <el-footer height="36px">
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Footer from "./Footer";
import Header from "./Header";
import Sider from "./SiderMenu";
export default {
  components: {
    Footer,
    Header,
    Sider
  },
  provide() {
    return {
      reload: this.reload,
    }
  },
  data() {
    return {
      activeIndex: '2',
      isRouterAlive: true,
    };
  },
  computed: {
    ...mapState(["isLogin", "userInfo", "powers"])
  },
  methods: {
    ...mapMutations(["setUserInfo", "setIsLogin", "setPowers"]),
    async asyncContent() {
      let userInfoLength = Object.keys(this.userInfo).length;
      // console.log(this.isLogin, this.userInfo);
      if (this.isLogin && userInfoLength > 0) return;
      try {
        // 通过获取用户的登s录信息和用户的详细信息
        let [loginRst, powerRst] = await Promise.all([
          this.$http.get("/api/user/login"),
          this.$http.get("/api/user/power")
        ]);
        // console.log(loginRst, powerRst);
        if (parseInt(loginRst.code) !== 0) throw new Error('login');
        if (parseInt(powerRst.code) !== 0) throw new Error('power');
       
        // 获取用户信息
        let userInfo = await this.fetchUserInfo();

         // 已经登录成功，要将保存的 login 信息保存到 vuex 中，方便获取
        let {power} = powerRst;
        this.setPowers({powers: power.split('|')});
        this.setIsLogin({login: true});
        this.setUserInfo({userInfo});
      } catch (e) {
        console.log(e);
        if (e.message === "power") {
          this.$router.replace('/');
          return;
        }
        if (e.message === "login") {
          this.$alert("当前没有用户登录，请返回登录页进行登录！", "没有登录", {
            confirmButtonText: "确定",
            callback: (type, context) => {
              this.$router.replace("/login");
            }
          });
        }
      }
    },
    async fetchUserInfo() {
      try {
        let rst = await this.$http.get('/api/user/info');
        // console.log(rst);
        if (parseInt(rst.code) === 0) {
          return rst.data;
        }
         if (parseInt(rst.code) === 1) {
          return {};
        }
        
        throw new Error();
      } catch (e) {
        this.$alert(
          "获取用户信息失败，请刷新页面重新获取！",
          "获取信息失败",
          {
            confirmButtonText: "确定",
            callback: (type, context) => {
              this.$router.replace('/');
            }
          }
        );
      }
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      })
    }
  },
  async mounted() {
    await this.asyncContent();
  }
};
</script>

<style lang='less' scoped>
.app-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: pink;

  .el-container {
    height: 100%;

    .el-header {
      background-color: #b3c0d1;
      color: #333;
    }
    .el-footer {
      background-color: #b3c0d1;
      color: #333;
      text-align: center;
    }
    .el-aside {
      background-color: #d3dce6;
      color: #333;
      padding: 10px;
    }

    .el-main {
      background-color: #e9eef3;
      color: #333;
    }
  }
}
</style>