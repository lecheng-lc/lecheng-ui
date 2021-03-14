
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { routerDir } from '../constant'
import Home from './Home/Index'
const routes: RouteRecordRaw[] = []
const composeRoute = (name: string): RouteRecordRaw => ({
	path: `/${name}`,
	name: `/${name}`,
	component: () => import(`@@/${name}/demo/Index.vue`)
})
routerDir.forEach(x => {
  x.items.forEach(item => {
	  routes.push(composeRoute(item.name))
  })
})
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
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
