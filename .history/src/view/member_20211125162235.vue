<template>
  <div>
    <div class="main-head" :model="search">
      <dl>
        <dd>
          <el-input
            v-model="search.sName"
            placeholder="学生名称"
            clearable
          ></el-input>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-select v-model="search.classesId" placeholder="班级">
            <el-option
              v-for="item in gradeList"
              :key="item.classesId"
              :label="item.classesName"
              :value="item.classesId"
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
          <el-button type="primary" @click="addMember">新增成员</el-button>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-button type="primary" @click="memberDeleteList">删除所</el-button>
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
        prop="sName"
        width="120"
      ></el-table-column>
      <el-table-column
        label="成员类型"
        prop="type"
        width="120"
      ></el-table-column>
      <el-table-column
        label="姓名"
        prop="memberName"
        width="120"
      ></el-table-column>
      <el-table-column label="性别" prop="sex" width="120"></el-table-column>
      <el-table-column
        label="手机号"
        prop="memberPhone"
        width="120"
      ></el-table-column>
      <el-table-column
        label="电子邮箱"
        prop="email"
        width="120"
      ></el-table-column>
      <el-table-column
        label="出生日期"
        prop="birthday"
        width="120"
      ></el-table-column>
      <el-table-column
        label="身份证号码"
        prop="idCar"
        width="120"
      ></el-table-column>
      <el-table-column label="状态" prop="state" width="120"></el-table-column>
      <el-table-column
        label="备注"
        prop="mark"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="memberEdit(scope.row)"
            >成员编辑</el-button
          >
          <el-button size="mini" @click="memberDelete(scope.row)"
            >删除成员</el-button
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

    <!--添加或修改成员信息-->
    <el-dialog :title="dialogInfo.title" :visible.sync="memberFormVisible">
      <el-form :model="memberForm" :rules="memberRules" :ref="memberForm">
        <el-form-item
          label="班级名称"
          prop="classesId"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="memberForm.classesId"
            placeholder="班级名称"
            @change="getStudentInfo"
          >
            <el-option
              v-for="item in gradeList"
              :key="item.classesId"
              :label="item.classesName"
              :value="item.classesId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="学生名称"
          prop="sName"
          :label-width="formLabelWidth"
        >
          <el-select v-model="memberForm.sId" placeholder="学生名称">
            <el-option
              v-for="item in studentList"
              :key="item.sid"
              :label="item.sname"
              :value="item.sid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="成员类型"
          prop="type"
          :label-width="formLabelWidth"
        >
          <el-select v-model="memberForm.type" clearable placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="姓名"
          prop="memberName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="memberForm.memberName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
          <el-select v-model="memberForm.sex" placeholder="性别">
            <el-option
              v-for="item in sex"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="memberPhone"
          :label-width="formLabelWidth"
        >
          <el-input v-model="memberForm.memberPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="电子邮箱"
          prop="email"
          :label-width="formLabelWidth"
        >
          <el-input v-model="memberForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="出生日期"
          prop="birthday"
          :label-width="formLabelWidth"
        >
          <div class="block">
            <el-date-picker
              v-model="memberForm.birthday"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item
          label="身份证号码"
          prop="idCar"
          :label-width="formLabelWidth"
        >
          <el-input v-model="memberForm.idCar" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state" :label-width="formLabelWidth">
          <el-select v-model="memberForm.state" placeholder="状态">
            <el-option
              v-for="item in state"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="mark" :label-width="formLabelWidth">
          <el-input v-model="memberForm.mark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelMemberForm">取 消</el-button>
        <el-button type="primary" @click="saveMemberForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import req from "../js/member";
