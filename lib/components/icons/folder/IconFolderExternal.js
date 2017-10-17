/**
 * 
 * @file Folder icon
 * @author Box
 */

import React from 'react';


var IconFolderExternal = function IconFolderExternal(_ref) {
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
            fill: '#979EA2',
            d: 'M27,25H5c-0.6,0-1-0.4-1-1V8c0-0.6,0.4-1,1-1h8.6L16,9h11c0.6,0,1,0.4,1,1v14C28,24.6,27.6,25,27,25z'
        }),
        React.createElement('path', { fill: '#EFF1F2', d: 'M26.5,24h-21C5.2,24,5,23.8,5,23.5V12h22v11.6C27,23.8,26.8,24,26.5,24z' }),
        React.createElement('circle', { fill: '#979EA2', cx: '13.6', cy: '15.8', r: '1' }),
        React.createElement('circle', { fill: '#979EA2', cx: '18.6', cy: '15.8', r: '1' }),
        React.createElement('path', { fill: '#979EA2', d: 'M13.6,17.5c-1.4,0-2.5,1.1-2.5,2.5v1.5h5V20C16,18.6,14.9,17.5,13.6,17.5z' }),
        React.createElement('path', {
            fill: '#979EA2',
            d: 'M17,21.4v-1.5c0-0.5-0.2-1-0.5-1.4c0.5-0.6,1.2-1,2-1c1.4,0,2.5,1.1,2.5,2.5v1.5h-4V21.4z'
        })
    );
};

export default IconFolderExternal;