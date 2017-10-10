var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Menu Item component
 * @author Box
 */

import React, { PureComponent } from 'react';
import omit from 'lodash.omit';

var MenuItem = function (_PureComponent) {
    _inherits(MenuItem, _PureComponent);

    function MenuItem() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, MenuItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call.apply(_ref, [this].concat(args))), _this), _this.onClickHandler = function (event) {
            var _this$props = _this.props,
                isDisabled = _this$props.isDisabled,
                onClick = _this$props.onClick;

            // If aria-disabled is passed as a prop, we should ignore clicks on this menu item

            if (isDisabled) {
                event.stopPropagation();
                event.preventDefault();
                return;
            }

            if (onClick) {
                onClick(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(MenuItem, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                isDisabled = _props.isDisabled,
                rest = _objectWithoutProperties(_props, ['children', 'isDisabled']);

            var menuItemProps = omit(rest, ['role', 'tabIndex', 'onClick']);

            menuItemProps.role = 'menuitem';
            menuItemProps.tabIndex = -1;
            menuItemProps.onClick = this.onClickHandler;

            if (isDisabled) {
                menuItemProps['aria-disabled'] = 'true';
            }

            return React.createElement(
                'li',
                menuItemProps,
                children
            );
        }
    }]);

    return MenuItem;
}(PureComponent);

export default MenuItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lbnVJdGVtLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsIm9taXQiLCJNZW51SXRlbSIsIm9uQ2xpY2tIYW5kbGVyIiwiZXZlbnQiLCJwcm9wcyIsImlzRGlzYWJsZWQiLCJvbkNsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJjaGlsZHJlbiIsInJlc3QiLCJtZW51SXRlbVByb3BzIiwicm9sZSIsInRhYkluZGV4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsSUFBZ0JDLGFBQWhCLFFBQXFDLE9BQXJDO0FBQ0EsT0FBT0MsSUFBUCxNQUFpQixhQUFqQjs7SUFRTUMsUTs7Ozs7Ozs7Ozs7Ozs7OExBR0ZDLGMsR0FBaUIsVUFBQ0MsS0FBRCxFQUFrQjtBQUFBLDhCQUNDLE1BQUtDLEtBRE47QUFBQSxnQkFDdkJDLFVBRHVCLGVBQ3ZCQSxVQUR1QjtBQUFBLGdCQUNYQyxPQURXLGVBQ1hBLE9BRFc7O0FBRy9COztBQUNBLGdCQUFJRCxVQUFKLEVBQWdCO0FBQ1pGLHNCQUFNSSxlQUFOO0FBQ0FKLHNCQUFNSyxjQUFOO0FBQ0E7QUFDSDs7QUFFRCxnQkFBSUYsT0FBSixFQUFhO0FBQ1RBLHdCQUFRSCxLQUFSO0FBQ0g7QUFDSixTOzs7OztpQ0FFUTtBQUFBLHlCQUM0QyxLQUFLQyxLQURqRDtBQUFBLGdCQUNHSyxRQURILFVBQ0dBLFFBREg7QUFBQSxnQkFDYUosVUFEYixVQUNhQSxVQURiO0FBQUEsZ0JBQzRCSyxJQUQ1Qjs7QUFFTCxnQkFBTUMsZ0JBQWdCWCxLQUFLVSxJQUFMLEVBQVcsQ0FBQyxNQUFELEVBQVMsVUFBVCxFQUFxQixTQUFyQixDQUFYLENBQXRCOztBQUVBQywwQkFBY0MsSUFBZCxHQUFxQixVQUFyQjtBQUNBRCwwQkFBY0UsUUFBZCxHQUF5QixDQUFDLENBQTFCO0FBQ0FGLDBCQUFjTCxPQUFkLEdBQXdCLEtBQUtKLGNBQTdCOztBQUVBLGdCQUFJRyxVQUFKLEVBQWdCO0FBQ1pNLDhCQUFjLGVBQWQsSUFBaUMsTUFBakM7QUFDSDs7QUFFRCxtQkFDSTtBQUFBO0FBQVFBLDZCQUFSO0FBQ0tGO0FBREwsYUFESjtBQUtIOzs7O0VBbkNrQlYsYTs7QUFzQ3ZCLGVBQWVFLFFBQWYiLCJmaWxlIjoiTWVudUl0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgTWVudSBJdGVtIGNvbXBvbmVudFxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgaXNEaXNhYmxlZD86IGJvb2xlYW4sXHJcbiAgICBvbkNsaWNrPzogRnVuY3Rpb24sXHJcbiAgICBjaGlsZHJlbjogYW55XHJcbn07XHJcblxyXG5jbGFzcyBNZW51SXRlbSBleHRlbmRzIFB1cmVDb21wb25lbnQ8dm9pZCwgUHJvcHMsIHZvaWQ+IHtcclxuICAgIHByb3BzOiBQcm9wcztcclxuXHJcbiAgICBvbkNsaWNrSGFuZGxlciA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCB7IGlzRGlzYWJsZWQsIG9uQ2xpY2sgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgIC8vIElmIGFyaWEtZGlzYWJsZWQgaXMgcGFzc2VkIGFzIGEgcHJvcCwgd2Ugc2hvdWxkIGlnbm9yZSBjbGlja3Mgb24gdGhpcyBtZW51IGl0ZW1cclxuICAgICAgICBpZiAoaXNEaXNhYmxlZCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9uQ2xpY2spIHtcclxuICAgICAgICAgICAgb25DbGljayhldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbiwgaXNEaXNhYmxlZCwgLi4ucmVzdCB9OiBQcm9wcyA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgbWVudUl0ZW1Qcm9wcyA9IG9taXQocmVzdCwgWydyb2xlJywgJ3RhYkluZGV4JywgJ29uQ2xpY2snXSk7XHJcblxyXG4gICAgICAgIG1lbnVJdGVtUHJvcHMucm9sZSA9ICdtZW51aXRlbSc7XHJcbiAgICAgICAgbWVudUl0ZW1Qcm9wcy50YWJJbmRleCA9IC0xO1xyXG4gICAgICAgIG1lbnVJdGVtUHJvcHMub25DbGljayA9IHRoaXMub25DbGlja0hhbmRsZXI7XHJcblxyXG4gICAgICAgIGlmIChpc0Rpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIG1lbnVJdGVtUHJvcHNbJ2FyaWEtZGlzYWJsZWQnXSA9ICd0cnVlJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxsaSB7Li4ubWVudUl0ZW1Qcm9wc30+XHJcbiAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWVudUl0ZW07XHJcbiJdfQ==