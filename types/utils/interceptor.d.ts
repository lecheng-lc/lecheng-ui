export declare type Interceptor = (...args: any[]) => Promise<boolean> | boolean | undefined | void;
/**
 * @description :拦截器
 * @param interceptor
 * @param param1
 */
export declare function callInterceptor(interceptor: Interceptor | undefined, { args, done, canceled, }: {
    args?: unknown[];
    done: () => void;
    canceled?: () => void;
}): void;
