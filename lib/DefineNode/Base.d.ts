/**
 * Define Node
 *
 * Handles a single define element
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-15
 */
import { Base } from '@ouroboros/define';
import PropTypes from 'prop-types';
import React from 'react';
import { labelOptions, onChangeCallback, onEnterPressedCallback, typeOptions, variantOptions } from './';
export type DefineNodeBaseProps = {
    display: Record<string, any>;
    error?: any;
    label?: labelOptions;
    name: string;
    node: Base;
    onChange?: onChangeCallback;
    onEnterPressed?: onEnterPressedCallback;
    placeholder?: string;
    ref?: any;
    type: typeOptions;
    value?: any;
    validation?: boolean;
    variant: variantOptions;
};
export type DefineNodeBaseState = {
    error?: string | Record<string, any> | false;
    value: any;
};
type RegisterType = {
    class_: typeof DefineNodeBase;
    default_: any;
};
/**
 * Define Node Base
 *
 * Base class for all DefineNode types
 *
 * @name DefineNodeBase
 * @access private
 * @extends React.Component
 */
export default class DefineNodeBase extends React.Component {
    static propTypes: {
        display: PropTypes.Validator<object>;
        error: PropTypes.Requireable<NonNullable<string | boolean | null | undefined>>;
        name: PropTypes.Validator<string>;
        node: PropTypes.Validator<Base>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onEnterPressed: PropTypes.Requireable<NonNullable<boolean | ((...args: any[]) => any) | null | undefined>>;
        placeholder: PropTypes.Requireable<string>;
        type: PropTypes.Validator<string>;
        value: PropTypes.Requireable<any>;
    };
    static _plugins: Record<string, RegisterType>;
    props: DefineNodeBaseProps;
    state: DefineNodeBaseState;
    static pluginAdd(name: string, componentClass: typeof DefineNodeBase, defaultValue?: any): void;
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineNodeBase
     * @access public
     * @param props Properties passed to the component
     * @returns a new instance
     */
    constructor(props: DefineNodeBaseProps);
    /**
     * Component Did Update
     *
     * Called when props passed to the component have changed
     *
     * @name componentDidUpdate
     * @access public
     * @param prevProps The previous prop values
     */
    componentDidUpdate(prevProps: DefineNodeBaseProps): void;
    /**
     * Error
     *
     * Called to display an error associated with the Node
     *
     * @name error
     * @access public
     * @param msg The error message
     */
    error(error: any): void;
    /**
     * Key Pressed
     *
     * Called to trap Enter key presses
     *
     * @name keyPressed
     * @access public
     * @param event The event, aka, the key pressed
     */
    keyPressed(event: React.KeyboardEvent<HTMLInputElement>): void;
    /**
     * Reset
     *
     * Called to reset the value without triggering an error from the Node
     *
     * @name reset
     * @access public
     */
    reset(): void;
    /**
     * Value (get)
     *
     * Returns the current value of the component
     *
     * @name value
     * @property
     * @returns the current value
     */
    get value(): any;
    /**
     * Value (set)
     *
     * Sets the current value
     *
     * @name value
     * @property
     */
    set value(val: any);
}
export {};
