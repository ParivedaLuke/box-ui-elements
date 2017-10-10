/**
 * 
 * @file Icon
 * @author Box
 */

import React from 'react';


var IconFilter = function IconFilter(_ref) {
    var _ref$color = _ref.color,
        color = _ref$color === undefined ? '#464a4f' : _ref$color,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 14 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 11 : _ref$height;
    return React.createElement(
        'svg',
        { width: width, height: height, role: 'img', className: className, viewBox: '0 0 14 11' },
        React.createElement('path', {
            fill: color,
            d: 'M6 1h8v1H6V1zM0 1h1v1H0V1zm3.5 2C2.7 3 2 2.3 2 1.5S2.7 0 3.5 0 5 .7 5 1.5 4.3 3 3.5 3zm7 4C9.7 7 9 6.3 9 5.5S9.7 4 10.5 4s1.5.7 1.5 1.5S11.3 7 10.5 7zm-5 4C4.7 11 4 10.3 4 9.5S4.7 8 5.5 8 7 8.7 7 9.5 6.3 11 5.5 11zM13 5h1v1h-1V5zM0 5h8v1H0V5zm0 4h3v1H0V9zm8 0h6v1H8V9z'
        })
    );
};

export default IconFilter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkljb25GaWx0ZXIuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJJY29uRmlsdGVyIiwiY29sb3IiLCJjbGFzc05hbWUiLCJ3aWR0aCIsImhlaWdodCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7OztBQUdBLElBQU1DLGFBQWEsU0FBYkEsVUFBYTtBQUFBLDBCQUFHQyxLQUFIO0FBQUEsUUFBR0EsS0FBSCw4QkFBVyxTQUFYO0FBQUEsOEJBQXNCQyxTQUF0QjtBQUFBLFFBQXNCQSxTQUF0QixrQ0FBa0MsRUFBbEM7QUFBQSwwQkFBc0NDLEtBQXRDO0FBQUEsUUFBc0NBLEtBQXRDLDhCQUE4QyxFQUE5QztBQUFBLDJCQUFrREMsTUFBbEQ7QUFBQSxRQUFrREEsTUFBbEQsK0JBQTJELEVBQTNEO0FBQUEsV0FDZjtBQUFBO0FBQUEsVUFBSyxPQUFPRCxLQUFaLEVBQW1CLFFBQVFDLE1BQTNCLEVBQW1DLE1BQUssS0FBeEMsRUFBOEMsV0FBV0YsU0FBekQsRUFBb0UsU0FBUSxXQUE1RTtBQUNJO0FBQ0ksa0JBQU1ELEtBRFY7QUFFSSxlQUFFO0FBRk47QUFESixLQURlO0FBQUEsQ0FBbkI7O0FBUUEsZUFBZUQsVUFBZiIsImZpbGUiOiJJY29uRmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEljb25cclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgdHlwZSB7IEljb25UeXBlIH0gZnJvbSAnLi4vLi4vZmxvd1R5cGVzJztcclxuXHJcbmNvbnN0IEljb25GaWx0ZXIgPSAoeyBjb2xvciA9ICcjNDY0YTRmJywgY2xhc3NOYW1lID0gJycsIHdpZHRoID0gMTQsIGhlaWdodCA9IDExIH06IEljb25UeXBlKSA9PlxyXG4gICAgPHN2ZyB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSByb2xlPSdpbWcnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2aWV3Qm94PScwIDAgMTQgMTEnPlxyXG4gICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgIGZpbGw9e2NvbG9yfVxyXG4gICAgICAgICAgICBkPSdNNiAxaDh2MUg2VjF6TTAgMWgxdjFIMFYxem0zLjUgMkMyLjcgMyAyIDIuMyAyIDEuNVMyLjcgMCAzLjUgMCA1IC43IDUgMS41IDQuMyAzIDMuNSAzem03IDRDOS43IDcgOSA2LjMgOSA1LjVTOS43IDQgMTAuNSA0czEuNS43IDEuNSAxLjVTMTEuMyA3IDEwLjUgN3ptLTUgNEM0LjcgMTEgNCAxMC4zIDQgOS41UzQuNyA4IDUuNSA4IDcgOC43IDcgOS41IDYuMyAxMSA1LjUgMTF6TTEzIDVoMXYxaC0xVjV6TTAgNWg4djFIMFY1em0wIDRoM3YxSDBWOXptOCAwaDZ2MUg4Vjl6J1xyXG4gICAgICAgIC8+XHJcbiAgICA8L3N2Zz47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJY29uRmlsdGVyO1xyXG4iXX0=