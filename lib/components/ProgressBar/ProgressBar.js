var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Progress Bar component
 * @author Box
 */

import React, { PureComponent } from 'react';

var ProgressBar = function (_PureComponent) {
    _inherits(ProgressBar, _PureComponent);

    /**
     * [constructor]
     *
     * @return {ProgressBar}
     */
    function ProgressBar(props) {
        _classCallCheck(this, ProgressBar);

        var _this = _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).call(this, props));

        _initialiseProps.call(_this);

        var percent = props.percent;

        _this.state = { percent: percent };
        return _this;
    }

    /**
     * Updates state from new props
     *
     * @return {void}
     */


    _createClass(ProgressBar, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            clearInterval(this.timeout);
            clearTimeout(this.timeout);
            var percent = nextProps.percent;

            this.setState({ percent: percent }, this.startProgress);
        }

        /**
         * Clears time out
         *
         * @return {void}
         */

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(this.timeout);
            clearTimeout(this.timeout);
        }

        /**
         * Increaments the progress or resets it
         * depending upon the edge conditions.
         *
         * @return {void}
         */


        /**
         * Increaments the progress very slowly
         *
         * @return {void}
         */


        /**
         * Resets the progress to 0
         *
         * @return {void}
         */

    }, {
        key: 'render',


        /**
         * Renders the progress bar
         *
         * @return {void}
         */
        value: function render() {
            var percent = this.state.percent;

            var containerStyle = {
                opacity: percent > 0 && percent < 100 ? 1 : 0,
                transitionDelay: percent > 0 && percent < 100 ? '0' : '0.4s'
            };
            return React.createElement(
                'div',
                { className: 'buik-progress-container', style: containerStyle },
                React.createElement('div', { className: 'buik-progress', style: { width: percent + '%' } })
            );
        }
    }]);

    return ProgressBar;
}(PureComponent);

ProgressBar.defaultProps = { percent: 0 };

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.startProgress = function () {
        var percent = _this2.state.percent;

        if (percent === 0) {
            _this2.timeout = setInterval(_this2.incrementProgress, 100);
        } else if (percent === 100) {
            // Timeout helps transition of hiding the bar to finish
            _this2.timeout = setTimeout(_this2.resetProgress, 600);
        }
    };

    this.incrementProgress = function () {
        var percent = _this2.state.percent;

        _this2.setState({
            percent: percent + 2 / (percent || 1)
        });
    };

    this.resetProgress = function () {
        _this2.setState(ProgressBar.defaultProps);
    };
};

