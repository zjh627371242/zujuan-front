<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-input v-bind:value="levelMap[form.level]" disabled>
        </el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      levelMap: {
        admin: "管理员",
        teacher: "教师"
      },
      form: {},
    };
  },
  created(){
    this.loadData();
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    loadData(){
      this.$api.user.detail({id:sessionStorage.getItem("userId")}).then(res=>{
        if(res.code == 0){
          this.form = res.data;
        }else{
          this.$message.error(res.message);
        }
      })
    },
    onSubmit() {
      this.$api.user.edit(this.form).then(res=>{
        if(res.code == 0){
          this.$message.success(res.message);
        }else{
          this.$message.error(res.message);
        }
      })
    },
  },
};
</script>
<style lang="scss" scoped></style>
