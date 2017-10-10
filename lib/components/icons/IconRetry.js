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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkljb25SZXRyeS5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNPTE9SX1JFRCIsIkljb25SZXRyeSIsImNvbG9yIiwiY2xhc3NOYW1lIiwid2lkdGgiLCJoZWlnaHQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFNQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGlCQUExQjs7O0FBR0EsSUFBTUMsWUFBWSxTQUFaQSxTQUFZO0FBQUEsMEJBQUdDLEtBQUg7QUFBQSxRQUFHQSxLQUFILDhCQUFXRixTQUFYO0FBQUEsOEJBQXNCRyxTQUF0QjtBQUFBLFFBQXNCQSxTQUF0QixrQ0FBa0MsRUFBbEM7QUFBQSwwQkFBc0NDLEtBQXRDO0FBQUEsUUFBc0NBLEtBQXRDLDhCQUE4QyxFQUE5QztBQUFBLDJCQUFrREMsTUFBbEQ7QUFBQSxRQUFrREEsTUFBbEQsK0JBQTJELEVBQTNEO0FBQUEsV0FDZDtBQUFBO0FBQUEsVUFBSyxPQUFPRCxLQUFaLEVBQW1CLFFBQVFDLE1BQTNCLEVBQW1DLFNBQVEsV0FBM0MsRUFBdUQsTUFBSyxLQUE1RCxFQUFrRSxXQUFXRixTQUE3RTtBQUNJLHNDQUFNLEdBQUUsNkVBQVIsRUFBc0YsTUFBTUQsS0FBNUY7QUFESixLQURjO0FBQUEsQ0FBbEI7O0FBS0EsZUFBZUQsU0FBZiIsImZpbGUiOiJJY29uUmV0cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgSWNvblxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbi8vIEBUT0RPKHRqaW4pOiBSZXBsYWNlIHRoaXMgd2l0aCByZWFsIHJldHJ5IGljb24gZm9yIHJldHJ5aW5nIGFuIHVwbG9hZFxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBDT0xPUl9SRUQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgdHlwZSB7IEljb25UeXBlIH0gZnJvbSAnLi4vLi4vZmxvd1R5cGVzJztcclxuXHJcbmNvbnN0IEljb25SZXRyeSA9ICh7IGNvbG9yID0gQ09MT1JfUkVELCBjbGFzc05hbWUgPSAnJywgd2lkdGggPSAxNCwgaGVpZ2h0ID0gMTYgfTogSWNvblR5cGUpID0+XHJcbiAgICA8c3ZnIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IHZpZXdCb3g9JzAgMCAxNCAxNicgcm9sZT0naW1nJyBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XHJcbiAgICAgICAgPHBhdGggZD0nTTEzLDhhMSwxLDAsMCwwLTEsMUE1LDUsMCwxLDEsNyw0VjZsNS0zTDcsMFYyYTcsNywwLDEsMCw3LDdBMSwxLDAsMCwwLDEzLDhaJyBmaWxsPXtjb2xvcn0gLz5cclxuICAgIDwvc3ZnPjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEljb25SZXRyeTtcclxuIl19