<template>
  <div>
    <div class="main-head" :model="search">
      <dl>
        <dd>
          <el-input
            v-model="search.account"
            placeholder="请输入账号"
            clearable
          ></el-input>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-select v-model="search.identity" placeholder="请选择">
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
    </div>
    <div class="info_table">
      <el-table :data="tableData" border style="width: 100%" height="500px">
        <el-table-column
          fixed
          prop="userId"
          label="Id"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="account"
          label="账号"
          width="200"
        ></el-table-column>
        <el-table-column prop="name" label="姓名" width="200"></el-table-column>
        <el-table-column
          prop="identity"
          label="身份"
          width="200"
        ></el-table-column>
        <el-table-column prop="sex" label="性别" width="200"></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200"
        ></el-table-column>

        <el-table-column label="操作" width="500">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="modifyUser(scope.row)"
              >修改用户信息</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="deletedUser(scope.row)"
              >删除用户信息</el-button
            >
          </template>
        </el-table-column>
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
          <el-form-item >
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
          <el-form-item
            label="账号"
            prop="account"
            :label-width="formLabelWidth"
          >
            <el-input v-model="userForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd" :label-width="formLabelWidth">
            <el-input
              v-model="userForm.pwd"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item
            label="身份"
            prop="identity"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="userForm.identity"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="userFormVisible = false">取 消</el-button>
          <!--要修改的地方-->
          <el-button type="primary" @click="saveUserForm">确 定</el-button>
        </div>
      </el-dialog>

      <!--学生信息-->
      <el-dialog title="学生信息" :visible.sync="studentFormVisible">
        <el-form :model="studentForm" :rules="studentRules" :ref="studentForm">
          <el-form-item label="姓名" prop="sName" :label-width="formLabelWidth">
            <el-input v-model="studentForm.sName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="studentForm.sex" placeholder="请选择">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="手机号"
            prop="phone"
            :label-width="formLabelWidth"
          >
            <el-input v-model="studentForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
            <el-input v-model="studentForm.email" autocomplete="off"></el-input>
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
          <el-form-item
            label="身份证号码"
            prop="idCar"
            :label-width="formLabelWidth"
          >
            <el-input v-model="studentForm.idCar" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="联系人"
            prop="concats"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="studentForm.concats"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="联系人电话"
            prop="cPhone"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="studentForm.cPhone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="家庭地址"
            prop="hAddress"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="studentForm.hAddress"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="家庭邮编"
            prop="postCode"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="studentForm.postCode"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="家庭状况"
            prop="hState"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="studentForm.hState"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="父亲姓名"
            prop="fName"
            :label-width="formLabelWidth"
          >
            <el-input v-model="studentForm.fName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="父亲电话"
            prop="fPhone"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="studentForm.fPhone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="母亲姓名"
            prop="mName"
            :label-width="formLabelWidth"
          >
            <el-input v-model="studentForm.mName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="母亲电话"
            prop="mPhone"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="studentForm.mPhone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="mark" :label-width="formLabelWidth">
            <el-input v-model="studentForm.mark" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state" :label-width="formLabelWidth">
            <el-select v-model="studentForm.state" placeholder="请选择">
              <el-option label="在读" value="0"></el-option>
              <el-option label="已毕业" value="1"></el-option>
              <el-option label="休学" value="2"></el-option>
            </el-select>
          </el-form-item>
          <!--待修改-->
          <el-form-item label="班级" :label-width="formLabelWidth">
            <el-select v-model="studentForm.class" placeholder="请选择">
              <el-option
                v-for="item in classList"
                :key="item.classesId"
                :label="item.classesName"
                :value="item.classesId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!--待修改补充-->
          <el-button @click="studentFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveStudentForm">确 定</el-button>
        </div>
      </el-dialog>

      <!--老师信息-->
      <el-dialog title="老师信息" :visible.sync="teacherFormVisible">
        <el-form :model="teacherForm" :rules="teacherRules" :ref="teacherForm">
          <el-form-item label="姓名" prop="tName" :label-width="formLabelWidth">
            <el-input v-model="teacherForm.tName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
            <el-select v-model="teacherForm.sex" placeholder="请选择">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="手机号码"
            prop="tPhone"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="teacherForm.tPhone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
            <el-input v-model="teacherForm.email" autocomplete="off"></el-input>
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
          <el-form-item
            label="身份证号码"
            prop="idCar"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="teacherForm.idCard"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="毕业学校"
            prop="graduationSchool"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="teacherForm.graduationSchool"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="毕业日期" prop="graduationYear" required>
            <el-date-picker
              v-model="teacherForm.graduationYear"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item> -->
          <el-form-item
            label="学历"
            prop="education"
            :label-width="formLabelWidth"
          >
            <el-select v-model="teacherForm.education" placeholder="请选择">
              <el-option label="本科" value="0"></el-option>
              <el-option label="研究生" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="学位"
            prop="academicDegree"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="teacherForm.academicDegree"
              placeholder="请选择"
            >
              <el-option label="学士" value="0"></el-option>
              <el-option label="硕士" value="1"></el-option>
              <el-option label="博士" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="所学专业"
            prop="major"
            :label-width="formLabelWidth"
          >
            <el-input v-model="teacherForm.major" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state" :label-width="formLabelWidth">
            <el-select v-model="teacherForm.state" placeholder="请选择">
              <el-option label="在校" value="0"></el-option>
              <el-option label="离职" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="mark" :label-width="formLabelWidth">
            <el-input v-model="teacherForm.mark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="teacherFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveTeacherForm">确 定</el-button>
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
      classList: [],
      search: {
        account: "",
        identity: "",
        offset: "",
        limit: "",
      },
      options: [
        {
          value: "manager",
          label: "管理员",
        },
        {
          value: "schoolmaster",
          label: "校长",
        },
        {
          value: "headmaster",
          label: "班主任",
        },
        {
          value: "assistant",
          label: "班级助理",
        },
        {
          value: "subject",
          label: "科任老师",
        },
        {
          value: "student",
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
        identity: "",
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
        studentId: "",
        sName: "",
        sex: "",
        phone: "",
        eamil: "",
        birthday: "",
        idCar: "",
        concats: "",
        cPhone: "",
        hAddress: "",
        postCode: "",
        hState: "",
        fName: "",
        fPhone: "",
        mName: "",
        mPhone: "",
        state: "",
        mark: "",
        classId: "",
      },
      classList: [],
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
        id: "",
        tName: "",
        sex: "",
        tPhone: "",
        email: "",
        birthday: "",
        idCar: "",
        graduationSchool: "",
        graduationYear: "",
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
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" },
        ],
        idCard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          { validator: vaildateIdCar, trigger: "blur" },
        ],
      },
      imageUrl: "",
      myUserInfo: {
        userId: "",
        identity: "",
      },
      id:"",
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    //获取用户信息
    getMyUserInfo() {
      this.myUserInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    },
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

    //刷新页面
    fetch() {
      this.pageInfo.pageSize = 5;
      this.pageInfo.currentPage = 1;
      this.searchData();
      this.getClassList();
    },

    getClassList() {
      req("getClassList", {}).then((data) => {
        if (data.code === 1) {
          this.classList = data.data;
          console.log(this.classList);
        } else {
          this.$message.error(data.msg);
        }
      });
    },

    searchData() {
      this.search.offset = this.pageInfo.currentPage;
      this.search.limit = this.pageInfo.pageSize;
      req("searchData", {
        ...this.search,
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
      this.id = row.userId;

      if (row.identity === "student") {
        this.dialogInfo.type = "modifyStudent";
        this.dialogInfo.title = "修改";
        req("getStudentInfoById", { ...this.id }).then((data) => {
          if (data.code === 1) {
            this.studentForm = data.data;
          } else {
            this.$message.error(data.msg);
          }
        });
        this.studentFormVisible = true;
      }
      if (
        row.identity === "headmaster" ||
        row.identity === "assistant" ||
        row.identity === "subject"
      ) {
        this.dialogInfo.type = "modifyTeacher";
        this.dialogInfo.title = "修改";
        req("getTeacherInfoById", { ...this.id }).then((data) => {
          if (data.code === 1) {
            console.log(data.data);
            this.teacherForm = data.data;
          } else {
            this.$message.error(data.msg);
          }
        });
        this.teacherFormVisible = true;
      }
    },
    saveUserForm() {
      this.userFormVisible = false;
      if (this.dialogInfo.type === "addUser") {
        if (
          this.userForm.identity === "manager" ||
          this.userForm.identity === "schoolmaster"
        ) {
          req("insertUser", { ...this.userForm }).then((data) => {
            console.log(data.data);
            this.$refs[this.userForm].resetFields();
            this.$message.success(data.msg);
            this.fetch();
            this.userFormVisible = false;
          });
        }
        if (this.userForm.identity === "student") {
          this.dialogInfo.type = "addStudent";
          this.dialogInfo.title = "新增";
          this.studentFormVisible = true;
        }
        if (
          this.userForm.identity === "headmaster" ||
          this.userForm.identity === "assistant" ||
          this.userForm.identity === "subject"
        ) {
          console.log(1);
          this.dialogInfo.type = "addTeacher";
          this.dialogInfo.title = "新增";
          this.teacherFormVisible = true;
        }
      }
    },

    saveStudentForm() {
      if (this.dialogInfo.type === "addStudent") {
        //发起添加用户请求
        // req("insertUser", { ...this.userForm }).then((data) => {
        //   if (data.code === 1) {
        //     this.$refs[this.userForm].resetFields();
        //     this.studentForm.studentId = data.data;
        //     console.log(this.studentForm.studentId);
        //   } else {
        //     this.$message.error(data.msg);
        //   }
        // });
        req("insertStudent", { ...this.studentForm, ...this.userForm }).then(
          (data) => {
            if (data.code === 1) {
              this.fetch();
              this.$refs[this.studentForm].resetFields();
              this.$refs[this.userForm].resetFields();
              this.studentFormVisible = false;
            } else {
              this.$message.error(data.msg);
            }
          }
        );
      }
      if (this.dialogInfo.type === "modifyStudent") {
        // req("modifyUser", { ...this.userForm }).then((data) => {
        //   if (data.code === 1) {
        //     this.$refs[this.userForm].resetFields();
        //   } else {
        //     this.$message.error(data.msg);
        //   }
        // });
        req("updateStudent", { ...this.studentForm, ...this.userForm }).then(
          (data) => {
            if (data.code === 1) {
              this.fetch();
              this.$refs[this.studentForm].resetFields();
              this.$refs[this.userForm].resetFields();
              this.studentFormVisible = false;
            } else {
              this.$message.error(data.msg);
            }
          }
        );
      }
    },

    saveTeacherForm() {
      if (this.dialogInfo.type === "addTeacher") {
        // //发起添加用户请求
        // req("insertUser", { ...this.userForm }).then((data) => {
        //   if (data.code === 1) {
        //     this.$refs[this.userForm].resetFields();
        //     console.log(data.data.userId);
        //     this.teacherForm.id = data.data.userId;
        //     console.log(this.teacherForm.id);
        //   } else {
        //     this.$message.error(data.msg);
        //   }
        // });
        req("insertTeacher", { ...this.teacherForm, ...this.userForm }).then(
          (data) => {
            if (data.code === 1) {
              this.fetch();
              this.$refs[this.teacherForm].resetFields();
              this.$refs[this.userForm].resetFields();
              this.teacherFormVisible = false;
            } else {
              this.$message.error(data.msg);
            }
          }
        );
      }
      if (this.dialogInfo.type === "modifyTeacher") {
        // //发起添加用户请求
        // req("modifyUser", { ...this.userForm }).then((data) => {
        //   if (data.code === 1) {
        //     this.$refs[this.userForm].resetFields();
        //   } else {
        //     this.$message.error(data.data.msg);
        //   }
        // });
        req("updateTeacher", { ...this.teacherForm, ...this.userForm }).then(
          (data) => {
            if (data.code === 1) {
              this.fetch();
              this.$refs[this.teacherForm].resetFields();
              this.$refs[this.userForm].resetFields();
              this.teacherFormVisible = false;
            } else {
              this.$message.error(data.msg);
            }
          }
        );
      }
    },
    deletedUser(row) {
      this.$confirm("此操作将永久删除,是否继续?").then(() => {
        let userId = row.userId.toString();
        let identity = row.identity.toString();
        req("deleteData", { userId: userId }).then((data) => {
          if (data.code === 1) {
            if (identity === "student") {
              req("deleteStudent", { userId: userId }).then((sData) => {
                if (sData.code !== 1) {
                  this.$message.error(sData.msg);
                }
              });
            }
            if (identity === "teacher") {
              req("deleteTeacher", { userId: userId }).then((tData) => {
                if (tData.code !== 1) {
                  this.$message.error(tData.msg);
                }
              });
            }
            this.$message.success(data.msg);
            this.fetch();
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },

    cancelUserForm() {
      this.$refs[this.userForm].resetFields();
      this.userFormVisible = false;
    },
    cancelStudentForm() {
      this.$refs[this.studentForm].resetFields();
      this.studentFormVisible = false;
    },
    cancelTeacherForm() {
      this.$refs[this.teacherForm].resetFields();
      this.teacherFormVisible = false;
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
          if (data.code === 1) {
            if (identity === "student") {
              req("deleteStudent", { userId: userId }).then((sData) => {
                if (sData.code !== 1) {
                  this.$message.error(sData.msg);
                }
              });
            }
            if (identity === "teacher") {
              req("deleteTeacher", { userId: userId }).then((tData) => {
                if (tData.code !== 1) {
                  this.$message.error(tData.msg);
                }
              });
            }
            this.$message.success(data.msg);
            this.fetch();
          } else {
            this.$message.error(data.msg);
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