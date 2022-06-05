export declare function createTranslate(name: string): (path: string, ...args: unknown[]) => any;
export declare type Translate = ReturnType<typeof createTranslate>;
export declare type Mod = string | {
    [key: string]: any;
};
export declare type Mods = Mod | Mod[];
/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
export declare function createBEM(name: string): (el?: Mods | undefined, mods?: Mods | undefined) => Mods;
export declare type BEM = ReturnType<typeof createBEM>;
export declare function createNamespace(name: string): readonly [string, (el?: Mods | undefined, mods?: Mods | undefined) => Mods, (path: string, ...args: unknown[]) => any];
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
