var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * 
 * @file Primary Button component
 * @author Box
 */

import React from 'react';
import Button from './Button';

var PrimaryButton = function PrimaryButton(_ref) {
    var children = _ref.children,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        rest = _objectWithoutProperties(_ref, ['children', 'className']);

    return React.createElement(
        Button,
        _extends({ className: 'buik-btn-primary ' + className }, rest),
        children
    );
};

export default PrimaryButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlByaW1hcnlCdXR0b24uanMiXSwibmFtZXMiOlsiUmVhY3QiLCJCdXR0b24iLCJQcmltYXJ5QnV0dG9uIiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJyZXN0Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLFVBQW5COztBQU9BLElBQU1DLGdCQUFnQixTQUFoQkEsYUFBZ0I7QUFBQSxRQUFHQyxRQUFILFFBQUdBLFFBQUg7QUFBQSw4QkFBYUMsU0FBYjtBQUFBLFFBQWFBLFNBQWIsa0NBQXlCLEVBQXpCO0FBQUEsUUFBZ0NDLElBQWhDOztBQUFBLFdBQ2xCO0FBQUMsY0FBRDtBQUFBLG1CQUFRLGlDQUErQkQsU0FBdkMsSUFBd0RDLElBQXhEO0FBQ0tGO0FBREwsS0FEa0I7QUFBQSxDQUF0Qjs7QUFLQSxlQUFlRCxhQUFmIiwiZmlsZSI6IlByaW1hcnlCdXR0b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgUHJpbWFyeSBCdXR0b24gY29tcG9uZW50XHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuL0J1dHRvbic7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgY2hpbGRyZW4/OiBhbnksXHJcbiAgICBjbGFzc05hbWU6IHN0cmluZ1xyXG59O1xyXG5cclxuY29uc3QgUHJpbWFyeUJ1dHRvbiA9ICh7IGNoaWxkcmVuLCBjbGFzc05hbWUgPSAnJywgLi4ucmVzdCB9OiBQcm9wcykgPT5cclxuICAgIDxCdXR0b24gY2xhc3NOYW1lPXtgYnVpay1idG4tcHJpbWFyeSAke2NsYXNzTmFtZX1gfSB7Li4ucmVzdH0+XHJcbiAgICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9CdXR0b24+O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJpbWFyeUJ1dHRvbjtcclxuIl19