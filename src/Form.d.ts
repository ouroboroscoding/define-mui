/**
 * Form
 *
 * Handles creating forms using Format Trees
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2022-03-19
 */
import { Tree } from '@ouroboros/define';
import PropTypes from 'prop-types';
import React from 'react';
import DefineParent from './DefineParent';
import { labelOptions, variantOptions } from './DefineNode';
import { dynamicOptionStruct, gridSizesStruct, onNodeChangeCallback } from './DefineParent';
export type onCancelCallback = () => void;
export type onSubmitCallback = (value: Record<string, any>, key: any) => boolean | string[][] | Promise<boolean>;
export type FormProps = {
    display?: Record<string, any>;
    dynamicOptions?: dynamicOptionStruct[];
    fields?: string[];
    gridSizes?: gridSizesStruct;
    gridSpacing?: number;
    label?: labelOptions;
    onCancel?: onCancelCallback;
    onNodeChange?: Record<string, onNodeChangeCallback>;
    onSubmit: onSubmitCallback;
    title: string | boolean;
    tree: Tree;
    type: 'create' | 'update';
    value: Record<string, any>;
    variant?: variantOptions;
};
export type FormState = {
    primary: string;
};
/**
 * Form
 *
 * Handles create/update forms using Parent
 *
 * @name Form
 * @access public
 * @extends React.Component
 */
export default class Form extends React.Component {
    static propTypes: {
        display: PropTypes.Requireable<object>;
        dynamicOptions: PropTypes.Requireable<(Required<PropTypes.InferProps<{
            node: PropTypes.Validator<string>;
            trigger: PropTypes.Validator<string>;
            options: PropTypes.Validator<object>;
        }>> | null | undefined)[]>;
        fields: PropTypes.Requireable<(string | null | undefined)[]>;
        gridSizes: PropTypes.Requireable<{
            [x: string]: Required<PropTypes.InferProps<{
                xs: PropTypes.Requireable<number>;
                sm: PropTypes.Requireable<number>;
                md: PropTypes.Requireable<number>;
                lg: PropTypes.Requireable<number>;
                xl: PropTypes.Requireable<number>;
            }>> | null | undefined;
        }>;
        gridSpacing: PropTypes.Requireable<number>;
        label: PropTypes.Requireable<string>;
        onCancel: PropTypes.Requireable<(...args: any[]) => any>;
        onNodeChange: PropTypes.Requireable<{
            [x: string]: ((...args: any[]) => any) | null | undefined;
        }>;
        onSubmit: PropTypes.Validator<(...args: any[]) => any>;
        title: PropTypes.Requireable<NonNullable<string | boolean | null | undefined>>;
        tree: PropTypes.Validator<Tree>;
        type: PropTypes.Validator<string>;
        value: PropTypes.Requireable<object>;
        variant: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        gridSizes: {
            __default__: {
                xs: number;
                sm: number;
                lg: number;
            };
        };
        gridSpacing: number;
        label: string;
        title: boolean;
        value: {};
        variant: string;
    };
    props: FormProps;
    state: FormState;
    parent: DefineParent;
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineSearch
     * @access public
     * @param props Properties passed to the component
     * @returns a new instance
     */
    constructor(props: FormProps);
    /**
     * Cancel
     *
     * Called to contact the user to be aware the form needs some sort of
     * cancellation
     *
     * @name _cancel
     * @access private
     */
    _cancel(): void;
    /**
     * Errors
     *
     * Called to add errors that come back from an onSubmit callback
     *
     * @name _errors
     * @access private
     * @param errors The list of errors from define
     */
    _errors(errors: string[][]): void;
    /**
     * Submit
     *
     * Called to notify the user of data to be submitted, only fires if the
     * current data is valid
     *
     * @name _submit
     * @access private
     */
    _submit(): void;
    /**
     * Error
     *
     * Sets a new object of error messages by field
     *
     * @name error
     * @access public
     * @param errors Errors to set on the component
     */
    error(errors: string[][]): void;
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
     * Calls reset on the Parent
     *
     * @name reset
     * @access public
     */
    reset(): void;
    /**
     * Value (get)
     *
     * Returns the current value
     *
     * @name value
     * @property
     * @returns the current value
     */
    get value(): Record<string, any>;
    /**
     * Value (set)
     *
     * Called to set the new value
     *
     * @name value
     * @property
     */
    set value(val: Record<string, any>);
}
