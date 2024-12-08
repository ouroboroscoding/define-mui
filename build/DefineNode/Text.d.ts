/**
 * Define Node Text
 *
 * Handles a single string define element
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */
import React from 'react';
import DefineNodeBase from './Base';
import { DefineNodeBaseProps } from './Base';
/**
 * Node Text
 *
 * Handles values that are strings or string-like
 *
 * @name DefineNodeText
 * @access public
 * @extends DefineNodeBase
 */
export default class DefineNodeText extends DefineNodeBase {
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineNodeText
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
    render(): React.JSX.Element;
}
