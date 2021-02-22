import { defineComponent, reactive, ref, computed, watch, onMounted, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { use } from '@@/utils'
import NavItems from './NavItems'
import { PackageItemGroup, PackageItem, routerDir } from '../constant'
const [bem] = use('layout')
import '../assets/components-css/Layout.stylus'
export default defineComponent({
  components: {
    'nav-items': NavItems
  },
  props:{
    msg: String
  },
  setup(props, { slots,attrs }) {
    const navItems = reactive<PackageItemGroup[]>(routerDir)
    const demoSrc = ref<string>('')
    const docScrollTop = ref<number>(0)
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const isScrollOut = computed(() => {
      return docScrollTop.value > 40
    })
    const changeIframe = (pathName: string) => {
      demoSrc.value = routerDir.some((obj) => obj.items.some((x) => pathName === x.name && x.noDemo === true))
        ? ''
        : `./demo.html#/${pathName}`;
    }
    const navChange = (nav: PackageItem) => {
      changeIframe(nav.name)
    }
    watch(() => '$route.path', (val: string) => {
      console.log('watch进去了么')
      // changeIframe(val.substring(1))
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
            <a class={bem('top', 'title', false)} href="">
              <div>
                <span class={bem('top', 'content-small', false)}> 业务组件库</span>
              </div>
            </a>
          </div>
        </div>
        <div class={(isScrollOut.value ? bem('left', 'sticky') : bem('left', false))}>
          <nav-items list={navItems} onChange={navChange} />
        </div>
        <div class={bem('center', false)}>
          <div class="van-doc-content">{(slots as any).center()}</div>
        </div>
        {
          demoSrc.value ? (
            <div class={(isScrollOut.value ? bem('right', 'sticky') : bem('right', false))}>
              <iframe  src={demoSrc.value} />
            </div>
          ) : null
        }
      </div>
    )
  }
})