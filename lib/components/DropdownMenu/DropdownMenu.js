var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Loading Indicator component
 * @author Box
 */

import React, { Children, cloneElement, PureComponent } from 'react';
import TetherComponent from 'react-tether';
import uniqueId from 'lodash.uniqueid';

var DropdownMenu = function (_PureComponent) {
    _inherits(DropdownMenu, _PureComponent);

    function DropdownMenu() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DropdownMenu);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            initialFocusIndex: 0,
            isOpen: false
        }, _this.handleButtonClick = function (event) {
            var isOpen = _this.state.isOpen;


            event.stopPropagation();
            event.preventDefault();

            if (isOpen) {
                _this.closeMenu();
            } else {
                _this.openMenuAndSetFocusIndex(0);
            }
        }, _this.handleButtonKeyDown = function (event) {
            switch (event.key) {
                case ' ': // Spacebar
                case 'Enter':
                case 'ArrowDown':
                    event.stopPropagation();
                    event.preventDefault();

                    _this.openMenuAndSetFocusIndex(0);
                    break;

                case 'ArrowUp':
                    event.stopPropagation();
                    event.preventDefault();

                    _this.openMenuAndSetFocusIndex(-1);
                    break;

                default:
                    break;
            }
        }, _this.handleMenuClose = function () {
            _this.closeMenu();
            _this.focusButton();
        }, _this.handleDocumentClick = function (_ref2) {
            var target = _ref2.target;

            var menuEl = document.getElementById(_this.menuId);
            var menuButtonEl = document.getElementById(_this.menuButtonId);

            // Some DOM magic to get global click handlers to close menu when not interacting with menu or associated button
            if (menuEl && menuButtonEl && !menuEl.contains(target) && !menuButtonEl.contains(target)) {
                _this.closeMenu();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DropdownMenu, [{
        key: 'componentWillMount',


        /**
         * Mount handler
         *
         * @private
         * @return {void}
         */
        value: function componentWillMount() {
            this.menuId = uniqueId('buik_menu');
            this.menuButtonId = uniqueId('buik_menubutton');
        }

        /**
         * Update handler
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (!prevState.isOpen && this.state.isOpen) {
                // When menu is being opened
                document.addEventListener('click', this.handleDocumentClick, true);
                document.addEventListener('contextmenu', this.handleDocumentClick, true);
            } else if (prevState.isOpen && !this.state.isOpen) {
                // When menu is being closed
                this.removeEventListeners();
            }
        }

        /**
         * Unmount handler
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.state.isOpen) {
                this.removeEventListeners();
            }
        }

        /**
         * Removes event listeners
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'removeEventListeners',
        value: function removeEventListeners() {
            document.removeEventListener('contextmenu', this.handleDocumentClick, true);
            document.removeEventListener('click', this.handleDocumentClick, true);
        }

        /**
         * Opens the menu
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'openMenuAndSetFocusIndex',
        value: function openMenuAndSetFocusIndex(initialFocusIndex) {
            this.setState({
                initialFocusIndex: initialFocusIndex,
                isOpen: true
            });
        }

        /**
         * Closes the menu
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'closeMenu',
        value: function closeMenu() {
            this.setState({
                isOpen: false
            });
        }

        /**
         * Menu button click handler
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'focusButton',
        value: function focusButton() {
            // This breaks encapsulation a bit, but the only
            var menuButtonEl = document.getElementById(this.menuButtonId);
            if (menuButtonEl) {
                menuButtonEl.focus();
            }
        }

        /**
         * Menu button click handler
         *
         * @private
         * @return {void}
         */


        /**
         * Keyboard handler
         *
         * @private
         * @return {void}
         */


        /**
         * Closes the menu and focuses the menu button
         *
         * @private
         * @return {void}
         */


        /**
         * Closes the menu when clicked outside
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'render',


        /**
         * Renders the component
         *
         * @private
         * @return {Element}
         */
        value: function render() {
            var _props = this.props,
                children = _props.children,
                isRightAligned = _props.isRightAligned,
                constrainToScrollParent = _props.constrainToScrollParent,
                constrainToWindow = _props.constrainToWindow,
                bodyElement = _props.bodyElement;
            var _state = this.state,
                isOpen = _state.isOpen,
                initialFocusIndex = _state.initialFocusIndex;

            var elements = Children.toArray(children);

            if (elements.length !== 2) {
                throw new Error('DropdownMenu must have exactly two children: A button component and a <Menu>');
            }

            var menuButton = elements[0];
            var menu = elements[1];

            var menuButtonProps = {
                id: this.menuButtonId,
                key: this.menuButtonId,
                onClick: this.handleButtonClick, // NOTE: Overrides button's handler
                onKeyDown: this.handleButtonKeyDown, // NOTE: Overrides button's handler
                'aria-haspopup': 'true',
                'aria-expanded': isOpen ? 'true' : 'false'
            };

            // Add this only when its open, otherwise the menuId element isn't rendered
            if (isOpen) {
                menuButtonProps['aria-controls'] = this.menuId;
            }

            var menuProps = {
                id: this.menuId,
                key: this.menuId,
                initialFocusIndex: initialFocusIndex,
                onClose: this.handleMenuClose,
                'aria-labelledby': this.menuButtonId
            };

            var attachment = 'top left';
            var targetAttachment = 'bottom left';

            if (isRightAligned) {
                attachment = 'top right';
                targetAttachment = 'bottom right';
            }

            var constraints = [];

            if (constrainToScrollParent) {
                constraints.push({
                    to: 'scrollParent',
                    attachment: 'together'
                });
            }

            if (constrainToWindow) {
                constraints.push({
                    to: 'window',
                    attachment: 'together'
                });
            }

            return React.createElement(
                TetherComponent,
                {
                    attachment: attachment,
                    classPrefix: 'buik-dropdown-menu',
                    targetAttachment: targetAttachment,
                    constraints: constraints,
                    enabled: isOpen,
                    bodyElement: bodyElement
                },
                cloneElement(menuButton, menuButtonProps),
                isOpen ? cloneElement(menu, menuProps) : null
            );
        }
    }]);

    return DropdownMenu;
}(PureComponent);

DropdownMenu.defaultProps = {
    constrainToScrollParent: false,
    constrainToWindow: false,
    isRightAligned: false
};


export default DropdownMenu;