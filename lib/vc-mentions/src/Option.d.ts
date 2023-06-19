import type { ExtractPropTypes } from 'vue';
export declare const optionProps: {
    value: StringConstructor;
    disabled: BooleanConstructor;
    label: (FunctionConstructor | StringConstructor | NumberConstructor)[];
};
export declare type OptionProps = Partial<ExtractPropTypes<typeof optionProps>>;
export declare const optionOptions: {
    name: string;
    props: {
        value: StringConstructor;
        disabled: BooleanConstructor;
        label: (FunctionConstructor | StringConstructor | NumberConstructor)[];
    };
    render(_props: any, { slots }: any): any;
};
declare const _default: import("vue").DefineComponent<{
    value: StringConstructor;
    disabled: BooleanConstructor;
    label: (FunctionConstructor | StringConstructor | NumberConstructor)[];
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    value: StringConstructor;
    disabled: BooleanConstructor;
    label: (FunctionConstructor | StringConstructor | NumberConstructor)[];
}>>, {
    disabled: boolean;
}>;
export default _default;
