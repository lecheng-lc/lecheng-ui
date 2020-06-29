import { Mod, Mods } from 'types/bem';

type PrefixFn = {
  (key?: string): string;
}

// const APP_PREFIX = 'esc-'
const MODULE = '__';
const MODIFIER = '--';

function addSymbol(name: string, app?: string) {
  const isModule = new RegExp(MODULE).test(name);
  return (subName?: string) => (!isModule
    ? (app ? `${app}-` : '') + name + (subName ? MODULE + subName : '')
    : name + (subName ? MODIFIER + subName : ''));
}

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

/**
 * css BEM 规则辅助函数
 * 用法举例：
 * 1. 初始化命名空间 const bem = Bem('button') => esc-button
 * 2. bem 接受 3 个参数，模块、修饰符、是否自动添加父级 class
 *    1. 模块举例：
 *      - bem() => 'esc-button'
 *      - bem('large') => ['esc-button', 'esc-button__large'] 自动添加了父级 class
 *      - bem('large', false) => ['esc-button__large']
 *      - bem({ large: true, plain: false }) => ['esc-button', 'esc-button__large']
 *      - bem(['primary', { plain: true }])  => ['esc-button', 'esc-button__large', 'esc-button__plain']
 *    2. 修饰符举例（模块只能是字符串）：
 *      - bem('primary', 'text') => ['esc-button__primary', 'esc-button__primary--text'] 自动添加了父级 class
 *      - bem('primary', ['text', { loading: true }], false) => ['esc-button__primary--text', { 'esc-button__primary--loading': true }]
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
  const auto = autoAddParent === undefined ? defaultAuto : autoAddParent;
  const prefix: PrefixFn = addSymbol(name, app);
  if (!module) {
    return prefix();
  } if (typeof module === 'string' && modifiers) {
    return join(addSymbol(prefix(module), app), modifiers, auto);
  }
  return join(prefix, module, auto);
};

export const border = bem('border', 'esc');
export default bem;
