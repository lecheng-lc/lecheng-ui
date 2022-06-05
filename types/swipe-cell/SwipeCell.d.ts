import { type PropType, type ExtractPropTypes } from 'vue';
import { // [number,string]
Interceptor } from '../utils/index';
declare const swipeCellProps: {
    name: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    disabled: BooleanConstructor;
    leftWidth: (StringConstructor | NumberConstructor)[];
    rightWidth: (StringConstructor | NumberConstructor)[];
    beforeClose: PropType<Interceptor>;
    stopPropagation: BooleanConstructor;
};
export declare type SwipeCellProps = ExtractPropTypes<typeof swipeCellProps>;
declare const _default: import("vue").DefineComponent<{
    name: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    disabled: BooleanConstructor;
    leftWidth: (StringConstructor | NumberConstructor)[];
    rightWidth: (StringConstructor | NumberConstructor)[];
    beforeClose: PropType<Interceptor>;
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
        beforeClose: PropType<Interceptor>;
        stopPropagation: BooleanConstructor;
    };
    emits: ("open" | "click" | "close")[];
    setup(this: void, props: Readonly<import("@vue/shared").LooseRequired<Readonly<ExtractPropTypes<{
        name: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        disabled: BooleanConstructor;
        leftWidth: (StringConstructor | NumberConstructor)[];
        rightWidth: (StringConstructor | NumberConstructor)[];
        beforeClose: PropType<Interceptor>;
        stopPropagation: BooleanConstructor;
    }>> & {
        onClick?: ((...args: any[]) => any) | undefined;
        onClose?: ((...args: any[]) => any) | undefined;
        onOpen?: ((...args: any[]) => any) | undefined;
    }>>, { emit, slots }: import("vue").SetupContext<("open" | "click" | "close")[]>): () => JSX.Element;
}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    name: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    disabled: BooleanConstructor;
    leftWidth: (StringConstructor | NumberConstructor)[];
    rightWidth: (StringConstructor | NumberConstructor)[];
    beforeClose: PropType<Interceptor>;
    stopPropagation: BooleanConstructor;
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
    onOpen?: ((...args: any[]) => any) | undefined;
}, {
    name: string | number;
    disabled: boolean;
    stopPropagation: boolean;
}>;
export default _default;
