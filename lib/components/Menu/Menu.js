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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lbnUuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQdXJlQ29tcG9uZW50Iiwib21pdCIsInN0b3BQcm9wYWdhdGlvbkFuZFByZXZlbnREZWZhdWx0IiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsIk1lbnUiLCJmb2N1c0luZGV4IiwibWVudUl0ZW1FbHMiLCJoYW5kbGVDbGljayIsInRhcmdldCIsIm1lbnVJdGVtRWwiLCJnZXRNZW51SXRlbUVsRnJvbUV2ZW50VGFyZ2V0IiwiZmlyZU9uQ2xvc2VIYW5kbGVyIiwiaGFuZGxlS2V5RG93biIsImtleSIsImZvY3VzTmV4dEl0ZW0iLCJmb2N1c1ByZXZpb3VzSXRlbSIsImZvY3VzRmlyc3RJdGVtIiwiZm9jdXNMYXN0SXRlbSIsImNsaWNrIiwiaW5pdGlhbEZvY3VzSW5kZXgiLCJwcm9wcyIsInNsaWNlIiwiY2FsbCIsIm1lbnVFbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzZXRUaW1lb3V0Iiwic2V0Rm9jdXMiLCJpIiwibGVuZ3RoIiwiY29udGFpbnMiLCJpbmRleCIsIm51bU1lbnVJdGVtcyIsImZvY3VzIiwib25DbG9zZSIsImNoaWxkcmVuIiwiY2xhc3NOYW1lIiwicmVzdCIsIm1lbnVQcm9wcyIsInJlZiIsInJvbGUiLCJ0YWJJbmRleCIsIm9uQ2xpY2siLCJvbktleURvd24iLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxJQUFnQkMsYUFBaEIsUUFBcUMsT0FBckM7QUFDQSxPQUFPQyxJQUFQLE1BQWlCLGFBQWpCOzs7QUFjQSxTQUFTQyxnQ0FBVCxDQUEwQ0MsS0FBMUMsRUFBd0Q7QUFDcERBLFVBQU1DLGVBQU47QUFDQUQsVUFBTUUsY0FBTjtBQUNIOztJQUVLQyxJOzs7Ozs7Ozs7Ozs7OztzTEFHRkMsVSxHQUFxQixDLFFBQ3JCQyxXLEdBQStCLEUsUUErRy9CQyxXLEdBQWMsaUJBQWlEO0FBQUEs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Q2xCLGlCQUFLQSxRQUFMLENBQWMsS0FBS3JCLFVBQUwsR0FBa0IsQ0FBaEM7QUFDSDs7QUFFRDs7Ozs7Ozs7OzRDQU0wQjtBQUN0QixpQkFBS3FCLFFBQUwsQ0FBYyxLQUFLckIsVUFBTCxHQUFrQixDQUFoQztBQUNIOztBQUVEOzs7Ozs7Ozs7NkNBTTJCO0FBQUEsZ0JBQ2Y0QixPQURlLEdBQ0ksS0FBS2IsS0FEVCxDQUNmYSxPQURlOztBQUV2QixnQkFBSUEsT0FBSixFQUFhO0FBQ1RBO0FBQ0g7QUFDSjs7QUFFRDs7Ozs7Ozs7QUFnQkE7Ozs7Ozs7OztpQ0F5RFM7QUFBQTs7QUFBQSx5QkFDMkMsS0FBS2IsS0FEaEQ7QUFBQSxnQkFDR2MsUUFESCxVQUNHQSxRQURIO0FBQUEsZ0JBQ2FDLFNBRGIsVUFDYUEsU0FEYjtBQUFBLGdCQUMyQkMsSUFEM0I7O0FBR0wsZ0JBQU1DLFlBQVl0QyxLQUFLcUMsSUFBTCxFQUFXLENBQUMsU0FBRCxFQUFZLG1CQUFaLENBQVgsQ0FBbEI7QUFDQUMsc0JBQVVGLFNBQVYsdUJBQXdDQSxTQUF4QztBQUNBRSxzQkFBVUMsR0FBVixHQUFnQixVQUFDQSxHQUFELEVBQVM7QUFDckIsdUJBQUtmLE1BQUwsR0FBY2UsR0FBZDtBQUNILGFBRkQ7QUFHQUQsc0JBQVVFLElBQVYsR0FBaUIsTUFBakI7QUFDQUYsc0JBQVVHLFFBQVYsR0FBcUIsQ0FBQyxDQUF0QjtBQUNBSCxzQkFBVUksT0FBVixHQUFvQixLQUFLbEMsV0FBekI7QUFDQThCLHNCQUFVSyxTQUFWLEdBQXNCLEtBQUs5QixhQUEzQjs7QUFFQSxtQkFDSTtBQUFBO0FBQVF5Qix5QkFBUjtBQUNLSDtBQURMLGFBREo7QUFLSDs7OztFQXhNY3BDLGE7O0FBQWJNLEksQ0FNS3VDLFksR0FBZTtBQUNsQlIsZUFBVztBQURPLEM7OztBQXFNMUIsZUFBZS9CLElBQWYiLCJmaWxlIjoiTWVudS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBNZW51IEl0ZW0gY29tcG9uZW50XHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcclxuaW1wb3J0ICcuL01lbnUuc2Nzcyc7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgY2xhc3NOYW1lOiBzdHJpbmcsXHJcbiAgICBpbml0aWFsRm9jdXNJbmRleD86IG51bWJlcixcclxuICAgIG9uQ2xvc2U/OiBGdW5jdGlvbixcclxuICAgIGNoaWxkcmVuOiBhbnlcclxufTtcclxuXHJcbnR5cGUgRGVmYXVsdFByb3BzID0ge3xcclxuICAgIGNsYXNzTmFtZTogc3RyaW5nXHJcbnx9O1xyXG5cclxuZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uQW5kUHJldmVudERlZmF1bHQoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbn1cclxuXHJcbmNsYXNzIE1lbnUgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PERlZmF1bHRQcm9wcywgUHJvcHMsIHZvaWQ+IHtcclxuICAgIHByb3BzOiBQcm9wcztcclxuICAgIG1lbnVFbDogSFRNTFVMaXN0RWxlbWVudDtcclxuICAgIGZvY3VzSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICBtZW51SXRlbUVsczogSFRNTExJRWxlbWVudFtdID0gW107XHJcblxyXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgICAgICBjbGFzc05hbWU6ICcnXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IHsgaW5pdGlhbEZvY3VzSW5kZXggfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgIC8vIEtlZXAgdHJhY2sgb2YgYWxsIHRoZSB2YWxpZCBtZW51IGl0ZW1zIHRoYXQgd2VyZSByZW5kZXJlZFxyXG4gICAgICAgIC8vIChxdWVyeVNlbGVjdG9yIHNpbmNlIHdlIGRvbid0IHdhbnQgdG8gcGFzcyByZWYgZnVuY3Rpb25zIHRvIGV2ZXJ5IHNpbmdsZSBjaGlsZClcclxuICAgICAgICB0aGlzLm1lbnVJdGVtRWxzID0gW10uc2xpY2UuY2FsbCh0aGlzLm1lbnVFbC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cIm1lbnVpdGVtXCJdOm5vdChbYXJpYS1kaXNhYmxlZF0pJykpO1xyXG5cclxuICAgICAgICAvLyBJZiBhbiBpbml0aWFsRm9jdXNJbmRleCB3YXMgc3BlY2lmaWVkLCBhdHRlbXB0IHRvIHVzZSBpdCB0byBmb2N1c1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbEZvY3VzSW5kZXggPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIC8vIFdlIGRvIHRoaXMgYWZ0ZXIgYSB0aW1lb3V0IHNvIHRoYXQgdGhlIG1lbnUgaXMgcHJvcGVybHkgbW91bnRlZCBiZWZvcmUgd2UgYXR0ZW1wdCB0byBmb2N1cyBpdFxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXMoaW5pdGlhbEZvY3VzSW5kZXgpO1xyXG4gICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWVudUl0ZW1FbEZyb21FdmVudFRhcmdldCh0YXJnZXQ6IEhUTUxMSUVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgbWVudUl0ZW1FbCA9IG51bGw7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tZW51SXRlbUVscy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tZW51SXRlbUVsc1tpXS5jb250YWlucyh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICBtZW51SXRlbUVsID0gdGhpcy5tZW51SXRlbUVsc1tpXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZW51SXRlbUVsO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEZvY3VzKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMubWVudUl0ZW1FbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG51bU1lbnVJdGVtcyA9IHRoaXMubWVudUl0ZW1FbHMubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPj0gbnVtTWVudUl0ZW1zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9jdXNJbmRleCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5mb2N1c0luZGV4ID0gbnVtTWVudUl0ZW1zIC0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmZvY3VzSW5kZXggPSBpbmRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWVudUl0ZW1FbHNbdGhpcy5mb2N1c0luZGV4XS5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9jdXNlcyB0aGUgMXN0IGl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZm9jdXNGaXJzdEl0ZW0oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRGb2N1cygwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvY3VzZXMgdGhlIGxhc3QgaXRlbVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmb2N1c0xhc3RJdGVtKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0Rm9jdXMoLTEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9jdXNlcyB0aGUgbmV4dCBpdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZvY3VzTmV4dEl0ZW0oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmZvY3VzSW5kZXggKyAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvY3VzZXMgdGhlIHByZXZpb3VzIGl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZm9jdXNQcmV2aW91c0l0ZW0oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmZvY3VzSW5kZXggLSAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvY3VzZXMgdGhlIDFzdCBpdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZpcmVPbkNsb3NlSGFuZGxlcigpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB7IG9uQ2xvc2UgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChvbkNsb3NlKSB7XHJcbiAgICAgICAgICAgIG9uQ2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGljayBoYW5kbGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZUNsaWNrID0gKHsgdGFyZ2V0IH06IHsgdGFyZ2V0OiBIVE1MTElFbGVtZW50IH0pOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCBtZW51SXRlbUVsID0gdGhpcy5nZXRNZW51SXRlbUVsRnJvbUV2ZW50VGFyZ2V0KHRhcmdldCk7XHJcblxyXG4gICAgICAgIGlmICghbWVudUl0ZW1FbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmZpcmVPbkNsb3NlSGFuZGxlcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMga2V5IGRvd25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudDogRXZlbnQgJiB7IHRhcmdldDogSFRNTExJRWxlbWVudCwga2V5OiBzdHJpbmcgfSkgPT4ge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XHJcbiAgICAgICAgICAgICAgICBzdG9wUHJvcGFnYXRpb25BbmRQcmV2ZW50RGVmYXVsdChldmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c05leHRJdGVtKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxyXG4gICAgICAgICAgICAgICAgc3RvcFByb3BhZ2F0aW9uQW5kUHJldmVudERlZmF1bHQoZXZlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNQcmV2aW91c0l0ZW0oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnSG9tZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ1BhZ2VVcCc6XHJcbiAgICAgICAgICAgICAgICBzdG9wUHJvcGFnYXRpb25BbmRQcmV2ZW50RGVmYXVsdChldmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c0ZpcnN0SXRlbSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdFbmQnOlxyXG4gICAgICAgICAgICBjYXNlICdQYWdlRG93bic6XHJcbiAgICAgICAgICAgICAgICBzdG9wUHJvcGFnYXRpb25BbmRQcmV2ZW50RGVmYXVsdChldmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c0xhc3RJdGVtKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XHJcbiAgICAgICAgICAgICAgICBzdG9wUHJvcGFnYXRpb25BbmRQcmV2ZW50RGVmYXVsdChldmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlT25DbG9zZUhhbmRsZXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnVGFiJzpcclxuICAgICAgICAgICAgICAgIC8vIERPIE5PVCBQUkVWRU5UIERFRkFVTFQgT1IgU1RPUCBQUk9QQUdBVElPTiAtIFRoaXMgc2hvdWxkIG1vdmUgZm9jdXMgbmF0aXZlbHlcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZU9uQ2xvc2VIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJyAnOiAvLyBTcGFjZWJhclxyXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XHJcbiAgICAgICAgICAgICAgICBzdG9wUHJvcGFnYXRpb25BbmRQcmV2ZW50RGVmYXVsdChldmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUsIC4uLnJlc3QgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICBjb25zdCBtZW51UHJvcHMgPSBvbWl0KHJlc3QsIFsnb25DbG9zZScsICdpbml0aWFsRm9jdXNJbmRleCddKTtcclxuICAgICAgICBtZW51UHJvcHMuY2xhc3NOYW1lID0gYGJ1aWstYXJpYS1tZW51ICR7Y2xhc3NOYW1lfWA7XHJcbiAgICAgICAgbWVudVByb3BzLnJlZiA9IChyZWYpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tZW51RWwgPSByZWY7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBtZW51UHJvcHMucm9sZSA9ICdtZW51JztcclxuICAgICAgICBtZW51UHJvcHMudGFiSW5kZXggPSAtMTtcclxuICAgICAgICBtZW51UHJvcHMub25DbGljayA9IHRoaXMuaGFuZGxlQ2xpY2s7XHJcbiAgICAgICAgbWVudVByb3BzLm9uS2V5RG93biA9IHRoaXMuaGFuZGxlS2V5RG93bjtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHVsIHsuLi5tZW51UHJvcHN9PlxyXG4gICAgICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1lbnU7XHJcbiJdfQ==