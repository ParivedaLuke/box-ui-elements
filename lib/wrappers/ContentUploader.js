var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Base class for the content uploader ES6 wrapper
 * @author Box
 */

import React from 'react';
import { render as _render } from 'react-dom';
import ES6Wrapper from './ES6Wrapper';
import ContentUploaderPopup from '../components/ContentUploader/ContentUploaderPopup';
import ContentUploaderComponent from '../components/ContentUploader/ContentUploader';

var ContentUploader = function (_ES6Wrapper) {
    _inherits(ContentUploader, _ES6Wrapper);

    function ContentUploader() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ContentUploader);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ContentUploader.__proto__ || Object.getPrototypeOf(ContentUploader)).call.apply(_ref, [this].concat(args))), _this), _this.onClose = function () {
            _this.emit('close');
        }, _this.onComplete = function (data) {
            _this.emit('complete', data);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    /**
     * Callback on closing uploader. Emits 'close' event.
     *
     * @return {void}
     */


    /**
     * Callback on completed upload. Emits 'complete' event with Box File objects of uploaded items as data.
     *
     * @param {Array} data - Completed upload items
     * @return {void}
     */


    _createClass(ContentUploader, [{
        key: 'render',


        /** @inheritdoc */
        value: function render() {
            var _options = this.options,
                modal = _options.modal,
                rest = _objectWithoutProperties(_options, ['modal']);

            var UploaderComponent = modal ? ContentUploaderPopup : ContentUploaderComponent;
            _render(React.createElement(UploaderComponent, _extends({
                getLocalizedMessage: this.getLocalizedMessage,
                componentRef: this.setComponent,
                rootFolderId: this.root,
                token: this.token,
                onClose: this.onClose,
                onComplete: this.onComplete,
                modal: modal
            }, rest)), this.container);
        }
    }]);

    return ContentUploader;
}(ES6Wrapper);

