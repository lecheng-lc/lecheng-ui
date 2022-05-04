import { ref, reactive } from 'vue';
import { deepAssign } from '../utils/deep-assign';
import defaultMessages from './lang/zh-CN';

type Message = Record<string, any>;
type Messages = Record<string, Message>;

const lang = ref('zh-CN');
const messages = reactive<Messages>({
  'zh-CN': defaultMessages,
});
// console.log(messages,'我是messages')
export const Locale = {
  messages(): Message {
    return messages[lang.value];
  },
  /**
   * @description 主要是用来赋值哪种类型的语言，供messages方法来使用
   * @param newLang 语言类型
   * @param newMessages  新增语言字段
   */
  use(newLang: string, newMessages?: Message) {
    // console.log(newLang,'被调用', newMessages)
    lang.value = newLang;
    console.log(newLang,'---',messages)
    this.add({ [newLang]: newMessages });
  },
  /**
   * @description 进行新老语言的合并
   * @param newMessages
   */
  add(newMessages: Message = {}) {
    deepAssign(messages, newMessages);
  },
};

export default Locale;
