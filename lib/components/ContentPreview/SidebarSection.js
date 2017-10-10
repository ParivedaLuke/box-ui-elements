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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpZGViYXJTZWN0aW9uLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImNsYXNzTmFtZXMiLCJQbGFpbkJ1dHRvbiIsIlNpZGViYXJTZWN0aW9uIiwicHJvcHMiLCJ0b2dnbGVWaXNpYmlsaXR5Iiwic2V0U3RhdGUiLCJwcmV2U3RhdGUiLCJpc09wZW4iLCJzdGF0ZSIsImNoaWxkcmVuIiwiY2xhc3NOYW1lIiwidGl0bGUiLCJzZWN0aW9uQ2xhc3NOYW1lIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7QUFNQSxPQUFPQSxLQUFQLElBQWdCQyxhQUFoQixRQUFxQyxPQUFyQztBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQSxTQUFTQyxXQUFULFFBQTRCLFdBQTVCOztJQW1CTUMsYzs7O0FBU0Y7Ozs7OztBQU1BLDRCQUFZQyxLQUFaLEVBQTBCO0FBQUE7O0FBQUEsb0lBQ2hCQSxLQURnQjs7QUFBQSxjQWMxQkMsZ0JBZDBCLEdBY1AsWUFBTTtBQUNyQixrQkFBS0MsUUFBTCxDQUFjLFVBQUNDLFNBQUQ7QUFBQSx1QkFBZ0I7QUFDMUJDLDRCQUFRLENBQUNELFVBQVVDO0FBRE8saUJBQWhCO0FBQUEsYUFBZDtBQUdILFNBbEJ5Qjs7QUFFdEIsY0FBS0MsS0FBTCxHQUFhO0FBQ1RELG9CQUFRSixNQUFNSTtBQURMLFNBQWI7QUFGc0I7QUFLekI7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7QUFhQTs7Ozs7OztpQ0FPUztBQUFBLGdCQUNHQSxNQURILEdBQ3FCLEtBQUtDLEtBRDFCLENBQ0dELE1BREg7QUFBQSx5QkFFeUMsS0FBS0osS0FGOUM7QUFBQSxnQkFFR00sUUFGSCxVQUVHQSxRQUZIO0FBQUEsZ0JBRWFDLFNBRmIsVUFFYUEsU0FGYjtBQUFBLGdCQUV3QkMsS0FGeEIsVUFFd0JBLEtBRnhCOzs7QUFJTCxnQkFBTUMsbUJBQW1CWixXQUNyQixzQkFEcUIsRUFFckI7QUFDSSw2Q0FBNkJPO0FBRGpDLGFBRnFCLEVBS3JCRyxTQUxxQixDQUF6Qjs7QUFRQSxtQkFDSTtBQUFBO0FBQUEsa0JBQUssV0FBV0UsZ0JBQWhCO0FBQ0k7QUFBQywrQkFBRDtBQUFBLHNCQUFhLFNBQVMsS0FBS1IsZ0JBQTNCLEVBQTZDLFdBQVUsNEJBQXZEO0FBQ0k7QUFBQTtBQUFBLDBCQUFJLFdBQVUsaUNBQWQ7QUFDS087QUFETDtBQURKLGlCQURKO0FBTUtKLDBCQUNHO0FBQUE7QUFBQSxzQkFBSyxXQUFVLDhCQUFmO0FBQ0tFO0FBREw7QUFQUixhQURKO0FBYUg7Ozs7RUFuRXdCVixhOztBQUF2QkcsYyxDQUlLVyxZLEdBQWU7QUFDbEJILGVBQVcsRUFETztBQUVsQkgsWUFBUTtBQUZVLEM7OztBQWtFMUIsZUFBZUwsY0FBZiIsImZpbGUiOiJTaWRlYmFyU2VjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBQcmV2aWV3IHNpZGViYXIgc2VjdGlvbiBjb21wb25lbnRcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcbmltcG9ydCB7IFBsYWluQnV0dG9uIH0gZnJvbSAnLi4vQnV0dG9uJztcclxuaW1wb3J0ICcuL1NpZGViYXJTZWN0aW9uLnNjc3MnO1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICAgIGNoaWxkcmVuPzogYW55LFxyXG4gICAgY2xhc3NOYW1lOiBzdHJpbmcsXHJcbiAgICB0aXRsZTogc3RyaW5nLFxyXG4gICAgaXNPcGVuOiBib29sZWFuXHJcbn07XHJcblxyXG50eXBlIERlZmF1bHRQcm9wcyA9IHt8XHJcbiAgICBjbGFzc05hbWU6IHN0cmluZyxcclxuICAgIGlzT3BlbjogYm9vbGVhblxyXG58fTtcclxuXHJcbnR5cGUgU3RhdGUgPSB7XHJcbiAgICBpc09wZW46IGJvb2xlYW5cclxufTtcclxuXHJcbmNsYXNzIFNpZGViYXJTZWN0aW9uIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxEZWZhdWx0UHJvcHMsIFByb3BzLCBTdGF0ZT4ge1xyXG4gICAgcHJvcHM6IFByb3BzO1xyXG4gICAgc3RhdGU6IFN0YXRlO1xyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICAgICAgY2xhc3NOYW1lOiAnJyxcclxuICAgICAgICBpc09wZW46IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBbY29uc3RydWN0b3JdXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge0NvbnRlbnRQcmV2aWV3fVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgaXNPcGVuOiBwcm9wcy5pc09wZW5cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xpY2sgaGFuZGxlciBmb3IgdG9nZ2xpbmcgdGhlIHNlY3Rpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBjbGljayBldmVudFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgdG9nZ2xlVmlzaWJpbGl0eSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpID0+ICh7XHJcbiAgICAgICAgICAgIGlzT3BlbjogIXByZXZTdGF0ZS5pc09wZW5cclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyB0aGUgc2VjdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaXNPcGVuIH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUsIHRpdGxlIH06IFByb3BzID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgY29uc3Qgc2VjdGlvbkNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICdiY3ByLXNpZGViYXItc2VjdGlvbicsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICdiY3ByLXNpZGViYXItc2VjdGlvbi1vcGVuJzogaXNPcGVuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzZWN0aW9uQ2xhc3NOYW1lfT5cclxuICAgICAgICAgICAgICAgIDxQbGFpbkJ1dHRvbiBvbkNsaWNrPXt0aGlzLnRvZ2dsZVZpc2liaWxpdHl9IGNsYXNzTmFtZT0nYmNwci1zaWRlYmFyLXNlY3Rpb24tdGl0bGUnPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9J2JjcHItc2lkZWJhci1zZWN0aW9uLXRpdGxlLXRleHQnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9oND5cclxuICAgICAgICAgICAgICAgIDwvUGxhaW5CdXR0b24+XHJcbiAgICAgICAgICAgICAgICB7aXNPcGVuICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JjcHItc2lkZWJhci1zZWN0aW9uLWNvbnRlbnQnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaWRlYmFyU2VjdGlvbjtcclxuIl19