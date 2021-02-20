import { defineComponent } from 'vue'
import Layout from '../components/Layout.vue'
import './home.scss'
export default defineComponent({
  name:'Home',
  components:{
    Layout
  },
  setup(){
    return (
      <div class="home">
        <Layout slot="center">
          <div class="home_page-content">
            <p>Vue+ts组件库</p>
          </div>
        </Layout>
      </div>
    )
  }
})