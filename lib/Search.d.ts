/**
 * Search
 *
 * Handles generating search
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2022-03-19
 */
import { Tree } from '@ouroboros/define';
import PropTypes from 'prop-types';
import React from 'react';
import DefineParent from './DefineParent';
import { labelOptions } from './DefineNode';
import { dynamicOptionStruct, gridSizesStruct } from './DefineParent';
export type onSearchCallback = (value: Record<string, any>) => Promise<boolean>;
export type DefineSearchProps = {
    dynamicOptions?: dynamicOptionStruct[];
    gridSizes?: gridSizesStruct;
    hash: string;
    label?: labelOptions;
    name?: string;
    onSearch: onSearchCallback;
    tree: Tree;
};
type DefineSearchState = {
    name: string;
};
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
    static propTypes: {
        dynamicOptions: PropTypes.Requireable<(Required<PropTypes.InferProps<{
            node: PropTypes.Validator<string>;
            trigger: PropTypes.Validator<string>;
            options: PropTypes.Validator<object>;
        }>> | null | undefined)[]>;
        gridSizes: PropTypes.Requireable<{
            [x: string]: Required<PropTypes.InferProps<{
                xs: PropTypes.Requireable<number>;
                sm: PropTypes.Requireable<number>;
                md: PropTypes.Requireable<number>;
                lg: PropTypes.Requireable<number>;
                xl: PropTypes.Requireable<number>;
            }>> | null | undefined;
        }>;
        hash: PropTypes.Validator<string>;
        label: PropTypes.Requireable<string>;
        name: PropTypes.Requireable<string>;
        onSearch: PropTypes.Requireable<(...args: any[]) => any>;
        tree: PropTypes.Validator<Tree>;
    };
    static defaultProps: {
        gridSizes: {
            __default__: {
                xs: number;
                sm: number;
                lg: number;
            };
        };
        label: string;
    };
    props: DefineSearchProps;
    state: DefineSearchState;
    parent: DefineParent;
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
    constructor(props: DefineSearchProps);
    /**
     * Search
     *
     * Passed the new search parameters and triggers the user to search
     *
     * @name search
     * @access private
     * @param values The search parameters encoded as JSON
     */
    _search(values: string | null): void;
    /**
     * Component Did Mount
     *
     * Called when the component is finished being added to the DOM
     *
     * @name componentDidMount
     * @access public
     */
    componentDidMount(): void;
    /**
     * Component Will Unmount
     *
     * Called just before the component is removed from the DOM
     *
     * @name componentWillUnmount
     * @access public
     */
    componentWillUnmount(): void;
    /**
     * Clear
     *
     * Resets all the elements in the component
     *
     * @name clear
     * @access public
     */
    clear(): void;
    /**
     * Error
     *
     * Called to pass along error messages
     *
     * @name error
     * @access public
     * @param error The error(s) associated with the search
     */
    error(error: string[][]): void;
    /**
     * Query
     *
     * Called to set the hash value and trigger a new search
     *
     * @name query
     * @access public
     */
    query(): void;
    /**
     * Render
     *
     * Generates the actual DOM elements of the component
     *
     * @name render
     * @access public
     */
    render(): React.JSX.Element;
    /**
     * Reset
     *
     * Calls reset on the Parent
     *
     * @name reset
     * @access public
     */
    reset(): void;
}
export {};
