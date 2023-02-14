/**
 * Format Array
 *
 * Handles arrays of FormatOC nodes/parents
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2022-03-19
 */
/// <reference types="react" />
import { BaseNode, ArrayNode } from '@ouroboros/define';
import PropTypes from 'prop-types';
import DefineBase from './DefineBase';
import { labelOptions, typeOptions, onEnterCallback } from './types';
type DefineArrayProps = {
    label?: labelOptions;
    name?: string;
    node: ArrayNode;
    onEnter?: onEnterCallback;
    placeholder?: string;
    type: typeOptions;
    value?: any[];
    validation?: boolean;
};
type DefineArrayStateElement = {
    value: any;
    key: string;
};
type DefineArrayState = {
    custom: typeof DefineBase | null;
    customProps?: Record<string, any>;
    nodeClass: string;
    display: Record<string, any>;
    elements: DefineArrayStateElement[];
};
/**
 * Define Array
 *
 * Handles array types with the ability to add / remove elements
 *
 * @name DefineArray
 * @access public
 * @extends React.Component
 */
export default class DefineArray extends DefineBase {
    child: BaseNode;
    nodes: Record<string, DefineBase> | DefineBase;
    state: DefineArrayState;
    static propTypes: {
        label: PropTypes.Requireable<string>;
        name: PropTypes.Requireable<string>;
        node: PropTypes.Validator<ArrayNode>;
        onEnter: PropTypes.Requireable<(...args: any[]) => any>;
        placeholder: PropTypes.Requireable<string>;
        type: PropTypes.Validator<string>;
        value: PropTypes.Requireable<any[]>;
        validation: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        label: string;
        name: string;
        value: never[];
        validation: boolean;
    };
    static _registered: Record<string, typeof DefineBase>;
    constructor(props: DefineArrayProps);
    add(): void;
    error(errors: Record<string, any>): void;
    remove(key: string): void;
    static register(type: string, classConstructor: typeof DefineBase): void;
    render(): JSX.Element;
    valid(): boolean;
    get value(): any;
    set value(val: any);
}
export {};
