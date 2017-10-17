/**
 * 
 * @file Function to render the date table cell
 * @author Box
 */

import React from 'react';
import { getDate } from '../../util/datetime';

export default (function (getLocalizedMessage) {
    return function (_ref) {
        var cellData = _ref.cellData;
        return React.createElement(
            'span',
            null,
            getDate(cellData, getLocalizedMessage('buik.date.today'), getLocalizedMessage('buik.date.yesterday'))
        );
    };
});