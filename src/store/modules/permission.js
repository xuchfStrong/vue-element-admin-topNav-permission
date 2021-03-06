import { asyncRouterMap, constantRouterMap } from '@/router'
const _import = require('@/utils/_import_' + process.env.NODE_ENV) // 获取组件的方法
import Layout from '@/views/layout/Layout' // Layout 是架构组件，不在后台返回，在文件里单独引入

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(routes, roles) {
//   const res = []

//   routes.forEach(route => {
//     const tmp = { ...route }
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRouter(tmp.children, roles)
//       }
//       res.push(tmp)
//     }
//   })

//   return res
// }

/**
 * 递归过滤后台返回的动态异步路由表，返回符合的路由表
 * @param routes asyncRouterMapDynamic
 */
function filterAsyncRouterDynamic(asyncRouterMapDynamic) { // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMapDynamic.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') { // Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouterDynamic(route.children)
    }
    return true
  })
  const unfound = { path: '*', redirect: '/404', hidden: true } // 在动态路由最后添加404页面的路由
  accessedRouters.push(unfound)
  return accessedRouters
}

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit, rootGetters }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.includes('admin')) {
          accessedRouters = asyncRouterMap
        } else {
          // accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
          accessedRouters = filterAsyncRouterDynamic(rootGetters.asyncRouterMapDynamic)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
