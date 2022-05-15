import { defineComponent } from "vue"
import Index from '../index'
import '../index.styl'
import './demo.scss'
import { useTranslate } from '../../composables/use-translate';
const t = useTranslate({
  'zh-CN': {
    content:'内容',
    left: '左边',
    right: '右边'
  },
  'en-US': {
    content:'content',
    left: 'left',
    right: 'right'
  },
});

export default defineComponent({
  setup(){
    const slots = {
      left: ()=>{
        return <div>{t('left')}</div>
      },
      default:()=>{
        return  <div>{t('content')}</div>
      },
      right:()=>{
        return <div>{t('right')}</div>
      }
    }
    return ()=>(
      <Index v-slots={slots}>
      </Index>
    )
  }
})
