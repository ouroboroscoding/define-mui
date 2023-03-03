/**
 * Define Node Phone Number
 *
 * Handles a single string define element
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */
// NPM modules
import React from 'react';
// Material UI
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// React Phone Input
import PhoneInput from 'react-phone-input-material-ui';
// Local components
import DefineNodeBase from './Base';
/**
 * Node Phone Number
 *
 * Handles values that are phone numbers
 *
 * @name DefineNodePhoneNumber
 * @access public
 * @extends DefineNodeBase
 */
export default class DefineNodePhoneNumber extends DefineNodeBase {
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineNodePhoneNumber
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
     * @param value The new phone number
     */
    change(value) {
        // Check the new value is valid
        let error = false;
        if (this.props.validation && !this.props.node.valid(value)) {
            error = 'Invalid Value';
        }
        // Update the state
        this.setState({ error, value });
        // If there's a callback
        if (this.props.onChange) {
            this.props.onChange(value);
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
        // Render
        return (React.createElement(React.Fragment, null,
            this.props.label === 'above' &&
                React.createElement(Typography, null, this.props.display.title),
            React.createElement(FormControl, { className: `field_${this.props.name} node_phone_number`, error: this.state.error !== false },
                React.createElement(PhoneInput, { component: TextField, inputProps: {
                        label: this.props.display.title,
                        onKeyPress: this.keyPressed,
                        variant: this.props.variant
                    }, onChange: this.change, value: this.state.value === null ? '' : this.state.value }),
                this.state.error &&
                    React.createElement(FormHelperText, null, this.state.error))));
    }
}
// Register with Node
DefineNodeBase.pluginAdd('phone_number', DefineNodePhoneNumber);
