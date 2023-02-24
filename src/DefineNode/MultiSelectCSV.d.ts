/**
 * Define Node Multi-Select CSV
 *
 * Handles a single define element that stores multiple values in a comma
 * separated value
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */
/// <reference types="react" />
import { SubscribeCallback, SubscribeReturn } from '@ouroboros/subscribe';
import DefineNodeBase from './Base';
import { DefineNodeBaseProps, DefineNodeBaseState } from './Base';
type DefineNodeMultiSelectCSVState = {
    defaultValues: string[] | null;
    options: string[][];
};
/**
 * Node Multi Select CSV
 *
 * Handles values that are actually a list of comma seperated values
 *
 * @name DefineNodeMultiSelectCSV
 * @access public
 * @extends DefineNodeBase
 */
export default class DefineNodeMultiSelectCSV extends DefineNodeBase {
    props: DefineNodeBaseProps;
    state: DefineNodeMultiSelectCSVState & DefineNodeBaseState;
    callback: SubscribeCallback;
    checks: HTMLInputElement[];
    subscribe: SubscribeReturn;
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineNodeMultiSelectCSV
     * @access public
     * @param props Properties passed to the component
     * @returns a new instance
     */
    constructor(props: DefineNodeBaseProps);
    /**
     * Component Did Mount
     *
     * Called right after the component is added to the DOM
     *
     * @name componentDidMount
     * @access public
     */
    componentDidMount(): void;
    /**
     * Component Will Unmount
     *
     * Called right before the component is removed from the DOM
     *
     * @name componentWillUnmount
     * @access public
     */
    componentWillUnmount(): void;
    /**
     * Cancel
     *
     * Called to close the dialog
     *
     * @name cancel
     * @access public
     */
    cancel(): void;
    /**
     * Open
     *
     * Called to open the dialog
     *
     * @name open
     * @access public
     */
    open(): void;
    /**
     * Dyanamic Data
     *
     * Called by the Options instance when there's new options data
     *
     * @name dynamicData
     * @access public
     * @param data The new options data
     */
    dynamicData(data: string[][]): void;
    /**
     * Submit
     *
     * Called to set the new data in the node
     *
     * @name submit
     * @access public
     */
    submit(): void;
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
     * Options (set)
     *
     * Sets the new options for the dialog
     *
     * @name options
     * @property
     */
    set options(data: string[][]);
}
export {};
