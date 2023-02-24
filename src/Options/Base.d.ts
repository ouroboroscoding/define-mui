/**
 * Options Base
 *
 * The base class for all Options types
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-15
 */
export type optionsCallback = (data: string[][]) => void;
/**
 * Options Base
 *
 * The base class for dynamic Options types
 *
 * @name OptionsBase
 * @access public
 */
export default class OptionsBase {
    static _CLONE_SKIP_: boolean;
    _callbacks: optionsCallback[];
    _data: string[][];
    /**
     * Constructor
     *
     * Initialises the base class
     *
     * @name OptionsBase
     * @access private
     * @returns a new instance
     */
    constructor(data?: string[][]);
    /**
     * Notify
     *
     * Sends the data to all callbacks
     *
     * @name notify
     * @access public
     */
    notify(): void;
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
    subscribe(callback: optionsCallback, remove?: boolean): string[][];
    /**
     * Unsubscribe
     *
     * Removes a callback that was added via subscribe
     *
     * @name unsubscribe
     * @access public
     * @param callback The function used to subscribe
     */
    unsubscribe(callback: optionsCallback): void;
}
