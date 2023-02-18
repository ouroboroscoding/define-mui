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
import Base from './Base';
import { OptionsCallbackType } from './Types';
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
    _data: string[][];
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
    constructor(data?: string[][]);
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
    set(data: string[][]): void;
    /**
     * Track
     *
     * Stores a callback function to be called whenever the key changes
     *
     * @name track
     * @access public
     * @param callback The function to call when data changes
     * @param remove Set to true to remove the callback
     * @returns the current data, or void on callback removal
     */
    track(callback: OptionsCallbackType, remove?: boolean): void | string[][];
}
