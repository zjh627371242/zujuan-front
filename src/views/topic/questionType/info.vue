<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="题型名称">
        <el-input v-model="form.typeName"></el-input>
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
  created(){
    this.form = JSON.parse(JSON.stringify(this.subData)) 
  },
  data() {
    //这里存放数据
    return {
      form: {},
    };
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
