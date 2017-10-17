/**
 * 
 * @file Icon
 * @author Box
 */

import React from 'react';


var IconCross = function IconCross(_ref) {
    var _ref$color = _ref.color,
        color = _ref$color === undefined ? '#222' : _ref$color,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 14 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 14 : _ref$height;
    return React.createElement(
        'svg',
        { width: width, height: height, viewBox: '0 0 14 14', role: 'img', className: className },
        React.createElement('path', {
            fill: color,
            stroke: color,
            strokeWidth: '.5',
            d: 'M7 6.1672l-4.995-4.995c-.2318-.2318-.6012-.2284-.8312.0016-.2232.2232-.2307.602-.0017.831L6.1673 7l-4.995 4.995c-.229.229-.2216.608.0016.8312.23.23.5994.2334.831.0017L7 7.8327l4.995 4.995c.2318.2318.6012.2284.8312-.0016.2232-.2232.2307-.602.0017-.831L7.8327 7l4.995-4.995c.229-.229.2216-.608-.0016-.8312-.23-.23-.5994-.2334-.831-.0017L7 6.1673z'
        })
    );
};

export default IconCross;