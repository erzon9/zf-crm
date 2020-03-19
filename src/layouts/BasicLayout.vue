<template>
  <div class="app-wrapper">
    <el-container>
      <el-header height="56px">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="280px">
          <Sider></Sider>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>

      <el-footer height="36px">
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Footer from "./Footer";
import Header from "./Header";
import Sider from "./SiderMenu";
export default {
  components: {
    Footer,
    Header,
    Sider
  },
  async mounted() {
    try {
        let rst = await this.$http.get('/api/user/login');
        if (parseInt(rst.code) !== 0) {
          this.$destroy();
          this.$alert('这是一段内容', '标题名称', {
            confirmButtonText: '确定',
            callback: (...args) => {
              console.log(args);
            }
          });
        }
        
    } catch(e) {

    }
  
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