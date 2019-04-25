/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  id: 5,
  parentId: 0,
  redirect: '/charts/keyboard',
  name: 'Charts',
  meta: {
    title: 'charts',
    icon: 'chart'
  },
  children: [
    {
      path: '/charts/keyboard',
      component: () => import('@/views/charts/keyboard'),
      id: 51,
      parentId: 5,
      name: 'KeyboardChart',
      meta: { title: 'keyboardChart', icon: 'chart', noCache: true }
    },
    {
      path: '/charts/line',
      component: () => import('@/views/charts/line'),
      id: 52,
      parentId: 5,
      name: 'LineChart',
      meta: { title: 'lineChart', icon: 'chart', noCache: true }
    },
    {
      path: '/charts/mixchart',
      component: () => import('@/views/charts/mixChart'),
      id: 53,
      parentId: 5,
      name: 'MixChart',
      meta: { title: 'mixChart', noCache: true }
    }
  ]
}

export default chartsRouter
