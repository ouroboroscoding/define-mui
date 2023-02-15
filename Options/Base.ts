/**
 * Options Base
 *
 * The base class for all Options types
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-15
 */

// Import types
import { CallbackType } from './types';

/**
 * Options Base
 *
 * The base class for dynamic Options types
 *
 * @name OptionsBase
 * @access public
 */
export default class OptionsBase {
	_CLONE_SKIP_ = true;

	// List of callbacks tracking changes in the data
	_callbacks: CallbackType[];

	/**
	 * Constructor
	 *
	 * Initialises the base class
	 *
	 * @name OptionsBase
	 * @access private
	 * @returns a new instance
	 */
	constructor() {

		// Init the list of callbacks
		this._callbacks = [];
	}

	/**
	 * Notify
	 *
	 * Sends the data to all callbacks
	 *
	 * @name notify
	 * @access public
	 * @param data The data to send to all callbacks
	 */
	notify(data: string[][]): void {

		// Go through each callback and notify of the data change
		for(const f of this._callbacks) {
			f(data);
		}
	}

	/**
	 * Track
	 *
	 * Stores a callback function to be called whenever the select data needs
	 * to change
	 *
	 * @name track
	 * @access public
	 * @param callback The function to call when data changes
	 * @param remove Set to false to remove the callback
	 */
	track(callback: CallbackType, remove=false): void {

		// If we are removing a callback
		if(remove) {

			// Try to find the callback in the list
			const i = this._callbacks.indexOf(callback);

			// If we get an index, delete the callback
			if(i > -1) {
				this._callbacks.splice(i, 1);
			}
		}

		// If we are adding a new callback
		else {

			// Add it to the list
			this._callbacks.push(callback);
		}
	}
}