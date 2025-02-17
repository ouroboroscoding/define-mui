/**
 * Define Hash
 *
 * Handles hashes (objects, maps) define nodes/parents
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-18
 */
import { Hash } from '@ouroboros/define';
import PropTypes from 'prop-types';
import React from 'react';
import DefineBase from './DefineBase';
import { DefineNodeBase } from './DefineNode';
import { labelOptions, onEnterPressedCallback, typeOptions, variantOptions } from './DefineNode';
export type DefineHashProps = {
    display?: Record<string, any>;
    error?: any;
    label?: labelOptions;
    name: string;
    node: Hash;
    onEnterPressed?: onEnterPressedCallback;
    placeholder?: string;
    type: typeOptions;
    value?: Record<any, any>;
    validation?: boolean;
    variant: variantOptions;
};
type DefineHashState = {
    plugin: typeof DefineNodeBase;
    display: Record<string, any>;
};
/**
 * Hash Node
 *
 * Handles array types with the ability to add / remove elements
 *
 * @name DefineHash
 * @access public
 * @extends DefineBase
 */
export default class DefineHash extends DefineBase {
    static pluginAdd(type: string, classConstructor: typeof DefineNodeBase): void;
    static propTypes: {
        display: PropTypes.Requireable<object>;
        label: PropTypes.Requireable<string>;
        name: PropTypes.Requireable<string>;
        node: PropTypes.Validator<Hash>;
        onEnterPressed: PropTypes.Requireable<(...args: any[]) => any>;
        placeholder: PropTypes.Requireable<string>;
        type: PropTypes.Validator<string>;
        value: PropTypes.Requireable<object>;
        validation: PropTypes.Requireable<boolean>;
        variant: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        label: string;
        name: string;
        value: {};
        validation: boolean;
        variant: string;
    };
    props: DefineHashProps;
    state: DefineHashState;
    plugin: DefineNodeBase;
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineHash
     * @access public
     * @param props Properties passed to the component
     * @returns a new instance
     */
    constructor(props: DefineHashProps);
    /**
     * Error
     *
     * Sets a new object of error messages by field
     *
     * @name error
     * @access public
     * @param errors Errors to set on the component
     */
    error(errors: string[][] | Record<string, any>): void;
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
     * Calls reset on the plugin instance
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
    get value(): any;
    /**
     * Value (set)
     *
     * Called to set the new value
     *
     * @name value
     * @property
     * @param val The new values to set
     */
    set value(val: any);
}
export {};
