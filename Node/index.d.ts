/**
 * Define Node
 *
 * Handles a single define element
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-15
 */
import { Node } from '@ouroboros/define';
import PropTypes from 'prop-types';
import React from 'react';
import DefineBase from '../DefineBase';
import DefineNodeBase from './Base';
import { labelOptions, typeOptions, variantOptions } from '../types';
type DefineNodeProps = {
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
type DefineNodeState = {
    display: Record<string, any>;
    type: string;
    value?: any;
};
/**
 * DefineNode
 *
 * Wrapper for all the different types of simple data
 *
 * @name DefineNode
 * @access public
 * @extends DefineBase
 */
export default class DefineNode extends DefineBase {
    static propTypes: {
        error: PropTypes.Requireable<NonNullable<string | boolean | null | undefined>>;
        label: PropTypes.Requireable<string>;
        name: PropTypes.Validator<string>;
        node: PropTypes.Validator<Node>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onEnter: PropTypes.Requireable<NonNullable<boolean | ((...args: any[]) => any) | null | undefined>>;
        placeholder: PropTypes.Requireable<string>;
        type: PropTypes.Validator<string>;
        value: PropTypes.Requireable<any>;
        validation: PropTypes.Requireable<boolean>;
        variant: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        error: boolean;
        label: string;
        onEnter: boolean;
        value: null;
        validation: boolean;
        variant: string;
    };
    static addType(name: string, componentClass: typeof DefineNodeBase, defaultValue: string | number): void;
    props: DefineNodeProps;
    state: DefineNodeState;
    _el: DefineNodeBase | null;
    _search: React.ElementType | null;
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineNode
     * @access public
     * @param props Properties passed to the component
     * @returns a new instance
     */
    constructor(props: DefineNodeProps);
    componentDidUpdate(prevProps: DefineNodeProps): void;
    defaultType(node: Node): "select" | "time" | "text" | "number" | "bool" | "date" | "datetime" | "price";
    error(msg: string): void;
    generateState(): DefineNodeState;
    render(): JSX.Element;
    reset(): void;
    get value(): any;
    set value(val: any);
}
export {};
