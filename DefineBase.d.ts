/**
 * Define Base
 *
 * Handles the base class for all other define components
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-14
 */
import React from 'react';
export type onSubmitCallback = (values: Record<string, any>) => boolean;
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
    static create(name: string, props: Record<string, any>): React.ReactElement;
    static register(name: string, component: typeof DefineBase): void;
    constructor(props: Record<string, any>);
    error(error: any): void;
    reset(): void;
    valid(): boolean;
    get value(): any;
    set value(val: any);
}
