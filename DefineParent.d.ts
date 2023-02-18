/**
 * Define Parent
 *
 * Handles groups of define nodes
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */
/// <reference types="react" />
import { Parent } from '@ouroboros/define';
import PropTypes from 'prop-types';
import DefineBase from './DefineBase';
import { gridSizesStruct } from './DefineBase';
import { labelOptions, onEnterCallback, typeOptions, variantOptions } from './DefineNode';
export type dynamicOptionStruct = {
    node: string;
    trigger: string;
    options: Record<string, any>;
};
export type DefineParentProps = {
    dynamicOptions?: dynamicOptionStruct[];
    error?: Record<string, any>;
    fields?: string[];
    gridSizes: Record<string, gridSizesStruct>;
    gridSpacing?: number;
    label?: labelOptions;
    name: string;
    node: Parent;
    nodeVariant: variantOptions;
    onEnter?: onEnterCallback;
    returnAll?: boolean;
    type: typeOptions;
    value: Record<string, any>;
    validation?: boolean;
};
type DefineParentState = {
    elements: JSX.Element[];
    order: string[];
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
    static propTypes: {
        dynamicOptions: PropTypes.Requireable<(Required<PropTypes.InferProps<{
            node: PropTypes.Validator<string>;
            trigger: PropTypes.Validator<string>;
            options: PropTypes.Validator<object>;
        }>> | null | undefined)[]>;
        error: PropTypes.Requireable<object>;
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
        name: PropTypes.Validator<string>;
        node: PropTypes.Validator<Parent>;
        nodeVariant: PropTypes.Requireable<string>;
        onEnter: PropTypes.Requireable<(...args: any[]) => any>;
        returnAll: PropTypes.Requireable<boolean>;
        type: PropTypes.Validator<string>;
        value: PropTypes.Requireable<object>;
        validation: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        dynamicOptions: never[];
        gridSizes: {
            __default__: {
                xs: number;
                sm: number;
                lg: number;
            };
        };
        gridSpacing: number;
        label: string;
        nodeVariant: string;
        returnAll: boolean;
        value: {};
        validation: boolean;
    };
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
    error(errors: Record<string, any>): void;
    /**
     * Generate State
     *
     * Uses the props and node data to generate the state to set
     *
     * @name generateState
     * @access public
     * @returns the new state to set
     */
    generateState(): {
        elements: JSX.Element[];
        order: string[];
        title: any;
    };
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
