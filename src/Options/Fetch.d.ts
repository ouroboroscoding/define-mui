/**
 * Options Fetch
 *
 * Dynamic options based on a data from a fetching call
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding
 * @created 2023-02-15
 */
import Subscribe, { SubscribeCallback, SubscribeReturn } from '@ouroboros/subscribe';
export type FetchType = () => Promise<Record<string, any>[]>;
export type FieldsType = (data: Record<string, any>) => string[];
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
    protected _fetch: FetchType;
    protected _fetched: boolean;
    protected _fields: string[] | FieldsType;
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
    constructor(fetch: FetchType, fields?: string[] | FieldsType, data?: string[][]);
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
    subscribe(callback: SubscribeCallback): SubscribeReturn;
}
