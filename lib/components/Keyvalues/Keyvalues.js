/**
 * 
 * @file File Key Values Skill Data component
 * @author Box
 */

import React from 'react';


var Keyvalues = function Keyvalues(_ref) {
    var entries = _ref.skill.entries;
    return React.createElement(
        'div',
        { className: 'buik-keyvalues' },
        Array.isArray(entries) && entries.map(function (_ref2, index) {
            var label = _ref2.label,
                text = _ref2.text;
            return !!label && !!text &&
            /* eslint-disable react/no-array-index-key */
            React.createElement(
                'dl',
                { className: 'buik-keyvalue', key: index },
                React.createElement(
                    'dt',
                    null,
                    label
                ),
                React.createElement(
                    'dd',
                    null,
                    text
                )
            );
        }
        /* eslint-enable react/no-array-index-key */
        )
    );
};

export default Keyvalues;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIktleXZhbHVlcy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIktleXZhbHVlcyIsImVudHJpZXMiLCJza2lsbCIsIkFycmF5IiwiaXNBcnJheSIsIm1hcCIsImluZGV4IiwibGFiZWwiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjs7O0FBUUEsSUFBTUMsWUFBWSxTQUFaQSxTQUFZO0FBQUEsUUFBWUMsT0FBWixRQUFHQyxLQUFILENBQVlELE9BQVo7QUFBQSxXQUNkO0FBQUE7QUFBQSxVQUFLLFdBQVUsZ0JBQWY7QUFDS0UsY0FBTUMsT0FBTixDQUFjSCxPQUFkLEtBQ0dBLFFBQVFJLEdBQVIsQ0FDSSxpQkFBa0NDLEtBQWxDO0FBQUEsZ0JBQUdDLEtBQUgsU0FBR0EsS0FBSDtBQUFBLGdCQUFVQyxJQUFWLFNBQVVBLElBQVY7QUFBQSxtQkFDSSxDQUFDLENBQUNELEtBQUYsSUFDQSxDQUFDLENBQUNDLElBREY7QUFFQTtBQUNBO0FBQUE7QUFBQSxrQkFBSSxXQUFVLGVBQWQsRUFBOEIsS0FBS0YsS0FBbkM7QUFDSTtBQUFBO0FBQUE7QUFDS0M7QUFETCxpQkFESjtBQUlJO0FBQUE7QUFBQTtBQUNLQztBQURMO0FBSkosYUFKSjtBQUFBO0FBWUE7QUFiSjtBQUZSLEtBRGM7QUFBQSxDQUFsQjs7QUFvQkEsZUFBZVIsU0FBZiIsImZpbGUiOiJLZXl2YWx1ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgRmlsZSBLZXkgVmFsdWVzIFNraWxsIERhdGEgY29tcG9uZW50XHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHR5cGUgeyBTa2lsbERhdGEsIFNraWxsRGF0YUVudHJ5IH0gZnJvbSAnLi4vLi4vZmxvd1R5cGVzJztcclxuaW1wb3J0ICcuL0tleXZhbHVlcy5zY3NzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBza2lsbDogU2tpbGxEYXRhXHJcbn07XHJcblxyXG5jb25zdCBLZXl2YWx1ZXMgPSAoeyBza2lsbDogeyBlbnRyaWVzIH0gfTogUHJvcHMpID0+XHJcbiAgICA8ZGl2IGNsYXNzTmFtZT0nYnVpay1rZXl2YWx1ZXMnPlxyXG4gICAgICAgIHtBcnJheS5pc0FycmF5KGVudHJpZXMpICYmXHJcbiAgICAgICAgICAgIGVudHJpZXMubWFwKFxyXG4gICAgICAgICAgICAgICAgKHsgbGFiZWwsIHRleHQgfTogU2tpbGxEYXRhRW50cnksIGluZGV4KSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICEhbGFiZWwgJiZcclxuICAgICAgICAgICAgICAgICAgICAhIXRleHQgJiZcclxuICAgICAgICAgICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXkgKi9cclxuICAgICAgICAgICAgICAgICAgICA8ZGwgY2xhc3NOYW1lPSdidWlrLWtleXZhbHVlJyBrZXk9e2luZGV4fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGR0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2R0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kZD5cclxuICAgICAgICAgICAgICAgICAgICA8L2RsPlxyXG4gICAgICAgICAgICAgICAgLyogZXNsaW50LWVuYWJsZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXkgKi9cclxuICAgICAgICAgICAgKX1cclxuICAgIDwvZGl2PjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEtleXZhbHVlcztcclxuIl19