/**
 * 
 * @file Icon
 * @author Box
 */

import React from 'react';


var IconSubtractCircle = function IconSubtractCircle(_ref) {
    var _ref$color = _ref.color,
        color = _ref$color === undefined ? '#777' : _ref$color,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 24 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 24 : _ref$height;
    return React.createElement(
        'svg',
        { width: width, height: height, role: 'img', viewBox: '0 0 24 24', className: className },
        React.createElement('path', {
            fill: color,
            fillRule: 'evenodd',
            d: 'M5.5 12.5v-1h13v1h-13zM12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zm0-1c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z'
        })
    );
};

export default IconSubtractCircle;