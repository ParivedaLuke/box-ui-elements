/**
 * 
 * @file Icon
 * @author Box
 */

import React from 'react';


var IconDetails = function IconDetails(_ref) {
    var _ref$color = _ref.color,
        color = _ref$color === undefined ? '#aaa' : _ref$color,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 16 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 21 : _ref$height;
    return React.createElement(
        'svg',
        { width: width, height: height, role: 'img', viewBox: '0 0 16 21', className: className },
        React.createElement(
            'g',
            { fill: 'none', fillRule: 'evenodd', stroke: color, strokeWidth: '2' },
            React.createElement('path', { d: 'M2.0000109.99997817V1c-.55228208.00000603-1 .44772545-1.0000109 1v17c0 .5522847.44771525 1 1 1h12c.5522847 0 1-.4477153 1-1V6.82831798c0-.2652165-.1053568-.5195704-.2928932-.70710678L9.8786887 1.29279312C9.69114965 1.10525407 9.43679127.999897 9.171571.9998999L2.0000109.99997817z' }),
            React.createElement('path', { d: 'M8 10.4V14m0-7', strokeLinecap: 'round' }),
            React.createElement('path', { d: 'M8,7 L8,7', strokeLinecap: 'round' })
        )
    );
};

export default IconDetails;