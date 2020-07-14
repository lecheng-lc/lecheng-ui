import Vue, { AsyncComponent } from 'vue'
import Router from 'vue-router'
import { routerDir } from '../constant'
import Home from './Home.vue'

Vue.use(Router)

interface Route {
  path: string,
  name: string,
	component: AsyncComponent
}

const composeRoute = (name: string): Route => ({
	path: `/${name}`,
	name: `/${name}`,
	component: () => import(`@@/${name}/demo/index.vue`)
})

const routes: Route[] = []
routerDir.forEach(x => {
  x.items.forEach(item => {
	  routes.push(composeRoute(item.name))
  })
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    ...routes
  ]
})
