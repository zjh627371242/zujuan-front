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
        <el-form-item label="公告标题：">
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
          @click="
            openDialog({ title: '新增公告' });
            isAdd = true;
            subData = {};
          "
          >新增公告</el-button
        >
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="title" label="公告标题" align="center">
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
      searchForm: {},
      subData: {},
      tableData: [],
      isAdd: "",
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
      const res = await this.$api.notice.list(
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
      this.openDialog({ title: "编辑公告" });
    },
    // 弹出框确认回调
    async handleSubmit(params) {
      this.$api.notice.add(params).then((res) => {
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
      this.$api.notice.edit(params).then((res) => {
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
      this.$confirm("确认删除该公告吗", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
      })
        .then(async () => {
          // 删除确认回调
          this.$api.notice.delete(row).then((res) => {
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
