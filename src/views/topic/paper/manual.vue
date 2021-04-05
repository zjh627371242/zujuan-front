<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="试卷题目：" prop="subjectId">
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
    <el-button type="primary" class="add-type" @click="add"
      >添加题目类型</el-button
    >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="questionEngineName"
        label="题目类型"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="count" label="题数" width="180" align="center">
      </el-table-column>
      <el-table-column prop="score" label="分数" align="center">
      </el-table-column>
      <el-table-column prop="score" label="分数总和" align="center">
        <template slot-scope="scope">
          {{ scope.row.count * scope.row.score }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" plain @click="handleDelete(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="btn-area">
      <el-button type="primary" @click="generate('form')">生成试卷</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
    <el-dialog
      :title="title"
      :show-close="false"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      width="50%"
      top="50px"
      append-to-body
    >
      <Info
        :subject-list="subjectList"
        @addItem="addItem"
        @handleCancel="closeDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
import dialogMixin from "@/mixins/dialogMixin";
import Info from "./info";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { Info },
  mixins: [dialogMixin],
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
      tableData: [],
      rules: {
        subjectId: [
          { required: true, message: "请选择试卷科目", trigger: "blur" },
        ],
        title: [{ required: true, message: "请输入试卷题目", trigger: "blur" }],
      },
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    add() {
      this.openDialog({ title: "添加题目类型" });
    },
    addItem(params) {
      this.tableData.push(params);
      this.closeDialog();
    },
    handleDelete(i) {
      this.tableData.splice(i, 1);
    },
    generate(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (!this.validateScore()) {
            this.$message.warning("题目分数总和不为100");
          } else {
            const res = await this.$api.paper.manual({
              paperParamItems: this.tableData,
              title: this.form.title,
              subjectId: this.form.subjectId,
            });
            if (res.code === 0) {
              this.$message.success(res.message || "生成试卷成功");
            } else {
              this.$message.error(res.message || "生成试卷失败");
            }
            this.$emit("generate");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log(formName);
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    validateScore() {
      let i = 0;
      let score = 0;
      for (; i < this.tableData.length; i++) {
        score += this.tableData[i].count * this.tableData[i].score;
        if (score > 100) {
          return false;
        }
      }
      return score === 100;
    },
  },
};
</script>
<style lang="less" scoped>
.el-select {
  width: 100%;
}
.add-type {
  float: left;
}
</style>
