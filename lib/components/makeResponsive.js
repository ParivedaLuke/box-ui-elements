var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file HOC to make responsive Box UI Elements
 * @author Box
 */

import React, { PureComponent } from 'react';
import Measure from 'react-measure';
import classNames from 'classnames';
import { SIZE_LARGE, SIZE_SMALL, CLASS_IS_COMPACT, CLASS_IS_TOUCH } from '../constants';


var HAS_TOUCH = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch;

function makeResponsive(Wrapped) {
    var _class, _temp;

    return _temp = _class = function (_PureComponent) {
        _inherits(_class, _PureComponent);

        /**
         * [constructor]
         *
         * @param {*} data
         * @return {void}
         */
        function _class(props) {
            _classCallCheck(this, _class);

            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

            _this.onResize = function (_ref) {
                var width = _ref.bounds.width;

                _this.setState({
                    size: width <= 600 ? SIZE_SMALL : SIZE_LARGE
                });
            };

            _this.state = {
                size: props.size || SIZE_LARGE
            };
            return _this;
        }

        /**
         * Resizing function
         *
         * @private
         * @param {Component} react component
         * @return {void}
         */


        _createClass(_class, [{
            key: 'render',


            /**
             * Renders the Box UI Element
             *
             * @private
             * @inheritdoc
             * @return {Element}
             */
            value: function render() {
                var _classNames;

                var _props = this.props,
                    isTouch = _props.isTouch,
                    size = _props.size,
                    className = _props.className,
                    componentRef = _props.componentRef,
                    rest = _objectWithoutProperties(_props, ['isTouch', 'size', 'className', 'componentRef']);

                var isSmall = size === SIZE_SMALL;
                var isLarge = size === SIZE_LARGE;
                var isResponsive = !isSmall && !isLarge;

                if (isSmall && isLarge) {
                    throw new Error('Box UI Element cannot be both small and large');
                }

                if (!isResponsive) {
                    return React.createElement(Wrapped, _extends({
                        ref: componentRef,
                        isTouch: isTouch,
                        isSmall: isSmall,
                        isLarge: isLarge,
                        className: className
                    }, rest));
                }

                var sizeFromState = this.state.size;

                isSmall = sizeFromState === SIZE_SMALL;
                isLarge = sizeFromState === SIZE_LARGE;
                var styleClassName = classNames((_classNames = {}, _defineProperty(_classNames, CLASS_IS_COMPACT, isSmall), _defineProperty(_classNames, CLASS_IS_TOUCH, isTouch), _classNames), className);

                return React.createElement(
                    Measure,
                    { bounds: true, onResize: this.onResize },
                    function (_ref2) {
                        var measureRef = _ref2.measureRef;
                        return React.createElement(Wrapped, _extends({
                            ref: componentRef,
                            isTouch: isTouch,
                            isSmall: isSmall,
                            isLarge: isLarge,
                            measureRef: measureRef,
                            className: styleClassName
                        }, rest));
                    }
                );
            }
        }]);

        return _class;
    }(PureComponent), _class.defaultProps = {
        isTouch: HAS_TOUCH
    }, _temp;
}

