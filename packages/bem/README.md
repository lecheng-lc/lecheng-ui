## Bem

css BEM 命名规则生成函数，目的是优化在 `template` 或 `jsx` 中 BEM 的写法。

引入

```js
import { Bem } from 'esc-ui'

const bem = Bem(moduleName: string, app?: string)
```

代码演示

```jsx
class Cart {
  render() {
    const bem = useBem('cart', 'esc')
    return (
      <div class={bem()}>
        <div class={bem('goods')}>
          <div class={bem('goods', ['img', { normal: true }])}>
        </div>
      </div>
    )
  }
}
```

Bem函数思路
- 项目存在可选的全局唯一的命名空间，例如 `esc`
- 遵循BEM命名规范
- vue 支持解析 `:class` 的所有值

在实际的项目中使用时
- 存在命名空间，可自行封装函数
```
// assets/js/use.ts
export const bem = (mod: string) => useBem(mod, "你的全局命名名称")
```

- 不存在，可直接调用
```
const bem = useBem('cart')

bem('nav')
bem('cart', 'submit')
```
