<template>
  <div class="myHeader">
    <div class="userInfo">
      <div class="avatar">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
      </div>
      <div class="charInfo">
        <span>用户名：{{this.userInfo.account}}</span>
        <span>角色:{{this.userInfo.identity}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "myHeader",
  props: [],
  data() {
    return {
      userInfo: {
        userId: "23232",
        account: "323232",
        pwd: "",
        identity:"manager"
      },
    };
  },
  methods: {
    getUserInfo() {
      // this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      // let data = JSON.parse(this.$route.query.user)
      // this.userInfo = Object.assign({},data);
      // this.userInfo.userId = data.userId;
      // console.log(this.userInfo.userId);
    },
  },
  mounted() {
    this.getUserInfo();
  },
};
</script>
<style lang="scss" scoped>
.myHeader{
  background-color:#87CEFA;
  height: 60px;
}
.userInfo {
    display: flex;
    flex-direction: row;
    height: 60px;
    .avatar{
      padding-top: 10px;
    }
}
</style>