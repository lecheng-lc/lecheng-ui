# 国际化

### 介绍

lc 采用中文作为默认语言，同时支持英文和中文的切换，请按照下方教程进行国际化设置。

## 使用方法

### 多语言切换

lc-ui 通过 Locale 组件实现多语言支持，使用 `Locale.use` 方法可以切换当前使用的语言。

```js
import { Locale } from 'lc-ui';
// 引入英文语言包
import enUS from 'vant/es/locale/lang/en-US';

Locale.use('en-US', enUS);
```

### 覆盖语言包

通过 `Locale.add` 方法可以实现文案的修改和扩展，示例如下：

```js
import { Locale } from 'lc-ui';

const messages = {
  'zh-CN': {
    vanPicker: {
      confirm: '关闭', // 将'确认'修改为'关闭'
    },
  },
};

Locale.add(messages);
```

### 语言包

目前支持的语言:

| 语言                 | 文件名       | 版本     |
| -------------------- | ------------ | -------- |
| 英语                 | en-US        | -        |
| 简体中文             | zh-CN        | -        |


> 在 [这里](https://github.com/youzan/vant/tree/dev/packages/vant/src/locale/lang) 查看所有的语言包源文件。

## 常见问题

### 找不到所需的语言包？

如果上方列表中没有你需要的语言，欢迎给我们提 Pull Request 来增加新的语言包，改动内容可以参考[增加德语语言包](https://github.com/youzan/vant/pull/7245) 的 PR。

### 业务代码如何实现国际化？

可以使用 [vue-i18n](https://github.com/kazupon/vue-i18n) 来实现。

### 以 CDN 形式引入时，如何使用语言包？

目前没有提供 CDN 形式的语言包，可以手动拷贝语言包的内容来使用。


