import Locale from '../locale';
import enUS from '../locale/lang/en-US';
import { camelize, createTranslate } from '../utils';
console.log(123);
/**
 * @description 用来控制iframe中demo示例的汉化
 */

export function initDemoLocale() {
  Locale.add({
    'en-US': enUS
  });
  console.log(1223222); // switch lang after routing

  window.addEventListener('storage', function (event) {
    var lang = event.newValue;
    Locale.use(lang);
  }); // if (window.vueRouter) {
  //   window.vueRouter.afterEach((to) => {
  //     const { lang } = to.meta || {};
  //     if (lang) {
  //       Locale.use(lang as string);
  //     }
  //   });
  // }
  // add some basic locale messages

  Locale.add({
    'zh-CN': {
      add: '增加',
      red: '红色',
      tab: '标签',
      tag: '标签',
      desc: '描述信息',
      back: '返回',
      title: '标题',
      status: '状态',
      button: '按钮',
      option: '选项',
      search: '搜索',
      orange: '橙色',
      yellow: '黄色',
      purple: '紫色',
      custom: '自定义',
      content: '内容',
      username: '用户名',
      password: '密码',
      decrease: '减少',
      disabled: '禁用状态',
      uneditable: '不可编辑',
      basicUsage: '基础用法',
      advancedUsage: '高级用法',
      loadingStatus: '加载状态'
    },
    'en-US': {
      add: 'Add',
      red: 'Red',
      tab: 'Tab',
      tag: 'Tag',
      desc: 'Description',
      back: 'Back',
      title: 'Title',
      status: 'Status',
      button: 'Button',
      option: 'Option',
      search: 'Search',
      orange: 'Orange',
      yellow: 'Yellow',
      purple: 'Purple',
      custom: 'Custom',
      content: 'Content',
      username: 'Username',
      password: 'Password',
      decrease: 'Decrease',
      disabled: 'Disabled',
      uneditable: 'Uneditable',
      basicUsage: 'Basic Usage',
      advancedUsage: 'Advanced Usage',
      loadingStatus: 'Loading'
    }
  });
}
initDemoLocale();
var demoUid = 0;
/**
 * @description 对每一个组件进行国际化
 * @param i18n
 * @returns
 */

export function useTranslate(i18n) {
  var demoName = "demo-i18n-" + demoUid++;

  if (i18n) {
    var locales = {};
    var camelizedName = camelize(demoName);
    Object.keys(i18n).forEach(function (key) {
      var _locales$key;

      locales[key] = (_locales$key = {}, _locales$key[camelizedName] = i18n[key], _locales$key);
    });
    console.log(JSON.parse(JSON.stringify(locales)), '===');
    Locale.add(locales);
  } // console.log('我是useTranslate方法')


  return createTranslate(demoName);
}