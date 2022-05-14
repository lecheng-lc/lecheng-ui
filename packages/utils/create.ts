import { get } from './basic';
import { camelize } from './format';
import { isFunction } from './validate';
import locale from '../locale/index';

export function createTranslate(name: string) {
  const prefix = camelize(name) + '.';

  return (path: string, ...args: unknown[]) => {
    const messages = locale.messages();
    console.log(messages,'=-==')
    // console.log(messages)
    // console.log(prefix, name, path,'---',messages) // prefix-->demoI18n0.  name-->demo-i18n-0 path-->icon1
    const message = get(messages, prefix + path) || get(messages, path);
    // console.log(message)
    return isFunction(message) ? message(...args) : message;
  };
}

export type Translate = ReturnType<typeof createTranslate>;

export type Mod = string | { [key: string]: any };
export type Mods = Mod | Mod[];

function genBem(name: string, mods?: Mods): string {
  if (!mods) {
    return '';
  }

  if (typeof mods === 'string') {
    return ` ${name}--${mods}`;
  }

  if (Array.isArray(mods)) {
    return mods.reduce<string>((ret, item) => ret + genBem(name, item), '');
  }

  return Object.keys(mods).reduce(
    (ret, key) => ret + (mods[key] ? genBem(name, key) : ''),
    ''
  );
}

/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
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

export type BEM = ReturnType<typeof createBEM>;

export function createNamespace(name: string) {
  const prefixedName = `lc-${name}`;
  return [
    prefixedName,
    createBEM(prefixedName),
    createTranslate(prefixedName),
  ] as const;
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


