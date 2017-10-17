/**
 * 
 * @file Clickable breadcrumb component
 * @author Box
 */

import React from 'react';
import BreadcrumbDelimiter from './BreadcrumbDelimiter';
import { PlainButton } from '../Button';


var Breadcrumb = function Breadcrumb(_ref) {
    var _ref$name = _ref.name,
        name = _ref$name === undefined ? '' : _ref$name,
        onClick = _ref.onClick,
        isLast = _ref.isLast,
        delimiter = _ref.delimiter;

    var title = onClick ? React.createElement(
        PlainButton,
        { onClick: onClick },
        name
    ) : React.createElement(
        'span',
        null,
        name
    );
    return React.createElement(
        'span',
        { className: 'buik-breadcrumb' },
        title,
        isLast ? null : React.createElement(BreadcrumbDelimiter, { delimiter: delimiter })
    );
};

export default Breadcrumb;