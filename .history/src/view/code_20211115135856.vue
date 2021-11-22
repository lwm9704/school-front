<template>
  <div>
    <div class="main-head" :model="search">
      <dl>
        <dd>
          <el-input v-model="search.describe" placeholder="编码描述" clearable></el-input>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-select v-model="search.state" placeholder="编码状态">
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
          <el-button type="primary" @click="addCode">新增编码</el-button>
        </dd>
      </dl>
      <dl>
        <dd>
          <el-button type="primary" @click="deleteDetailList">删除所选</el-button>
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
      <el-table-column label="编码" prop="code" width="120"></el-table-column>
      <el-table-column label="编码描述" prop="description" width="120"></el-table-column>
      <el-table-column prop="codeValueDescribe" label="编码值描述" width="120"></el-table-column>
      <el-table-column prop="codeValue" label="编码值" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="modifyCode(scope.row)">编码编辑</el-button>
          <el-button size="mini" @click="addDetail(scope.row)">新增编码详情</el-button>
          <el-button size="mini" @click="modifyDetail(scope.row)">编码详情编码</el-button>
          <el-button size="mini" @click="deleteDetail(scope.row)">删除编码详情编码</el-button>
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

    <!--编码-->
    <el-dialog :title="dialogInfo.title" :visible.sync="codeFormVisible">
      <el-form :model="codeForm">
        <el-form-item label="编码" :label-width="formLabelWidth">
          <el-input v-model="codeForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码描述" :label-width="formLabelWidth">
          <el-input v-model="detailForm.describe" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="codeFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCodeForm">确 定</el-button>
      </div>
    </el-dialog>
    <!--编码详情-->
    <el-dialog :title="dialogInfo.title" :visible.sync="detailFormVisible">
      <el-form :model="detailForm">
        <el-form-item label="编码值" :label-width="formLabelWidth">
          <el-input v-model="detailForm.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码值描述" :label-width="formLabelWidth">
          <el-input v-model="detailForm.describe" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="detailForm.state" clearable placeholder="请选择">
            <el-option
              v-for="item in state"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDetailForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import req from "../js/code";
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
      //编码表单
      codeFormVisible: false,
      codeForm: {
        codeId: "",
        code: "",
        describe: ""
      },
      //详情表单
      detailFormVisible: false,
      detailForm: {
        value: "",
        describe: "",
        state: ""
      },
      formLabelWidth: "120px",
      //搜索，按钮
      search: {
        describe: "",
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
  mounted() {
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
    //多选
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
    //刷新页面
    fetch() {
      this.pageInfo.pageSize = 5;
      this.pageInfo.pageIndex = 1;
      this.searchData();
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
        this.pageInfo.pageSize = data.data.pageSize;
        this.pageInfo.currentPage = data.data.currentPage;
        this.pageInfo.total = data.data.total;
      });
    },
    //重置
    reset() {
      this.fetch();
      console.log("重置按钮被点击了");
    },
    addCode() {
      this.pageInfo.type = "addCode";
      this.pageInfo.title = "新增编码";
      this.codeFormVisible = true;
    },
    modifyCode(row) {
      this.codeForm = row;
      this.pageInfo.type = "modifyCode";
      this.pageInfo.title = "修改编码";
      this.codeFormVisible = true;
    },
    addDetail(row) {
      this.detailForm.codeId = row.codeId;
      this.pageInfo.type = "addDetail";
      this.pageInfo.title = "新增编码详情";
    },
    modifyDetail(row) {
      this.detailForm.codeId = row.codeId;
      this.detailForm.value = row.value;
      this.detailForm.describe = row.describe;
      this.detailForm.state = row.state;
      pageInfo.type = "modifyDetail";
      pageInfo.title = "修改编码值";
      this.detailFormVisible = true;
    },
    saveCodeForm() {
      this.$refs.codeForm.validate(valid => {
        if (valid) {
          if (this.dialogInfo.type === "addCode") {
            req("insertData", { ...this.codeForm }).then(data => {
              console.log(data.data);
              if (data.data.code === 1) {
                this.$message.success(data.data.msg);
                this.fetch();
                this.$refs.codeForm.resetFields();
                this.codeFormVisible = false;
              } else {
                this.$message.error(data.data.msg);
              }
            });
          }
          if (this.dialogInfo.type === "modifyCode") {
            req("updateData", { ...codeForm }).then(data => {
              console.log(data.data);
              if (data.data.code === 1) {
                this.$message.success(data.data.msg);
                this.fetch();
                this.codeForm.resetFields();
                this.codeFormVisible = false;
              } else {
                this.$message.error(data.data.msg);
              }
            });
          }
        }
      });
    },
    saveDetailForm() {
      this.$refs.detailForm.validate(valid => {
        if (valid) {
          if (this.dialogInfo.type === "addDetail") {
            req("insertDetailData", { ...this.detailForm }).then(data => {
              console.log(data.data);
              if (data.data.code === 1) {
                this.$message.success(data.data.msg);
                this.fetch();
                this.$refs.detailForm.resetFields();
                this.detailFormVisible = false;
              } else {
                this.$message.error(data.data.msg);
              }
            });
          }
          if (this.dialogInfo.type === "modifyDetail") {
            req("updateDetailData", { ...detailForm }).then(data => {
              console.log(data.data);
              if (data.data.code === 1) {
                this.$message.success(data.data.msg);
                this.fetch();
                this.detailForm.resetFields();
                this.detailFormVisible = false;
              } else {
                this.$message.error(data.data.msg);
              }
            });
          }
        }
      });
    },
    deleteDetail(row) {
      this.$confirm("此操作将永久删除该文件,是否继续?").then(() => {
        let codeDetailId = row.codeDetailId.toString();
        req("deleteDetailData", { codeDetailId: codeDetailId }).then(data => {
          this.$message.success(data.data.msg);
          this.fetch();
        });
      });
    },
    deleteDetailList() {
      if (this.multipleSelection.length === 0) {
        this.$message.info("请选择需要删除的数据");
        return;
      }
      this.$confirm("此操作将永久删除该文件,是否继续?").then(() => {
        let codeDetailIdList = this.multipleSelection
          .map(item => {
            return item.codeDetailId;
          })
          .toString();
        req("deleteDetailData", { codeDetailId: codeDetailIdList }).then(
          data => {
            this.$message.success(data.data.msg);
            this.fetch();
          }
        );
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
  display: flex;
  flex-direction: row;
}
</style>