var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file HOC to make popup-able Box UI Elements
 * @author Box
 */

import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import noop from 'lodash.noop';
import omit from 'lodash.omit';

import { CLIENT_NAME_CONTENT_PICKER, CLIENT_NAME_CONTENT_UPLOADER, CLIENT_NAME_CONTENT_TREE } from '../constants';

var makePopup = function makePopup(kit) {
    return function (Wrapped) {
        return function (_PureComponent) {
            _inherits(Wrapper, _PureComponent);

            /**
             * [constructor]
             *
             * @param {*} props
             * @return {Wrapper}
             */
            function Wrapper(props) {
                _classCallCheck(this, Wrapper);

                var _this = _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));

                _this.onClick = function (data) {
                    var _this$props$onClick = _this.props.onClick,
                        onClick = _this$props$onClick === undefined ? noop : _this$props$onClick;

                    _this.close(onClick, data);
                };

                _this.onClose = function (data) {
                    var _this$props$onClose = _this.props.onClose,
                        onClose = _this$props$onClose === undefined ? noop : _this$props$onClose;

                    _this.close(onClose, data);
                };

                _this.onCancel = function (data) {
                    var _this$props$onCancel = _this.props.onCancel,
                        onCancel = _this$props$onCancel === undefined ? noop : _this$props$onCancel;

                    _this.close(onCancel, data);
                };

                _this.onChoose = function (data) {
                    var _this$props$onChoose = _this.props.onChoose,
                        onChoose = _this$props$onChoose === undefined ? noop : _this$props$onChoose;

                    _this.close(onChoose, data);
                };

                _this.onButtonClick = function () {
                    _this.setState({ isOpen: true });
                };

                _this.state = {
                    isOpen: false
                };
                return _this;
            }

            /**
             * Hides the modal and call the callback
             *
             * @param {Function} callback - function to call
             * @return {void}
             */


            _createClass(Wrapper, [{
                key: 'close',
                value: function close(callback, data) {
                    this.setState({ isOpen: false }, function () {
                        return callback(data);
                    });
                }

                /**
                 * Callback for clicking
                 *
                 * @param {*} data - any callback data
                 * @return {void}
                 */


                /**
                 * Callback for pressing close
                 *
                 * @param {*} data - any callback data
                 * @return {void}
                 */


                /**
                 * Callback for pressing cancel
                 *
                 * @param {*} data - any callback data
                 * @return {void}
                 */


                /**
                 * Callback for pressing choose
                 *
                 * @param {*} data - any callback data
                 * @return {void}
                 */


                /**
                 * Button click handler
                 *
                 * @return {void}
                 */

            }, {
                key: 'render',


                /**
                 * Renders the component
                 *
                 * @return {void}
                 */
                value: function render() {
                    var isOpen = this.state.isOpen;

                    var _props = this.props,
                        modal = _props.modal,
                        rest = _objectWithoutProperties(_props, ['modal']);

                    var wrappedProps = omit(rest, ['onCancel', 'onChoose', 'onClose', 'modal']);
                    var _modal$buttonLabel = modal.buttonLabel,
                        buttonLabel = _modal$buttonLabel === undefined ? 'Missing modal.buttonLabel in options' : _modal$buttonLabel,
                        _modal$buttonClassNam = modal.buttonClassName,
                        buttonClassName = _modal$buttonClassNam === undefined ? 'buik-btn buik-btn-primary' : _modal$buttonClassNam,
                        _modal$modalClassName = modal.modalClassName,
                        modalClassName = _modal$modalClassName === undefined ? 'buik-modal-wrapper-content' : _modal$modalClassName,
                        _modal$overlayClassNa = modal.overlayClassName,
                        overlayClassName = _modal$overlayClassNa === undefined ? 'buik-modal-wrapper-overlay' : _modal$overlayClassNa;


                    switch (kit) {
                        case CLIENT_NAME_CONTENT_PICKER:
                            wrappedProps.onCancel = this.onCancel;
                            wrappedProps.onChoose = this.onChoose;
                            break;
                        case CLIENT_NAME_CONTENT_UPLOADER:
                            wrappedProps.onClose = this.onClose;
                            break;
                        case CLIENT_NAME_CONTENT_TREE:
                            wrappedProps.onClick = this.onClick;
                            break;
                        default:
                            throw new Error('Unknown kit type');
                    }

                    return React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'button',
                            { type: 'button', onClick: this.onButtonClick, className: buttonClassName },
                            buttonLabel
                        ),
                        React.createElement(
                            Modal,
                            {
                                isOpen: isOpen,
                                contentLabel: kit,
                                className: modalClassName,
                                overlayClassName: overlayClassName
                            },
                            React.createElement(Wrapped, wrappedProps)
                        )
                    );
                }
            }]);

            return Wrapper;
        }(PureComponent);
    };
};

