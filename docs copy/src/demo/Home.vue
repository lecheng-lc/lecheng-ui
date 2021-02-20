<template>
  <div class="demo-home">
    <p class="demo-home-title">
      Vue + ts 实践业务组件库
      动画交互UI库
    </p>
    <div class="demo-home-list" v-for="(item, index) in routerDir" :key="item.title">
      <p class="demo-home-list-title" @click="toggleVisible(index)">{{ item.title }}</p>
      <transition name="nav">
        <div class="demo-home-list__item-group" v-show="showIndex.indexOf(index) >= 0">
          <div
            class="demo-home-list-item"
            v-for="nav in item.items"
            :key="nav.title"
            @click="toUrl(nav.name)"
          >{{ nav.title }}</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { routerDir, PackageItemGroup } from '../constant'

@Component({})
export default class HomeDemo extends Vue {
  routerDir: PackageItemGroup[] = routerDir
  showIndex: number[] = []

  toggleVisible(index: number): void {
    const position = this.showIndex.indexOf(index)
    if (position >= 0) {
      this.showIndex.splice(position, 1)
      return
    }
    this.showIndex.push(index)
  }

  toUrl(name: string): void {
    // 父组件通信
    parent.window.location.href = parent.window.location.origin + '#/' + name
  }
}
</script>

<style lang="stylus">
.demo-home
  padding 15px 20px
  &-list
    user-select none
    margin-bottom 20px
    border-radius 3px
    overflow hidden
    &__item-group
      overflow hidden
      background-color #fff
    &-title
      position relative
      font-size 16px
      padding 15px 20px
      margin 0
      background-color #fff
      z-index 2
    &-item
      font-size 14px
      margin-left 20px
      padding 10px 0
      border-top solid 1px #ebedf0
.nav-enter-active
  position relative
  animation nav-slide 0.2s linear
.nav-leave-active
  position relative
  animation nav-slide 0.2s linear reverse
@keyframes nav-slide
  from
    transform translateY(-100%)
  to
    transform translateY(0)
</style>
