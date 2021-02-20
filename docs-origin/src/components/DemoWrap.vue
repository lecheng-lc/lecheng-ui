<template>
  <div class="esc-demo-wrap">
    <div class="esc-title">
      <div
        class="esc-title__back"
        @click="back"
      >
        返回
      </div>
      <div
        class="esc-title__content"
      >
        <slot name="title">
          {{ name[0].toUpperCase() + name.substr(1) }}
        </slot>
      </div>
      <div
        class="esc-title__right"
        @click="edit()"
      >
        编辑
      </div>
    </div>
    <div
      class="esc-demo-content"
      :class="{
        'esc-demo-pd': !noPadding
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Title',

  props: {
    name: String,
    noPadding: Boolean,
  },

  methods: {
    back() {
      // this.$router.back()
      history.go(-2);
    },

    edit() {
      window.open(`https://github.com/Jmingzi/esc-ui/tree/master/packages/${this.name || 'button'}/demo/index.vue`);
    },
  },
};
</script>

<style lang="stylus">
@import '~@@/style/var.styl'
.esc-demo
  &-wrap
    padding-top 45px
    font-size 14px
  // &-content
    // padding 10px
    // & .esc-button
    // margin-right 10px
  &-pd
    padding 10px
.esc-title
  position fixed
  top 0
  width 100%
  left 0
  background-color #ffffff
  display flex
  justify-content space-between
  align-items center
  height 45px
  padding 0 10px
  z-index 2
  /*border-bottom 1px border-color solid*/
  &__back
  &__right
    color link-color
    cursor pointer
  &__content
    font-size 18px
</style>
