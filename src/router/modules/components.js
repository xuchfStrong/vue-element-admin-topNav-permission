/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  id: 4,
  parentId: 0,
  redirect: '/components/tinymce',
  name: 'ComponentDemo',
  meta: {
    title: 'components',
    icon: 'component'
  },
  children: [
    {
      path: '/components/tinymce',
      component: () => import('@/views/components-demo/tinymce'),
      id: 41,
      parentId: 4,
      name: 'TinymceDemo',
      meta: { title: 'tinymce' }
    },
    {
      path: '/components/markdown',
      component: () => import('@/views/components-demo/markdown'),
      id: 42,
      parentId: 4,
      name: 'MarkdownDemo',
      meta: { title: 'markdown' }
    },
    {
      path: '/components/json-editor',
      component: () => import('@/views/components-demo/jsonEditor'),
      id: 43,
      parentId: 4,
      name: 'JsonEditorDemo',
      meta: { title: 'jsonEditor' }
    },
    {
      path: '/components/splitpane',
      component: () => import('@/views/components-demo/splitpane'),
      id: 44,
      parentId: 4,
      name: 'SplitpaneDemo',
      meta: { title: 'splitPane' }
    },
    {
      path: '/components/avatar-upload',
      component: () => import('@/views/components-demo/avatarUpload'),
      id: 45,
      parentId: 4,
      name: 'AvatarUploadDemo',
      meta: { title: 'avatarUpload' }
    },
    {
      path: '/components/dropzone',
      component: () => import('@/views/components-demo/dropzone'),
      id: 46,
      parentId: 4,
      name: 'DropzoneDemo',
      meta: { title: 'dropzone' }
    },
    {
      path: '/components/sticky',
      component: () => import('@/views/components-demo/sticky'),
      id: 47,
      parentId: 4,
      name: 'StickyDemo',
      meta: { title: 'sticky' }
    },
    {
      path: '/components/count-to',
      component: () => import('@/views/components-demo/countTo'),
      id: 48,
      parentId: 4,
      name: 'CountToDemo',
      meta: { title: 'countTo' }
    },
    {
      path: '/components/mixin',
      component: () => import('@/views/components-demo/mixin'),
      id: 49,
      parentId: 4,
      name: 'ComponentMixinDemo',
      meta: { title: 'componentMixin' }
    },
    {
      path: '/components/back-to-top',
      component: () => import('@/views/components-demo/backToTop'),
      id: 410,
      parentId: 4,
      name: 'BackToTopDemo',
      meta: { title: 'backToTop' }
    },
    {
      path: '/components/drag-dialog',
      component: () => import('@/views/components-demo/dragDialog'),
      id: 411,
      parentId: 4,
      name: 'DragDialogDemo',
      meta: { title: 'dragDialog' }
    },
    {
      path: '/components/drag-select',
      component: () => import('@/views/components-demo/dragSelect'),
      id: 412,
      parentId: 4,
      name: 'DragSelectDemo',
      meta: { title: 'dragSelect' }
    },
    {
      path: '/components/dnd-list',
      component: () => import('@/views/components-demo/dndList'),
      id: 413,
      parentId: 4,
      name: 'DndListDemo',
      meta: { title: 'dndList' }
    },
    {
      path: '/components/drag-kanban',
      component: () => import('@/views/components-demo/dragKanban'),
      id: 414,
      parentId: 4,
      name: 'DragKanbanDemo',
      meta: { title: 'dragKanban' }
    }
  ]
}

export default componentsRouter
