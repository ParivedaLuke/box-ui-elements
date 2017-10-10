function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * 
 * @file Menu Link Item component
 * @author Box
 */

import React, { cloneElement, Children } from 'react';
import omit from 'lodash.omit';

var MenuLinkItem = function MenuLinkItem(_ref) {
    var children = _ref.children,
        rest = _objectWithoutProperties(_ref, ['children']);

    var linkEl = Children.only(children);

    var listItemProps = omit(rest, ['role', 'tabIndex']);
    listItemProps.role = 'none';

    var linkProps = {
        role: 'menuitem',
        tabIndex: -1
    };

    return React.createElement(
        'li',
        listItemProps,
        cloneElement(linkEl, linkProps)
    );
};

export default MenuLinkItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lbnVMaW5rSXRlbS5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsImNsb25lRWxlbWVudCIsIkNoaWxkcmVuIiwib21pdCIsIk1lbnVMaW5rSXRlbSIsImNoaWxkcmVuIiwicmVzdCIsImxpbmtFbCIsIm9ubHkiLCJsaXN0SXRlbVByb3BzIiwicm9sZSIsImxpbmtQcm9wcyIsInRhYkluZGV4Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7QUFNQSxPQUFPQSxLQUFQLElBQWdCQyxZQUFoQixFQUE4QkMsUUFBOUIsUUFBOEMsT0FBOUM7QUFDQSxPQUFPQyxJQUFQLE1BQWlCLGFBQWpCOztBQU1BLElBQU1DLGVBQWUsU0FBZkEsWUFBZSxPQUFrQztBQUFBLFFBQS9CQyxRQUErQixRQUEvQkEsUUFBK0I7QUFBQSxRQUFsQkMsSUFBa0I7O0FBQ25ELFFBQU1DLFNBQVNMLFNBQVNNLElBQVQsQ0FBY0gsUUFBZCxDQUFmOztBQUVBLFFBQU1JLGdCQUFnQk4sS0FBS0csSUFBTCxFQUFXLENBQUMsTUFBRCxFQUFTLFVBQVQsQ0FBWCxDQUF0QjtBQUNBRyxrQkFBY0MsSUFBZCxHQUFxQixNQUFyQjs7QUFFQSxRQUFNQyxZQUFZO0FBQ2RELGNBQU0sVUFEUTtBQUVkRSxrQkFBVSxDQUFDO0FBRkcsS0FBbEI7O0FBS0EsV0FDSTtBQUFBO0FBQVFILHFCQUFSO0FBQ0tSLHFCQUFhTSxNQUFiLEVBQXFCSSxTQUFyQjtBQURMLEtBREo7QUFLSCxDQWhCRDs7QUFrQkEsZUFBZVAsWUFBZiIsImZpbGUiOiJNZW51TGlua0l0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgTWVudSBMaW5rIEl0ZW0gY29tcG9uZW50XHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IGNsb25lRWxlbWVudCwgQ2hpbGRyZW4gfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBjaGlsZHJlbjogYW55XHJcbn07XHJcblxyXG5jb25zdCBNZW51TGlua0l0ZW0gPSAoeyBjaGlsZHJlbiwgLi4ucmVzdCB9OiBQcm9wcykgPT4ge1xyXG4gICAgY29uc3QgbGlua0VsID0gQ2hpbGRyZW4ub25seShjaGlsZHJlbik7XHJcblxyXG4gICAgY29uc3QgbGlzdEl0ZW1Qcm9wcyA9IG9taXQocmVzdCwgWydyb2xlJywgJ3RhYkluZGV4J10pO1xyXG4gICAgbGlzdEl0ZW1Qcm9wcy5yb2xlID0gJ25vbmUnO1xyXG5cclxuICAgIGNvbnN0IGxpbmtQcm9wcyA9IHtcclxuICAgICAgICByb2xlOiAnbWVudWl0ZW0nLFxyXG4gICAgICAgIHRhYkluZGV4OiAtMVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxsaSB7Li4ubGlzdEl0ZW1Qcm9wc30+XHJcbiAgICAgICAgICAgIHtjbG9uZUVsZW1lbnQobGlua0VsLCBsaW5rUHJvcHMpfVxyXG4gICAgICAgIDwvbGk+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWVudUxpbmtJdGVtO1xyXG4iXX0=