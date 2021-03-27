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
        <el-form-item label="公告名称：">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-button type="primary" class="search" @click="handleSearch"
          >查询</el-button
        >
        <el-button class="reset" @click="reset">重置</el-button>
        <el-button
          type="primary"
          class="add"
          plain
          @click="openDialog({ title: '新增课程' })"
          >新增科目</el-button
        >
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="name" label="课程名称" align="center">
        </el-table-column>
        <el-table-column prop="category" label="课程类别" align="center">
          <template slot-scope="scope">
            <span>{{ categoryMap[scope.row.category] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="课程类型" align="center">
          <template slot-scope="scope">
            <span>{{ typeMap[scope.row.type] }}</span> </template
          >type
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
      <Info @onSubmit="handleSubmit" @hanldeCancel="hanldeCancel" />
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
  created() {},
  methods: {
    async loadData(isSearch) {
      isSearch && (this.defaultParams.page = 1);
      const res = await this.$api.course.list(
        Object.assign({}, this.searchForm, this.defaultParams)
      );
      if (res.code == 1) {
        this.total = res.data.total;
        this.tableData = res.data.records;
      }
    },
    toEdit(row) {
      this.subData = row;
      this.openDialog({ title: "编辑课程" });
    },
    // 弹出框确认回调
    async handleSubmit(params) {},
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
