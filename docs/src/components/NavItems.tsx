import { defineComponent,PropType, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { use } from '@@/utils'
import { PackageItemGroup, PackageItem } from '../constant'
import '../assets/components-css/NavItems.stylus'
export default defineComponent({
  props: {
    list: {
      type: Object as PropType<PackageItemGroup[]>,
      default:[]
    }
  },
  setup(props,{emit}) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const [bem] = use('nav')
    const isActive = (nav: PackageItem): boolean => {
      return proxy?.$route.path.substring(1) === nav.name
    }
    
    const redirect = (nav: PackageItem) => {
      proxy?.$router.push(`/${nav.name}`)
      emit('change',nav )
    }
    return () => (
      <div class={bem('wrap')}>{
        props.list.map((group) => (
          <div class={bem('group', false)}>
            <div class={bem('group', 'title', false)}>{ group.title }</div>
            {
              group.items.map((nav) => (
                <div
                  class={bem(['item', { active: isActive(nav) }], false)}
                  onClick={redirect.bind(this, nav)}
                >
                  { nav.title }
                </div>
              ))
            }
          </div>
        ))
      }</div>
    )
  }
})