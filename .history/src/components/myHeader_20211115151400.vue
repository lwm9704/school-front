<template>
  <div class="myHeader">
    <div class="userInfo">
      
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
  justify-self: flex-start;
}
</style>