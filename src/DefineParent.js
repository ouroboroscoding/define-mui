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
import { compare, empty } from '@ouroboros/tools';
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
// Registered components
const _plugins = {};
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
    // Called to add an external Component to the list available
    static pluginAdd(type, classConstructor) {
        _plugins[type] = classConstructor;
    }
    // Props Types
    static propTypes = {
        dynamicOptions: PropTypes.arrayOf(PropTypes.exact({
            node: PropTypes.string.isRequired,
            trigger: PropTypes.string.isRequired,
            options: PropTypes.object.isRequired
        })),
        error: PropTypes.object,
        fields: PropTypes.arrayOf(PropTypes.string),
        gridSizes: PropTypes.objectOf(PropTypes.oneOfType([
            PropTypes.exact({
                xs: PropTypes.number,
                sm: PropTypes.number,
                md: PropTypes.number,
                lg: PropTypes.number,
                xl: PropTypes.number
            }),
            PropTypes.object
        ])),
        gridSpacing: PropTypes.number,
        label: PropTypes.oneOf(['above', 'none', 'placeholder']),
        name: PropTypes.string.isRequired,
        node: PropTypes.instanceOf(Parent).isRequired,
        nodeVariant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
        onNodeChange: PropTypes.objectOf(PropTypes.func),
        onEnterPressed: PropTypes.func,
        placeholder: PropTypes.string,
        returnAll: PropTypes.bool,
        type: PropTypes.oneOf(['create', 'search', 'update']).isRequired,
        value: PropTypes.object,
        validation: PropTypes.bool,
        variant: PropTypes.oneOf(['filled', 'outlined', 'standard'])
    };
    static defaultProps = {
        dynamicOptions: [],
        gridSizes: { __default__: { xs: 12 } },
        gridSpacing: 2,
        label: 'placeholder',
        nodeVariant: 'outlined',
        returnAll: false,
        value: {},
        validation: true,
        variant: 'outlined'
    };
    // Instance variables
    node;
    state;
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
        // Init node ref
        this.node = null;
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
        // If the value changed
        if (prevProps.value !== this.props.value) {
            // If we have a plugin component
            if (this.state.plugin) {
                this.node.value = this.props.value;
                return;
            }
            // Set the values
            for (const k of Object.keys(this.props.value)) {
                this.fields[k].value = this.props.value[k];
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
        // Get the React special section if there is one
        const oUI = this.props.node.special('ui') || {};
        // Init the state
        const oState = {
            display: oUI,
            plugin: null,
            title: oUI.title || false
        };
        // If we have a type
        if (oUI.type && oUI.type in _plugins) {
            // Set the plugin
            oState.plugin = _plugins[oUI.type];
        }
        else {
            // Init the list elements
            const lElements = [];
            // Init the order
            let lOrder = [];
            // If we were passed specific fields
            if (this.props.fields) {
                lOrder = this.props.fields;
            }
            // Else, if we have the specific type in the react section
            else if (this.props.type in oUI) {
                lOrder = oUI[this.props.type];
            }
            // Else, if we have the generic 'order' in the react section
            else if ('order' in oUI) {
                lOrder = oUI.order;
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
                    const oNodeUI = this.props.node.get(o.node).special('ui') || {};
                    // Create a OptionsHash using the options and the current value
                    //	of the node, and store it under the node's options
                    oNodeUI.options = new OptionsHash(o.options, (this.props.value && this.props.value[o.trigger]) || null);
                    // Overwrite the react special
                    this.props.node.get(o.node).special('ui', oNodeUI);
                    // Store the callback for the trigger
                    oDynamicOptions[o.trigger] = oNodeUI.options.key.bind(oNodeUI.options);
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
                    { xs: 12 };
                // Check what kind of node it is
                switch (sClass) {
                    case 'ArrayNode':
                    case 'HashNode':
                    case 'Parent':
                        lElements.push(React.createElement(Grid, { key: sField, item: true, ...gridSizes }, DefineBase.create(sClass, {
                            gridSizes,
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
                            error: false,
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
                        // If we have a callback
                        if (this.props.onNodeChange && sField in this.props.onNodeChange) {
                            oProps.onChange = (value, oldValue) => { this._nodeChanged(sField, value, oldValue); };
                        }
                        // Create the new element and push it to the list
                        lElements.push(React.createElement(Grid, { key: sField, item: true, ...gridSizes }, DefineBase.create(sClass, oProps)));
                        break;
                    default:
                        throw new Error('Invalid Node type in parent of child: ' + sField);
                }
            }
            // Set the elements and order
            oState.elements = lElements;
            oState.order = lOrder;
        }
        // Return the new state
        return oState;
    }
    /**
     * Node Changed
     *
     * Called when a node that is setup to track changes changes
     *
     * @name nodeChanged
     * @access private
     * @param name The name of the node that changed
     * @param value The new value of the node
     * @param oldValue The old value of the node
     */
    _nodeChanged(name, value, oldValue) {
        // If we have a callback for the name
        if (this.props.onNodeChange && name in this.props.onNodeChange) {
            // Init the current values
            const oValues = {};
            for (const k of Object.keys(this.fields)) {
                oValues[k] = this.fields[k].value;
            }
            oValues[name] = value;
            // Create a new Parent change event and send it to the callback
            const o = this.props.onNodeChange[name]({
                data: oValues,
                node: name,
                oldValue
            });
            // If we got anything back
            if (o) {
                // Go through each field and update the value
                for (const k in o) {
                    if (k in this.fields) {
                        this.fields[k].value = o[k];
                    }
                }
            }
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
        // If we have a plugin component
        if (this.state.plugin) {
            // Store the name
            const ElName = this.state.plugin;
            // Combine the regular node props with any plugin props
            const oProps = {
                display: this.state.display,
                error: this.props.error,
                label: this.props.label,
                ref: (el) => this.node = el,
                name: this.props.name,
                node: this.props.node,
                onEnterPressed: this.props.onEnterPressed,
                placeholder: this.props.placeholder,
                type: this.props.type,
                value: this.props.value,
                validation: this.props.validation,
                variant: this.props.variant
            };
            // Render plugin type
            return (React.createElement(ElName, { ...oProps }));
        }
        // Regular Parent
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
        // If we have a plugin component
        if (this.state.plugin) {
            return this.node.reset();
        }
        // Reset each child
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
        // If we have a plugin component
        if (this.state.plugin) {
            bValid = this.props.node.valid(this.node.value);
            if (!bValid) {
                this.node.error(this.props.node.validationFailures);
            }
            return bValid;
        }
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
        // If we have a plugin component
        if (this.state.plugin) {
            return this.node.value;
        }
        // Init the return value
        const oRet = {};
        // Go through all the fields used
        for (const k of Object.keys(this.fields)) {
            // Get the new value
            const newVal = this.fields[k].value;
            // If we're in update mode and the returnAll flag is not set
            if (this.props.type === 'update' && !this.props.returnAll) {
                // If the value is different
                if (!compare(this.props.value[k], newVal)) {
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
        // If we have a plugin component
        if (this.state.plugin) {
            this.node.value = val;
            return;
        }
        // Set the values
        for (const k of Object.keys(val)) {
            this.fields[k].value = val[k];
        }
    }
}
// Register the component
DefineBase.register('Parent', DefineParent);
