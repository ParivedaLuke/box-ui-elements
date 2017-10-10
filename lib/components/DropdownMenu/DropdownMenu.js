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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRyb3Bkb3duTWVudS5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNoaWxkcmVuIiwiY2xvbmVFbGVtZW50IiwiUHVyZUNvbXBvbmVudCIsIlRldGhlckNvbXBvbmVudCIsInVuaXF1ZUlkIiwiRHJvcGRvd25NZW51Iiwic3RhdGUiLCJpbml0aWFsRm9jdXNJbmRleCIsImlzT3BlbiIsImhhbmRsZUJ1dHRvbkNsaWNrIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImNsb3NlTWVudSIsIm9wZW5NZW51QW5kU2V0Rm9jdXNJbmRleCIsImhhbmRsZUJ1dHRvbktleURvd24iLCJrZXkiLCJoYW5kbGVNZW51Q2xvc2UiLCJmb2N1c0J1dHRvbiIsImhhbmRsZURvY3VtZW50Q2xpY2siLCJ0YXJnZXQiLCJtZW51RWwiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibWVudUlkIiwibWVudUJ1dHRvbkVsIiwibWVudUJ1dHRvbklkIiwiY29udGFpbnMiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lcnMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2V0U3RhdGUiLCJmb2N1cyIsInByb3BzIiwiY2hpbGRyZW4iLCJpc1JpZ2h0QWxpZ25lZCIsImNvbnN0cmFpblRvU2Nyb2xsUGFyZW50IiwiY29uc3RyYWluVG9XaW5kb3ciLCJib2R5RWxlbWVudCIsImVsZW1lbnRzIiwidG9BcnJheSIsImxlbmd0aCIsIkVycm9yIiwibWVudUJ1dHRvbiIsIm1lbnUiLCJtZW51QnV0dG9uUHJvcHMiLCJpZCIsIm9uQ2xpY2siLCJvbktleURvd24iLCJtZW51UHJvcHMiLCJvbkNsb3NlIiwiYXR0YWNobWVudCIsInRhcmdldEF0dGFjaG1lbnQiLCJjb25zdHJhaW50cyIsInB1c2giLCJ0byIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7O0FBTUEs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Ozs7RUFuUXNCakQsYTs7QUFBckJHLFksQ0FVS3FELFksR0FBZTtBQUNsQnBCLDZCQUF5QixLQURQO0FBRWxCQyx1QkFBbUIsS0FGRDtBQUdsQkYsb0JBQWdCO0FBSEUsQzs7O0FBNFAxQixlQUFlaEMsWUFBZiIsImZpbGUiOiJEcm9wZG93bk1lbnUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgTG9hZGluZyBJbmRpY2F0b3IgY29tcG9uZW50XHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IENoaWxkcmVuLCBjbG9uZUVsZW1lbnQsIFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBUZXRoZXJDb21wb25lbnQgZnJvbSAncmVhY3QtdGV0aGVyJztcclxuaW1wb3J0IHVuaXF1ZUlkIGZyb20gJ2xvZGFzaC51bmlxdWVpZCc7XHJcbmltcG9ydCAnLi9Ecm9wZG93bk1lbnUuc2Nzcyc7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgY2hpbGRyZW46IGFueSxcclxuICAgIGNvbnN0cmFpblRvU2Nyb2xsUGFyZW50OiBib29sZWFuLFxyXG4gICAgY29uc3RyYWluVG9XaW5kb3c6IGJvb2xlYW4sXHJcbiAgICBpc1JpZ2h0QWxpZ25lZDogYm9vbGVhbixcclxuICAgIGJvZHlFbGVtZW50OiBzdHJpbmcgfCBIVE1MRWxlbWVudFxyXG59O1xyXG5cclxudHlwZSBEZWZhdWx0UHJvcHMgPSB7fFxyXG4gICAgY29uc3RyYWluVG9TY3JvbGxQYXJlbnQ6IGJvb2xlYW4sXHJcbiAgICBjb25zdHJhaW5Ub1dpbmRvdzogYm9vbGVhbixcclxuICAgIGlzUmlnaHRBbGlnbmVkOiBib29sZWFuXHJcbnx9O1xyXG5cclxudHlwZSBTdGF0ZSA9IHtcclxuICAgIGluaXRpYWxGb2N1c0luZGV4OiBudW1iZXIsXHJcbiAgICBpc09wZW46IGJvb2xlYW5cclxufTtcclxuXHJcbmNsYXNzIERyb3Bkb3duTWVudSBleHRlbmRzIFB1cmVDb21wb25lbnQ8RGVmYXVsdFByb3BzLCBQcm9wcywgU3RhdGU+IHtcclxuICAgIHByb3BzOiBQcm9wcztcclxuICAgIHN0YXRlOiBTdGF0ZTtcclxuICAgIG1lbnVJZDogc3RyaW5nO1xyXG4gICAgbWVudUJ1dHRvbklkOiBzdHJpbmc7XHJcbiAgICBzdGF0ZSA9IHtcclxuICAgICAgICBpbml0aWFsRm9jdXNJbmRleDogMCxcclxuICAgICAgICBpc09wZW46IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICAgICAgY29uc3RyYWluVG9TY3JvbGxQYXJlbnQ6IGZhbHNlLFxyXG4gICAgICAgIGNvbnN0cmFpblRvV2luZG93OiBmYWxzZSxcclxuICAgICAgICBpc1JpZ2h0QWxpZ25lZDogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3VudCBoYW5kbGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICB0aGlzLm1lbnVJZCA9IHVuaXF1ZUlkKCdidWlrX21lbnUnKTtcclxuICAgICAgICB0aGlzLm1lbnVCdXR0b25JZCA9IHVuaXF1ZUlkKCdidWlrX21lbnVidXR0b24nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSBoYW5kbGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHM6IFByb3BzLCBwcmV2U3RhdGU6IFN0YXRlKSB7XHJcbiAgICAgICAgaWYgKCFwcmV2U3RhdGUuaXNPcGVuICYmIHRoaXMuc3RhdGUuaXNPcGVuKSB7XHJcbiAgICAgICAgICAgIC8vIFdoZW4gbWVudSBpcyBiZWluZyBvcGVuZWRcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZURvY3VtZW50Q2xpY2ssIHRydWUpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXMuaGFuZGxlRG9jdW1lbnRDbGljaywgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwcmV2U3RhdGUuaXNPcGVuICYmICF0aGlzLnN0YXRlLmlzT3Blbikge1xyXG4gICAgICAgICAgICAvLyBXaGVuIG1lbnUgaXMgYmVpbmcgY2xvc2VkXHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbm1vdW50IGhhbmRsZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNPcGVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICByZW1vdmVFdmVudExpc3RlbmVycygpIHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXMuaGFuZGxlRG9jdW1lbnRDbGljaywgdHJ1ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZURvY3VtZW50Q2xpY2ssIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbnMgdGhlIG1lbnVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgb3Blbk1lbnVBbmRTZXRGb2N1c0luZGV4KGluaXRpYWxGb2N1c0luZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaW5pdGlhbEZvY3VzSW5kZXgsXHJcbiAgICAgICAgICAgIGlzT3BlbjogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvc2VzIHRoZSBtZW51XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGNsb3NlTWVudSgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNPcGVuOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWVudSBidXR0b24gY2xpY2sgaGFuZGxlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmb2N1c0J1dHRvbigpIHtcclxuICAgICAgICAvLyBUaGlzIGJyZWFrcyBlbmNhcHN1bGF0aW9uIGEgYml0LCBidXQgdGhlIG9ubHlcclxuICAgICAgICAvLyBvdGhlciB3YXkgaXMgcGFzc2luZyByZWYgZnVuY3Rpb25zIHRvIHVua25vd24gY2hpbGRyZW4gY29tcG9uZW50c1xyXG4gICAgICAgIGNvbnN0IG1lbnVCdXR0b25FbDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5tZW51QnV0dG9uSWQpO1xyXG4gICAgICAgIGlmIChtZW51QnV0dG9uRWwpIHtcclxuICAgICAgICAgICAgbWVudUJ1dHRvbkVsLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWVudSBidXR0b24gY2xpY2sgaGFuZGxlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBoYW5kbGVCdXR0b25DbGljayA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCB7IGlzT3BlbiB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGlmIChpc09wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZU1lbnUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5NZW51QW5kU2V0Rm9jdXNJbmRleCgwKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogS2V5Ym9hcmQgaGFuZGxlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBoYW5kbGVCdXR0b25LZXlEb3duID0gKGV2ZW50OiBTeW50aGV0aWNLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcclxuICAgICAgICAgICAgY2FzZSAnICc6IC8vIFNwYWNlYmFyXHJcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcclxuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5NZW51QW5kU2V0Rm9jdXNJbmRleCgwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuTWVudUFuZFNldEZvY3VzSW5kZXgoLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb3NlcyB0aGUgbWVudSBhbmQgZm9jdXNlcyB0aGUgbWVudSBidXR0b25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgaGFuZGxlTWVudUNsb3NlID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2xvc2VNZW51KCk7XHJcbiAgICAgICAgdGhpcy5mb2N1c0J1dHRvbigpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb3NlcyB0aGUgbWVudSB3aGVuIGNsaWNrZWQgb3V0c2lkZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBoYW5kbGVEb2N1bWVudENsaWNrID0gKHsgdGFyZ2V0IH06IHsgdGFyZ2V0OiBhbnkgfSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1lbnVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubWVudUlkKTtcclxuICAgICAgICBjb25zdCBtZW51QnV0dG9uRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLm1lbnVCdXR0b25JZCk7XHJcblxyXG4gICAgICAgIC8vIFNvbWUgRE9NIG1hZ2ljIHRvIGdldCBnbG9iYWwgY2xpY2sgaGFuZGxlcnMgdG8gY2xvc2UgbWVudSB3aGVuIG5vdCBpbnRlcmFjdGluZyB3aXRoIG1lbnUgb3IgYXNzb2NpYXRlZCBidXR0b25cclxuICAgICAgICBpZiAobWVudUVsICYmIG1lbnVCdXR0b25FbCAmJiAhbWVudUVsLmNvbnRhaW5zKHRhcmdldCkgJiYgIW1lbnVCdXR0b25FbC5jb250YWlucyh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VNZW51KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgdGhlIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHtFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbiwgaXNSaWdodEFsaWduZWQsIGNvbnN0cmFpblRvU2Nyb2xsUGFyZW50LCBjb25zdHJhaW5Ub1dpbmRvdywgYm9keUVsZW1lbnQgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHsgaXNPcGVuLCBpbml0aWFsRm9jdXNJbmRleCB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBDaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKTtcclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCAhPT0gMikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Ryb3Bkb3duTWVudSBtdXN0IGhhdmUgZXhhY3RseSB0d28gY2hpbGRyZW46IEEgYnV0dG9uIGNvbXBvbmVudCBhbmQgYSA8TWVudT4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1lbnVCdXR0b24gPSBlbGVtZW50c1swXTtcclxuICAgICAgICBjb25zdCBtZW51ID0gZWxlbWVudHNbMV07XHJcblxyXG4gICAgICAgIGNvbnN0IG1lbnVCdXR0b25Qcm9wczogYW55ID0ge1xyXG4gICAgICAgICAgICBpZDogdGhpcy5tZW51QnV0dG9uSWQsXHJcbiAgICAgICAgICAgIGtleTogdGhpcy5tZW51QnV0dG9uSWQsXHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQnV0dG9uQ2xpY2ssIC8vIE5PVEU6IE92ZXJyaWRlcyBidXR0b24ncyBoYW5kbGVyXHJcbiAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5oYW5kbGVCdXR0b25LZXlEb3duLCAvLyBOT1RFOiBPdmVycmlkZXMgYnV0dG9uJ3MgaGFuZGxlclxyXG4gICAgICAgICAgICAnYXJpYS1oYXNwb3B1cCc6ICd0cnVlJyxcclxuICAgICAgICAgICAgJ2FyaWEtZXhwYW5kZWQnOiBpc09wZW4gPyAndHJ1ZScgOiAnZmFsc2UnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQWRkIHRoaXMgb25seSB3aGVuIGl0cyBvcGVuLCBvdGhlcndpc2UgdGhlIG1lbnVJZCBlbGVtZW50IGlzbid0IHJlbmRlcmVkXHJcbiAgICAgICAgaWYgKGlzT3Blbikge1xyXG4gICAgICAgICAgICBtZW51QnV0dG9uUHJvcHNbJ2FyaWEtY29udHJvbHMnXSA9IHRoaXMubWVudUlkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWVudVByb3BzID0ge1xyXG4gICAgICAgICAgICBpZDogdGhpcy5tZW51SWQsXHJcbiAgICAgICAgICAgIGtleTogdGhpcy5tZW51SWQsXHJcbiAgICAgICAgICAgIGluaXRpYWxGb2N1c0luZGV4LFxyXG4gICAgICAgICAgICBvbkNsb3NlOiB0aGlzLmhhbmRsZU1lbnVDbG9zZSxcclxuICAgICAgICAgICAgJ2FyaWEtbGFiZWxsZWRieSc6IHRoaXMubWVudUJ1dHRvbklkXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IGF0dGFjaG1lbnQ6IHN0cmluZyA9ICd0b3AgbGVmdCc7XHJcbiAgICAgICAgbGV0IHRhcmdldEF0dGFjaG1lbnQ6IHN0cmluZyA9ICdib3R0b20gbGVmdCc7XHJcblxyXG4gICAgICAgIGlmIChpc1JpZ2h0QWxpZ25lZCkge1xyXG4gICAgICAgICAgICBhdHRhY2htZW50ID0gJ3RvcCByaWdodCc7XHJcbiAgICAgICAgICAgIHRhcmdldEF0dGFjaG1lbnQgPSAnYm90dG9tIHJpZ2h0JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnN0cmFpbnRzID0gW107XHJcblxyXG4gICAgICAgIGlmIChjb25zdHJhaW5Ub1Njcm9sbFBhcmVudCkge1xyXG4gICAgICAgICAgICBjb25zdHJhaW50cy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRvOiAnc2Nyb2xsUGFyZW50JyxcclxuICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQ6ICd0b2dldGhlcidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY29uc3RyYWluVG9XaW5kb3cpIHtcclxuICAgICAgICAgICAgY29uc3RyYWludHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0bzogJ3dpbmRvdycsXHJcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50OiAndG9nZXRoZXInXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFRldGhlckNvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgYXR0YWNobWVudD17YXR0YWNobWVudH1cclxuICAgICAgICAgICAgICAgIGNsYXNzUHJlZml4PSdidWlrLWRyb3Bkb3duLW1lbnUnXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRBdHRhY2htZW50PXt0YXJnZXRBdHRhY2htZW50fVxyXG4gICAgICAgICAgICAgICAgY29uc3RyYWludHM9e2NvbnN0cmFpbnRzfVxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZD17aXNPcGVufVxyXG4gICAgICAgICAgICAgICAgYm9keUVsZW1lbnQ9e2JvZHlFbGVtZW50fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7Y2xvbmVFbGVtZW50KG1lbnVCdXR0b24sIG1lbnVCdXR0b25Qcm9wcyl9XHJcbiAgICAgICAgICAgICAgICB7aXNPcGVuID8gY2xvbmVFbGVtZW50KG1lbnUsIG1lbnVQcm9wcykgOiBudWxsfVxyXG4gICAgICAgICAgICA8L1RldGhlckNvbXBvbmVudD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEcm9wZG93bk1lbnU7XHJcbiJdfQ==