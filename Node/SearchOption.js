/**
 * Define Node Search Option
 *
 * Handles displaying search options for a specific node
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-17
 */
// NPM modules
import React from 'react';
// Material UI
import Select from '@mui/material/Select';
/**
 * Search Option
 *
 * Displays options for how to search the field based on the type
 *
 * @name DefineNodeSearchOption
 * @access private
 * @extends React.Component
 */
export default class DefineNodeSearchOption extends React.Component {
    // State type
    state;
    // Select element
    select;
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineNodeSearchOption
     * @access public
     * @param props Properties passed to the component
     * @returns a new instance
     */
    constructor(props) {
        // Call the parent
        super(props);
        // Init the type
        let lOpts = null;
        // Figure out the type of options based on the Node's type
        switch (props.type) {
            case 'hidden':
            case 'select':
            case 'multiselectcsv':
                break;
            case 'text':
            case 'textarea':
                lOpts = [
                    <option key="exact" value="exact">Exact</option>,
                    <option key="value" value="start">Starts with</option>,
                    <option key="end" value="end">Ends with</option>,
                    <option key="asterisk" value="asterisk">Uses *</option>
                ];
                break;
            default:
                lOpts = [
                    <option key="exact" value="exact">Exact</option>,
                    <option key="greater" value="greater">Greater than (inclusive)</option>,
                    <option key="less" value="less">Less than (inclusive)</option>
                ];
                break;
        }
        // Init state
        this.state = {
            options: lOpts,
            value: lOpts ? 'exact' : null
        };
        // Refs
        this.select = null;
        // Bind methods
        this.change = this.change.bind(this);
    }
    /**
     * Change
     *
     * Called when the search option changes
     *
     * @name change
     * @access public
     * @param ev The event triggers
     */
    change(ev) {
        this.setState({ value: ev.target.value });
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
        if (this.state.options) {
            return (<Select className="selectSearchType" inputRef={el => this.select = el} native onChange={this.change} variant={this.props.variant} value={this.state.value === null ? '' : this.state.value}>
					{this.state.options}
				</Select>);
        }
        else {
            return (<div className="selectSearchEmpty">&nbsp;</div>);
        }
    }
    /**
     * Value (get)
     *
     * Called to get the current search value
     *
     * @name value
     * @property
     * @returns the current value
     */
    get value() {
        if (!this.state.options) {
            return 'exact';
        }
        else {
            return (this.select) ? this.select.value : null;
        }
    }
    /**
     * Value (set)
     *
     * Sets the new search value
     *
     * @name value
     * @property
     * @param val The new value to set
     */
    set value(val) {
        if (this.state.options) {
            this.setState({ value: val });
        }
    }
}
