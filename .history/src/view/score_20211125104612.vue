<template>
  <div>
    <div class="main-head" :model="search">
      <dl>
        <dd>
          <el-input
            v-model="search.studentName"
            placeholder="学生名称"
            clearable
          ></el-input>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-input
            v-model="search.studentNo"
            placeholder="学生学号"
            clearable
          ></el-input>
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
          <el-button type="primary" @click="addScore">新增</el-button>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-button type="primary" @click="deleteScoreList"
            >删除所选</el-button
          >
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
      <el-table-column
        label="学生名称"
        prop="studentName"
        width="150"
      ></el-table-column>
      <el-table-column
        label="课程名称"
        prop="courseName"
        width="150"
      ></el-table-column>
      <el-table-column label="年份" prop="year" width="120"></el-table-column>
      <el-table-column
        label="学期"
        prop="semester"
        width="150"
      ></el-table-column>
      <el-table-column label="成绩" prop="score" width="150"></el-table-column>
      <el-table-column label="状态" prop="state" width="150"></el-table-column>
      <el-table-column label="备注" prop="mark" width="300"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="deleteScore(scope.row)"
            >删除</el-button
          >
          <el-button size="mini" @click="scoreEdit(scope.row)"
            >修改信息</el-button
          >
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

    <!--添加或修改成绩信息-->
    <el-dialog :title="dialogInfo.title" :visible.sync="scoreFormVisible">
      <el-form :model="scoreForm" :rules="scoreRules" :ref="scoreForm">
        <el-form-item label="课程名称" prop="courseId" :label-width="formLabelWidth">
          <el-select
            v-model="scoreForm.courseId"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in courseList"
              :key="item.courseId"
              :label="item.courseName"
              :value="item.courseId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="班级" prop="classesId" :label-width="formLabelWidth">
          <el-select v-model="scoreForm.classesId" clearable placeholder="请选择">
            <el-option
              v-for="item in gradeList"
              :key="item.classesId"
              :label="item.classesName"
              :value="item.classesId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学生" prop="sId" :label-width="formLabelWidth">
          <el-select
            v-model="scoreForm.sId"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in studentList"
              :key="item.sid"
              :label="item.sname"
              :value="item.sid"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年份" prop="year" :label-width="formLabelWidth">
          <el-input v-model="scoreForm.year" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="学期" prop="semester" :label-width="formLabelWidth">
          <el-select
            v-model="scoreForm.semester"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in semesterList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="成绩" prop="score" :label-width="formLabelWidth">
          <el-input v-model="scoreForm.score" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="state" :label-width="formLabelWidth">
          <el-select v-model="scoreForm.state" clearable placeholder="请选择">
            <el-option
              v-for="item in stateList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="mark" :label-width="formLabelWidth">
          <el-input v-model="scoreForm.mark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelScoreForm">取 消</el-button>
        <el-button type="primary" @click="saveScoreForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import req from "../js/score";
