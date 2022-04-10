import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:name',
    name: 'mark-docs',
    component: () => import('@/src/views/MarkdownTransfer/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
