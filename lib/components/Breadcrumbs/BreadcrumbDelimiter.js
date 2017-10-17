/**
 * 
 * @file Clickable breadcrumb component
 * @author Box
 */

import React from 'react';
import { DELIMITER_CARET } from '../../constants';
import IconRightArrow from '../icons/IconRightArrow';


var BreadcrumbDelimiter = function BreadcrumbDelimiter(_ref) {
    var delimiter = _ref.delimiter;
    return delimiter === DELIMITER_CARET ? React.createElement(
        'span',
        { className: 'buik-breadcrumb-seperator' },
        React.createElement(IconRightArrow, null)
    ) : React.createElement(
        'span',
        null,
        '/'
    );
};

export default BreadcrumbDelimiter;