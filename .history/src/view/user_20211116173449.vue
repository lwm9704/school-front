<template>
  <div>
    <div class="main-head" :model="search">
      <dl>
        <dd>
          <el-input
            v-model="search.name"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-select v-model="search.role" placeholder="请选择">
            <el-option
              v-for="item in options"
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
          <el-button type="primary" @click="addUser">新增用户</el-button>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-button type="primary" @click="modifyUser">修改用户</el-button>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-button type="primary" @click="deletedUser">删除用户</el-button>
        </dd>
      </dl>
    </div>
    <div class="info_table">
      <el-table :data="tableData" border style="width: 100%" height="250">
        <el-table-column
          fixed
          prop="id"
          label="Id"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="user.account"
          label="账号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="user.name"
          label="姓名"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="user.role"
          label="身份"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="user.sex"
          label="性别"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="user.phone"
          label="手机号码"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="user.email"
          label="邮箱"
          width="120"
        ></el-table-column>
      </el-table>
    </div>

    <div class="paging">
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

    <!--新增用户-->
    <div class="dialog-form-account">
      <el-dialog title="新增用户" :visible.sync="userFormVisible">
        <el-form :model="userForm" :rules="userRules" :ref="userForm">
          <el-form-item>
            <!--用户上传头像-->
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="userForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input
              v-model="userForm.pwd"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="身份" :label-width="formLabelWidth">
            <el-input v-model="userForm.role" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="userFormVisible = false">取 消</el-button>
          <!--要修改的地方-->
          <el-button type="primary" @click="userFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>

      <!--学生信息-->
      <el-dialog title="学生信息" :visible.sync="studentFormVisible">
        <el-form :model="studentForm" :rules="studentRules" :ref="studentForm">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="studentForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="studentForm.sex" placeholder="请选择">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input
              v-model="studentForm.sPhone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input
              v-model="studentForm.sEmail"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday" required>
            <el-date-picker
              v-model="studentForm.birthday"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="身份证号码" :label-width="formLabelWidth">
            <el-input
              v-model="studentForm.idCard"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系人" :label-width="formLabelWidth">
            <el-input
              v-model="studentForm.concat"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系人电话" :label-width="formLabelWidth">
            <el-input
              v-model="studentForm.cPhone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="家庭地址" :label-width="formLabelWidth">
            <el-input
              v-model="studentForm.address"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="家庭邮编" :label-width="formLabelWidth">
            <el-input
              v-model="studentForm.postCode"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="家庭状况" :label-width="formLabelWidth">
            <el-input
              v-model="studentForm.homeState"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="父亲姓名" :label-width="formLabelWidth">
            <el-input
              v-model="studentForm.faName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="父亲电话" :label-width="formLabelWidth">
            <el-input
              v-model="studentForm.faPhone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="母亲姓名" :label-width="formLabelWidth">
            <el-input
              v-model="studentForm.moName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="母亲电话" :label-width="formLabelWidth">
            <el-input
              v-model="studentForm.moPhone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="studentForm.mark" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-select v-model="studentForm.state" placeholder="请选择">
              <el-option label="在读" value="0"></el-option>
              <el-option label="已毕业" value="1"></el-option>
              <el-option label="休学" value="2"></el-option>
            </el-select>
          </el-form-item>
          <!--待修改-->
          <el-form-item label="班级" :label-width="formLabelWidth">
            <el-select v-model="studentForm.class" placeholder="请选择">
              <el-option label="在读" value="0"></el-option>
              <el-option label="已毕业" value="1"></el-option>
              <el-option label="休学" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!--待修改补充-->
          <el-button @click="studentFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="studentFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>

      <!--老师信息-->
      <el-dialog title="老师信息" :visible.sync="teacherFormVisible">
        <el-form :model="teacherForm" :rules="teacherRules" :ref="teacherForm">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="teacherForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="teacherForm.sex" placeholder="请选择">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input
              v-model="teacherForm.tPhone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input
              v-model="teacherForm.tPhone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input
              v-model="teacherForm.tEmail"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday" required>
            <el-date-picker
              v-model="teacherForm.birthday"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="身份证号码" :label-width="formLabelWidth">
            <el-input
              v-model="teacherForm.tIdCard"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="毕业学校" :label-width="formLabelWidth">
            <el-input
              v-model="teacherForm.school"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="学历" :label-width="formLabelWidth">
            <el-select v-model="teacherForm.education" placeholder="请选择">
              <el-option label="本科" value="0"></el-option>
              <el-option label="研究生" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学位" :label-width="formLabelWidth">
            <el-select
              v-model="teacherForm.academicDegree"
              placeholder="请选择"
            >
              <el-option label="学士" value="0"></el-option>
              <el-option label="硕士" value="1"></el-option>
              <el-option label="博士" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所学专业" :label-width="formLabelWidth">
            <el-input v-model="teacherForm.major" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-select v-model="teacherForm.state" placeholder="请选择">
              <el-option label="在校" value="0"></el-option>
              <el-option label="离职" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="teacherForm.mark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="teacherFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="teacherFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import req from "../js/user";
