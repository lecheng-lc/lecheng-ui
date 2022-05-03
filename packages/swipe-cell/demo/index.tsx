import { defineComponent, ref, getCurrentInstance,ComponentInternalInstance } from 'vue'
import { use } from '@@/utils'
const [bem] = use('slide')
import './index.scss'
export default defineComponent({
  setup(props) {
    const startX = ref(0)
    const endX = ref(0)
    const moveX = ref(0)
    const disX = ref(0)
    const deleteSlider = ref('')
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const touchStart = (ev:any)=>{
      console.log(ev)
      ev = ev
      ev.preventDefault()
      startX.value = ev.touches[0].clientX
    }
    const touchMove = (ev: any) =>{
      ev = ev
      ev.preventDefault()
      console.log(ev)
      console.log(1234, startX.value)
      // 获取删除按钮的宽度，此宽度为滑块左滑的最大距离
      let wd = (proxy?.$refs.remove as any).offsetWidth
        // 滑动时距离浏览器左侧实时距离
        moveX.value = ev.touches[0].clientX
        // 起始位置减去 实时的滑动的距离，得到手指实时偏移距离
        disX.value = startX.value - moveX.value
        // 如果是向右滑动或者不滑动，不改变滑块的位置
        if (disX.value < 0 || disX.value == 0) {
          deleteSlider.value = "transform:translateX(0px)"
          // 大于0，表示左滑了，此时滑块开始滑动
        } else if (disX.value > 0) {
          // 具体滑动距离我取的是 手指偏移距离*5
          deleteSlider.value = "transform:translateX(-" + disX.value * 5 + "px)"
          // 最大也只能等于删除按钮宽度
          if (disX.value * 5 >= wd) {
            deleteSlider.value = "transform:translateX(-" + wd + "px)"
          }
        }
    }
    const touchEnd = (ev: any) => {
      ev = ev
      let wd = (proxy?.$refs.remove as any).offsetWidth
        let endX = ev.touches[0].clientX
        disX.value = startX.value - endX
        //如果距离小于删除按钮一半,强行回到起点
        if (disX.value * 5 < wd / 2) {
          deleteSlider.value = 'transform:translateX(0px)'
        } else {
          //大于一半 滑动到最大值
          deleteSlider.value = `transform:translateX(-${wd}px)`
        }
    }
    return () => (
      <div class={bem('wrapper')}>
        <div class={bem('content', false)}>
          <div class={bem('content', 'slide',false)} onTouchmove={(event)=>touchMove(event)} onTouchstart={(event)=>touchStart(event)} onTouchend={(event)=>touchEnd(event)} style={deleteSlider.value}>
          </div>
          <div class={bem('remove', false)} ref='remove'>
            删除
          </div>
        </div>
      </div>
    )
  }
})
