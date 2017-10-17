var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Preview sidebar component
 * @author Box
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import DetailsSidebar from './DetailsSidebar';
import IconComments from '../icons/IconComments';
import IconTasks from '../icons/IconTasks';
import IconVersions from '../icons/IconVersions';
import IconApps from '../icons/IconApps';
import IconDetails from '../icons/IconDetails';
import { PlainButton } from '../Button';
import { BOX_BLUE } from '../../constants';

var Sidebar = function (_PureComponent) {
    _inherits(Sidebar, _PureComponent);

    /**
     * [constructor]
     *
     * @private
     * @return {Sidebar}
     */
    function Sidebar(props) {
        _classCallCheck(this, Sidebar);

        var _this = _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));

        _this.toggleSidebar = function () {
            _this.setState(function (prevState) {
                return {
                    showSidebar: !prevState.showSidebar
                };
            });
        };

        _this.state = {
            showSidebar: true
        };
        return _this;
    }

    /**
     * Handles showing or hiding of hasSidebar
     *
     * @private
     * @return {void}
     */


    _createClass(Sidebar, [{
        key: 'render',


        /**
         * Renders the sidebar
         *
         * @inheritdoc
         */
        value: function render() {
            var _props = this.props,
                file = _props.file,
                getPreviewer = _props.getPreviewer,
                getLocalizedMessage = _props.getLocalizedMessage;
            var showSidebar = this.state.showSidebar;

            var sidebarTitle = getLocalizedMessage('buik.preview.sidebar.details.title');

            var sidebarClassName = classNames('bcpr-sidebar', {
                'bcpr-sidebar-visible': showSidebar
            });

            var sidebarBtnClassName = classNames({
                'bcpr-sidebar-btn-selected': showSidebar
            });

            return React.createElement(
                'div',
                { className: sidebarClassName },
                React.createElement(
                    'div',
                    { className: 'bcpr-sidebar-btns' },
                    React.createElement(
                        PlainButton,
                        null,
                        React.createElement(IconComments, null)
                    ),
                    React.createElement(
                        PlainButton,
                        null,
                        React.createElement(IconTasks, null)
                    ),
                    React.createElement(
                        PlainButton,
                        null,
                        React.createElement(IconApps, null)
                    ),
                    React.createElement(
                        PlainButton,
                        null,
                        React.createElement(IconVersions, null)
                    ),
                    React.createElement(
                        PlainButton,
                        {
                            onClick: this.toggleSidebar,
                            title: sidebarTitle,
                            'aria-label': sidebarTitle,
                            className: sidebarBtnClassName
                        },
                        React.createElement(IconDetails, { color: showSidebar ? BOX_BLUE : '#aaa' })
                    )
                ),
                !!file && showSidebar && React.createElement(DetailsSidebar, {
                    file: file,
                    getPreviewer: getPreviewer,
                    getLocalizedMessage: getLocalizedMessage
                })
            );
        }
    }]);

    return Sidebar;
}(PureComponent);

export default Sidebar;