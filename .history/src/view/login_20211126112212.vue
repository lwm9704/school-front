<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <div class="login_table">
        <el-form
          :model="userForm"
          :rules="rules"
          :ref="userForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="account">
            <el-input v-model="userForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="userForm.pwd" type="password"></el-input>
          </el-form-item>

          <el-form-item class="login_button">
            <el-button type="primary" @click="submitForm"
              >登录</el-button
            >
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import req from "../js/login";
export default {
  data() {
    return {
      userForm: {
        account: "",
        pwd: "",
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
      userInfo: {
        userId: "",
        account: "",
        pwd: "",
        identity: "",
      },
    };
  },

  methods: {
    submitForm() {
      this.$refs[this.userForm].validate((valid) => {
        if (valid) {
          req("login", { ...this.userForm }).then((data) => {
            //可能需要修改
            if (data.code === 1) {
              this.userInfo = data.data;
              this.$refs[this.userForm].resetFields();
              var user = JSON.stringify(this.userInfo);
              this.$router.push({ path: "/home", encodeURIComponent() });
            }else{
              this.$message.console.error(data.msg);
            }
          });
        } else {
          alert(data.msg);
        }
      });
    },
    resetForm() {
      this.$refs[this.userForm].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100vh;
}
.login_box {
  width: 450px;
  height: 400px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #eee;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.login_table {
  width: 380px;
  position: absolute;
  top: 50%;
}
.login_button {
  display: flex;
  justify-content: flex-end;
}
</style>