/**
 * 用于生成权限控制的tree
 */
export const constantRouterMap = [
  {
    path: '/redirect',
    component: 'Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'views/login/authredirect',
    hidden: true
  },
  {
    path: '/404',
    component: 'views/errorPage/404',
    hidden: true
  },
  {
    path: '/401',
    component: 'views/errorPage/401',
    hidden: true
  },
  {
    path: '',
    component: 'Layout',
    redirect: 'dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: 'Layout',
    redirect: '/documentation/index',
    meta: { title: 'documentation' },
    hidden: true,
    children: [
      {
        path: 'index',
        component: 'views/documentation/index',
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: 'Layout',
    redirect: '/guide/index',
    meta: { title: 'guide' },
    hidden: true,
    children: [
      {
        path: 'index',
        component: 'views/guide/index',
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/permission',
    component: 'Layout',
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
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: '/permission/directive',
        component: 'views/permission/directive',
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: '/permission/role',
        component: 'views/permission/role',
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
    redirect: '/icon/index',
    meta: { title: 'icon' },
    children: [
      {
        path: '/icon/index',
        component: 'views/svg-icons/index',
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/charts',
    component: 'Layout',
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
        name: 'KeyboardChart',
        meta: { title: 'keyboardChart', icon: 'chart', noCache: true }
      },
      {
        path: '/charts/line',
        component: 'views/charts/line',
        name: 'LineChart',
        meta: { title: 'lineChart', icon: 'chart', noCache: true }
      },
      {
        path: '/charts/mixchart',
        component: 'views/charts/mixChart',
        name: 'MixChart',
        meta: { title: 'mixChart', noCache: true }
      }
    ]
  },
  {
    path: '/components',
    component: 'Layout',
    redirect: '/components/tinymce',
    name: 'ComponentDemo',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [
      {
        path: '/components/tinymce',
        component: 'views/components-demo/tinymce',
        name: 'TinymceDemo',
        meta: { title: 'tinymce' }
      },
      {
        path: '/components/markdown',
        component: 'views/components-demo/markdown',
        name: 'MarkdownDemo',
        meta: { title: 'markdown' }
      },
      {
        path: '/components/json-editor',
        component: 'views/components-demo/jsonEditor',
        name: 'JsonEditorDemo',
        meta: { title: 'jsonEditor' }
      },
      {
        path: '/components/splitpane',
        component: 'views/components-demo/splitpane',
        name: 'SplitpaneDemo',
        meta: { title: 'splitPane' }
      },
      {
        path: '/components/avatar-upload',
        component: 'views/components-demo/avatarUpload',
        name: 'AvatarUploadDemo',
        meta: { title: 'avatarUpload' }
      },
      {
        path: '/components/dropzone',
        component: 'views/components-demo/dropzone',
        name: 'DropzoneDemo',
        meta: { title: 'dropzone' }
      },
      {
        path: '/components/sticky',
        component: 'views/components-demo/sticky',
        name: 'StickyDemo',
        meta: { title: 'sticky' }
      },
      {
        path: '/components/count-to',
        component: 'views/components-demo/countTo',
        name: 'CountToDemo',
        meta: { title: 'countTo' }
      },
      {
        path: '/components/mixin',
        component: 'views/components-demo/mixin',
        name: 'ComponentMixinDemo',
        meta: { title: 'componentMixin' }
      },
      {
        path: '/components/back-to-top',
        component: 'views/components-demo/backToTop',
        name: 'BackToTopDemo',
        meta: { title: 'backToTop' }
      },
      {
        path: '/components/drag-dialog',
        component: 'views/components-demo/dragDialog',
        name: 'DragDialogDemo',
        meta: { title: 'dragDialog' }
      },
      {
        path: '/components/drag-select',
        component: 'views/components-demo/dragSelect',
        name: 'DragSelectDemo',
        meta: { title: 'dragSelect' }
      },
      {
        path: '/components/dnd-list',
        component: 'views/components-demo/dndList',
        name: 'DndListDemo',
        meta: { title: 'dndList' }
      },
      {
        path: '/components/drag-kanban',
        component: 'views/components-demo/dragKanban',
        name: 'DragKanbanDemo',
        meta: { title: 'dragKanban' }
      }
    ]
  },
  {
    path: '/nested',
    component: 'Layout',
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
        name: 'Menu1',
        meta: { title: 'menu1' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            component: 'views/nested/menu1/menu1-1',
            name: 'Menu1-1',
            meta: { title: 'menu1-1' }
          },
          {
            path: 'menu1-2',
            component: 'views/nested/menu1/menu1-2',
            name: 'Menu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: 'views/nested/menu1/menu1-2/menu1-2-1',
                name: 'Menu1-2-1',
                meta: { title: 'menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: 'views/nested/menu1/menu1-2/menu1-2-2',
                name: 'Menu1-2-2',
                meta: { title: 'menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: 'views/nested/menu1/menu1-3',
            name: 'Menu1-3',
            meta: { title: 'menu1-3' }
          }
        ]
      },
      {
        path: '/nested/menu2',
        name: 'Menu2',
        component: 'views/nested/menu2/index',
        meta: { title: 'menu2' }
      }
    ]
  },
  {
    path: '/table',
    component: 'Layout',
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
        name: 'DynamicTable',
        meta: { title: 'dynamicTable' }
      },
      {
        path: '/table/drag-table',
        component: 'views/table/dragTable',
        name: 'DragTable',
        meta: { title: 'dragTable' }
      },
      {
        path: '/table/inline-edit-table',
        component: 'views/table/inlineEditTable',
        name: 'InlineEditTable',
        meta: { title: 'inlineEditTable' }
      },
      {
        path: '/table/tree-table',
        component: 'views/table/treeTable/treeTable',
        name: 'TreeTableDemo',
        meta: { title: 'treeTable' }
      },
      {
        path: '/table/custom-tree-table',
        component: 'views/table/treeTable/customTreeTable',
        name: 'CustomTreeTableDemo',
        meta: { title: 'customTreeTable' }
      },
      {
        path: '/table/complex-table',
        component: 'views/table/complexTable',
        name: 'ComplexTable',
        meta: { title: 'complexTable' }
      }
    ]
  },
  {
    path: '/example',
    component: 'Layout',
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
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: '/example/edit/:id(\\d+)',
        component: 'views/example/edit',
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true },
        hidden: true
      },
      {
        path: '/example/list',
        component: 'views/example/list',
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },
  /*
  {
    path: '/tab',
    component: 'Layout',
    children: [
      {
        path: '/tab/index',
        component: 'views/tab/index',
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },
  {
    path: '/error',
    component: 'Layout',
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: 'views/errorPage/401',
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: 'views/errorPage/404',
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: 'Layout',
    redirect: 'noredirect',
    children: [
      {
        path: 'log',
        component: 'views/errorLog/index',
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: 'Layout',
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: 'views/excel/exportExcel',
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: 'views/excel/selectExcel',
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'upload-excel',
        component: 'views/excel/uploadExcel',
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },

  {
    path: '/zip',
    component: 'Layout',
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: 'views/zip/index',
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: 'Layout',
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: 'views/pdf/index',
        name: 'PDF',
        meta: { title: 'pdf', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: 'views/pdf/download',
    hidden: true
  },

  {
    path: '/theme',
    component: 'Layout',
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: 'views/theme/index',
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: 'Layout',
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: 'views/clipboard/index',
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/i18n',
    component: 'Layout',
    children: [
      {
        path: 'index',
        component: 'views/i18n-demo/index',
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },

  {
    path: 'external-link',
    component: 'Layout',
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },
*/
  { path: '*', redirect: '/404', hidden: true }
]
