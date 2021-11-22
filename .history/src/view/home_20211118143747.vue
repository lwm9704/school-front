<template>
  <div class="home">
    <el-container class="top">
      <el-header>
        <div class="header">
          <myHeader></myHeader>
        </div>
      </el-header>
      <el-container class="main">
        <el-aside width="200px" class="Aside">
          <leftMenu></leftMenu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import req from "../js/home";
import leftMenu from "../components/leftMenu";
import myHeader from "../components/myHeader";
export default {
  components: {
    leftMenu,
    myHeader,
  },

  methods: {

    //获取并保存用户参数
    getUserInfo(){
      JSON.stringify(this.$router.)
      sessionStorage.setItem("userInfo")
    },
    //侧边栏的方法
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #87cefa;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
}

.el-aside {
  background-color: #87cefa;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.home,.top,.main{
  height: 100%;
}
</style>