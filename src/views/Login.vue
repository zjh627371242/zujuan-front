<template>
  <div class="container">
    <div class="login-form">
      <div class="title">组卷管理系统</div>
      <el-form ref="form" :model="form" label-position="left">
        <el-form-item label="账号：">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码：">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="login-btn" @click="onSubmit"
        >登录</el-button
      >
    </div>
    <img src="../assets/logo_school.png" alt="" class="logo" />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      const res = await this.$api.login.login(this.form);
      if (res.code === 0) {
        this.$message.success(res.message);
        sessionStorage.setItem("isLogin", true);
        sessionStorage.setItem("userId", res.data.id);
        sessionStorage.setItem("role", res.data.level);
        this.$router.push("/home");
      } else this.$message.error(res.message);
    },
    toRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  color: #1a334e;
  background-image: url("../assets/login.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  .logo {
    position: absolute;
    left: 10px;
    top: 10px;
  }

  .login-form {
    /deep/.el-form-item__label {
      color: #1a334e;
    }
    position: absolute;
    left: 50%;
    top: 50%;
    height: 350px;
    width: 300px;
    padding: 20px;
    transform: translate(-50%, -50%);
    background-color: #8c8b8b;
    border-radius: 8px;

    .title {
      padding: 10px;
      font-size: 30px;
      border-bottom: 1px solid #18314a;
      margin-bottom: 10px;
    }

    .login-btn {
      width: 100%;
      background-color: #18314a;
      border-color: #18314a;
      &:hover {
        background-color: #1d4871;
        border-color: #1d4871;
      }
    }

    .tip {
      float: right;
      margin-top: 10px;
      font-size: 12px;
      .to-register {
        display: inline-block;
        margin-left: 5px;
        text-decoration: underline;
        color: #132f38;
        cursor: pointer;
        transition: 0.5 ease all;
        &:hover {
          color: white;
        }
      }
    }
  }
}
</style>
