/**
 * Define Node Select
 *
 * Handles a single define element with multiple static or dynamic options
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */
import React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import DefineNodeBase from './Base';
import { OptionsCallbackType } from '../Options/Types';
import { DefineNodeBaseProps, DefineNodeBaseState } from '../Types';
type DefineNodeSelectState = {
    options: string[][];
};
/**
 * Node Select
 *
 * Handles values that have specific options
 *
 * @name DefineNodeSelect
 * @access public
 * @extends DefineNodeBase
 */
export default class DefineNodeSelect extends DefineNodeBase {
    props: DefineNodeBaseProps;
    state: DefineNodeSelectState & DefineNodeBaseState;
    callback: OptionsCallbackType;
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineNodeSelect
     * @access public
     * @param props Properties passed to the component
     * @returns a new instance
     */
    constructor(props: DefineNodeBaseProps);
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
     * Change
     *
     * Called when the node value changes
     *
     * @name change
     * @access public
     * @param event The event triggered by the change
     */
    change(event: SelectChangeEvent<any>, child: React.ReactNode): void;
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
