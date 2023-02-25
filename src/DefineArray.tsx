/**
 * Define Array
 *
 * Handles arrays of define nodes/parents
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-14
 */

// Ouroboros
import { Base, ArrayNode } from '@ouroboros/define';
import { afindi, clone, combine, ucfirst } from '@ouroboros/tools';

// NPM modules
import PropTypes from 'prop-types';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

// Material UI
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import { red } from '@mui/material/colors';

// Components
import DefineBase from './DefineBase';
import { DefineNodeBase } from './DefineNode';

// Modules
import { errorTree } from './Shared';

// Types
import {
	labelOptions,
	onChangeCallback,
	onEnterPressedCallback,
	typeOptions,
	variantOptions
} from './DefineNode';
import { DefineNodeBaseProps } from './DefineNode/Base';
type DefineArrayProps = {
	error?: any,
	label?: labelOptions,
	name: string,
	node: ArrayNode,
	onChange?: onChangeCallback,
	onEnterPressed?: onEnterPressedCallback,
	placeholder?: string,
	type: typeOptions,
	value?: any[],
	validation?: boolean,
	variant: variantOptions
};
type DefineArrayStateElement = {
	value: any,
	key: string
}
type DefineArrayState = {
	plugin: typeof DefineNodeBase | null,
	nodeClass: string,
	display: Record<string, any>,
	elements: DefineArrayStateElement[]
}
type pluginsType = Record<string, typeof DefineNodeBase>;

// Registered components
const _plugins: pluginsType = {};

/**
 * Define Array
 *
 * Handles array types with the ability to add / remove elements
 *
 * @name DefineArray
 * @access public
 * @extends DefineBase
 */
export default class DefineArray extends DefineBase {

	// Called to add an external Component to the list available
	static pluginAdd(type: string, classConstructor: typeof DefineNodeBase) {
		_plugins[type] = classConstructor;
	}

	// Instance variables
	child: Base;
	nodes: Record<string, DefineBase> | DefineBase;
	declare props: DefineArrayProps;
	state: DefineArrayState;

	// PropTypes variables
	static propTypes = {
		error: PropTypes.object,
		label: PropTypes.oneOf(['above', 'none', 'placeholder']),
		name: PropTypes.string.isRequired,
		node: PropTypes.instanceOf(ArrayNode).isRequired,
		onEnterPressed: PropTypes.func,
		placeholder: PropTypes.string,
		type: PropTypes.oneOf(['create', 'search', 'update']).isRequired,
		value: PropTypes.array,
		validation: PropTypes.bool,
		variant: PropTypes.oneOf(['filled', 'outlined', 'standard'])
	}
	static defaultProps = {
		label: 'placeholder',
		name: '',
		value: [],
		validation: true,
		variant: 'outlined'
	}

	/**
	 * Constructor
	 *
	 * Creates a new instance
	 *
	 * @name DefineArray
	 * @access public
	 * @param props Properties passed to the component
	 * @returns a new instance
	 */
	constructor(props: DefineArrayProps) {

		// Call parent
		super(props);

		// Store the child node
		this.child = props.node.child();

		// Init node refs
		this.nodes = {};

		// Get the react display properties
		const oUI = props.node.special('ui') || {}

		// If the title is not set
		if(!('title' in oUI) ) {
			oUI.title = ucfirst(props.name || '') ;
		}

		// The type
		const mType = 'type' in oUI ? oUI.type : null;

		// Init state
		this.state = {
			plugin: null,
			nodeClass: this.child.class(),
			display: oUI,
			elements: (props.value as any[]).map(v => {
				return {
					value: v,
					key: uuidv4()
				}
			})
		}

		// If we have a plugin Node
		if(mType && mType in _plugins) {
			this.state.plugin = _plugins[mType];
		}
	}

	/**
	 * Add
	 *
	 * Called to add a new array element
	 *
	 * @name add
	 * @access public
	 */
	add(): void {

		// Clone the current elements
		const lElements = clone(this.state.elements);

		// Add a new object
		lElements.push({
			value: null,
			key: uuidv4()
		})

		// Set the new state
		this.setState({elements: lElements});
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

		// If we have a plugin component
		if(this.state.plugin) {
			(this.nodes as DefineBase).error(oErrors);
		}

		// Else, if we have an array of nodes
		else {
			for(const k of Object.keys(oErrors)) {
				const iIndex = parseInt(k, 10);
				(this.nodes as Record<string, DefineBase>)[this.state.elements[iIndex].key].error(oErrors[k]);
			}
		}
	}

