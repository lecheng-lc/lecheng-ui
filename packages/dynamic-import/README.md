https://blog.csdn.net/sinat_33488770/article/details/121708231
https://github.com/DDFE/DDFE-blog/issues/23

按需加载是所有组件库都会提供的一个基础能力，本文会分析`ElementUI`、`Vant`及`varlet`几个组件库的实现并进行相应实践，帮助你彻底搞懂其实现原理。

# 先搭个简单的组件库

笔者从`ElementUI`里`copy`了两个组件：`Alert`和`Tag`，并将我们的组件库命名为`XUI`，当前目录结构如下：

![image-20211202134343241.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca48d43995fc4a2f844dbd6a261e6599~tplv-k3u1fbpfcp-zoom-1.image)

组件都放在`packages`目录下，每个组件都是一个单独的文件夹，最基本的结构是一个`js`文件和一个`vue`文件，组件支持使用`Vue.component`方式注册，也支持插件方式`Vue.use`注册，`js`文件就是用来支持插件方式使用的，比如`Alert`的`js`文件内容如下：

```
import Alert from './src/main';

Alert.install = function(Vue) {
  Vue.component(Alert.name, Alert);
};

export default Alert;
复制代码
```

就是给组件添加了一个`install`方法，这样就可以使用`Vue.use(Alert)`来注册。

组件的主题文件统一放在`/theme-chalk`目录下，也是每个组件一个样式文件，`index.css`包含了所有组件的样式，`ElementUI`的源码内是`scss`文件，本文为了简单，直接复制了其`npm`包内已经编译后的`css`文件。

最外层还有一个`index.js`文件，这个文件很明显是用来作为入口文件导出所有组件：

```
import Alert from './packages/alert/index.js';
import Tag from './packages/tag/index.js';

const components = [
    Alert,
    Tag
]

const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    Alert,
    Tag
}
复制代码
```

首先依次引入组件库的所有组件，然后提供一个`install`方法，遍历所有组件，依次使用`Vue.component`方法注册，接下来判断是否存在全局的`Vue`对象，是的话代表是`CDN`方式使用，那么自动进行注册，最后导出`install`方法和所有组件。

`Vue`的插件就是一个带有`install`方法的对象，所以我们可以直接引入所有组件：

```
import XUI from 'xui'
import 'xui/theme-chalk/index.css'
Vue.use(XUI)
复制代码
```

也可以单独注册某个组件：

```
import XUI from 'xui'
import 'xui/theme-chalk/alert.css'
Vue.use(XUI.Alert)
复制代码
```

为什么不直接通过`import { Alert } form 'xui'`来引入呢，很明显，会报错。

因为我们的组件库并没有发布到`NPM`，所以通过`npm link`将我们的组件库链接到全局。

接下来笔者使用`Vue CLI`搭建了一个测试项目，运行` npm link xui  `来链接到组件库。然后使用前面的方式注册组件库或某个组件，这里我们只使用`Alert`组件。

通过测试可以发现，无论是注册所有组件，还是只注册`Alert`组件，最后打包后的`js`里都存在`Tag`组件的内容：

![image-20211202140753879.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d93d6e65cf74a549b0648ff4b6ebf4e~tplv-k3u1fbpfcp-zoom-1.image)

接下来开启本文的正文，看看如何把`Tag`去掉。

# 最简单的按需引入

因为每个组件都可以单独作为一个插件，所以我们完全可以只引入某个组件，比如：

```
import Alert from 'xui/packages/alert'
import 'xui/theme-chalk/alert.css'

Vue.use(Alert)
复制代码
```

这样我们只引入了`alert`相关的文件，当然最后只会包含`alert`组件的内容。这样的问题是比较麻烦，使用上成本比较高，最理想的方式还是下面这种：

```
import { Alert } from 'xui'
复制代码
```

# 通过babel插件

使用`babel`插件是目前大多数组件库实现按需引入的方式，`ElementUI`使用的是`babel-plugin-component`：

![image-20211202140924245.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26cde742ebc048a984b991f841d32f31~tplv-k3u1fbpfcp-zoom-1.image)

