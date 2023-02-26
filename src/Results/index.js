/**
 * Results
 *
 * Handles generating results
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-18
 */
// Ouroboros modules
import { Decimal, Tree } from '@ouroboros/define';
import Subscribe from '@ouroboros/subscribe';
import { clone, ucfirst } from '@ouroboros/tools';
// NPM modules
import { createObjectCsvStringifier } from 'csv-writer-browser';
import PropTypes from 'prop-types';
import React from 'react';
// Material UI
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
// Components
import PaginationActions from './PaginationActions';
import Row from './Row';
import TotalsRow from './TotalsRow';
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
    // Prop Types
    static propTypes = {
        actions: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
        custom: PropTypes.object,
        data: PropTypes.array.isRequired,
        errors: PropTypes.object,
        fields: PropTypes.array,
        gridSizes: PropTypes.objectOf(PropTypes.exact({
            xs: PropTypes.number,
            sm: PropTypes.number,
            md: PropTypes.number,
            lg: PropTypes.number,
            xl: PropTypes.number
        })),
        gridSpacing: PropTypes.number,
        menu: PropTypes.array,
        onDelete: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
        onKeyCopy: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
        onUpdate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
        order: PropTypes.string,
        orderBy: PropTypes.string.isRequired,
        totals: PropTypes.bool,
        tree: PropTypes.instanceOf(Tree).isRequired
    };
    static defaultProps = {
        actions: [],
        custom: {},
        errors: {},
        fields: [],
        gridSizes: { __default__: { xs: 12, sm: 6, lg: 3 } },
        gridSpacing: 2,
        menu: [],
        onDelete: false,
        onKeyCopy: false,
        onUpdate: false,
        order: 'asc',
        totals: false
    };
    // Holds the default key copy function
    static defaultOnCopyKey = false;
    // State type
    state;
    // Instance variables
    fields;
    info;
    titles;
    dynCallbacks;
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
    static setOnCopyKey(callback) {
        Results.defaultOnCopyKey = callback;
    }
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name Results
     * @param props Properties passed to the component
     * @returns a new instance
     */
    constructor(props) {
        // Call parent
        super(props);
        // Get the display options
        const oUI = props.tree.special('ui') || {};
        // If there's no primary, assume '_id'
        if (!('primary' in oUI)) {
            oUI.primary = '_id';
        }
        // If there's no copyPrimary field, assume true
        if (!('copyPrimary' in oUI)) {
            oUI.copyPrimary = true;
        }
        // Set fields from either props, the react section, or from all nodes
        //	in the tree
        if (props.fields.length !== 0) {
            this.fields = props.fields;
        }
        else if ('results' in oUI) {
            this.fields = oUI.results;
        }
        else if ('order' in oUI) {
            this.fields = oUI.order;
        }
        else {
            this.fields = this.props.tree.keys();
        }
        // Generate the list of titles, types, and options
        this.titles = [];
        const oTypes = {};
        const oOptions = {};
        this.dynCallbacks = {};
        for (const k of this.fields) {
            // Get the react section
            const oNode = props.tree.get(k).special('ui') || {};
            // Set the title
            this.titles.push({
                key: k,
                text: ('title' in oNode) ? oNode.title : ucfirst(k.replace(/_/g, ' '))
            });
            // Set the type
            //	If we have a specifically passed type
            if (oNode.type) {
                oTypes[k] = oNode.type;
            }
            //	If it's a node
            else if (props.tree.get(k).class() === 'Node') {
                oTypes[k] = props.tree.get(k).type();
            }
            // Else, invalid type
            else {
                oTypes[k] = null;
            }
            // If there's options
            if (oNode.options) {
                // If the options are a dynamic Subscribe
                if (oNode.options instanceof Subscribe) {
                    oOptions[k] = true;
                    this.dynCallbacks[k] = {
                        optionsInstance: oNode.options,
                        callback: this._optionCallback.bind(this, k)
                    };
                }
                else {
                    oOptions[k] = oNode.options.reduce((o, l) => Object.assign(o, { [l[0]]: l[1] }), {});
                }
            }
        }
        // Store rest info
        this.info = {
            copyPrimary: oUI.copyPrimary,
            primary: oUI.primary,
            tree: props.tree,
            types: oTypes
        };
        // Initial state
        const rowsPerPage = localStorage.getItem('rowsPerPage');
        this.state = {
            data: props.data,
            options: oOptions,
            order: props.order,
            orderBy: props.orderBy,
            page: 0,
            rowsPerPage: rowsPerPage ? parseInt(rowsPerPage, 10) : 10,
            totals: props.totals ? this._calculateTotals(oTypes, props.data) : {}
        };
        // Bind methods
        this._exportCsv = this._exportCsv.bind(this);
        this._orderChange = this._orderChange.bind(this);
        this._pageChange = this._pageChange.bind(this);
        this._perPageChange = this._perPageChange.bind(this);
    }
    /**
     * Component Did Mount
     *
     * Called right after the component is added to the DOM
     *
     * @name componentDidMount
     * @access public
     */
    componentDidMount() {
        const oOptions = clone(this.state.options);
        for (const f of Object.keys(this.dynCallbacks)) {
            const oSubscribe = this.dynCallbacks[f].optionsInstance.subscribe(this.dynCallbacks[f].callback);
            oOptions[f] = oSubscribe.data.reduce((o, l) => Object.assign(o, { [l[0]]: l[1] }), {});
        }
        this.setState({ options: oOptions });
    }
    /**
     * Component Will Unmount
     *
     * Called right before the component is remove from the DOM
     *
     * @name componentWillUnmount
     * @access public
     */
    componentWillUnmount() {
        for (const f of Object.keys(this.dynCallbacks)) {
            this.dynCallbacks[f].optionsInstance.subscribeUnsubscribe(this.dynCallbacks[f].callback);
            delete this.dynCallbacks[f];
        }
    }
    /**
     * Component Did Update
     *
     * Called when the props to the component are changed
     *
     * @name componentDidUpdate
     * @access public
     * @param prevProps The previous properties set on the component
     */
    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            const oState = { data: this.props.data };
            if (this.props.totals) {
                oState.totals = this._calculateTotals(this.info.types, this.props.data);
            }
            this.setState(oState);
        }
    }
    /**
     * Calculate Totals
     *
     * Adds up the totals or calculates averages based on all records
     *
     * @param types The types of each field
     * @param data The array of data
     * @returns an object of totals per field
     */
    _calculateTotals(types, data) {
        // Init the totals, types, and count
        const oTotals = {};
        const oTypes = {};
        // If we have data
        if (data.length > 0) {
            // Go through each visible field
            for (const f of this.fields) {
                // If there's a type
                if (types[f]) {
                    // If the field is numeric
                    if (['int', 'uint', 'float', 'time_elapsed', 'time_average'].includes(types[f])) {
                        oTotals[f] = 0;
                        oTypes[f] = 'numeric';
                    }
                    else if (types[f] === 'decimal') {
                        oTotals[f] = new Decimal('0.0');
                        oTypes[f] = 'decimal';
                    }
                    else if (types[f] === 'price') {
                        oTotals[f] = new Decimal('0.00');
                        oTypes[f] = 'decimal';
                    }
                }
            }
            // Go through all the data
            for (const d of data) {
                // Go through each allowed type
                for (const f of Object.keys(oTypes)) {
                    // If the type is numeric
                    if (oTypes[f] === 'numeric') {
                        oTotals[f] += d[f] || 0;
                    }
                    // Else if it's decimal
                    else if (oTypes[f] === 'decimal') {
                        oTotals[f] = oTotals[f].plus(d[f] || 0);
                    }
                }
            }
            // Go through the fields again to adjust based on some types
            for (const f of this.fields) {
                // If we have an average time
                if (types[f] === 'time_average') {
                    oTotals[f] = ~~(oTotals[f] / data.length);
                }
            }
        }
        // Return the new totals
        return oTotals;
    }
    /**
     * Export CSV
     *
     * Called to generate and add the CSV file to the page
     *
     * @name _exportCsv
     * @access private
     */
    _exportCsv() {
        // If there's no data, do nothing
        if (this.state.data.length === 0) {
            throw new Error('No data to export to CSV');
        }
        // Generate the header
        const lHeader = [];
        for (const k of Object.keys(this.state.data[0])) {
            lHeader.push({ "id": k, "title": k });
        }
        // Create the CSV write instance
        const csvStringifier = createObjectCsvStringifier({
            "header": lHeader
        });
        // Generate the "file"
        const csv = 'data:text/csv;charset=utf-8,' + encodeURI(csvStringifier.getHeaderString() +
            csvStringifier.stringifyRecords(this.state.data));
        // Generate a date to append to the filename
        const date = new Date();
        // Export by generating and clicking a fake link
        const link = document.createElement('a');
        link.setAttribute('href', csv);
        link.setAttribute('download', this.props.tree._name + '_' + date.toISOString() + '.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
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
    _optionCallback(field, options) {
        const oOptions = clone(this.state.options);
        oOptions[field] = options.reduce((o, l) => Object.assign(o, { [l[0]]: l[1] }), {});
        this.setState({ options: oOptions });
    }
    /**
     * Order Change
     *
     * Called when the order of a field changes
     *
     * @name _orderChange
     * @access private
     * @param event The event triggered by the click
     */
    _orderChange(event) {
        // Save the new orderBy
        const orderBy = event.currentTarget.dataset.key;
        let order;
        // If it hasn't actually changed, switch it, else use the order we have
        if (orderBy === this.state.orderBy) {
            order = this.state.order === 'asc' ? 'desc' : 'asc';
        }
        else {
            order = this.state.order;
        }
        // Save the new state
        this.setState({
            data: this._sortData(clone(this.state.data), order, orderBy),
            order,
            orderBy
        });
    }
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
    _pageChange(event, page) {
        this.setState({ page });
    }
    /**
     * Per Page Change
     *
     * Called when the number of records by page is changed
     *
     * @name _perPageChange
     * @access private
     * @param event The event triggered by the option change
     */
    _perPageChange(event) {
        localStorage.setItem('rowsPerPage', event.target.value);
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0
        });
    }
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
     * @returns The sorted data
     */
    _sortData(data, order, orderBy) {
        // Sort it based on the order and orderBy
        data.sort((a, b) => {
            // If the values are the same
            if (a[orderBy] === b[orderBy]) {
                return 0;
            }
            else {
                if (a[orderBy] > b[orderBy]) {
                    return order === 'asc' ? 1 : -1;
                }
                else {
                    return order === 'asc' ? -1 : 1;
                }
            }
        });
        // Return the sorted data
        return data;
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
        return (React.createElement(TableContainer, { className: "results" },
            React.createElement(Table, { stickyHeader: true, "aria-label": "sticky table" },
                React.createElement(TableHead, null,
                    React.createElement(TableRow, null,
                        this.titles.map(title => (React.createElement(TableCell, { key: title.key, sortDirection: this.state.orderBy === title.key ? this.state.order : false, className: 'field_' + title.key },
                            React.createElement(TableSortLabel, { active: this.state.orderBy === title.key, direction: this.state.orderBy === title.key ? this.state.order : 'asc', "data-key": title.key, onClick: this._orderChange }, title.text)))),
                        this.props.actions &&
                            React.createElement(TableCell, { align: "right", className: "actions" },
                                React.createElement(Tooltip, { title: "Export CSV" },
                                    React.createElement(IconButton, { onClick: this._exportCsv },
                                        React.createElement("i", { className: "fa-solid fa-file-csv" })))))),
                React.createElement(TableBody, null, (this.state.rowsPerPage > 0 ?
                    this.state.data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage) : this.state.data).map(row => React.createElement(Row, { actions: this.props.actions, custom: this.props.custom, data: row, errors: this.props.errors, fields: this.fields, gridSizes: this.props.gridSizes, gridSpacing: this.props.gridSpacing, info: this.info, key: row[this.info.primary], menu: this.props.menu, options: this.state.options, onDelete: this.props.onDelete, onKeyCopy: this.props.onKeyCopy || Results.defaultOnCopyKey, onUpdate: this.props.onUpdate }))),
                React.createElement(TableFooter, null,
                    this.props.totals &&
                        React.createElement(TotalsRow, { actions: this.props.actions ? true : false, fields: this.fields, info: this.info, totals: this.state.totals || {} }),
                    React.createElement(TableRow, null,
                        React.createElement(TablePagination, { colSpan: this.titles.length + 1, count: this.state.data.length, onPageChange: this._pageChange, onRowsPerPageChange: this._perPageChange, page: this.state.page, rowsPerPage: this.state.rowsPerPage, rowsPerPageOptions: [10, 20, 50, { label: 'All', value: -1 }], ActionsComponent: PaginationActions, SelectProps: {
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            } }))))));
    }
}
