### 组件化原则

本文大多数以 vant-ui 库为例

#### 标准化

##### 组件命名规则统一

- 形成命名空间，避免相同相同标签的冲突
- 规范化管理，统一风格

```js
// vant/packages/vant/src/swipe-cell/SwipeCell.tsx 
const [name, bem] = createNamespace('swipe-cell')
...
export default defineComponent({
  name,
  ...
})
// vant 统一创建命名空间函数
// vant/packages/vant/src/utils/create.ts
export function createNamespace(name: string) {
  const prefixedName = `van-${name}`
  return [
    prefixedName,
    createBEM(prefixedName),
    createTranslate(prefixedName)
  ] as const;
}
```

##### 样式分离独立文件
```html
 - SwipeCell.tsx
 - index.less
```
##### 变量命名的统一

`以vant-ui的SwipeCell组件为例`

- 声明时始终采用(camelCase)

```js
const getWidthByRef = (ref: Ref<HTMLElement | undefined>) =>
  ref.value ? useRect(ref).width : 0;

const leftWidth = computed(() =>
  isDef(props.leftWidth) ? +props.leftWidth : getWidthByRef(leftRef)
);

const rightWidth = computed(() =>
  isDef(props.rightWidth) ? +props.rightWidth : getWidthByRef(rightRef)
);
```

- 在模板和JSX中应该始终使用( kebab-case)

```html
<van-swipe-cell :before-close="beforeClose"> .... </van-swipe-cell>
```

##### 使用什么技术统一风格
仍然以vant-ui相关库为例
* pnpm来管理项目
* .editorconfig来统一编辑器代码风格
* husky做git提交校验
* .eslintrc、.prettierrc来保证代码的风格一致性
* 代码层面上面使用ts+less+tsx作为组件的编写规范

#### 组合性
以action-sheet组件为例
##### 将CSS模块进行拆分
```css
/* vant/packages/vant/src/action-sheet/index.less */
@import './var.less';
@import '../style/mixins/hairline';
```
##### 将JS模块进行拆分
```js
// vant/packages/vant/src/action-sheet/ActionSheet.tsx
// Utils
import {
  pick,
  extend,
  truthProp,
  makeArrayProp,
  makeStringProp,
  createNamespace,
  HAPTICS_FEEDBACK,
} from '../utils';
```
#### 复用性
##### 样式规则复用
使用bem风格来极大限度的复用CSS
传送门:[CSS 架构之 BEM](https://www.jianshu.com/p/b3472742ec92)
```js
// vant/packages/vant/src/utils/create.ts
export function createBEM(name: string) {
  return (el?: Mods, mods?: Mods): Mods => {
    if (el && typeof el !== 'string') {
      mods = el;
      el = '';
    }
    el = el ? `${name}__${el}` : name;
    return `${el}${genBem(el, mods)}`;
  };
}
```
##### 组件复用
`秉承高内聚和低耦合的规范`,以vant中uploader组件为例
组件内部互不影响，UploaderPreviewItem.tsx不工作的时候，uploader.tsx照样是可以工作的，那么就称之为uploader.tsx和UploaderPreviewItem.tsx低耦合
```html
<!-- vant/packages/vant/src/uploader -->
- uploader.tsx
- UploaderPreviewItem.tsx 
```
所以再封装组件的时候，vue为例，尽量不要使用$parent, $refs来访问父子的组件，能用props用props,即**尽量与上下文无关**
> 单一支职责
  * 一个组件负责完成一个职责/功能。
> 共同封闭原则
  * 将那些会同时修改，或者因为同一个目的发生修改的代码，放到一个组件里。举个例子，现在有 A、B、C 三个组件，A 和 B 都依赖 C。但是经常 A 的改动就需要改动 C 做一些兼容。这个时候，就适合将 C 组件直接移到到 A 组件中。
> 提高可配置性
  * 尽可能对外暴露出属性和方法，比如vant-ui中action-sheet中的这段代码
  ```js
   // vant/packages/vant/src/action-sheet/ActionSheet.tsx
   // slot 和 props
   const renderCancel = () => {
      if (slots.cancel || props.cancelText) {
        return [
          <div class={bem('gap')} />,
          <button type="button" class={bem('cancel')} onClick={onCancel}>
            {slots.cancel ? slots.cancel() : props.cancelText}
          </button>,
        ];
      }
    };

    const renderActionContent = (action: ActionSheetAction, index: number) => {
      if (action.loading) {
        return <Loading class={bem('loading-icon')} />;
      }

      if (slots.action) {
        return slots.action({ action, index });
      }

      return [
        <span class={bem('name')}>{action.name}</span>,
        action.subname && <div class={bem('subname')}>{action.subname}</div>,
      ];
    };
  ```
> 扁平化的数据结构
比如vant-ui中action-sheet中的这段代码。如果采用object的形式，全部塞进去那么就会有问题，得一个一个去取值，搞不好还会漏掉。
```js
// vant/packages/vant/src/action-sheet/ActionSheet.tsx
const actionSheetProps = extend({}, popupSharedProps, {
  title: String,
  round: truthProp,
  actions: makeArrayProp<ActionSheetAction>(),
  closeIcon: makeStringProp('cross'),
  closeable: truthProp,
  cancelText: String,
  description: String,
  closeOnPopstate: truthProp,
  closeOnClickAction: Boolean,
  safeAreaInsetBottom: truthProp,
})
```

#### 可维护性
##### 文档的必要性
以ActionSheet组件为例
```js
    // 每个组件目录下面都会有README.md
    
    // 组件结构如下
    - demo/
    - test/
    - ActionSheet
    - README.md
    - README.zh-CN.md
    - index.less
    - index.ts
    - var.less
```
##### 代码的可读性
* 组件的命名---看其名知其意
* 变量的命名---看其名知其意
如action-sheet组件中方var.less,看着就很舒服。
```css
@import '../style/var.less';

@action-sheet-max-height: 80%;
@action-sheet-header-height: 48px;
@action-sheet-header-font-size: var(--van-font-size-lg);
@action-sheet-description-color: var(--van-text-color-2);
@action-sheet-description-font-size: var(--van-font-size-md);
@action-sheet-description-line-height: var(--van-line-height-md);
@action-sheet-item-background: var(--van-background-color-light);
@action-sheet-item-font-size: var(--van-font-size-lg);
@action-sheet-item-line-height: var(--van-line-height-lg);
@action-sheet-item-text-color: var(--van-text-color);
@action-sheet-item-disabled-text-color: var(--van-text-color-3);
@action-sheet-subname-color: var(--van-text-color-2);
@action-sheet-subname-font-size: var(--van-font-size-sm);
@action-sheet-subname-line-height: var(--van-line-height-sm);
@action-sheet-close-icon-size: 22px;
@action-sheet-close-icon-color: var(--van-gray-5);
@action-sheet-close-icon-padding: 0 var(--van-padding-md);
@action-sheet-cancel-text-color: var(--van-gray-7);
@action-sheet-cancel-padding-top: var(--van-padding-xs);
@action-sheet-cancel-padding-color: var(--van-background-color);
@action-sheet-loading-icon-size: 22px;
```

#### 具体代码规范可参考如下
[前端代码质量管理](https://juejin.cn/post/6844903824512008205)
[肉联帮团队前端代码规范](https://juejin.cn/post/684490414228924007)

