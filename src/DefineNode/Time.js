/**
 * Define Node Time
 *
 * Handles a single time define element
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */
// NPM modules
import React from 'react';
// Material UI
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// Local components
import DefineNodeBase from './Base';
/**
 * Node Time
 *
 * Handles values that represent a time
 *
 * @name DefineNodeTime
 * @access public
 * @extends DefineNodeBase
 */
export default class DefineNodeTime extends DefineNodeBase {
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineNodeDate
     * @access public
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
     * Called when the node value changes
     *
     * @name change
     * @access public
     * @param event The event triggered by the change
     */
    change(event) {
        // Check the new value is valid
        const newTime = event.target.value + ':00';
        let error = false;
        if (this.props.validation && !this.props.node.valid(newTime)) {
            error = 'Invalid Time';
        }
        // Update the state
        this.setState({
            error,
            value: newTime
        });
        // If there's a callback
        if (this.props.onChange) {
            this.props.onChange(newTime);
        }
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
        // Initial props
        const props = {
            className: `field_${this.props.name} node_time`,
            error: this.state.error !== false,
            helperText: this.state.error,
            onKeyPress: this.keyPressed,
            onChange: this.change,
            type: 'time',
            value: this.state.value === null ? '' : this.state.value,
            variant: this.props.variant
        };
        // If the label is a placeholder, add additional props
        if (this.props.label === 'placeholder') {
            props.label = this.props.display.title;
        }
        // Render
        return (React.createElement(React.Fragment, null,
            this.props.label === 'above' &&
                React.createElement(Typography, null, this.props.display.title),
            React.createElement(TextField, { ...props })));
    }
}
// Register with Node
DefineNodeBase.pluginAdd('time', DefineNodeTime);
