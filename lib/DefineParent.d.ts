/**
 * Define Parent
 *
 * Handles groups of define nodes
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */
import { Parent } from '@ouroboros/define';
import PropTypes from 'prop-types';
import React from 'react';
import DefineBase from './DefineBase';
import { DefineNodeBase } from './DefineNode';
import type { DefineBaseProps } from './DefineBase';
import type { HashArg } from './Options/Hash';
import { onChangeCallback } from './DefineNode';
export type dynamicOptionStruct = {
    node: string;
    trigger: string;
    options: HashArg;
};
export type onNodeChangeCallback = (event: ParentNodeChangeEvent) => void | Record<string, any>;
export type ParentNodeChangeEvent = {
    data: Record<string, any>;
    node: string;
    oldValue: any;
    value: any;
};
export type DefineParentProps = DefineBaseProps & {
    dynamicOptions?: dynamicOptionStruct[];
    fields?: string[];
    node: Parent;
    onNodeChange?: Record<string, onChangeCallback>;
    root?: boolean;
    value: Record<string, any>;
};
type DefineParentState = {
    display: Record<string, any>;
    elements?: JSX.Element[];
    order?: string[];
    plugin: typeof DefineNodeBase | null;
    title: string | false;
};
/**
 * Parent
 *
 * Creates a grid of Nodes using the FormatOC Parent structure
 *
 * @name DefineParent
 * @access public
 * @extends DefineBase
 */
export default class DefineParent extends DefineBase {
    static pluginAdd(type: string, classConstructor: typeof DefineNodeBase): void;
    static propTypes: {
        display: PropTypes.Requireable<object>;
        dynamicOptions: PropTypes.Requireable<(Required<PropTypes.InferProps<{
            node: PropTypes.Validator<string>;
            trigger: PropTypes.Validator<string>;
            options: PropTypes.Validator<object>;
        }>> | null | undefined)[]>;
        error: PropTypes.Requireable<object>;
        fields: PropTypes.Requireable<(string | null | undefined)[]>;
        gridSizes: PropTypes.Requireable<{
            [x: string]: object | null | undefined;
        }>;
        gridSpacing: PropTypes.Requireable<number>;
        label: PropTypes.Requireable<string>;
        name: PropTypes.Validator<string>;
        node: PropTypes.Validator<Parent>;
        onNodeChange: PropTypes.Requireable<{
            [x: string]: ((...args: any[]) => any) | null | undefined;
        }>;
        onEnterPressed: PropTypes.Requireable<(...args: any[]) => any>;
        placeholder: PropTypes.Requireable<string>;
        returnAll: PropTypes.Requireable<boolean>;
        root: PropTypes.Requireable<boolean>;
        type: PropTypes.Validator<string>;
        value: PropTypes.Requireable<object>;
        validation: PropTypes.Requireable<boolean>;
        variant: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        dynamicOptions: never[];
        gridSizes: {
            __default__: {
                xs: number;
            };
        };
        gridSpacing: number;
        label: string;
        root: boolean;
        returnAll: boolean;
        value: {};
        validation: boolean;
        variant: string;
    };
    node: DefineBase | null;
    props: DefineParentProps;
    state: DefineParentState;
    fields: Record<string, DefineBase>;
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineParent
     * @access public
     * @param props Properties passed to the component
     * @returns a new instance
     */
    constructor(props: DefineParentProps);
    /**
     * Component Did Update
     *
     * Called when any of the props to the component are changed
     *
     * @name componentDidUpdate
     * @access public
     * @param prevProps The previous properties of the component
     */
    componentDidUpdate(prevProps: DefineParentProps): void;
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
     * Generate State
     *
     * Uses the props and node data to generate the state to set
     *
     * @name generateState
     * @access public
     * @returns the new state to set
     */
    generateState(): DefineParentState;
    /**
     * Node Triggered Changes
     *
     * Called when a node that is setup to track changes changes
     *
     * @name nodeTriggeredChanges
     * @access private
     * @param name The name of the node that changed
     * @param value The new values from the callback
     */
    _nodeTriggeredChanges(name: string, value: any): any;
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
export {};