	/**
	 * Remove
	 *
	 * Used to remove an element from the array
	 *
	 * @name remove
	 * @param key The key associated with the element to remove
	 */
	remove(key: string) {

		// Find the index
		const iIndex = afindi(this.state.elements, 'key', key);

		// If it's found
		if(iIndex > -1) {

			// Clone the current elements
			const lElements = clone(this.state.elements);

			// Remove the deleted index
			delete (this.nodes as Record<string, DefineBase>)[lElements[iIndex].key];
			lElements.splice(iIndex, 1);

			// Set the new state
			this.setState({elements: lElements});
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

		// Reset the refs
		this.nodes = {};

		// If we have a plugin component
		if(this.state.plugin) {

			// Store the name
			const ElName = this.state.plugin;

			// Combine the regular node props with any plugin props
			const oProps: DefineNodeBaseProps = {
				display: this.state.display,
				error: this.props.error,
				label: this.props.label,
				ref: (el: DefineBase) => this.nodes = el,
				name: this.props.name,
				node: this.props.node,
				onEnterPressed: this.props.onEnterPressed,
				placeholder: (this.props as DefineArrayProps).placeholder,
				type: this.props.type,
				value: this.props.value,
				validation: this.props.validation,
				variant: this.props.variant
			};

			// Render plugin type
			return (
				<ElName {...oProps} />
			);
		}

		// Render
		return (
			<Box className="nodeArray">
				{this.state.display.title &&
					<Typography className="legend">{this.state.display.title}</Typography>
				}
				{this.state.elements.map(o =>
					<Box key={o.key} className="element flexColumns">
						<Box className="data flexGrow">
							{DefineBase.create(this.state.nodeClass, {
								ref: (el: DefineBase) => (this.nodes as Record<string, DefineBase>)[o.key] = el,
								name: (this.props as DefineArrayProps).name,
								node: this.child,
								onEnterPressed: (this.props as DefineArrayProps).onEnterPressed,
								returnAll: true,
								type: (this.props as DefineArrayProps).type,
								value: o.value,
								validation: (this.props as DefineArrayProps).validation
							})}
						</Box>
						<Box className="actions flexStatic">
							<Tooltip title="Remove">
								<IconButton onClick={ev => this.remove(o.key)}>
									<i className="fas fa-minus-circle" style={{color: red[500]}} />
								</IconButton>
							</Tooltip>
						</Box>
					</Box>
				)}
				<Box className="element">
					<Box className="actions">
						<Tooltip title="Add">
							<IconButton onClick={ev => this.add()}>
								<i className="fas fa-plus-circle" style={{color: green[500]}} />
							</IconButton>
						</Tooltip>
					</Box>
				</Box>
			</Box>
		)
	}

	/**
	 * Reset
	 *
	 * Calls reset on all the child components
	 *
	 * @name reset
	 * @access public
	 */
	reset(): void {

		// If we have a plugin component
		if(this.state.plugin) {
			return (this.nodes as DefineBase).reset();
		}

		// Go through each item and reset it
		for(const o of Object.values(this.nodes)) {
			o.reset();
		}
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
	valid(): boolean {

		// Valid?
		let bValid = true;

		// If we have a plugin component
		if(this.state.plugin) {
			bValid = (this.props as DefineArrayProps).node.valid((this.nodes as DefineBase).value);
			if(!bValid) {
				(this.nodes as DefineBase).error((this.props as DefineArrayProps).node.validationFailures);
			}
			return bValid;
		}

		// Go through each item and validate it
		for(const o of Object.values(this.nodes)) {

			// Check if the current value is valid
			if(!this.child.valid(o.value)) {
				o.error(this.child.validationFailures[0][1]);
				bValid = false;
			}
		}

		// Return valid state
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
	get value(): any[] {

		// If we have a plugin component
		if(this.state.plugin) {
			return this.nodes.value;
		}

		// Init the return value
		const lRet = [];

		// Get the list of nodes
		const lNodes = Object.values(this.nodes)

		// Go through all the fields used
		for(const o of lNodes) {

			// Get the new value
			lRet.push(o.value);
		}

		// Return the values
		return lRet;
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
	set value(val: any[]) {

		// If we have a plugin component
		if(this.state.plugin) {
			this.nodes.value = val;
			return;
		}

		// Regenerate the state
		this.setState({
			elements: val.map((v: any) => {
				return {
					value: v,
					key: uuidv4()
				}
			})
		});
	}
}

// Register the component
DefineBase.register('ArrayNode', DefineArray);