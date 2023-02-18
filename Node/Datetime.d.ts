/**
 * Define Node Datetime
 *
 * Handles a single datetime define element
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */
import React from 'react';
import DefineNodeBase from './Base';
import { DefineNodeBaseProps } from '../Types';
/**
 * Node Datetime
 *
 * Handles values that represent a date with a time
 *
 * @name DefineNodeDatetime
 * @access public
 * @extends DefineNodeBase
 */
export default class DefineNodeDatetime extends DefineNodeBase {
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineNodeDatetime
     * @access public
     * @param props Properties passed to the component
     * @returns a new instance
     */
    constructor(props: DefineNodeBaseProps);
    /**
     * Change
     *
     * Called when the node value changes
     *
     * @name change
     * @access public
     * @param event The event triggered by the change
     */
    change(event: React.ChangeEvent<HTMLInputElement>): void;
    /**
     * Render
     *
     * Generates the actual DOM elements of the component
     *
     * @name render
     * @access public
     */
    render(): JSX.Element;
}
