/**
 * 
 * @file Icon
 * @author Box
 */

// @TODO(tjin): Replace this with real retry icon for retrying an upload
import React from 'react';
import { COLOR_RED } from '../../constants';


var IconRetry = function IconRetry(_ref) {
    var _ref$color = _ref.color,
        color = _ref$color === undefined ? COLOR_RED : _ref$color,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 14 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 16 : _ref$height;
    return React.createElement(
        'svg',
        { width: width, height: height, viewBox: '0 0 14 16', role: 'img', className: className },
        React.createElement('path', { d: 'M13,8a1,1,0,0,0-1,1A5,5,0,1,1,7,4V6l5-3L7,0V2a7,7,0,1,0,7,7A1,1,0,0,0,13,8Z', fill: color })
    );
};

export default IconRetry;