/**
 * Define Node
 *
 * Handles a single define element
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-15
 */
import { Node } from '@ouroboros/define';
import PropTypes from 'prop-types';
import React from 'react';
import { DefineNodeBaseProps, DefineNodeBaseState } from '../Types';
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
    static propTypes: {
        display: PropTypes.Validator<object>;
        error: PropTypes.Requireable<NonNullable<string | boolean | null | undefined>>;
        name: PropTypes.Validator<string>;
        node: PropTypes.Validator<Node>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onEnter: PropTypes.Requireable<NonNullable<boolean | ((...args: any[]) => any) | null | undefined>>;
        placeholder: PropTypes.Requireable<string>;
        value: PropTypes.Requireable<any>;
    };
    props: DefineNodeBaseProps;
    state: DefineNodeBaseState;
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
    constructor(props: DefineNodeBaseProps);
    /**
     * Component Did Update
     *
     * Called when props passed to the component have changed
     *
     * @name componentDidUpdate
     * @access public
     * @param prevProps The previous prop values
     */
    componentDidUpdate(prevProps: DefineNodeBaseProps): void;
    /**
     * Error
     *
     * Called to display an error associated with the Node
     *
     * @name error
     * @access public
     * @param msg The error message
     */
    error(msg: string): void;
    /**
     * Key Pressed
     *
     * Called to trap Enter key presses
     *
     * @name keyPressed
     * @access public
     * @param event The event, aka, the key pressed
     */
    keyPressed(event: React.KeyboardEvent<HTMLInputElement>): void;
    /**
     * Reset
     *
     * Called to reset the value without triggering an error from the Node
     *
     * @name reset
     * @access public
     */
    reset(): void;
    /**
     * Value (get)
     *
     * Returns the current value of the component
     *
     * @name value
     * @property
     * @returns the current value
     */
    get value(): any;
    /**
     * Value (set)
     *
     * Sets the current value
     *
     * @name value
     * @property
     */
    set value(val: any);
}
