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
import { Node } from '@ouroboros/define';
// NPM modules
import PropTypes from 'prop-types';
import React from 'react';
/**
 * Define Node Base
 *
 * Base class for all DefineNode types
 *
 * @name DefineNodeBase
 * @access private
 * @extends React.Component
 */
export default class DefineNodeBase extends React.Component {
    // PropTypes data
    static propTypes = {
        display: PropTypes.object.isRequired,
        error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        name: PropTypes.string.isRequired,
        node: PropTypes.instanceOf(Node).isRequired,
        onChange: PropTypes.func,
        onEnter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
        placeholder: PropTypes.string,
        value: PropTypes.any
    };
    // State type
    state;
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name DefineNodeBase
     * @access public
     * @param props Properties passed to the component
     * @returns a new instance
     */
    constructor(props) {
        // Call the React parent component
        super(props);
        // Set the base state
        this.state = {
            error: false,
            value: props.value === undefined ? null : props.value
        };
        // Bind the methods
        this.keyPressed = this.keyPressed.bind(this);
    }
    /**
     * Component Did Update
     *
     * Called when props passed to the component have changed
     *
     * @name componentDidUpdate
     * @access public
     * @param prevProps The previous prop values
     */
    componentDidUpdate(prevProps) {
        if (prevProps.error !== this.props.error) {
            this.setState({ error: this.props.error });
        }
    }
    /**
     * Error
     *
     * Called to display an error associated with the Node
     *
     * @name error
     * @access public
     * @param msg The error message
     */
    error(msg) {
        this.setState({ error: msg });
    }
    /**
     * Key Pressed
     *
     * Called to trap Enter key presses
     *
     * @name keyPressed
     * @access public
     * @param event The event, aka, the key pressed
     */
    keyPressed(event) {
        if (event.key === 'Enter' && this.props.onEnter) {
            this.props.onEnter();
        }
    }
    /**
     * Reset
     *
     * Called to reset the value without triggering an error from the Node
     *
     * @name reset
     * @access public
     */
    reset() {
        this.setState({
            value: null,
            error: false
        });
    }
    /**
     * Value (get)
     *
     * Returns the current value of the component
     *
     * @name value
     * @property
     * @returns the current value
     */
    get value() {
        return this.state.value === '' ? null : this.state.value;
    }
    /**
     * Value (set)
     *
     * Sets the current value
     *
     * @name value
     * @property
     */
    set value(val) {
        const oState = { value: val };
        // Let anyone interested know
        if (this.props.onChange) {
            this.props.onChange(val);
        }
        // Make sure it's valid
        if (this.props.node.valid(val)) {
            oState.error = false;
        }
        else {
            oState.error = this.props.node.validationFailures[0][1];
        }
        // Set the state
        this.setState(oState);
    }
}