可以看到能直接使用`import { Alert } form 'xui'`方式来引入`Alert`组件，也不需要手动引入样式，那么这是怎么实现的呢，接下来我们来撸一个极简版的。

原理很简单，我们想要的是下面这种方式：

```
import { Alert } from 'xui'
复制代码
```

但是实际按需使用需要这样：

```
import Alert from 'xui/packages/alert'
复制代码
```

很明显，我们只要帮用户把第一种方式转换成第二种就可以了，而通过`babel`插件来转换对用户来说是无感的。

首先在`babel.config.js`同级新增一个`babel-plugin-component.js`文件，作为我们插件文件，然后修改一下`babel.config.js`文件：

```
module.exports = {
  // ...
  plugins: ['./babel-plugin-component.js']
}
复制代码
```

使用相对路径引用我们的插件，接下来就可以愉快的编码了。

先来看一下`import { Alert } from 'xui'`对应的`AST`树

![image-20211202150933670.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d6167db36124ac2abe9c993c0d68687~tplv-k3u1fbpfcp-zoom-1.image)

整体是一个`ImportDeclaration`，通过`souce.value`可以判断导入的来源，`specifiers`数组里可以找到导入的变量，每个变量是一个`ImportSpecifier`，可以看到里面有两个对象：`ImportSpecifier.imported`和`ImportSpecifier.local`，这两个有什么区别呢，在于是否使用了别名导入，比如：

```
import { Alert } from 'xui'
复制代码
```

这种情况`imported`和`local`是一样的，但是如果使用了别名：

```
import { Alert as a } from 'xui'
复制代码
```

那么是这样的：

![image-20211202152548991.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4fc8ed5e76245fc97978f486b02e84f~tplv-k3u1fbpfcp-zoom-1.image)

我们这里简单起见就不考虑别名情况，只使用`imported`。

接下来的任务就是进行转换，看一下`import Alert from 'xui/packages/alert'`的`AST`结构：

![image-20211202154442551.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5924f972e8cc4963a317bf2dccf8bb49~tplv-k3u1fbpfcp-zoom-1.image)

目标`AST`结构也清楚了接下来的事情就简单了，遍历`specifiers`数组创建新的`importDeclaration`节点，然后替换掉原来的节点即可：

```
// babel-plugin-component.js
module.exports = ({
    types
}) => {
    return {
        visitor: {
            ImportDeclaration(path) {
                const {
                    node
                } = path
                const {
                    value
                } = node.source
                if (value === 'xui') {
                    // 找出引入的组件名称列表
                    let specifiersList = []
                    node.specifiers.forEach(spec => {
                        if (types.isImportSpecifier(spec)) {
                            specifiersList.push(spec.imported.name)
                        }
                    })
                    // 给每个组件创建一条导入语句
                    const importDeclarationList = specifiersList.map((name) => {
                        // 文件夹的名称首字母为小写
                        let lowerCaseName = name.toLowerCase()
                        // 构造importDeclaration节点
                        return types.importDeclaration([
                            types.importDefaultSpecifier(types.identifier(name))
                        ], types.stringLiteral('xui/packages/' + lowerCaseName))
                    })
                    // 用多节点替换单节点
                    path.replaceWithMultiple(importDeclarationList)
                }
            }
        },
    }
}
复制代码
```

接下来打包测试结果如下：

![image-20211202171657728.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fab1b4f47c804f9c91cf80c831699e2d~tplv-k3u1fbpfcp-zoom-1.image)

![image-20211202165120365.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb45371adf3c4dbaa6b82314636da386~tplv-k3u1fbpfcp-zoom-1.image)

可以看到`Tag`组件的内容已经没有了。

当然，以上实现只是一个最简单的`demo`，实际上还需要考虑样式的引入、别名、去重、在组件中引入、引入了某个组件但是实际并没有使用等各种问题，有兴趣的可以直接阅读[babel-plugin-component](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FElementUI%2Fbabel-plugin-component "https://github.com/ElementUI/babel-plugin-component")源码。

`Vant`和`antd`也都是采用这种方式，只是使用的插件不一样，这两个使用的都是[babel-plugin-import](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fumijs%2Fbabel-plugin-import "https://github.com/umijs/babel-plugin-import")，`babel-plugin-component`其实也是`fork`自`babel-plugin-import`。

