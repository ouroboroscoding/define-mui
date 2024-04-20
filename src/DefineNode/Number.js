/**
 * Define Node Number
 *
 * Handles a single integer / float define element
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
 * Node Number
 *
 * Handles values that represent numbers (ints, floats, decimal)
 *
 * @name DefineNodeNumber
 * @access public
 * @extends DefineNodeBase
 */
export default class DefineNodeNumber extends DefineNodeBase {
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineNodeNumber
     * @access public
     * @param props Properties passed to the component
     * @return a new instance
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
        // Store the value
        let iValue = event.target.value;
        // If there's a callback
        if (this.props.onChange) {
            const mResult = this.props.onChange(iValue, this.state.value);
            if (mResult !== undefined) {
                iValue = mResult;
            }
        }
        // Check the new value is valid
        let error = false;
        if (this.props.validation &&
            !this.props.node.valid(iValue === '' ? null : iValue)) {
            error = this.props.node.validationFailures[0][1];
        }
        // Update the state
        this.setState({
            error,
            value: iValue
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
        // Initial input props
        const inputProps = {};
        const minmax = this.props.node.minmax();
        if (minmax.minimum) {
            inputProps.min = minmax.minimum;
        }
        if (minmax.maximum) {
            inputProps.max = minmax.maximum;
        }
        // If there's an error, and we have custom error messages, and the error
        //	is in the list, use it instead of the default string
        let sError = this.state.error;
        if (typeof this.state.error === 'string') {
            sError = this.props.display.__errors__ && this.state.error in this.props.display.__errors__ ?
                this.props.display.__errors__[this.state.error] :
                this.state.error;
        }
        // Initial props
        const props = {
            className: `field_${this.props.name} nodeNumber`,
            error: this.state.error !== false,
            helperText: sError,
            onKeyPress: this.keyPressed,
            onChange: this.change,
            type: 'number',
            value: this.state.value === null ? '' : this.state.value,
            variant: this.props.variant,
            inputProps
        };
        // If the label is a placeholder
        if (this.props.label === 'placeholder') {
            props.label = this.props.display.__title__;
            props.placeholder = this.props.placeholder || this.props.display.__title__;
        }
        else if (this.props.placeholder) {
            props.placeholder = this.props.placeholder;
        }
        // Render
        return (React.createElement(React.Fragment, null,
            this.props.label === 'above' &&
                React.createElement(Typography, null, this.props.display.__title__),
            React.createElement(TextField, { ...props })));
    }
}
// Register with Node
DefineNodeBase.pluginAdd('number', DefineNodeNumber);
