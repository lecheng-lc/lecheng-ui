import { Mods } from 'types/bem';
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
declare const bem: (name: string, app?: string | undefined, defaultAuto?: boolean) => (module?: any, modifiers?: Mods | boolean, autoAddParent?: boolean | undefined) => Mods;
export declare const border: (module?: any, modifiers?: Mods | boolean, autoAddParent?: boolean | undefined) => Mods;
export default bem;
