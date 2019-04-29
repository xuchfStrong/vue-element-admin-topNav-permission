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
        <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEditTop">修改</el-button>
        <el-button type="primary" size="small" icon="el-icon-delete" @click="handleDeleteTop">删除</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="rolesList" style="width: 100%;" border @selection-change="selsChange">
      <el-table-column type="selection" width="40" align="center"/>
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
          {{ scope.row.roeActive | statusFilter }}
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
          <el-button type="text" size="medium" @click="handleEdit(scope)">修改</el-button>
          <el-button type="text" size="medium" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'修改角色':'添加角色'" width="60%">
      <el-form ref="form" :model="role" :rules="formRules" label-width="80px" label-position="right">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="角色名称" prop="roeName">
              <el-input v-model="role.roeName" :disabled="dialogType==='edit'" :maxlength="20" placeholder="角色名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色状态">
              <el-radio v-model="role.roeActive" :label="1">启用</el-radio>
              <el-radio v-model="role.roeActive" :label="0">禁用</el-radio>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="角色描述" prop="roeInfo">
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
                ref="menuTree"
                :check-strictly="checkStrictly"
                :data="menuData"
                :props="menuProps"
                show-checkbox
                node-key="meuId"
                class="permission-tree" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <span>资源授权</span>
            <el-form-item label="" label-width="0px">
              <el-tree
                ref="resourceTree"
                :check-strictly="checkStrictly"
                :data="resourcesData"
                :props="resourceProps"
                show-checkbox
                node-key="reeId"
                class="permission-tree" />
            </el-form-item>
          </el-col>
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
import { getMenuList, getResourceList, changeRoleStatus, getRoleGrid, deleteRole, addRole, editRole } from '@/api/userManage'
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
      resources: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      menuProps: {
        children: 'children',
        label: 'meuName'
      },
      resourceProps: {
        children: 'children',
        label: 'reeName'
      },
      formRules: {
        roeName: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ]
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
    menuData() {
      return this.menus
    },
    resourcesData() {
      return this.resources
    },
    showFlag() {
      return this.total > 10
    }
  },
  created() {
    this.handleGetMenuList()
    this.handleGetResourceList()
    this.handleGetRoles()
  },
  methods: {
    async handleGetMenuList() {
      const res = await getMenuList()
      this.serviceMenus = res.data
      const fullMenus = this.generateFullMenus(res.data)
      this.menus = this.setMenuTreeData(fullMenus, 9999)
    },

    async handleGetResourceList() {
      const res = await getResourceList()
      this.serviceResources = res.data
      const fullResources = this.generateFullResources(res.data)
      this.resources = this.setResourceTreeData(fullResources, 9999)
    },

    async handleGetRoles() {
      this.loading = true
      const para = {
        page: this.page,
        pagesize: this.pagesize
      }
      const res = await getRoleGrid(para)
      this.rolesList = res.data.list
      this.total = res.data.total
      this.loading = false
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

    // 将资源列表中的每一个seeId添加一条{'meuPid': 9999, 'meuId': 本服务的seeId, meuName: 本服务的seeName}
    generateFullMenus(menus) {
      const menusCopy = [...menus]
      const rootId = 9999
      const seeIds = []
      const services = []
      menusCopy.forEach(menu => {
        if (!seeIds.includes(menu.seeId)) {
          seeIds.push(menu.seeId)
          services.push({ seeId: menu.seeId, seeName: menu.seeName })
        }
      })

      services.forEach(service => {
        menus.push({ meuPid: rootId, meuId: service.seeId, meuName: service.seeName })
      })

      return menus
    },

    // 将资源列表中的每一个seeId添加一条{'seeId': 9999, 'reeId': 本服务的seeId, reeName: 本服务的seeName}
    generateFullResources(resources) {
      const resourcesCopy = [...resources]
      const rootId = 9999
      const seeIds = []
      const services = []
      resourcesCopy.forEach(resource => {
        if (!seeIds.includes(resource.seeId)) {
          seeIds.push(resource.seeId)
          services.push({ seeId: resource.seeId, seeName: resource.seeName })
        }
      })

      services.forEach(service => {
        resources.push({ 'seeId': rootId, 'reeId': service.seeId, reeName: service.seeName })
      })

      return resources
    },

    // 将获取的带有父子节点关系的菜单列表生成tree，用于绑定到tree组件上
    setMenuTreeData(list, rootId) {
      const cloneData = JSON.parse(JSON.stringify(list)) // 对源数据深度克隆
      return cloneData.filter(father => { // 循环所有项，并添加children属性
        const branchArr = cloneData.filter(child => father.meuId === child.meuPid) // 返回每一项的子级数组
        branchArr.length > 0 ? father.children = branchArr : '' // 给父级添加一个children属性，并赋值
        return father.meuPid === rootId // 返回第一层
      })
    },

    // 将获取的带有父子节点关系的资源列表生成tree，用于绑定到tree组件上
    setResourceTreeData(list, rootId) {
      const cloneData = JSON.parse(JSON.stringify(list)) // 对源数据深度克隆
      return cloneData.filter(father => { // 循环所有项，并添加children属性
        const branchArr = cloneData.filter(child => father.reeId === child.seeId) // 返回每一项的子级数组
        branchArr.length > 0 ? father.children = branchArr : '' // 给父级添加一个children属性，并赋值
        return father.seeId === rootId // 返回第一层
      })
    },

    // 根据选中的一个菜单节点的key，将其关联的父节点都获取到，生成tree
    generateMenuTree(menus, checkedKeys) {
      const res = []

      for (const menu of menus) {
        const meuPid = menu.meuId
        // recursive child routes
        if (menu.children) {
          menu.children = this.generateMenuTree(menu.children, checkedKeys)
        }
        if (checkedKeys.includes(meuPid) || (menu.children && menu.children.length >= 1)) {
          res.push(menu)
        }
      }
      return res
    },

    // 根据选中的一个资源节点的key，将其关联的父节点都获取到，生成tree
    generateResourceTree(resources, checkedKeys) {
      const res = []

      for (const resource of resources) {
        const seePid = resource.reeId
        // recursive child routes
        if (resource.children) {
          resource.children = this.generateResourceTree(resource.children, checkedKeys)
        }
        if (checkedKeys.includes(seePid) || (resource.children && resource.children.length >= 1)) {
          res.push(resource)
        }
      }
      return res
    },

    // 将菜单的array数据里面的menuId取出来
    generateFullMenuId(menus) {
      const data = []
      menus.forEach(menu => {
        data.push(menu.meuId)
      })
      return data
    },

    // 将资源的array数据里面的reeId取出来
    generateFullResourceId(resources) {
      const data = []
      resources.forEach(resource => {
        data.push(resource.reeId)
      })
      return data
    },

    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.menuTree && this.$refs.resourceTree) {
        this.$refs.menuTree.setCheckedNodes([])
        this.$refs.resourceTree.setCheckedNodes([])
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
        const resourceIds = this.role.resourceIds
        this.$refs.menuTree.setCheckedKeys(menuIds)
        this.$refs.resourceTree.setCheckedKeys(resourceIds)
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定要删除该角色?', '删除角色', {
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

    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.confirmRole()
        }
      })
    },

    async confirmRole() {
      const isEdit = this.dialogType === 'edit'
      const checkedMenuKeys = this.$refs.menuTree.getCheckedKeys()
      const checkedResourceKeys = this.$refs.resourceTree.getCheckedKeys()
      const menuTree = this.generateMenuTree(deepClone(this.menus), checkedMenuKeys)
      const resourceTree = this.generateResourceTree(deepClone(this.resources), checkedResourceKeys)
      const menuList = this.generateArr(menuTree)
      const resourceList = this.generateArr(resourceTree)
      const menuIds = this.generateFullMenuId(menuList)
      const resourceIds = this.generateFullResourceId(resourceList)
      this.role.menuIds = menuIds
      this.role.resourceIds = resourceIds

      if (isEdit) {
        try {
          await editRole(this.role)
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

    changePageSize(size) {
      this.pagesize = size
      this.handleGetRoles()
    },

    // 改变页面
    handleCurrentChange(val) {
      this.page = val
      this.handleGetRoles()
    },

    // 获取选中的行
    selsChange(sels) {
      this.sels = sels
    },

    // 修改角色状态
    handleChangeStatus(index, row) {
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

    reverseStatus(number) {
      if (number) {
        return 0
      } else {
        return 1
      }
    },

    handleFilter() {
      this.loading = true
      const para = {
        roeName: this.roleName,
        page: this.page,
        pagesize: this.pagesize
      }
      getRoleGrid(para).then(res => {
        this.rolesList = res.data.list
        this.total = res.data.total
        this.loading = false
      }).catch(res => {
        this.loading = false
      })
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
        const role = this.sels.map(item => {
          return {
            roeInfo: item.roeInfo,
            roeName: item.roeName,
            roeId: item.roeId,
            roeActive: item.roeActive,
            menuIds: [...item.menuIds],
            resourceIds: [...item.resourceIds]
          }
        })
        this.role = role[0]
        this.$nextTick(() => {
          const menuIds = this.role.menuIds
          const resourceIds = this.role.resourceIds
          this.$refs.menuTree.setCheckedKeys(menuIds)
          this.$refs.resourceTree.setCheckedKeys(resourceIds)
          // set checked state of a node not affects its father and child nodes
          this.checkStrictly = false
        })
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
        const roeIds = this.sels.map(item => item.roeId)
        const roeId = roeIds[0]
        this.$confirm('确定要删除该角色?', '删除角色', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const para = {
            roeId: roeId
          }
          await deleteRole(para)
          this.handleGetRoles()
        }).catch(err => { console.error(err) })
      }
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
  line-height: 32px;
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
