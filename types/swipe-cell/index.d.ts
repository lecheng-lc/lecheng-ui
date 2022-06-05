export declare const SwipeCell: import("../utils").WithInstall<import("vue").DefineComponent<{
    name: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    disabled: BooleanConstructor;
    leftWidth: (StringConstructor | NumberConstructor)[];
    rightWidth: (StringConstructor | NumberConstructor)[];
    beforeClose: import("vue").PropType<import("../utils").Interceptor>;
    stopPropagation: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("open" | "click" | "close")[], "open" | "click" | "close", import("vue").ComponentProvideOptions, {
    name: string;
    props: {
        name: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        disabled: BooleanConstructor;
        leftWidth: (StringConstructor | NumberConstructor)[];
        rightWidth: (StringConstructor | NumberConstructor)[];
        beforeClose: import("vue").PropType<import("../utils").Interceptor>;
        stopPropagation: BooleanConstructor;
    };
    emits: ("open" | "click" | "close")[];
    setup(this: void, props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
        name: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        disabled: BooleanConstructor;
        leftWidth: (StringConstructor | NumberConstructor)[];
        rightWidth: (StringConstructor | NumberConstructor)[];
        beforeClose: import("vue").PropType<import("../utils").Interceptor>;
        stopPropagation: BooleanConstructor;
    }>> & {
        onClick?: ((...args: any[]) => any) | undefined;
        onClose?: ((...args: any[]) => any) | undefined;
        onOpen?: ((...args: any[]) => any) | undefined;
    }>>, { emit, slots }: import("vue").SetupContext<("open" | "click" | "close")[]>): () => JSX.Element;
}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    disabled: BooleanConstructor;
    leftWidth: (StringConstructor | NumberConstructor)[];
    rightWidth: (StringConstructor | NumberConstructor)[];
    beforeClose: import("vue").PropType<import("../utils").Interceptor>;
    stopPropagation: BooleanConstructor;
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
    onOpen?: ((...args: any[]) => any) | undefined;
}, {
    name: string | number;
    disabled: boolean;
    stopPropagation: boolean;
}>>;
export default SwipeCell;
export type { SwipeCellProps } from './SwipeCell';
export type { SwipeCellSide, SwipeCellPosition, SwipeCellInstance, } from './types';
declare module 'vue' {
    interface GlobalComponents {
        LcSwipeCell: typeof SwipeCell;
    }
}
