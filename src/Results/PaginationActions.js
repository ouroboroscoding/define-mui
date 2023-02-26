/**
 * Results Pagination Actions
 *
 * Handles pagination on Results footer
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-18
 */
// NPM modules
import React from 'react';
// Material UI
import IconButton from '@mui/material/IconButton';
/**
 * Pagination Actions
 *
 * Handles adding the buttons and drop downs for pagination
 *
 * @name PaginationActions
 * @access private
 * @param Object props Properties passed to the component
 * @return React.Component
 */
export default function PaginationActions(props) {
    // Go to first page
    function first(event) {
        props.onPageChange(event, 0);
    }
    // Go to last page
    function last(event) {
        props.onPageChange(event, Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1));
    }
    // Go to next page
    function next(event) {
        props.onPageChange(event, props.page + 1);
    }
    // Go to previous page
    function prev(event) {
        props.onPageChange(event, props.page - 1);
    }
    // Render
    return (React.createElement("div", { style: { flexShrink: 0 } },
        React.createElement(IconButton, { onClick: first, disabled: props.page === 0, "aria-label": "First Page" },
            React.createElement("i", { className: "fa-solid fa-angle-double-left" })),
        React.createElement(IconButton, { onClick: prev, disabled: props.page === 0, "aria-label": "Previous Page" },
            React.createElement("i", { className: "fa-solid fa-angle-left" })),
        React.createElement(IconButton, { onClick: next, disabled: props.page >= Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1), "aria-label": "Next Page" },
            React.createElement("i", { className: "fa-solid fa-angle-right" })),
        React.createElement(IconButton, { onClick: last, disabled: props.page >= Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1), "aria-label": "Last Page" },
            React.createElement("i", { className: "fa-solid fa-angle-double-right" }))));
}
