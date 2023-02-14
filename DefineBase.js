/**
 * Define Base
 *
 * Handles the base class for all other define components
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-14
 */
// NPM modules
import React from 'react';
/**
 * Define Base
 *
 * Class all other Components extend
 *
 * @name DefineBase
 * @access public
 */
export default class DefineBase extends React.Component {
    // Constructor
    constructor(props) {
        super(props);
    }
    // Must implement error
    error(error) {
        throw new Error('Must implement error when extending DefineBase');
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
