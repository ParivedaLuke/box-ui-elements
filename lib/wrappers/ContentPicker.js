var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Base class for the content picker ES6 wrapper
 * @author Box
 */

import React from 'react';
import { render as _render } from 'react-dom';
import ES6Wrapper from './ES6Wrapper';
import ContentPickerPopup from '../components/ContentPicker/ContentPickerPopup';
import ContentPickerComponent from '../components/ContentPicker/ContentPicker';
import { TYPE_FOLDER, TYPE_FILE, TYPE_WEBLINK, CLIENT_NAME_CONTENT_PICKER } from '../constants';

var ContentPicker = function (_ES6Wrapper) {
    _inherits(ContentPicker, _ES6Wrapper);

    function ContentPicker() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ContentPicker);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ContentPicker.__proto__ || Object.getPrototypeOf(ContentPicker)).call.apply(_ref, [this].concat(args))), _this), _this.onChoose = function (data) {
            _this.emit('choose', data);
        }, _this.onCancel = function () {
            _this.emit('cancel');
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    /**
     * Callback for pressing choose
     *
     * @param {Array} data - chosen box items
     * @return {void}
     */


    /**
     * Callback for pressing cancel
     *
     * @return {void}
     */


    _createClass(ContentPicker, [{
        key: 'getType',


        /**
         * Returns the type of content picker
         *
         * @return {void}
         */
        value: function getType() {
            var _ref2 = this.options || {},
                type = _ref2.type;

            return type || TYPE_FOLDER + ',' + TYPE_FILE + ',' + TYPE_WEBLINK;
        }

        /**
         * Returns the name for content picker
         *
         * @return {void}
         */

    }, {
        key: 'getClientName',
        value: function getClientName() {
            return CLIENT_NAME_CONTENT_PICKER;
        }

        /** @inheritdoc */

    }, {
        key: 'render',
        value: function render() {
            var _options = this.options,
                modal = _options.modal,
                rest = _objectWithoutProperties(_options, ['modal']);

            var PickerComponent = modal ? ContentPickerPopup : ContentPickerComponent;
            _render(React.createElement(PickerComponent, _extends({
                clientName: this.getClientName(),
                getLocalizedMessage: this.getLocalizedMessage,
                componentRef: this.setComponent,
                rootFolderId: this.root,
                token: this.token,
                type: this.getType(),
                onCancel: this.onCancel,
                onChoose: this.onChoose,
                modal: modal
            }, rest)), this.container);
        }
    }]);

    return ContentPicker;
}(ES6Wrapper);

