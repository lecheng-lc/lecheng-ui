
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { routerDir } from '../constant'
import Home from './Home.vue'
const routes: RouteRecordRaw[] = []
const composeRoute = (name: string): RouteRecordRaw => ({
	path: `/${name}`,
	name: `/${name}`,
	component: () => import(`@@/${name}/demo/index.vue`)
})
routerDir.forEach(x => {
  x.items.forEach(item => {
	  routes.push(composeRoute(item.name))
  })
})
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    ...routes
  ]
})
export default router
