import { defineComponent, reactive, ref, computed, watch, onMounted, getCurrentInstance, ComponentInternalInstance } from 'vue'
import {  use } from '@@/utils'
import NavItems from './NavItems'
import { PackageItemGroup, PackageItem, routerDir } from '../constant'
const [bem] = use('layout')
import '../assets/components-css/Layout.stylus'
import { useRoute } from 'vue-router'
const TOP_DEFAULT_DIS = 60
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
    const navStyleTop = computed(() => {
      return (TOP_DEFAULT_DIS  - docScrollTop.value) < 0 ? 0 : TOP_DEFAULT_DIS  - docScrollTop.value
    })
    const isScrollOut = computed(()=>{
      return docScrollTop.value > 60
    })
    const currentLanguage= ref<string>(window.localStorage.getItem('lcui_language') || 'zh-CN')
    const changeIframe = (pathName: string) => {
      demoSrc.value = routerDir.some((obj) => obj.items.some((x) => pathName === x.name && x.noDemo === true))
        ? ''
        : `./demo.html#/${pathName}`
    }
    const changeLanguage = ()=>{
      if(currentLanguage.value === 'zh-CN'){
        currentLanguage.value = 'en-US'
      } else{
        currentLanguage.value = 'zh-CN'
      }
      window.localStorage.setItem('lcui_language', currentLanguage.value)
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
            <div class={bem('top','language', false)} onClick={changeLanguage}>
              <span class={bem('top','language--text', false)}>
                {currentLanguage.value}
              </span>
            </div>
          </div>
        </div>
        <div class={bem('content', false)}>
          <div class={ bem('content--left', 'sticky', false )}  style={{top:`${navStyleTop.value}px`}}>
            <nav-items list={navItems} onChange={navChange}  />
          </div>
          <div class={bem('content','center', false)}>
            <div class="van-doc-content">{(slots as any).center()}</div>
          </div>
          {
            demoSrc.value ? (
              <div class={isScrollOut.value ? bem('content--right', 'fixed'): bem('content--right', 'sticky')}>
                <iframe frameborder="0"  src={demoSrc.value} />
              </div>
            ) : null
          }
        </div>
      </div>
    )
  }
})
