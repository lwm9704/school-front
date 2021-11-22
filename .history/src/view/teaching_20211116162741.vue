<template>
  <div>
    <div class="main-head">
      <dl>
        <dd>
          <el-input
            v-model="search.courseName"
            placeholder="课程名称"
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
          <el-button type="primary" @click="addTeaching">新增</el-button>
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
        label="班级名称"
        prop="gradeName"
        width="120"
      ></el-table-column>
      <el-table-column
        label="老师名称"
        prop="teacherName"
        width="120"
      ></el-table-column>
      <el-table-column label="年份" prop="year" width="120"></el-table-column>
      <el-table-column
        label="学期"
        prop="semester"
        width="120"
      ></el-table-column>
      <el-table-column label="状态" prop="state" width="120"></el-table-column>
      <el-table-column label="备注" prop="mark" width="120"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="teachingDelete(scope.row)"
            >删除</el-button
          >
          <el-button size="mini" @click="teachingEdit(scope.row)"
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

    <!--添加或修改教学信息-->
    <el-dialog :title="dialogInfo.title" :visible.sync="teachingFormVisible">
      <el-form :model="teachingForm" :ref="teachingForm">
        <el-form-item label="班级名称" :label-width="formLabelWidth">
          <el-select
            v-model="teachingForm.classesName"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in classesList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-select
            v-model="teachingForm.courseName"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in courseList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="老师名称" :label-width="formLabelWidth">
          <el-select
            v-model="teachingForm.teacherName"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in teacherList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年份" :label-width="formLabelWidth">
          <el-input v-model="teachingForm.year" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="学期" :label-width="formLabelWidth">
          <el-select
            v-model="teachingForm.semester"
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

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select
            v-model="teachingForm.state"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in stateList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="teachingForm.mark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelTeachingForm">取 消</el-button>
        <el-button type="primary" @click="saveTeachingForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import req from "../js/teaching";
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
      teachingFormVisible: false,
      teachingForm: {
        classesName: "",
        courseName: "",
        teacherName: "",
        year: "",
        semester: "",
        state: "",
        mark: "",
      },
      teachingRules: {
        classesName: [
          { required: true, message: "请选择班级", trigger: "blur" },
        ],
        courseName: [
          { required: true, message: "请选择课程", trigger: "blur" },
        ],
        teacherName: [
          { required: true, message: "请选择老师", trigger: "blur" },
        ],
        year: [{ required: true, message: "请输入年份", trigger: "blur" }],
        semester: [{ required: true, message: "请选择学期", trigger: "blur" }],
        state: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      //搜索
      search: {
        courseName: "",
        grade: "",
      },
      gradeList: [],
      classesList: [],
      courseList: [],
      teacherList: [],
      semesterList: [
        {
          value: 1,
          label: "第一个学期",
        },
        {
          value: 2,
          label: "第二个学期",
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
        currentPage: this.pageInfo.currentPage,
      }).then((data) => {
        console.log(data.data);
        this.tableData = data.data.list;
        this.pageInfo.pageSize = data.data.pageSize;
        this.pageInfo.currentPage = data.data.currentPage;
        this.pageInfo.total = data.data.total;
      });
    },

    initAllList() {
      req("getClassesList").then((data) => {
        console.log(data.data);
        this.classesList = data.data.list;
      });
      req("getTeacherList").then((data) => {
        console.log(data.data);
        this.teacherList = data.data.list;
      });
      req("getCourseList").then((data) => {
        console.log(data.data);
        this.courseList = data.data.list;
      });
      req("getGradeList").then((data) => {
        console.log(data.data);
        this.gradeList = data.data.list;
      });
    },
    //刷新页面
    fetch() {
      this.pageInfo.pageSize = 5;
      this.pageInfo.pageIndex = 1;
      this.search();
      this.initAllList();
    },
    //重置
    reset() {
      this.fetch();
      console.log("重置按钮被点击了");
    },

    //触发事件
    addTeaching() {
      this.dialogInfo.type = "addTeaching";
      this.dialogInfo.title = "新增教学信息";
      this.teachingFormVisible = true;
    },
    teachingEdit(row) {
      this.teacheingForm = row;
      this.dialogInfo.type = "teachingEdit";
      this.dialogInfo.title = "修改教学信息";
      this.teachingFormVisible = true;
    },

    saveTeachingForm() {
      this.$refs.TeachingForm.validate((valid) => {
        if (valid) {
          if (this.dialogInfo.type === "addTeaching") {
            req("insertData", { ...this.teachingForm }).then((data) => {
              console.log(data.data);
              if (data.data.code === 1) {
                this.$message.success(data.data.msg);
                this.fetch();
                this.$refs.teachingForm.resetFields();
                this.teachingFormVisible = false;
              } else {
                this.$message.error(data.data.msg);
              }
            });
          }
          if (this.dialogInfo.type === "teachingEdit") {
            req("updateData", { ...teachingForm }).then((data) => {
              console.log(data.data);
              if (data.data.code === 1) {
                this.$message.success(data.data.msg);
                this.fetch();
                this.teachingForm.resetFields();
                this.teachingFormVisible = false;
              } else {
                this.$message.error(data.data.msg);
              }
            });
          }
        }
      });
    },
    cancelTeachingForm() {
      this.$refs[this.teachingForm].resetFields();
      this.teachingFormVisible = false;
    },

    deleteTeaching(row) {
      this.$confirm("此操作将永久删除该文件,是否继续?").then(() => {
        let teachingId = row.teachingId.toString();
        req("deleteData", { teachingId: teachingId }).then((data) => {
          this.$message.success(data.data.msg);
          this.fetch();
        });
      });
    },
    deleteTeachingList() {
      if (this.multipleSelection.length === 0) {
        this.$message.info("请选择需要删除的数据");
        return;
      }
      this.$confirm("此操作将永久删除该文件,是否继续?").then(() => {
        let teachingIdList = this.multipleSelection
          .map((item) => {
            return item.teachingId;
          })
          .toString();
        req("deleteData", { teachingId: teachingIdList }).then((data) => {
          this.$message.success(data.data.msg);
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