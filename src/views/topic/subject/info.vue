<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="科目名称：" prop="title">
        <el-input v-model="form.title"></el-input>
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
  created() {
    this.form = JSON.parse(JSON.stringify(this.subData));
  },
  data() {
    //这里存放数据
    return {
      form: {},
      rules: {
        title: [{ required: true, message: "请选择科目名称", trigger: "blur" }],
      },
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
