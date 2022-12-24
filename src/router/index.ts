import { createRouter, createWebHashHistory } from 'vue-router'

import layout from '@/layout/index.vue'

const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/test1',
    children: [
      {
        path: 'test1',
        component: () => import('@/views/test/index1.vue')
      },
      {
        path: 'test2',
        component: () => import('@/views/test/index2.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