export default makeResponsive;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ha2VSZXNwb25zaXZlLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsIk1lYXN1cmUiLCJjbGFzc05hbWVzIiwiU0laRV9MQVJHRSIsIlNJWkVfU01BTEwiLCJDTEFTU19JU19DT01QQUNUIiwiQ0xBU1NfSVNfVE9VQ0giLCJIQVNfVE9VQ0giLCJ3aW5kb3ciLCJEb2N1bWVudFRvdWNoIiwiZG9jdW1lbnQiLCJtYWtlUmVzcG9uc2l2ZSIsIldyYXBwZWQiLCJwcm9wcyIsIm9uUmVzaXplIiwid2lkdGgiLCJib3VuZHMiLCJzZXRTdGF0ZSIsInNpemUiLCJzdGF0ZSIsImlzVG91Y2giLCJjbGFzc05hbWUiLCJjb21wb25lbnRSZWYiLCJyZXN0IiwiaXNTbWFsbCIsImlzTGFyZ2UiLCJpc1Jlc3BvbnNpdmUiLCJFcnJvciIsInNpemVGcm9tU3RhdGUiLCJzdHlsZUNsYXNzTmFtZSIsIm1lYXN1cmVSZWYiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsSUFBZ0JDLGFBQWhCLFFBQXFDLE9BQXJDO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQixlQUFwQjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQSxTQUFTQyxVQUFULEVBQXFCQyxVQUFyQixFQUFpQ0MsZ0JBQWpDLEVBQW1EQyxjQUFuRCxRQUF5RSxjQUF6RTs7O0FBa0JBLElBQU1DLFlBQVksa0JBQWtCQyxNQUFsQixJQUE2QkEsT0FBT0MsYUFBUCxJQUF3QkMsb0JBQW9CRixPQUFPQyxhQUFsRzs7QUFFQSxTQUFTRSxjQUFULENBQXdCQyxPQUF4QixFQUErRjtBQUFBOztBQUMzRjtBQUFBOztBQVFJOzs7Ozs7QUFNQSx3QkFBWUMsS0FBWixFQUEwQjtBQUFBOztBQUFBLHdIQUNoQkEsS0FEZ0I7O0FBQUEsa0JBYzFCQyxRQWQwQixHQWNmLGdCQUFtRDtBQUFBLG9CQUF0Q0MsS0FBc0MsUUFBaERDLE1BQWdELENBQXRDRCxLQUFzQzs7QUFDMUQsc0JBQUtFLFFBQUwsQ0FBYztBQUNWQywwQkFBTUgsU0FBUyxHQUFULEdBQWVYLFVBQWYsR0FBNEJEO0FBRHhCLGlCQUFkO0FBR0gsYUFsQnlCOztBQUV0QixrQkFBS2dCLEtBQUwsR0FBYTtBQUNURCxzQkFBTUwsTUFBTUssSUFBTixJQUFjZjtBQURYLGFBQWI7QUFGc0I7QUFLekI7O0FBRUQ7Ozs7Ozs7OztBQXJCSjtBQUFBOzs7QUFrQ0k7Ozs7Ozs7QUFsQ0oscUNBeUNhO0FBQUE7O0FBQUEsNkJBQzhELEtBQUtVLEtBRG5FO0FBQUEsb0JBQ0dPLE9BREgsVUFDR0EsT0FESDtBQUFBLG9CQUNZRixJQURaLFVBQ1lBLElBRFo7QUFBQSxvQkFDa0JHLFNBRGxCLFVBQ2tCQSxTQURsQjtBQUFBLG9CQUM2QkMsWUFEN0IsVUFDNkJBLFlBRDdCO0FBQUEsb0JBQzhDQyxJQUQ5Qzs7QUFFTCxvQkFBSUMsVUFBbUJOLFNBQVNkLFVBQWhDO0FBQ0Esb0JBQUlxQixVQUFtQlAsU0FBU2YsVUFBaEM7QUFDQSxvQkFBTXVCLGVBQXdCLENBQUNGLE9BQUQsSUFBWSxDQUFDQyxPQUEzQzs7QUFFQSxvQkFBSUQsV0FBV0MsT0FBZixFQUF3QjtBQUNwQiwwQkFBTSxJQUFJRSxLQUFKLENBQVUsK0NBQVYsQ0FBTjtBQUNIOztBQUVELG9CQUFJLENBQUNELFlBQUwsRUFBbUI7QUFDZiwyQkFDSSxvQkFBQyxPQUFEO0FBQ0ksNkJBQUtKLFlBRFQ7QUFFSSxpQ0FBU0YsT0FGYjtBQUdJLGlDQUFTSSxPQUhiO0FBSUksaUNBQVNDLE9BSmI7QUFLSSxtQ0FBV0o7QUFMZix1QkFNUUUsSUFOUixFQURKO0FBVUg7O0FBckJJLG9CQXVCU0ssYUF2QlQsR0F1QmtDLEtBQUtULEtBdkJ2QyxDQXVCR0QsSUF2Qkg7O0FBd0JMTSwwQkFBVUksa0JBQWtCeEIsVUFBNUI7QUFDQXFCLDBCQUFVRyxrQkFBa0J6QixVQUE1QjtBQUNBLG9CQUFNMEIsaUJBQWlCM0IsMkRBRWRHLGdCQUZjLEVBRUttQixPQUZMLGdDQUdkbEIsY0FIYyxFQUdHYyxPQUhILGlCQUtuQkMsU0FMbUIsQ0FBdkI7O0FBUUEsdUJBQ0k7QUFBQywyQkFBRDtBQUFBLHNCQUFTLFlBQVQsRUFBZ0IsVUFBVSxLQUFLUCxRQUEvQjtBQUNLO0FBQUEsNEJBQUdnQixVQUFILFNBQUdBLFVBQUg7QUFBQSwrQkFDRyxvQkFBQyxPQUFEO0FBQ0ksaUNBQUtSLFlBRFQ7QUFFSSxxQ0FBU0YsT0FGYjtBQUdJLHFDQUFTSSxPQUhiO0FBSUkscUNBQVNDLE9BSmI7QUFLSSx3Q0FBWUssVUFMaEI7QUFNSSx1Q0FBV0Q7QUFOZiwyQkFPUU4sSUFQUixFQURIO0FBQUE7QUFETCxpQkFESjtBQWNIO0FBekZMOztBQUFBO0FBQUEsTUFBcUJ2QixhQUFyQixVQUlXK0IsWUFKWCxHQUkwQjtBQUNsQlgsaUJBQVNiO0FBRFMsS0FKMUI7QUEyRkg7O0FBRUQsZUFBZUksY0FBZiIsImZpbGUiOiJtYWtlUmVzcG9uc2l2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBIT0MgdG8gbWFrZSByZXNwb25zaXZlIEJveCBVSSBFbGVtZW50c1xyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgTWVhc3VyZSBmcm9tICdyZWFjdC1tZWFzdXJlJztcclxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcbmltcG9ydCB7IFNJWkVfTEFSR0UsIFNJWkVfU01BTEwsIENMQVNTX0lTX0NPTVBBQ1QsIENMQVNTX0lTX1RPVUNIIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHR5cGUgeyBTaXplLCBDbGFzc0NvbXBvbmVudCB9IGZyb20gJy4uL2Zsb3dUeXBlcyc7XHJcblxyXG50eXBlIERlZmF1bHRQcm9wcyA9IHt8XHJcbiAgICBpc1RvdWNoOiBib29sZWFuXHJcbnx9O1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICAgIGlzVG91Y2g6IGJvb2xlYW4sXHJcbiAgICBzaXplOiBTaXplLFxyXG4gICAgY2xhc3NOYW1lOiBzdHJpbmcsXHJcbiAgICBjb21wb25lbnRSZWY6IEZ1bmN0aW9uXHJcbn07XHJcblxyXG50eXBlIFN0YXRlID0ge1xyXG4gICAgc2l6ZTogU2l6ZVxyXG59O1xyXG5cclxuY29uc3QgSEFTX1RPVUNIID0gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8ICh3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKTtcclxuXHJcbmZ1bmN0aW9uIG1ha2VSZXNwb25zaXZlKFdyYXBwZWQ6IENsYXNzQ29tcG9uZW50PGFueSwgYW55LCBhbnk+KTogQ2xhc3NDb21wb25lbnQ8YW55LCBhbnksIGFueT4ge1xyXG4gICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxEZWZhdWx0UHJvcHMsIFByb3BzLCBTdGF0ZT4ge1xyXG4gICAgICAgIHByb3BzOiBQcm9wcztcclxuICAgICAgICBzdGF0ZTogU3RhdGU7XHJcblxyXG4gICAgICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICAgICAgICAgIGlzVG91Y2g6IEhBU19UT1VDSFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFtjb25zdHJ1Y3Rvcl1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gZGF0YVxyXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJvcHM6IFByb3BzKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgIHNpemU6IHByb3BzLnNpemUgfHwgU0laRV9MQVJHRVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVzaXppbmcgZnVuY3Rpb25cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgICogQHBhcmFtIHtDb21wb25lbnR9IHJlYWN0IGNvbXBvbmVudFxyXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25SZXNpemUgPSAoeyBib3VuZHM6IHsgd2lkdGggfSB9OiB7IGJvdW5kczogQ2xpZW50UmVjdCB9KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgc2l6ZTogd2lkdGggPD0gNjAwID8gU0laRV9TTUFMTCA6IFNJWkVfTEFSR0VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVuZGVycyB0aGUgQm94IFVJIEVsZW1lbnRcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgICogQGluaGVyaXRkb2NcclxuICAgICAgICAgKiBAcmV0dXJuIHtFbGVtZW50fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJlbmRlcigpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBpc1RvdWNoLCBzaXplLCBjbGFzc05hbWUsIGNvbXBvbmVudFJlZiwgLi4ucmVzdCB9OiBQcm9wcyA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgICAgIGxldCBpc1NtYWxsOiBib29sZWFuID0gc2l6ZSA9PT0gU0laRV9TTUFMTDtcclxuICAgICAgICAgICAgbGV0IGlzTGFyZ2U6IGJvb2xlYW4gPSBzaXplID09PSBTSVpFX0xBUkdFO1xyXG4gICAgICAgICAgICBjb25zdCBpc1Jlc3BvbnNpdmU6IGJvb2xlYW4gPSAhaXNTbWFsbCAmJiAhaXNMYXJnZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc1NtYWxsICYmIGlzTGFyZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQm94IFVJIEVsZW1lbnQgY2Fubm90IGJlIGJvdGggc21hbGwgYW5kIGxhcmdlJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghaXNSZXNwb25zaXZlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxXcmFwcGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17Y29tcG9uZW50UmVmfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RvdWNoPXtpc1RvdWNofVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NtYWxsPXtpc1NtYWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0xhcmdlPXtpc0xhcmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLnJlc3R9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHsgc2l6ZTogc2l6ZUZyb21TdGF0ZSB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgICAgIGlzU21hbGwgPSBzaXplRnJvbVN0YXRlID09PSBTSVpFX1NNQUxMO1xyXG4gICAgICAgICAgICBpc0xhcmdlID0gc2l6ZUZyb21TdGF0ZSA9PT0gU0laRV9MQVJHRTtcclxuICAgICAgICAgICAgY29uc3Qgc3R5bGVDbGFzc05hbWUgPSBjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFtDTEFTU19JU19DT01QQUNUXTogaXNTbWFsbCxcclxuICAgICAgICAgICAgICAgICAgICBbQ0xBU1NfSVNfVE9VQ0hdOiBpc1RvdWNoXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPE1lYXN1cmUgYm91bmRzIG9uUmVzaXplPXt0aGlzLm9uUmVzaXplfT5cclxuICAgICAgICAgICAgICAgICAgICB7KHsgbWVhc3VyZVJlZiB9KSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8V3JhcHBlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtjb21wb25lbnRSZWZ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1RvdWNoPXtpc1RvdWNofVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTbWFsbD17aXNTbWFsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTGFyZ2U9e2lzTGFyZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFzdXJlUmVmPXttZWFzdXJlUmVmfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZUNsYXNzTmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5yZXN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPn1cclxuICAgICAgICAgICAgICAgIDwvTWVhc3VyZT5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYWtlUmVzcG9uc2l2ZTtcclxuIl19