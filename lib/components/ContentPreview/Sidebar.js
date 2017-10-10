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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpZGViYXIuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiY2xhc3NOYW1lcyIsIkRldGFpbHNTaWRlYmFyIiwiSWNvbkNvbW1lbnRzIiwiSWNvblRhc2tzIiwiSWNvblZlcnNpb25zIiwiSWNvbkFwcHMiLCJJY29uRGV0YWlscyIsIlBsYWluQnV0dG9uIiwiQk9YX0JMVUUiLCJTaWRlYmFyIiwicHJvcHMiLCJ0b2dnbGVTaWRlYmFyIiwic2V0U3RhdGUiLCJwcmV2U3RhdGUiLCJzaG93U2lkZWJhciIsInN0YXRlIiwiZmlsZSIsImdldFByZXZpZXdlciIsImdldExvY2FsaXplZE1lc3NhZ2UiLCJzaWRlYmFyVGl0bGUiLCJzaWRlYmFyQ2xhc3NOYW1lIiwic2lkZWJhckJ0bkNsYXNzTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxJQUFnQkMsYUFBaEIsUUFBcUMsT0FBckM7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLFlBQXZCO0FBQ0EsT0FBT0MsY0FBUCxNQUEyQixrQkFBM0I7QUFDQSxPQUFPQyxZQUFQLE1BQXlCLHVCQUF6QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0Isb0JBQXRCO0FBQ0EsT0FBT0MsWUFBUCxNQUF5Qix1QkFBekI7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLG1CQUFyQjtBQUNBLE9BQU9DLFdBQVAsTUFBd0Isc0JBQXhCO0FBQ0EsU0FBU0MsV0FBVCxRQUE0QixXQUE1QjtBQUNBLFNBQVNDLFFBQVQsUUFBeUIsaUJBQXpCOztJQWNNQyxPOzs7QUFJRjs7Ozs7O0FBTUEscUJBQVlDLEtBQVosRUFBMEI7QUFBQTs7QUFBQSxzSEFDaEJBLEtBRGdCOztBQUFBLGNBYTFCQyxhQWIwQixHQWFWLFlBQVk7QUFDeEIsa0JBQUtDLFFBQUwsQ0FBYyxVQUFDQyxTQUFEO0FBQUEsdUJBQWdCO0FBQzFCQyxpQ0FBYSxDQUFDRCxVQUFVQztBQURFLGlCQUFoQjtBQUFBLGFBQWQ7QUFHSCxTQWpCeUI7O0FBRXRCLGNBQUtDLEtBQUwsR0FBYTtBQUNURCx5QkFBYTtBQURKLFNBQWI7QUFGc0I7QUFLekI7O0FBRUQ7Ozs7Ozs7Ozs7OztBQVlBOzs7OztpQ0FLUztBQUFBLHlCQUNzRCxLQUFLSixLQUQzRDtBQUFBLGdCQUNHTSxJQURILFVBQ0dBLElBREg7QUFBQSxnQkFDU0MsWUFEVCxVQUNTQSxZQURUO0FBQUEsZ0JBQ3VCQyxtQkFEdkIsVUFDdUJBLG1CQUR2QjtBQUFBLGdCQUVHSixXQUZILEdBRTBCLEtBQUtDLEtBRi9CLENBRUdELFdBRkg7O0FBR0wsZ0JBQU1LLGVBQWVELG9CQUFvQixvQ0FBcEIsQ0FBckI7O0FBRUEsZ0JBQU1FLG1CQUFtQnBCLFdBQVcsY0FBWCxFQUEyQjtBQUNoRCx3Q0FBd0JjO0FBRHdCLGFBQTNCLENBQXpCOztBQUlBLGdCQUFNTyxzQkFBc0JyQixXQUFXO0FBQ25DLDZDQUE2QmM7QUFETSxhQUFYLENBQTVCOztBQUlBLG1CQUNJO0FBQUE7QUFBQSxrQkFBSyxXQUFXTSxnQkFBaEI7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxtQkFBZjtBQUNJO0FBQUMsbUNBQUQ7QUFBQTtBQUNJLDRDQUFDLFlBQUQ7QUFESixxQkFESjtBQUlJO0FBQUMsbUNBQUQ7QUFBQTtBQUNJLDRDQUFDLFNBQUQ7QUFESixxQkFKSjtBQU9JO0FBQUMsbUNBQUQ7QUFBQTtBQUNJLDRDQUFDLFFBQUQ7QUFESixxQkFQSjtBQVVJO0FBQUMsbUNBQUQ7QUFBQTtBQUNJLDRDQUFDLFlBQUQ7QUFESixxQkFWSjtBQWFJO0FBQUMsbUNBQUQ7QUFBQTtBQUNJLHFDQUFTLEtBQUtULGFBRGxCO0FBRUksbUNBQU9RLFlBRlg7QUFHSSwwQ0FBWUEsWUFIaEI7QUFJSSx1Q0FBV0U7QUFKZjtBQU1JLDRDQUFDLFdBQUQsSUFBYSxPQUFPUCxjQUFjTixRQUFkLEdBQXlCLE1BQTdDO0FBTko7QUFiSixpQkFESjtBQXVCSyxpQkFBQyxDQUFDUSxJQUFGLElBQ0dGLFdBREgsSUFFRyxvQkFBQyxjQUFEO0FBQ0ksMEJBQU1FLElBRFY7QUFFSSxrQ0FBY0MsWUFGbEI7QUFHSSx5Q0FBcUJDO0FBSHpCO0FBekJSLGFBREo7QUFpQ0g7Ozs7RUFoRmlCbkIsYTs7QUFtRnRCLGVBQWVVLE9BQWYiLCJmaWxlIjoiU2lkZWJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBQcmV2aWV3IHNpZGViYXIgY29tcG9uZW50XHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5pbXBvcnQgRGV0YWlsc1NpZGViYXIgZnJvbSAnLi9EZXRhaWxzU2lkZWJhcic7XHJcbmltcG9ydCBJY29uQ29tbWVudHMgZnJvbSAnLi4vaWNvbnMvSWNvbkNvbW1lbnRzJztcclxuaW1wb3J0IEljb25UYXNrcyBmcm9tICcuLi9pY29ucy9JY29uVGFza3MnO1xyXG5pbXBvcnQgSWNvblZlcnNpb25zIGZyb20gJy4uL2ljb25zL0ljb25WZXJzaW9ucyc7XHJcbmltcG9ydCBJY29uQXBwcyBmcm9tICcuLi9pY29ucy9JY29uQXBwcyc7XHJcbmltcG9ydCBJY29uRGV0YWlscyBmcm9tICcuLi9pY29ucy9JY29uRGV0YWlscyc7XHJcbmltcG9ydCB7IFBsYWluQnV0dG9uIH0gZnJvbSAnLi4vQnV0dG9uJztcclxuaW1wb3J0IHsgQk9YX0JMVUUgfSBmcm9tICcuLi8uLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgdHlwZSB7IEJveEl0ZW0gfSBmcm9tICcuLi8uLi9mbG93VHlwZXMnO1xyXG5pbXBvcnQgJy4vU2lkZWJhci5zY3NzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBmaWxlPzogQm94SXRlbSxcclxuICAgIGdldFByZXZpZXdlcjogRnVuY3Rpb24sXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlOiBGdW5jdGlvblxyXG59O1xyXG5cclxudHlwZSBTdGF0ZSA9IHtcclxuICAgIHNob3dTaWRlYmFyOiBib29sZWFuXHJcbn07XHJcblxyXG5jbGFzcyBTaWRlYmFyIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx2b2lkLCBQcm9wcywgU3RhdGU+IHtcclxuICAgIHByb3BzOiBQcm9wcztcclxuICAgIHN0YXRlOiBTdGF0ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFtjb25zdHJ1Y3Rvcl1cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7U2lkZWJhcn1cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJvcHM6IFByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHNob3dTaWRlYmFyOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgc2hvd2luZyBvciBoaWRpbmcgb2YgaGFzU2lkZWJhclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICB0b2dnbGVTaWRlYmFyID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4gKHtcclxuICAgICAgICAgICAgc2hvd1NpZGViYXI6ICFwcmV2U3RhdGUuc2hvd1NpZGViYXJcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyB0aGUgc2lkZWJhclxyXG4gICAgICpcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IGZpbGUsIGdldFByZXZpZXdlciwgZ2V0TG9jYWxpemVkTWVzc2FnZSB9OiBQcm9wcyA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgeyBzaG93U2lkZWJhciB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qgc2lkZWJhclRpdGxlID0gZ2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5wcmV2aWV3LnNpZGViYXIuZGV0YWlscy50aXRsZScpO1xyXG5cclxuICAgICAgICBjb25zdCBzaWRlYmFyQ2xhc3NOYW1lID0gY2xhc3NOYW1lcygnYmNwci1zaWRlYmFyJywge1xyXG4gICAgICAgICAgICAnYmNwci1zaWRlYmFyLXZpc2libGUnOiBzaG93U2lkZWJhclxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBzaWRlYmFyQnRuQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyh7XHJcbiAgICAgICAgICAgICdiY3ByLXNpZGViYXItYnRuLXNlbGVjdGVkJzogc2hvd1NpZGViYXJcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NpZGViYXJDbGFzc05hbWV9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JjcHItc2lkZWJhci1idG5zJz5cclxuICAgICAgICAgICAgICAgICAgICA8UGxhaW5CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uQ29tbWVudHMgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L1BsYWluQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxQbGFpbkJ1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEljb25UYXNrcyAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvUGxhaW5CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPFBsYWluQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8SWNvbkFwcHMgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L1BsYWluQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxQbGFpbkJ1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEljb25WZXJzaW9ucyAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvUGxhaW5CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPFBsYWluQnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMudG9nZ2xlU2lkZWJhcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3NpZGViYXJUaXRsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17c2lkZWJhclRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3NpZGViYXJCdG5DbGFzc05hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8SWNvbkRldGFpbHMgY29sb3I9e3Nob3dTaWRlYmFyID8gQk9YX0JMVUUgOiAnI2FhYSd9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9QbGFpbkJ1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgeyEhZmlsZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dTaWRlYmFyICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPERldGFpbHNTaWRlYmFyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU9e2ZpbGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFByZXZpZXdlcj17Z2V0UHJldmlld2VyfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlPXtnZXRMb2NhbGl6ZWRNZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaWRlYmFyO1xyXG4iXX0=