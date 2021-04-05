<template>
  <div class="wrapper">
    <div class="search-form">
      <el-form
        ref="form"
        :model="searchForm"
        :inline="true"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="试卷标题">
          <el-input v-model="searchForm.title"></el-input>
        </el-form-item>
        <el-button type="primary" class="search" @click="handleSearch"
          >查询</el-button
        >
        <el-button class="reset" @click="reset">重置</el-button>
        <el-button class="reset" type="primary" plain @click="auto"
          >自动生成试卷</el-button
        >
        <el-button class="reset" type="primary" plain @click="manual"
          >手动生成试卷</el-button
        >
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="title" label="试卷标题" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="试卷标题" align="center">
          <template slot-scope="scope">
            {{ scope.row.createTime | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="handleDetail(scope.row)"
              >查看</el-button
            >
            <el-button type="danger" plain @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :total="total"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="defaultParams.limit"
          :current-page="defaultParams.page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="title"
      :show-close="false"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      width="50%"
      top="50px"
    >
      <components
        :is="componentName"
        :subject-list="subjectList"
        :paper="paper"
        @onSubmit="onSubmit"
        @generate="generate"
        @handleCancel="closeDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
import tableMixin from "@/mixins/tableMixin";
import dialogMixin from "@/mixins/dialogMixin";
import Auto from "./auto";
import Manual from "./manual";
import Detail from "./detail";
export default {
  mixins: [tableMixin, dialogMixin],
  components: { Auto, Manual, Detail },
  data() {
    return {
      isAdd: "",
      searchForm: {},
      subData: {},
      tableData: [],
      componentName: "Auto",
      subjectList: [],
      paper: [],
    };
  },
  filters: {
    timeFormat: function(value) {
      if (!value) return "";
      return value.split("T")[0];
    },
  },
  created() {
    this.loadData();
    this.loadtype();
  },
  methods: {
    async loadData(isSearch) {
      isSearch && (this.defaultParams.page = 1);
      const res = await this.$api.paper.list(
        Object.assign({}, this.searchForm, this.defaultParams)
      );
      if (res.code == 0) {
        this.total = res.data.total;
        this.tableData = res.data.records;
      }
    },
    async loadtype() {
      const res = await this.$api.subject.all();
      this.subjectList = res.data || [];
    },
    handleSearch() {
      this.loadData(true);
    },
    auto() {
      this.componentName = "Auto";
      this.openDialog({ title: "自动生成试卷" });
    },
    manual() {
      this.componentName = "Manual";
      this.openDialog({ title: "手动生成试卷" });
    },
    async handleDetail(row) {
      const res = await this.$api.paper.detail({
        paperId: row.id,
      });

      this.paper = this.format(res.data.data.papermxList);
      this.componentName = "Detail";
      this.openDialog({ title: row.title });
    },
    async handleDelete(row) {
      this.$confirm("确认删除该试卷吗", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
      })
        .then(async () => {
          const res = await this.$api.paper.delete({ paperId: row.id });
          if (res.code == 0) {
            this.$message.success(res.message);
            this.loadData();
            this.closeDialog();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((action) => {
          // 取消确认回调
        });
    },
    async onSubmit(params) {
      const res = await this.$api.paper.auto(params);
      if (res.code === 0) {
        this.$message.success("生成试卷成功");
      } else {
        this.$message.warning(res.message || "生成试卷失败");
      }
      this.loadData();
      this.closeDialog();
    },
    generate() {
      this.loadData();
      this.closeDialog();
    },
    format(list) {
      let i = 0;
      let result = [];
      for (; i < list.length; i++) {
        result.push({
          type: list[i].question.questionEngine.typeName,
          content: list[i].question.content,
        });
      }
      return result;
    },
  },
};
</script>

<style lang="less" scoped>
.search-form {
  text-align: left;
}
</style>
