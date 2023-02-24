/**
 * Options Hash
 *
 * Dynamic options based on a single data point changing
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding
 * @created 2023-02-15
 */
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
    constructor(hash: Record<string, string[][]>, initialKey?: string | null);
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
    key(key?: string): void | string;
}
