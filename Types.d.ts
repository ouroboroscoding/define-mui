import { Node } from '@ouroboros/define';
export type labelOptions = 'above' | 'none' | 'placeholder';
export type typeOptions = 'create' | 'search' | 'update';
export type variantOptions = 'filled' | 'outlined' | 'standard';
export type dynamicOptionStruct = {
    node: string;
    trigger: string;
    options: Record<string, any>;
};
export type errorStruct = {
    code: number | string;
    msg: any;
};
export type gridSizesStruct = {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
};
export type onEnterCallback = () => void;
export type onErrorCallback = (error: errorStruct) => Record<string, any>;
export type onSubmitCallback = (values: Record<string, any>) => boolean;
export type handleErrorsProp = Record<string, onErrorCallback | Record<string, any>>;
export type DefineNodeProps = {
    error: string | false;
    label?: labelOptions;
    name: string;
    node: Node;
    onChange: (val: any) => void;
    onEnter: () => void | false;
    placeholder?: string;
    type: typeOptions;
    value?: any;
    validation?: boolean;
    variant: variantOptions;
};
export type DefineNodeBaseProps = {
    display: Record<string, any>;
    error?: string | false;
    label?: labelOptions;
    name: string;
    node: Node;
    onChange?: (val: any) => void;
    onEnter?: () => void | false;
    placeholder?: string;
    value?: any;
    validation?: boolean;
    variant: variantOptions;
};
export type DefineNodeBaseState = {
    error?: string | false;
    value: any;
};
