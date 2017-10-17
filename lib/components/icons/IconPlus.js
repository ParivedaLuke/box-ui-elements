/**
 * 
 * @file Icon
 * @author Box
 */

import React from 'react';


var IconPlus = function IconPlus(_ref) {
    var _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 15 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 15 : _ref$height;
    return React.createElement(
        'svg',
        { width: width, height: height, role: 'img', viewBox: '0 0 17 17', className: className },
        React.createElement('path', { fill: '#222', d: 'M8 0h1v17H8z' }),
        React.createElement('path', { fill: '#222', d: 'M17 8v1H0V8z' })
    );
};

export default IconPlus;