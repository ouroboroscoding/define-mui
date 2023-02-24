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
import { Tree } from '@ouroboros/define';
import { empty } from '@ouroboros/tools';
// NPM modules
import PropTypes from 'prop-types';
import React from 'react';
// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// Components
import DefineParent from './DefineParent';
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
        gridSizes: PropTypes.objectOf(PropTypes.exact({
            xs: PropTypes.number,
            sm: PropTypes.number,
            md: PropTypes.number,
            lg: PropTypes.number,
            xl: PropTypes.number
        })),
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
        gridSizes: { __default__: { xs: 12, sm: 6, lg: 3 } },
        gridSpacing: 2,
        label: 'placeholder',
        title: false,
        value: {},
        variant: 'outlined'
    };
    // State type
    state;
    // Parent component instance
    parent;
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
    constructor(props) {
        // Call parent
        super(props);
        // Get the display options
        const oUI = props.tree.special('ui') || {};
        // If there's no primary, assume '_id'
        if (!('primary' in oUI)) {
            oUI.primary = '_id';
        }
        // Set the initial state
        this.state = {
            primary: oUI.primary
        };
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
    _cancel() {
        // If the prop is a function
        if (typeof this.props.onCancel === 'function') {
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
    _errors(errors) {
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
    _submit() {
        // Make sure each child of the parent is valid
        if (!this.parent.valid()) {
            return;
        }
        // Get the parent values
        const oValue = this.parent.value;
        // If it's not empty
        if (!empty(oValue)) {
            // Init the key
            const mKey = (this.props.type === 'update' && this.state.primary in this.props.value) ?
                this.props.value[this.state.primary] :
                null;
            // Call the onSubmit and pass it the primary key value
            this.props.onSubmit(oValue, mKey).then(result => { return; }, errors => this.parent.error(errors));
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
        let title = false;
        let submit;
        if (this.props.type === 'create') {
            if (this.props.title) {
                title = this.props.title === true ? 'Create ' + this.props.tree._name : this.props.title;
            }
            submit = 'Create';
        }
        else {
            if (this.props.title) {
                title = this.props.title === true ? 'Update ' + this.props.tree._name : this.props.title;
            }
            submit = 'Update';
        }
        // Render
        return (React.createElement(Box, { className: "form _" + this.props.tree._name },
            title &&
                React.createElement(Typography, { className: "form_title" }, title),
            React.createElement(DefineParent, { dynamicOptions: this.props.dynamicOptions, fields: this.props.fields, gridSizes: this.props.gridSizes, label: this.props.label, ref: (el) => this.parent = el, name: this.props.tree._name, node: this.props.tree, onEnterPressed: this._submit, type: this.props.type, value: this.props.value }),
            React.createElement(Box, { className: "actions" },
                this.props.onCancel &&
                    React.createElement(Button, { variant: "contained", color: "secondary", onClick: this._cancel }, "Cancel"),
                React.createElement(Button, { variant: "contained", color: "primary", onClick: this._submit }, submit))));
    }
    /**
     * Reset
     *
     * Calls reset on the Parent
     *
     * @name reset
     * @access public
     */
    reset() {
        // Call reset on the parent
        this.parent.reset();
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
    set value(val) {
        this.parent.value = val;
    }
}
