<template>
  <div class="header">
    <div class="avatar">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
    </div>
    <div class="userInfo">
      <el-descriptions>
        <el-descriptions-item label="用户名">{{userInfo.account}}</el-descriptions-item>
        <el-descriptions-item label="角色">{{userInfo.role}}</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>
<script>
export default {
    name:'header',
    props:[],
    data(){
        return{
            userInfo:{
                userId:'',
                account:'',
                role:''
            }
        }
    },
    methods:{
        getUserInfo(){}
    },
    mounted(){
        this.getUserInfo()
    }
};
</script>
<style lang="scss" scoped>
</style>