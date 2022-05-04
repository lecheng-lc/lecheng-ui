import { defineComponent } from "vue"
import Index from '../index'
import '../index.scss'
export default defineComponent({
  setup(){
    const slots = {
      left: ()=>{
        return <div>1111111</div>
      },
      default:()=>{
        return  <div>3222</div>
      },
      right:()=>{
        return <div>33333</div>
      }
    }
    return ()=>(
      <Index v-slots={slots}>
      </Index>
    )
  }
})
