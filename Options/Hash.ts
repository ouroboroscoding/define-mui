/**
 * Options Hash
 *
 * Dynamic options based on a single data point changing
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding
 * @created 2023-02-15
 */

// Import the base class
import Base from './Base';

// Import types
import { OptionsCallbackType } from './Types';

/**
 * Hash
 *
 * Class to allow for dynamic data based on a hash of key to list of key, value
 * lists
 *
 * @name Hash
 * @access public
 * @extends SelectBase
 */
export default class Hash extends Base {

	_hash: Record<string, string[][]>;
	_key: string;

	/**
	 * Hash
	 *
	 * Constructor
	 *
	 * @name Hash
	 * @access public
	 * @param hash The key to key/value pairs
	 * @param initialKey Optional, the initial key to use,
	 * 						defaults to the first key in the hash
	 * @returns a new instance
	 */
	constructor(hash: Record<string, string[][]>, initialKey: string | null = null) {

		// Call base class constructor
		super();

		// Store the hash
		this._hash = hash;
		this._key = initialKey || '';
	}

	/**
	 * Key
	 *
	 * Sets/Gets the new key
	 *
	 * @name key
	 * @access public
	 * @param key Optional, Use to set value, else get
	 * @returns the current key, or void on setting new key
	 */
	key(key?: string): void | string {

		// If we got a key
		if(key !== undefined) {

			// Store the new key
			this._key = key;

			// Notify
			this.notify(this._key in this._hash ? this._hash[this._key] : []);
		}

		// Else, return the current key
		else {
			return this._key;
		}
	}

	/**
	 * Track
	 *
	 * Stores a callback function to be called whenever the key changes
	 *
	 * @name track
	 * @access public
	 * @param callback The function to call when data changes
	 * @param remove Set to false to remove the callback
	 */
	track(callback: OptionsCallbackType, remove: boolean = false) {

		// Call the base class track
		super.track(callback, remove);

		// If we are not removing the callbacl
		if(!remove) {

			// Return the current data
			return this._key in this._hash ? this._hash[this._key] : [];
		}
	}
}