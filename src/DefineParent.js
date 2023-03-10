/**
 * Define Parent
 *
 * Handles groups of define nodes
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */
// Ouroboros
import { empty } from '@ouroboros/tools';
import { Parent } from '@ouroboros/define';
// NPM modules
import PropTypes from 'prop-types';
import React from 'react';
// Material UI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// Components
import DefineBase from './DefineBase';
import { Hash as OptionsHash } from './Options';
// Modules
import { errorTree } from './Shared';
/**
 * Parent
 *
 * Creates a grid of Nodes using the FormatOC Parent structure
 *
 * @name DefineParent
 * @access public
 * @extends DefineBase
 */
export default class DefineParent extends DefineBase {
    // Props Types
    static propTypes = {
        dynamicOptions: PropTypes.arrayOf(PropTypes.exact({
            node: PropTypes.string.isRequired,
            trigger: PropTypes.string.isRequired,
            options: PropTypes.object.isRequired
        })),
        error: PropTypes.object,
        fields: PropTypes.arrayOf(PropTypes.string),
        gridSizes: PropTypes.objectOf(PropTypes.exact({
            xs: PropTypes.number,
            sm: PropTypes.number,
            md: PropTypes.number,
            lg: PropTypes.number,
            xl: PropTypes.number
        })),
        gridSpacing: PropTypes.number,
        label: PropTypes.oneOf(['above', 'none', 'placeholder']),
        name: PropTypes.string.isRequired,
        node: PropTypes.instanceOf(Parent).isRequired,
        nodeVariant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
        onEnterPressed: PropTypes.func,
        returnAll: PropTypes.bool,
        type: PropTypes.oneOf(['create', 'search', 'update']).isRequired,
        value: PropTypes.object,
        validation: PropTypes.bool
    };
    static defaultProps = {
        dynamicOptions: [],
        gridSizes: { __default__: { xs: 12, sm: 6, lg: 3 } },
        gridSpacing: 2,
        label: 'placeholder',
        nodeVariant: 'outlined',
        returnAll: false,
        value: {},
        validation: true
    };
    // State type
    state;
    // Fields
    fields;
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineParent
     * @access public
     * @param props Properties passed to the component
     * @returns a new instance
     */
    constructor(props) {
        // Call parent
        super(props);
        // Init state
        this.state = this.generateState();
        // Init the field refs
        this.fields = {};
    }
    /**
     * Component Did Update
     *
     * Called when any of the props to the component are changed
     *
     * @name componentDidUpdate
     * @access public
     * @param prevProps The previous properties of the component
     */
    componentDidUpdate(prevProps) {
        // If the error changed
        if (prevProps.error !== this.props.error) {
            if (this.props.error) {
                this.error(this.props.error);
            }
        }
        // If the Node changed
        if (prevProps.node !== this.props.node) {
            this.setState(this.generateState());
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
    error(errors) {
        // Errors
        let oErrors;
        // If we got an array
        if (Array.isArray(errors)) {
            oErrors = errorTree(errors);
        }
        else {
            oErrors = errors;
        }
        // Go through each error
        for (const k of Object.keys(oErrors)) {
            if (k in this.fields) {
                this.fields[k].error(oErrors[k]);
            }
            else {
                throw new Error(`Field not found error: ${k} = ${oErrors[k]}`);
            }
        }
    }
    /**
     * Generate State
     *
     * Uses the props and node data to generate the state to set
     *
     * @name generateState
     * @access public
     * @returns the new state to set
     */
    generateState() {
        // Init the list elements
        const lElements = [];
        // Get the React special section if there is one
        const oReact = this.props.node.special('ui') || {};
        // Init the order
        let lOrder = [];
        // If we were passed specific fields
        if (this.props.fields) {
            lOrder = this.props.fields;
        }
        // Else, if we have the specific type in the react section
        else if (this.props.type in oReact) {
            lOrder = oReact[this.props.type];
        }
        // Else, if we have the generic 'order' in the react section
        else if ('order' in oReact) {
            lOrder = oReact.order;
        }
        // Else, just use the keys of the node
        else {
            lOrder = this.props.node.keys();
        }
        // If we have any dynamic options
        let oDynamicOptions = null;
        if (this.props.dynamicOptions && this.props.dynamicOptions.length) {
            // Set the var to an object
            oDynamicOptions = {};
            // Go through each one
            for (const o of this.props.dynamicOptions) {
                // If the node doesn't exist
                if (!this.props.node.get(o.node)) {
                    throw new Error(`Node "${o.node}" used as a node in "dynamicOptions" attribute does not exist in the Parent`);
                }
                // If the trigger doesn't exist
                if (!this.props.node.get(o.trigger)) {
                    throw new Error(`Node "${o.trigger}" used as a trigger in "dynamicOptions" attribute does not exist in the Parent`);
                }
                // Get the react section of the node
                const oUI = this.props.node.get(o.node).special('ui') || {};
                // Create a OptionsHash using the options and the current value
                //	of the node, and store it under the node's options
                oUI.options = new OptionsHash(o.options, (this.props.value && this.props.value[o.trigger]) || null);
                // Overwrite the react special
                this.props.node.get(o.node).special('ui', oUI);
                // Store the callback for the trigger
                oDynamicOptions[o.trigger] = oUI.options.key.bind(oReact.options);
            }
        }
        // Go through each node
        for (const sField of lOrder) {
            // Get the node
            const oChild = this.props.node.get(sField);
            // Get the class
            const sClass = oChild.class();
            // Get the value
            const mValue = (sField in this.props.value) ?
                this.props.value[sField] :
                null;
            // Grid sizes
            const gridSizes = this.props.gridSizes[sField] ||
                this.props.gridSizes.__default__ ||
                { xs: 12, sm: 6, lg: 3 };
            // Check what kind of node it is
            switch (sClass) {
                case 'ArrayNode':
                case 'HashNode':
                case 'Parent':
                    lElements.push(React.createElement(Grid, { key: sField, item: true, ...gridSizes }, DefineBase.create(sClass, {
                        label: this.props.label,
                        nodeVariant: this.props.nodeVariant,
                        ref: (el) => this.fields[sField] = el,
                        name: sField,
                        node: oChild,
                        onEnterPressed: this.props.onEnterPressed,
                        returnAll: this.props.returnAll,
                        type: this.props.type,
                        value: mValue,
                        validation: this.props.validation
                    })));
                    break;
                case 'Node':
                    const oProps = {
                        label: this.props.label,
                        ref: (el) => this.fields[sField] = el,
                        name: sField,
                        node: oChild,
                        onEnterPressed: this.props.onEnterPressed,
                        type: this.props.type,
                        value: mValue,
                        validation: this.props.validation,
                        variant: this.props.nodeVariant
                    };
                    // If we have a trigger
                    if (oDynamicOptions && sField in oDynamicOptions) {
                        oProps.onChange = oDynamicOptions[sField];
                    }
                    // Create the new element and push it to the list
                    lElements.push(React.createElement(Grid, { key: sField, item: true, ...gridSizes }, DefineBase.create(sClass, oProps)));
                    break;
                default:
                    throw new Error('Invalid Node type in parent of child: ' + sField);
            }
        }
        // Return the list of elements we generated
        return {
            elements: lElements,
            order: lOrder,
            title: oReact.title || false
        };
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
        return (React.createElement(React.Fragment, null,
            this.state.title &&
                React.createElement(Typography, { variant: "h6" }, this.state.title),
            React.createElement(Grid, { container: true, spacing: this.props.gridSpacing, className: "nodeParent _" + this.props.name }, this.state.elements)));
    }
    /**
     * Reset
     *
     * Calls reset on all the child components
     *
     * @name reset
     * @access public
     */
    reset() {
        for (const k of Object.keys(this.fields)) {
            this.fields[k].reset();
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
    valid() {
        // Valid?
        let bValid = true;
        // Go through each item and validate it
        for (const k of this.state.order) {
            // Get the node
            const oNode = this.props.node.get(k);
            // If we have a Node
            if (oNode.class() === 'Node') {
                // If the value is invalid
                if (!oNode.valid(this.fields[k].value)) {
                    this.fields[k].error(oNode.validationFailures[0][1]);
                    bValid = false;
                }
            }
            // Else, if we have a more complex type
            else {
                // If the Component is invalid
                if (!this.fields[k].valid()) {
                    bValid = false;
                }
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
    get value() {
        // Init the return value
        const oRet = {};
        // Go through all the fields used
        for (const k of Object.keys(this.fields)) {
            // Get the new value
            const newVal = this.fields[k].value;
            // If we're in update mode and the returnAll flag is not set
            if (this.props.type === 'update' && !this.props.returnAll) {
                // If the value is different
                if (this.props.value[k] !== newVal) {
                    oRet[k] = newVal;
                }
            }
            // Else we're in insert or search mode
            else {
                // If the value isn't null, add it
                if (!empty(newVal)) {
                    oRet[k] = newVal;
                }
            }
        }
        // Return the values
        return oRet;
    }
    /**
     * Value (set)
     *
     * Called to set the new value
     *
     * @name value
     * @property
     */
    set value(val) {
        for (const k of Object.keys(val)) {
            this.fields[k].value = val[k];
        }
    }
}
// Register the component
DefineBase.register('Parent', DefineParent);
