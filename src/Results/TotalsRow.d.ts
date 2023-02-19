/**
 * Results Totals Row
 *
 * Handles generating the row of totals
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-19
 */
/// <reference types="react" />
import PropTypes from 'prop-types';
import { infoStruct } from './';
export type TotalsRowProps = {
    actions: boolean;
    fields: string[];
    info: infoStruct;
    totals: Record<string, any>;
};
/**
 * Totals Row
 *
 * Displays a row of totals based on the results
 *
 * @name TotalsRow
 * @access private
 * @param Object props Properties passed to the component
 * @return React.Component
 */
declare function TotalsRow(props: TotalsRowProps): JSX.Element;
declare namespace TotalsRow {
    var propTypes: {
        actions: PropTypes.Validator<boolean>;
        fields: PropTypes.Validator<any[]>;
        info: PropTypes.Validator<object>;
        totals: PropTypes.Validator<object>;
    };
}
export default TotalsRow;
