/**
 * Define Node Search Option
 *
 * Handles displaying search options for a specific node
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */
import React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { variantOptions } from './';
type DefineNodeSearchOptionProps = {
    type: string;
    variant: variantOptions;
};
type DefineNodeSearchOptionState = {
    options: JSX.Element[] | null;
    value: string | null;
};
/**
 * Search Option
 *
 * Displays options for how to search the field based on the type
 *
 * @name DefineNodeSearchOption
 * @access private
 * @extends React.Component
 */
export default class DefineNodeSearchOption extends React.Component {
    props: DefineNodeSearchOptionProps;
    state: DefineNodeSearchOptionState;
    select: HTMLSelectElement | null;
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineNodeSearchOption
     * @access public
     * @param props Properties passed to the component
     * @returns a new instance
     */
    constructor(props: DefineNodeSearchOptionProps);
    /**
     * Change
     *
     * Called when the search option changes
     *
     * @name change
     * @access public
     * @param ev The event triggers
     */
    change(ev: SelectChangeEvent): void;
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
     * Value (get)
     *
     * Called to get the current search value
     *
     * @name value
     * @property
     * @returns the current value
     */
    get value(): string | null;
    /**
     * Value (set)
     *
     * Sets the new search value
     *
     * @name value
     * @property
     * @param val The new value to set
     */
    set value(val: string | null);
}
export {};
