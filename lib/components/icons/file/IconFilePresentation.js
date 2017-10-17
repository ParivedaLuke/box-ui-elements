/**
 * 
 * @file File icon
 * @author Box
 */

import React from 'react';


var IconFilePresentation = function IconFilePresentation(_ref) {
    var _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 32 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 32 : _ref$height;
    return React.createElement(
        'svg',
        { className: className, width: width, height: height, viewBox: '0 0 32 32', role: 'img' },
        React.createElement('path', {
            fillRule: 'evenodd',
            clipRule: 'evenodd',
            fill: '#F79420',
            d: 'M24.5,27.5h-17c-0.6,0-1-0.4-1-1v-21c0-0.6,0.4-1,1-1h12l6,6v16\r C25.5,27.1,25.1,27.5,24.5,27.5z'
        }),
        React.createElement('path', {
            fillRule: 'evenodd',
            clipRule: 'evenodd',
            fill: '#FFFFFF',
            d: 'M24,26.5H8c-0.3,0-0.5-0.2-0.5-0.5V6c0-0.3,0.2-0.5,0.5-0.5h11.5\r l5,5V26C24.5,26.3,24.3,26.5,24,26.5z'
        }),
        React.createElement('path', { fillRule: 'evenodd', clipRule: 'evenodd', fill: '#F79420', d: 'M19.5,4.5l6,6h-5c-0.6,0-1-0.4-1-1V4.5z' }),
        React.createElement('polygon', { fill: '#F79420', points: '9.9,22.4 9.1,21.6 14,16.8 16.5,19.3 22.1,13.6 22.9,14.4 16.5,20.7 14,18.2' })
    );
};

export default IconFilePresentation;