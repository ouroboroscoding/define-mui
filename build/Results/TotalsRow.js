/**
 * Results Totals Row
 *
 * Handles generating the row of totals
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-19
 */
// Ouroboros modules
import { elapsed } from '@ouroboros/dates';
// NPM modules
import PropTypes from 'prop-types';
import React from 'react';
// Material UI
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
/**
 * Totals Row
 *
 * Displays a row of totals based on the results
 *
 * @name TotalsRow
 * @access private
 * @param Object props Properties passed to the component
 * @return React.Component
 */
export default function TotalsRow(props) {
    // Go through all the totals and generate the new values
    const oCells = {};
    for (const f of props.fields) {
        // If it's elapsed time
        if (props.info.types[f] && ['time_elapsed', 'time_average'].includes(props.info.types[f])) {
            oCells[f] = elapsed(props.totals[f]);
        }
        // Else the value stays as is
        else {
            oCells[f] = props.totals[f] || '';
        }
    }
    // Render
    return (React.createElement(TableRow, null,
        props.fields.map((f, i) => React.createElement(TableCell, { key: i, className: 'total field_' + f }, oCells[f])),
        props.actions &&
            React.createElement(TableCell, { key: -1, className: "total actions", align: "right" }, "\u00A0")));
}
// Valid props
TotalsRow.propTypes = {
    actions: PropTypes.bool.isRequired,
    fields: PropTypes.array.isRequired,
    info: PropTypes.object.isRequired,
    totals: PropTypes.object.isRequired
};
