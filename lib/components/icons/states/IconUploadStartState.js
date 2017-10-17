/**
 * 
 * @file Empty state icon
 * @author Box
 */

import React from 'react';
import { BOX_BLUE, BOX_BLUE_LIGHT } from '../../../constants';


var IconUploadStartState = function IconUploadStartState(_ref) {
    var _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? BOX_BLUE : _ref$color,
        _ref$secondaryColor = _ref.secondaryColor,
        secondaryColor = _ref$secondaryColor === undefined ? BOX_BLUE_LIGHT : _ref$secondaryColor,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 85 : _ref$height,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 128 : _ref$width;
    return React.createElement(
        'svg',
        { className: className, height: height, role: 'img', viewBox: '0 0 128 85', width: width },
        React.createElement('path', {
            d: 'M0 43L2 43 2 49 8 49 8 43 10 43 5 37 0 43M118 43L120 43 120 49 126 49 126 43 128 43 123 37 118 43M13 24L16 24 16 32 24 32 24 24 27 24 20 16 13 24M98 26L102 26 102 36 112 36 112 26 116 26 107 16 98 26',
            fill: secondaryColor
        }),
        React.createElement('path', {
            d: 'M94.16,14.13,81.41.92A3,3,0,0,0,79.25,0H38a3,3,0,0,0-3,3V75a3,3,0,0,0,3,3H92a3,3,0,0,0,3-3V16.21A3,3,0,0,0,94.16,14.13ZM80,2.34,91.26,14H80ZM93,75a1,1,0,0,1-1,1H38a1,1,0,0,1-1-1V3a1,1,0,0,1,1-1H78V16H93a1,1,0,0,1,0,.21Z',
            fill: color
        }),
        React.createElement('path', {
            d: 'M45,50H85V20H45Zm6.08-2L57,40.66l5,6.94,10-11.05,9,11.45ZM47,22H83V47.38L72.05,33.45l-9.95,11L57,37.34,48.52,48H47Z',
            fill: color
        }),
        React.createElement('circle', { cx: '54', cy: '30', r: '3', fill: color }),
        React.createElement('path', {
            d: 'M46.5 56h29a1.5 1.5 0 0 0 0-3h-29a1.5 1.5 0 0 0 0 3zM80.5 59h-34a1.5 1.5 0 0 0 0 3h34a1.5 1.5 0 0 0 0-3zM59.5 65h-13a1.5 1.5 0 0 0 0 3h13a1.5 1.5 0 0 0 0-3z',
            fill: color
        }),
        React.createElement('path', {
            d: 'M35 63L35 53 35 48.56 30 43 21 53 25 53 25 63 35 63M99 50L95 54.57 95 58 95 66 103 66 103 58 106 58 99 50M76.5 82h-29a1.5 1.5 0 0 0 0 3h29a1.5 1.5 0 0 0 0-3zM88.5 82h-8a1.5 1.5 0 0 0 0 3h8a1.5 1.5 0 0 0 0-3zM43.5 82h-2a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 0 0-3z',
            fill: secondaryColor
        })
    );
};

export default IconUploadStartState;