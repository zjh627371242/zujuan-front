<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="试卷科目：" prop="subjectId">
        <el-select v-model="form.subjectId" placeholder="请选择试卷科目">
          <el-option
            v-for="item in subjectList"
            :value="item.id"
            :key="item.id"
            :label="item.title"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="试卷题目：" prop="title">
        <el-input v-model="form.title" placeholder="请输入试卷题目"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-area">
      <el-button type="primary" @click="onSubmit('form')">生成试卷</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>

<script>

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},

  props: {
    subjectList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    //这里存放数据
    return {
      form: {},
      rules: {
        subjectId: [
          { required: true, message: "请选择试卷科目", trigger: "blur" },
        ],
        title: [{ required: true, message: "请输入试卷题目", trigger: "blur" }],
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
    handleCancel() {
      this.$emit("handleCancel");
    },
  },
};
</script>
<style lang="less" scoped>
.el-select {
  width: 100%;
}
</style>
