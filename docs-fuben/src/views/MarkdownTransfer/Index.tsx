import { defineComponent, ref, getCurrentInstance, ComponentInternalInstance, onMounted, watch } from 'vue'
import Layout from '../../components/Layout'
import { markdown } from '../../constant'
import './markdownTransfer.stylus'
export default defineComponent({
  name: 'MarkdonwTransfer',
  components: {
    ...markdown,
    Layout
  },
  setup() {
    const current = ref('')
    let { proxy } = getCurrentInstance() as ComponentInternalInstance
    const pathChange = (name: string = proxy?.$route.path!.substring(1)) => {
      current.value = name[0].toUpperCase() + name.substring(1)
    }
    watch(() => '$route.path', (val: string) => {
      pathChange(val.substring(1))
    })
    onMounted(() => {
      pathChange()
    })
    return () => (
      <div class="home">
        <Layout>
          <component is={current}></component>
        </Layout>
      </div>
    )
  }
})