<template>
  <div>
    <el-menu class="el-menu-vertical-demo" :default-active="this.$router.path" router @open="handleOpen" @close="handleClose" @select="handlerSelect">
      <el-submenu v-for="item in menuList" :key="item.labe" >
        <template slot="title">{{item.labe}}</template>
        <div v-if="item.children">
          <el-menu-item
            v-for="items in item.children"
            :index="items.path"
            :key="items.path"
            :route=""
          >
            <template slot="title">
              {{items.labe}}
              </template>
          </el-menu-item>
        </div>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import router from 'vue-router'
export default {
  name: "leftMenu",
  props: [],
  data() {
    return {
      menuList: [
        {
          index: '1',
          labe: "基础管理",
          children: [
            {
              index: '1 - 1',
              labe: "编码管理",
              path: "/code"
            },
            {
              index: '1 - 2',
              labe: "用户管理",
              path: "/user"
            },
            {
              index: '1 - 3',
              labe: "班级管理",
              path: "/grade"
            },
            {
              index: '1 - 4',
              labe: "课程管理",
              path: "/course"
            }
          ]
        },
        {
          index: '2',
          labe: "学生管理",
          children: [
            {
              index: '2 - 1',
              labe: "学生家庭成员管理",
              path: "/member"
            },
            {
              index: '2 - 2',
              labe: "考试成绩管理",
              path: "/score"
            }
          ]
        },
        {
          index: '3',
          labe: "老师管理",
          children: [
            {
              index: '3 - 1',
              labe: "教学管理",
              path: "/teaching"
            },
            {
              index: '3 - 2',
              labe: "授课管理",
              path: "/lecture"
            }
          ]
        }
      ]
    };
  },
  methods: {
    handlerSelect(key, path) {
      // console.log(key,path)
      // if (path !== this.$route.path) {
      //   this.$router.replace({path:'path'});
      //   // this.$router.push({path: key, query: {}})
      // }
      // // this.$router.push({name: key, params: {}})
      // console.log(key);
      // console.log(path);
      this.$emit('select', key,path);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