# Tree Shaking方式

`Vant`组件库除了支持使用前面的`Babel`插件按需加载外还支持`Tree Shaking`方式，实现也很简单，`Vant`最终发布的代码里提供了三种规范的源代码，分别是`commonjs`、`umd`、`esmodule`，如下图：

![image-20211202200713184.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/377d0706134d41189f6977837aedae8d~tplv-k3u1fbpfcp-zoom-1.image)

![image-20211202200806070.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8902378d87a645a28a15da26f908ec69~tplv-k3u1fbpfcp-zoom-1.image)

`commonjs`规范是最常见的使用方式，`umd`一般用于`cdn`方式直接在页面引入，而`esmodule`就是用来实现`Tree Shaking`的，为什么`esmodule`能实现`Tree Shaking`而`commonjs`规范不行呢，原因是`esmodule`是静态编译的，也就是在编译阶段就能确定某个模块导出了什么，引入了什么，代码执行阶段不会改变，所以打包工具在打包的时候就能分析出哪个方法被使用了，哪些没有，没有用到的就可以放心的删掉了。

接下来修改一下我们的组件库，让它也支持`Tree Shaking`，因为我们的组件本身就是`esmodule`模块，所以不需要修改，但是要修改一下导出的文件`index.js`，因为目前还不支持下面这种方式导出：

```
import { Alert } from 'xui'
复制代码
```

增加如下代码：

```
// index.js
// ...

export {
    Alert,
    Tag
}

// ...
复制代码
```

接下来需要修改`package.json`，我们都知道`package.json`里的`main`字段是用来指示包的入口文件，那么是不是只要把这个字段指向`esmodule`的入口文件就行了呢，其实是不行的，因为通常情况下它都是指向`commonjs`模块入口，而且一个包有可能支持`nodejs`和`web`两种环境使用，`nodejs`环境是有可能不支持`esmodule`模块的，既然不能修改旧的字段，那么就只能引入新的字段，也就是`pkg.module`，所以修改`package.json`文件如下：

```
// package.json
{
    // ...
    "mains": "index.js",
    "module": "index.js",// 增加该字段
    // ...
}
复制代码
```

因为我们的组件库只有`esmodule`模块，所以其实这两个字段指向的是一样的，在实际开发中，需要向`Vant`一样编译成不同类型的模块，而且发布到`npm`的模块一般也需要编译成`es5`语法的，因为这些不是本文的重点，所以就省略了这个步骤。

添加了`pkg.module`字段，如果打包工具能识别这个字段，那么会优先使用`esmodule`规范的代码，但是到这里并没有结束，此时打包后发现`Tag`组件的内容依然在，这是为什么呢，不妨看看下面几种导入场景：

```
import 'core-js'
import 'style.css'
复制代码
```

这两个文件都只引入了，但是并没有明显的进行使用，可以把它们删了吗，显然是不行的，这被称为存在“副作用”，所以我们需要告诉打包工具哪些文件是没有副作用的，可以删掉，哪些是有的，给我留着，`Vue CLI`使用的是`webpack`，对应的我们需要在`package.json`文件里新增一个`sideEffects`字段：

```
// package.json
{
    // ...
    "sideEffects": ["**/*.css"],
    // ...
}
复制代码
```

我们的组件库里只有样式文件是存在副作用的。

接下来再打包测试，发现没有引入的`Tag`组件的内容已经被去除了：

![image-20211203095656755.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd8676cbfbb3467080265b255043b008~tplv-k3u1fbpfcp-zoom-1.image)

