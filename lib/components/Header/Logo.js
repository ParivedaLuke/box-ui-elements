/**
 * 
 * @file Logo for the header
 * @author Box
 */

import React from 'react';
import IconDefaultLogo from '../icons/IconDefaultLogo';
import IconBoxLogo from '../icons/IconBoxLogo';


function getLogo(isSmall, url) {
    if (url === 'box') {
        return React.createElement(IconBoxLogo, null);
    } else if (typeof url === 'string') {
        return React.createElement('img', { alt: '', src: url, className: 'buik-logo-custom' });
    }
    return React.createElement(IconDefaultLogo, { width: isSmall ? 75 : 100 });
}

var Logo = function Logo(_ref) {
    var url = _ref.url,
        isSmall = _ref.isSmall;
    return React.createElement(
        'div',
        { className: 'buik-logo' },
        getLogo(isSmall, url)
    );
};

export default Logo;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvZ28uanMiXSwibmFtZXMiOlsiUmVhY3QiLCJJY29uRGVmYXVsdExvZ28iLCJJY29uQm94TG9nbyIsImdldExvZ28iLCJpc1NtYWxsIiwidXJsIiwiTG9nbyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxlQUFQLE1BQTRCLDBCQUE1QjtBQUNBLE9BQU9DLFdBQVAsTUFBd0Isc0JBQXhCOzs7QUFRQSxTQUFTQyxPQUFULENBQWlCQyxPQUFqQixFQUFtQ0MsR0FBbkMsRUFBaUQ7QUFDN0MsUUFBSUEsUUFBUSxLQUFaLEVBQW1CO0FBQ2YsZUFBTyxvQkFBQyxXQUFELE9BQVA7QUFDSCxLQUZELE1BRU8sSUFBSSxPQUFPQSxHQUFQLEtBQWUsUUFBbkIsRUFBNkI7QUFDaEMsZUFBTyw2QkFBSyxLQUFJLEVBQVQsRUFBWSxLQUFLQSxHQUFqQixFQUFzQixXQUFVLGtCQUFoQyxHQUFQO0FBQ0g7QUFDRCxXQUFPLG9CQUFDLGVBQUQsSUFBaUIsT0FBT0QsVUFBVSxFQUFWLEdBQWUsR0FBdkMsR0FBUDtBQUNIOztBQUVELElBQU1FLE9BQU8sU0FBUEEsSUFBTztBQUFBLFFBQUdELEdBQUgsUUFBR0EsR0FBSDtBQUFBLFFBQVFELE9BQVIsUUFBUUEsT0FBUjtBQUFBLFdBQ1Q7QUFBQTtBQUFBLFVBQUssV0FBVSxXQUFmO0FBQ0tELGdCQUFRQyxPQUFSLEVBQWlCQyxHQUFqQjtBQURMLEtBRFM7QUFBQSxDQUFiOztBQUtBLGVBQWVDLElBQWYiLCJmaWxlIjoiTG9nby5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBMb2dvIGZvciB0aGUgaGVhZGVyXHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEljb25EZWZhdWx0TG9nbyBmcm9tICcuLi9pY29ucy9JY29uRGVmYXVsdExvZ28nO1xyXG5pbXBvcnQgSWNvbkJveExvZ28gZnJvbSAnLi4vaWNvbnMvSWNvbkJveExvZ28nO1xyXG5pbXBvcnQgJy4vTG9nby5zY3NzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICB1cmw/OiBzdHJpbmcsXHJcbiAgICBpc1NtYWxsOiBib29sZWFuXHJcbn07XHJcblxyXG5mdW5jdGlvbiBnZXRMb2dvKGlzU21hbGw6IGJvb2xlYW4sIHVybD86IHN0cmluZykge1xyXG4gICAgaWYgKHVybCA9PT0gJ2JveCcpIHtcclxuICAgICAgICByZXR1cm4gPEljb25Cb3hMb2dvIC8+O1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdXJsID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHJldHVybiA8aW1nIGFsdD0nJyBzcmM9e3VybH0gY2xhc3NOYW1lPSdidWlrLWxvZ28tY3VzdG9tJyAvPjtcclxuICAgIH1cclxuICAgIHJldHVybiA8SWNvbkRlZmF1bHRMb2dvIHdpZHRoPXtpc1NtYWxsID8gNzUgOiAxMDB9IC8+O1xyXG59XHJcblxyXG5jb25zdCBMb2dvID0gKHsgdXJsLCBpc1NtYWxsIH06IFByb3BzKSA9PlxyXG4gICAgPGRpdiBjbGFzc05hbWU9J2J1aWstbG9nbyc+XHJcbiAgICAgICAge2dldExvZ28oaXNTbWFsbCwgdXJsKX1cclxuICAgIDwvZGl2PjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvZ287XHJcbiJdfQ==