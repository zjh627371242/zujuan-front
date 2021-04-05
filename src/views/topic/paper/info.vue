<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="题目类型：" prop="questionEngineId">
        <el-select v-model="form.questionEngineId" placeholder="请选择试卷科目">
          <el-option
            v-for="item in typeList"
            :value="item.id"
            :key="item.id"
            :label="item.typeName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题数：" prop="count">
        <el-input v-model.number="form.count" type="number"></el-input>
      </el-form-item>
      <el-form-item label="每题分数：" prop="score">
        <el-input v-model.number="form.score" type="number"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-area">
      <el-button type="primary" @click="onSubmit('form')">添加</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    var scoreValidate = (rule, value, callback) => {
      console.log(value);
      if (value > 100 || value <= 0) {
        callback(new Error("分数需要大于0且不大于100"));
      } else {
        callback();
      }
    };

    return {
      form: {},
      typeList: [],
      rules: {
        count: [
          { required: true, message: "请输入题型", trigger: "blur" },
          { type: "number", message: "必须为数字值", trigger: "blur" },
        ],
        score: [
          { required: true, message: "请输入分数", trigger: "blur" },
          { type: "number", message: "必须为数字值", trigger: "blur" },
          { validator: scoreValidate, trigger: "blur" },
        ],
        questionEngineId: [
          { required: true, message: "请选择试卷科目", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.loadType();
  },
  //方法集合
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("addItem", this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async loadType() {
      const res = await this.$api.questionType.all();
      this.typeList = res.data || [];
    },
    handleCancel() {
      this.$emit("handleCancel", this.form);
    },
  },
  computed: {},
  watch: {
    "form.questionEngineId": {
      handler(val) {
        let i = 0;
        console.log(val);
        for (; i < this.typeList.length; ++i) {
          console.log(this.typeList[i].id);
          if (this.typeList[i].id === val) {
            this.form.questionEngineName = this.typeList[i].typeName;
            break;
          }
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped></style>
