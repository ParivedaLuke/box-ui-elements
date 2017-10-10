var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
import ContentExplorerComponent from '../components/ContentExplorer/ContentExplorer';

var ContentExplorer = function (_ES6Wrapper) {
    _inherits(ContentExplorer, _ES6Wrapper);

    function ContentExplorer() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ContentExplorer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ContentExplorer.__proto__ || Object.getPrototypeOf(ContentExplorer)).call.apply(_ref, [this].concat(args))), _this), _this.onSelect = function (data) {
            _this.emit('select', data);
        }, _this.onNavigate = function (data) {
            _this.emit('navigate', data);
        }, _this.onRename = function (data) {
            _this.emit('rename', data);
        }, _this.onPreview = function (data) {
            _this.emit('preview', data);
        }, _this.onDownload = function (data) {
            _this.emit('download', data);
        }, _this.onDelete = function (data) {
            _this.emit('delete', data);
        }, _this.onUpload = function (data) {
            _this.emit('upload', data);
        }, _this.onCreate = function (data) {
            _this.emit('create', data);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    /**
     * Callback for selecting files
     *
     * @param {Array} data - chosen box items
     * @return {void}
     */


    /**
     * Callback for navigating into a folder
     *
     * @param {Object} data - chosen box items
     * @return {void}
     */


    /**
     * Callback for renaming file
     *
     * @return {void}
     */


    /**
     * Callback for previewing a file
     *
     * @return {void}
     */


    /**
     * Callback for downloading a file
     *
     * @return {void}
     */


    /**
     * Callback for deleting a file
     *
     * @return {void}
     */


    /**
     * Callback for uploading a file
     *
     * @return {void}
     */


    /**
     * Callback for creating a folder
     *
     * @return {void}
     */


    _createClass(ContentExplorer, [{
        key: 'navigateTo',


        /**
         * Helper to programatically navigate
         *
         * @param {string} id - string folder id
         * @return {void}
         */
        value: function navigateTo(id) {
            var component = this.getComponent();
            if (component && typeof component.clearCache === 'function') {
                component.fetchFolder(id);
            }
        }

        /** @inheritdoc */

    }, {
        key: 'render',
        value: function render() {
            _render(React.createElement(ContentExplorerComponent, _extends({
                rootFolderId: this.root,
                token: this.token,
                componentRef: this.setComponent,
                getLocalizedMessage: this.getLocalizedMessage,
                onDelete: this.onDelete,
                onDownload: this.onDownload,
                onPreview: this.onPreview,
                onRename: this.onRename,
                onSelect: this.onSelect,
                onUpload: this.onUpload,
                onCreate: this.onCreate,
                onNavigate: this.onNavigate
            }, this.options)), this.container);
        }
    }]);

    return ContentExplorer;
}(ES6Wrapper);

