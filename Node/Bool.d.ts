/**
 * Define Node Bool
 *
 * Handles a single boolean define element
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */
import React from 'react';
import DefineNodeBase from './Base';
import { DefineNodeBaseProps } from '../Types';
/**
 * Node Bool
 *
 * Handles values of a true/false state
 *
 * @name DefineNodeBool
 * @access public
 * @extends DefineNodeBase
 */
export default class DefineNodeBool extends DefineNodeBase {
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineNodeBool
     * @param props Properties passed to the component
     * @returns a new instance
     */
    constructor(props: DefineNodeBaseProps);
    /**
     * Change
     *
     * Called when the boolean value changes
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
