<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="form.level">
          <el-option value="admin" label="管理员"></el-option>
          <el-option value="teacher" label="教师"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')" v-if="isAdd">立即创建</el-button>
        <el-button type="primary" @click="onEdit('form')" v-else>修改</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props:{
    subData:{
      type:Object,
      default:{}
    },
    isAdd:{
      type:Boolean,
      default:''
    }
  },
  data() {
    //这里存放数据
    return {
      form: {},
    };
  },
  created(){
    this.form =  JSON.parse(JSON.stringify(this.subData)) 
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
<style lang="scss" scoped></style>
