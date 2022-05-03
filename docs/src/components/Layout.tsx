import { defineComponent, reactive, ref, computed, watch, onMounted, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { use } from '@@/utils'
import NavItems from './NavItems'
import { PackageItemGroup, PackageItem, routerDir } from '../constant'
const [bem] = use('layout')
import '../assets/components-css/Layout.stylus'
import { useRoute } from 'vue-router'
export default defineComponent({
  components: {
    'nav-items': NavItems
  },
  props: {
    msg: String
  },
  setup(props, { slots }) {
    const navItems = reactive<PackageItemGroup[]>(routerDir)
    const demoSrc = ref<string>('')
    const docScrollTop = ref<number>(0)
    const route = useRoute()
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const isScrollOut = computed(() => {
      return docScrollTop.value > 40
    })
    const changeIframe = (pathName: string) => {
      demoSrc.value = routerDir.some((obj) => obj.items.some((x) => pathName === x.name && x.noDemo === true))
        ? ''
        : `./demo.html#/${pathName}`
    }
    const navChange = (nav: PackageItem) => {
      changeIframe(nav.name)
    }
    watch(() => route.path, (val: string) => {
      changeIframe(val.substring(1))
    })
    onMounted(() => {
      window.onscroll = () => {
        docScrollTop.value = document.documentElement.scrollTop;
      }
      changeIframe((proxy?.$route.path as String).substr(1));
    })
    return () => (
      <div class={bem()}>
        <div class={bem('top', false)}>
          <div class={bem('top', 'content', false)}>
            <a class={bem('top', 'title', false)} href="/">
              <div>
                <span class={bem('top', 'content-small', false)}>MARK</span>
              </div>
            </a>
          </div>
        </div>
        <div class={bem('content', false)}>
          <div class={(isScrollOut.value ? bem('left', 'sticky') : bem('content','left', false))}>
            <nav-items list={navItems} onChange={navChange} />
          </div>
          <div class={bem('content','center', false)}>
            <div class="van-doc-content">{(slots as any).center()}</div>
          </div>
          {
            demoSrc.value ? (
              <div class={(isScrollOut.value ? bem('right', 'sticky') : bem('content','right', false))}>
                <iframe frameborder="0"  src={demoSrc.value} />
              </div>
            ) : null
          }
        </div>
      </div>
    )
  }
})
