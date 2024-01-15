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
import clone from '@ouroboros/clone';
import { iso } from '@ouroboros/dates';
import { omap } from '@ouroboros/tools';

// NPM modules
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Link, LinkProps } from 'react-router-dom';

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

// Types
import type { dynamicOptionStruct, gridSizesStruct, onNodeChangeCallback } from '../DefineParent';
import type { onSubmitCallback } from '../Form';
export type actionCallback = (data: Record<string, any>) => void;
export type actionDynamicCallback = (data: Record<string, any>) => Record<string, any>;
export type actionStruct = {
	callback?: actionCallback,
	component?: componentConstructor,
	dynamic?: actionDynamicCallback,
	icon?: string,
	props?: Record<string, any>,
	tooltip?: string,
	url?: string,
	url_pop?: boolean
};
export type menuStruct = {
	callback: actionCallback,
	icon: string,
	title: string
};
export type componentConstructor = string | React.FunctionComponent<{ onClose: () => void; value: Record<string, any>; }> | React.ComponentClass<{ onClose: () => void; value: Record<string, any>; }, any>
export type customCallback = (row: Record<string, any>) => string;
export type onDeleteCallback = (key: any) => void;
export type onKeyCopyCallback = (key: any) => void;
export type ResultsRowProps = {
	actions: actionStruct[] | false,
	custom: Record<string, customCallback>,
	data: Record<string, any>,
	display?: Record<string, any>,
	dynamicOptions?: dynamicOptionStruct[],
	errors?: Record<string, any>,
	fields: string[],
	gridSizes?: gridSizesStruct,
	gridSpacing?: number,
	info: Record<string, any>,
	menu: menuStruct[],
	onDelete: onDeleteCallback | false,
	onKeyCopy: onKeyCopyCallback | false,
	onNodeChange?: Record<string, onNodeChangeCallback>,
	onUpdate: onSubmitCallback | false,
	options: Record<string, any>
};

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
export default function ResultsRow(props: ResultsRowProps) {

	// State
	const [actions, actionsSet] = useState<Record<string, any>>({});
	const [menu, menuSet] = useState<false | (EventTarget & HTMLButtonElement)>(false);
	const [remove, removeSet] = useState(false);
	const [update, updateSet] = useState(false);

	// Refs
	const refUpdateForm = useRef<Form>(null);

	/**
	 * Action
	 *
	 * Called when any of the custom action icons is clicked
	 *
	 * @name action
	 * @access private
	 * @param index The index of the action clicked
	 */
	function action(index: string): void {

		// If we don't have actions
		if(props.actions === false || props.actions.length === 0) {
			return;
		}

		// Get the real index
		const iIndex = parseInt(index, 10);

		// If we have a callback
		if(props.actions[iIndex].callback !== undefined) {

			// Call it with the current data for the row
			(props.actions[iIndex].callback as actionCallback)(props.data);
		}

		// Else, if we have a component
		else if(props.actions[iIndex].component) {

			// Clone the current actions
			const oActions: Record<string, any> = clone(actions);

			// Remove or add it to the actions
			if(index in oActions) {
				delete oActions[index];
			} else {
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
			if(props.onKeyCopy) {
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
	 * @name submit
	 * @access private
	 * @param value The new values to update
	 * @param key Optional, the key associated with the record
	 */
	function submit(value: Record<string, any>, key: any): boolean | string[][] | Promise<boolean> {

		// Call the onUpdate prop and store the result
		const mRes = (props.onUpdate as onSubmitCallback)(value, key);

		// If we got a promise
		if(mRes instanceof Promise) {

			// Create a new promise and return it
			return new Promise((resolve, reject) => {
				mRes.then((result: boolean) => {
					if(result) {
						updateSet(false);
					}
					resolve(result);
				}, reject);
			});
		}

		// Else
		else {

			// If we got true
			if(mRes === true) {

				// Hide the form
				updateSet(false);
			}

			// Return the result to the Form
			return mRes;
		}
	}

	// RENDER

	// Generate each cell based on type
	const lCells = [];
	for(let i = 0; i < props.fields.length; ++i) {

		// Store field and value
		const sField = props.fields[i];
		const mValue = props.data[sField];

		// Init cell contents
		let mContent = null;

		// If we have a primary key and we can copy it
		if(props.info.copyPrimary && sField === props.info.primary) {
			mContent = (
				<Tooltip title="Copy Record Key">
					<IconButton onClick={copyKey}>
						<i className="fa-solid fa-key" />
					</IconButton>
				</Tooltip>
			);
		} else {

			// If we have a custom processor for the field
			if(sField in props.custom) {
				mContent = props.custom[sField](props.data);
			} else {

				// If the value is not undefined or null
				if(mValue !== undefined && mValue !== null) {

					// If we have a value and we have options
					if(props.options[sField]) {
						if(props.options[sField] === true) {
							mContent = 'Loading...';
						} else {

							// If it's a multi-select comma seperated value
							if(props.info.types[sField] === 'multiselectcsv') {
								mContent = mValue.split(',').map((s: string) => {
									return props.options[sField][s.trim()];
								}).join(', ');
							}

							// Else, if the value is an array
							else if(Array.isArray(mValue)) {
								mContent = mValue.map(m => props.options[sField][m]).join(', ');
							}

							// Else, assume one option for the value
							else {
								mContent = props.options[sField][mValue];
							}
						}
					}

					// Else if the type is a bool
					else if(props.info.types[sField] === 'bool') {
						mContent = mValue ? 'True' : 'False';
					}

					// Else, if the type is a price
					else if(props.info.types[sField] === 'price') {
						mContent = `$${mValue}`;
					}

					// Else if the type is a timestamp
					else if(props.info.types[sField] === 'timestamp') {
						mContent = iso(mValue);
					}

					// If we have a string with newlines
					else if(typeof mValue === 'string' && mValue.includes('\n')) {
						mContent = mValue.split('\n').map((s,j) =>
							<p key={j}>{s}</p>
						);
					}

					// Else, set it as is
					else {
						mContent = String(mValue);
					}
				} else {
					mContent = '';
				}
			}
		}

		lCells.push(
			<TableCell key={i} className={'field_' + props.fields[i]}>
				{mContent}
			</TableCell>
		);
	}

	// If we have actions
	if(props.actions) {

		// Generate the actions cell
		lCells.push(
			<TableCell key={-1} className="actions" align="right">
				{props.actions.map((a, i) => {
					if(a.dynamic && typeof a.dynamic === 'function') {
						a = Object.assign(a, a.dynamic(props.data));
					}

					// If there's a url
					if(a.url) {
						const oProps: LinkProps = { to: a.url };
						if(a.url_pop) {
							oProps.target = '_blank';
						}

						return (
							<Link key={i} {...oProps}>
								<Tooltip key={i} title={a.tooltip}>
									<IconButton data-index={i} className="icon">
										<i className={a.icon + ' ' + (actions[i.toString()] ? 'open' : 'closed')} />
									</IconButton>
								</Tooltip>
							</Link>
						);
					}

					// Else, there should be a callback or component
					else {
						return (
							<Tooltip key={i} title={a.tooltip}>
								<IconButton data-index={i} className="icon" onClick={ev => action((ev.currentTarget.dataset.index as string))}>
									<i className={a.icon + ' ' + (actions[i.toString()] ? 'open' : 'closed')} />
								</IconButton>
							</Tooltip>
						);
					}
				})}
				{props.onUpdate &&
					<Tooltip title="Edit the record">
						<IconButton className="icon" onClick={ev => updateSet(b => !b)}>
							<i className={'fa-solid fa-edit ' + (update ? 'open' : 'closed')} />
						</IconButton>
					</Tooltip>
				}
				{(props.onDelete && props.info.primary && props.data[props.info.primary]) &&
					<Tooltip title="Delete the record">
						<IconButton className="icon" onClick={() => removeSet(true)}>
							<i className="fa-solid fa-trash-alt" />
						</IconButton>
					</Tooltip>
				}
				{props.menu.length > 0 &&
					<Tooltip title="More">
						<IconButton className="icon" onClick={ev => menuSet(b => b ? false : ev.currentTarget)}>
							<i className="fa-solid fa-ellipsis-vertical" />
						</IconButton>
					</Tooltip>
				}
				{menu !== false &&
					<Menu
						anchorEl={menu}
						open={true}
						onClose={ev => menuSet(false)}
					>
						{props.menu.map((o,i) =>
							<MenuItem key={i} onClick={ev => {
								menuSet(false);
								o.callback(props.data);
							}}>
								{o.icon &&
									<ListItemIcon>
										<i className={o.icon} />
									</ListItemIcon>
								}
								{o.title}
							</MenuItem>
						)}
					</Menu>
				}
				{remove &&
					<Dialog
						onClose={() => removeSet(false)}
						open={true}
					>
						<DialogTitle>Confirm Delete</DialogTitle>
						<DialogContent>
							<Typography>Please confirm you wish to delete this record.</Typography>
						</DialogContent>
						<DialogActions>
							<Button color="secondary" onClick={() => removeSet(false)} variant="contained">Cancel</Button>
							<Button color="primary" onClick={() => {removeSet(false); (props.onDelete as onDeleteCallback)(props.data[props.info.primary])}} variant="contained">Delete</Button>
						</DialogActions>
					</Dialog>
				}
			</TableCell>
		);
	}

	// Render
	return (
		<React.Fragment>
			<TableRow>
				{lCells}
			</TableRow>
			{update &&
				<TableRow>
					<TableCell colSpan={props.fields.length + 1}>
						<Form
							display={props.display}
							dynamicOptions={props.dynamicOptions}
							gridSizes={props.gridSizes}
							gridSpacing={props.gridSpacing}
							onCancel={() => updateSet(false)}
							onNodeChange={props.onNodeChange}
							onSubmit={submit}
							ref={refUpdateForm}
							tree={props.info.tree}
							type="update"
							value={props.data}
						/>
					</TableCell>
				</TableRow>
			}
			{omap(actions, (m, i) =>
				<TableRow key={i} className="action_row">
					<TableCell colSpan={props.fields.length + 1}>
						{m === true ? React.createElement(((props.actions as actionStruct[])[parseInt(i, 10)].component as componentConstructor), {
							onClose: () => action(i),
							value: props.data
						}) : React.createElement(((props.actions as actionStruct[])[parseInt(i, 10)].component as componentConstructor), {
							onClose: () => action(i),
							value: props.data,
							...m
						})}
					</TableCell>
				</TableRow>
			)}
		</React.Fragment>
	);
}

// Valid props
ResultsRow.propTypes = {
	actions: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]).isRequired,
	custom: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
	display: PropTypes.object,
	dynamicOptions: PropTypes.arrayOf(PropTypes.exact({
		node: PropTypes.string.isRequired,
		trigger: PropTypes.string.isRequired,
		options: PropTypes.oneOfType(
			[ PropTypes.object, PropTypes.func ]
		).isRequired
	})),
	errors: PropTypes.object.isRequired,
	fields: PropTypes.array.isRequired,
	gridSizes: PropTypes.objectOf(
		PropTypes.exact({
			xs: PropTypes.number,
			sm: PropTypes.number,
			md: PropTypes.number,
			lg: PropTypes.number,
			xl: PropTypes.number
		})
	),
	gridSpacing: PropTypes.number,
	info: PropTypes.object.isRequired,
	menu: PropTypes.array.isRequired,
	onDelete: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
	onNodeChange: PropTypes.objectOf(PropTypes.func),
	onUpdate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
	options: PropTypes.object.isRequired
}
