/**
 * 用于生成权限控制的tree
 */
const seeId = 1000
module.exports = [
  {
    system1: [
      {
        path: '/permission',
        component: 'Layout',
        id: 1,
        parentId: seeId,
        redirect: '/permission/directive',
        alwaysShow: true, // will always show the root menu
        hidden: false,
        meta: {
          title: 'permission',
          icon: 'lock',
          roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [
          {
            path: '/permission/page',
            component: 'views/permission/page',
            id: 11,
            parentId: 1,
            name: 'PagePermission',
            meta: {
              title: 'pagePermission',
              roles: ['admin'] // or you can only set roles in sub nav
            }
          },
          {
            path: '/permission/directive',
            component: 'views/permission/directive',
            id: 12,
            parentId: 1,
            name: 'DirectivePermission',
            meta: {
              title: 'directivePermission'
            // if do not set roles, means: this page does not require permission
            }
          },
          {
            path: '/permission/role',
            component: 'views/permission/role',
            id: 13,
            parentId: 1,
            name: 'RolePermission',
            meta: {
              title: 'rolePermission',
              roles: ['admin']
            }
          }
        ]
      },

      {
        path: '/icon',
        component: 'Layout',
        id: 2,
        parentId: seeId,
        redirect: '/icon/index',
        meta: { title: 'icon' },
        children: [
          {
            path: '/icon/index',
            component: 'views/svg-icons/index',
            id: 21,
            parentId: 2,
            name: 'Icons',
            meta: { title: 'icons', icon: 'icon', noCache: true }
          }
        ]
      },
      {
        path: '/charts',
        component: 'Layout',
        id: 3,
        parentId: seeId,
        redirect: '/charts/keyboard',
        name: 'Charts',
        meta: {
          title: 'charts',
          icon: 'chart'
        },
        children: [
          {
            path: '/charts/keyboard',
            component: 'views/charts/keyboard',
            id: 31,
            parentId: 3,
            name: 'KeyboardChart',
            meta: { title: 'keyboardChart', icon: 'chart', noCache: true }
          },
          {
            path: '/charts/line',
            component: 'views/charts/line',
            id: 32,
            parentId: 3,
            name: 'LineChart',
            meta: { title: 'lineChart', icon: 'chart', noCache: true }
          },
          {
            path: '/charts/mixchart',
            component: 'views/charts/mixChart',
            id: 33,
            parentId: 3,
            name: 'MixChart',
            meta: { title: 'mixChart', noCache: true }
          }
        ]
      }
    ]
  }
]
