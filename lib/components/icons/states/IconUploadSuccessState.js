/**
 * 
 * @file Empty state icon
 * @author Box
 */

import React from 'react';
import { BOX_BLUE, BOX_BLUE_LIGHT } from '../../../constants';


var IconUploadSuccessState = function IconUploadSuccessState(_ref) {
    var _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? BOX_BLUE : _ref$color,
        _ref$secondaryColor = _ref.secondaryColor,
        secondaryColor = _ref$secondaryColor === undefined ? BOX_BLUE_LIGHT : _ref$secondaryColor,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 49 : _ref$height,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 50 : _ref$width;
    return React.createElement(
        'svg',
        { className: className, height: height, role: 'img', viewBox: '0 0 50 49', width: width },
        React.createElement('path', {
            fill: color,
            d: 'M41.88,4.39l4,4.53L17,38.73,4.24,26,9,21.28l5.89,6.09L17,29.57l2.16-2.18,22.74-23M42,0,17,25.28,9,17,0,26,17,43,50,9,42,0Z'
        }),
        React.createElement('rect', { width: '6', height: '3', x: '4', y: '46', fill: secondaryColor, rx: '1.5', ry: '1.5' }),
        React.createElement('rect', { width: '6', height: '3', x: '33', y: '46', fill: secondaryColor, rx: '1.5', ry: '1.5' }),
        React.createElement('rect', { width: '21', height: '3', x: '11', y: '46', fill: secondaryColor, rx: '1.5', ry: '1.5' })
    );
};

export default IconUploadSuccessState;