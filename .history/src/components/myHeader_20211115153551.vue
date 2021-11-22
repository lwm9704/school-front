<template>
  <div class="myHeader">
    <div class="userInfo">
      <div class="avatar">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
      </div>
      <div class="charInfo">
        <span>用户名：{{userInfo.account}}</span>
        <span>角色:{{userInfo.role}}</span>
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
        userId: "3232",
        account: "32323",
        role: "",
      },
    };
  },
  methods: {
    getUserInfo() {},
  },
  mounted() {
    this.getUserInfo();
  },
};
</script>
<style lang="scss" scoped>
.userInfo {
    display: flex;
    flex-direction: row;
    .avatar{
      position: relative;
      left: 0;
      top: 50%;
    }
}
</style>