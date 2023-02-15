/**
 * Options Base
 *
 * The base class for all Options types
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-15
 */
import { CallbackType } from './types';
/**
 * Options Base
 *
 * The base class for dynamic Options types
 *
 * @name OptionsBase
 * @access public
 */
export default class OptionsBase {
    _CLONE_SKIP_: boolean;
    _callbacks: CallbackType[];
    /**
     * Constructor
     *
     * Initialises the base class
     *
     * @name OptionsBase
     * @access private
     * @returns a new instance
     */
    constructor();
    /**
     * Notify
     *
     * Sends the data to all callbacks
     *
     * @name notify
     * @access public
     * @param data The data to send to all callbacks
     */
    notify(data: string[][]): void;
    /**
     * Track
     *
     * Stores a callback function to be called whenever the select data needs
     * to change
     *
     * @name track
     * @access public
     * @param callback The function to call when data changes
     * @param remove Set to false to remove the callback
     */
    track(callback: CallbackType, remove?: boolean): void;
}
