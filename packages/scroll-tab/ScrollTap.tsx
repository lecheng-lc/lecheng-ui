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
import TabNav from './TabNav';
// import { useTouch } from '../composables/index.ts'
// import { useTouch,useRect, useExpose, useClickAway } from '../composables/index'
import { useExpose } from '../composables/use-expose'; // 挂在方法到vue getCurrentInstance().proxy上去
import { useClickAway } from '../composables/use-click-awway';
import { useRect } from '../composables/use-rect';
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
  makeArrayProp,
  truthProp
} from '../utils/index';
import BScroll from '@better-scroll/core'
import NestedScroll from '@better-scroll/nested-scroll';
import Slide from '@better-scroll/slide';
import Pullup from '@better-scroll/pull-up';

BScroll.use(NestedScroll)
BScroll.use(Slide)
BScroll.use(Pullup)
const [name, bem] = createNamespace('scroll-tap')
type SwipeCellSide = 'left' | 'right';
type SwipeCellPosition = SwipeCellSide | 'cell' | 'outside';
type SwipeCellExpose = {
  open: (side: SwipeCellSide) => void;
  close: (position: SwipeCellPosition) => void;
}
const scrollTabProps = {
  name: makeNumericProp(''),
  value: makeNumberProp(0),
  tabList: makeArrayProp(),
  isSticky: truthProp,
  tidy: Boolean,
  stickyTop: makeNumberProp(0),
  stopPropagation: Boolean,
};
export type ScrollTabProps = ExtractPropTypes<typeof scrollTabProps>; // 精确的提取类型约束
type ScrollTabInstance = ComponentPublicInstance<
  ScrollTabProps,
  SwipeCellExpose
