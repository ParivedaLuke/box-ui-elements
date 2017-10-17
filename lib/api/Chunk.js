var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Represents a chunked part of a file - used by the chunked upload API
 * @author Box
 */

import noop from 'lodash.noop';
import Base from './Base';


var UPLOAD_RETRY_INTERVAL_MS = 1000;

var Chunk = function (_Base) {
    _inherits(Chunk, _Base);

    function Chunk() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Chunk);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Chunk.__proto__ || Object.getPrototypeOf(Chunk)).call.apply(_ref, [this].concat(args))), _this), _this.data = {}, _this.progress = 0, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Chunk, [{
        key: 'getPart',


        /**
         * Returns file part associated with this chunk.
         *
         * @return {Object}
         */
        value: function getPart() {
            return this.data.part;
        }

        /**
         * Setup chunk for uploading.
         *
         * @param {Object} options
         * @param {string} options.sessionId - ID of upload session that this chunk belongs to
         * @param {Blob} options.part - Chunk blob
         * @param {number} options.offset = Chunk offset
         * @param {string} options.sha1 - Chunk sha1
         * @param {number} options.totalSize - Total size of file that this chunk belongs to
         * @param {Function} [options.successCallback] - Chunk upload success callback
         * @param {Function} [options.errorCallback] - Chunk upload error callback
         * @param {Function} [options.progressCallback] - Chunk upload progress callback
         * @return {Promise}
         */

    }, {
        key: 'setup',
        value: function setup(_ref2) {
            var sessionId = _ref2.sessionId,
                part = _ref2.part,
                offset = _ref2.offset,
                sha1 = _ref2.sha1,
                totalSize = _ref2.totalSize,
                _ref2$successCallback = _ref2.successCallback,
                successCallback = _ref2$successCallback === undefined ? noop : _ref2$successCallback,
                _ref2$errorCallback = _ref2.errorCallback,
                errorCallback = _ref2$errorCallback === undefined ? noop : _ref2$errorCallback,
                _ref2$progressCallbac = _ref2.progressCallback,
                progressCallback = _ref2$progressCallbac === undefined ? noop : _ref2$progressCallbac;

            this.uploadUrl = this.uploadHost + '/api/2.0/files/upload_sessions/' + sessionId;

            // Calculate range
            var rangeStart = offset;
            var rangeEnd = offset + part.size - 1;
            if (rangeEnd > totalSize - 1) {
                rangeEnd = totalSize - 1;
            }

            this.uploadHeaders = {
                'Content-Type': 'application/octet-stream',
                Digest: 'SHA=' + sha1 + '}',
                'Content-Range': 'bytes ' + rangeStart + '-' + rangeEnd + '/' + totalSize
            };

            this.chunk = part;
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;
            this.progressCallback = progressCallback;
        }

        /**
         * Uploads this chunk via the API. Will retry on network failures.
         *
         * @returns {void}
         */

    }, {
        key: 'upload',
        value: function upload() {
            var _this2 = this;

            if (this.isDestroyed()) {
                this.chunk = null;
                return;
            }

            this.xhr.uploadFile({
                url: this.uploadUrl,
                data: this.chunk,
                headers: this.uploadHeaders,
                method: 'PUT',
                successHandler: function successHandler(data) {
                    _this2.progress = 1;
                    _this2.data = data;
                    _this2.chunk = null;
                    _this2.successCallback(data);
                },
                errorHandler: function errorHandler(err) {
                    // If there's an error code and it's not 429 from rate limiting, fail the upload
                    if (err.code && err.code !== 429) {
                        _this2.cancel();
                        _this2.errorCallback(err);

                        // Retry on other failures since these are likely to be network errors
                    } else {
                        _this2.retry = setTimeout(function () {
                            return _this2.upload();
                        }, UPLOAD_RETRY_INTERVAL_MS);
                    }
                },
                progressHandler: this.progressCallback
            });
        }

        /**
         * Cancels upload for this chunk.
         *
         * @returns {void}
         */

    }, {
        key: 'cancel',
        value: function cancel() {
            if (this.xhr && typeof this.xhr.abort === 'function') {
                this.xhr.abort();
            }

            clearTimeout(this.retry);
            this.chunk = null;
            this.data = {};
            this.destroy();
        }

        /**
         * Returns progress. Progress goes from 0-1.
         *
         * @return {number} Progress from 0-1
         */

    }, {
        key: 'getProgress',
        value: function getProgress() {
            return this.progress;
        }

        /**
         * Set progress.
         *
         * @param {number} progress - Numerical progress
         */

    }, {
        key: 'setProgress',
        value: function setProgress(progress) {
            this.progress = progress;
        }
    }]);

    return Chunk;
}(Base);

export default Chunk;