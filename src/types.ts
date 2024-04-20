/**
 * Types
 *
 * Handles types that don't fit in one specific component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2024-04-19
 */

// Ouroboros modules
import Subscribe from '@ouroboros/subscribe';

// Display settings that mimic __ui__ special field from define
export type nodeDisplayStruct = {
	__adornment__?: string,
	__default__?: any,
	__errors__?: Record<string, string>,
	__extra_space__?: boolean,
	__maximum__?: number,
	__options__?: Subscribe | [string, string][] | string[],
	__regex__?: RegExp | string,
	__title__?: string,
	__type__?: string
}
export type displayStruct = {
	__create__?: string[],
	__order__?: string[],
	__primary__?: string,
	__results__?: string[],
	__update__?: string[],
	copyPrimary?: boolean
} & {
	[x: string]: displayStruct
} & nodeDisplayStruct