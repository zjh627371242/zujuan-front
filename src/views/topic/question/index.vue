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
        <el-form-item label="知识点：">
          <el-input v-model="searchForm.point"></el-input>
        </el-form-item>
        <el-button type="primary" class="search" @click="handleSearch"
          >查询</el-button
        >
        <el-button class="reset" @click="reset">重置</el-button>
        <el-button
          type="primary"
          class="add"
          plain
          @click="openDialog({ title: '新增试题' });isAdd = true;
            subData = {};"
          >新增试题</el-button
        >
        <el-button
          type="primary"
          class="add"
          plain
          @click="download()"
          >打印试题</el-button
        >
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="knowledge.subject.title" label="科目名称" align="center">
        </el-table-column>
        <el-table-column prop="knowledge.point" label="知识点" align="center">
        </el-table-column>
        <el-table-column prop="questionEngine.typeName" label="题目类型" align="center">
        </el-table-column>
        <el-table-column prop="levelName" label="难度" align="center">
        </el-table-column>
        <el-table-column prop="content" label="试题内容" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="warning" plain @click="toEdit(scope.row)"
              >编辑</el-button
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
      <Info
        @onSubmit="handleSubmit"
        @hanldeCancel="hanldeCancel"
        @onEdit="handleEdit"
        :subData="subData"
        :isAdd="isAdd"
      />
    </el-dialog>
  </div>
</template>

<script>
import tableMixin from "@/mixins/tableMixin";
import dialogMixin from "@/mixins/dialogMixin";
import {ip} from "@/utils/config"
import Info from "./info";
export default {
  mixins: [tableMixin, dialogMixin],
  components: { Info },
  data() {
    return {
      isAdd:'',
      searchForm: {},
      subData: {},
      tableData: [],
      
    };
  },
  created() {
    this.loadData()
  },
  methods: {
    download(){
      window.open(ip+'/question/excel')
    },
    async loadData(isSearch) {
      isSearch && (this.defaultParams.page = 1);
      const res = await this.$api.question.list(
        Object.assign({}, this.searchForm, this.defaultParams)
      );
      if (res.code == 0) {
        this.total = res.data.total;
        this.tableData = res.data.records;
      }
    },
    toEdit(row) {
      this.isAdd = false;
      this.subData = row;
      this.openDialog({ title: "编辑课程" });
    },
    // 弹出框确认回调
    async handleSubmit(params) {
      this.$api.question.add(params).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.message);
          this.loadData();
          this.closeDialog();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 弹出框确认回调
    async handleEdit(params) {
      this.$api.question.edit(params).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.message);
          this.loadData();
          this.closeDialog();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    hanldeCancel() {
      this.closeDialog();
    },
    handleSearch() {
      this.loadData(true);
    },
    handleDelete(row) {
      this.$confirm("确认删除该课程吗", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
      })
        .then(async () => {
          // 删除确认回调
          this.$api.question.delete(row).then((res) => {
            if (res.code == 0) {
              this.$message.success(res.message);
              this.loadData();
              this.closeDialog();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch((action) => {
          // 取消确认回调
        });
    },
  },
};
</script>

<style lang="less" scoped>
.search-form {
  text-align: left;
}
</style>
