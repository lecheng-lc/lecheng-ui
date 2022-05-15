import { ref, reactive } from 'vue';
import { deepAssign } from '../utils/deep-assign';
import defaultMessages from './lang/zh-CN';
var lang = ref(window.localStorage.getItem('lcui_language') || 'zh-CN');

var _messages = reactive({
  'zh-CN': defaultMessages
}); // console.log(messages,'我是messages')


export var Locale = {
  messages: function messages() {
    return _messages[lang.value];
  },

  /**
   * @description 主要是用来赋值哪种类型的语言，供messages方法来使用
   * @param newLang 语言类型
   * @param newMessages  新增语言字段
   */
  use: function use(newLang, newMessages) {
    var _this$add;

    lang.value = newLang;
    this.add((_this$add = {}, _this$add[newLang] = newMessages, _this$add));
  },

  /**
   * @description 进行新老语言的合并
   * @param newMessages
   */
  add: function add(newMessages) {
    if (newMessages === void 0) {
      newMessages = {};
    }

    deepAssign(_messages, newMessages);
  }
};
export default Locale;