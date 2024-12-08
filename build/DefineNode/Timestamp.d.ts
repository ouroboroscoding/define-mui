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
import { DefineNodeBaseProps } from './Base';
/**
 * Node Timestamp
 *
 * Handles values that represent seconds since 1970
 *
 * @name DefineNodeTimestamp
 * @access public
 * @extends DefineNodeBase
 */
export default class DefineNodeTimestamp extends DefineNodeBase {
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineNodeTimestamp
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
     * @param part The part of the date/time
     * @param value The new value
     */
    change(part: 'date' | 'time', value: string): void;
    /**
     * Render
     *
     * Generates the actual DOM elements of the component
     *
     * @name render
     * @access public
     */
    render(): React.JSX.Element;
}
