/**
 * Format Array
 *
 * Handles arrays of FormatOC nodes/parents
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2022-03-19
 */

// Ouroboros
import { BaseNode, ArrayNode } from '@ouroboros/define';
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
import Child from './Child';

// Types
import { labelOptions, typeOptions, onEnterCallback } from './types';

// Types
type DefineArrayProps = {
	label?: labelOptions,
	name?: string,
	node: ArrayNode,
	onEnter?: onEnterCallback,
	placeholder?: string,
	type: typeOptions,
	value?: any[],
	validation?: boolean
};
type DefineArrayStateElement = {
	value: any,
	key: string
}
type DefineArrayState = {
	custom: typeof DefineBase | null,
	customProps?: Record<string, any>,
	nodeClass: string,
	display: Record<string, any>,
	elements: DefineArrayStateElement[]
}

/**
 * Define Array
 *
 * Handles array types with the ability to add / remove elements
 *
 * @name DefineArray
 * @access public
 * @extends React.Component
 */
export default class DefineArray extends DefineBase {

	// Instance variables
	child: BaseNode;
	nodes: Record<string, DefineBase> | DefineBase;
	state: DefineArrayState;

	// PropTypes variables
	static propTypes = {
		label: PropTypes.oneOf(['above', 'none', 'placeholder']),
		name: PropTypes.string,
		node: PropTypes.instanceOf(ArrayNode).isRequired,
		onEnter: PropTypes.func,
		placeholder: PropTypes.string,
		type: PropTypes.oneOf(['create', 'search', 'update']).isRequired,
		value: PropTypes.array,
		validation: PropTypes.bool
	}
	static defaultProps = {
		label: 'placeholder',
		name: '',
		value: [],
		validation: true
	}

	// External Components register to be used within DefineArray
	static _registered: Record<string, typeof DefineBase> = {}

	// Constructor
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
			custom: null,
			nodeClass: this.child.class(),
			display: oUI,
			elements: (props.value as any[]).map(v => {
				return {
					value: v,
					key: uuidv4()
				}
			})
		}

		// If we have a custom Node
		if(mType && mType in DefineArray._registered) {
			this.state.custom = DefineArray._registered[mType];
			this.state.customProps = oUI.props || {};
		}
	}

	// Called to add new array element
	add() {

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

	error(errors: Record<string, any>) {

		// If we have a custom component
		if(this.state.custom) {
			(this.nodes as DefineBase).error(errors);
		}

		// Else, if we have an array of nodes
		else {
			for(const k of Object.keys(errors)) {
				const iIndex = parseInt(k, 10);
				(this.nodes as Record<string, DefineBase>)[this.state.elements[iIndex].key].error(errors[k]);
			}
		}
	}

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

	// Called to add an external Component to the list available
	static register(type: string, classConstructor: typeof DefineBase) {
		DefineArray._registered[type] = classConstructor;
	}

	// Renders the component
	render() {

		// Reset the refs
		this.nodes = {};

		// If we have a custom component
		if(this.state.custom) {

			// Store the name
			const ElName = this.state.custom;

			// Combine the regular node props with any custom props
			const oProps = combine(this.state.customProps as Record<string, any>, {
				display: this.state.display,
				label: (this.props as DefineArrayProps).label,
				ref: (el: DefineBase) => this.nodes = el,
				name: (this.props as DefineArrayProps).name,
				node: (this.props as DefineArrayProps).node,
				onEnter: (this.props as DefineArrayProps).onEnter,
				placeholder: (this.props as DefineArrayProps).placeholder,
				value: (this.props as DefineArrayProps).value,
				validation: (this.props as DefineArrayProps).validation
			});

			// Render custom type
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
							{Child.create(this.state.nodeClass, {
								ref: (el: DefineBase) => (this.nodes as Record<string, DefineBase>)[o.key] = el,
								name: (this.props as DefineArrayProps).name,
								node: this.child,
								onEnter: (this.props as DefineArrayProps).onEnter,
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

	valid() {

		// Valid?
		let bValid = true;

		// If we have a custom component
		if(this.state.custom) {
			bValid = (this.props as DefineArrayProps).node.valid((this.nodes as DefineBase).value);
			if(!bValid) {
				(this.nodes as DefineBase).error((this.props as DefineArrayProps).node.validationFailures);
			}
			return bValid;
		}

		// Get the list of nodes
		const lNodes = Object.values(this.nodes)

		// Go through each item and validate it
		for(const i in lNodes) {

			// Check if the current value is valid
			if(!this.child.valid(lNodes[i].value)) {
				lNodes[i].error(this.child.validationFailures[0][1]);
				bValid = false;
			}
		}

		// Return valid state
		return bValid;
	}

	// Called when value is request
	get value() {

		// If we have a custom component
		if(this.state.custom) {
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

	// Called when new value is passed
	set value(val) {

		// If we have a custom component
		if(this.state.custom) {
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
Child.register('DefineArray', DefineArray);
