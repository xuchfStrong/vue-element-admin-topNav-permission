<template>
  <div class="app-container">
    <!-- 工具条 -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-form :inline="true">
        <span style="color: #3b3a3a">服务名称:</span>
        <el-input v-model="serviceName" placeholder="请输入服务名称" style="width: 200px;padding-left: 5px;padding-right: 20px" class="filter-item" @keyup.enter.native="handleFilter"/>
        <el-form-item>
          <el-button type="primary" @click="handleFilter">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <template>
      <el-table v-loading="loading" :data="service" highlight-current-row border fit stripe @selection-change="selsChange">
        <!-- <el-table-column type="selection" width="55" align="center"/> -->
        <el-table-column prop="seeId" label="服务ID" sortable align="center"/>
        <el-table-column prop="seeName" label="服务名称" sortable align="center"/>
        <el-table-column label="服务状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.seeActive | statusFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope" >
            <el-switch
              v-model="scope.row.seeActive"
              :active-value="activeValue"
              :inactive-value= "inactiveValue"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleChangeStatus(scope.$index, scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!--工具条-->
    <el-col :span="24" class="toolbar toolbar-container">
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
import { getServiceGrid, changeServiceStatus } from '@/api/userManage'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '已启用',
        0: '已禁用'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      loading: false,
      total: 0,
      page: 1,
      pagesize: 10,
      sels: [], // 列表选中列
      service: [],
      serviceName: '',
      activeValue: 1,
      inactiveValue: 0
    }
  },
  mounted() {
    this.handleGetService()
  },
  methods: {
    // 改变页面
    handleCurrentChange(val) {
      this.page = val
      this.handleGetService()
    },

    // 获取选中的行
    selsChange: function(sels) {
      this.sels = sels
    },

    reverseStatus: function(number) {
      if (number) {
        return 0
      } else {
        return 1
      }
    },

    changePageSize: function(size) {
      this.pagesize = size
      this.handleGetService()
    },

    handleChangeStatus: function(index, row) {
      const status = this.reverseStatus(row.seeActive)
      const para = {
        seeId: row.seeId,
        seeActive: row.seeActive
      }
      changeServiceStatus(para).then(res => {
        // this.handleGetService()
      }).catch(res => {
        row.seeActive = status
      })
    },

    handleGetService: function() {
      this.loading = true
      const para = {
        page: this.page,
        pagesize: this.pagesize
      }
      getServiceGrid(para).then(res => {
        this.service = res.data.list
        this.total = res.data.total
        this.loading = false
      }).catch(res => {
        this.loading = false
      })
    },

    handleFilter: function() {
      const para = {
        seeName: this.serviceName
      }
      getServiceGrid(para).then(res => {
        this.service = res.data.list
        this.total = res.data.total
        this.loading = false
      }).catch(res => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
  .toolbar-container{
    padding-top: 30px;
    padding-bottom: 50px;
    padding-right: 100px;
  }
</style>
