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
        <el-form-item label="科目名称：">
          <el-input v-model="searchForm.title"></el-input>
        </el-form-item>
        <el-button type="primary" class="search" @click="handleSearch"
          >查询</el-button
        >
        <el-button class="reset" @click="reset">重置</el-button>
        <el-button
          type="primary"
          class="add"
          plain
          @click="openDialog({ title: '新增科目' });isAdd = true;
            subData = {};"
          >新增科目</el-button
        >
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="title" label="科目名称" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.createTime | dateFormat }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="修改时间" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.updateTime | dateFormat }}
            </span>
          </template>
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
      categoryMap: {
        theory: "理论课",
        practice: "实践课",
      },
      typeMap: {
        compulsory: "公共必修课",
        elective: "公共选修课",
        major: "专业课",
      },
    };
  },
  created() {
    this.loadData();
  },
  filters: {
    dateFormat(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m;
    },
  },
  methods: {
    async loadData(isSearch) {
      isSearch && (this.defaultParams.page = 1);
      const res = await this.$api.subject.list(
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
      this.$api.subject.add(params).then((res) => {
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
      this.$api.subject.edit(params).then((res) => {
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
      this.$confirm("确认删除该科目吗", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
      })
        .then(async () => {
          // 删除确认回调
          this.$api.subject.delete(row).then((res) => {
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
