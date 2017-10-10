var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * 
 * @file Plain Button component
 * @author Box
 */

import React from 'react';
import Button from './Button';

var PlainButton = function PlainButton(_ref) {
    var children = _ref.children,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        rest = _objectWithoutProperties(_ref, ['children', 'className']);

    return React.createElement(
        Button,
        _extends({ className: 'buik-btn-plain ' + className }, rest),
        children
    );
};

export default PlainButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYWluQnV0dG9uLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQnV0dG9uIiwiUGxhaW5CdXR0b24iLCJjaGlsZHJlbiIsImNsYXNzTmFtZSIsInJlc3QiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsVUFBbkI7O0FBT0EsSUFBTUMsY0FBYyxTQUFkQSxXQUFjO0FBQUEsUUFBR0MsUUFBSCxRQUFHQSxRQUFIO0FBQUEsOEJBQWFDLFNBQWI7QUFBQSxRQUFhQSxTQUFiLGtDQUF5QixFQUF6QjtBQUFBLFFBQWdDQyxJQUFoQzs7QUFBQSxXQUNoQjtBQUFDLGNBQUQ7QUFBQSxtQkFBUSwrQkFBNkJELFNBQXJDLElBQXNEQyxJQUF0RDtBQUNLRjtBQURMLEtBRGdCO0FBQUEsQ0FBcEI7O0FBS0EsZUFBZUQsV0FBZiIsImZpbGUiOiJQbGFpbkJ1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBQbGFpbiBCdXR0b24gY29tcG9uZW50XHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuL0J1dHRvbic7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgY2hpbGRyZW4/OiBhbnksXHJcbiAgICBjbGFzc05hbWU6IHN0cmluZ1xyXG59O1xyXG5cclxuY29uc3QgUGxhaW5CdXR0b24gPSAoeyBjaGlsZHJlbiwgY2xhc3NOYW1lID0gJycsIC4uLnJlc3QgfTogUHJvcHMpID0+XHJcbiAgICA8QnV0dG9uIGNsYXNzTmFtZT17YGJ1aWstYnRuLXBsYWluICR7Y2xhc3NOYW1lfWB9IHsuLi5yZXN0fT5cclxuICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICA8L0J1dHRvbj47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGFpbkJ1dHRvbjtcclxuIl19