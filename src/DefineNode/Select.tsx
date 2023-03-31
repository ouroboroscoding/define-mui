/**
 * Define Node Select
 *
 * Handles a single define element with multiple static or dynamic options
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */

// Ouroboros modules
import { Node } from '@ouroboros/define';
import Subscribe, { SubscribeCallback, SubscribeReturn } from '@ouroboros/subscribe';
import { afindi } from '@ouroboros/tools';

// NPM modules
import React from 'react';

// Material UI
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';

// Local components
import DefineNodeBase from './Base';

// Types
import { DefineNodeBaseProps, DefineNodeBaseState } from './Base';

// Types
type DefineNodeSelectState = {
	options: string[][]
}

/**
 * Node Select
 *
 * Handles values that have specific options
 *
 * @name DefineNodeSelect
 * @access public
 * @extends DefineNodeBase
 */
export default class DefineNodeSelect extends DefineNodeBase {

	// Props type
	declare props: DefineNodeBaseProps;

	// State type
	declare state: DefineNodeSelectState & DefineNodeBaseState;

	// Callback for dynamic data
	callback: SubscribeCallback;

	// Subscribe return
	subscribe: SubscribeReturn;

	/**
	 * Constructor
	 *
	 * Creates a new instance
	 *
	 * @name DefineNodeSelect
	 * @access public
	 * @param props Properties passed to the component
	 * @returns a new instance
	 */
	constructor(props: DefineNodeBaseProps) {

		// Call parent
		super(props);

		// If we have display options
		let lDisplayOptions = props.display.options;

		// If we got data
		if(lDisplayOptions) {

			// If the options are a dynamic Subscribe
			if(lDisplayOptions instanceof Subscribe) {
				this.callback = this.dynamicData.bind(this);
				lDisplayOptions = [];
			}

			// Else, if we have a list but the elements aren't lists
			else if(!(lDisplayOptions[0] instanceof Array)) {
				lDisplayOptions = lDisplayOptions.map((s: string) => [s, s]);
			}
		}
		// Else, get the options from the node
		else {

			// Try to get the Node options
			const lNodeOptions = (this.props.node as Node).options();

			// If any exist, use them to set the dialog options
			if(lNodeOptions) {
				lDisplayOptions = lNodeOptions.map(s => [s, s]);
			}
		}

		// Set the state options
		this.state.options = lDisplayOptions;

		// Bind methods
		this.change = this.change.bind(this);
	}

	/**
	 * Component Did Mount
	 *
	 * Called right after the component is added to the DOM
	 *
	 * @name componentDidMount
	 * @access public
	 */
	componentDidMount(): void {

		// If there's a callback for dynamic options
		if(this.callback) {

			// Subscribe to the changes in options
			this.subscribe = this.props.display.options.subscribe(this.callback);

			// Store the current options
			this.setState({ options: this.subscribe.data });
		}
	}

	/**
	 * Component Will Unmount
	 *
	 * Called right before the component is removed from the DOM
	 *
	 * @name componentWillUnmount
	 * @access public
	 */
	componentWillUnmount() {

		// If there's a subscribe value
		if(this.subscribe) {

			// Stop tracking
			this.subscribe.unsubscribe();
		}
	}

	/**
	 * Dyanamic Data
	 *
	 * Called by the Options instance when there's new options data
	 *
	 * @name dynamicData
	 * @access public
	 * @param data The new options data
	 */
	dynamicData(data: string[][]) {

		// Init the new state
		const oState: Record<string, any> = { options: data };

		// If the current value doesn't match the list
		if(afindi(data, 0, this.state.value) === -1) {
			oState.value = '';
		}

		// Set the new state
		this.setState(oState);
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
	change(event: SelectChangeEvent<any>, child: React.ReactNode): void {

		// Check the new value is valid
		let error: string | false = false;
		if(this.props.validation &&
			!this.props.node.valid(event.target.value === '' ? null : event.target.value)) {
			error = 'Invalid Selection';
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

		// Init the option elements
		const lOpts = [<option key={0} value=''></option>];

		// Add the other options
		let i = 1;
		for(const o of this.state.options) {
			lOpts.push(<option key={i} value={o[0]}>{o[1]}</option>);
			++i;
		}

		return (
			<React.Fragment>
				{this.props.label === 'above' &&
					<Typography>{this.props.display.title}</Typography>
				}
				<FormControl className={`field_${this.props.name} node_select`} error={this.state.error !== false} variant={this.props.variant}>
					{this.props.label === 'placeholder' &&
						<InputLabel id={this.props.name}>{this.props.display.title}</InputLabel>
					}
					<Select
						label={this.props.display.title}
						labelId={this.props.name}
						native
						onChange={this.change}
						value={this.state.value === null ? '' : this.state.value}
					>
						{lOpts}
					</Select>
					{this.state.error &&
						<FormHelperText>{this.state.error}</FormHelperText>
					}
				</FormControl>
			</React.Fragment>
		);
	}

	/**
	 * Options (set)
	 *
	 * Sets the new options for the dialog
	 *
	 * @name options
	 * @property
	 */
	set options(data: string[][]) {
		this.setState({ options: data });
	}
}

// Register with Node
DefineNodeBase.pluginAdd('select', DefineNodeSelect);