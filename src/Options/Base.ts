/**
 * Options Base
 *
 * The base class for all Options types
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-15
 */

// Ouroboros modules
import { cloneAddClass } from '@ouroboros/tools';

// Types
export type optionsCallback = (data: string[][]) => void;

/**
 * Options Base
 *
 * The base class for dynamic Options types
 *
 * @name OptionsBase
 * @access public
 */
export default class OptionsBase {

	// List of callbacks tracking changes in the data
	_callbacks: optionsCallback[];

	// The current data
	_data: string[][];

	/**
	 * Constructor
	 *
	 * Initialises the base class
	 *
	 * @name OptionsBase
	 * @access private
	 * @returns a new instance
	 */
	constructor(data: string[][] = []) {

		// Init the list of callbacks
		this._callbacks = [];

		// Store the initial data
		this._data = data;
	}

	/**
	 * Notify
	 *
	 * Sends the data to all callbacks
	 *
	 * @name notify
	 * @access public
	 */
	notify(): void {

		// Go through each callback and notify of the data change
		for(const f of this._callbacks) {
			f(this._data);
		}
	}

	/**
	 * Subscribe
	 *
	 * Stores a callback function to be called whenever the option data needs
	 * to change
	 *
	 * @name subscribe
	 * @access public
	 * @param callback The function to call when data changes
	 * @returns current data
	 */
	subscribe(callback: optionsCallback, remove=false): string[][] {

		// Add it to the list
		this._callbacks.push(callback);

		// Return the current data
		return this._data;
	}

	/**
	 * Unsubscribe
	 *
	 * Removes a callback that was added via subscribe
	 *
	 * @name unsubscribe
	 * @access public
	 * @param callback The function used to subscribe
	 */
	unsubscribe(callback: optionsCallback): void {

		// Try to find the callback in the list
		const i = this._callbacks.indexOf(callback);

		// If we get an index, delete the callback
		if(i > -1) {
			this._callbacks.splice(i, 1);
		}
	}
}

// Have it be ignored by clone
cloneAddClass(OptionsBase);