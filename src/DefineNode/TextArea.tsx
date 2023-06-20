/**
 * Define Node TextArea
 *
 * Handles a single string define element
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */

// Ouroboros modules
import { Node } from '@ouroboros/define';

// NPM modules
import React from 'react';

// Material UI
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Local components
import DefineNodeBase from './Base';

// Types
import { Types } from '@ouroboros/define';
import { DefineNodeBaseProps } from './Base';

/**
 * Node TextArea
 *
 * Handles values that are strings or string-like over multiple lines
 *
 * @name DefineNodeTextArea
 * @access public
 * @extends DefineNodeBase
 */
export default class DefineNodeTextArea extends DefineNodeBase {

	/**
	 * Constructor
	 *
	 * Creates a new instance
	 *
	 * @name DefineNodeTextArea
	 * @access public
	 * @param props Properties passed to the component
	 * @returns a new instance
	 */
	constructor(props: DefineNodeBaseProps) {

		// Call the base
		super(props);

		// If there's a regex, override the node
		if('regex' in props.display) {
			(props.node as Node).regex(props.display.regex);
		}

		// Bind the methods
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
		if(this.props.validation &&
			!this.props.node.valid(event.target.value === '' ? null : event.target.value)) {
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
			className: `field_${this.props.name} node_textarea`,
			error: this.state.error !== false,
			helperText: sError,
			multiline: true,
			onChange: this.change,
			type: 'text',
			value: this.state.value === null ? '' : this.state.value,
			variant: this.props.variant
		}

		// If the label is a placeholder, add additional props
		if(this.props.label === 'placeholder') {
			props.label = this.props.display.title;
			props.placeholder = this.props.placeholder || this.props.display.title;
		} else if(this.props.placeholder) {
			props.placeholder = this.props.placeholder;
		}

		// If there's a max, add it to props
		const minmax = (this.props.node as Node).minmax() as Types.MinMax;
		if(minmax.maximum) {
			props.inputProps = {maxLength: minmax.maximum};
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
DefineNodeBase.pluginAdd('textarea', DefineNodeTextArea);