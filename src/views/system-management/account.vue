<template>
  <div class="app-container">
    <!-- 查询工具条 -->
    <el-row>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
        <el-form :inline="true">
          <span class="main-text">帐号:</span>
          <el-input v-model="actAccount" placeholder="请输入帐号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
          <span class="main-text">姓名:</span>
          <el-input v-model="actName" placeholder="请输入姓名" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
          <span class="main-text">手机号码:</span>
          <el-input v-model="actPhone" placeholder="请输入手机号码" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
          <el-form-item>
            <el-button type="primary" @click="handleFilter">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 新增工具条 -->
    <el-row class="toolnbar-add">
      <el-col :span="8" class="name-bar main-text">
        <svg-icon icon-class="list" class-name="card-panel-icon" />
        <b>帐号列表</b>
      </el-col>
      <el-col :span="16" style="text-align:right">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAddAccount">新增</el-button>
        <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEditTop">修改</el-button>
        <el-button type="primary" size="small" icon="el-icon-delete" @click="handleDeleteTop">删除</el-button>
      </el-col>
    </el-row>

    <!--列表-->
    <el-table v-loading="loading" :data="accountList" highlight-current-row border fit stripe @selection-change="selsChange">
      <el-table-column type="selection" width="40" align="center"/>
      <el-table-column prop="actAccount" label="帐号" sortable align="center"/>
      <el-table-column prop="actName" label="姓名" align="center"/>
      <el-table-column prop="actPhone" label="手机号码" width="110" align="center"/>
      <el-table-column prop="actEmail" label="邮箱地址" width="200" align="center"/>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{ scope.row.actActive | statusFilter }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.actGender | genderFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="actAddTime" label="创建时间" align="center"/>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope" >
          <el-switch
            v-model="scope.row.actActive"
            :active-value="activeValue"
            :inactive-value= "inactiveValue"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleChangeStatus(scope.$index, scope.row)"/>
          <el-button type="text" size="medium" @click="handleResetPwd(scope)">重置密码</el-button>
          <el-button type="text" size="medium" @click="handleEdit(scope)">修改</el-button>
          <el-button type="text" size="medium" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'修改帐号':'添加帐号'" width="50%">
      <el-form ref="form" :model="account" :rules="formRules" label-width="80px" label-position="left">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="帐号" prop="actAccount">
              <el-input v-model="account.actAccount" :disabled="dialogType==='edit'" :maxlength="20" placeholder="帐号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="actName">
              <el-input v-model="account.actName" :maxlength="20" placeholder="姓名" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="手机号" prop="actPhone">
              <el-input v-model="account.actPhone" :maxlength="20" placeholder="手机号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱地址">
              <el-input v-model="account.actEmail" placeholder="邮箱地址" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="性别">
              <el-radio v-model="account.actGender" :label="1">女</el-radio>
              <el-radio v-model="account.actGender" :label="2">男</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="帐号状态">
              <el-radio v-model="account.actActive" :label="1">启用</el-radio>
              <el-radio v-model="account.actActive" :label="0">禁用</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="dialogType=='new'" class="note-text">默认初始密码为：123456</div>

        <el-row type="flex" justify="center" class="transfer-container">
          <el-transfer
            ref="roleTransfer"
            v-model="account.roleIds"
            :data="roles"
            :props="{ key: 'roeId', label: 'roeName' }"
            :titles="['备选角色', '已选角色']"/>
        </el-row>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>

    <!--工具条-->
    <el-col v-if="showFlag" :span="24" class="toolbar toolbar-container">
      <el-pagination
        :total="total"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pagesize"
        style="float:right;"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="changePageSize"/>
    </el-col>
  </div>
</template>

<script>
import { getRoleList, getAccountGrid, changeAccountStatus, resetPwd, addAccount, editAccount, deleteAccount } from '@/api/userManage'
import { deepClone } from '@/utils'

