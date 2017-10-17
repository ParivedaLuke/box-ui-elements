/**
 * 
 * @file Icon
 * @author Box
 */

import React from 'react';


var IconApps = function IconApps(_ref) {
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
        React.createElement('path', {
            fill: 'none',
            stroke: color,
            strokeWidth: '2',
            d: 'M2 1c-.552 0-1 .448-1 1v4c0 .552.448 1 1 1h4c.552 0 1-.448 1-1V2c0-.552-.448-1-1-1H2zm0 10c-.552 0-1 .448-1 1v4c0 .552.448 1 1 1h4c.552 0 1-.448 1-1v-4c0-.552-.448-1-1-1H2zM12 1c-.552 0-1 .448-1 1v4c0 .552.448 1 1 1h4c.552 0 1-.448 1-1V2c0-.552-.448-1-1-1h-4zm0 10c-.552 0-1 .448-1 1v4c0 .552.448 1 1 1h4c.552 0 1-.448 1-1v-4c0-.552-.448-1-1-1h-4z'
        })
    );
};

export default IconApps;