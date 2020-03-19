<template>
  <div class="login">
    <div class="main">
      <h1>CRM客户管理系统</h1>
      <p>为保护企业的数据安全，请妥善保管密码</p>
      <div class="form-area">
        <el-form ref='loginForm' label-width="60px" :rules="rules" :model="loginData">
          <el-form-item label="名称" prop="name"> 
            <el-input v-model="loginData.name" ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginData.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin">登录</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'blueimp-md5';
export default {
  data() {
    return {
      loginData: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleLogin() {
      const h = this.$createElement;

      this.$refs['loginForm'].validate(async valid => {
        if (!valid) return;
        // 发送请求
        try {
          let data = { account: this.loginData.name,
            password: this.loginData.password,}
            console.log(data);

          let rst = await this.$http.post('/api/user/login', {
            account: this.loginData.name,
            password: md5(this.loginData.password),
          });

          if (parseInt(rst.code) === 0) {
            // 跳转到内容页
            this.$router.push('/');
            return;
          }
          if (parseInt(rst.code) === 1) {
            this.$notify({
              title: '登录失败',
              message: h('span', { style: 'color: red'}, '用户名或密码错误，请重新登录！')
            });
            return;
          }
          throw new Error();
        } catch (error) {

           this.$notify({
              title: '登录失败',
              message: h('span', { style: 'color: red'}, '登录过程出错，请稍后重试')
            });
        }
      });
      
    },
    handleReset() {
      this.$refs['loginForm'].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #b3c0d1;

  .main {
    height: 400px;
    width: 400px;

    h1 {
      height: 50px;
      font-size: 30px;
      text-align: center;
      line-height: 50px;
    }
    p {
      height: 50px;
      font-size: 18px;
      text-align: center;
      line-height: 50px;
    }
    .form-area {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 400px;
      height: 300px;

      .el-form {
        width: 80%;
      }
    }
  }
}
</style>