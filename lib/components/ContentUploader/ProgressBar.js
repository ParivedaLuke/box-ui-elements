var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Component for a progress bar
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
            var percent = nextProps.percent;

            this.setState({ percent: percent });
        }

        /**
         * Renders the progress bar
         *
         * @return {void}
         */

    }, {
        key: 'render',
        value: function render() {
            var percent = this.state.percent;

            var containerStyle = {
                transitionDelay: percent > 0 && percent < 100 ? '0' : '0.4s'
            };
            return React.createElement(
                'div',
                { className: 'bcu-progress-container', style: containerStyle },
                React.createElement('div', { className: 'bcu-progress', style: { width: percent + '%' } })
            );
        }
    }]);

    return ProgressBar;
}(PureComponent);

ProgressBar.defaultProps = {
    percent: 0
};


export default ProgressBar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlByb2dyZXNzQmFyLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsIlByb2dyZXNzQmFyIiwicHJvcHMiLCJwZXJjZW50Iiwic3RhdGUiLCJuZXh0UHJvcHMiLCJzZXRTdGF0ZSIsImNvbnRhaW5lclN0eWxlIiwidHJhbnNpdGlvbkRlbGF5Iiwid2lkdGgiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7O0FBS0EsT0FBT0EsS0FBUCxJQUFnQkMsYUFBaEIsUUFBcUMsT0FBckM7O0lBZU1DLFc7OztBQVFGOzs7OztBQUtBLHlCQUFZQyxLQUFaLEVBQTBCO0FBQUE7O0FBQUEsOEhBQ2hCQSxLQURnQjs7QUFBQSxZQUVkQyxPQUZjLEdBRUZELEtBRkUsQ0FFZEMsT0FGYzs7QUFHdEIsY0FBS0MsS0FBTCxHQUFhLEVBQUVELGdCQUFGLEVBQWI7QUFIc0I7QUFJekI7O0FBRUQ7Ozs7Ozs7OztrREFLMEJFLFMsRUFBa0I7QUFBQSxnQkFDaENGLE9BRGdDLEdBQ3BCRSxTQURvQixDQUNoQ0YsT0FEZ0M7O0FBRXhDLGlCQUFLRyxRQUFMLENBQWMsRUFBRUgsZ0JBQUYsRUFBZDtBQUNIOztBQUVEOzs7Ozs7OztpQ0FLUztBQUFBLGdCQUNHQSxPQURILEdBQ2UsS0FBS0MsS0FEcEIsQ0FDR0QsT0FESDs7QUFFTCxnQkFBTUksaUJBQWlCO0FBQ25CQyxpQ0FBaUJMLFVBQVUsQ0FBVixJQUFlQSxVQUFVLEdBQXpCLEdBQStCLEdBQS9CLEdBQXFDO0FBRG5DLGFBQXZCO0FBR0EsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsd0JBQWYsRUFBd0MsT0FBT0ksY0FBL0M7QUFDSSw2Q0FBSyxXQUFVLGNBQWYsRUFBOEIsT0FBTyxFQUFFRSxPQUFVTixPQUFWLE1BQUYsRUFBckM7QUFESixhQURKO0FBS0g7Ozs7RUE1Q3FCSCxhOztBQUFwQkMsVyxDQUlLUyxZLEdBQTZCO0FBQ2hDUCxhQUFTO0FBRHVCLEM7OztBQTJDeEMsZUFBZUYsV0FBZiIsImZpbGUiOiJQcm9ncmVzc0Jhci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBDb21wb25lbnQgZm9yIGEgcHJvZ3Jlc3MgYmFyXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAnLi9Qcm9ncmVzc0Jhci5zY3NzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBwZXJjZW50OiBudW1iZXJcclxufTtcclxuXHJcbnR5cGUgU3RhdGUgPSB7XHJcbiAgICBwZXJjZW50OiBudW1iZXJcclxufTtcclxuXHJcbnR5cGUgRGVmYXVsdFByb3BzID0ge3xcclxuICAgIHBlcmNlbnQ6IG51bWJlclxyXG58fTtcclxuXHJcbmNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxEZWZhdWx0UHJvcHMsIFByb3BzLCBTdGF0ZT4ge1xyXG4gICAgcHJvcHM6IFByb3BzO1xyXG4gICAgc3RhdGU6IFN0YXRlO1xyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM6IERlZmF1bHRQcm9wcyA9IHtcclxuICAgICAgICBwZXJjZW50OiAwXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogW2NvbnN0cnVjdG9yXVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge1Byb2dyZXNzQmFyfVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgY29uc3QgeyBwZXJjZW50IH0gPSBwcm9wcztcclxuICAgICAgICB0aGlzLnN0YXRlID0geyBwZXJjZW50IH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHN0YXRlIGZyb20gbmV3IHByb3BzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IFByb3BzKSB7XHJcbiAgICAgICAgY29uc3QgeyBwZXJjZW50IH0gPSBuZXh0UHJvcHM7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBlcmNlbnQgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIHRoZSBwcm9ncmVzcyBiYXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBwZXJjZW50IH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclN0eWxlID0ge1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uRGVsYXk6IHBlcmNlbnQgPiAwICYmIHBlcmNlbnQgPCAxMDAgPyAnMCcgOiAnMC40cydcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdiY3UtcHJvZ3Jlc3MtY29udGFpbmVyJyBzdHlsZT17Y29udGFpbmVyU3R5bGV9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JjdS1wcm9ncmVzcycgc3R5bGU9e3sgd2lkdGg6IGAke3BlcmNlbnR9JWAgfX0gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvZ3Jlc3NCYXI7XHJcbiJdfQ==