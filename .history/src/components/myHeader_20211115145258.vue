<template>
  <div class="myHeader">
    <div class="avatar">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
    </div>
    <div class="userInfo">
      <dd>
        <dl>
          
        </dl>
      </dd>
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
        userId: "",
        account: "",
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
  justify-self: start;
  .userInfo {
    height: 100%;
    width: 100%;
  }
}
</style>