import { validateScore } from "../js/validate";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      //显示页面条数
      pageInfo: {
        currentPage: 1,
        total: "",
        pageSize: "",
      },
      //表内容数据
      tableData: [],
      multipleSelection: [],
      dialogInfo: {
        type: "",
        title: "",
      },
      scoreFormVisible: false,
      scoreForm: {
        courseId: "",
        classesId: "",
        sId: "",
        year: "",
        semester: "",
        score: "",
        state: "",
        mark: "",
      },
      scoreRules: {
        courseName: [
          { required: true, message: "请选择课程", trigger: "blur" },
        ],
        grade: [{ required: true, message: "请选择班级", trigger: "blur" }],
        studentName: [
          { required: true, message: "请输入学生姓名", trigger: "blur" },
        ],
        year: [{ required: true, message: "请输入年份", trigger: "blur" }],
        semester: [{ required: true, message: "请选择学期", trigger: "blur" }],
        score: [
          { required: true, message: "请输入分数", trigger: "blur" },
          // { validator: validateScore, trigger: "blur" },
        ],
        state: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      //搜索，按钮
      search: {
        studentName: "",
        studentNo: "",
        grade: "",
        offset:"",
        limit:""
      },
      gradeList: [],
      studentList: [],
      courseList: [],
      semesterList: [
        {
          value: 1,
          label: "第一个学期",
        },
        {
          value: 2,
          label: "第二个学期·",
        },
      ],
      stateList: [
        {
          value: 0,
          label: "下线",
        },
        {
          value: 1,
          label: "发布",
        },
      ],
    };
  },
  mounted(){
    this.fetch();
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

    initAllList() {
      req("getStudentList").then((data) => {
        if(data.code === 1){
          this.studentList = data.data;
        }else{
          this.$message.error(data.msg);
        }
      });
      req("getCourseList").then((data) => {
        if(data.code === 1){
          this.courseList = data.data.list;
        }else{
          this.$message.error(data.msg);
        }
      });
      req("getGradeList").then((data) => {
        if(data.code === 1){
          this.gradeList = data.data;
        }else{
          this.$message.error(data.msg);
        }
      });
    },
    //搜索
    searchData() {
      this.search.offset = this.pageInfo.currentPage;
      this.search.limit = this.pageInfo.pageSize;
      req("selectData", {
        ...this.search,
      }).then((data) => {
        console.log(data.data);
        this.tableData = data.data.list;
        this.pageInfo.pageSize = data.data.pageSize;
        this.pageInfo.currentPage = data.data.currentPage;
        this.pageInfo.total = data.data.total;
      });
    },
    //刷新页面
    fetch() {
      this.pageInfo.pageSize = 5;
      this.pageInfo.pageIndex = 1;
      this.searchData();
      this.initAllList();
    },
    //重置
    reset() {
      this.fetch();
      console.log("重置按钮被点击了");
    },

    //触发事件
    addScore() {
      this.dialogInfo.type = "addScore";
      this.dialogInfo.title = "新增成绩信息";
      this.scoreFormVisible = true;
    },
    scoreEdit(row) {
      this.scoreFoscoreEditrm = row;
      this.dialogInfo.type = "scoreEdit";
      this.dialogInfo.title = "修改成绩信息";
      this.scoreFormVisible = true;
    },

    saveScoreForm() {
      console.log("666");
      this.$refs[this.scoreForm].validate((valid) => {
        if (valid) {
          if (this.dialogInfo.type === "addScore") {
            req("insertData", { ...this.scoreForm }).then((data) => {
              console.log(data.data);
              if (data.code === 1) {
                this.$message.success(data.msg);
                this.fetch();
                this.$refs.scoreForm.resetFields();
                this.scoreFormVisible = false;
              } else {
                this.$message.error(data.msg);
              }
            });
          }
          if (this.dialogInfo.type === "scoreEdit") {
            req("updateData", { ...this.scoreForm }).then((data) => {
              console.log(data.data);
              if (data.code === 1) {
                this.$message.success(data.msg);
                this.fetch();
                this.scoreForm.resetFields();
                this.scoreFormVisible = false;
              } else {
                this.$message.error(data.msg);
              }
            });
          }
        }
      });
    },
    cancelScoreForm() {
      this.$refs[this.scoreForm].resetFields();
      this.scoreFormVisible = false;
    },

    deleteScore(row) {
      this.$confirm("此操作将永久删除该文件,是否继续?").then(() => {
        let scoreId = row.scoreId.toString();
        req("deleteData", { scoreId: scoreId }).then((data) => {
          this.$message.success(data.msg);
          this.fetch();
        });
      });
    },
    deleteScoreList() {
      if (this.multipleSelection.length === 0) {
        this.$message.info("请选择需要删除的数据");
        return;
      }
      this.$confirm("此操作将永久删除该文件,是否继续?").then(() => {
        let scoreIdList = this.multipleSelection
          .map((item) => {
            return item.scoreId;
          })
          .toString();
        req("deleteData", { scoreId: scoreIdList }).then((data) => {
          this.$message.success(data.msg);
          this.fetch();
        });
      });
    },
  },
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
.main-head {
  display: flex;
  flex-direction: row;
}
</style>