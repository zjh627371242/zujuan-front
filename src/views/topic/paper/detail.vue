<template>
  <div class="conatienr">
    <div class="paper">
      <div class="paper-item" v-for="(item, index) in paper" :key="index">
        <h3>第{{ index + 1 }}题</h3>
        <p class="title">题型：{{ item.type }}</p>
        <p class="content">题目：{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    paper: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    //这里存放数据
    return {};
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {},
};
</script>
<style lang="less" scoped>
.paper {
  text-align: left;
}
.paper-item {
  margin: 10px 0;
  line-height: 25px;
}
</style>
