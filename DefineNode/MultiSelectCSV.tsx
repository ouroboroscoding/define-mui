/**
 * Define Node Multi-Select CSV
 *
 * Handles a single define element that stores multiple values in a comma
 * separated value
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
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Local components
import DefineNode from './';
import DefineNodeBase from './Base';

// Local Options
import { OptionsBase } from '../Options';

// Types
import { DefineNodeBaseProps, DefineNodeBaseState } from './Base';

// Types
import { optionsCallback } from '../Options';
type DefineNodeMultiSelectCSVState = {
	defaultValues: string[] | null,
	options: string[][]
}

/**
 * Node Multi Select CSV
 *
 * Handles values that are actually a list of comma seperated values
 *
 * @name DefineNodeMultiSelectCSV
 * @access public
 * @extends DefineNodeBase
 */
export default class DefineNodeMultiSelectCSV extends DefineNodeBase {

	// Props type
	declare props: DefineNodeBaseProps;

	// State type
	declare state: DefineNodeMultiSelectCSVState & DefineNodeBaseState;

	// Callback for setting dynamic options
	callback: optionsCallback;

	// List of Checkbox elements
	checks: HTMLInputElement[]

	/**
	 * Constructor
	 *
	 * Creates a new instance
	 *
	 * @name DefineNodeMultiSelectCSV
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

			// If the options are a dynamic OptionsBase instance
			if(lDisplayOptions instanceof OptionsBase) {
				this.callback = this.dynamicData.bind(this);
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
		this.state.defaultValues = null;
		this.state.options = lDisplayOptions;

		// Refs
		this.checks = [];

		// Bind methods
		this.cancel = this.cancel.bind(this);
		this.open = this.open.bind(this);
		this.submit = this.submit.bind(this);
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

		// If there's a callback for dynamic options
		if(this.callback) {

			// Stop tracking
			this.props.display.options.unsubscribe(this.callback);
		}
	}

	/**
	 * Cancel
	 *
	 * Called to close the dialog
	 *
	 * @name cancel
	 * @access public
	 */
	cancel(): void {
		this.setState({defaultValues: null});
	}

	/**
	 * Open
	 *
	 * Called to open the dialog
	 *
	 * @name open
	 * @access public
	 */
	open(): void {
		this.setState({
			defaultValues: this.state.value.split(
				this.props.display.extra_space ? ', ' : ','
			)
		});
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
	dynamicData(data: string[][]): void {
		this.setState({options: data});
	}

	/**
	 * Submit
	 *
	 * Called to set the new data in the node
	 *
	 * @name submit
	 * @access public
	 */
	submit(): void {

		// Init the values
		const lValues = [];

		// Go through each ref
		for(const i in this.checks) {
			if(this.checks[i].checked) {
				lValues.push(this.checks[i].value);
			}
		}

		// Combine the values
		const sValue = lValues.join(
			this.props.display.extra_space ? ', ' : ','
		);

		// Check the new value is valid
		let error: string | false = false;
		if(this.props.validation && !this.props.node.valid(sValue)) {
			error = 'Invalid Value';
		}

		// Update the state
		this.setState({
			defaultValues: null,
			error,
			value: sValue
		});

		// If there's a callback
		if(this.props.onChange) {
			this.props.onChange(sValue);
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

		// Clear refs
		this.checks = [];

		// Initial props
		const props: TextFieldProps = {
			className: 'node_' + this.props.name,
			error: this.state.error !== false,
			helperText: this.state.error,
			type: 'text',
			value: this.state.value === null ? '' : this.state.value,
			variant: this.props.variant,
			inputProps: {
				onClick: this.open,
				readOnly: true,
				style:{ cursor: 'pointer' }
			}
		}

		// If the label is a placeholder, add additional props
		if(this.props.label === 'placeholder') {
			props.label = this.props.display.title;
			props.placeholder = this.props.placeholder || this.props.display.title;
		} else if(this.props.placeholder) {
			props.placeholder = this.props.placeholder;
		}

		return (
			<React.Fragment>
				{this.props.label === 'above' &&
					<Typography>{this.props.display.title}</Typography>
				}
				<TextField {...props} />
				{this.state.defaultValues !== null &&
					<Dialog
						maxWidth="lg"
						onClose={this.cancel}
						open={true}
					>
					<DialogTitle>{this.props.display.title}</DialogTitle>
					<DialogContent dividers>
						<Grid container spacing={2}>
							{this.state.options.map(o =>
								<Grid item xs={12} md={4} lg={2} key={o[0]}>
									<FormControlLabel
										control={<Checkbox
													color="primary"
													defaultChecked={(this.state.defaultValues as string[]).includes(o[0]) ? true : false}
													inputRef={ref => this.checks.push(ref as HTMLInputElement)}
													inputProps={{
														value: o[0]
													}}
												/>}
										label={o[1]}
									/>
								</Grid>
							)}
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button variant="contained" color="primary" onClick={this.submit}>
							Submit
						</Button>
					</DialogActions>
				</Dialog>
				}
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
DefineNode.pluginAdd('multiselectcsv', DefineNodeMultiSelectCSV);