global.Box = global.Box || {};
global.Box.ContentUploader = ContentUploader;
export default ContentUploader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRlbnRVcGxvYWRlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlbmRlciIsIkVTNldyYXBwZXIiLCJDb250ZW50VXBsb2FkZXJQb3B1cCIsIkNvbnRlbnRVcGxvYWRlckNvbXBvbmVudCIsIkNvbnRlbnRVcGxvYWRlciIsIm9uQ2xvc2UiLCJlbWl0Iiwib25Db21wbGV0ZSIsImRhdGEiLCJvcHRpb25zIiwibW9kYWwiLCJyZXN0IiwiVXBsb2FkZXJDb21wb25lbnQiLCJnZXRMb2NhbGl6ZWRNZXNzYWdlIiwic2V0Q29tcG9uZW50Iiwicm9vdCIsInRva2VuIiwiY29udGFpbmVyIiwiZ2xvYmFsIiwiQm94Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLFNBQVNDLGlCQUFULFFBQXVCLFdBQXZCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixjQUF2QjtBQUNBLE9BQU9DLG9CQUFQLE1BQWlDLG9EQUFqQztBQUNBLE9BQU9DLHdCQUFQLE1BQXFDLCtDQUFyQzs7SUFHTUMsZTs7Ozs7Ozs7Ozs7Ozs7NE1BTUZDLE8sR0FBVSxZQUFZO0FBQ2xCLGtCQUFLQyxJQUFMLENBQVUsT0FBVjtBQUNILFMsUUFRREMsVSxHQUFhLFVBQUNDLElBQUQsRUFBMkI7QUFDcEMsa0JBQUtGLElBQUwsQ0FBVSxVQUFWLEVBQXNCRSxJQUF0QjtBQUNILFM7O0FBakJEOzs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7OztBQVVBO2lDQUNTO0FBQUEsMkJBQ2dELEtBQUtDLE9BRHJEO0FBQUEsZ0JBQ0dDLEtBREgsWUFDR0EsS0FESDtBQUFBLGdCQUNhQyxJQURiOztBQUVMLGdCQUFNQyxvQkFBb0JGLFFBQVFSLG9CQUFSLEdBQStCQyx3QkFBekQ7QUFDQUgsb0JBQ0ksb0JBQUMsaUJBQUQ7QUFDSSxxQ0FBcUIsS0FBS2EsbUJBRDlCO0FBRUksOEJBQWMsS0FBS0MsWUFGdkI7QUFHSSw4QkFBYyxLQUFLQyxJQUh2QjtBQUlJLHVCQUFPLEtBQUtDLEtBSmhCO0FBS0kseUJBQVMsS0FBS1gsT0FMbEI7QUFNSSw0QkFBWSxLQUFLRSxVQU5yQjtBQU9JLHVCQUFPRztBQVBYLGVBUVFDLElBUlIsRUFESixFQVdJLEtBQUtNLFNBWFQ7QUFhSDs7OztFQXJDeUJoQixVOztBQXdDOUJpQixPQUFPQyxHQUFQLEdBQWFELE9BQU9DLEdBQVAsSUFBYyxFQUEzQjtBQUNBRCxPQUFPQyxHQUFQLENBQVdmLGVBQVgsR0FBNkJBLGVBQTdCO0FBQ0EsZUFBZUEsZUFBZiIsImZpbGUiOiJDb250ZW50VXBsb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgQmFzZSBjbGFzcyBmb3IgdGhlIGNvbnRlbnQgdXBsb2FkZXIgRVM2IHdyYXBwZXJcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgRVM2V3JhcHBlciBmcm9tICcuL0VTNldyYXBwZXInO1xyXG5pbXBvcnQgQ29udGVudFVwbG9hZGVyUG9wdXAgZnJvbSAnLi4vY29tcG9uZW50cy9Db250ZW50VXBsb2FkZXIvQ29udGVudFVwbG9hZGVyUG9wdXAnO1xyXG5pbXBvcnQgQ29udGVudFVwbG9hZGVyQ29tcG9uZW50IGZyb20gJy4uL2NvbXBvbmVudHMvQ29udGVudFVwbG9hZGVyL0NvbnRlbnRVcGxvYWRlcic7XHJcbmltcG9ydCB0eXBlIHsgQm94SXRlbSwgTW9kYWxPcHRpb25zIH0gZnJvbSAnLi4vZmxvd1R5cGVzJztcclxuXHJcbmNsYXNzIENvbnRlbnRVcGxvYWRlciBleHRlbmRzIEVTNldyYXBwZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayBvbiBjbG9zaW5nIHVwbG9hZGVyLiBFbWl0cyAnY2xvc2UnIGV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIG9uQ2xvc2UgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdjbG9zZScpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIG9uIGNvbXBsZXRlZCB1cGxvYWQuIEVtaXRzICdjb21wbGV0ZScgZXZlbnQgd2l0aCBCb3ggRmlsZSBvYmplY3RzIG9mIHVwbG9hZGVkIGl0ZW1zIGFzIGRhdGEuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gZGF0YSAtIENvbXBsZXRlZCB1cGxvYWQgaXRlbXNcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIG9uQ29tcGxldGUgPSAoZGF0YTogQm94SXRlbVtdKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdjb21wbGV0ZScsIGRhdGEpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IG1vZGFsLCAuLi5yZXN0IH06IHsgbW9kYWw/OiBNb2RhbE9wdGlvbnMgfSA9IHRoaXMub3B0aW9ucztcclxuICAgICAgICBjb25zdCBVcGxvYWRlckNvbXBvbmVudCA9IG1vZGFsID8gQ29udGVudFVwbG9hZGVyUG9wdXAgOiBDb250ZW50VXBsb2FkZXJDb21wb25lbnQ7XHJcbiAgICAgICAgcmVuZGVyKFxyXG4gICAgICAgICAgICA8VXBsb2FkZXJDb21wb25lbnRcclxuICAgICAgICAgICAgICAgIGdldExvY2FsaXplZE1lc3NhZ2U9e3RoaXMuZ2V0TG9jYWxpemVkTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFJlZj17dGhpcy5zZXRDb21wb25lbnR9XHJcbiAgICAgICAgICAgICAgICByb290Rm9sZGVySWQ9e3RoaXMucm9vdH1cclxuICAgICAgICAgICAgICAgIHRva2VuPXt0aGlzLnRva2VufVxyXG4gICAgICAgICAgICAgICAgb25DbG9zZT17dGhpcy5vbkNsb3NlfVxyXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZT17dGhpcy5vbkNvbXBsZXRlfVxyXG4gICAgICAgICAgICAgICAgbW9kYWw9e21vZGFsfVxyXG4gICAgICAgICAgICAgICAgey4uLnJlc3R9XHJcbiAgICAgICAgICAgIC8+LFxyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lclxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmdsb2JhbC5Cb3ggPSBnbG9iYWwuQm94IHx8IHt9O1xyXG5nbG9iYWwuQm94LkNvbnRlbnRVcGxvYWRlciA9IENvbnRlbnRVcGxvYWRlcjtcclxuZXhwb3J0IGRlZmF1bHQgQ29udGVudFVwbG9hZGVyO1xyXG4iXX0=