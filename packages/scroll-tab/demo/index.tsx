import {
ref,
isRef,
reactive,
defineComponent,
onBeforeUpdate,
getCurrentInstance,
onMounted,
type Ref
} from 'vue'
import ScrollTap from '../ScrollTap'
import '../index.styl'
import Page from './page.vue'
const mockLists = [
  {
    label: '财经',
    code: 'CJ',
    count: 50,
  },
  {
    label: '科技2',
    code: 'KJ',
    count: 600,
  },
  {
    label: '财经3',
    code: 'CJ1',
    count: 70,
  },
  {
    label: '科技4',
    code: 'KJ1',
    count: 90,
  },
  {
    label: '财经5',
    code: 'CJ2',
    count: 50,
  },
  {
    label: '科技6',
    code: 'KJ2',
    count: 90,
  },
  {
    label: '财经7',
    code: 'CJ3',
    count: 70,
  },
  {
    label: '科技8',
    code: 'KJ3',
    count: 60,
  },
  {
    label: '财经9',
    code: 'CJ4',
    count: 90,
  },
  {
    label: '科技10',
    code: 'KJ4',
    count: 90,
  },
]
export default defineComponent({
  setup(props, { emit, slots }) {
    const tabList = reactive<any>(mockLists)
    const tabIndex = ref<number>(0)
    let pageItemRefs: any = []
    const onClick = (index: number) => {
      if (pageItemRefs[index].list.length === 0) {
        pageItemRefs[index].init();
      }
      pageItemRefs[index].recover();
      tabList.forEach((item: any, idx: number) => {
        if (tabIndex.value !== idx && pageItemRefs) {
          pageItemRefs[index].stop();
        }
      })
    }
    onBeforeUpdate(() => {
      pageItemRefs = []
    })
    const setItemRef = (el: any) => {
      pageItemRefs.push(el)
    }
    onMounted(() => {
      onClick(0)
    })

    const slotsRender: any = {
      header() {
        return <div style="height:150px;background:#a8a8a8;position:sticky;top:0; display:flex;justify-content: center;align-items: center;">
          header区域
        </div>
      }
    }
    for (let i = 0; i < tabList.length; i++) {
      slotsRender[i] = function () {
        return <div key={i} style="min-height: 1px">
          <Page ref={setItemRef}> </Page>
        </div>
      }
    }
    return () => {
      return (
        <div>
          <ScrollTap v-model={tabIndex.value} v-slots={slotsRender} tabList={tabList} onClick={onClick}>
          </ScrollTap>
        </div>
      )
    }
  }
})

