import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'highlight.js/styles/github.css';
// 其他元素使用 github 的样式
import 'github-markdown-css';
import './assets/markdown.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
