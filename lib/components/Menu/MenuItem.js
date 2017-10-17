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