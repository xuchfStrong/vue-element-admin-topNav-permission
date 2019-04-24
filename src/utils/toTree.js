// const routes = require('../router/routeStrCopy')
const allRes = [
  {
    id: 4,
    resName: '删除角色',
    parentId: 2
  },
  {
    id: 3,
    resName: '编辑角色',
    parentId: 1
  },
  {
    id: 2,
    resName: '设置权限',
    parentId: 1
  },
  {
    id: 5,
    resName: '添加用户',
    parentId: 4
  },
  {
    id: 6,
    resName: '更新用户',
    parentId: 4
  },
  {
    id: 7,
    resName: '删除用户',
    parentId: 6
  },
  {
    id: 8,
    resName: '重置密码',
    parentId: 3
  },
  {
    id: 9,
    resName: '添加地区',
    parentId: 5
  },
  {
    id: 10,
    resName: '编辑地区',
    parentId: 6
  }
]
/**
const testdata = [
  { id: 1, parentId: 0, name: '一级菜单A', rank: 1 },
  { id: 2, parentId: 0, name: '一级菜单B', rank: 1 },
  { id: 3, parentId: 0, name: '一级菜单C', rank: 1 },
  { id: 4, parentId: 1, name: '二级菜单A-A', rank: 2 },
  { id: 5, parentId: 1, name: '二级菜单A-B', rank: 2 },
  { id: 6, parentId: 2, name: '二级菜单B-A', rank: 2 },
  { id: 7, parentId: 4, name: '三级菜单A-A-A', rank: 3 },
  { id: 8, parentId: 7, name: '四级菜单A-A-A-A', rank: 4 },
  { id: 9, parentId: 8, name: '五级菜单A-A-A-A-A', rank: 5 },
  { id: 10, parentId: 9, name: '六级菜单A-A-A-A-A-A', rank: 6 },
  { id: 11, parentId: 10, name: '七级菜单A-A-A-A-A-A-A', rank: 7 },
  { id: 12, parentId: 11, name: '八级菜单A-A-A-A-A-A-A-A', rank: 8 },
  { id: 13, parentId: 12, name: '九级菜单A-A-A-A-A-A-A-A-A', rank: 9 },
  { id: 14, parentId: 13, name: '十级菜单A-A-A-A-A-A-A-A-A-A', rank: 10 }
]

function toTreeData(data, attributes) {
  const resData = data
  const tree = []

  for (let i = 0; i < resData.length; i++) {
    if (resData[i].parentId === attributes.rootId) {
      const obj = {
        id: resData[i][attributes.id],
        title: resData[i][attributes.name],
        children: []
      }
      tree.push(obj)
      resData.splice(i, 1)
      i--
    }
  }
  run(tree)
  function run(chiArr) {
    if (resData.length !== 0) {
      for (let i = 0; i < chiArr.length; i++) {
        for (let j = 0; j < resData.length; j++) {
          if (chiArr[i].id === resData[j][attributes.parentId]) {
            const obj = {
              id: resData[j][attributes.id],
              title: resData[j][attributes.name],
              children: []
            }
            chiArr[i].children.push(obj)
            resData.splice(j, 1)
            j--
          }
        }
        run(chiArr[i].children)
      }
    }
  }

  return tree
}
 */

function setTreeData(source, rootId) {
  const cloneData = JSON.parse(JSON.stringify(source)) // 对源数据深度克隆
  return cloneData.filter(father => { // 循环所有项，并添加children属性
    const branchArr = cloneData.filter(child => father.id === child.parentId) // 返回每一项的子级数组
    branchArr.length > 0 ? father.childrent = branchArr : '' // 给父级添加一个children属性，并赋值
    return father.parentId === rootId // 返回第一层
  })
}

const treeData = setTreeData(allRes, 1)
const jsonData = JSON.stringify(treeData)
console.log('jsonData', jsonData)

// const jsonroute = JSON.stringify(route)
// console.log('route', jsonroute)

