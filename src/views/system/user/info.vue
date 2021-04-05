<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="nickname">
        <el-input v-model="form.nickname" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="telephone">
        <el-input
          v-model="form.telephone"
          placeholder="请输入与手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="level">
        <el-select v-model="form.level" placeholder="请选择角色">
          <el-option
            value="admin"
            label="管理员"
            v-if="role == 'admin'"
          ></el-option>
          <el-option
            value="teacher"
            label="教师"
            v-if="role == 'admin'"
          ></el-option>
          <el-option
            value="inputPeople"
            label="试题录入员"
            v-if="role == 'admin' || role == 'teacher'"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="btn-area">
      <el-button type="primary" @click="onSubmit('form')" v-if="isAdd"
        >立即创建</el-button
      >
      <el-button type="primary" @click="onEdit('form')" v-else>修改</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    subData: {
      type: Object,
      default: {},
    },
    isAdd: {
      type: Boolean,
      default: "",
    },
  },
  data() {
    //这里存放数据
    return {
      role: "",
      form: {},
      rules: {
        level: [{ required: true, message: "请选择角色", trigger: "blur" }],
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
      },
    };
  },
  created() {
    this.role = sessionStorage.getItem("role");
    this.form = JSON.parse(JSON.stringify(this.subData));
  },
  //方法集合
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("onSubmit", this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("onEdit", this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCancel() {
      this.$emit("hanldeCancel");
    },
  },
};
</script>
<style lang="less" scoped>
.el-select {
  width: 100%;
}
</style>
