import { ref ,defineComponent} from 'vue'
import {createNamespace} from '../utils/index'

const [name, bem] = createNamespace('line-clamp')
export default defineComponent({
  name,
  setup() {
    const textContent = ref<string>('浮动元素是如何定位的正阿斯2222阿斯达打萨达是啊大大所阿达阿达啊阿达撒打啊ad安达市安达市阿斯达萨达啊达阿斯顿哈')
    const textContent2 = ref<string>('浮动元素是如何定位的打点')
    return () =>{
      return (
        <div class={bem()}>
          <h3>demo1</h3>
          <div class={bem('wrapper')}>
            <input type="checkbox"  class={bem('mark')} id="mark"/>
            <div class={bem('content')}>
              <label class={bem('label')} for="mark">
              </label>
              {textContent.value}
            </div>
          </div>
          <h3 style="margin-top:70px">demo2</h3>
          <div class={bem('wrapper')}>
            <input type="checkbox"  class={bem('mark')} id="mark"/>
            <div class={bem('content')}>
              <label class={bem('label')} for="mark">
              </label>
              {textContent2.value}
            </div>
          </div>
        </div>


      )
    }
  }
})
