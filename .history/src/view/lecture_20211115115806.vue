<template>
  <div>
    <div class="main-head" :model="search">
      <dl>
        <dd>
          <el-input v-model="search.teacherName" placeholder="老师名称" clearable></el-input>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-select v-model="search.grade" placeholder="班级">
            <el-option
              v-for="item in gradeList"
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
          <el-button type="primary" @click="addLecture">新增</el-button>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-button type="primary" @click="deletedlectureList">删除所选</el-button>
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
      <el-table-column label="课程名称" prop="courseName" width="120"></el-table-column>
      <el-table-column label="老师名称" prop="teacherName" width="120"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="deleteLecture(scope.row)">删除</el-button>
          <el-button size="mini" @click="editLecture(scope.row)">修改信息</el-button>
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

    <!--添加或修改授课信息-->
    <el-dialog :title="pageInfo.title" :visible.sync="lectureFormVisible">
      <el-form :model="lectureForm">
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-select v-model="lectureForm.courseName" clearable placeholder="请选择">
            <el-option
              v-for="item in courseList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="授课老师" :label-width="formLabelWidth">
          <el-select v-model="lectureForm.teacherName" clearable placeholder="请选择">
            <el-option
              v-for="item in teacherList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="lectureFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveLectureForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import req from "../js/lecture";
export default {
  data() {
    return {
      formLabelWidth:'120px',
      //显示页面条数
      pageInfo: {
        currentPage: 1,
        total: "",
        pageSize: ""
      },
      //表内容数据
      tableData: [],
      multipleSelection: [],
      dialogInfo: {
        type: "",
        titile: ""
      },
      lectureFormVisible: false,
      lectureForm: {
        courseName: "",
        teacherName: ""
      },
      //搜索，按钮
      search: {
        teacherName: "",
        grade: ""
      },
      courseList:[],
      teacherList:[],
      gradeList:[]
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
      this.search();
    },
    //重置
    reset() {
      this.fetch();
      console.log("重置按钮被点击了");
    },

    //触发事件
    addLecture() {
      this.dialogInfo.type = "addLecture";
      this.dialogInfo.titile = "新增授课信息";
      this.lectureFormVisible = true;
    },
    editLecture(row) {
      this.lectureForm = row;
      this.dialogInfo.type = "editLecture";
      this.dialogInfo.titile = "修改授课信息";
      this.lectureFormVisible = true;
    },

    saveLectureForm() {
      this.$refs.lectureForm.validate(valid => {
        if (valid) {
          if (this.dialogInfo.type === "addLecture") {
            req("insertData", { ...this.lectureForm }).then(data => {
              console.log(data.data);
              if (data.data.code === 1) {
                this.$message.success(data.data.msg);
                this.fetch();
                this.$refs.lectureForm.resetFields();
                this.lectureFormVisible = false;
              } else {
                this.$message.error(data.data.msg);
              }
            });
          }
          if (this.dialogInfo.type === "editLecture") {
            req("updateData", { ...lectureForm }).then(data => {
              console.log(data.data);
              if (data.data.code === 1) {
                this.$message.success(data.data.msg);
                this.fetch();
                this.lectureForm.resetFields();
                this.lectureFormVisible = false;
              } else {
                this.$message.error(data.data.msg);
              }
            });
          }
        }
      });
    },

    deleteLecture(row) {
      this.$confirm("此操作将永久删除该文件,是否继续?").then(() => {
        let lectureId = row.lectureId.toString();
        req("deleteData", { lectureId: lecttureId }).then(data => {
          this.$message.success(data.data.msg);
          this.fetch();
        });
      });
    },
    deletedlectureList() {
      if (this.multipleSelection.length === 0) {
        this.$message.info("请选择需要删除的数据");
        return;
      }
      this.$confirm("此操作将永久删除该文件,是否继续?").then(() => {
        let lectureIdList = this.multipleSelection
          .map(item => {
            return item.lectureId;
          })
          .toString();
        req("deleteData", { lectureId: lectureIdList }).then(data => {
          this.$message.success(data.data.msg);
          this.fetch();
        });
      });
    }
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