<template>
  <div class="home">
    <el-container class="container">
      <el-header class="header">
        <div class="logo-container">
          <img src="../assets/logo.png" alt="" class="logo" />
        </div>
        <h2 class="title">组卷管理系统</h2>
        <div class="exit">
          <el-button plain round @click="dialogVisible = true">公告</el-button>
          <el-button type="warning" plain round @click="exit"
            >退出登录</el-button
          >
        </div>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <SideBar class="side-bar" />
        </el-aside>
        <el-main>
          <div class="wrapper">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
      title="公告"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div class="table">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="title" label="公告标题" align="center">
          </el-table-column>

          <el-table-column prop="content" label="公告内容" align="center">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center">
            <template slot-scope="scope">
              <span>
                {{ scope.row.createTime | dateFormat }}
              </span>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tableMixin from "@/mixins/tableMixin";
import dialogMixin from "@/mixins/dialogMixin";
import SideBar from "@/component/SideBar.vue";
export default {
  mixins: [tableMixin, dialogMixin],
  name: "Home",
  components: {
    SideBar,
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
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      currentPath: "/home/task",
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    exit() {
      this.$router.push("/login");
      sessionStorage.removeItem("isLogin");
      this.$message.success("退出成功");
    },
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
  },
  watch: {
    $route: {
      handler(val) {
        this.currentPath = val.path;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.home,
.container {
  height: 100%;
  /deep/.side-bar {
    height: 100%;
  }
}
.header {
  height: 80px !important;
  line-height: 80px;
  border-bottom: 1px solid #e6e6e6;
  .title {
    float: left;
    margin-left: 50px;
    color: #6d6565;
  }
  .logo-container {
    height: 100%;
    display: flex;
    overflow: hidden;
    align-items: center;
    overflow: hidden;
    float: left;
    .logo {
      width: 50px;
      height: 50px;
    }
  }
  .exit {
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
