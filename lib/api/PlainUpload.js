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