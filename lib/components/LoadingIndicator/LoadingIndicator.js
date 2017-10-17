/**
 * 
 * @file Loading Indicator component
 * @author Box
 */

import React from 'react';


var LoadingIndicator = function LoadingIndicator(_ref) {
    var _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        _ref$size = _ref.size,
        size = _ref$size === undefined ? 'default' : _ref$size;
    return React.createElement(
        'div',
        { className: 'buik-crawler ' + className + ' buik-crawler-is-' + size },
        React.createElement('div', null),
        React.createElement('div', null),
        React.createElement('div', null)
    );
};

export default LoadingIndicator;