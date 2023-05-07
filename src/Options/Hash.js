/**
 * Options Hash
 *
 * Dynamic options based on a single data point changing
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding
 * @created 2023-02-15
 */
// Ouroboros modules
import Subscribe from '@ouroboros/subscribe';
/**
 * Hash
 *
 * Class to allow for dynamic data based on a hash of key to list of key, value
 * lists
 *
 * @name Hash
 * @access public
 * @extends Subscribe
 */
export default class Hash extends Subscribe {
    // Instance variables
    _hash;
    _key;
    /**
     * Hash
     *
     * Constructor
     *
     * @name Hash
     * @access public
     * @param hash The key to key/value pairs, or a function that returns a
     * 				promise
     * @param initialKey Optional, the initial key to use,
     * 						defaults to the first key in the hash
     * @returns a new instance
     */
    constructor(hash, initialKey = null) {
        // Call base class constructor
        super([]);
        // Store or fetch the hash data
        if (typeof hash === 'function') {
            hash().then(data => { this.hash(data); }, error => { throw new Error(error); });
        }
        else {
            this._hash = hash;
        }
        // Store the key
        this._key = initialKey || '';
    }
    /**
     * Hash
     *
     * Sets/Gets the hash data
     *
     * @name hash
     * @access public
     * @param hash Optional, used to set value, else get
     * @returns the current hash, or void on setting new hash
     */
    hash(hash) {
        // If we got a hash
        if (hash !== undefined) {
            // Store the new hash
            this._hash = hash;
            // Set the data and notify subscribers
            this.set(this._key in this._hash ? this._hash[this._key] : []);
        }
        // Else, return the current hash
        else {
            return this._hash;
        }
    }
    /**
     * Key
     *
     * Sets/Gets the key
     *
     * @name key
     * @access public
     * @param key Optional, used to set value, else get
     * @returns the current key, or void on setting new key
     */
    key(key) {
        // If we got a key
        if (key !== undefined) {
            // Store the new key
            this._key = key;
            // Set the data and notify subscribers
            this.set(this._key in this._hash ? this._hash[this._key] : []);
        }
        // Else, return the current key
        else {
            return this._key;
        }
    }
}
