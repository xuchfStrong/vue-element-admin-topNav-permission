// const routes = require('../router/routeStrCopyBak')
// const routes = require('../views/user-management/routes')
const allRes = [
  { seeId: 10, seeName: '数据共享', meuId: 10, meuName: '数据共享', meuPid: 9999 },
  { seeId: 10, seeName: '数据共享', meuId: 1010, meuName: '用户管理', meuPid: 10 },
  { seeId: 10, seeName: '数据共享', meuId: 101010, meuName: '服务管理', meuPid: 1010 },
  { seeId: 10, seeName: '数据共享', meuId: 101011, meuName: '角色管理', meuPid: 1010 },
  { seeId: 10, seeName: '数据共享', meuId: 1011, meuName: '图标', meuPid: 10 },
  { seeId: 10, seeName: '数据共享', meuId: 101110, meuName: '折线图', meuPid: 1011 },
  { seeId: 10, seeName: '数据共享', meuId: 101111, meuName: '柱状图', meuPid: 1011 },
  { seeId: 11, seeName: '数据治理', meuId: 11, meuName: '数据共享', meuPid: 9999 },
  { seeId: 11, seeName: '数据治理', meuId: 1110, meuName: '用户管理', meuPid: 11 },
  { seeId: 11, seeName: '数据治理', meuId: 111010, meuName: '服务管理', meuPid: 1110 },
  { seeId: 11, seeName: '数据治理', meuId: 111011, meuName: '角色管理', meuPid: 1110 },
  { seeId: 11, seeName: '数据治理', meuId: 1111, meuName: '图标', meuPid: 11 },
  { seeId: 11, seeName: '数据治理', meuId: 111110, meuName: '折线图', meuPid: 1111 },
  { seeId: 11, seeName: '数据治理', meuId: 111111, meuName: '柱状图', meuPid: 1111 }
]

const resources = [
  { seeId: 10, seeName: '数据共享', reeId: 1010, reeName: '添加用户', reeUri: '/user/add', reePid: 10 },
  { seeId: 10, seeName: '数据共享', reeId: 1011, reeName: '删除用户', reeUri: '/user/delete', reePid: 10 },
  { seeId: 11, seeName: '数据治理', reeId: 1110, reeName: '添加数据库', reeUri: '/db/add', reePid: 11 },
  { seeId: 11, seeName: '数据治理', reeId: 1111, reeName: '删除数据库', reeUri: '/db/delete', reePid: 11 }
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

/**
  *
  * @param {*} source
  * @param {*} rootId
  */
/**
function setTreeData(source, rootId) {
  const cloneData = JSON.parse(JSON.stringify(source)) // 对源数据深度克隆
  return cloneData.filter(father => { // 循环所有项，并添加children属性
    const branchArr = cloneData.filter(child => father.id === child.parentId) // 返回每一项的子级数组
    branchArr.length > 0 ? father.children = branchArr : '' // 给父级添加一个children属性，并赋值
    return father.parentId === rootId // 返回第一层
  })
}
 */

function setTreeData(source, rootId) {
  const cloneData = JSON.parse(JSON.stringify(source)) // 对源数据深度克隆
  return cloneData.filter(father => { // 循环所有项，并添加children属性
    const branchArr = cloneData.filter(child => father.meuId === child.meuPid) // 返回每一项的子级数组
    branchArr.length > 0 ? father.children = branchArr : '' // 给父级添加一个children属性，并赋值
    return father.meuPid === rootId // 返回第一层
  })
}

function generateTree(menus, checkedKeys) {
  const res = []

  for (const menu of menus) {
    const meuPid = menu.meuId
    // recursive child routes
    if (menu.children) {
      menu.children = generateTree(menu.children, checkedKeys)
    }
    if (checkedKeys.includes(meuPid) || (menu.children && menu.children.length >= 1)) {
      res.push(menu)
    }
  }
  return res
}

function generateArr(routes) {
  let data = []
  routes.forEach(route => {
    data.push(route)
    if (route.children) {
      const temp = generateArr(route.children)
      if (temp.length > 0) {
        data = [...data, ...temp]
      }
    }
  })
  return data
}

function generateFullMenuId(menus) {
  const data = []
  menus.forEach(menu => {
    data.push(menu.meuId)
  })
  return data
}

function generateFullResources(resources) {
  const resourcescopy = [...resources]
  const rootId = 9999
  const seeIds = []
  resourcescopy.forEach(resource => {
    if (!seeIds.includes(resource.seeId)) {
      seeIds.push(resource.seeId)
    }
  })

  seeIds.forEach(seeId => {
    resources.push({ 'seeId': rootId, 'reeId': seeId })
  })

  return resources
}

const checkedKeys = [101010, 111111]

const treeData = setTreeData(allRes, 9999)
// const jsonData = JSON.stringify(treeData)
const menuTree = generateTree(treeData, checkedKeys)
const menuList = generateArr(menuTree)
const menuIds = generateFullMenuId(menuList)
// const jsonMenuData = JSON.stringify(menuTree)
// console.log('jsonMenuData', jsonMenuData)
// console.log('menuTree', menuTree)
console.log('menuIds', menuIds)

// const jsonroute = JSON.stringify(route)
// console.log('route', jsonroute)
const res = generateFullResources(resources)
console.log(res)

