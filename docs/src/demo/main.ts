import {createApp} from 'vue'
import App from '../App'
import router from './router'
import VueLazyload from 'vue-lazyload-next'
const app = createApp(App)
app.use(VueLazyload)
app.use(router).mount('#app')