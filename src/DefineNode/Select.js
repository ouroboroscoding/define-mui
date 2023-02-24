/**
 * Define Node Select
 *
 * Handles a single define element with multiple static or dynamic options
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */
import { afindi } from '@ouroboros/tools';
// NPM modules
import React from 'react';
// Material UI
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
// Local components
import DefineNodeBase from './Base';
// Options modules
import { OptionsBase } from '../Options';
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
    // Callback for dynamic data
    callback;
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
    constructor(props) {
        // Call parent
        super(props);
        // If we have display options
        let lDisplayOptions = props.display.options;
        // If we got data
        if (lDisplayOptions) {
            // If the options are a dynamic OptionsBase
            if (lDisplayOptions instanceof OptionsBase) {
                this.callback = this.dynamicData.bind(this);
                // Get default data and add callback
                lDisplayOptions = lDisplayOptions.subscribe(this.callback);
            }
            // Else, if we have a list but the elements aren't lists
            else if (!(lDisplayOptions[0] instanceof Array)) {
                lDisplayOptions = lDisplayOptions.map((s) => [s, s]);
            }
        }
        // Else, get the options from the node
        else {
            // Try to get the Node options
            const lNodeOptions = this.props.node.options();
            // If any exist, use them to set the dialog options
            if (lNodeOptions) {
                lDisplayOptions = lNodeOptions.map(s => [s, s]);
            }
        }
        // Set the state options
        this.state.options = lDisplayOptions;
        // Bind methods
        this.change = this.change.bind(this);
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
        if (this.callback) {
            this.props.display.options.unsubscribe(this.callback);
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
    dynamicData(data) {
        // Init the new state
        const oState = { options: data };
        // If the current value doesn't match the list
        if (afindi(data, 0, this.state.value) === -1) {
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
    change(event, child) {
        // Check the new value is valid
        let error = false;
        if (this.props.validation &&
            !this.props.node.valid(event.target.value === '' ? null : event.target.value)) {
            error = 'Invalid Selection';
        }
        // Update the state
        this.setState({
            error,
            value: event.target.value
        });
        // If there's a callback
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
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
        // Init the option elements
        const lOpts = [React.createElement("option", { key: 0, value: '' })];
        // Add the other options
        let i = 1;
        for (const o of this.state.options) {
            lOpts.push(React.createElement("option", { key: i, value: o[0] }, o[1]));
            ++i;
        }
        return (React.createElement(React.Fragment, null,
            this.props.label === 'above' &&
                React.createElement(Typography, null, this.props.display.title),
            React.createElement(FormControl, { className: 'node_' + this.props.name, error: this.state.error !== false, variant: this.props.variant },
                this.props.label === 'placeholder' &&
                    React.createElement(InputLabel, { id: this.props.name }, this.props.display.title),
                React.createElement(Select, { label: this.props.display.title, labelId: this.props.name, native: true, onChange: this.change, value: this.state.value === null ? '' : this.state.value }, lOpts),
                this.state.error &&
                    React.createElement(FormHelperText, null, this.state.error))));
    }
    /**
     * Options (set)
     *
     * Sets the new options for the dialog
     *
     * @name options
     * @property
     */
    set options(data) {
        this.setState({ options: data });
    }
}
// Register with Node
DefineNodeBase.pluginAdd('select', DefineNodeSelect);
