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


function stopPropagationAndPreventDefault(event) {
    event.stopPropagation();
    event.preventDefault();
}

var Menu = function (_PureComponent) {
    _inherits(Menu, _PureComponent);

    function Menu() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Menu);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Menu.__proto__ || Object.getPrototypeOf(Menu)).call.apply(_ref, [this].concat(args))), _this), _this.focusIndex = 0, _this.menuItemEls = [], _this.handleClick = function (_ref2) {
            var target = _ref2.target;

            var menuItemEl = _this.getMenuItemElFromEventTarget(target);

            if (!menuItemEl) {
                return;
            }

            _this.fireOnCloseHandler();
        }, _this.handleKeyDown = function (event) {
            switch (event.key) {
                case 'ArrowDown':
                    stopPropagationAndPreventDefault(event);

                    _this.focusNextItem();
                    break;

                case 'ArrowUp':
                    stopPropagationAndPreventDefault(event);

                    _this.focusPreviousItem();
                    break;

                case 'Home':
                case 'PageUp':
                    stopPropagationAndPreventDefault(event);

                    _this.focusFirstItem();
                    break;

                case 'End':
                case 'PageDown':
                    stopPropagationAndPreventDefault(event);

                    _this.focusLastItem();
                    break;

                case 'Escape':
                    stopPropagationAndPreventDefault(event);

                    _this.fireOnCloseHandler();
                    break;

                case 'Tab':
                    // DO NOT PREVENT DEFAULT OR STOP PROPAGATION - This should move focus natively
                    _this.fireOnCloseHandler();
                    break;

                case ' ': // Spacebar
                case 'Enter':
                    stopPropagationAndPreventDefault(event);

                    event.target.click();
                    break;

                default:
                    break;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Menu, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var initialFocusIndex = this.props.initialFocusIndex;

            // Keep track of all the valid menu items that were rendered
            // (querySelector since we don't want to pass ref functions to every single child)

            this.menuItemEls = [].slice.call(this.menuEl.querySelectorAll('[role="menuitem"]:not([aria-disabled])'));

            // If an initialFocusIndex was specified, attempt to use it to focus
            if (typeof initialFocusIndex === 'number') {
                // We do this after a timeout so that the menu is properly mounted before we attempt to focus it
                setTimeout(function () {
                    _this2.setFocus(initialFocusIndex);
                }, 0);
            }
        }
    }, {
        key: 'getMenuItemElFromEventTarget',
        value: function getMenuItemElFromEventTarget(target) {
            var menuItemEl = null;

            for (var i = 0; i < this.menuItemEls.length; i += 1) {
                if (this.menuItemEls[i].contains(target)) {
                    menuItemEl = this.menuItemEls[i];
                    break;
                }
            }
            return menuItemEl;
        }
    }, {
        key: 'setFocus',
        value: function setFocus(index) {
            if (!this.menuItemEls.length) {
                return;
            }

            var numMenuItems = this.menuItemEls.length;

            if (index >= numMenuItems) {
                this.focusIndex = 0;
            } else if (index < 0) {
                this.focusIndex = numMenuItems - 1;
            } else {
                this.focusIndex = index;
            }

            this.menuItemEls[this.focusIndex].focus();
        }

        /**
         * Focuses the 1st item
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'focusFirstItem',
        value: function focusFirstItem() {
            this.setFocus(0);
        }

        /**
         * Focuses the last item
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'focusLastItem',
        value: function focusLastItem() {
            this.setFocus(-1);
        }

        /**
         * Focuses the next item
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'focusNextItem',
        value: function focusNextItem() {
            this.setFocus(this.focusIndex + 1);
        }

        /**
         * Focuses the previous item
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'focusPreviousItem',
        value: function focusPreviousItem() {
            this.setFocus(this.focusIndex - 1);
        }

        /**
         * Focuses the 1st item
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'fireOnCloseHandler',
        value: function fireOnCloseHandler() {
            var onClose = this.props.onClose;

            if (onClose) {
                onClose();
            }
        }

        /**
         * Click handler
         *
         * @private
         * @return {void}
         */


        /**
         * Handles key down
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                children = _props.children,
                className = _props.className,
                rest = _objectWithoutProperties(_props, ['children', 'className']);

            var menuProps = omit(rest, ['onClose', 'initialFocusIndex']);
            menuProps.className = 'buik-aria-menu ' + className;
            menuProps.ref = function (ref) {
                _this3.menuEl = ref;
            };
            menuProps.role = 'menu';
            menuProps.tabIndex = -1;
            menuProps.onClick = this.handleClick;
            menuProps.onKeyDown = this.handleKeyDown;

            return React.createElement(
                'ul',
                menuProps,
                children
            );
        }
    }]);

    return Menu;
}(PureComponent);

Menu.defaultProps = {
    className: ''
};


export default Menu;