import { defineComponent, ref, getCurrentInstance, ComponentInternalInstance, onMounted, watch, reactive } from 'vue'
import Layout from '../../components/Layout'
import { markdown } from '../../constant'
import './markdownTransfer.stylus'
import {useRoute} from 'vue-router'
type MarkdownType = keyof typeof markdown
export default defineComponent({
  name: 'MarkdonwTransfer',
  setup() {
    const current = ref<MarkdownType>('Bem')
    // const slots = reactive({
    //   center: () => dynaComponent()
    // })
    const route = useRoute()
    let { proxy } = getCurrentInstance() as ComponentInternalInstance
    const pathChange = (name: string = (proxy?.$route.path as string).substring(1)) => {
      current.value = (name[0].toUpperCase() + name.substring(1)) as MarkdownType
      slots.center()
    }
    watch(() => route.path, (val: string) => {
      pathChange(val.substring(1))
    })
    const dynaComponent = ()=>{
      if(!current.value) return
      return markdown[current.value].render()
    }
    onMounted(() => {
      pathChange()
    })
    const slots = {
      center: () => dynaComponent()
    }
    return () => (
      <div class="home">
        <Layout v-slots={slots}>
        </Layout>
      </div>
    )
  }
})