var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Preview sidebar section component
 * @author Box
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { PlainButton } from '../Button';

var SidebarSection = function (_PureComponent) {
    _inherits(SidebarSection, _PureComponent);

    /**
     * [constructor]
     *
     * @private
     * @return {ContentPreview}
     */
    function SidebarSection(props) {
        _classCallCheck(this, SidebarSection);

        var _this = _possibleConstructorReturn(this, (SidebarSection.__proto__ || Object.getPrototypeOf(SidebarSection)).call(this, props));

        _this.toggleVisibility = function () {
            _this.setState(function (prevState) {
                return {
                    isOpen: !prevState.isOpen
                };
            });
        };

        _this.state = {
            isOpen: props.isOpen
        };
        return _this;
    }

    /**
     * Click handler for toggling the section
     *
     * @private
     * @param {Event} event - click event
     * @return {void}
     */


    _createClass(SidebarSection, [{
        key: 'render',


        /**
         * Renders the section
         *
         * @private
         * @inheritdoc
         * @return {void}
         */
        value: function render() {
            var isOpen = this.state.isOpen;
            var _props = this.props,
                children = _props.children,
                className = _props.className,
                title = _props.title;


            var sectionClassName = classNames('bcpr-sidebar-section', {
                'bcpr-sidebar-section-open': isOpen
            }, className);

            return React.createElement(
                'div',
                { className: sectionClassName },
                React.createElement(
                    PlainButton,
                    { onClick: this.toggleVisibility, className: 'bcpr-sidebar-section-title' },
                    React.createElement(
                        'h4',
                        { className: 'bcpr-sidebar-section-title-text' },
                        title
                    )
                ),
                isOpen && React.createElement(
                    'div',
                    { className: 'bcpr-sidebar-section-content' },
                    children
                )
            );
        }
    }]);

    return SidebarSection;
}(PureComponent);

SidebarSection.defaultProps = {
    className: '',
    isOpen: true
};


export default SidebarSection;