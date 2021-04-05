<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" label-width="140px" :rules="rules">
      <el-form-item label="知识点名称：" prop="point">
        <el-input v-model="form.point" placeholder="请输入知识点名称"></el-input>
      </el-form-item>
      <el-form-item label="所属科目名称：" prop="subjectId">
        <el-select v-model="form.subjectId" placeholder="请选择所属科目名称">
          <el-option
            v-for="item in subjectList"
            :value="item.id"
            :key="item.id"
            :label="item.title"
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
  created() {
    this.loadSubjectList();
    this.form = JSON.parse(JSON.stringify(this.subData));
  },
  data() {
    //这里存放数据
    return {
      form: {},
      subjectList: [],
      rules: {
        subjectId: [
          { required: true, message: "请输入知识点名称", trigger: "blur" },
        ],
        point: [
          { required: true, message: "请选择所属科目名称", trigger: "blur" },
        ],
      },
    };
  },
  //方法集合
  methods: {
    loadSubjectList() {
      this.$api.subject.all().then((res) => {
        if (res.code == 0) {
          this.subjectList = res.data;
        }
      });
    },
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
