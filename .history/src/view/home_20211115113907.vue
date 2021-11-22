<template>
  <el-container>
    <el-header>
      <div class="header">
        <div class="my_img">
          <img src alt="头像" />
        </div>
        <div class="my_info"></div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="Aside">
        <leftMenu ></leftMenu>
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
export default {
  components: {
    leftMenu
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
    }
  },
  mounted() {
  }
};
</script>
<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
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
</style>