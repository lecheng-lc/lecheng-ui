import {
  ref,
  Ref,
  reactive,
  watch,
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  nextTick,
  getCurrentInstance,
  type PropType,
  type ExtractPropTypes,
  type ComponentPublicInstance
} from 'vue'
import './TabNav.styl'
// import { useTouch } from '../composables/index.ts'
// import { useTouch,useRect, useExpose, useClickAway } from '../composables/index'
import { useExpose } from '../composables/use-expose'; // 挂在方法到vue getCurrentInstance().proxy上去
import BScroll from '@better-scroll/core'
import {
  clamp,
  isDef,
  numericProp, // [number,string]
  Interceptor,  // 事件拦截器type
  preventDefault, // 阻止默认事件
  callInterceptor, // 事件拦截器
  createNamespace, // 创建bem风格
  makeNumericProp, //  类型校验
  makeNumberProp,
  makeArrayProp
} from '../utils/index';
const [name, bem] = createNamespace('scroll-tap')
const tabNavProps = {
  name: makeNumericProp(''),
  value: makeNumberProp(0),
  tabs: makeArrayProp(),
  isSticky: Boolean,
  tidy: Boolean,
  stickyTop: makeNumberProp(0),
  stopPropagation: Boolean,
};

export type ScrollTabProps = ExtractPropTypes<typeof tabNavProps>; // 精确的提取类型约束
export default defineComponent({
  name,
  props: tabNavProps,
  emits: ['input', 'click'],
  setup(props, { emit }) {
    let bs = reactive<any>({})
    const navWrapper = ref<HTMLElement>()
    onMounted(() => {
      nextTick(() => {
        bs = new BScroll(navWrapper.value!, {
          scrollX: true,
          scrollY: false,
          click: true,
          bounceTime: 300,
          useTransition: false,
          eventPassthrough: 'vertical',
        });
      })
    })

    watch(() => props.value, ()=>{
      animate()
    })
    const clickNav = (idx: number) => {
      emit('click', idx)
    }
    const animate = (duration: number = 300) => {
      if (navWrapper.value) {
        const tabNavEl = navWrapper.value
        const contentOffsetWidth = (tabNavEl.querySelector('.nav-content') as HTMLElement).offsetWidth;
        const list = Array.from(tabNavEl.querySelectorAll('.item'));
        const item: any = list[props.value];
        if (!item) return;
        const { offsetWidth: tabsWidth } = tabNavEl;
        const { offsetLeft, offsetWidth: itemWidth } = item;

        const min = -(contentOffsetWidth - tabsWidth);
        let to = (tabsWidth - itemWidth) / 2 - offsetLeft;
        if (to > 0) {
          to = 0;
        } else if (to <= min) {
          to = min;
        }
        bs.scrollTo(to, 0, duration);
      }
    }
    onUnmounted(() => {
      bs.destroy()
    })
    return () => {
      return (
        <div
          class="nav-wrapper"
          ref={navWrapper}
          style={{ top: `${props.stickyTop}px` }}
        >
          <div class="nav-content">
            {
              props.tabs.map((item: any, idx) => {

                return (
                  <div onClick={() => clickNav(idx)} key={item.label} class={`${props.value === idx ? 'active' : ''} item`}>
                    {item.label}
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
  }
})
