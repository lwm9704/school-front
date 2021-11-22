<template>
  <div class="myHeader">
    <div class="userInfo">
      <div class="avatar">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
      </div>
      <div class="charInfo">
        <el-descriptions title="用户信息">
          <el-descriptions-item label="用户名"
            >{{userInfo.account}}</el-descriptions-item
          >
          <el-descriptions-item label="角色"
            >{{userInfo.role}}</el-descriptions-item
          >
        </el-descriptions>
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
}
</style>