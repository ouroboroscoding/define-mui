/**
 * Results
 *
 * Handles generating results
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-18
 */
import { Tree } from '@ouroboros/define';
import Subscribe, { SubscribeCallback } from '@ouroboros/subscribe';
import PropTypes from 'prop-types';
import React from 'react';
import type { onSubmitCallback } from '../Form';
import type { displayStruct } from '../types';
import type { dynamicOptionStruct, gridSizesStruct, onNodeChangeCallback } from '../DefineParent';
import type { actionStruct, customCallback, onDeleteCallback, onKeyCopyCallback, menuStruct } from './Row';
export type { actionStruct, onDeleteCallback, onKeyCopyCallback, menuStruct };
export type dynCallbacksStruct = {
    optionsInstance: Subscribe;
    callback: SubscribeCallback;
};
export type infoStruct = {
    copyPrimary: boolean;
    primary: string;
    tree: Tree;
    types: Record<string, string | null>;
};
export type optionsType = Record<string, true | Record<string, string>>;
export type titleStruct = {
    key: string;
    text: string;
};
export type ResultsProps = {
    actions: actionStruct[] | false;
    custom: Record<string, customCallback>;
    data: Record<string, any>[];
    disableCSV?: boolean;
    display?: displayStruct;
    dynamicOptions?: dynamicOptionStruct[];
    fields: string[];
    gridSizes: gridSizesStruct;
    gridSpacing: number;
    menu: menuStruct[];
    onDelete: onDeleteCallback | false;
    onKeyCopy: onKeyCopyCallback | false;
    onNodeChange?: Record<string, onNodeChangeCallback>;
    onUpdate: onSubmitCallback | false;
    order: 'asc' | 'desc';
    orderBy: string;
    totals: boolean;
    tree: Tree;
};
type ResultsState = {
    data: Record<string, any>[];
    options: optionsType;
    order: 'asc' | 'desc';
    orderBy: string;
    page: number;
    rowsPerPage: number;
    totals: Record<string, any>;
};
/**
 * Results
 *
 * Handles displaying the table and pagination
 *
 * @name Results
 * @access public
 * @param Object props Properties passed to the component
 * @return React.Component
 */
export default class Results extends React.PureComponent {
    static propTypes: {
        actions: PropTypes.Requireable<NonNullable<boolean | any[] | null | undefined>>;
        custom: PropTypes.Requireable<object>;
        data: PropTypes.Validator<any[]>;
        disableCSV: PropTypes.Requireable<boolean>;
        display: PropTypes.Requireable<object>;
        dynamicOptions: PropTypes.Requireable<(Required<PropTypes.InferProps<{
            node: PropTypes.Validator<string>;
            trigger: PropTypes.Validator<string>;
            options: PropTypes.Validator<object>;
        }>> | null | undefined)[]>;
        fields: PropTypes.Requireable<any[]>;
        gridSizes: PropTypes.Requireable<{
            [x: string]: Required<PropTypes.InferProps<{
                xs: PropTypes.Requireable<number>;
                sm: PropTypes.Requireable<number>;
                md: PropTypes.Requireable<number>;
                lg: PropTypes.Requireable<number>;
                xl: PropTypes.Requireable<number>;
            }>> | null | undefined;
        }>;
        gridSpacing: PropTypes.Requireable<number>;
        menu: PropTypes.Requireable<any[]>;
        onDelete: PropTypes.Requireable<NonNullable<boolean | ((...args: any[]) => any) | null | undefined>>;
        onKeyCopy: PropTypes.Requireable<NonNullable<boolean | ((...args: any[]) => any) | null | undefined>>;
        onNodeChange: PropTypes.Requireable<{
            [x: string]: ((...args: any[]) => any) | null | undefined;
        }>;
        onUpdate: PropTypes.Requireable<NonNullable<boolean | ((...args: any[]) => any) | null | undefined>>;
        order: PropTypes.Requireable<string>;
        orderBy: PropTypes.Validator<string>;
        totals: PropTypes.Requireable<boolean>;
        tree: PropTypes.Validator<Tree>;
    };
    static defaultProps: {
        actions: never[];
        custom: {};
        disableCSV: boolean;
        fields: never[];
        gridSizes: {
            __default__: {
                xs: number;
                sm: number;
                lg: number;
            };
        };
        gridSpacing: number;
        menu: never[];
        onDelete: boolean;
        onKeyCopy: boolean;
        onUpdate: boolean;
        order: string;
        totals: boolean;
    };
    private static defaultOnCopyKey;
    props: ResultsProps;
    state: ResultsState;
    fields: string[];
    info: infoStruct;
    titles: titleStruct[];
    dynCallbacks: Record<string, dynCallbacksStruct>;
    /**
     * Set On Copy Key
     *
     * Used to set a default callback for all onCopyKey calls
     *
     * @name setOnCopyKey
     * @static
     * @access public
     * @param callback The callback to run if none is specifically set on the
     */
    static setOnCopyKey(callback: onKeyCopyCallback): void;
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name Results
     * @param props Properties passed to the component
     * @return a new instance
     */
    constructor(props: ResultsProps);
    /**
     * Component Did Mount
     *
     * Called right after the component is added to the DOM
     *
     * @name componentDidMount
     * @access public
     */
    componentDidMount(): void;
    /**
     * Component Will Unmount
     *
     * Called right before the component is remove from the DOM
     *
     * @name componentWillUnmount
     * @access public
     */
    componentWillUnmount(): void;
    /**
     * Component Did Update
     *
     * Called when the props to the component are changed
     *
     * @name componentDidUpdate
     * @access public
     * @param prevProps The previous properties set on the component
     */
    componentDidUpdate(prevProps: ResultsProps): void;
    /**
     * Calculate Totals
     *
     * Adds up the totals or calculates averages based on all records
     *
     * @param types The types of each field
     * @param data The array of data
     * @return an object of totals per field
     */
    _calculateTotals(types: Record<string, string | null>, data: Record<string, any>[]): Record<string, any>;
    /**
     * Export CSV
     *
     * Called to generate and add the CSV file to the page
     *
     * @name _exportCsv
     * @access private
     */
    _exportCsv(): void;
    /**
     * Option Callback
     *
     * Called when any of the dynamic options change
     *
     * @name _optionCallback
     * @access private
     * @param field The field whose options are being changed
     * @param options The new options
     */
    _optionCallback(field: string, options: string[][]): void;
    /**
     * Order Change
     *
     * Called when the order of a field changes
     *
     * @name _orderChange
     * @access private
     * @param event The event triggered by the click
     */
    _orderChange(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Page Change
     *
     * Called when the page is changed
     *
     * @name _pageChange
     * @access private
     * @param event The event triggered by the change
     * @param page The new page number
     */
    _pageChange(event: any, page: number): void;
    /**
     * Per Page Change
     *
     * Called when the number of records by page is changed
     *
     * @name _perPageChange
     * @access private
     * @param event The event triggered by the option change
     */
    _perPageChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
    /**
     * Sort Data
     *
     * Sorts the passed data by field and order
     *
     * @name sortData
     * @access private
     * @param data The data to sort
     * @param order The order to sort by
     * @param orderBy The field to sort by
     * @return The sorted data
     */
    _sortData(data: Record<string, any>[], order: 'asc' | 'desc', orderBy: string): Record<string, any>[];
    /**
     * Render
     *
     * Generates the actual DOM elements of the component
     *
     * @name render
     * @access public
     */
    render(): React.JSX.Element;
}
