/**
 * Define Node Date
 *
 * Handles a single date define element
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */

// NPM modules
import React from 'react';

// Material UI
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Local components
import DefineNodeBase, { DefineNodeBaseProps } from './Base';

/**
 * Node Date
 *
 * Handles values that represent a date
 *
 * @name DefineNodeDate
 * @access public
 * @extends DefineNodeBase
 */
export default class DefineNodeDate extends DefineNodeBase {

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
	constructor(props: DefineNodeBaseProps) {
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
	change(event: React.ChangeEvent<HTMLInputElement>): void {

		// Check the new value is valid
		let error: string | false = false;
		if(this.props.validation && !this.props.node.valid(event.target.value)) {
			error = this.props.node.validationFailures[0][1];
		}

		// If there's a callback
		if(this.props.onChange) {
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
		if(typeof this.state.error === 'string') {
			sError = this.props.display.errors && this.state.error in this.props.display.errors ?
						this.props.display.errors[this.state.error] :
						this.state.error;
		}

		// Initial props
		const props: TextFieldProps = {
			className: `field_${this.props.name} node_date`,
			error: this.state.error !== false,
			helperText: sError,
			onKeyPress: this.keyPressed,
			onChange: this.change,
			type: 'date',
			value: this.state.value === null ? '' : this.state.value,
			variant: this.props.variant
		}

		// If the label is a placeholder, add additional props
		if(this.props.label === 'placeholder') {
			props.label = this.props.display.title;
		}

		// Render
		return (
			<React.Fragment>
				{this.props.label === 'above' &&
					<Typography>{this.props.display.title}</Typography>
				}
				<TextField {...props} />
			</React.Fragment>
		);
	}
}

// Register with Node
DefineNodeBase.pluginAdd('data', DefineNodeDate);