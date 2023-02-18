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
import DefineNode from './';
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
            error = 'Invalid Value';
        }
        // Update the state
        this.setState({
            error,
            value: event.target.value
        });
        // If there's a callback
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
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
            className: 'node_' + this.props.name,
            error: this.state.error !== false,
            helperText: this.state.error,
            onKeyPress: this.keyPressed,
            onChange: this.change,
            type: 'number',
            value: this.state.value === null ? '' : this.state.value,
            variant: this.props.variant,
            inputProps,
            InputProps: {
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
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
        return (<React.Fragment>
				{this.props.label === 'above' &&
                <Typography>{this.props.display.title}</Typography>}
				<TextField {...props}/>
			</React.Fragment>);
    }
}
// Register with Node
DefineNode.pluginAdd('price', DefineNodePrice);
