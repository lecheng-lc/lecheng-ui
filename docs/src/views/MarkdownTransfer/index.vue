<template>
  <div class="home">
    <Layout>
      <template v-slot:center>
        <component :is="current" />
      </template>
    </Layout>
  </div>
</template>

<script lang="ts">
import Layout from '../../components/Layout'
import { markdown } from '../../constant'
console.log(markdown,'kkkk')
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ComponentInternalInstance,
  watch,
  ref
} from 'vue'
import { useRoute } from 'vue-router'
type MarkdownType = keyof typeof markdown
export default defineComponent({
  components: {
    Layout,
    ...markdown
  },
  setup() {
    const current = ref('')
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const pathChange = (
      name: string = (proxy?.$route.path as string).substring(1)
    ) => {
      current.value = (name[0].toUpperCase() +
        name.substring(1)) as MarkdownType
    }
    const route = useRoute()
    watch(
      () => route.path,
      (val: string) => {
        pathChange(val.substring(1))
      }
    )
    onMounted(() => {
      pathChange()
    })
    return {
      current
    }
  }
})
</script>

<style lang="stylus">
.home
  iframe
    width 100%
    height 100%
</style>
