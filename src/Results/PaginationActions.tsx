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

// Types
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';

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
export default function PaginationActions(props: TablePaginationActionsProps) {

	// Go to first page
	function first(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		props.onPageChange(event, 0);
	}

	// Go to last page
	function last(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		props.onPageChange(event, Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1));
	}

	// Go to next page
	function next(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		props.onPageChange(event, props.page + 1);
	}

	// Go to previous page
	function prev(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		props.onPageChange(event, props.page - 1);
	}

	// Render
	return (
		<div style={{flexShrink: 0}}>
			<IconButton
				onClick={first}
				disabled={props.page === 0}
				aria-label="First Page"
			>
				<i className="fa-solid fa-angle-double-left" />
			</IconButton>
			<IconButton
				onClick={prev}
				disabled={props.page === 0}
				aria-label="Previous Page"
			>
				<i className="fa-solid fa-angle-left" />
			</IconButton>
			<IconButton
				onClick={next}
				disabled={props.page >= Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1)}
				aria-label="Next Page"
			>
				<i className="fa-solid fa-angle-right" />
			</IconButton>
			<IconButton
				onClick={last}
				disabled={props.page >= Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1)}
				aria-label="Last Page"
			>
				<i className="fa-solid fa-angle-double-right" />
			</IconButton>
		</div>
	);
}