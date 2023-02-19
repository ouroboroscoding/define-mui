/**
 * Options Fetch
 *
 * Dynamic options based on a data from a fetching call
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding
 * @created 2023-02-15
 */

// Import the base class
import Base from './Base';

// Import types
import { optionsCallback } from './Base';
export type FetchType = () => Promise<Record<string, any>[]>;
export type FieldsType = (data: Record<string, any>) => string[];

/**
 * Select Rest
 *
 * Class to allow for dynamic data in selects/dropdowns built from rest requests
 *
 * @name SelectRest
 * @access public
 * @extends SelectBase
 */
export default class SelectRest extends Base {

	// Instance variables
	_fetch: FetchType;
	_fetched: boolean;
	_fields: string[] | FieldsType;

	/**
	 * Select Rest
	 *
	 * Creates an instance of the class with default data
	 *
	 * @name SelectRest
	 * @access public
	 * @param fetch The function called to return the data
	 * @param fields A list of [key, value], or a function
	 * 					that return [key, value] for the element passed
	 * 					to it
	 * @param data Default data
	 * @returns a new instance
	 */
	constructor(fetch: FetchType, fields: string[] | FieldsType = ['_id', 'name'], data: string[][] = []) {

		// Call the base class constructor
		super(data);

		// Store the fetch function
		this._fetch = fetch;
		this._fields = fields;

		// Init the data
		this._fetched = false;
	}

	/**
	 * Track
	 *
	 * Stores a callback function to be called whenever the data changes
	 *
	 * @name subscribe
	 * @access public
	 * @param callback The function to call when data changes
	 * @param remove Set to false to remove the callback
	 */
	subscribe(callback: optionsCallback) {

		// Call the base class subscribe
		super.subscribe(callback);

		// If we don't have the data yet
		if(!this._fetched) {
			this._fetched = true;

			// Call the instance's fetch
			this._fetch().then(data => {

				// Generate the name/value pairs
				this._data = [];
				for(const o of data) {
					if(typeof this._fields === 'function') {
						this._data.push(this._fields(o));
					} else {
						this._data.push([o[this._fields[0]], o[this._fields[1]]]);
					}
				}

				// Notify the subscribeers
				this.notify();
			});
		}

		// Return the current data
		return this._data;
	}
}