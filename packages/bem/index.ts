import { Mod, Mods } from 'types/bem';

type PrefixFn = {
  (key?: string): string;
}

// const APP_PREFIX = 'lc-'
const MODULE = '__'; // 模块下划线
const MODIFIER = '--'; // 元素下划线

function addSymbol(name: string, app?: string) {
  const isModule = new RegExp(MODULE).test(name);
  return (subName?: string) => (!isModule
    ? (app ? `${app}-` : '') + name + (subName ? MODULE + subName : '')
    : name + (subName ? MODIFIER + subName : ''));
}
// 循环递归
function join(
  prefix: PrefixFn,
  cls: Mods,
  autoAddParent = true,
): Mods {
  const ret: Set<Mod> = new Set();
  if (autoAddParent) {
    ret.add(prefix());
  }
  if (typeof cls === 'string') {
    ret.add(prefix(cls));
  } else if (Array.isArray(cls)) {
    let arr: Mod[] = [];
    cls.forEach((item: Mod): void => {
      arr = arr.concat(join(prefix, item, autoAddParent));
    });
    arr.forEach((item: Mod): void => {
      ret.add(item);
    });
  } else if (typeof cls === 'object') {
    const tmp: Mods = {};
    Object.keys(cls).map((key: string): void => {
      tmp[prefix(key)] = cls[key];
    });
    ret.add(tmp);
  }
  return [...ret];
}

// 这个函数其实运用了闭包的原理
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

const bem = (name: string, app?: string, defaultAuto = false) => (
  module?: Mods,
  modifiers?: Mods | boolean,
  autoAddParent?: boolean,
): Mods => {
  if (typeof modifiers === 'boolean') {
    autoAddParent = modifiers;
    modifiers = undefined;
  }
  const auto = autoAddParent === undefined ? defaultAuto : autoAddParent; // 是否自动添加父级class
  const prefix: PrefixFn = addSymbol(name, app);
  if (!module) {
    return prefix();
  } if (typeof module === 'string' && modifiers) {
    return join(addSymbol(prefix(module), app), modifiers, auto);
  }
  return join(prefix, module, auto);
};

export const border = bem('border', 'lc');
export default bem;
