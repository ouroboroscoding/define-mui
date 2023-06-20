/**
 * Define Node Datetime
 *
 * Handles a single non-visible define element
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */
import React from 'react';
import DefineNodeBase from './Base';
/**
 * Node Hidden
 *
 * Handles values that aren't visible
 *
 * @name DefineNodeHidden
 * @access public
 * @extends DefineNodeBase
 */
export default class DefineNodeHidden extends DefineNodeBase {
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