export default ContentPicker;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRlbnRQaWNrZXIuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJyZW5kZXIiLCJFUzZXcmFwcGVyIiwiQ29udGVudFBpY2tlclBvcHVwIiwiQ29udGVudFBpY2tlckNvbXBvbmVudCIsIlRZUEVfRk9MREVSIiwiVFlQRV9GSUxFIiwiVFlQRV9XRUJMSU5LIiwiQ0xJRU5UX05BTUVfQ09OVEVOVF9QSUNLRVIiLCJDb250ZW50UGlja2VyIiwib25DaG9vc2UiLCJkYXRhIiwiZW1pdCIsIm9uQ2FuY2VsIiwib3B0aW9ucyIsInR5cGUiLCJtb2RhbCIsInJlc3QiLCJQaWNrZXJDb21wb25lbnQiLCJnZXRDbGllbnROYW1lIiwiZ2V0TG9jYWxpemVkTWVzc2FnZSIsInNldENvbXBvbmVudCIsInJvb3QiLCJ0b2tlbiIsImdldFR5cGUiLCJjb250YWluZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFNQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsaUJBQVQsUUFBdUIsV0FBdkI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLGNBQXZCO0FBQ0EsT0FBT0Msa0JBQVAsTUFBK0IsZ0RBQS9CO0FBQ0EsT0FBT0Msc0JBQVAsTUFBbUMsMkNBQW5DO0FBQ0EsU0FBU0MsV0FBVCxFQUFzQkMsU0FBdEIsRUFBaUNDLFlBQWpDLEVBQStDQywwQkFBL0MsUUFBaUYsY0FBakY7O0lBR01DLGE7Ozs7Ozs7Ozs7Ozs7O3dNQU9GQyxRLEdBQVcsVUFBQ0MsSUFBRCxFQUEyQjtBQUNsQyxrQkFBS0MsSUFBTCxDQUFVLFFBQVYsRUFBb0JELElBQXBCO0FBQ0gsUyxRQU9ERSxRLEdBQVcsWUFBWTtBQUNuQixrQkFBS0QsSUFBTCxDQUFVLFFBQVY7QUFDSCxTOztBQWpCRDs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7Ozs7QUFTQTs7Ozs7a0NBS2tCO0FBQUEsd0JBQ0csS0FBS0UsT0FBTCxJQUFnQixFQURuQjtBQUFBLGdCQUNOQyxJQURNLFNBQ05BLElBRE07O0FBRWQsbUJBQU9BLFFBQVdWLFdBQVgsU0FBMEJDLFNBQTFCLFNBQXVDQyxZQUE5QztBQUNIOztBQUVEOzs7Ozs7Ozt3Q0FLd0I7QUFDcEIsbUJBQU9DLDBCQUFQO0FBQ0g7O0FBRUQ7Ozs7aUNBQ1M7QUFBQSwyQkFDZ0QsS0FBS00sT0FEckQ7QUFBQSxnQkFDR0UsS0FESCxZQUNHQSxLQURIO0FBQUEsZ0JBQ2FDLElBRGI7O0FBRUwsZ0JBQU1DLGtCQUFrQkYsUUFBUWIsa0JBQVIsR0FBNkJDLHNCQUFyRDtBQUNBSCxvQkFDSSxvQkFBQyxlQUFEO0FBQ0ksNEJBQVksS0FBS2tCLGFBQUwsRUFEaEI7QUFFSSxxQ0FBcUIsS0FBS0MsbUJBRjlCO0FBR0ksOEJBQWMsS0FBS0MsWUFIdkI7QUFJSSw4QkFBYyxLQUFLQyxJQUp2QjtBQUtJLHVCQUFPLEtBQUtDLEtBTGhCO0FBTUksc0JBQU0sS0FBS0MsT0FBTCxFQU5WO0FBT0ksMEJBQVUsS0FBS1gsUUFQbkI7QUFRSSwwQkFBVSxLQUFLSCxRQVJuQjtBQVNJLHVCQUFPTTtBQVRYLGVBVVFDLElBVlIsRUFESixFQWFJLEtBQUtRLFNBYlQ7QUFlSDs7OztFQTFEdUJ2QixVOztBQTZENUIsZUFBZU8sYUFBZiIsImZpbGUiOiJDb250ZW50UGlja2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEJhc2UgY2xhc3MgZm9yIHRoZSBjb250ZW50IHBpY2tlciBFUzYgd3JhcHBlclxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBFUzZXcmFwcGVyIGZyb20gJy4vRVM2V3JhcHBlcic7XHJcbmltcG9ydCBDb250ZW50UGlja2VyUG9wdXAgZnJvbSAnLi4vY29tcG9uZW50cy9Db250ZW50UGlja2VyL0NvbnRlbnRQaWNrZXJQb3B1cCc7XHJcbmltcG9ydCBDb250ZW50UGlja2VyQ29tcG9uZW50IGZyb20gJy4uL2NvbXBvbmVudHMvQ29udGVudFBpY2tlci9Db250ZW50UGlja2VyJztcclxuaW1wb3J0IHsgVFlQRV9GT0xERVIsIFRZUEVfRklMRSwgVFlQRV9XRUJMSU5LLCBDTElFTlRfTkFNRV9DT05URU5UX1BJQ0tFUiB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB0eXBlIHsgQm94SXRlbSwgTW9kYWxPcHRpb25zIH0gZnJvbSAnLi4vZmxvd1R5cGVzJztcclxuXHJcbmNsYXNzIENvbnRlbnRQaWNrZXIgZXh0ZW5kcyBFUzZXcmFwcGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgZm9yIHByZXNzaW5nIGNob29zZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgLSBjaG9zZW4gYm94IGl0ZW1zXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBvbkNob29zZSA9IChkYXRhOiBCb3hJdGVtW10pOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLmVtaXQoJ2Nob29zZScsIGRhdGEpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIGZvciBwcmVzc2luZyBjYW5jZWxcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBvbkNhbmNlbCA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLmVtaXQoJ2NhbmNlbCcpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHR5cGUgb2YgY29udGVudCBwaWNrZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgeyB0eXBlIH0gPSB0aGlzLm9wdGlvbnMgfHwge307XHJcbiAgICAgICAgcmV0dXJuIHR5cGUgfHwgYCR7VFlQRV9GT0xERVJ9LCR7VFlQRV9GSUxFfSwke1RZUEVfV0VCTElOS31gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBmb3IgY29udGVudCBwaWNrZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBnZXRDbGllbnROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIENMSUVOVF9OQU1FX0NPTlRFTlRfUElDS0VSO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgbW9kYWwsIC4uLnJlc3QgfTogeyBtb2RhbD86IE1vZGFsT3B0aW9ucyB9ID0gdGhpcy5vcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IFBpY2tlckNvbXBvbmVudCA9IG1vZGFsID8gQ29udGVudFBpY2tlclBvcHVwIDogQ29udGVudFBpY2tlckNvbXBvbmVudDtcclxuICAgICAgICByZW5kZXIoXHJcbiAgICAgICAgICAgIDxQaWNrZXJDb21wb25lbnRcclxuICAgICAgICAgICAgICAgIGNsaWVudE5hbWU9e3RoaXMuZ2V0Q2xpZW50TmFtZSgpfVxyXG4gICAgICAgICAgICAgICAgZ2V0TG9jYWxpemVkTWVzc2FnZT17dGhpcy5nZXRMb2NhbGl6ZWRNZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50UmVmPXt0aGlzLnNldENvbXBvbmVudH1cclxuICAgICAgICAgICAgICAgIHJvb3RGb2xkZXJJZD17dGhpcy5yb290fVxyXG4gICAgICAgICAgICAgICAgdG9rZW49e3RoaXMudG9rZW59XHJcbiAgICAgICAgICAgICAgICB0eXBlPXt0aGlzLmdldFR5cGUoKX1cclxuICAgICAgICAgICAgICAgIG9uQ2FuY2VsPXt0aGlzLm9uQ2FuY2VsfVxyXG4gICAgICAgICAgICAgICAgb25DaG9vc2U9e3RoaXMub25DaG9vc2V9XHJcbiAgICAgICAgICAgICAgICBtb2RhbD17bW9kYWx9XHJcbiAgICAgICAgICAgICAgICB7Li4ucmVzdH1cclxuICAgICAgICAgICAgLz4sXHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udGVudFBpY2tlcjtcclxuIl19