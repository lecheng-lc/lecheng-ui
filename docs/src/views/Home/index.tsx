import { defineComponent } from 'vue'
import Layout from '../../components/Layout'
import './home.scss'
export default defineComponent({
  name: 'Home',
  setup() {
    const slots = {
      center: () => <div class="home_page-content"><p>Vue3.0+ts组件库</p></div>
    }
    return () => (
      <div class="home">
        <Layout msg="Welcome to Your Vue.js + TypeScript App" v-slots={slots}>
        </Layout>
      </div>
    )
  }
})