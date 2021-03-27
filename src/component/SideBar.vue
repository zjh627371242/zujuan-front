<template>
  <div class="container">
    <el-menu router :default-active="currentPath" class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-document-copy"></i>
          <span>题库管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/subject">科目管理</el-menu-item>
          <el-menu-item index="/home/knowledge">知识点管理</el-menu-item>
          <el-menu-item index="/home/questionType">题型管理</el-menu-item>
          <el-menu-item index="/home/question">试题管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/user">用户管理</el-menu-item>
          <el-menu-item index="/home/info">系统信息管理</el-menu-item>
          <el-menu-item index="/home/notice">公告信息管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>个人中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/personal">个人信息管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- <el-menu-item index="/home/work">
        <i class="el-icon-paperclip"></i>
        <span slot="title">工作管理</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      currentPath: "/home/subject",
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.el-menu {
  height: 100%;
  text-align: left;
}
</style>
