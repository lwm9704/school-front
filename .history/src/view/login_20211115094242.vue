<template>
  <div class="login_c">
    <div class="background_picture">
      <img src="../assets/logo.png" alt="">
    </div>
    <div class="login_table">
      <el-form
        :model="userForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="userForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="userForm.pwd"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userForm: {
        userName: "",
        pwd: ""
      }
    };
  }
};
</script>
<style lang="sass" scoped>

</style>