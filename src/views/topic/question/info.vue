<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="知识点">
          <el-select v-model="form.knowledgeId">
            <el-option v-for="item in knowledgeList" :value="item.id" :key="item.id" :label="item.point"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题目类型">
        <el-select v-model="form.questionEngineId">
          <el-option v-for="item in typeList" :value="item.id" :key="item.id" :label="item.typeName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="难度">
        <el-select v-model="form.level">
          <el-option v-for="item in dicList" :value="item.dicKey" :key="item.dicKey" :label="item.dicName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="试题内容">
        <el-input v-model="form.content" type="textarea" :rows="5"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')" v-if="isAdd">立即创建</el-button>
        <el-button type="primary" @click="onEdit('form')" v-else>修改</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
   props:{
    subData:{
      type:Object,
      default:{}
    },
    isAdd:{
      type:Boolean,
      default:''
    }
  },
  created(){
    this.form = JSON.parse(JSON.stringify(this.subData)) 
    this.loadDic();
    this.loadtype();
    this.loadknowledge();
  },
  data() { 
    //这里存放数据
    return {
      form: {},
      dicList:[],
      typeList:[],
      knowledgeList:[]
    };
  },
  //方法集合
  methods: {
    loadDic(){
      this.$api.dictionary.getByCode({dicCode:'ND'}).then(res => {
        if (res.code == 0) {
          this.dicList = res.data;
        }
      });
    },
    loadtype(){
      this.$api.questionType.all().then(res => {
        if (res.code == 0) {
          this.typeList = res.data;
        }
      });
    },
    loadknowledge(){
      this.$api.knowledge.all().then(res => {
        if (res.code == 0) {
          this.knowledgeList = res.data;
        }
      });
    },
    onEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("onEdit", this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("onSubmit", this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCancel() {
      this.$emit("hanldeCancel");
    },
  },
};
</script>
<style lang="scss" scoped></style>
