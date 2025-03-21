/**
 * Define Hash
 *
 * Handles hashes (objects, maps) define nodes/parents
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-18
 */

// Ouroboros
import { merge, ucfirst } from '@ouroboros/tools';
import { Hash } from '@ouroboros/define';

// NPM modules
import PropTypes from 'prop-types';
import React from 'react';

// Material UI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Components
import DefineBase from './DefineBase';
import { DefineNodeBase } from './DefineNode';

// Modules
import { errorTree } from './Shared';

// Types
import { DefineBaseProps } from './DefineBase';
import { DefineNodeBaseProps } from './DefineNode/Base';
export type DefineHashProps = DefineBaseProps & {
	node: Hash,
	value?: Record<any, any>
}
type DefineHashState = {
	plugin: typeof DefineNodeBase,
	display: Record<string, any>
}

// Registered components
const _plugins: Record<string, typeof DefineNodeBase> = {};

/**
 * Hash Node
 *
 * Handles array types with the ability to add / remove elements
 *
 * @name DefineHash
 * @access public
 * @extends DefineBase
 */
export default class DefineHash extends DefineBase {

	// Called to add an external Component to the list available
	static pluginAdd(type: string, classConstructor: typeof DefineNodeBase) {
		_plugins[type] = classConstructor;
	}

	// Props Types
	static propTypes = {
		display: PropTypes.object,
		label: PropTypes.oneOf(['above', 'none', 'placeholder']),
		name: PropTypes.string,
		node: PropTypes.instanceOf(Hash).isRequired,
		onChange: PropTypes.func,
		onEnterPressed: PropTypes.func,
		placeholder: PropTypes.string,
		type: PropTypes.oneOf(['create', 'update']).isRequired,
		value: PropTypes.object,
		validation: PropTypes.bool,
		variant: PropTypes.oneOf(['filled', 'outlined', 'standard'])
	}
	static defaultProps = {
		label: 'placeholder',
		name: '',
		value: {},
		validation: true,
		variant: 'outlined'
	}

	// Prop type
	declare props: DefineHashProps;

	// State type
	state: DefineHashState;

	// The instance of the plugin that's being used
	plugin: DefineNodeBase;

	/**
	 * Constructor
	 *
	 * Creates a new instance
	 *
	 * @name DefineHash
	 * @access public
	 * @param props Properties passed to the component
	 * @returns a new instance
	 */
	constructor(props: DefineHashProps) {

		// Call parent
		super(props);

		// Get the UI display properties off the node
		const oUI = this.props.node.special('ui') || {}

		// If we have overrides
		if(this.props.display) {
			merge(oUI, this.props.display)
		}

		// If the title is not set
		if(!('__title__' in oUI)) {
			oUI.__title__ = ucfirst(props.name);
		}

		// If the type is not set
		if(!('__type__' in oUI)) {
			throw new Error('Custom "__type__" must be set for Hash nodes as there is no standard implementation for them.');
		}

		// If there is no registered Component for the type
		if(!(oUI.__type__ in _plugins)) {
			throw new Error('No registered Component found for type: ' + oUI.__type__ + '.');
		}

		// Init state
		this.state = {
			plugin: _plugins[oUI.__type__],
			display: oUI
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
	error(errors: string[][] | Record<string, any>) {

		// Errors
		let oErrors: Record<string, any>;

		// If we got an array
		if(Array.isArray(errors)) {
			oErrors = errorTree(errors);
		} else {
			oErrors = errors;
		}

		// Pass the errors to the plugin instance
		this.plugin.error(oErrors);
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

		// Store the name
		const ElName = this.state.plugin;

		// Combine the regular node props with any custom props
		const oProps: DefineNodeBaseProps = {
			display: this.state.display,
			label: this.props.label,
			ref: (el: DefineNodeBase) => this.plugin = el,
			name: this.props.name,
			node: this.props.node,
			onEnterPressed: this.props.onEnterPressed,
			placeholder: this.props.placeholder,
			type: this.props.type,
			value: this.props.value,
			validation: this.props.validation,
			variant: this.props.variant
		};

		// If we have an on change prop
		if(this.props.onChange) {
			oProps.onChange = (value: any, oldValue: any) => {
				this.props.onChange!(this.plugin.value, this.props.value);
			}
		}

		// Render custom type
		return (
			<Box className="nodeHash">
				{this.state.display.__title__ &&
					<Typography className="legend">{this.state.display.__title__}</Typography>
				}
				<ElName {...oProps} />
			</Box>
		);
	}

	/**
	 * Reset
	 *
	 * Calls reset on the plugin instance
	 *
	 * @name reset
	 * @access public
	 */
	reset(): void {
		this.plugin.reset();
	}

	/**
	 * Valid
	 *
	 * Called to verify if the current data is valid
	 *
	 * @name valid
	 * @public
	 * @returns true if the current values are valid
	 */
	valid() {

		// Pass the checking to the Component
		const bValid = this.props.node.valid(this.plugin.value);
		if(!bValid) {
			this.plugin.error(errorTree(this.props.node.validationFailures));
		}
		return bValid;
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
	get value() {

		// Return the value of the plugin instance
		return this.plugin.value;
	}

	/**
	 * Value (set)
	 *
	 * Called to set the new value
	 *
	 * @name value
	 * @property
	 * @param val The new values to set
	 */
	set value(val) {

		// Set the value of the plugin instance
		this.plugin.value = val;
	}
}

// Register the component
DefineBase.register('HashNode', DefineHash);