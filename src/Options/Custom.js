/**
 * Options Custom
 *
 * Allows base functionality of non static options with full access to modify
 * the data whenever the user sees fit
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding
 * @created 2023-02-15
 */
// Import the base class
import Base from './Base';
/**
 * Custom
 *
 * Class to allow for dynamic data in selects/dropdowns set whenever the user
 * decides
 *
 * @name Custom
 * @access public
 * @extends Base
 */
export default class Custom extends Base {
    /**
     * Options Custom
     *
     * Creates an instance of the class with default data
     *
     * @name Custom
     * @access public
     * @param data Default data
     * @returns a new instance
     */
    constructor(data = []) {
        // Call the base class constructor
        super(data);
    }
    /**
     * Set
     *
     * Called to set the new array of value and name
     *
     * @name set
     * @access public
     * @param data An array of arrays with the first element being
     * 				the key	and the second element being the name
     */
    set(data) {
        // Store the new data
        this._data = data;
        // Notify
        this.notify();
    }
}
