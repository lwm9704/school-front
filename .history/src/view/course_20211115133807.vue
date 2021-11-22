<template>
  <div>
    <div class="main-head" :model="search">
      <dl>
        <dd>
          <el-input v-model="search.courseName" placeholder="课程名称" clearable></el-input>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-select v-model="search.state" placeholder="课程状态">
            <el-option
              v-for="item in state"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-button type="primary" @click="searchData">搜索</el-button>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-button type="primary" @click="addCourse">新增课程</el-button>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-button type="primary" @click="deleteCourseList">删除所选课程</el-button>
        </dd>
      </dl>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="课程编号" prop="coursrNo" width="120"></el-table-column>
      <el-table-column label="课程名称" prop="courseName" width="120"></el-table-column>
      <el-table-column label="状态" prop="state" width="120"></el-table-column>
      <el-table-column label="备注" prop="mark" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="modifyCourse(scope.row)">课程编辑</el-button>
          <el-button size="mini" @click="deleteCourse(scope.row)">删除课程</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="parseInt(pageInfo.currentPage)"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="parseInt(pageInfo.pageSize)"
        layout="total, sizes, prev, pager, next, jumper"
        :total="parseInt(pageInfo.total)"
      ></el-pagination>
    </div>

    <!--添加或修改课程信息-->
    <el-dialog :title="dialogInfo.title" :visible.sync="courseFormVisible">
      <el-form :model="courseForm">
        <el-form-item label="课程编号" :label-width="formLabelWidth">
          <el-input v-model="courseForm.courseNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="courseForm.courseName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="courseForm.state" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="courseForm.mark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="courseFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="courseFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import req from "../js/course";
export default {
  data() {
    return {
      //表内容数据
      tableData: [],
      multipleSelection: [],
      //显示页面条数
      pageInfo: {
        currentPage: "",
        total: "",
        pageSize: ""
      },
      dialogInfo: {
        type: "",
        title: ""
      },
      //课程信息表单
      courseFormVisible: false,
      courseForm: {
        courseNo: "",
        courseName: "",
        state: "",
        mark: ""
      },
      formLabelWidth: "120px",
      //搜索，按钮
      search: {
        courseName: "",
        state: ""
      },
      state: [
        {
          value: 0,
          label: "禁用"
        },
        {
          value: 1,
          label: "启用"
        }
      ]
    };
  },
  methods: {
    //侧边栏的方法
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    //表单多选框的方法
    handleSelectionChange(row) {
      this.multipleSelection = row;
    },

    //选页的相关方法
    handleSizeChange(pageSize) {
      this.pageInfo.pageSize = pageSize;
      console.log(`每页 ${pageSize} 条`);
    },
    handleCurrentChange(currentPage) {
      this.pageInfo.currentPage = currentPage;
      console.log(`当前页: ${currentPage}`);
    },

    //搜索
    searchData() {
      req("selectData", {
        ...this.search,
        pageSize: this.pageInfo.pageSize,
        currentPage: this.pageInfo.currentPage
      }).then(data => {
        console.log(data.data);
        this.tableData = data.data.list;
        pageInfo.pageSize = data.data.pageSize;
        pageInfo.currentPage = data.data.currentPage;
        pageInfo.total = data.data.total;
      });
    },
    //刷新页面
    fetch() {
      this.pageInfo.pageSize = 5;
      this.pageInfo.pageIndex = 1;
      this.searchData();
    },
    //重置
    reset() {
      this.fetch();
      console.log("重置按钮被点击了");
    },

    //触发事件
    addCourse() {
      this.pageInfo.type = "addCourse";
      this.pageInfo.title = "新增课程";
      this.courseFormVisible = true;
    },
    modifyCourse(row) {
      this.courseForm = row;
      this.pageInfo.type = "modifyCourse";
      pageInfo.title = "修改课程信息";
      this.courseFormVisible = true;
    },

    saveCourseForm() {
      this.$refs.courseForm.validate(valid => {
        if (valid) {
          if (this.dialogInfo.type === "addCourse") {
            req("insertData", { ...this.courseForm }).then(data => {
              console.log(data.data);
              if (data.data.code === 1) {
                this.$message.success(data.data.msg);
                this.fetch();
                this.$refs.courseForm.resetFields();
                this.courseFormVisible = false;
              } else {
                this.$message.error(data.data.msg);
              }
            });
          }
          if (this.dialogInfo.type === "modifyCourse") {
            req("updateData", { ...courseForm }).then(data => {
              console.log(data.data);
              if (data.data.code === 1) {
                this.$message.success(data.data.msg);
                this.fetch();
                this.courseForm.resetFields();
                this.courseFormVisible = false;
              } else {
                this.$message.error(data.data.msg);
              }
            });
          }
        }
      });
    },

    deleteCourse(row) {
      this.$confirm("此操作将永久删除该文件,是否继续?").then(() => {
        let courseId = row.courseId.toString();
        req("deleteData", { courseId: courseId }).then(data => {
          this.$message.success(data.data.msg);
          this.fetch();
        });
      });
    },
    deleteCourseList() {
      if (this.multipleSelection.length === 0) {
        this.$message.info("请选择需要删除的数据");
        return;
      }
      this.$confirm("此操作将永久删除该文件,是否继续?").then(() => {
        let courseIdList = this.multipleSelection
          .map(item => {
            return item.courseId;
          })
          .toString();
        req("deleteData", { courseId: courseIdList }).then(data => {
          this.$message.success(data.data.msg);
          this.fetch();
        });
      });
    }
  },
  mounted() {
    this.fetch();
  }
};
</script>
<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.main-head{
  float: left;
  dl{
    float: left;
  }
}
</style>