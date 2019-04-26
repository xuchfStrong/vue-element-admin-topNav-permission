<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
        <el-form :inline="true">
          <span style="color: #3b3a3a">角色名称:</span>
          <el-input v-model="roleName" placeholder="请输入角色名称" style="width: 200px;padding-left: 5px;padding-right: 20px" class="filter-item" @keyup.enter.native="handleFilter"/>
          <el-form-item>
            <el-button type="primary" @click="handleFilter">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 新增工具条 -->
    <el-row class="toolnbar-add">
      <el-col :span="18" class="name-bar">
        <svg-icon icon-class="list" class-name="card-panel-icon" />
        <b style="color: #3b3a3a">权限配置列表</b>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="handleAddRole">新增</el-button>
        <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEdit">修改</el-button>
        <el-button type="primary" size="small" icon="el-icon-delete" @click="handleDelete">删除</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="rolesList" style="width: 100%;" border>
      <el-table-column align="center" label="角色名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.roeName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色描述">
        <template slot-scope="scope">
          {{ scope.row.roeInfo }}
        </template>
      </el-table-column>
      <el-table-column label="服务状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.roeActive | statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.roeActive"
            :active-value="activeValue"
            :inactive-value="inactiveValue"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleChangeStatus(scope.$index, scope.row)"/>
          <el-button type="primary" size="small" @click="handleEdit(scope)">修改</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'修改角色':'添加角色'" width="60%">
      <el-form :model="role" label-width="70px" label-position="left">
        <el-form-item label="角色名称">
          <el-input v-model="role.roeName" placeholder="角色名称" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="role.roeInfo"
            :autosize="{ minRows: 1, maxRows: 4}"
            type="textarea"
            placeholder="角色描述"
          />
        </el-form-item>

        <el-row class="tree-container">
          <el-col :span="12">
            <span>菜单授权</span>
            <el-form-item label="" label-width="0px">
              <el-tree
                ref="tree"
                :check-strictly="checkStrictly"
                :data="menusData"
                :props="defaultProps"
                show-checkbox
                node-key="menuId"
                class="permission-tree" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- <span>资源授权</span>
            <el-form-item label="" label-width="0px">
              <el-tree
                ref="tree"
                :check-strictly="checkStrictly"
                :data="menusData"
                :props="defaultProps"
                show-checkbox
                node-key="path"
                class="permission-tree" />
            </el-form-item> -->
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuList, changeRoleStatus, getRoleGrid, deleteRole, addRole, updateRole } from '@/api/userManage'
import { deepClone } from '@/utils'

const defaultRole = {
  roeInfo: '',
  roeName: '',
  roeId: Number,
  roeActive: 1,
  menuIds: [],
  resourceIds: []
}

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
      role: Object.assign({}, defaultRole),
      menus: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'menName'
      },
      loading: false,
      total: 0,
      page: 1,
      pagesize: 10,
      sels: [], // 列表选中列
      roleName: '',
      roleActive: true,
      activeValue: 1,
      inactiveValue: 0
    }
  },
  computed: {
    menusData() {
      return this.menus
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.handleGetMenuList()
    this.getRoles()
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
    async handleGetMenuList() {
      const res = await getMenuList()
      this.serviceMenus = res.data
      this.menus = this.setMenuTreeData(res.data, 9999)
    },

    // 将一个tree的所有层级的子节点都和父节点放到同一个列表中
    generateArr(tree) {
      let data = []
      tree.forEach(item => {
        data.push(item)
        if (item.children) {
          const temp = this.generateArr(item.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },

    // 将获取的带有父子节点关系的菜单列表生成tree，用于绑定到tree组件上
    setMenuTreeData(list, rootId) {
      const cloneData = JSON.parse(JSON.stringify(list)) // 对源数据深度克隆
      return cloneData.filter(father => { // 循环所有项，并添加children属性
        const branchArr = cloneData.filter(child => father.menuId === child.menuPid) // 返回每一项的子级数组
        branchArr.length > 0 ? father.children = branchArr : '' // 给父级添加一个children属性，并赋值
        return father.menuPid === rootId // 返回第一层
      })
    },

    // 根据选中的一个菜单节点的key，将其关联的父节点都获取到，生成tree
    generateMenuTree(menus, checkedKeys) {
      const res = []

      for (const menu of menus) {
        const menuPid = menu.menuId
        // recursive child routes
        if (menu.children) {
          menu.children = this.generateMenuTree(menu.children, checkedKeys)
        }
        if (checkedKeys.includes(menuPid) || (menu.children && menu.children.length >= 1)) {
          res.push(menu)
        }
      }
      return res
    },

    // 将菜单的array数据里面的menuId取出来
    generateFullMenuId(menus) {
      const data = []
      menus.forEach(menu => {
        data.push(menu.menuId)
      })
      return data
    },

    async getRoles() {
      this.loading = true
      const res = await getRoleGrid()
      this.rolesList = res.data.list
      this.loading = false
    },

    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = deepClone(scope.row)
      this.$nextTick(() => {
        const menuIds = this.role.menuIds
        this.$refs.tree.setCheckedKeys(menuIds)
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定要删除该角色?', '确认删除', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const para = {
            roeId: row.roeId
          }
          await deleteRole(para)
          this.rolesList.splice($index, 1)
        })
        .catch(err => { console.error(err) })
    },

    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      const checkedKeys = this.$refs.tree.getCheckedKeys()
      const menuTree = this.generateMenuTree(deepClone(this.menus), checkedKeys)
      const menuList = this.generateArr(menuTree)
      const menuIds = this.generateFullMenuId(menuList)
      this.role.menuIds = menuIds

      if (isEdit) {
        try {
          await updateRole(this.role)
          for (let index = 0; index < this.rolesList.length; index++) {
            if (this.rolesList[index].roeId === this.role.roeId) {
              this.rolesList.splice(index, 1, Object.assign({}, this.role))
              break
            }
          }
        } catch (error) {
          this.dialogVisible = false
        }
      } else {
        try {
          const { data } = await addRole(this.role)
          this.role.roeId = data.roeId
          this.rolesList.push(this.role)
        } catch (error) {
          this.dialogVisible = false
        }
      }

      this.dialogVisible = false
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
      const status = this.reverseStatus(row.roeActive)
      const para = {
        roeId: row.roeId,
        roeActive: row.roeActive
      }
      changeRoleStatus(para).then(res => {
      }).catch(res => {
        row.roeActive = status
      })
    },
    handleFilter: function() {
      const para = {
        roeName: this.roleName
      }
      getRoleGrid(para).then(res => {
        this.rolesList = res.data.list
        this.total = res.data.total
        this.loading = false
      }).catch(res => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 0;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
.toolbar-container{
    padding-top: 30px;
    padding-bottom: 50px;
    padding-right: 100px;
  }

  .toolnbar-add{
    padding-bottom: 5px;
    padding-top: 5px;
    background-color: #f8f6f6;
  }
  .name-bar{
    height: 32px;
  }
  .card-panel-icon {
    margin-left: 10px;
    color: #3b3a3a;
    }
  .tree-container{
    border: #C0C4CC 1px solid;
    border-radius: 3px;
    padding: 5px;
    margin-bottom: 10px;
  }
</style>
