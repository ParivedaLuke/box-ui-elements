/**
 * 
 * @file Icon
 * @author Box
 */

import React from 'react';


var IconComments = function IconComments(_ref) {
    var _ref$color = _ref.color,
        color = _ref$color === undefined ? '#aaa' : _ref$color,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 20 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 19 : _ref$height;
    return React.createElement(
        'svg',
        { width: width, height: height, role: 'img', viewBox: '0 0 20 19', className: className },
        React.createElement(
            'g',
            { fill: 'none', stroke: color },
            React.createElement('path', {
                strokeWidth: '2',
                d: 'M4 17.483L9.795 15H12c3.866 0 7-3.134 7-7s-3.134-7-7-7H8C4.134 1 1 4.134 1 8c0 2.153.977 4.144 2.625 5.465l.375.3v3.718z'
            }),
            React.createElement('circle', { cx: '6', cy: '8', r: '1' }),
            React.createElement('circle', { cx: '10', cy: '8', r: '1' }),
            React.createElement('circle', { cx: '14', cy: '8', r: '1' })
        )
    );
};

export default IconComments;