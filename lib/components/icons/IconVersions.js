/**
 * 
 * @file Icon
 * @author Box
 */

import React from 'react';


var IconVersions = function IconVersions(_ref) {
    var _ref$color = _ref.color,
        color = _ref$color === undefined ? '#aaa' : _ref$color,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 18 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 18 : _ref$height;
    return React.createElement(
        'svg',
        { width: width, height: height, role: 'img', viewBox: '0 0 18 18', className: className },
        React.createElement(
            'g',
            { fill: 'none', stroke: color },
            React.createElement('rect', { width: '1', height: '4', x: '8.5', y: '5.5', rx: '.5' }),
            React.createElement('rect', { width: '1', height: '5', x: '.5', y: '.5', rx: '.5' }),
            React.createElement('rect', { width: '4', height: '1', x: '8.5', y: '8.5', rx: '.5' }),
            React.createElement('rect', { width: '5', height: '1', x: '.5', y: '4.5', rx: '.5' }),
            React.createElement('path', {
                strokeWidth: '2',
                d: 'M2 12.5c1.327 2.238 3.767 3.738 6.558 3.738 4.208 0 7.62-3.41 7.62-7.62C16.178 4.412 12.765 1 8.558 1 5.767 1 3.327 2.5 2 4.738',
                strokeLinecap: 'round'
            })
        )
    );
};

export default IconVersions;