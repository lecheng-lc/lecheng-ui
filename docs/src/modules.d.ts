// import { AsyncComponent } from 'vue/types'
// todo md 在转化为vue组件后，这个类型怎么填？
declare module '*.md' {
    const content: any;
    export default content;
  }
