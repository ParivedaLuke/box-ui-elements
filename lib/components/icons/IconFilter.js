/**
 * 
 * @file Icon
 * @author Box
 */

import React from 'react';


var IconFilter = function IconFilter(_ref) {
    var _ref$color = _ref.color,
        color = _ref$color === undefined ? '#464a4f' : _ref$color,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 14 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 11 : _ref$height;
    return React.createElement(
        'svg',
        { width: width, height: height, role: 'img', className: className, viewBox: '0 0 14 11' },
        React.createElement('path', {
            fill: color,
            d: 'M6 1h8v1H6V1zM0 1h1v1H0V1zm3.5 2C2.7 3 2 2.3 2 1.5S2.7 0 3.5 0 5 .7 5 1.5 4.3 3 3.5 3zm7 4C9.7 7 9 6.3 9 5.5S9.7 4 10.5 4s1.5.7 1.5 1.5S11.3 7 10.5 7zm-5 4C4.7 11 4 10.3 4 9.5S4.7 8 5.5 8 7 8.7 7 9.5 6.3 11 5.5 11zM13 5h1v1h-1V5zM0 5h8v1H0V5zm0 4h3v1H0V9zm8 0h6v1H8V9z'
        })
    );
};

export default IconFilter;