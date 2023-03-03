/**
 * Form
 *
 * Handles creating forms using Format Trees
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2022-03-19
 */

// Ouroboros modules
import{ Tree } from '@ouroboros/define';
import { empty, isObject } from '@ouroboros/tools';

// NPM modules
import PropTypes from 'prop-types';
import React from 'react';

// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Components
import DefineParent from './DefineParent';

// Types
import { labelOptions, variantOptions } from './DefineNode';
import { dynamicOptionStruct, gridSizesStruct } from './DefineParent';
export type onCancelCallback = () => void;
export type onSubmitCallback = (value: Record<string, any>, key: any) => boolean | string[][] | Promise<boolean>;
export type FormProps = {
	dynamicOptions?: dynamicOptionStruct[],
	fields?: string[],
	gridSizes?: gridSizesStruct,
	gridSpacing?: number,
	label?: labelOptions,
	onCancel?: onCancelCallback,
	onSubmit: onSubmitCallback,
	title: string | boolean,
	tree: Tree,
	type: 'create' | 'update',
	value: Record<string, any>,
	variant?: variantOptions
};
export type FormState = {
	primary: string
}

/**
 * Form
 *
 * Handles create/update forms using Parent
 *
 * @name Form
 * @access public
 * @extends React.Component
 */
export default class Form extends React.Component {

	// Prop Types
	static propTypes = {
		dynamicOptions: PropTypes.arrayOf(PropTypes.exact({
			node: PropTypes.string.isRequired,
			trigger: PropTypes.string.isRequired,
			options: PropTypes.object.isRequired
		})),
		fields: PropTypes.arrayOf(PropTypes.string),
		gridSizes: PropTypes.objectOf(
			PropTypes.exact({
				xs: PropTypes.number,
				sm: PropTypes.number,
				md: PropTypes.number,
				lg: PropTypes.number,
				xl: PropTypes.number
			})
		),
		gridSpacing: PropTypes.number,
		label: PropTypes.oneOf(['above', 'none', 'placeholder']),
		onCancel: PropTypes.func,
		onSubmit: PropTypes.func.isRequired,
		title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
		tree: PropTypes.instanceOf(Tree).isRequired,
		type: PropTypes.oneOf(['create', 'update']).isRequired,
		value: PropTypes.object,
		variant: PropTypes.oneOf(['filled', 'outlined', 'standard'])
	};
	static defaultProps = {
		gridSizes: {__default__: {xs: 12, sm: 6, lg: 3}},
		gridSpacing: 2,
		label: 'placeholder',
		title: false,
		value: {},
		variant: 'outlined'
	};

	// Props type
	declare props: FormProps;

	// State type
	state: FormState;

	// Parent component instance
	parent: DefineParent;

	/**
	 * Constructor
	 *
	 * Creates a new instance
	 *
	 * @name DefineSearch
	 * @access public
	 * @param props Properties passed to the component
	 * @returns a new instance
	 */
	constructor(props: FormProps) {

		// Call parent
		super(props);

		// Get the display options
		const oUI = props.tree.special('ui') || {};

		// If there's no primary, assume '_id'
		if(!('primary' in oUI)) {
			oUI.primary = '_id';
		}

		// Set the initial state
		this.state = {
			primary: oUI.primary
		}

		// Bind methods
		this._cancel = this._cancel.bind(this);
		this._errors = this._errors.bind(this);
		this._submit = this._submit.bind(this);
	}

	/**
	 * Cancel
	 *
	 * Called to contact the user to be aware the form needs some sort of
	 * cancellation
	 *
	 * @name _cancel
	 * @access private
	 */
	_cancel(): void {

		// If the prop is a function
		if(typeof this.props.onCancel === 'function') {
			this.props.onCancel();
		}
	}

	/**
	 * Errors
	 *
	 * Called to add errors that come back from an onSubmit callback
	 *
	 * @name _errors
	 * @access private
	 * @param errors The list of errors from define
	 */
	_errors(errors: string[][]) {
		this.parent.error(errors);
	}

	/**
	 * Submit
	 *
	 * Called to notify the user of data to be submitted, only fires if the
	 * current data is valid
	 *
	 * @name _submit
	 * @access private
	 */
	_submit(): void {

		// Make sure each child of the parent is valid
		if(!this.parent.valid()) {
			return;
		}

		// Get the parent values
		const oValue = this.parent.value;

		// If it's not empty
		if(!empty(oValue)) {

			// Init the key
			const mKey = (this.props.type === 'update' && this.state.primary in this.props.value) ?
							this.props.value[this.state.primary] :
							null;

			// Call the onSubmit and store the result
			const mRes = this.props.onSubmit(oValue, mKey);

			// If we got a true value, reset errors
			if(mRes === true) {

				// If we still have the parent
				if(this.parent) {
					this.parent.error([]);
				}
			}

			// If we got false, do nothing
			else if(mRes === false) {
				return;
			}

			// Else, if we got an array, set the errors
			else if(Array.isArray(mRes)) {
				this.parent.error(mRes);
			}

			// If we got a promise back
			else if(mRes instanceof Promise) {
				mRes.then(
					result => {
						if(result && this.parent) {
							this.parent.error([]);
						}
					},
					errors => this.parent.error(errors)
				);
			}
		}
	}

	/**
	 * Error
	 *
	 * Sets a new object of error messages by field
	 *
	 * @name error
	 * @access public
	 * @param errors Errors to set on the component
	 */
	error(errors: string[][]) {

		// Pass the errors to the parent
		this.parent.error(errors);
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
		let title: string | false = false;
		let submit: string;
		if(this.props.type === 'create') {
			if(this.props.title) {
				title = this.props.title === true ? 'Create ' + this.props.tree._name : this.props.title;
			}
			submit = 'Create';
		} else {
			if(this.props.title) {
				title = this.props.title === true ? 'Update ' + this.props.tree._name : this.props.title;
			}
			submit = 'Update';
		}

		// Render
		return (
			<Box className={"form _" + this.props.tree._name}>
				{title &&
					<Typography className="form_title">{title}</Typography>
				}
				<DefineParent
					dynamicOptions={this.props.dynamicOptions}
					fields={this.props.fields}
					gridSizes={this.props.gridSizes}
					label={this.props.label}
					ref={(el: DefineParent) => this.parent = el}
					name={this.props.tree._name}
					node={this.props.tree}
					onEnterPressed={this._submit}
					type={this.props.type}
					value={this.props.value}
				/>
				<Box className="actions">
					{this.props.onCancel &&
						<Button variant="contained" color="secondary" onClick={this._cancel}>Cancel</Button>
					}
					<Button variant="contained" color="primary" onClick={this._submit}>{submit}</Button>
				</Box>
			</Box>
		);
	}

	/**
	 * Reset
	 *
	 * Calls reset on the Parent
	 *
	 * @name reset
	 * @access public
	 */
	reset(): void {

		// If we have a parent
		if(this.parent) {

			// Call reset on the parent
			this.parent.reset();
		}
	}

	/**
	 * Value (get)
	 *
	 * Returns the current value
	 *
	 * @name value
	 * @property
	 * @returns the current value
	 */
	get value(): Record<string, any> {
		return this.parent.value;
	}

	/**
	 * Value (set)
	 *
	 * Called to set the new value
	 *
	 * @name value
	 * @property
	 */
	set value(val: Record<string, any>) {
		this.parent.value = val;
	}
}