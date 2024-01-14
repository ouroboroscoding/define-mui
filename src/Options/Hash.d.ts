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
export type HashData = Record<string, string[][]>;
export type HashFunc = () => Promise<HashData>;
export type HashArg = HashData | HashFunc;
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
    _hash: HashData;
    _key: string;
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
    constructor(hash: HashArg, initialKey?: string | null);
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
    hash(hash: HashData): void | HashData;
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
    key(key?: string): void | string;
}
