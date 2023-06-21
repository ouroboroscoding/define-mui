/**
 * Define Node Text
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
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// Local components
import DefineNodeBase from './Base';
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
    constructor(props) {
        // Call the base
        super(props);
        // If there's a regex, override the node
        if ('__regex__' in props.display) {
            props.node.regex(props.display.__regex__);
        }
        // Bind methods
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
            sError = this.props.display.__errors__ && this.state.error in this.props.display.__errors__ ?
                this.props.display.__errors__[this.state.error] :
                this.state.error;
        }
        // Initial inputProps
        const inputProps = {};
        const iDisplayMax = this.props.display.__maximum__;
        if (iDisplayMax) {
            inputProps.maxLength = iDisplayMax;
        }
        else {
            const minmax = this.props.node.minmax();
            if (minmax.maximum) {
                inputProps.maxLength = minmax.maximum;
            }
        }
        // Initial props
        const props = {
            className: `field_${this.props.name} node_text`,
            error: this.state.error !== false,
            helperText: sError,
            onKeyPress: this.keyPressed,
            onChange: this.change,
            type: 'text',
            value: this.state.value === null ? '' : this.state.value,
            variant: this.props.variant,
            inputProps
        };
        // If the label is a placeholder, add additional props
        if (this.props.label === 'placeholder') {
            props.label = this.props.display.__title__;
            props.placeholder = this.props.placeholder || this.props.display.__title__;
        }
        else if (this.props.placeholder) {
            props.placeholder = this.props.placeholder;
        }
        // If there's an adornment
        if (this.props.display.__adornment__) {
            props.InputProps = {
                startAdornment: React.createElement(InputAdornment, { position: "start" }, this.props.display.__adornment__)
            };
        }
        // Render
        return (React.createElement(React.Fragment, null,
            this.props.label === 'above' &&
                React.createElement(Typography, null, this.props.display.__title__),
            React.createElement(TextField, { ...props })));
    }
}
// Register with Node
DefineNodeBase.pluginAdd('text', DefineNodeText);
