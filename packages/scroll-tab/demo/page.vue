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
  components: {},
  props: {},
  data() {
    return {
      list: [],
      isStop: false,
      isLoading: true,
    }
  },

  methods: {
    stop() {
      this.isStop = true
    },
    recover() {
      this.isStop = false
    },
    init() {
      this.loadList()
      console.log(this)
      console.log('-----')
      this.bsBody.on('pullingUp', () => {
        if (this.isStop) return
        this.loadList()
      })
    },
    loadList() {
      this.isLoading = true
      setTimeout(() => {
        this.list.push(...mock)
        this.isLoading = false
        this.bsBody.finishPullUp()
        this.$nextTick(() => {
          this.bsBody.updateHeight()
        })
      }, 1000)
    },
  },
})
</script>

<style scoped lang="less" style="text/less"></style>