export default ProgressBar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlByb2dyZXNzQmFyLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsIlByb2dyZXNzQmFyIiwicHJvcHMiLCJwZXJjZW50Iiwic3RhdGUiLCJuZXh0UHJvcHMiLCJjbGVhckludGVydmFsIiwidGltZW91dCIsImNsZWFyVGltZW91dCIsInNldFN0YXRlIiwic3RhcnRQcm9ncmVzcyIsImNvbnRhaW5lclN0eWxlIiwib3BhY2l0eSIsInRyYW5zaXRpb25EZWxheSIsIndpZHRoIiwiZGVmYXVsdFByb3BzIiwic2V0SW50ZXJ2YWwiLCJpbmNyZW1lbnRQcm9ncmVzcyIsInNldFRpbWVvdXQiLCJyZXNldFByb2dyZXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7QUFNQSxPQUFPQSxLQUFQLElBQWdCQyxhQUFoQixRQUFxQyxPQUFyQzs7SUFlTUMsVzs7O0FBT0Y7Ozs7O0FBS0EseUJBQVlDLEtBQVosRUFBMEI7QUFBQTs7QUFBQSw4SEFDaEJBLEtBRGdCOztBQUFBOztBQUFBLFlBRWRDLE9BRmMsR0FFS0QsS0FGTCxDQUVkQyxPQUZjOztBQUd0QixjQUFLQyxLQUFMLEdBQWEsRUFBRUQsZ0JBQUYsRUFBYjtBQUhzQjtBQUl6Qjs7QUFFRDs7Ozs7Ozs7O2tEQUswQkUsUyxFQUFrQjtBQUN4Q0MsMEJBQWMsS0FBS0MsT0FBbkI7QUFDQUMseUJBQWEsS0FBS0QsT0FBbEI7QUFGd0MsZ0JBR2hDSixPQUhnQyxHQUdiRSxTQUhhLENBR2hDRixPQUhnQzs7QUFJeEMsaUJBQUtNLFFBQUwsQ0FBYyxFQUFFTixnQkFBRixFQUFkLEVBQTJCLEtBQUtPLGFBQWhDO0FBQ0g7O0FBRUQ7Ozs7Ozs7OytDQUt1QjtBQUNuQkosMEJBQWMsS0FBS0MsT0FBbkI7QUFDQUMseUJBQWEsS0FBS0QsT0FBbEI7QUFDSDs7QUFFRDs7Ozs7Ozs7QUFnQkE7Ozs7Ozs7QUFZQTs7Ozs7Ozs7OztBQVNBOzs7OztpQ0FLUztBQUFBLGdCQUNHSixPQURILEdBQ3NCLEtBQUtDLEtBRDNCLENBQ0dELE9BREg7O0FBRUwsZ0JBQU1RLGlCQUFpQjtBQUNuQkMseUJBQVNULFVBQVUsQ0FBVixJQUFlQSxVQUFVLEdBQXpCLEdBQStCLENBQS9CLEdBQW1DLENBRHpCO0FBRW5CVSxpQ0FBaUJWLFVBQVUsQ0FBVixJQUFlQSxVQUFVLEdBQXpCLEdBQStCLEdBQS9CLEdBQXFDO0FBRm5DLGFBQXZCO0FBSUEsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUseUJBQWYsRUFBeUMsT0FBT1EsY0FBaEQ7QUFDSSw2Q0FBSyxXQUFVLGVBQWYsRUFBK0IsT0FBTyxFQUFFRyxPQUFVWCxPQUFWLE1BQUYsRUFBdEM7QUFESixhQURKO0FBS0g7Ozs7RUE3RnFCSCxhOztBQUFwQkMsVyxDQUtLYyxZLEdBQWUsRUFBRVosU0FBUyxDQUFYLEU7Ozs7O1NBeUN0Qk8sYSxHQUFnQixZQUFNO0FBQUEsWUFDVlAsT0FEVSxHQUNTLE9BQUtDLEtBRGQsQ0FDVkQsT0FEVTs7QUFFbEIsWUFBSUEsWUFBWSxDQUFoQixFQUFtQjtBQUNmLG1CQUFLSSxPQUFMLEdBQWVTLFlBQVksT0FBS0MsaUJBQWpCLEVBQW9DLEdBQXBDLENBQWY7QUFDSCxTQUZELE1BRU8sSUFBSWQsWUFBWSxHQUFoQixFQUFxQjtBQUN4QjtBQUNBLG1CQUFLSSxPQUFMLEdBQWVXLFdBQVcsT0FBS0MsYUFBaEIsRUFBK0IsR0FBL0IsQ0FBZjtBQUNIO0FBQ0osSzs7U0FPREYsaUIsR0FBb0IsWUFBTTtBQUFBLFlBQ2RkLE9BRGMsR0FDRixPQUFLQyxLQURILENBQ2RELE9BRGM7O0FBRXRCLGVBQUtNLFFBQUwsQ0FBYztBQUNWTixxQkFBU0EsVUFBVSxLQUFLQSxXQUFXLENBQWhCO0FBRFQsU0FBZDtBQUdILEs7O1NBT0RnQixhLEdBQWdCLFlBQU07QUFDbEIsZUFBS1YsUUFBTCxDQUFjUixZQUFZYyxZQUExQjtBQUNILEs7OztBQXFCTCxlQUFlZCxXQUFmIiwiZmlsZSI6IlByb2dyZXNzQmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIFByb2dyZXNzIEJhciBjb21wb25lbnRcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICcuL1Byb2dyZXNzQmFyLnNjc3MnO1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICAgIHBlcmNlbnQ6IG51bWJlclxyXG59O1xyXG5cclxudHlwZSBEZWZhdWx0UHJvcHMgPSB7fFxyXG4gICAgcGVyY2VudDogbnVtYmVyXHJcbnx9O1xyXG5cclxudHlwZSBTdGF0ZSA9IHtcclxuICAgIHBlcmNlbnQ6IG51bWJlclxyXG59O1xyXG5cclxuY2xhc3MgUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PERlZmF1bHRQcm9wcywgUHJvcHMsIFN0YXRlPiB7XHJcbiAgICBwcm9wczogUHJvcHM7XHJcbiAgICBzdGF0ZTogU3RhdGU7XHJcbiAgICB0aW1lb3V0OiBudW1iZXI7XHJcblxyXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHsgcGVyY2VudDogMCB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogW2NvbnN0cnVjdG9yXVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge1Byb2dyZXNzQmFyfVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgY29uc3QgeyBwZXJjZW50IH06IFN0YXRlID0gcHJvcHM7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgcGVyY2VudCB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBzdGF0ZSBmcm9tIG5ldyBwcm9wc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzOiBQcm9wcykge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lb3V0KTtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgICAgICBjb25zdCB7IHBlcmNlbnQgfTogUHJvcHMgPSBuZXh0UHJvcHM7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBlcmNlbnQgfSwgdGhpcy5zdGFydFByb2dyZXNzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyB0aW1lIG91dFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lb3V0KTtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluY3JlYW1lbnRzIHRoZSBwcm9ncmVzcyBvciByZXNldHMgaXRcclxuICAgICAqIGRlcGVuZGluZyB1cG9uIHRoZSBlZGdlIGNvbmRpdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgc3RhcnRQcm9ncmVzcyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7IHBlcmNlbnQgfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGlmIChwZXJjZW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZW91dCA9IHNldEludGVydmFsKHRoaXMuaW5jcmVtZW50UHJvZ3Jlc3MsIDEwMCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwZXJjZW50ID09PSAxMDApIHtcclxuICAgICAgICAgICAgLy8gVGltZW91dCBoZWxwcyB0cmFuc2l0aW9uIG9mIGhpZGluZyB0aGUgYmFyIHRvIGZpbmlzaFxyXG4gICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMucmVzZXRQcm9ncmVzcywgNjAwKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5jcmVhbWVudHMgdGhlIHByb2dyZXNzIHZlcnkgc2xvd2x5XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgaW5jcmVtZW50UHJvZ3Jlc3MgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBwZXJjZW50IH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBwZXJjZW50OiBwZXJjZW50ICsgMiAvIChwZXJjZW50IHx8IDEpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXRzIHRoZSBwcm9ncmVzcyB0byAwXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgcmVzZXRQcm9ncmVzcyA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKFByb2dyZXNzQmFyLmRlZmF1bHRQcm9wcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyB0aGUgcHJvZ3Jlc3MgYmFyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgcGVyY2VudCB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IHBlcmNlbnQgPiAwICYmIHBlcmNlbnQgPCAxMDAgPyAxIDogMCxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbkRlbGF5OiBwZXJjZW50ID4gMCAmJiBwZXJjZW50IDwgMTAwID8gJzAnIDogJzAuNHMnXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYnVpay1wcm9ncmVzcy1jb250YWluZXInIHN0eWxlPXtjb250YWluZXJTdHlsZX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYnVpay1wcm9ncmVzcycgc3R5bGU9e3sgd2lkdGg6IGAke3BlcmNlbnR9JWAgfX0gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvZ3Jlc3NCYXI7XHJcbiJdfQ==