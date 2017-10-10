var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Button component
 * @author Box
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import omit from 'lodash.omit';
import LoadingIndicator from '../LoadingIndicator';
import { CLASS_BUTTON_CONTENT_SPAN } from '../../constants';

var Button = function (_PureComponent) {
    _inherits(Button, _PureComponent);

    function Button() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Button);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
            var _this$props = _this.props,
                isDisabled = _this$props.isDisabled,
                onClick = _this$props.onClick;
            var currentTarget = event.currentTarget;

            if (isDisabled || currentTarget.classList.contains('buik-btn-is-disabled')) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            if (onClick) {
                onClick(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * Click handler for the button
     *
     * @private
     * @param {Event} event - click event
     * @return {void}
     */


    _createClass(Button, [{
        key: 'render',


        /**
         * Renders the button
         *
         * @private
         * @return {void}
         */
        value: function render() {
            var _props = this.props,
                children = _props.children,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                isDisabled = _props.isDisabled,
                _props$isLoading = _props.isLoading,
                isLoading = _props$isLoading === undefined ? false : _props$isLoading,
                isSelected = _props.isSelected,
                type = _props.type,
                rest = _objectWithoutProperties(_props, ['children', 'className', 'isDisabled', 'isLoading', 'isSelected', 'type']);

            var buttonProps = omit(rest, ['onClick']);
            if (isDisabled) {
                buttonProps['aria-disabled'] = true;
            }

            var styleClassName = classNames('buik-btn', {
                'buik-btn-is-disabled': isDisabled,
                'buik-btn-is-loading': isLoading,
                'buik-btn-is-selected': isSelected
            }, className);

            return React.createElement(
                'button',
                _extends({ className: styleClassName, type: type, onClick: this.handleClick }, buttonProps),
                React.createElement(
                    'span',
                    { className: CLASS_BUTTON_CONTENT_SPAN },
                    children
                ),
                isLoading && React.createElement(LoadingIndicator, { className: 'buik-btn-loading-indicator' })
            );
        }
    }]);

    return Button;
}(PureComponent);

Button.defaultProps = {
    type: 'button'
};


export default Button;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJ1dHRvbi5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJjbGFzc05hbWVzIiwib21pdCIsIkxvYWRpbmdJbmRpY2F0b3IiLCJDTEFTU19CVVRUT05fQ09OVEVOVF9TUEFOIiwiQnV0dG9uIiwiaGFuZGxlQ2xpY2siLCJldmVudCIsInByb3BzIiwiaXNEaXNhYmxlZCIsIm9uQ2xpY2siLCJjdXJyZW50VGFyZ2V0IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsImNoaWxkcmVuIiwiY2xhc3NOYW1lIiwiaXNMb2FkaW5nIiwiaXNTZWxlY3RlZCIsInR5cGUiLCJyZXN0IiwiYnV0dG9uUHJvcHMiLCJzdHlsZUNsYXNzTmFtZSIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsSUFBZ0JDLGFBQWhCLFFBQXFDLE9BQXJDO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixZQUF2QjtBQUNBLE9BQU9DLElBQVAsTUFBaUIsYUFBakI7QUFDQSxPQUFPQyxnQkFBUCxNQUE2QixxQkFBN0I7QUFDQSxTQUFTQyx5QkFBVCxRQUEwQyxpQkFBMUM7O0lBbUJNQyxNOzs7Ozs7Ozs7Ozs7OzswTEFjRkMsVyxHQUFjLFVBQUNDLEtBQUQsRUFBeUQ7QUFBQSw4QkFDNUIsTUFBS0MsS0FEdUI7QUFBQSxnQkFDM0RDLFVBRDJELGVBQzNEQSxVQUQyRDtBQUFBLGdCQUMvQ0MsT0FEK0MsZUFDL0NBLE9BRCtDO0FBQUEsZ0JBRTNEQyxhQUYyRCxHQUV6Q0osS0FGeUMsQ0FFM0RJLGFBRjJEOztBQUduRSxnQkFBSUYsY0FBY0UsY0FBY0MsU0FBZCxDQUF3QkMsUUFBeEIsQ0FBaUMsc0JBQWpDLENBQWxCLEVBQTRFO0FBQ3hFTixzQkFBTU8sY0FBTjtBQUNBUCxzQkFBTVEsZUFBTjtBQUNBO0FBQ0g7QUFDRCxnQkFBSUwsT0FBSixFQUFhO0FBQ1RBLHdCQUFRSCxLQUFSO0FBQ0g7QUFDSixTOzs7QUFsQkQ7Ozs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7OztpQ0FNUztBQUFBLHlCQVNNLEtBQUtDLEtBVFg7QUFBQSxnQkFFRFEsUUFGQyxVQUVEQSxRQUZDO0FBQUEsMENBR0RDLFNBSEM7QUFBQSxnQkFHREEsU0FIQyxvQ0FHVyxFQUhYO0FBQUEsZ0JBSURSLFVBSkMsVUFJREEsVUFKQztBQUFBLDBDQUtEUyxTQUxDO0FBQUEsZ0JBS0RBLFNBTEMsb0NBS1csS0FMWDtBQUFBLGdCQU1EQyxVQU5DLFVBTURBLFVBTkM7QUFBQSxnQkFPREMsSUFQQyxVQU9EQSxJQVBDO0FBQUEsZ0JBUUVDLElBUkY7O0FBV0wsZ0JBQU1DLGNBQWNwQixLQUFLbUIsSUFBTCxFQUFXLENBQUMsU0FBRCxDQUFYLENBQXBCO0FBQ0EsZ0JBQUlaLFVBQUosRUFBZ0I7QUFDWmEsNEJBQVksZUFBWixJQUErQixJQUEvQjtBQUNIOztBQUVELGdCQUFNQyxpQkFBaUJ0QixXQUNuQixVQURtQixFQUVuQjtBQUNJLHdDQUF3QlEsVUFENUI7QUFFSSx1Q0FBdUJTLFNBRjNCO0FBR0ksd0NBQXdCQztBQUg1QixhQUZtQixFQU9uQkYsU0FQbUIsQ0FBdkI7O0FBVUEsbUJBQ0k7QUFBQTtBQUFBLDJCQUFRLFdBQVdNLGNBQW5CLEVBQW1DLE1BQU1ILElBQXpDLEVBQStDLFNBQVMsS0FBS2QsV0FBN0QsSUFBOEVnQixXQUE5RTtBQUNJO0FBQUE7QUFBQSxzQkFBTSxXQUFXbEIseUJBQWpCO0FBQ0tZO0FBREwsaUJBREo7QUFJS0UsNkJBQWEsb0JBQUMsZ0JBQUQsSUFBa0IsV0FBVSw0QkFBNUI7QUFKbEIsYUFESjtBQVFIOzs7O0VBbkVnQmxCLGE7O0FBQWZLLE0sQ0FHS21CLFksR0FBZTtBQUNsQkosVUFBTTtBQURZLEM7OztBQW1FMUIsZUFBZWYsTUFBZiIsImZpbGUiOiJCdXR0b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgQnV0dG9uIGNvbXBvbmVudFxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xyXG5pbXBvcnQgTG9hZGluZ0luZGljYXRvciBmcm9tICcuLi9Mb2FkaW5nSW5kaWNhdG9yJztcclxuaW1wb3J0IHsgQ0xBU1NfQlVUVE9OX0NPTlRFTlRfU1BBTiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCAnLi9CdXR0b24uc2Nzcyc7XHJcblxyXG50eXBlIEJ1dHRvblR5cGUgPSAnYnV0dG9uJyB8ICdyZXNldCcgfCAnc3VibWl0JztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBjaGlsZHJlbj86IGFueSxcclxuICAgIGNsYXNzTmFtZT86IHN0cmluZyxcclxuICAgIGlzRGlzYWJsZWQ/OiBib29sZWFuLFxyXG4gICAgaXNMb2FkaW5nPzogYm9vbGVhbixcclxuICAgIGlzU2VsZWN0ZWQ/OiBib29sZWFuLFxyXG4gICAgb25DbGljaz86IEZ1bmN0aW9uLFxyXG4gICAgdHlwZTogQnV0dG9uVHlwZVxyXG59O1xyXG5cclxudHlwZSBEZWZhdWx0UHJvcHMgPSB7fFxyXG4gICAgdHlwZTogQnV0dG9uVHlwZVxyXG58fTtcclxuXHJcbmNsYXNzIEJ1dHRvbiBleHRlbmRzIFB1cmVDb21wb25lbnQ8RGVmYXVsdFByb3BzLCBQcm9wcywgdm9pZD4ge1xyXG4gICAgcHJvcHM6IFByb3BzO1xyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICAgICAgdHlwZTogJ2J1dHRvbidcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGljayBoYW5kbGVyIGZvciB0aGUgYnV0dG9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gY2xpY2sgZXZlbnRcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50OiBFdmVudCAmIHsgY3VycmVudFRhcmdldDogSFRNTEJ1dHRvbkVsZW1lbnQgfSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgaXNEaXNhYmxlZCwgb25DbGljayB9OiBQcm9wcyA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VGFyZ2V0IH0gPSBldmVudDtcclxuICAgICAgICBpZiAoaXNEaXNhYmxlZCB8fCBjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYnVpay1idG4taXMtZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob25DbGljaykge1xyXG4gICAgICAgICAgICBvbkNsaWNrKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyB0aGUgYnV0dG9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuLFxyXG4gICAgICAgICAgICBjbGFzc05hbWUgPSAnJyxcclxuICAgICAgICAgICAgaXNEaXNhYmxlZCxcclxuICAgICAgICAgICAgaXNMb2FkaW5nID0gZmFsc2UsXHJcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQsXHJcbiAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgIC4uLnJlc3RcclxuICAgICAgICB9OiBQcm9wcyA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ1dHRvblByb3BzID0gb21pdChyZXN0LCBbJ29uQ2xpY2snXSk7XHJcbiAgICAgICAgaWYgKGlzRGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgYnV0dG9uUHJvcHNbJ2FyaWEtZGlzYWJsZWQnXSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzdHlsZUNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICdidWlrLWJ0bicsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICdidWlrLWJ0bi1pcy1kaXNhYmxlZCc6IGlzRGlzYWJsZWQsXHJcbiAgICAgICAgICAgICAgICAnYnVpay1idG4taXMtbG9hZGluZyc6IGlzTG9hZGluZyxcclxuICAgICAgICAgICAgICAgICdidWlrLWJ0bi1pcy1zZWxlY3RlZCc6IGlzU2VsZWN0ZWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xhc3NOYW1lXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e3N0eWxlQ2xhc3NOYW1lfSB0eXBlPXt0eXBlfSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSB7Li4uYnV0dG9uUHJvcHN9PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtDTEFTU19CVVRUT05fQ09OVEVOVF9TUEFOfT5cclxuICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICB7aXNMb2FkaW5nICYmIDxMb2FkaW5nSW5kaWNhdG9yIGNsYXNzTmFtZT0nYnVpay1idG4tbG9hZGluZy1pbmRpY2F0b3InIC8+fVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b247XHJcbiJdfQ==