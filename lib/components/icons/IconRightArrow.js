/**
 * 
 * @file Icon
 * @author Box
 */

import React from 'react';


var IconRightArrow = function IconRightArrow(_ref) {
    var _ref$color = _ref.color,
        color = _ref$color === undefined ? '#999' : _ref$color,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 7 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 10 : _ref$height;
    return React.createElement(
        'svg',
        { width: width, height: height, viewBox: '0 0 8 13', role: 'img', className: className },
        React.createElement('path', { d: 'M.1 11.3l4.6-4.5L.1 2.2 1.5.8l6 6-6 6-1.4-1.5z', fill: color, fillRule: 'evenodd' })
    );
};

export default IconRightArrow;