const defaultAccount = {
  actId: 1,
  actAccount: '',
  actName: '',
  actPhone: '',
  actEmail: '',
  actGender: 1,
  actActive: 1,
  roleIds: []
}

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '已启用',
        0: '已禁用'
      }
      return statusMap[status]
    },
    genderFilter(gender) {
      const genderMap = {
        1: '女',
        2: '男'
      }
      return genderMap[gender]
    }
  },
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          value: i,
          desc: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      datat: generateData(),
      value: [],
      account: Object.assign({}, defaultAccount),
      dialogVisible: false,
      dialogType: 'new',
      loading: false,
      total: 0,
      page: 1,
      pagesize: 10,
      sels: [], // 列表选中列
      accountList: [],
      actAccount: '',
      actName: '',
      actPhone: '',
      activeValue: 1,
      inactiveValue: 0,
      roles: [],
      formRules: {
        actAccount: [
          { required: true, message: '请输入帐号名', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    showFlag() {
      return this.total > 10
    }
  },
  created() {
    this.handleGetAccount()
    this.handleGetRoleList()
  },
  methods: {
    handleGetAccount() {
      this.loading = true
      const para = {
        page: this.page,
        pagesize: this.pagesize
      }
      getAccountGrid(para).then(res => {
        this.accountList = res.data.list
        this.total = res.data.total
        this.loading = false
      }).catch(res => {
        this.loading = false
      })
    },

    async handleGetRoleList() {
      const res = await getRoleList()
      this.roles = res.data
    },

    reverseStatus(number) {
      if (number) {
        return 0
      } else {
        return 1
      }
    },

    handleChangeStatus(index, row) {
      const status = this.reverseStatus(row.actActive)
      const para = {
        seeId: row.actId,
        seeActive: row.actActive
      }
      changeAccountStatus(para).then(res => {
      }).catch(res => {
        row.actActive = status
      })
    },

    handleFilter() {
      this.loading = true
      const para = {
        actAccount: this.actAccount,
        actName: this.actName,
        actPhone: this.actPhone,
        page: this.page,
        pagesize: this.pagesize
      }
      getAccountGrid(para).then(res => {
        this.accounts = res.data.list
        this.total = res.data.total
        this.loading = false
      }).catch(res => {
        this.loading = false
      })
    },

    handleAddAccount() {
      this.account = Object.assign({}, defaultAccount)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.account = deepClone(scope.row)
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定要删除该帐号?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const para = {
            actId: row.actId
          }
          await deleteAccount(para)
          this.accountList.splice($index, 1)
        })
        .catch(err => { console.error(err) })
    },

    handleResetPwd(scope) {
      const para = {
        actId: scope.row.actId
      }
      this.$confirm('确定重置密码? 重置后的密码为123456。', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetPwd(para).then((res) => {
          this.$message({
            message: '重置成功',
            type: 'success',
            duration: 2 * 1000
          })
        }).catch(() => {
          this.$message({
            message: '重置失败',
            type: 'error',
            duration: 2 * 1000
          })
        })
      })
    },

    filterMethod() {

    },

    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.confirmAccount()
        }
      })
    },

    async confirmAccount() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {
        try {
          await editAccount(this.account)
          for (let index = 0; index < this.accountList.length; index++) {
            if (this.accountList[index].actId === this.account.actId) {
              this.accountList.splice(index, 1, Object.assign({}, this.account))
              break
            }
          }
        } catch (error) {
          this.dialogVisible = false
        }
      } else {
        try {
          const { data } = await addAccount(this.account)
          this.account.actId = data.actId
          this.accountList.push(this.account)
        } catch (error) {
          this.dialogVisible = false
        }
      }

      this.dialogVisible = false
    },

    // 改变页面
    handleCurrentChange(val) {
      this.page = val
      this.handleGetAccount()
    },

    // 获取选中的行
    selsChange(sels) {
      this.sels = sels
    },

    changePageSize(size) {
      this.pagesize = size
      this.handleGetAccount()
    },

    // 顶部编辑按钮
    handleEditTop() {
      if (this.sels.length !== 1) {
        this.$message({
          message: '请选中一行',
          type: 'warning',
          duration: 2 * 1000
        })
      } else {
        this.dialogType = 'edit'
        this.dialogVisible = true
        const account = this.sels.map(item => {
          return {
            actId: item.actId,
            actAccount: item.actAccount,
            actName: item.actName,
            actPhone: item.actPhone,
            actEmail: item.actEmail,
            actGender: item.actGender,
            actActive: item.actActive,
            roleIds: item.roleIds
          }
        })
        this.account = account[0]
      }
    },

    // 顶部删除按钮
    handleDeleteTop() {
      if (this.sels.length !== 1) {
        this.$message({
          message: '请选中一行',
          type: 'warning',
          duration: 2 * 1000
        })
      } else {
        const actIds = this.sels.map(item => item.actId)
        const actId = actIds[0]
        this.$confirm('确定要删除该帐号?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const para = {
            actId: actId
          }
          await deleteAccount(para)
          this.handleGetAccount()
        }).catch(err => { console.error(err) })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .toolbar-container{
    padding-top: 30px;
    padding-bottom: 50px;
    padding-right: 100px;
  }
  .filter-item{
    padding-left: 5px;
    padding-right: 20px
  }
  .toolnbar-add{
    padding-bottom: 5px;
    padding-top: 5px;
    background-color: #f8f6f6;
  }
  .name-bar{
    line-height: 32px;
  }
  .card-panel-icon {
    margin-left: 10px;
  }
  .transfer-container{
    border: #C0C4CC 1px solid;
    border-radius: 3px;
    padding: 5px;
    margin-bottom: 10px;
  }
  .note-text {
    color: #409EFF;
    margin-bottom: 10px;
  }
</style>
