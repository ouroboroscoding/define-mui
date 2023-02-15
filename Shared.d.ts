/**
 * Shared
 *
 * Methods for shared functionality in define components
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding
 * @created 2023-02-15
 */
/**
 * Error Tree
 *
 * Converts array of rest field errors into a tree
 *
 * @name errorTree
 * @access public
 * @param {string[][]} errors The list of errors
 * @returns {object}
 */
export declare function errorTree(errors: string[][]): Record<string, any>;
