<template>
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
    // handlerSelect(key, path) {
    //   console.log(key, path);
    //   // console.log(this.$route.path)
    //   if (path !== this.$route.path) {
    //     this.$router.replace({ path: path});
    //     // this.$router.push({path: key, query: {}})
    //   }
    //   // this.$router.push({name: key, params: {}})
    //   console.log(key);
    //   console.log(path);
    // },
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
  background-color: #87CEFA;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
}

.el-aside {
  background-color: #87CEFA;
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
.top{
  height: 20%;
}
</style>