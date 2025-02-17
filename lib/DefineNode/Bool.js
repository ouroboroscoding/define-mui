/**
 * Define Node Bool
 *
 * Handles a single boolean define element
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */
// NPM modules
import React from 'react';
// Material UI
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
// Local components
import DefineNodeBase from './Base';
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
    constructor(props) {
        super(props);
        this.change = this.change.bind(this);
    }
    /**
     * Change
     *
     * Called when the boolean value changes
     *
     * @name change
     * @access public
     * @param event The event triggered by the change
     */
    change(event) {
        // Store the value
        let bValue = event.target.checked;
        // If there's a callback
        if (this.props.onChange) {
            const mResult = this.props.onChange(bValue, this.state.value);
            if (mResult !== undefined) {
                bValue = mResult;
            }
        }
        // Impossible for this to be invalid, so just store it
        this.setState({
            error: false,
            value: bValue
        });
    }
    /**
     * Render
     *
     * Generates the actual DOM elements of the component
     *
     * @name render
     * @access public
     */
    render() {
        return (React.createElement(Box, null,
            React.createElement(FormControlLabel, { className: `field_${this.props.name} nodeBool`, control: React.createElement(Checkbox, { color: "primary", checked: this.state.value ? true : false, onChange: this.change }), label: React.createElement("span", { className: this.state.error !== false ? 'nodeBoolError' : 'false' }, this.props.display.__title__) })));
    }
    /**
     * Value (get)
     *
     * Returns the current value of the component
     *
     * @name value
     * @property
     * @returns the current value
     */
    get value() {
        return this.state.value === '' ?
            (this.props.node.optional() ? null : false) :
            this.state.value;
    }
}
// Register with Node
DefineNodeBase.pluginAdd('bool', DefineNodeBool);
