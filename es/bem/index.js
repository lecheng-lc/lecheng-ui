// const APP_PREFIX = 'lc-'
var MODULE = '__'; // 模块下划线

var MODIFIER = '--'; // 元素下划线

function addSymbol(name, app) {
  var isModule = new RegExp(MODULE).test(name);
  return function (subName) {
    return !isModule ? (app ? app + "-" : '') + name + (subName ? MODULE + subName : '') : name + (subName ? MODIFIER + subName : '');
  };
} // 循环递归


function join(prefix, cls, autoAddParent) {
  if (autoAddParent === void 0) {
    autoAddParent = true;
  }

  var ret = new Set();

  if (autoAddParent) {
    ret.add(prefix());
  }

  if (typeof cls === 'string') {
    ret.add(prefix(cls));
  } else if (Array.isArray(cls)) {
    var arr = [];
    cls.forEach(function (item) {
      arr = arr.concat(join(prefix, item, autoAddParent));
    });
    arr.forEach(function (item) {
      ret.add(item);
    });
  } else if (typeof cls === 'object') {
    var tmp = {};
    Object.keys(cls).map(function (key) {
      tmp[prefix(key)] = cls[key];
    });
    ret.add(tmp);
  }

  return [].concat(ret);
} // 这个函数其实运用了闭包的原理

/**
 * css BEM 规则辅助函数
 * 用法举例：
 * 1. 初始化命名空间 const bem = Bem('button') => lc-button
 * 2. bem 接受 3 个参数，模块、修饰符、是否自动添加父级 class
 *    1. 模块举例：
 *      - bem() => 'lc-button'
 *      - bem('large') => ['lc-button', 'lc-button__large'] 自动添加了父级 class
 *      - bem('large', false) => ['lc-button__large']
 *      - bem({ large: true, plain: false }) => ['lc-button', 'lc-button__large']
 *      - bem(['primary', { plain: true }])  => ['lc-button', 'lc-button__large', 'lc-button__plain']
 *    2. 修饰符举例（模块只能是字符串）：
 *      - bem('primary', 'text') => ['lc-button__primary', 'lc-button__primary--text'] 自动添加了父级 class
 *      - bem('primary', ['text', { loading: true }], false) => ['lc-button__primary--text', { 'lc-button__primary--loading': true }]
 */


var bem = function bem(name, app, defaultAuto) {
  if (defaultAuto === void 0) {
    defaultAuto = false;
  }

  return function (module, modifiers, autoAddParent) {
    if (typeof modifiers === 'boolean') {
      autoAddParent = modifiers;
      modifiers = undefined;
    }

    var auto = autoAddParent === undefined ? defaultAuto : autoAddParent; // 是否自动添加父级class

    var prefix = addSymbol(name, app);

    if (!module) {
      return prefix();
    }

    if (typeof module === 'string' && modifiers) {
      return join(addSymbol(prefix(module), app), modifiers, auto);
    }

    return join(prefix, module, auto);
  };
};

export var border = bem('border', 'lc');
export default bem;