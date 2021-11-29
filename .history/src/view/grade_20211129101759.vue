<template>
  <div>
    <div class="main-head" :model="search">
      <dl>
        <dd>
          <el-input
            v-model="search.headmasterName"
            placeholder="班主任姓名"
            clearable
          ></el-input>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-button type="primary" @click="searchData">搜索</el-button>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-button type="primary" @click="addGrade">新增班级</el-button>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-button type="primary" @click="deletedGradeList"
            >删除所选班级</el-button
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
        label="班级名称"
        prop="classesName"
        width="200"
      ></el-table-column>
      <el-table-column
        label="班级人数"
        prop="classesNumber"
        width="200"
      ></el-table-column>
      <el-table-column
        label="班主任"
        prop="headmasterName"
        width="200"
      ></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="headmasterEdit(scope.row)"
            >安排班主任</el-button
          >
          <el-button
            size="mini"
            type="primary"
            @click="teacheringEdit(scope.row)"
            >安排任课老师</el-button
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

    <!--添加或修改班级信息-->
    <el-dialog :title="pageInfo.title" :visible.sync="gradeFormVisible">
      <el-form :model="gradeForm" :rules="gradeRules" :ref="gradeForm">
        <el-form-item
          label="班级名称"
          prop="gradeName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="gradeForm.classesName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="班级人数"
          prop="gradeNumber"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="gradeForm.classesNumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="班主任"
          prop="headmasterId"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="gradeForm.headmasterId"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in teacherList"
              :key="item.tname"
              :label="item.tname"
              :value="item.teacherId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelGradeForm">取 消</el-button>
        <el-button type="primary" @click="saveGradeForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import req from "../js/grade";
export default {
  data() {
    return {
      //显示页面条数
      pageInfo: {
        currentPage: 1,
        total: "",
        pageSize: "",
      },
      //表内容数据
      tableData: [],
      multipleSelection: [],
      formLabelWidth: "120px",
      dialogInfo: {
        type: "",
        title: "",
      },
      gradeFormVisible: false,
      gradeForm: {
        classesName: "",
        classesNumber: "",
        headmasterId: "",
      },
      gradeRules: {
        classesName: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
        ],
        classesNum: [
          { required: true, message: "请输入班级人数", trigger: "blur" },
        ],
        headmasterId: [
          { required: true, message: "请选择班主任", trigger: "blur" },
        ],
      },
      //获取可任命教师
      teacherList: [],
      //搜索，按钮
      search: {
        headmasterName: "",
        offset: "",
        limit: "",
      },
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
    getTeacherList() {
      let identity = "headmaster";
      req("getTeacherList", { identity: this.identity }).then((data) => {
        console.log(data.data);
        this.teacherList = data.data.list;
      });
    },
    //刷新页面
    fetch() {
      this.pageInfo.pageSize = 5;
      this.pageInfo.currentPage = 1;
      this.searchData();
      this.getTeacherList();
    },
    //重置
    reset() {
      this.fetch();
      console.log("重置按钮被点击了");
    },

    getTeacherList() {
      req("getTeacherList", {}).then((data) => {
        if (data.code === 1) {
          this.teacherList = data.data;
          console.log(this.teacherList);
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    //触发事件
    addGrade() {
      this.dialogInfo.type = "addGrade";
      this.dialogInfo.title = "新增班级";
      this.gradeFormVisible = true;
    },
    headmasterEdit(row) {
      this.gradeForm = row;
      this.dialogInfo.type = "headmasterEdit";
      this.dialogInfo.title = "修改信息";
      this.gradeFormVisible = true;
    },
    teacheringEdit(row) {
      this.gradeForm = row;
      this.dialogInfo.type = "teacheringEdit";
      this.dialogInfo.title = "修改信息";
      this.gradeFormVisible = true;
    },

    saveGradeForm() {
      this.$refs[this.gradeForm].validate((valid) => {
        if (valid) {
          if (this.dialogInfo.type === "addGrade") {
            req("insertData", { ...this.gradeForm }).then((data) => {
              console.log(data.data);
              if (data.code === 1) {
                this.$message.success(data.msg);
                this.fetch();
                this.$refs[this.gradeForm].resetFields();
                this.gradeFormVisible = false;
              } else {
                this.$message.error(data.msg);
              }
            });
          }
          if (this.dialogInfo.type === "headmasterEdit") {
            req("updateData", { ...gradeForm }).then((data) => {
              console.log(data.data);
              if (data.code === 1) {
                this.$message.success(data.msg);
                this.fetch();
                this.$refs[this.gradeForm].resetFields();
                this.gradeFormVisible = false;
              } else {
                this.$message.error(data.msg);
              }
            });
          }
          if (this.dialogInfo.type === "teacheringEdit") {
            req("updateData", { ...gradeForm }).then((data) => {
              console.log(data.data);
              if (data.data.code === 1) {
                this.$message.success(data.data.msg);
                this.fetch();
                this.$refs[this.gradeForm].resetFields();
                this.gradeFormVisible = false;
              } else {
                this.$message.error(data.data.msg);
              }
            });
          }
        }
      });
    },
    cancelGradeForm() {
      this.$nextTick(() => {
        this.$refs[this.gradeForm].resetFields();
      });
      // this.$refs[this.gradeForm].resetFields();
      this.gradeFormVisible = false;
    },

    deletedGradeList() {
      if (this.multipleSelection.length === 0) {
        this.$message.info("请选择需要删除的数据");
        return;
      }
      this.$confirm("此操作将永久删除该文件,是否继续?").then(() => {
        let gradeIdList = this.multipleSelection
          .map((item) => {
            return item.gradeId;
          })
          .toString();
        req("deleteData", { gradeId: gradeIdList }).then((data) => {
          this.$message.success(data.data.msg);
          this.fetch();
        });
      });
    },
  },
  mounted() {
    this.fetch();
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
.footer {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -100%);
  align-content: center;
}
</style>