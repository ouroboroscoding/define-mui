/**
 * Define Base
 *
 * Handles the base class for all other define components
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-14
 */
// Ouroboros modules
import { isObject } from '@ouroboros/tools';
// NPM modules
import React from 'react';
// Private variables
const _components = {};
/**
 * Define Base
 *
 * Class all other Components extend
 *
 * @name DefineBase
 * @access public
 */
export default class DefineBase extends React.Component {
    /**
     * Create
     *
     * Creates a new react element based on the given type name
     *
     * @name create
     * @access public
     * @static
     * @param name The name of the child class type to create
     * @returns
     */
    static create(name, props) {
        // If the name is invalid
        if (!(name in _components)) {
            throw new Error(`DefineBase.create: no component named "${name}"`);
        }
        // If we didn't get an object for props
        if (!isObject(props)) {
            throw new Error('DefineBase.create: props must be an object');
        }
        // If value is null, remove it
        if (props.value === null) {
            delete props.value;
        }
        // Get the component
        const Component = _components[name];
        // Return
        return (<Component {...props}/>);
    }
    // Called to register a child class with the create method
    static register(name, component) {
        _components[name] = component;
    }
    // Constructor
    constructor(props) {
        super(props);
    }
    // Must implement error
    error(error) {
        throw new Error('Must implement error when extending DefineBase');
    }
    // Must implement reset
    reset() {
        throw new Error('Must implement reset when extending DefineBase');
    }
    // Must implement valid
    valid() {
        throw new Error('Must implement valid when extending DefineBase');
    }
    // Must implement get value
    get value() {
        throw new Error('Must implement get value when extending DefineBase');
    }
    // Must implement set value
    set value(val) {
        throw new Error('Must implement set value when extending DefineBase');
    }
}
