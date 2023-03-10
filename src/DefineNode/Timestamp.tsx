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
import { iso, timestamp } from '@ouroboros/dates';

// NPM modules
import React from 'react';

// Material UI
import Box from '@mui/material/Box';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Local components
import DefineNodeBase from './Base';

// Types
import { DefineNodeBaseProps } from './Base';

/**
 * Node Timestamp
 *
 * Handles values that represent seconds since 1970
 *
 * @name DefineNodeTimestamp
 * @access public
 * @extends DefineNodeBase
 */
export default class DefineNodeTimestamp extends DefineNodeBase {

	/**
	 * Constructor
	 *
	 * Creates a new instance
	 *
	 * @name DefineNodeTimestamp
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

		// Convert the current timestamp into a date/time
		const sCurrent = iso(this.state.value, true);

		// If we got the date part
		let newDatetime: string;
		if(part === 'date') {
			newDatetime = value + ' ' + sCurrent.substring(11, 19);
		} else {
			newDatetime = sCurrent.substring(0, 10) + ' ' + value;
		}

		// Convert it to a timestamp
		const newTimestamp = timestamp(newDatetime, false);

		// Check if it's valid
		let error: string | false = false;
		if(this.props.validation && !this.props.node.valid(newTimestamp)) {
			error = 'Invalid Timestamp';
		}

		// Update the state
		this.setState({
			error,
			value: newTimestamp
		});

		// If there's a callback
		if(this.props.onChange) {
			this.props.onChange(newTimestamp);
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

		const sDatetime = iso(this.state.value);
		return (
			<Box className={`field_${this.props.name} node_timestamp`}>
				{this.props.label === 'above' &&
					<Typography>{this.props.display.title}</Typography>
				}
				<Box className="flexColumns">
					<TextField
						className="date"
						error={this.state.error !== false}
						helperText={this.state.error}
						label={this.props.label === 'placeholder' ? this.props.display.title : ''}
						onChange={ev => this.change('date', ev.target.value)}
						onKeyPress={this.keyPressed}
						type="date"
						value={sDatetime.substring(0,10)}
						variant={this.props.variant}
					/>
					&nbsp;&nbsp;
					<TextField
						className="time"
						error={this.state.error !== false}
						onChange={ev => this.change('time', ev.target.value)}
						onKeyPress={this.keyPressed}
						type="time"
						value={sDatetime.substring(11, 19)}
						variant={this.props.variant}
					/>
				</Box>
			</Box>
		);
	}
}

// Register with Node
DefineNodeBase.pluginAdd('timestamp', DefineNodeTimestamp);