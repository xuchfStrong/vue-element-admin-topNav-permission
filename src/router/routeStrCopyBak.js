/**
 * 用于生成权限控制的tree
 */
const seeId = 1000
module.exports = [
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
  },
  {
    path: '/nested',
    component: 'Layout',
    id: 4,
    parentId: seeId,
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: {
      title: 'nested',
      icon: 'nested'
    },
    children: [
      {
        path: '/nested/menu1',
        component: 'views/nested/menu1/index', // Parent router-view
        id: 41,
        parentId: 4,
        name: 'Menu1',
        meta: { title: 'menu1' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            component: 'views/nested/menu1/menu1-1',
            id: 411,
            parentId: 41,
            name: 'Menu1-1',
            meta: { title: 'menu1-1' }
          },
          {
            path: 'menu1-2',
            component: 'views/nested/menu1/menu1-2',
            id: 412,
            parentId: 41,
            name: 'Menu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: 'views/nested/menu1/menu1-2/menu1-2-1',
                id: 4121,
                parentId: 412,
                name: 'Menu1-2-1',
                meta: { title: 'menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: 'views/nested/menu1/menu1-2/menu1-2-2',
                id: 4122,
                parentId: 412,
                name: 'Menu1-2-2',
                meta: { title: 'menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: 'views/nested/menu1/menu1-3',
            id: 413,
            parentId: 41,
            name: 'Menu1-3',
            meta: { title: 'menu1-3' }
          }
        ]
      },
      {
        path: '/nested/menu2',
        name: 'Menu2',
        component: 'views/nested/menu2/index',
        id: 42,
        parentId: 4,
        meta: { title: 'menu2' }
      }
    ]
  },
  {
    path: '/table',
    component: 'Layout',
    id: 5,
    parentId: seeId,
    redirect: '/table/complex-table',
    name: 'Table',
    meta: {
      title: 'Table',
      icon: 'table'
    },
    children: [
      {
        path: '/table/dynamic-table',
        component: 'views/table/dynamicTable/index',
        id: 51,
        parentId: 5,
        name: 'DynamicTable',
        meta: { title: 'dynamicTable' }
      },
      {
        path: '/table/drag-table',
        component: 'views/table/dragTable',
        id: 52,
        parentId: 5,
        name: 'DragTable',
        meta: { title: 'dragTable' }
      },
      {
        path: '/table/inline-edit-table',
        component: 'views/table/inlineEditTable',
        id: 53,
        parentId: 5,
        name: 'InlineEditTable',
        meta: { title: 'inlineEditTable' }
      },
      {
        path: '/table/tree-table',
        component: 'views/table/treeTable/treeTable',
        id: 54,
        parentId: 5,
        name: 'TreeTableDemo',
        meta: { title: 'treeTable' }
      },
      {
        path: '/table/custom-tree-table',
        component: 'views/table/treeTable/customTreeTable',
        id: 55,
        parentId: 5,
        name: 'CustomTreeTableDemo',
        meta: { title: 'customTreeTable' }
      },
      {
        path: '/table/complex-table',
        component: 'views/table/complexTable',
        id: 56,
        parentId: 5,
        name: 'ComplexTable',
        meta: { title: 'complexTable' }
      }
    ]
  },
  {
    path: '/example',
    component: 'Layout',
    id: 6,
    parentId: seeId,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: '/example/create',
        component: 'views/example/create',
        id: 61,
        parentId: 6,
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: '/example/edit/:id(\\d+)',
        component: 'views/example/edit',
        id: 62,
        parentId: 6,
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true },
        hidden: true
      },
      {
        path: '/example/list',
        component: 'views/example/list',
        id: 63,
        parentId: 6,
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  }
]
