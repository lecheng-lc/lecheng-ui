import { defineComponent, ref, reactive } from 'vue'
import { PackageItemGroup } from '../../constant'
import './home.stylus'
export default defineComponent({
  name: 'Home',
  setup() {
    const showIndex = reactive<number[]>([])
    const routerDir = reactive<PackageItemGroup[]>([])
    const toggleVisible = (index: number): void => {
      const position = showIndex.indexOf(index)
      if (position >= 0) {
        showIndex.splice(position, 1)
        return
      }
      showIndex.push(index)
    }

    const toUrl = (name: string): void => {
      // 父组件通信
      parent.window.location.href = parent.window.location.origin + '#/' + name
    }
    return () => (
      <div class="demo-home">
        <p class="demo-home-title">
          Vue3.0 + ts 实践业务组件库
          动画交互UI库
        </p>
        {
          routerDir.map((item, index) => {
            return <div class="demo-home-list">
              <p class="demo-home-list-title" onClick={() => toggleVisible(index)}>{item.title}</p>
              <transition name="nav">
                <div class="demo-home-list__item-group" v-show={showIndex.indexOf(index) >= 0}>
                  {
                    item.items.map((itemNav) => {
                      return <div class="demo-home-list-item" onClick={() => toUrl(itemNav.name)}>{itemNav.title}</div>
                    })
                  }
                </div>
              </transition>
            </div>
          })
        }
      </div >
    )
  }
})
