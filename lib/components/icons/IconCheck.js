/**
 * 
 * @file Icon
 * @author Box
 */

import React from 'react';
import { BOX_BLUE } from '../../constants';


var IconCheck = function IconCheck(_ref) {
    var _ref$color = _ref.color,
        color = _ref$color === undefined ? BOX_BLUE : _ref$color,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 16.88 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 13.34 : _ref$height;
    return React.createElement(
        'svg',
        { width: width, height: height, viewBox: '0 0 16.88 13.34', role: 'img', className: className },
        React.createElement('path', { fill: color, fillRule: 'evenodd', d: 'M16.88 1.78L15 0 5.32 9.8 1.77 6.25 0 8.02 5.33 13.34 16.88 1.78' })
    );
};

export default IconCheck;