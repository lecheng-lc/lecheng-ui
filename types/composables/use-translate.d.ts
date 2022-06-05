import type { App } from 'vue';
import type { Router } from 'vue-router';
declare global {
    interface Window {
        app: App;
        vueRouter: Router;
    }
}
/**
 * @description 用来控制iframe中demo示例的汉化
 */
export declare function initDemoLocale(): void;
/**
 * @description 对每一个组件进行国际化
 * @param i18n
 * @returns
 */
export declare function useTranslate(i18n: Record<string, any>): (path: string, ...args: unknown[]) => any;