import {
  validateMobilePhone,
  vaildateIdCar,
  validateEmail,
} from "../js/validate";
export default {
  data() {
    return {
      tableData: [],
      search: {
        name: "",
        role: "",
      },
      options: [
        {
          value: 0,
          label: "管理员",
        },
        {
          value: 1,
          label: "校长",
        },
        {
          value: 2,
          label: "班主任",
        },
        {
          value: 3,
          label: "班级助理",
        },
        {
          value: 4,
          label: "学生",
        },
      ],
      formLabelWidth: "120px",
      pageInfo: {
        layout: [],
        pageSize: 10,
        currentPage: 1,
        total: "",
        rows: "",
      },
      dialogInfo: {
        type: "",
        title: "",
      },
      manageFormVisible: false,
      manageForm: {
        id: "",
        account: "",
        name: "",
        role: "",
        sex: "",
        phone: "",
        email: "",
      },
      userFormVisible: false,
      userForm: {
        img: "",
        account: "",
        pwd: "",
        role: "",
      },
      userRules: {
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
      studentFormVisible: false,
      studentForm: {
        name: "",
        sex: "",
        sPhone: "",
        sEamil: "",
        birthday: "",
        idCard: "",
        concat: "",
        cPhone: "",
        address: "",
        homeState: "",
        homeState: "",
        faName: "",
        faPhone: "",
        moName: "",
        moPhone: "",
        state: "",
        mark: "",
        class: "",
        classes: [],
      },
      studentRules: {
        sPhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: validateMobilePhone, trigger: "blur" },
        ],
        sEmail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" },
        ],
        idCard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          { validator: vaildateIdCar, trigger: "blur" },
        ],
        cPhone: [
          { required: true, message: "请输入联系人手机号码", trigger: "blur" },
          { validator: validateMobilePhone, trigger: "blur" },
        ],
        faPhone: [
          { required: true, message: "请输入父亲手机号码", trigger: "blur" },
          { validator: validateMobilePhone, trigger: "blur" },
        ],
        moPhone: [
          { required: true, message: "请输入母亲手机号码", trigger: "blur" },
          { validator: validateMobilePhone, trigger: "blur" },
        ],
      },
      teacherFormVisible: false,
      teacherForm: {
        name: "",
        sex: "",
        tPhone: "",
        tEmail: "",
        birthday: "",
        tIdCard: "",
        school: "",
        education: "",
        academicDegree: "",
        major: "",
        state: "",
        mark: "",
      },
      teacherRules: {
        tPhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: validateMobilePhone, trigger: "blur" },
        ],
        tEmail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" },
        ],
        tIdCard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          { validator: vaildateIdCar, trigger: "blur" },
        ],
      },
      imageUrl: "",
    };
  },
  methods: {
    //分页组件的方法
    //每一页的大小
    handleSizeChange(newSize) {
      this.pageInfo.pageSize = newSize;
      this.getList();
    },
    //当前所在页面
    handleCurrentChange(newPage) {
      this.pageInfo.currentPage = newPage;
      this.getList();
    },

    //头像上传时调用的方法
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //头像上传时的条件
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    searchData() {
      req("searchData", {
        ...this.userForm,
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
    addUser() {
      this.userFormVisible = true;
      this.dialogInfo.type = "addUser";
      this.dialogInfo.title = "新增用户";
    },
    modifyUser(row) {
      this.userForm = true;
      this.dialogInfo.type = "modifyUser";
      this.dialogInfo.title = "修改用户信息";
    },
    saveUserForm() {
      this.$refs[this.userForm].validate((valid) => {
        
      })
      if (this.dialogInfo.type == "addUser") {
        req("insertUser", {
          ...this.userForm,
        }).then((data) => {
          if (data.data.code === 1) {
            this.userFormVisible = false;
            if (this.userForm.role === "student") {
              this.dialogInfo.type = "addStudent";
              this.dialogInfo.title = "新增";
              this.studentFormVisible = true;
            }
            if (this.userForm.role === "teacher") {
              this.dialogInfo.type = "addTeacher";
              this.dialogInfo.title = "新增";
              this.teacherFormVisible = true;
            }
          } else {
            this.$message.error(data.data.msg);
          }
        });
      }
      if (this.dialogInfo.type === "modifyUser") {
        req("updateUser", { ...this.userForm }).then((data) => {
          if (data.data.code === 1) {
            this.userFormVisible = false;
            if (this.userForm.role === "student") {
              this.dialogInfo.type = "modifyStudent";
              this.dialogInfo.title = "修改";
              this.studentForm = true;
            }
            if (this.userForm.role === "teacher") {
              this.dialogInfo.type = "modifyTeacher";
              this.dialogInfo.title = "修改";
              this.teacherFormVisible = true;
            }
          } else {
            this.$message.error(data.data.msg);
          }
        });
      }
      this.$refs[this.userForm].resetFields();
    },

    saveStudentForm() {
      if (this.dialogInfo.type === "addStudent") {
        req("insertStudent", { ...this.studentForm }).then((data) => {
          if (data.data.code === 1) {
            this.fetch();
            this.$refs[this.studentForm].resetFields();
            this.$refs[this.userForm].resetFields();
            this.studentFormVisible = false;
          } else {
            this.$message.error(data.data.msg);
          }
        });
      }
      if (this.dialogInfo.type === "modifyStudent") {
        req("modifyStudent", { ...this.studentForm }).then((data) => {
          if (data.data.code === 1) {
            this.fetch();
            this.$refs[this.studentForm].resetFields();
            this.$refs[this.userForm].resetFields();
            this.studentFormVisible = false;
          } else {
            this.$message.error(data.data.msg);
          }
        });
      }
    },

    saveTeacherForm() {
      if (this.dialogInfo.type === "addTeacher") {
        req("insertTeacher", { ...this.teacherForm }).then((data) => {
          if (data.data.code === 1) {
            this.fetch();
            this.$refs[this.teacherForm].resetFields();
            this.$refs[this.userForm].resetFields();
            this.teacherFormVisible = false;
          } else {
            this.$message.error(data.data.msg);
          }
        });
      }
      if (this.dialogInfo.type === "modifyTeacher") {
        req("modifyTeacher", { ...this.teacherForm }).then((data) => {
          if (data.data.code === 1) {
            this.fetch();
            this.$refs[this.teacherForm].resetFields();
            this.$refs[this.userForm].resetFields();
            this.teacherFormVisible = false;
          } else {
            this.$message.error(data.data.msg);
          }
        });
      }
    },
    deletedUser(row) {
      this.$confirm("此操作将永久删除,是否继续?").then(() => {
        let userId = row.userId.toString();
        let role = row.role.toString();
        req("deleteData", { userId: userId }).then((data) => {
          if (data.data.code === 1) {
            if (role === "student") {
              req("deleteStudent", { userId: userId }).then((sData) => {
                if (sData.data.code !== 1) {
                  this.$message.error(sData.data.msg);
                }
              });
            }
            if (role === "teacher") {
              req("deleteTeacher", { userId: userId }).then((tData) => {
                if (tData.data.code !== 1) {
                  this.$message.error(tData.data.msg);
                }
              });
            }
            this.$message.success(data.data.msg);
            this.fetch();
          } else {
            this.$message.error(data.data.msg);
          }
        });
      });
    },

    deleteUserList() {
      if (this.multipleSelection.length === 0) {
        this.$message.info("请选择需要删除的数据");
        return;
      }
      this.$confirm("此操作将永久删除该文件,是否继续?").then(() => {
        let userIdList = this.multipleSelection
          .map((item) => {
            return item.userId;
          })
          .toString();
        req("deleteData", { userId: userIdList }).then((data) => {
          if (data.data.code === 1) {
            if (role === "student") {
              req("deleteStudent", { userId: userId }).then((sData) => {
                if (sData.data.code !== 1) {
                  this.$message.error(sData.data.msg);
                }
              });
            }
            if (role === "teacher") {
              req("deleteTeacher", { userId: userId }).then((tData) => {
                if (tData.data.code !== 1) {
                  this.$message.error(tData.data.msg);
                }
              });
            }
            this.$message.success(data.data.msg);
            this.fetch();
          } else {
            this.$message.error(data.data.msg);
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
//用户上传头像样式
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.main-head {
  display: flex;
  flex-direction: row;
}
</style>