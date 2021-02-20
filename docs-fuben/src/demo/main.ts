import {createApp} from 'vue'
import App from '../App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
const app = createApp(App)
app.use(VueLazyload)

// window.onhashchange = () => {
//   const { hash, href } = window.parent.location
//   // console.log(location.hash)
//   if (hash !== location.hash) {
//     window.parent.location.href = href.split('#')[0] + location.hash
//   }
// }

// router.afterEach((to, from) => {
//   console.log(to)
// })

app.use(router).mount('#app')