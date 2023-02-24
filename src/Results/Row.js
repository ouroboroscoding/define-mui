/**
 * Results Row
 *
 * Handles a single row of results
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-18
 */
// Ouroboros modules
import { clipboard } from '@ouroboros/browser';
import { iso } from '@ouroboros/dates';
import { clone, omap } from '@ouroboros/tools';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// Material UI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
// Components
import Form from '../Form';
/**
 * Results Row
 *
 * Displays a single row of results
 *
 * @name Row
 * @access private
 * @param Object props Properties passed to the component
 * @return React.Component
 */
export default function ResultsRow(props) {
    // State
    const [actions, actionsSet] = useState({});
    const [menu, menuSet] = useState(false);
    const [remove, removeSet] = useState(false);
    const [update, updateSet] = useState(false);
    // Refs
    const refUpdateForm = useRef(null);
    /**
     * Action
     *
     * Called when any of the custom action icons is clicked
     *
     * @name action
     * @access private
     * @param index The index of the action clicked
     */
    function action(index) {
        // If we don't have actions
        if (props.actions.length === 0) {
            return;
        }
        // Get the real index
        const iIndex = parseInt(index, 10);
        // If we have a callback
        if (props.actions[iIndex].callback !== undefined) {
            // Call it with the current data for the row
            props.actions[iIndex].callback(props.data);
        }
        // Else, if we have a component
        else if (props.actions[iIndex].component) {
            // Clone the current actions
            const oActions = clone(actions);
            // Remove or add it to the actions
            if (actions[index] !== false) {
                delete oActions[index];
            }
            else {
                oActions[index] = props.actions[iIndex].props || true;
            }
            // Set the new actions
            actionsSet(oActions);
        }
    }
    /**
     * Copy Key
     *
     * Called to copy the primary key into the clipboard
     *
     * @name copyKey
     * @access private
     */
    function copyKey() {
        // Copy the primary key to the clipboard then notify the user
        clipboard.copy(props.data[props.info.primary]).then(b => {
            if (props.onKeyCopy) {
                props.onKeyCopy(props.data[props.info.primary]);
            }
        });
    }
    /**
     * Submit
     *
     * Called when the Form's submit button is clicked and there's new data
     * to update
     *
     * @param value The new values to update
     */
    function submit(value, key) {
        // Create a new promise and return it
        return new Promise((resolve, reject) => {
            props.onUpdate(value, key).then((result) => {
                if (result) {
                    updateSet(false);
                }
                resolve(result);
            }, reject);
        });
    }
    // Generate each cell based on type
    const lCells = [];
    for (let i = 0; i < props.fields.length; ++i) {
        // Store field and value
        const sField = props.fields[i];
        const mValue = props.data[sField];
        // Init cell contents
        let mContent = null;
        // If we have a primary key and we can copy it
        if (props.info.copyPrimary && sField === props.info.primary) {
            mContent = (React.createElement(Tooltip, { title: "Copy Record Key" },
                React.createElement(IconButton, { onClick: copyKey },
                    React.createElement("i", { className: "fa-solid fa-key" }))));
        }
        else {
            // If we have a custom processor for the field
            if (sField in props.custom) {
                mContent = props.custom[sField](props.data);
            }
            else {
                // If the value is not undefined or null
                if (mValue !== undefined && mValue !== null) {
                    // If we have a value and we have options
                    if (props.options[sField]) {
                        if (props.options[sField] === true) {
                            mContent = 'Loading...';
                        }
                        else {
                            // If it's a multi-select comma seperated value
                            if (props.info.types[sField] === 'multiselectcsv') {
                                mContent = mValue.split(',').map((s) => {
                                    return props.options[sField][s.trim()];
                                }).join(', ');
                            }
                            // Else, if the value is an array
                            else if (Array.isArray(mValue)) {
                                mContent = mValue.map(m => props.options[sField][m]).join(', ');
                            }
                            // Else, assume one option for the value
                            else {
                                mContent = props.options[sField][mValue];
                            }
                        }
                    }
                    // Else if the type is a bool
                    else if (props.info.types[sField] === 'bool') {
                        mContent = mValue === 1 ? 'True' : 'False';
                    }
                    // Else, if the type is a price
                    else if (props.info.types[sField] === 'price') {
                        mContent = `$${mValue}`;
                    }
                    // Else if the type is a timestamp
                    else if (props.info.types[sField] === 'timestamp') {
                        mContent = iso(mValue);
                    }
                    // If we have a string with newlines
                    else if (typeof mValue === 'string' && mValue.includes('\n')) {
                        mContent = mValue.split('\n').map((s, j) => React.createElement("p", { key: j }, s));
                    }
                    // Else, set it as is
                    else {
                        mContent = String(mValue);
                    }
                }
                else {
                    mContent = '';
                }
            }
        }
        lCells.push(React.createElement(TableCell, { key: i, className: 'field_' + props.fields[i] }, mContent));
    }
    // If we have actions
    if (props.actions) {
        // Generate the actions cell
        lCells.push(React.createElement(TableCell, { key: -1, className: "actions", align: "right" },
            props.actions.map((a, i) => {
                if (a.dynamic && typeof a.dynamic === 'function') {
                    a = Object.assign(a, a.dynamic(props.data));
                }
                // If there's a url
                if (a.url) {
                    return (React.createElement(Link, { key: i, to: a.url },
                        React.createElement(Tooltip, { key: i, title: a.tooltip },
                            React.createElement(IconButton, { "data-index": i, className: "icon" },
                                React.createElement("i", { className: a.icon + ' ' + (actions[i.toString()] ? 'open' : 'closed') })))));
                }
                // Else, there should be a callback or component
                else {
                    return (React.createElement(Tooltip, { key: i, title: a.tooltip },
                        React.createElement(IconButton, { "data-index": i, className: "icon", onClick: ev => action(ev.currentTarget.dataset.index) },
                            React.createElement("i", { className: a.icon + ' ' + (actions[i.toString()] ? 'open' : 'closed') }))));
                }
            }),
            props.onUpdate &&
                React.createElement(Tooltip, { title: "Edit the record" },
                    React.createElement(IconButton, { className: "icon", onClick: ev => updateSet(b => !b) },
                        React.createElement("i", { className: 'fa-solid fa-edit ' + (update ? 'open' : 'closed') }))),
            props.onDelete &&
                React.createElement(Tooltip, { title: "Delete the record" },
                    React.createElement(IconButton, { className: "icon", onClick: () => removeSet(true) },
                        React.createElement("i", { className: "fa-solid fa-trash-alt" }))),
            props.menu.length > 0 &&
                React.createElement(Tooltip, { title: "More" },
                    React.createElement(IconButton, { className: "icon", onClick: ev => menuSet(b => b ? false : ev.currentTarget) },
                        React.createElement("i", { className: "fa-solid fa-ellipsis-vertical" }))),
            menu !== false &&
                React.createElement(Menu, { anchorEl: menu, open: true, onClose: ev => menuSet(false) }, props.menu.map((o, i) => React.createElement(MenuItem, { key: i, onClick: ev => {
                        menuSet(false);
                        o.callback(props.data);
                    } },
                    o.icon &&
                        React.createElement(ListItemIcon, null,
                            React.createElement("i", { className: o.icon })),
                    o.title))),
            remove &&
                React.createElement(Dialog, { onClose: () => removeSet(false), open: true },
                    React.createElement(DialogTitle, null, "Confirm Delete"),
                    React.createElement(DialogContent, null,
                        React.createElement(Typography, null, "Please confirm you wish to delete this record.")),
                    React.createElement(DialogActions, null,
                        React.createElement(Button, { color: "secondary", onClick: () => removeSet(false), variant: "contained" }, "Cancel"),
                        React.createElement(Button, { color: "primary", onClick: () => { removeSet(false); props.onDelete(props.data[props.info.primary]); }, variant: "contained" }, "Delete")))));
    }
    // Render
    return (React.createElement(React.Fragment, null,
        React.createElement(TableRow, null, lCells),
        update &&
            React.createElement(TableRow, null,
                React.createElement(TableCell, { colSpan: props.fields.length + 1 },
                    React.createElement(Form, { gridSizes: props.gridSizes, gridSpacing: props.gridSpacing, onCancel: () => updateSet(false), onSubmit: props.onUpdate, ref: refUpdateForm, tree: props.info.tree, type: "update", value: props.data }))),
        omap(actions, (b, i) => React.createElement(TableRow, { key: i, className: "action_row" },
            React.createElement(TableCell, { colSpan: props.fields.length + 1 }, b === true ? React.createElement(props.actions[parseInt(i, 10)].component, {
                onClose: () => action(i),
                value: props.data
            }) : React.createElement(props.actions[parseInt(i, 10)].component, {
                onClose: () => action(i),
                value: props.data,
                ...b
            }))))));
}
// Valid props
ResultsRow.propTypes = {
    actions: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]).isRequired,
    custom: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    gridSizes: PropTypes.objectOf(PropTypes.exact({
        xs: PropTypes.number,
        sm: PropTypes.number,
        md: PropTypes.number,
        lg: PropTypes.number,
        xl: PropTypes.number
    })),
    gridSpacing: PropTypes.number,
    info: PropTypes.object.isRequired,
    menu: PropTypes.array.isRequired,
    onDelete: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
    onUpdate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
    options: PropTypes.object.isRequired
};
