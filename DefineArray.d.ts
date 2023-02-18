/**
 * Define Array
 *
 * Handles arrays of define nodes/parents
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-14
 */
/// <reference types="react" />
import { BaseNode, ArrayNode } from '@ouroboros/define';
import PropTypes from 'prop-types';
import DefineBase from './DefineBase';
import { labelOptions, typeOptions, onEnterCallback } from './Types';
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
    static register(type: string, classConstructor: typeof DefineBase): void;
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineArray
     * @access public
     * @param props Properties passed to the component
     * @returns a new instance
     */
    constructor(props: DefineArrayProps);
    /**
     * Add
     *
     * Called to add a new array element
     *
     * @name add
     * @access public
     */
    add(): void;
    /**
     * Error
     *
     * Sets a new object of error messages by field
     *
     * @name error
     * @access public
     * @param errors Errors to set on the component
     */
    error(errors: Record<string, any>): void;
    /**
     * Remove
     *
     * Used to remove an element from the array
     *
     * @name remove
     * @param key The key associated with the element to remove
     */
    remove(key: string): void;
    /**
     * Render
     *
     * Generates the actual DOM elements of the component
     *
     * @name render
     * @access public
     */
    render(): JSX.Element;
    /**
     * Reset
     *
     * Calls reset on all the child components
     *
     * @name reset
     * @access public
     */
    reset(): void;
    /**
     * Valid
     *
     * Called to verify if the current data is valid
     *
     * @name valid
     * @public
     * @returns true if the current values are valid
     */
    valid(): boolean;
    /**
     * Value (get)
     *
     * Returns the current value
     *
     * @name value
     * @property
     * @returns the current value
     */
    get value(): any[];
    /**
     * Value (set)
     *
     * Called to set the new value
     *
     * @name value
     * @property
     * @param val The new values to set
     */
    set value(val: any[]);
}
export {};
