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