更多关于`Tree Shaking`的内容可以阅读[Tree Shaking](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.docschina.org%2Fguides%2Ftree-shaking%2F "https://webpack.docschina.org/guides/tree-shaking/")。
[Tree shaking详细用例](https://blog.csdn.net/weixin_43334673/article/details/107811487)
# 使用unplugin-vue-components插件

`varlet`组件库官方文档上按需引入一节里提到使用的是[unplugin-vue-components](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fantfu%2Funplugin-vue-components "https://github.com/antfu/unplugin-vue-components")插件：

![image-20211203144240710.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/655a4cfec89c4c4b9e572b7e5ad8efa5~tplv-k3u1fbpfcp-zoom-1.image)

这种方式的优点是完全不需要自己来引入组件，直接在模板里使用，由插件来扫描引入并注册，这个插件内置支持了很多市面上流行的组件库，对于已经内置支持的组件库，直接参考上图引入对应的解析函数配置一下即可，但是我们的小破组件库它并不支持，所以需要自己来写这个解析器。

首先这个插件做的事情只是帮我们引入组件并注册，实际上按需加载的功能还是得靠前面两种方式。

## Tree Shaking

我们先在上一节的基础上进行修改，保留`package.json`的`module`和`sideEffects`的配置，然后从`main.js`里删除组件引入和注册的代码，然后修改`vue.config.js`文件。因为这个插件的官方文档比较简洁，看不出个所以然，所以笔者是参考内置的`  vant `解析器来修改的：

![image-20211203151054535.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9476d5cfab6b4d399e39445458177373~tplv-k3u1fbpfcp-zoom-1.image)

返回的三个字段含义应该是比较清晰的，`importName`表示引入的组件名，比如`Alert`，`path`表示从哪里引入，对于我们的组件库就是`xui`，`sideEffects`就是存在副作用的文件，基本就是配置对应的样式文件路径，所以我们修改如下：

```js
// vue.config.js
const Components = require('unplugin-vue-components/webpack')

module.exports = {
    configureWebpack: {
        plugins: [
            Components({
                resolvers: [{
                    type: "component",
                    resolve: (name) => {
                        if (name.startsWith("X")) {
                            const partialName = name.slice(1);
                            return {
                                importName: partialName,
                                path: "xui",
                                sideEffects: 'xui/theme-chalk/' + partialName.toLowerCase() + '.css'
                            };
                        }
                    }
                }]
            })
        ]
    }
}
复制代码
```

笔者怕前缀和`ElementUI`重合，所以组件名称前缀都由`El`改成了`X`，比如`ElAlert`改成了`XAlert`，当然模板里也需要改成`x-alert`，接下来进行测试：

![image-20211203151815019.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d6ff50e8aac47a4a175aa81399341fd~tplv-k3u1fbpfcp-zoom-1.image)

![image-20211203151932298.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2fafefcae9e46e0a0ed6a8ec0426742~tplv-k3u1fbpfcp-zoom-1.image)

可以看到运行正常，打包后也成功去除了未使用的`Tag`组件的内容。

## 单独引入

最后让我们再看一下单独引入的方式，先把`pkg.module`和`pkg.sideEffects`字段都移除，然后修改每个组件的`index.js`文件，让其支持如下方式引入：

```js
import { Alert } from 'xui/packages/alert'
复制代码
```

`Alert`组件修改如下：

```
// index.js
import Alert from './src/main';

Alert.install = function(Vue) {
  Vue.component(Alert.name, Alert);
};

// 新增下面两行
export {
  Alert
}

export default Alert;
复制代码
```

接下来再修改我们的解析器：

```
const Components = require('unplugin-vue-components/webpack')

module.exports = {
    configureWebpack: {
        mode: 'production',
        plugins: [
            Components({
                resolvers: [{
                    type: "component",
                    resolve: (name) => {
                        if (name.startsWith("X")) {
                            const partialName = name.slice(1);
                            return {
                                importName: partialName,
                                // 修改path字段，指向每个组件的index.js
                                path: "xui/packages/" + partialName.toLowerCase(),
                                sideEffects: 'xui/theme-chalk/' + partialName.toLowerCase() + '.css'
                            };
                        }
                    }
                }]
            })
        ]
    }
}
复制代码
```

其实就是修改了`path`字段，让其指向每个组件的`index.js`文件，运行测试和打包测试后结果也是符合要求的。

# 小节

本文简单分析了一下组件库实现按需引入的几种方式，有组件库开发需求的朋友可以自行抉择，示例代码请移步：[github.com/wanglin2/Co…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fwanglin2%2FComponentLibraryImport "https://github.com/wanglin2/ComponentLibraryImport")。