>
export default defineComponent({
  name,
  props: scrollTabProps,
  emits: ['input', 'click'],
  setup(props, { emit, slots }) {
    const isArrivedTop = ref<Boolean>(false)
    const isShowNav = ref<Boolean>(false)
    const activeIndex = ref<number>(-1)
    let tabs = reactive<any[]>([])
    let bsBody = reactive<any>({})
    let bsSlide = reactive<any>({})
    const slideHeight = ref<string>('auto')
    const bodyWrapper = ref<HTMLElement>()
    const headerWrapper = ref<HTMLElement>()
    const slideWrapper = ref<HTMLElement>()
    const slideContent = ref<HTMLElement>()
    const navWrapper = ref<HTMLElement>()
    const ST = ref<number>(0)
    const instance = getCurrentInstance()
    const showNav = computed(() => {
      if (props.tidy) {
        return isShowNav.value && isArrivedTop.value
      }
      if (props.isSticky) {
        console.log(123)
        console.log(isArrivedTop.value)
        return isArrivedTop.value
      }
      return false
    })

    const rollerWidth = computed(() => {
      return `${tabs.length * 100}%`
    })
    const updateHeight = () => {
      if(!slideContent.value) return
      const activePage:any = Array.from(slideContent.value!.children)[activeIndex.value as number];
      slideHeight.value = activePage.offsetHeight + 60 + 'px';
      if (bsBody) {
        nextTick(() => {
          bsBody.refresh()
        })
      }
    }
    const handleNav = () => {
      const y = bsBody.movingDirectionY;
      console.log(y);
      if (y === 1) {
        // 手指上滑
        isShowNav.value = false;
      } else if (y === -1) {
        // 手指下滑
        isShowNav.value = true;
      }
    }
    watch(activeIndex, () => {
      updateHeight()
    })
    // watch(bsSlide.enable, (newVal, oldVal) => {
    //   console.log('bsSlide.enabled', newVal, oldVal);
    // })
    if (props.tabList.length > 0) {
      activeIndex.value = props.value
      tabs = props.tabList.map((n: any) => {
        return {
          _marginTop: 0,
          ...n
        }
      })
      console.log(tabs)
      console.log('我是tabs')
    }
    const handleSlide = () => {
      if (!isArrivedTop.value || showNav.value) {
        bsSlide.enable();
      } else {
        bsSlide.disable();
      }
    }
    const initBody = () => {
      bsBody = new BScroll(bodyWrapper.value!, {
        scrollX: false,
        scrollY: true,
        click: true,
        stopPropagation: true,
        bounce: false,
        useTransition: false,
        probeType: 3,
        nestedScroll: {
          groupId: 'shared',
        },
        pullUpLoad: {
          threshold: 300,
        },
      })
      bsBody.on('scroll', (position: any) => {
        const headerHeight = headerWrapper.value!.offsetHeight
        isArrivedTop.value = position.y <= props.stickyTop && Math.abs(position.y) >= (headerHeight - props.stickyTop)
        if (props.tidy) {
          handleNav()
        }
      })
      bsBody.on('touchEnd', () => {
        handleSlide()
      })
      bsBody.updateHeight = updateHeight
      instance!.appContext.config.globalProperties.bsBody = bsBody
    }
    const goToPage = (startIndex: number, endIndex: number) => {
      handleStart(startIndex);
      bsSlide.goToPage(endIndex, 0, 300);
      handleEnd()
    }
    const setIndex = (index: number, isClick = true) => {
      if (index === activeIndex.value) return
      const startIndex = activeIndex.value
      activeIndex.value = index
      emit('input', index)
      emit('click', index);
      if (isClick) {
        goToPage(startIndex, index);
      }
    }
    const cache = (() => {
      let obj: any = {};
      return (key: any, fn: any) => {
        if (obj.hasOwnProperty(key)) return obj[key]
        return fn();
      };
    })();
    const getOffset = (child: any, parent: any) => {
      parent = parent || document.body;

      let [left, top] = [0, 0];

      while (child && child !== parent) {
        left += child.offsetLeft;
        top += child.offsetTop;
        child = child.offsetParent;
      }

      return { left, top };
    }
    const getSlideOffsetTop = () => {
      return getOffset(slideWrapper.value, bodyWrapper.value).top;
    }
    const handleEnd: any = (e: Event) => {
      // 此时activeIndex已指向目的页面
      if (handleEnd.did) return
      handleEnd.did = true
      updateHeight() // 更新高度
      const pages = Array.from(slideContent.value!.children);
      if (isArrivedTop.value) {
        const scrollTop = Math.round(ST.value - tabs[activeIndex.value as number]._marginTop); // 应该滚动的距离
        console.log(scrollTop, 'scrollTop','ST.value',ST.value,'tabs[activeIndex.value as number]._marginTop',tabs[activeIndex.value as number]._marginTop)
        const minScrollTop =
          cache('slideOT', getSlideOffsetTop.bind(this)) - navWrapper.value!.offsetHeight - props.stickyTop; // 这个值一直都会是150
        tabs.forEach((item, idx) => {
          let className = 'h-zero';
          if (activeIndex.value !== idx) {
            const ST = item._scrollTop || 0;
            // console.log(item._marginTop, idx, '[[[[')
            if (ST > 0) {
              // 有记录  当前页面值 - 之前页面的滚动记录值（item._scrollTop一定是正值）
              console.log(idx, ST, scrollTop, item._marginTop, '888')
              item._marginTop = scrollTop - item._scrollTop;
            } else {
              // 无记录，说明页面tab并没有滚动到，那么ST=0 minScrollTop = 150   _marginTop = 当前页面滚动值 - 150 - 0
              item._marginTop = scrollTop - minScrollTop - ST;
              console.log(idx, ST, minScrollTop, item._marginTop, '99999')
            }
          } else {
            item._marginTop = 0;
            className = 'h-auto';
          }
          (pages[idx] as HTMLElement).style.marginTop = item._marginTop + 'px';
          pages[idx].setAttribute('class', className);
        });
        nextTick(() => {
          bsBody.scrollTo(0, -Math.max(scrollTop, minScrollTop), 0);
        });
      } else {
        tabs.forEach((item, idx) => {
          // 不吸顶 状态下 marginTop 都为0， 不用操作滚动
          item._marginTop = 0;
          let className = 'h-zero';
          if (activeIndex.value === idx) {
            className = 'h-auto';
          }
          (pages[idx] as any).style.marginTop = 0;
          pages[idx].setAttribute('class', className);
        });
      }
    }
    const handleStart = (startIndex = activeIndex.value) => {
      handleEnd.did = false;
      ST.value = Math.abs(bsBody.y) // 滚动的高度
      const slideOffsetTop =
        cache('slideOT', getSlideOffsetTop.bind(this)) - navWrapper.value!.offsetHeight - props.stickyTop; // 这个值一直都会是150
      const pages = Array.from(slideContent.value!.children);
      tabs.forEach((item, idx) => {
        if (startIndex === idx) {
          item._scrollTop = ST.value  // 记录自己位置
        }
        if (isArrivedTop.value) {
          // 吸顶, 处理其他page
          if (startIndex !== idx) {
            const innerST = item._scrollTop || 0;
            if (innerST > 0) {
              // 有记录,这时候算出的值为一个负值，比如当前页面translateY = 100px 那不再当前下标的值就位当前
              item._marginTop = ST.value - item._scrollTop
            } else {
              item._marginTop = ST.value - slideOffsetTop;
            }
          }
        } else {
          // 不吸顶 case
          item._marginTop = 0;
        }
        (pages[idx] as HTMLElement).style.marginTop = item._marginTop + 'px';
        pages[idx].setAttribute('class', 'h-auto');
      });
    }
    const initSlide = () => {
      console.log(slideWrapper.value)
      console.log(9999)
      bsSlide = new BScroll(slideWrapper.value!, {
        scrollX: true,
        scrollY: false,
        slide: {
          threshold: 100,
          loop: false,
          autoplay: false,
        },
        useTransition: false,
        momentum: false,
        bounce: false,
        nestedScroll: {
          groupId: 'shared',
        },
      })
      bsSlide.on('slideWillChange', (page: any) => {
        console.log('page--->', page);
        setIndex(page.pageX, false);
      });
      bsSlide.on('scrollStart', handleStart);
      bsSlide.on('scrollEnd', handleEnd);
      bsSlide.on('scrollCancel', handleEnd);
    }
    onMounted(() => {
      initBody()
      initSlide()
      console.log(2222)
      updateHeight()
    })
    onUnmounted(() => {
      bsBody.destroy()
      bsSlide.destroy()
    })
    return () => {
      return (
        <div class="multi-tab">
          {
            props.isSticky ?
              <div class={`nav0 ${showNav.value ? 'show' : ''} ${(isArrivedTop.value && props.tidy) ? 'trans' : ''}`} >
                {
                  slots['nav'] ?
                    slots['nav']() :
                    <TabNav onClick={setIndex} value={activeIndex.value} tabs={tabs} stickyTop={props.stickyTop} isSticky={true}></TabNav>
                }
              </div> : null
          }
          {/* 滚动区域 */}
          <div class="body-wrapper" ref={bodyWrapper}>
            <div class="body-content">
              {/* header区  */}
              <div ref={headerWrapper}>
                {slots['header']?.()}
              </div>
              {/* 导航区 */}
              <div ref={navWrapper}>
                {
                  slots['nav'] ? slots['nav']() :
                    <TabNav value={activeIndex.value} tabs={tabs} onClick={setIndex}></TabNav>
                }
              </div>
              {/* 侧滑区域 */}
              <section ref={slideWrapper} class="slide-wrapper">
                <div
                  class="slide-content"
                  ref={slideContent}
                  style={{ width: rollerWidth.value, height: slideHeight.value }}
                >
                  {
                    tabs.map((item, index) => {
                      return (
                        <div class="slide-page" key={index}>
                          {slots[index]?.()}
                        </div>
                      )
                    })
                  }
                </div>
              </section>
            </div>
          </div>
        </div>
      )
    }
  }
})
