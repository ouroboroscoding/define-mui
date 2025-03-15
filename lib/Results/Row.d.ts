/**
 * Results Row
 *
 * Handles a single row of results
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-18
 */
import PropTypes from 'prop-types';
import React from 'react';
import type { gridSizesPropStruct } from '../DefineBase';
import type { dynamicOptionStruct, onNodeChangeCallback } from '../DefineParent';
import type { onSubmitCallback } from '../Form';
export type actionCallback = (data: Record<string, any>) => void;
export type actionDynamicCallback = (data: Record<string, any>) => Record<string, any>;
export type actionStruct = {
    callback?: actionCallback;
    component?: componentConstructor;
    dynamic?: actionDynamicCallback;
    icon?: string;
    props?: Record<string, any>;
    tooltip?: string;
    url?: string;
    url_pop?: boolean;
};
export type menuStruct = {
    callback: actionCallback;
    icon: string;
    title: string;
};
export type componentConstructor = string | React.FunctionComponent<{
    onClose: () => void;
    value: Record<string, any>;
}> | React.ComponentClass<{
    onClose: () => void;
    value: Record<string, any>;
}, any>;
export type customCallback = (row: Record<string, any>) => string;
export type onDeleteCallback = (key: any) => void;
export type onKeyCopyCallback = (key: any) => void;
export type ResultsRowProps = {
    actions: actionStruct[] | false;
    custom: Record<string, customCallback>;
    data: Record<string, any>;
    display?: Record<string, any>;
    dynamicOptions?: dynamicOptionStruct[];
    errors?: Record<string, any>;
    fields: string[];
    gridSizes?: gridSizesPropStruct;
    gridSpacing?: number;
    info: Record<string, any>;
    menu: menuStruct[];
    onDelete: onDeleteCallback | false;
    onKeyCopy: onKeyCopyCallback | false;
    onNodeChange?: Record<string, onNodeChangeCallback>;
    onUpdate: onSubmitCallback | false;
    options: Record<string, any>;
};
/**
 * Results Row
 *
 * Displays a single row of results
 *
 * @name Row
 * @access private
 * @param Object props Properties passed to the component
 * @return React.Component
 */
declare function ResultsRow(props: ResultsRowProps): React.JSX.Element;
declare namespace ResultsRow {
    var propTypes: {
        actions: PropTypes.Validator<NonNullable<NonNullable<boolean | any[] | null | undefined>>>;
        custom: PropTypes.Validator<object>;
        data: PropTypes.Validator<object>;
        display: PropTypes.Requireable<object>;
        dynamicOptions: PropTypes.Requireable<(Required<PropTypes.InferProps<{
            node: PropTypes.Validator<string>;
            trigger: PropTypes.Validator<string>;
            options: PropTypes.Validator<object>;
        }>> | null | undefined)[]>;
        errors: PropTypes.Validator<object>;
        fields: PropTypes.Validator<any[]>;
        gridSizes: PropTypes.Requireable<{
            [x: string]: Required<PropTypes.InferProps<{
                xs: PropTypes.Requireable<number>;
                sm: PropTypes.Requireable<number>;
                md: PropTypes.Requireable<number>;
                lg: PropTypes.Requireable<number>;
                xl: PropTypes.Requireable<number>;
            }>> | null | undefined;
        }>;
        gridSpacing: PropTypes.Requireable<number>;
        info: PropTypes.Validator<object>;
        menu: PropTypes.Validator<any[]>;
        onDelete: PropTypes.Validator<NonNullable<NonNullable<boolean | ((...args: any[]) => any) | null | undefined>>>;
        onNodeChange: PropTypes.Requireable<{
            [x: string]: ((...args: any[]) => any) | null | undefined;
        }>;
        onUpdate: PropTypes.Validator<NonNullable<NonNullable<boolean | ((...args: any[]) => any) | null | undefined>>>;
        options: PropTypes.Validator<object>;
    };
}
export default ResultsRow;
