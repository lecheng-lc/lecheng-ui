
import { routerDir } from '../constant'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import {defineAsyncComponent} from 'vue'
import Home from './Home/Index'
const modules = (import.meta as any).glob('../../../packages/**/**.tsx');
const routes: RouteRecordRaw[] = []
const composeRoute = (name: string): RouteRecordRaw => ({
	path: `/${name}`,
	name: `/${name}`,
	component: modules[`../../../packages/${name}/demo/index.tsx`]
	// component: () => defineAsyncComponent(()=>import( /* @vite-ignore */ `@@/${name}/demo/index.tsx`))
})
routerDir.forEach(x => {
  x.items.forEach(item => {
	  routes.push(composeRoute(item.name))
  })
})
console.log(routes)
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
