/**
 * Options Fetch
 *
 * Dynamic options based on a data from a fetching call
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding
 * @created 2023-02-15
 */
import Base from './Base';
import { CallbackType, FetchType, FieldsType } from './types';
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
    _data: string[][];
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
    constructor(fetch: FetchType, fields?: string[] | FieldsType, data?: string[][]);
    /**
     * Track
     *
     * Stores a callback function to be called whenever the data changes
     *
     * @name track
     * @access public
     * @param callback The function to call when data changes
     * @param remove Set to false to remove the callback
     */
    track(callback: CallbackType, remove?: boolean): string[][] | undefined;
}
