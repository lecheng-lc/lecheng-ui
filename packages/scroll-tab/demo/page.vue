<template>
  <div id="" style="background: #fefefe">
    <p v-for="(item, idx) in list" :key="idx">
      {{ idx }}---------------------------
    </p>
    <p
      v-if="isLoading"
      style="min-height: 100vh; text-align: center; padding-top: 10px"
    >
      加载中...
    </p>
  </div>
</template>

<script lang="ts">
import mock from './mock'
import { defineComponent} from 'vue'
export default defineComponent({
  data() {
    return {
      list: <any[]>[],
      isStop: false,
      isLoading: true,
    }
  },

  methods: {
    stop(index:any) {
      this.isStop = true
      console.log(index,'stop')
    },
    recover() {
      this.isStop = false
      console.log(2345)
    },
    init() {
      this.loadList();
      (this as any).bsBody.on('pullingUp', () => {
        console.log('wtm', this.isStop)
        console.log(this)
        if (this.isStop) return
        this.loadList()
      })
    },
    loadList() {
      this.isLoading = true
      setTimeout(() => {
        this.list.push(...mock);
        this.isLoading = false;
        (this as any).bsBody.finishPullUp()
        this.$nextTick(() => {
          (this as any).bsBody.updateHeight()
        })
      }, 1000)
    },
  },
})
</script>

<style scoped lang="less" style="text/less"></style>
