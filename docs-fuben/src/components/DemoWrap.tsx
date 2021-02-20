import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DemoWrapper',
  props: {
    name: String,
    noPadding: Boolean,
  },
  setup(props) {
    const back = () => {
      history.go(-2)
    }
    const edit = () => {
      window.open(`https://github.com/Jmingzi/esc-ui/tree/master/packages/${props.name || 'button'}/demo/index.vue`);
    }
    return (
      <div class="esc-demo-wrap">
        <div class="esc-title">
          <div class="esc-title__back" onClick={() => back}>
            返回
        </div>
        </div>
        <div class="esc-title__content" >
          <slot name="title">
            {props.name![0].toUpperCase() + props.name!.substr(1)}
          </slot>
        </div>
        <div class="esc-title__right" onClick={() => edit()}>
          编辑
        </div>
        <div  class={['esc-demo-content' ,!props.noPadding ? 'esc-demo-pd': '']}>
          <slot />
        </div>
      </div>
    )
  }
})