import {
  validateMobilePhone,
  validateEmail,
  vaildateIdCar,
} from "../js/validate";
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
      formLabelWidth: "120px",
      tableData: [],
      multipleSelection: [],
      memberFormVisible: false,
      dialogInfo: {
        type: "",
        title: "",
      },
      memberForm: {
        classesId: "",
        sId: "",
        sName:"",
        type: "",
        memberName: "",
        sex: "",
        memberPhone: "",
        email: "",
        birthday: "",
        idCar: "",
        state: "",
        mark: "",
      },
      memberRules: {
        grade: [{ required: true, message: "请选择班级", trigger: "blur" }],
        sId: [
          { required: true, message: "请输入学生姓名", trigger: "blur" },
        ],
        type: [{ required: true, message: "请输入成员类型", trigger: "blur" }],
        memberName: [
          { required: true, message: "请输入成员姓名", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        birthday: [
          { required: true, message: "请选择出生日期", trigger: "blur" },
        ],
        state: [{ required: true, message: "请选择状态", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: validateMobilePhone, trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" },
        ],
        idCar: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          { validator: vaildateIdCar, trigger: "blur" },
        ],
      },
      //搜索，按钮
      search: {
        sName: "",
        classesId: "",
        offset: "",
        limit: "",
      },

      //新增修改信息所需数据
      gradeList: [],
      studentList: [],
      typeList: [
        {
          value: 0,
          label: "外公",
        },
        {
          value: 1,
          label: "外婆",
        },
        {
          value: 2,
          label: "爷爷",
        },
        {
          value: 3,
          label: "奶奶",
        },
      ],
      sex: [
        {
          value: 0,
          label: "男",
        },
        {
          value: 1,
          label: "女",
        },
      ],
      state: [
        {
          value: 0,
          label: "发布",
        },
        {
          value: 1,
          label: "下线",
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

    getStudentInfo() {
      req("getStudentList", { ...this.memberForm.grade }).then((data) => {
        console.log(data.data);
        this.studentList = data.data;
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
    initAllList() {
      req("getGradeList", {}).then((data) => {
        console.log(data.data);
        this.gradeList = data.data;
      });
      // req("getStudentList", {}).then((data) => {
      //   console.log(data.data);
      //   this.studentList = data.data;
      // });
    },
    //刷新页面
    fetch() {
      this.pageInfo.pageSize = 5;
      this.pageInfo.currentPage = 1;
      this.searchData();
      this.initAllList();
    },
    //重置
    reset() {
      this.fetch();
      console.log("重置按钮被点击了");
    },

    //触发事件
    addMember() {
      this.dialogInfo.type = "addMember";
      this.dialogInfo.title = "新增成员信息";
      this.memberFormVisible = true;
    },
    memberEdit(row) {
      this.memberForm = row;
      this.memberForm.sId = row.sid;
      this.dialogInfo.type = "editMember";
      this.dialogInfo.title = "修改成员信息";
      this.memberFormVisible = true;
    },

    saveMemberForm() {
      this.$refs[this.memberForm].validate((valid) => {
        if (valid) {
          if (this.dialogInfo.type === "addMember") {
            req("insertData", { ...this.memberForm }).then((data) => {
              console.log(data.data);
              if (data.code === 1) {
                this.$message.success(data.msg);
                this.fetch();
                this.$refs[this.memberForm].resetFields();
                this.memberFormVisible = false;
              } else {
                this.$message.error(data.msg);
              }
            });
          }
          if (this.dialogInfo.type === "editMember") {
            req("updateData", { ...this.memberForm }).then((data) => {
              console.log(data.data);
              if (data.code === 1) {
                this.$message.success(data.msg);
                this.fetch();
                this.$$refs[this.memberForm].resetFields();
                this.memberFormVisible = false;
              } else {
                this.$message.error(data.msg);
              }
            });
          }
        }
      });
    },
    cancelMemberForm() {
      this.$refs[this.memberForm].resetFields();
      this.memberFormVisible = false;
    },

    memberDelete(row) {
      this.$confirm("此操作将永久删除该文件,是否继续?").then(() => {
        let memberId = row.memberId.toString();
        req("deleteData", { memberId: memberId }).then((data) => {
          this.$message.success(data.msg);
          this.fetch();
        });
      });
    },
    memberDeleteList() {
      if (this.multipleSelection.length === 0) {
        this.$message.info("请选择需要删除的数据");
        return;
      }
      this.$confirm("此操作将永久删除该文件,是否继续?").then(() => {
        let memberIdList = this.multipleSelection
          .map((item) => {
            return item.memberId;
          })
          .toString();
        req("deleteData", { memberId: memberIdList }).then((data) => {
          this.$message.success(data.msg);
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