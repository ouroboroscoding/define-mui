/**
 * Options Fetch
 *
 * Dynamic options based on a data from a fetching call
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding
 * @created 2023-02-15
 */
// Ouroboros modules
import Subscribe from '@ouroboros/subscribe';
/**
 * Fetch
 *
 * Class to allow for dynamic data in selects/dropdowns built from rest requests
 *
 * @name Fetch
 * @access public
 * @extends
 */
export default class Fetch extends Subscribe {
    // Instance variables
    _fetch;
    _fetched;
    _fields;
    /**
     * Fetch
     *
     * Creates an instance of the class with default data
     *
     * @name OptionsFetch
     * @access public
     * @param fetch The function called to return the data
     * @param fields A list of [key, value], or a function
     * 					that return [key, value] for the element passed
     * 					to it
     * @param data Default data
     * @return a new instance
     */
    constructor(fetch, fields = ['_id', 'name'], data = []) {
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
     * @return The current data plus an unsubscribe function
     */
    subscribe(callback) {
        // Call the base class subscribe
        const oReturn = super.subscribe(callback);
        // If we don't have the data yet
        if (!this._fetched) {
            this._fetched = true;
            // Call the instance's fetch
            this._fetch().then(data => {
                // Generate the name/value pairs
                const lData = [];
                for (const o of data) {
                    if (typeof this._fields === 'function') {
                        lData.push(this._fields(o));
                    }
                    else {
                        lData.push([o[this._fields[0]], o[this._fields[1]]]);
                    }
                }
                // Notify the subscribeers
                this.set(lData);
            });
        }
        // Return the current data and unsubscribe
        return oReturn;
    }
}
