import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import 'highlight.js/styles/github.css';
// 其他元素使用 github 的样式
import 'github-markdown-css'
import './assets/markdown.css'
const app = createApp(App)
import { Router, RouteLocationNormalizedLoaded } from 'vue-router'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $route: RouteLocationNormalizedLoaded
    $router: Router
  }
}
app.config.globalProperties.$router = router
createApp(App).use(store).use(router).mount('#app')
