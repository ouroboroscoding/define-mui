/**
 * Define Node
 *
 * Handles a single define element
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-15
 */

// Ouroboros
import { isObject, ucfirst } from '@ouroboros/tools';
import { Node } from '@ouroboros/define';

// NPM modules
import PropTypes from 'prop-types';
import React from 'react';

// Local modules
import DefineBase from '../DefineBase';
import DefineNodeBase from './Base';

// Types
import { labelOptions, typeOptions, variantOptions } from '../types';

// Types
type DefineNodeProps = {
	error: string | false,
	label?: labelOptions,
	name: string,
	node: Node,
	onChange: (val: any) => void,
	onEnter: () => void | false,
	placeholder?: string,
	type: typeOptions,
	value?: any,
	validation?: boolean,
	variant: variantOptions
};
type DefineNodeState = {
	display: Record<string, any>,
	type: string,
	value?: any
};
type RegisterType = {
	class_: typeof DefineNodeBase,
	default_: any
};

// Registered components
const _components: Record<string, RegisterType> = {};

/**
 * DefineNode
 *
 * Wrapper for all the different types of simple data
 *
 * @name DefineNode
 * @access public
 * @extends DefineBase
 */
export default class DefineNode extends DefineBase {

	// PropTypes data
	static propTypes = {
		error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
		label: PropTypes.oneOf(['above', 'none', 'placeholder']),
		name: PropTypes.string.isRequired,
		node: PropTypes.instanceOf(Node).isRequired,
		onChange: PropTypes.func,
		onEnter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
		placeholder: PropTypes.string,
		type: PropTypes.oneOf(['create', 'search', 'update']).isRequired,
		value: PropTypes.any,
		validation: PropTypes.bool,
		variant: PropTypes.oneOf(['filled', 'outlined', 'standard'])
	}
	static defaultProps = {
		error: false,
		label: 'placeholder',
		onEnter: false,
		value: null,
		validation: true,
		variant: 'outlined'
	}

	// Registered Node types
	static addType(name: string, componentClass: typeof DefineNodeBase, defaultValue: string | number) {
		_components[name] = {
			class_: componentClass,
			default_: defaultValue,
		}
	}

	// The components current state
	declare props: DefineNodeProps;
	state: DefineNodeState;

	// Child elements
	_el: DefineNodeBase | null;
	_search: React.ElementType | null;

	/**
	 * Constructor
	 *
	 * Creates a new instance
	 *
	 * @name DefineNode
	 * @access public
	 * @param props Properties passed to the component
	 * @returns a new instance
	 */
	constructor(props: DefineNodeProps) {

		// Call parent
		super(props);

		// Set initial state
		this.state = this.generateState();

		// Add the value
		this.state.value = props.value !== null ? props.value : this.state.display.default

		// Child elements
		this._el = null;
		this._search = null;
	}

	componentDidUpdate(prevProps: DefineNodeProps) {

		// If the Node changed
		if(prevProps.node !== this.props.node) {
			this.setState(this.generateState());
		}
	}

	// Figure out the element type based on the default values of the node
	defaultType(node: Node) {

		// If it has options, it's a select, no question
		if(node.options()) {
			return 'select';
		}

		// Get the node type
		const sType = node.type();

		// Figure it out by type
		switch(sType) {

			// If it's a string type at its core
			case 'any':
			case 'base64':
			case 'ip':
			case 'json':
			case 'md5':
			case 'string':
			case 'uuid':
			case 'uuid4':
				return 'text';

			// If it's a number
			case 'decimal':
			case 'float':
			case 'int':
			case 'timestamp':
			case 'uint':
				return 'number';

			// Else it's its own type
			case 'bool':
			case 'date':
			case 'datetime':
			case 'price':
			case 'time':
				return sType;

			default:
				throw new Error('invalid type in format/Node: ' + sType);
		}
	}

	error(msg: string) {
		if(this._el) {
			this._el.error(msg);
		}
	}

	generateState(): DefineNodeState {

		// Get the react display properties
		const oReact = this.props.node.special('ui') || {}

		// If the title is not set
		if(!('title' in oReact)) {
			oReact.title = ucfirst(this.props.name);
		}

		// If there's no default
		if(!('default' in oReact)) {
			oReact.default = null;
		}

		// Return the new state
		return {
			display: oReact,
			type: 'type' in oReact ?
						oReact.type :
						this.defaultType(this.props.node),
		}
	}

	render() {

		// Get the component name based on the type
		let ElName: typeof DefineNodeBase | null = null;
		if(this.state.type in _components) {
			ElName = _components[this.state.type].class_;
		} else {
			throw new Error(`Invalid type in define/Node: ${this.state.type}`);
		}

		// Get the value
		const mValue = this.state.value !== null ?
						this.state.value :
						_components[this.state.type].default_;

		return (
			<React.Fragment>
				<ElName
					display={this.state.display}
					error={this.props.error}
					label={this.props.label}
					onChange={this.props.onChange}
					onEnter={this.props.onEnter || false}
					name={this.props.name}
					node={this.props.node}
					ref={el => this._el = el}
					value={mValue}
					validation={this.props.validation}
					variant={this.props.variant}
				/>
				{this.props.type === 'search' &&
					<SearchOption
						ref={el => this._search = el}
						type={this.state.type}
						variant={this.props.variant}
					/>
				}
			</React.Fragment>
		);
	}

	reset() {
		if(this._el) {
			this._el.reset();
		}
	}

	get value() {

		// If we don't have the element
		if(!this._el) {
			return null;
		}

		// Get the value of the element
		const mValue = this._el.value;

		// If the value is null
		if(mValue === null) {
			return null;
		}

		// If we're not in search mode, return the value as is
		if(this.props.type !== 'search') {
			return mValue;
		}

		// Get the value of the search select
		const sSearch = this._search.value;

		// If it's null or exact, return the value as is
		if(sSearch === null || sSearch === 'exact') {
			return mValue;
		}

		// Else, generate an object describing the search
		else {
			return {
				type: sSearch,
				value: this._el.value
			}
		}
	}

	set value(val) {

		// If we're not in search mode, set the value as is
		if(this.props.type !== 'search') {
			(this._el as DefineNodeBase).value = val;
			return;
		}

		// If we didn't get an object, assume exact
		if(!isObject(val)) {
			(this._el as DefineNodeBase).value = val;
			(this._search as Search).value = 'exact';
			return;
		}

		// Set the value and search dropdown
		(this._el as DefineNodeBase).value = val.value;
		(this._search as Search).value = val.type;
	}
}

// Register the component with the generator
DefineBase.register('DefineNode', DefineNode);