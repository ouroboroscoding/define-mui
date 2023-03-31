/**
 * Define Node Datetime
 *
 * Handles a single datetime define element
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */

// Ouroboros modules
import { iso } from '@ouroboros/dates';

// NPM modules
import React from 'react';

// Material UI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Local components
import DefineNodeBase from './Base';

// Types
import { DefineNodeBaseProps } from './Base';

/**
 * Node Datetime
 *
 * Handles values that represent a date with a time
 *
 * @name DefineNodeDatetime
 * @access public
 * @extends DefineNodeBase
 */
export default class DefineNodeDatetime extends DefineNodeBase {

	/**
	 * Constructor
	 *
	 * Creates a new instance
	 *
	 * @name DefineNodeDatetime
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
	 * @param part The part of the date/time
	 * @param value The new value
	 */
	change(part: 'date' | 'time', value: string): void {

		// Init the new value
		let newDatetime: string;

		// If we got the date part
		if(part === 'date') {
			newDatetime = value + ' ' + this.state.value.substring(11, 19);
		} else {
			newDatetime = this.state.value.substring(0, 10) + ' ' + value;
		}

		// Check if it's valid
		let error: string | false = false;
		if(this.props.validation && !this.props.node.valid(newDatetime)) {
			error = 'Invalid Date/Time';
		}

		// If there's a callback
		if(this.props.onChange) {
			this.props.onChange(newDatetime, this.state.value);
		}

		// Update the state
		this.setState({
			error,
			value: newDatetime
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

		// Render
		return (
			<Box className={`field_${this.props.name} node_datetime`}>
				{this.props.label === 'above' &&
					<Typography>{this.props.display.title}</Typography>
				}
				<Box className="flexColumns">
					<TextField
						error={this.state.error !== false}
						helperText={this.state.error}
						label={this.props.label === 'placeholder' ? this.props.display.title : ''}
						onChange={ev => this.change('date', ev.target.value)}
						onKeyPress={this.keyPressed}
						type="date"
						value={this.state.value.substring(0, 10)}
						variant={this.props.variant}
					/>
					&nbsp;&nbsp;
					<TextField
						error={this.state.error !== false}
						onChange={ev => this.change('time', ev.target.value)}
						onKeyPress={this.keyPressed}
						type="time"
						value={this.state.value.substring(11, 19)}
						variant={this.props.variant}
					/>
				</Box>
			</Box>
		);
	}
}

// Register with Node
DefineNodeBase.pluginAdd('datetime', DefineNodeDatetime);