global.Box = global.Box || {};
global.Box.ContentExplorer = ContentExplorer;
export default ContentExplorer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRlbnRFeHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlbmRlciIsIkVTNldyYXBwZXIiLCJDb250ZW50RXhwbG9yZXJDb21wb25lbnQiLCJDb250ZW50RXhwbG9yZXIiLCJvblNlbGVjdCIsImRhdGEiLCJlbWl0Iiwib25OYXZpZ2F0ZSIsIm9uUmVuYW1lIiwib25QcmV2aWV3Iiwib25Eb3dubG9hZCIsIm9uRGVsZXRlIiwib25VcGxvYWQiLCJvbkNyZWF0ZSIsImlkIiwiY29tcG9uZW50IiwiZ2V0Q29tcG9uZW50IiwiY2xlYXJDYWNoZSIsImZldGNoRm9sZGVyIiwicm9vdCIsInRva2VuIiwic2V0Q29tcG9uZW50IiwiZ2V0TG9jYWxpemVkTWVzc2FnZSIsIm9wdGlvbnMiLCJjb250YWluZXIiLCJnbG9iYWwiLCJCb3giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLFNBQVNDLGlCQUFULFFBQXVCLFdBQXZCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixjQUF2QjtBQUNBLE9BQU9DLHdCQUFQLE1BQXFDLCtDQUFyQzs7SUFHTUMsZTs7Ozs7Ozs7Ozs7Ozs7NE1BT0ZDLFEsR0FBVyxVQUFDQyxJQUFELEVBQTJCO0FBQ2xDLGtCQUFLQyxJQUFMLENBQVUsUUFBVixFQUFvQkQsSUFBcEI7QUFDSCxTLFFBUURFLFUsR0FBYSxVQUFDRixJQUFELEVBQXlCO0FBQ2xDLGtCQUFLQyxJQUFMLENBQVUsVUFBVixFQUFzQkQsSUFBdEI7QUFDSCxTLFFBT0RHLFEsR0FBVyxVQUFDSCxJQUFELEVBQXlCO0FBQ2hDLGtCQUFLQyxJQUFMLENBQVUsUUFBVixFQUFvQkQsSUFBcEI7QUFDSCxTLFFBT0RJLFMsR0FBWSxVQUFDSixJQUFELEVBQXlCO0FBQ2pDLGtCQUFLQyxJQUFMLENBQVUsU0FBVixFQUFxQkQsSUFBckI7QUFDSCxTLFFBT0RLLFUsR0FBYSxVQUFDTCxJQUFELEVBQTJCO0FBQ3BDLGtCQUFLQyxJQUFMLENBQVUsVUFBVixFQUFzQkQsSUFBdEI7QUFDSCxTLFFBT0RNLFEsR0FBVyxVQUFDTixJQUFELEVBQTJCO0FBQ2xDLGtCQUFLQyxJQUFMLENBQVUsUUFBVixFQUFvQkQsSUFBcEI7QUFDSCxTLFFBT0RPLFEsR0FBVyxVQUFDUCxJQUFELEVBQTJCO0FBQ2xDLGtCQUFLQyxJQUFMLENBQVUsUUFBVixFQUFvQkQsSUFBcEI7QUFDSCxTLFFBT0RRLFEsR0FBVyxVQUFDUixJQUFELEVBQXlCO0FBQ2hDLGtCQUFLQyxJQUFMLENBQVUsUUFBVixFQUFvQkQsSUFBcEI7QUFDSCxTOztBQXhFRDs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7QUFVQTs7Ozs7OztBQVNBOzs7Ozs7O0FBU0E7Ozs7Ozs7QUFTQTs7Ozs7OztBQVNBOzs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7O0FBU0E7Ozs7OzttQ0FNV1MsRSxFQUFrQjtBQUN6QixnQkFBTUMsWUFBWSxLQUFLQyxZQUFMLEVBQWxCO0FBQ0EsZ0JBQUlELGFBQWEsT0FBT0EsVUFBVUUsVUFBakIsS0FBZ0MsVUFBakQsRUFBNkQ7QUFDekRGLDBCQUFVRyxXQUFWLENBQXNCSixFQUF0QjtBQUNIO0FBQ0o7O0FBRUQ7Ozs7aUNBQ1M7QUFDTGQsb0JBQ0ksb0JBQUMsd0JBQUQ7QUFDSSw4QkFBYyxLQUFLbUIsSUFEdkI7QUFFSSx1QkFBTyxLQUFLQyxLQUZoQjtBQUdJLDhCQUFjLEtBQUtDLFlBSHZCO0FBSUkscUNBQXFCLEtBQUtDLG1CQUo5QjtBQUtJLDBCQUFVLEtBQUtYLFFBTG5CO0FBTUksNEJBQVksS0FBS0QsVUFOckI7QUFPSSwyQkFBVyxLQUFLRCxTQVBwQjtBQVFJLDBCQUFVLEtBQUtELFFBUm5CO0FBU0ksMEJBQVUsS0FBS0osUUFUbkI7QUFVSSwwQkFBVSxLQUFLUSxRQVZuQjtBQVdJLDBCQUFVLEtBQUtDLFFBWG5CO0FBWUksNEJBQVksS0FBS047QUFackIsZUFhUSxLQUFLZ0IsT0FiYixFQURKLEVBZ0JJLEtBQUtDLFNBaEJUO0FBa0JIOzs7O0VBNUd5QnZCLFU7O0FBK0c5QndCLE9BQU9DLEdBQVAsR0FBYUQsT0FBT0MsR0FBUCxJQUFjLEVBQTNCO0FBQ0FELE9BQU9DLEdBQVAsQ0FBV3ZCLGVBQVgsR0FBNkJBLGVBQTdCO0FBQ0EsZUFBZUEsZUFBZiIsImZpbGUiOiJDb250ZW50RXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgQmFzZSBjbGFzcyBmb3IgdGhlIGNvbnRlbnQgcGlja2VyIEVTNiB3cmFwcGVyXHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IEVTNldyYXBwZXIgZnJvbSAnLi9FUzZXcmFwcGVyJztcclxuaW1wb3J0IENvbnRlbnRFeHBsb3JlckNvbXBvbmVudCBmcm9tICcuLi9jb21wb25lbnRzL0NvbnRlbnRFeHBsb3Jlci9Db250ZW50RXhwbG9yZXInO1xyXG5pbXBvcnQgdHlwZSB7IEJveEl0ZW0gfSBmcm9tICcuLi9mbG93VHlwZXMnO1xyXG5cclxuY2xhc3MgQ29udGVudEV4cGxvcmVyIGV4dGVuZHMgRVM2V3JhcHBlciB7XHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIGZvciBzZWxlY3RpbmcgZmlsZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIC0gY2hvc2VuIGJveCBpdGVtc1xyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgb25TZWxlY3QgPSAoZGF0YTogQm94SXRlbVtdKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdzZWxlY3QnLCBkYXRhKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayBmb3IgbmF2aWdhdGluZyBpbnRvIGEgZm9sZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBjaG9zZW4gYm94IGl0ZW1zXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBvbk5hdmlnYXRlID0gKGRhdGE6IEJveEl0ZW0pOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLmVtaXQoJ25hdmlnYXRlJywgZGF0YSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgZm9yIHJlbmFtaW5nIGZpbGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBvblJlbmFtZSA9IChkYXRhOiBCb3hJdGVtKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdyZW5hbWUnLCBkYXRhKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayBmb3IgcHJldmlld2luZyBhIGZpbGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBvblByZXZpZXcgPSAoZGF0YTogQm94SXRlbSk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMuZW1pdCgncHJldmlldycsIGRhdGEpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIGZvciBkb3dubG9hZGluZyBhIGZpbGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBvbkRvd25sb2FkID0gKGRhdGE6IEJveEl0ZW1bXSk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMuZW1pdCgnZG93bmxvYWQnLCBkYXRhKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayBmb3IgZGVsZXRpbmcgYSBmaWxlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgb25EZWxldGUgPSAoZGF0YTogQm94SXRlbVtdKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdkZWxldGUnLCBkYXRhKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayBmb3IgdXBsb2FkaW5nIGEgZmlsZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIG9uVXBsb2FkID0gKGRhdGE6IEJveEl0ZW1bXSk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMuZW1pdCgndXBsb2FkJywgZGF0YSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgZm9yIGNyZWF0aW5nIGEgZm9sZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgb25DcmVhdGUgPSAoZGF0YTogQm94SXRlbSk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMuZW1pdCgnY3JlYXRlJywgZGF0YSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGVscGVyIHRvIHByb2dyYW1hdGljYWxseSBuYXZpZ2F0ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHN0cmluZyBmb2xkZXIgaWRcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIG5hdmlnYXRlVG8oaWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuZ2V0Q29tcG9uZW50KCk7XHJcbiAgICAgICAgaWYgKGNvbXBvbmVudCAmJiB0eXBlb2YgY29tcG9uZW50LmNsZWFyQ2FjaGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50LmZldGNoRm9sZGVyKGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmVuZGVyKFxyXG4gICAgICAgICAgICA8Q29udGVudEV4cGxvcmVyQ29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICByb290Rm9sZGVySWQ9e3RoaXMucm9vdH1cclxuICAgICAgICAgICAgICAgIHRva2VuPXt0aGlzLnRva2VufVxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50UmVmPXt0aGlzLnNldENvbXBvbmVudH1cclxuICAgICAgICAgICAgICAgIGdldExvY2FsaXplZE1lc3NhZ2U9e3RoaXMuZ2V0TG9jYWxpemVkTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgIG9uRGVsZXRlPXt0aGlzLm9uRGVsZXRlfVxyXG4gICAgICAgICAgICAgICAgb25Eb3dubG9hZD17dGhpcy5vbkRvd25sb2FkfVxyXG4gICAgICAgICAgICAgICAgb25QcmV2aWV3PXt0aGlzLm9uUHJldmlld31cclxuICAgICAgICAgICAgICAgIG9uUmVuYW1lPXt0aGlzLm9uUmVuYW1lfVxyXG4gICAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3R9XHJcbiAgICAgICAgICAgICAgICBvblVwbG9hZD17dGhpcy5vblVwbG9hZH1cclxuICAgICAgICAgICAgICAgIG9uQ3JlYXRlPXt0aGlzLm9uQ3JlYXRlfVxyXG4gICAgICAgICAgICAgICAgb25OYXZpZ2F0ZT17dGhpcy5vbk5hdmlnYXRlfVxyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMub3B0aW9uc31cclxuICAgICAgICAgICAgLz4sXHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZ2xvYmFsLkJveCA9IGdsb2JhbC5Cb3ggfHwge307XHJcbmdsb2JhbC5Cb3guQ29udGVudEV4cGxvcmVyID0gQ29udGVudEV4cGxvcmVyO1xyXG5leHBvcnQgZGVmYXVsdCBDb250ZW50RXhwbG9yZXI7XHJcbiJdfQ==