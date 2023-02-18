/**
 * Search
 *
 * Handles generating search
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2022-03-19
 */
// Ouroboros
import { hash } from '@ouroboros/browser';
import { Tree } from '@ouroboros/define';
import { empty, isObject } from '@ouroboros/tools';
// NPM modules
import PropTypes from 'prop-types';
import React from 'react';
// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// Local components
import DefineParent from './DefineParent';
/**
 * Define Search
 *
 * Displays a search form for looking up specific rows from records
 *
 * @name Search
 * @access public
 * @extends React.Component
 */
export default class DefineSearch extends React.Component {
    // Prop Types
    static propTypes = {
        dynamicOptions: PropTypes.arrayOf(PropTypes.exact({
            node: PropTypes.string.isRequired,
            trigger: PropTypes.string.isRequired,
            options: PropTypes.object.isRequired
        })),
        gridSizes: PropTypes.objectOf(PropTypes.exact({
            xs: PropTypes.number,
            sm: PropTypes.number,
            md: PropTypes.number,
            lg: PropTypes.number,
            xl: PropTypes.number
        })),
        handleErrors: PropTypes.objectOf(PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.objectOf(PropTypes.string)
        ])),
        hash: PropTypes.string.isRequired,
        label: PropTypes.oneOf(['above', 'none', 'placeholder']),
        name: PropTypes.string.isRequired,
        success: PropTypes.func,
        tree: PropTypes.instanceOf(Tree).isRequired,
    };
    static defaultProps = {
        gridSizes: { __default__: { xs: 12, sm: 6, lg: 3 } },
        handleErrors: {},
        label: 'placeholder'
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
        const oDisplay = props.tree.special('ui') || {};
        // If there's no primary, assume '_id'
        if (!('primary' in oDisplay)) {
            oDisplay.primary = '_id';
        }
        // Set the initial state
        this.state = {
            name: props.tree._name
        };
        // Bind methods
        this.clear = this.clear.bind(this);
        this.query = this.query.bind(this);
        this.search = this.search.bind(this);
    }
    /**
     * Component Did Mount
     *
     * Called when the component is finished being added to the DOM
     *
     * @name componentDidMount
     * @access public
     */
    componentDidMount() {
        // Track hash changes
        hash.subscribe(this.props.hash, this.search);
        // If we have a hash value
        const sHash = hash.get(this.props.hash);
        if (sHash) {
            this.search(sHash);
        }
    }
    /**
     * Component Will Unmount
     *
     * Called just before the component is removed from the DOM
     *
     * @name componentWillUnmount
     * @access public
     */
    componentWillUnmount() {
        // Stop traching hash changes
        hash.unsubscribe(this.props.hash, this.search);
    }
    /**
     * Clear
     *
     * Resets all the elements in the component
     *
     * @name clear
     * @access public
     */
    clear() {
        hash.set(this.props.hash);
    }
    /**
     * Query
     *
     * Called to set the hash value and trigger a new search
     *
     * @name query
     * @access public
     */
    query() {
        // Fetch the values from the parent
        const oValues = this.parent.value;
        // If there's anything
        if (!empty(oValues)) {
            // Turn them into JSON and store them in the hash
            hash.set(this.props.hash, JSON.stringify(oValues));
        }
    }
    /**
     * Search
     *
     * Passed the new search parameters and triggers the user to search
     *
     * @name search
     * @access public
     * @param values The search parameters encoded as JSON
     */
    search(values) {
        // If we have no search string
        if (values === null) {
            // Reset the parent
            this.parent.reset();
            return;
        }
        // Decode the values
        const oValues = JSON.parse(values);
        // If there's no data
        if (empty(oValues)) {
            // Reset the parent
            this.parent.reset();
            return;
        }
        // Set the parent's values
        this.parent.value = oValues;
        // Run the search
        this.props.onSubmit(oValues);
    }
    /**
     * Error
     *
     * Called to pass along error messages
     *
     * @name error
     * @access public
     * @param error The error(s) associated with the search
     */
    error(error) {
        if (error.code === 1001) {
            this.parent.error(error.msg);
        }
        else if (error.code.toString() in this.props.handleErrors) {
            // If the value is already an object
            if (isObject(this.props.handleErrors[error.code.toString()])) {
                this.parent.error(this.props.handleErrors[error.code.toString()]);
            }
            else {
                const oErrors = this.props.handleErrors[error.code.toString()](error);
                if (isObject(oErrors)) {
                    this.parent.error(oErrors);
                }
            }
        }
        else {
            throw new Error(`Unknown error in Search: ${String(error)}`);
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
        return (<Box className={"search _" + this.state.name}>
				<DefineParent dynamicOptions={this.props.dynamicOptions} gridSizes={this.props.gridSizes} label={this.props.label} ref={(el) => this.parent = el} name={this.props.name} node={this.props.tree} onEnter={this.query} type="search" validation={false}/>
				<Box className="actions">
					<Button variant="contained" color="primary" onClick={this.query}>Search</Button>
				</Box>
			</Box>);
    }
}