export default makePopup;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ha2VQb3B1cC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJNb2RhbCIsIm5vb3AiLCJvbWl0IiwiQ0xJRU5UX05BTUVfQ09OVEVOVF9QSUNLRVIiLCJDTElFTlRfTkFNRV9DT05URU5UX1VQTE9BREVSIiwiQ0xJRU5UX05BTUVfQ09OVEVOVF9UUkVFIiwibWFrZVBvcHVwIiwia2l0IiwiV3JhcHBlZCIsInByb3BzIiwib25DbGljayIsImRhdGEiLCJjbG9zZSIsIm9uQ2xvc2UiLCJvbkNhbmNlbCIsIm9uQ2hvb3NlIiwib25CdXR0b25DbGljayIsInNldFN0YXRlIiwiaXNPcGVuIiwic3RhdGUiLCJjYWxsYmFjayIsIm1vZGFsIiwicmVzdCIsIndyYXBwZWRQcm9wcyIsImJ1dHRvbkxhYmVsIiwiYnV0dG9uQ2xhc3NOYW1lIiwibW9kYWxDbGFzc05hbWUiLCJvdmVybGF5Q2xhc3NOYW1lIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxJQUFnQkMsYUFBaEIsUUFBcUMsT0FBckM7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGFBQWxCO0FBQ0EsT0FBT0MsSUFBUCxNQUFpQixhQUFqQjtBQUNBLE9BQU9DLElBQVAsTUFBaUIsYUFBakI7O0FBRUEsU0FBU0MsMEJBQVQsRUFBcUNDLDRCQUFyQyxFQUFtRUMsd0JBQW5FLFFBQW1HLGNBQW5HOztBQWNBLElBQU1DLFlBQVksU0FBWkEsU0FBWSxDQUFDQyxHQUFEO0FBQUEsV0FBaUIsVUFBQ0MsT0FBRDtBQUFBO0FBQUE7O0FBSzNCOzs7Ozs7QUFNQSw2QkFBWUMsS0FBWixFQUEwQjtBQUFBOztBQUFBLDhIQUNoQkEsS0FEZ0I7O0FBQUEsc0JBdUIxQkMsT0F2QjBCLEdBdUJoQixVQUFDQyxJQUFELEVBQWU7QUFBQSw4Q0FDYSxNQUFLRixLQURsQixDQUNiQyxPQURhO0FBQUEsd0JBQ2JBLE9BRGEsdUNBQ0hULElBREc7O0FBRXJCLDBC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O0FBQUE7QUFDSSx3Q0FBUU4sTUFEWjtBQUVJLDhDQUFjWCxHQUZsQjtBQUdJLDJDQUFXbUIsY0FIZjtBQUlJLGtEQUFrQkM7QUFKdEI7QUFNSSxnREFBQyxPQUFELEVBQWFKLFlBQWI7QUFOSjtBQUpKLHFCQURKO0FBZUg7QUEvSDBCOztBQUFBO0FBQUEsVUFDVHhCLGFBRFM7QUFBQSxLQUFqQjtBQUFBLENBQWxCOztBQWtJQSxlQUFlTyxTQUFmIiwiZmlsZSI6Im1ha2VQb3B1cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBIT0MgdG8gbWFrZSBwb3B1cC1hYmxlIEJveCBVSSBFbGVtZW50c1xyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgTW9kYWwgZnJvbSAncmVhY3QtbW9kYWwnO1xyXG5pbXBvcnQgbm9vcCBmcm9tICdsb2Rhc2gubm9vcCc7XHJcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcclxuaW1wb3J0IHR5cGUgeyBNb2RhbE9wdGlvbnMgfSBmcm9tICcuLi9mbG93VHlwZXMnO1xyXG5pbXBvcnQgeyBDTElFTlRfTkFNRV9DT05URU5UX1BJQ0tFUiwgQ0xJRU5UX05BTUVfQ09OVEVOVF9VUExPQURFUiwgQ0xJRU5UX05BTUVfQ09OVEVOVF9UUkVFIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBvbkNhbmNlbD86IEZ1bmN0aW9uLFxyXG4gICAgb25DaG9vc2U/OiBGdW5jdGlvbixcclxuICAgIG9uQ2xvc2U/OiBGdW5jdGlvbixcclxuICAgIG9uQ2xpY2s/OiBGdW5jdGlvbixcclxuICAgIG1vZGFsOiBNb2RhbE9wdGlvbnNcclxufTtcclxuXHJcbnR5cGUgU3RhdGUgPSB7XHJcbiAgICBpc09wZW46IGJvb2xlYW5cclxufTtcclxuXHJcbmNvbnN0IG1ha2VQb3B1cCA9IChraXQ6IHN0cmluZykgPT4gKFdyYXBwZWQ6IGFueSkgPT5cclxuICAgIGNsYXNzIFdyYXBwZXIgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PHZvaWQsIFByb3BzLCBTdGF0ZT4ge1xyXG4gICAgICAgIHByb3BzOiBQcm9wcztcclxuICAgICAgICBzdGF0ZTogU3RhdGU7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFtjb25zdHJ1Y3Rvcl1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gcHJvcHNcclxuICAgICAgICAgKiBAcmV0dXJuIHtXcmFwcGVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3BzOiBQcm9wcykge1xyXG4gICAgICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICBpc09wZW46IGZhbHNlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIaWRlcyB0aGUgbW9kYWwgYW5kIGNhbGwgdGhlIGNhbGxiYWNrXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGNhbGxcclxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsb3NlKGNhbGxiYWNrOiBGdW5jdGlvbiwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc09wZW46IGZhbHNlIH0sICgpID0+IGNhbGxiYWNrKGRhdGEpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxiYWNrIGZvciBjbGlja2luZ1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBkYXRhIC0gYW55IGNhbGxiYWNrIGRhdGFcclxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uQ2xpY2sgPSAoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgb25DbGljayA9IG5vb3AgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKG9uQ2xpY2ssIGRhdGEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxiYWNrIGZvciBwcmVzc2luZyBjbG9zZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBkYXRhIC0gYW55IGNhbGxiYWNrIGRhdGFcclxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uQ2xvc2UgPSAoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgb25DbG9zZSA9IG5vb3AgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKG9uQ2xvc2UsIGRhdGEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxiYWNrIGZvciBwcmVzc2luZyBjYW5jZWxcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gZGF0YSAtIGFueSBjYWxsYmFjayBkYXRhXHJcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkNhbmNlbCA9IChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgeyBvbkNhbmNlbCA9IG5vb3AgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKG9uQ2FuY2VsLCBkYXRhKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxsYmFjayBmb3IgcHJlc3NpbmcgY2hvb3NlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGRhdGEgLSBhbnkgY2FsbGJhY2sgZGF0YVxyXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25DaG9vc2UgPSAoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgb25DaG9vc2UgPSBub29wIH06IFByb3BzID0gdGhpcy5wcm9wcztcclxuICAgICAgICAgICAgdGhpcy5jbG9zZShvbkNob29zZSwgZGF0YSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnV0dG9uIGNsaWNrIGhhbmRsZXJcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25CdXR0b25DbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzT3BlbjogdHJ1ZSB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZW5kZXJzIHRoZSBjb21wb25lbnRcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmVuZGVyKCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGlzT3BlbiB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgbW9kYWwsIC4uLnJlc3QgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgICAgICBjb25zdCB3cmFwcGVkUHJvcHMgPSBvbWl0KHJlc3QsIFsnb25DYW5jZWwnLCAnb25DaG9vc2UnLCAnb25DbG9zZScsICdtb2RhbCddKTtcclxuICAgICAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uTGFiZWwgPSAnTWlzc2luZyBtb2RhbC5idXR0b25MYWJlbCBpbiBvcHRpb25zJyxcclxuICAgICAgICAgICAgICAgIGJ1dHRvbkNsYXNzTmFtZSA9ICdidWlrLWJ0biBidWlrLWJ0bi1wcmltYXJ5JyxcclxuICAgICAgICAgICAgICAgIG1vZGFsQ2xhc3NOYW1lID0gJ2J1aWstbW9kYWwtd3JhcHBlci1jb250ZW50JyxcclxuICAgICAgICAgICAgICAgIG92ZXJsYXlDbGFzc05hbWUgPSAnYnVpay1tb2RhbC13cmFwcGVyLW92ZXJsYXknXHJcbiAgICAgICAgICAgIH06IE1vZGFsT3B0aW9ucyA9IG1vZGFsO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChraXQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQ0xJRU5UX05BTUVfQ09OVEVOVF9QSUNLRVI6XHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlZFByb3BzLm9uQ2FuY2VsID0gdGhpcy5vbkNhbmNlbDtcclxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVkUHJvcHMub25DaG9vc2UgPSB0aGlzLm9uQ2hvb3NlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDTElFTlRfTkFNRV9DT05URU5UX1VQTE9BREVSOlxyXG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZWRQcm9wcy5vbkNsb3NlID0gdGhpcy5vbkNsb3NlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDTElFTlRfTkFNRV9DT05URU5UX1RSRUU6XHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlZFByb3BzLm9uQ2xpY2sgPSB0aGlzLm9uQ2xpY2s7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBraXQgdHlwZScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9J2J1dHRvbicgb25DbGljaz17dGhpcy5vbkJ1dHRvbkNsaWNrfSBjbGFzc05hbWU9e2J1dHRvbkNsYXNzTmFtZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtidXR0b25MYWJlbH1cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8TW9kYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNPcGVuPXtpc09wZW59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRMYWJlbD17a2l0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e21vZGFsQ2xhc3NOYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5Q2xhc3NOYW1lPXtvdmVybGF5Q2xhc3NOYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFdyYXBwZWQgey4uLndyYXBwZWRQcm9wc30gLz5cclxuICAgICAgICAgICAgICAgICAgICA8L01vZGFsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1ha2VQb3B1cDtcclxuIl19