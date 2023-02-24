/**
 * Options Base
 *
 * The base class for all Options types
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-15
 */
/**
 * Options Base
 *
 * The base class for dynamic Options types
 *
 * @name OptionsBase
 * @access public
 */
export default class OptionsBase {
    // Do not allow cloning
    static _CLONE_SKIP_ = true;
    // List of callbacks tracking changes in the data
    _callbacks;
    // The current data
    _data;
    /**
     * Constructor
     *
     * Initialises the base class
     *
     * @name OptionsBase
     * @access private
     * @returns a new instance
     */
    constructor(data = []) {
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
    notify() {
        // Go through each callback and notify of the data change
        for (const f of this._callbacks) {
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
    subscribe(callback, remove = false) {
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
    unsubscribe(callback) {
        // Try to find the callback in the list
        const i = this._callbacks.indexOf(callback);
        // If we get an index, delete the callback
        if (i > -1) {
            this._callbacks.splice(i, 1);
        }
    }
}
