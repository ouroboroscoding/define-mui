/**
 * Define Node Price
 *
 * Handles a single price define element
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */
// NPM modules
import React from 'react';
// Material UI
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// Local components
import DefineNodeBase from './Base';
/**
 * Node Price
 *
 * Handles values that represent numbers (ints, floats, decimal)
 *
 * @name DefineNodePrice
 * @access public
 * @extends DefineNodeBase
 */
export default class DefineNodePrice extends DefineNodeBase {
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineNodePrice
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
        let error = false;
        if (this.props.validation &&
            !this.props.node.valid(event.target.value === '' ? null : event.target.value)) {
            error = this.props.node.validationFailures[0][1];
        }
        // If there's a callback
        if (this.props.onChange) {
            this.props.onChange(event.target.value, this.state.value);
        }
        // Update the state
        this.setState({
            error,
            value: event.target.value
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
        // If there's an error, and we have custom error messages, and the error
        //	is in the list, use it instead of the default string
        let sError = this.state.error;
        if (typeof this.state.error === 'string') {
            sError = this.props.display.errors && this.state.error in this.props.display.errors ?
                this.props.display.errors[this.state.error] :
                this.state.error;
        }
        // Initial input props
        const inputProps = {};
        const minmax = this.props.node.minmax();
        if (minmax.minimum) {
            inputProps.min = minmax.minimum;
        }
        if (minmax.maximum) {
            inputProps.max = minmax.maximum;
        }
        // Initial props
        const props = {
            className: `field_${this.props.name} node_price`,
            error: this.state.error !== false,
            helperText: sError,
            onKeyPress: this.keyPressed,
            onChange: this.change,
            type: 'number',
            value: this.state.value === null ? '' : this.state.value,
            variant: this.props.variant,
            inputProps,
            InputProps: {
                startAdornment: React.createElement(InputAdornment, { position: "start" }, "$"),
            }
        };
        // If the label is a placeholder
        if (this.props.label === 'placeholder') {
            props.label = this.props.display.title;
            props.placeholder = this.props.placeholder || this.props.display.title;
        }
        else if (this.props.placeholder) {
            props.placeholder = this.props.placeholder;
        }
        // Render
        return (React.createElement(React.Fragment, null,
            this.props.label === 'above' &&
                React.createElement(Typography, null, this.props.display.title),
            React.createElement(TextField, { ...props })));
    }
}
// Register with Node
DefineNodeBase.pluginAdd('price', DefineNodePrice);
