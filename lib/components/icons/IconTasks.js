/**
 * 
 * @file Icon
 * @author Box
 */

import React from 'react';


var IconTasks = function IconTasks(_ref) {
    var _ref$color = _ref.color,
        color = _ref$color === undefined ? '#aaa' : _ref$color,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 18 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 19 : _ref$height;
    return React.createElement(
        'svg',
        { width: width, height: height, role: 'img', viewBox: '0 0 18 19', className: className },
        React.createElement('path', {
            fill: 'none',
            stroke: color,
            strokeWidth: '2',
            d: 'M7 8l3 3 7-6c-1.8-2.392-4.472-4-8-4-4.202 0-8 3.806-8 9 0 4.194 3.798 8 8 8 3.748 0 6.582-1.85 8-5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round'
        })
    );
};

export default IconTasks;