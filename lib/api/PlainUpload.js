var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the plain Box Upload API
 * @author Box
 */

import noop from 'lodash.noop';
import Base from './Base';

var PlainUpload = function (_Base) {
    _inherits(PlainUpload, _Base);

    function PlainUpload() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, PlainUpload);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PlainUpload.__proto__ || Object.getPrototypeOf(PlainUpload)).call.apply(_ref, [this].concat(args))), _this), _this.uploadPreflightSuccessHandler = function (_ref2) {
            var upload_url = _ref2.upload_url;

            if (_this.isDestroyed()) {
                return;
            }

            // Make an actual POST request to the fast upload URL returned by pre-flight
            _this.makeRequest({
                url: upload_url
            });
        }, _this.uploadSuccessHandler = function (_ref3) {
            var entries = _ref3.entries;

            if (_this.isDestroyed()) {
                return;
            }

            if (typeof _this.successCallback === 'function') {
                // Response entries are the successfully created Box File objects
                _this.successCallback(entries);
            }
        }, _this.uploadProgressHandler = function (event) {
            if (_this.isDestroyed()) {
                return;
            }

            if (typeof _this.progressCallback === 'function') {
                _this.progressCallback(event);
            }
        }, _this.uploadErrorHandler = function (error) {
            if (_this.isDestroyed()) {
                return;
            }

            // Automatically handle name conflict errors
            if (error && error.status === 409) {
                if (_this.overwrite) {
                    // Error response contains file ID to upload a new file version for
                    _this.makePreflightRequest({
                        fileId: error.context_info.conflicts.id
                    });
                } else {
                    // Otherwise, reupload and append timestamp
                    // 'test.jpg' becomes 'test-TIMESTAMP.jpg'
                    var name = _this.file.name;

                    var extension = name.substr(name.lastIndexOf('.')) || '';
                    _this.makePreflightRequest({
                        fileName: name.substr(0, name.lastIndexOf('.')) + '-' + Date.now() + extension
                    });
                }
            } else if (typeof _this.errorCallback === 'function') {
                _this.errorCallback(error);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * Handles a upload preflight success response
     *
     * @param {Object} data - Preflight success data
     * @return {void}
     */


    /**
     * Handles an upload success response
     *
     * @param {Object} data - Upload success data
     * @return {void}
     */


    /**
     * Handles an upload progress event
     *
     * @param {Object} event - Progress event
     * @return {void}
     */


    /**
     * Handles an upload error
     *
     * @param {Object} error - Upload error
     * @return {void}
     */


    _createClass(PlainUpload, [{
        key: 'makePreflightRequest',


        /**
         * Sends an upload pre-flight request. If a file ID is supplied,
         * send a pre-flight request to that file version.
         *
         * @param {fileId} fileId - ID of file to replace
         * @param {fileName} fileName - New name for file
         * @return {void}
         */
        value: function makePreflightRequest(_ref4) {
            var fileId = _ref4.fileId,
                fileName = _ref4.fileName;

            if (this.isDestroyed()) {
                return;
            }

            var url = this.getBaseUrl() + '/files/content';
            if (fileId) {
                url = url.replace('content', fileId + '/content');
            }

            var _file = this.file,
                size = _file.size,
                name = _file.name;

            var attributes = {
                name: fileName || name,
                parent: { id: this.id },
                size: size
            };

            this.xhr.options({
                url: url,
                data: attributes,
                successHandler: this.uploadPreflightSuccessHandler,
                errorHandler: this.uploadErrorHandler
            });
        }

        /**
         * Uploads a file. If a file ID is supplied, use the Upload File
         * Version API to replace the file.
         *
         * @param {Object} - Request options
         * @param {boolean} [options.url] - Upload URL to use
         * @param {string} [options.fileId] - ID of file to replace
         * @param {string} [options.fileName] - New name for file
         * @return {void}
         */

    }, {
        key: 'makeRequest',
        value: function makeRequest(_ref5) {
            var url = _ref5.url,
                fileId = _ref5.fileId,
                fileName = _ref5.fileName;

            if (this.isDestroyed()) {
                return;
            }

            // Use provided upload URL if passed in, otherwise construct
            var uploadUrl = url;
            if (!uploadUrl) {
                uploadUrl = this.uploadHost + '/api/2.0/files/content';

                if (fileId) {
                    uploadUrl = uploadUrl.replace('content', fileId + '/content');
                }
            }

            var attributes = JSON.stringify({
                name: fileName || this.file.name,
                parent: { id: this.id }
            });

            this.xhr.uploadFile({
                url: uploadUrl,
                data: {
                    attributes: attributes,
                    file: this.file
                },
                successHandler: this.uploadSuccessHandler,
                errorHandler: this.uploadErrorHandler,
                progressHandler: this.uploadProgressHandler
            });
        }

        /**
         * Uploads a file. If there is a conflict and overwrite is true, replace the file.
         * Otherwise, re-upload with a different name.
         *
         * @param {Object} options - Upload options
         * @param {string} options.id - Folder id
         * @param {File} options.file - File blob object
         * @param {Function} [options.successCallback] - Function to call with response
         * @param {Function} [options.errorCallback] - Function to call with errors
         * @param {Function} [options.progressCallback] - Function to call with progress
         * @param {boolean} [overwrite] - Should upload overwrite file with same name
         * @return {void}
         */

    }, {
        key: 'upload',
        value: function upload(_ref6) {
            var id = _ref6.id,
                file = _ref6.file,
                _ref6$successCallback = _ref6.successCallback,
                successCallback = _ref6$successCallback === undefined ? noop : _ref6$successCallback,
                _ref6$errorCallback = _ref6.errorCallback,
                errorCallback = _ref6$errorCallback === undefined ? noop : _ref6$errorCallback,
                _ref6$progressCallbac = _ref6.progressCallback,
                progressCallback = _ref6$progressCallbac === undefined ? noop : _ref6$progressCallbac,
                _ref6$overwrite = _ref6.overwrite,
                overwrite = _ref6$overwrite === undefined ? true : _ref6$overwrite;

            if (this.isDestroyed()) {
                return;
            }

            // Save references
            this.id = id;
            this.file = file;
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;
            this.progressCallback = progressCallback;
            this.overwrite = overwrite;

            this.makePreflightRequest({});
        }

        /**
         * Cancels upload of a file.
         *
         * @return {void}
         */

    }, {
        key: 'cancel',
        value: function cancel() {
            if (this.xhr && typeof this.xhr.abort === 'function') {
                this.xhr.abort();
            }
        }
    }]);

    return PlainUpload;
}(Base);

export default PlainUpload;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYWluVXBsb2FkLmpzIl0sIm5hbWVzIjpbIm5vb3AiLCJCYXNlIiwiUGxhaW5VcGxvYWQiLCJ1cGxvYWRQcmVmbGlnaHRTdWNjZXNzSGFuZGxlciIsInVwbG9hZF91cmwiLCJpc0Rlc3Ryb3llZCIsIm1ha2VSZXF1ZXN0IiwidXJsIiwidXBsb2FkU3VjY2Vzc0hhbmRsZXIiLCJlbnRyaWVzIiwic3VjY2Vzc0NhbGxiYWNrIiwidXBsb2FkUHJvZ3Jlc3NIYW5kbGVyIiwiZXZlbnQiLCJwcm9ncmVzc0NhbGxiYWNrIiwidXBsb2FkRXJyb3JIYW5kbGVyIiwiZXJyb3IiLCJzdGF0dXMiLCJvdmVyd3JpdGUiLCJtYWtlUHJlZmxpZ2h0UmVxdWVzdCIsImZpbGVJZCIsImNvbnRleHRfaW5mbyIsImNvbmZsaWN0cyIsImlkIiwibmFtZSIsImZpbGUiLCJleHRlbnNpb24iLCJzdWJzdHIiLCJsYXN0SW5kZXhPZiIsImZpbGVOYW1lIiwiRGF0ZSIsIm5vdyIsImVycm9yQ2FsbGJhY2siLCJnZXRCYXNlVXJsIiwicmVwbGFjZSIsInNpemUiLCJhdHRyaWJ1dGVzIiwicGFyZW50IiwieGhyIiwib3B0aW9ucyIsImRhdGEiLCJzdWNjZXNzSGFuZGxlciIsImVycm9ySGFuZGxlciIsInVwbG9hZFVybCIsInVwbG9hZEhvc3QiLCJKU09OIiwic3RyaW5naWZ5IiwidXBsb2FkRmlsZSIsInByb2dyZXNzSGFuZGxlciIsImFib3J0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7QUFNQSxPQUFPQSxJQUFQLE1BQWlCLGFBQWpCO0FBQ0EsT0FBT0MsSUFBUCxNQUFpQixRQUFqQjs7SUFHTUMsVzs7Ozs7Ozs7Ozs7Ozs7b01BY0ZDLDZCLEdBQWdDLGlCQUE0QztBQUFBLGdCQUF6Q0MsVUFBeUMsU0FBekNBLFVBQXlDOztBQUN4RSxnQkFBSSxNQUFLQyxXQUFMLEVBQUosRUFBd0I7QUFDcEI7QUFDSDs7QUFFRDtBQUNBLGtCQUFLQyxXQUFMLENBQWlCO0FBQ2JDLHFC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LElBQVo7QUFDQSxpQkFBS2QsZUFBTCxHQUF1QkEsZUFBdkI7QUFDQSxpQkFBS3FCLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsaUJBQUtsQixnQkFBTCxHQUF3QkEsZ0JBQXhCO0FBQ0EsaUJBQUtJLFNBQUwsR0FBaUJBLFNBQWpCOztBQUVBLGlCQUFLQyxvQkFBTCxDQUEwQixFQUExQjtBQUNIOztBQUVEOzs7Ozs7OztpQ0FLUztBQUNMLGdCQUFJLEtBQUttQixHQUFMLElBQVksT0FBTyxLQUFLQSxHQUFMLENBQVNXLEtBQWhCLEtBQTBCLFVBQTFDLEVBQXNEO0FBQ2xELHFCQUFLWCxHQUFMLENBQVNXLEtBQVQ7QUFDSDtBQUNKOzs7O0VBek5xQi9DLEk7O0FBNE4xQixlQUFlQyxXQUFmIiwiZmlsZSI6IlBsYWluVXBsb2FkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEhlbHBlciBmb3IgdGhlIHBsYWluIEJveCBVcGxvYWQgQVBJXHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IG5vb3AgZnJvbSAnbG9kYXNoLm5vb3AnO1xyXG5pbXBvcnQgQmFzZSBmcm9tICcuL0Jhc2UnO1xyXG5pbXBvcnQgdHlwZSB7IEJveEl0ZW0gfSBmcm9tICcuLi9mbG93VHlwZXMnO1xyXG5cclxuY2xhc3MgUGxhaW5VcGxvYWQgZXh0ZW5kcyBCYXNlIHtcclxuICAgIGZpbGU6IEZpbGU7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgb3ZlcndyaXRlOiBib29sZWFuO1xyXG4gICAgc3VjY2Vzc0NhbGxiYWNrOiBGdW5jdGlvbjtcclxuICAgIGVycm9yQ2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG4gICAgcHJvZ3Jlc3NDYWxsYmFjazogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGEgdXBsb2FkIHByZWZsaWdodCBzdWNjZXNzIHJlc3BvbnNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBQcmVmbGlnaHQgc3VjY2VzcyBkYXRhXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICB1cGxvYWRQcmVmbGlnaHRTdWNjZXNzSGFuZGxlciA9ICh7IHVwbG9hZF91cmwgfTogeyB1cGxvYWRfdXJsOiBzdHJpbmcgfSkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVzdHJveWVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWFrZSBhbiBhY3R1YWwgUE9TVCByZXF1ZXN0IHRvIHRoZSBmYXN0IHVwbG9hZCBVUkwgcmV0dXJuZWQgYnkgcHJlLWZsaWdodFxyXG4gICAgICAgIHRoaXMubWFrZVJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IHVwbG9hZF91cmxcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGFuIHVwbG9hZCBzdWNjZXNzIHJlc3BvbnNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBVcGxvYWQgc3VjY2VzcyBkYXRhXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICB1cGxvYWRTdWNjZXNzSGFuZGxlciA9ICh7IGVudHJpZXMgfTogeyBlbnRyaWVzOiBCb3hJdGVtW10gfSk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVzdHJveWVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnN1Y2Nlc3NDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAvLyBSZXNwb25zZSBlbnRyaWVzIGFyZSB0aGUgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQgQm94IEZpbGUgb2JqZWN0c1xyXG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3NDYWxsYmFjayhlbnRyaWVzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyBhbiB1cGxvYWQgcHJvZ3Jlc3MgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBQcm9ncmVzcyBldmVudFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgdXBsb2FkUHJvZ3Jlc3NIYW5kbGVyID0gKGV2ZW50OiBQcm9ncmVzc0V2ZW50KTogdm9pZCA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEZXN0cm95ZWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvZ3Jlc3NDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzQ2FsbGJhY2soZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGFuIHVwbG9hZCBlcnJvclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlcnJvciAtIFVwbG9hZCBlcnJvclxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgdXBsb2FkRXJyb3JIYW5kbGVyID0gKGVycm9yOiBhbnkpOiB2b2lkID0+IHtcclxuICAgICAgICBpZiAodGhpcy5pc0Rlc3Ryb3llZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEF1dG9tYXRpY2FsbHkgaGFuZGxlIG5hbWUgY29uZmxpY3QgZXJyb3JzXHJcbiAgICAgICAgaWYgKGVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDA5KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm92ZXJ3cml0ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gRXJyb3IgcmVzcG9uc2UgY29udGFpbnMgZmlsZSBJRCB0byB1cGxvYWQgYSBuZXcgZmlsZSB2ZXJzaW9uIGZvclxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWtlUHJlZmxpZ2h0UmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZUlkOiBlcnJvci5jb250ZXh0X2luZm8uY29uZmxpY3RzLmlkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgcmV1cGxvYWQgYW5kIGFwcGVuZCB0aW1lc3RhbXBcclxuICAgICAgICAgICAgICAgIC8vICd0ZXN0LmpwZycgYmVjb21lcyAndGVzdC1USU1FU1RBTVAuanBnJ1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBuYW1lIH0gPSB0aGlzLmZpbGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBleHRlbnNpb24gPSBuYW1lLnN1YnN0cihuYW1lLmxhc3RJbmRleE9mKCcuJykpIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWtlUHJlZmxpZ2h0UmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IGAke25hbWUuc3Vic3RyKDAsIG5hbWUubGFzdEluZGV4T2YoJy4nKSl9LSR7RGF0ZS5ub3coKX0ke2V4dGVuc2lvbn1gXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuZXJyb3JDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yQ2FsbGJhY2soZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kcyBhbiB1cGxvYWQgcHJlLWZsaWdodCByZXF1ZXN0LiBJZiBhIGZpbGUgSUQgaXMgc3VwcGxpZWQsXHJcbiAgICAgKiBzZW5kIGEgcHJlLWZsaWdodCByZXF1ZXN0IHRvIHRoYXQgZmlsZSB2ZXJzaW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7ZmlsZUlkfSBmaWxlSWQgLSBJRCBvZiBmaWxlIHRvIHJlcGxhY2VcclxuICAgICAqIEBwYXJhbSB7ZmlsZU5hbWV9IGZpbGVOYW1lIC0gTmV3IG5hbWUgZm9yIGZpbGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIG1ha2VQcmVmbGlnaHRSZXF1ZXN0KHsgZmlsZUlkLCBmaWxlTmFtZSB9OiB7IGZpbGVJZD86IHN0cmluZywgZmlsZU5hbWU/OiBzdHJpbmcgfSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVzdHJveWVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHVybCA9IGAke3RoaXMuZ2V0QmFzZVVybCgpfS9maWxlcy9jb250ZW50YDtcclxuICAgICAgICBpZiAoZmlsZUlkKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKCdjb250ZW50JywgYCR7ZmlsZUlkfS9jb250ZW50YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IHNpemUsIG5hbWUgfSA9IHRoaXMuZmlsZTtcclxuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0ge1xyXG4gICAgICAgICAgICBuYW1lOiBmaWxlTmFtZSB8fCBuYW1lLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IHsgaWQ6IHRoaXMuaWQgfSxcclxuICAgICAgICAgICAgc2l6ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMueGhyLm9wdGlvbnMoe1xyXG4gICAgICAgICAgICB1cmwsXHJcbiAgICAgICAgICAgIGRhdGE6IGF0dHJpYnV0ZXMsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3NIYW5kbGVyOiB0aGlzLnVwbG9hZFByZWZsaWdodFN1Y2Nlc3NIYW5kbGVyLFxyXG4gICAgICAgICAgICBlcnJvckhhbmRsZXI6IHRoaXMudXBsb2FkRXJyb3JIYW5kbGVyXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGxvYWRzIGEgZmlsZS4gSWYgYSBmaWxlIElEIGlzIHN1cHBsaWVkLCB1c2UgdGhlIFVwbG9hZCBGaWxlXHJcbiAgICAgKiBWZXJzaW9uIEFQSSB0byByZXBsYWNlIHRoZSBmaWxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAtIFJlcXVlc3Qgb3B0aW9uc1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy51cmxdIC0gVXBsb2FkIFVSTCB0byB1c2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5maWxlSWRdIC0gSUQgb2YgZmlsZSB0byByZXBsYWNlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuZmlsZU5hbWVdIC0gTmV3IG5hbWUgZm9yIGZpbGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIG1ha2VSZXF1ZXN0KHsgdXJsLCBmaWxlSWQsIGZpbGVOYW1lIH06IHsgdXJsPzogc3RyaW5nLCBmaWxlSWQ/OiBzdHJpbmcsIGZpbGVOYW1lPzogc3RyaW5nIH0pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc0Rlc3Ryb3llZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVzZSBwcm92aWRlZCB1cGxvYWQgVVJMIGlmIHBhc3NlZCBpbiwgb3RoZXJ3aXNlIGNvbnN0cnVjdFxyXG4gICAgICAgIGxldCB1cGxvYWRVcmwgPSB1cmw7XHJcbiAgICAgICAgaWYgKCF1cGxvYWRVcmwpIHtcclxuICAgICAgICAgICAgdXBsb2FkVXJsID0gYCR7dGhpcy51cGxvYWRIb3N0fS9hcGkvMi4wL2ZpbGVzL2NvbnRlbnRgO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZpbGVJZCkge1xyXG4gICAgICAgICAgICAgICAgdXBsb2FkVXJsID0gdXBsb2FkVXJsLnJlcGxhY2UoJ2NvbnRlbnQnLCBgJHtmaWxlSWR9L2NvbnRlbnRgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgbmFtZTogZmlsZU5hbWUgfHwgdGhpcy5maWxlLm5hbWUsXHJcbiAgICAgICAgICAgIHBhcmVudDogeyBpZDogdGhpcy5pZCB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMueGhyLnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICB1cmw6IHVwbG9hZFVybCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcyxcclxuICAgICAgICAgICAgICAgIGZpbGU6IHRoaXMuZmlsZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzSGFuZGxlcjogdGhpcy51cGxvYWRTdWNjZXNzSGFuZGxlcixcclxuICAgICAgICAgICAgZXJyb3JIYW5kbGVyOiB0aGlzLnVwbG9hZEVycm9ySGFuZGxlcixcclxuICAgICAgICAgICAgcHJvZ3Jlc3NIYW5kbGVyOiB0aGlzLnVwbG9hZFByb2dyZXNzSGFuZGxlclxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBsb2FkcyBhIGZpbGUuIElmIHRoZXJlIGlzIGEgY29uZmxpY3QgYW5kIG92ZXJ3cml0ZSBpcyB0cnVlLCByZXBsYWNlIHRoZSBmaWxlLlxyXG4gICAgICogT3RoZXJ3aXNlLCByZS11cGxvYWQgd2l0aCBhIGRpZmZlcmVudCBuYW1lLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVXBsb2FkIG9wdGlvbnNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmlkIC0gRm9sZGVyIGlkXHJcbiAgICAgKiBAcGFyYW0ge0ZpbGV9IG9wdGlvbnMuZmlsZSAtIEZpbGUgYmxvYiBvYmplY3RcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnN1Y2Nlc3NDYWxsYmFja10gLSBGdW5jdGlvbiB0byBjYWxsIHdpdGggcmVzcG9uc2VcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmVycm9yQ2FsbGJhY2tdIC0gRnVuY3Rpb24gdG8gY2FsbCB3aXRoIGVycm9yc1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMucHJvZ3Jlc3NDYWxsYmFja10gLSBGdW5jdGlvbiB0byBjYWxsIHdpdGggcHJvZ3Jlc3NcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW292ZXJ3cml0ZV0gLSBTaG91bGQgdXBsb2FkIG92ZXJ3cml0ZSBmaWxlIHdpdGggc2FtZSBuYW1lXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICB1cGxvYWQoe1xyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIGZpbGUsXHJcbiAgICAgICAgc3VjY2Vzc0NhbGxiYWNrID0gbm9vcCxcclxuICAgICAgICBlcnJvckNhbGxiYWNrID0gbm9vcCxcclxuICAgICAgICBwcm9ncmVzc0NhbGxiYWNrID0gbm9vcCxcclxuICAgICAgICBvdmVyd3JpdGUgPSB0cnVlXHJcbiAgICB9OiB7XHJcbiAgICAgICAgaWQ6IHN0cmluZyxcclxuICAgICAgICBmaWxlOiBGaWxlLFxyXG4gICAgICAgIHN1Y2Nlc3NDYWxsYmFjazogRnVuY3Rpb24sXHJcbiAgICAgICAgZXJyb3JDYWxsYmFjazogRnVuY3Rpb24sXHJcbiAgICAgICAgcHJvZ3Jlc3NDYWxsYmFjazogRnVuY3Rpb24sXHJcbiAgICAgICAgb3ZlcndyaXRlOiBib29sZWFuXHJcbiAgICB9KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEZXN0cm95ZWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTYXZlIHJlZmVyZW5jZXNcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5maWxlID0gZmlsZTtcclxuICAgICAgICB0aGlzLnN1Y2Nlc3NDYWxsYmFjayA9IHN1Y2Nlc3NDYWxsYmFjaztcclxuICAgICAgICB0aGlzLmVycm9yQ2FsbGJhY2sgPSBlcnJvckNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NDYWxsYmFjayA9IHByb2dyZXNzQ2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5vdmVyd3JpdGUgPSBvdmVyd3JpdGU7XHJcblxyXG4gICAgICAgIHRoaXMubWFrZVByZWZsaWdodFJlcXVlc3Qoe30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FuY2VscyB1cGxvYWQgb2YgYSBmaWxlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGNhbmNlbCgpIHtcclxuICAgICAgICBpZiAodGhpcy54aHIgJiYgdHlwZW9mIHRoaXMueGhyLmFib3J0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMueGhyLmFib3J0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGFpblVwbG9hZDtcclxuIl19