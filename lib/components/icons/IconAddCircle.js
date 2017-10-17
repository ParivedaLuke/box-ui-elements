/**
 * 
 * @file Icon
 * @author Box
 */

import React from 'react';


var IconAddCircle = function IconAddCircle(_ref) {
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
            d: 'M12.5 23C18.85 23 24 17.85 24 11.5S18.85 0 12.5 0 1 5.15 1 11.5 6.15 23 12.5 23zm0-1C18.3 22 23 17.3 23 11.5S18.3 1 12.5 1 2 5.7 2 11.5 6.7 22 12.5 22zM6 12v-1h6V5h1v6h6v1h-6v6h-1v-6H6z'
        })
    );
};

export default IconAddCircle;