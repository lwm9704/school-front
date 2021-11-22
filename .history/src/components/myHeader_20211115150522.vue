<template>
  <div class="myHeader">
    <div class="userInfo">
      <dl>
        <dd>
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
        </dd>
      </dl>
      <dl>
        <dd>
          <span>用户名：{{ userInfo.account }}</span>
        </dd>
      </dl>
      <dl>
        <dd>
          <span>角色：{{ userInfo.role }}</span>
        </dd>
      </dl>
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
.myHeader {
  display: flex;
  flex-direction: row;
  justify-self: start;
}
</style>