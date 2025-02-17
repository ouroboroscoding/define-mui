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
import DefineNodeSearchOption from './SearchOption';
import DefineNodeBool from './Bool';
import DefineNodeDate from './Date';
import DefineNodeDatetime from './Datetime';
import DefineNodeHidden from './Hidden';
import DefineNodeMultiSelectCSV from './MultiSelectCSV';
import DefineNodeNumber from './Number';
import DefineNodePassword from './Password';
import DefineNodePhoneNumber from './PhoneNumber';
import DefineNodePrice from './Price';
import DefineNodeSelect from './Select';
import DefineNodeText from './Text';
import DefineNodeTextArea from './TextArea';
import DefineNodeTime from './Time';
import DefineNodeTimestamp from './Timestamp';
export { DefineNodeBase, DefineNodeBool, DefineNodeDate, DefineNodeDatetime, DefineNodeHidden, DefineNodeMultiSelectCSV, DefineNodeNumber, DefineNodePassword, DefineNodePhoneNumber, DefineNodePrice, DefineNodeSelect, DefineNodeText, DefineNodeTextArea, DefineNodeTime, DefineNodeTimestamp };
export type labelOptions = 'above' | 'none' | 'placeholder';
export type typeOptions = 'create' | 'search' | 'update';
export type variantOptions = 'filled' | 'outlined' | 'standard';
export type onChangeCallback = (value: any, oldValue: any) => void;
export type onEnterPressedCallback = () => void;
export type DefineNodeProps = {
    display?: Record<string, any>;
    error: string | false;
    label?: labelOptions;
    name: string;
    node: Node;
    onChange?: onChangeCallback;
    onEnterPressed?: onEnterPressedCallback;
    placeholder?: string;
    ref?: any;
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
        display: PropTypes.Requireable<object>;
        error: PropTypes.Requireable<NonNullable<string | boolean | null | undefined>>;
        label: PropTypes.Requireable<string>;
        name: PropTypes.Validator<string>;
        node: PropTypes.Validator<Node>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onEnterPressed: PropTypes.Requireable<(...args: any[]) => any>;
        placeholder: PropTypes.Requireable<string>;
        type: PropTypes.Validator<string>;
        value: PropTypes.Requireable<any>;
        validation: PropTypes.Requireable<boolean>;
        variant: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        error: boolean;
        label: string;
        value: null;
        validation: boolean;
        variant: string;
    };
    static pluginAdd(name: string, componentClass: typeof DefineNodeBase, defaultValue?: any): void;
    props: DefineNodeProps;
    state: DefineNodeState;
    _el: DefineNodeBase | null;
    _search: DefineNodeSearchOption | null;
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
    /**
     * Component Did Mount
     *
     * Called right after the component is added to the DOM
     *
     * @name componentDidMount
     * @access public
     * @param prevProps The previously set properties
     */
    componentDidUpdate(prevProps: DefineNodeProps): void;
    /**
     * Default Type
     *
     * Returns the element type associated with the Node's type. Useful when
     * there's no custom type to handle the render
     *
     * @name defaultType
     * @param node The Node associated with the element
     * @returns string
     */
    defaultType(node: Node): "select" | "time" | "text" | "number" | "date" | "bool" | "datetime" | "price" | "timestamp";
    /**
     * Error
     *
     * Called to set the error on the node
     *
     * @name error
     * @access public
     * @param msg The error message
     */
    error(msg: string): void;
    /**
     * Generate State
     *
     * Checks the node for data and generates the state that will be used in the
     * component
     *
     * @name generateState
     * @access public
     * @returns the state to use
     */
    generateState(): DefineNodeState;
    /**
     * Render
     *
     * Generates the actual DOM elements of the component
     *
     * @name render
     * @access public
     */
    render(): React.JSX.Element;
    /**
     * Reset
     *
     * Resets the value on a Node without triggering error checking
     *
     * @name reset
     * @access public
     */
    reset(): void;
    /**
     * Value (get)
     *
     * Returns the current value of the node
     *
     * @name value
     * @property
     * @returns the current value
     */
    get value(): any | null;
    /**
     * Value (set)
     *
     * Sets the new value on the node
     *
     * @name value
     * @property
     * @param val The new value to set
     */
    set value(val: any | null);
}
