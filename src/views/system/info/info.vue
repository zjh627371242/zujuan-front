<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="编码：" prop="dicCode">
        <el-input v-model="form.dicCode" placeholder="请输入编码"></el-input>
      </el-form-item>
      <el-form-item label="key：" prop="dicKey">
        <el-input v-model="form.dicKey" placeholder="请输入key"></el-input>
      </el-form-item>
      <el-form-item label="value：" prop="dicName">
        <el-input v-model="form.dicName" placeholder="请输入value"></el-input>
      </el-form-item>
      <el-form-item label="描述：" prop="remark">
        <el-input v-model="form.remark" placeholder="请输入描述"></el-input>
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
        dicCode: [{ required: true, message: "请输入编码", trigger: "blur" }],
        dicKey: [{ required: true, message: "请输入key", trigger: "blur" }],
        dicName: [{ required: true, message: "请输入value", trigger: "blur" }],
        remark: [{ required: true, message: "请输入描述", trigger: "blur" }],
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
