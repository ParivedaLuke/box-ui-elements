var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the Box Chunked Upload API
 * @author Box
 */

import noop from 'lodash.noop';
import Rusha from 'rusha';
import Chunk from './Chunk';
import Base from './Base';

import int32ArrayToBase64 from '../util/base64';

var DEFAULT_RETRY_COMMIT_DELAY_MS = 3000; // Wait 3s before retrying a chunk
var DIGEST_DELAY_MS = 1000; // Delay 1s before retry-ing digest update or fetch
var UPLOAD_PARALLELISM = 3; // Maximum concurrent chunks to upload per file

var ChunkedUpload = function (_Base) {
    _inherits(ChunkedUpload, _Base);

    function ChunkedUpload() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ChunkedUpload);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ChunkedUpload.__proto__ || Object.getPrototypeOf(ChunkedUpload)).call.apply(_ref, [this].concat(args))), _this), _this.finished = false, _this.chunks = [], _this.hashPosition = 0, _this.numChunksUploaded = 0, _this.position = 0, _this.uploadSessionSuccessHandler = function (data) {
            if (_this.isDestroyed()) {
                return;
            }

            var id = data.id,
                part_size = data.part_size,
                total_parts = data.total_parts;

            _this.sessionId = id;
            _this.chunkSize = part_size;
            _this.totalNumChunks = total_parts;

            _this.startChunkedUpload();
        }, _this.uploadSessionErrorHandler = function (error) {
            if (_this.isDestroyed()) {
                return;
            }

            // Automatically handle name conflict errors
            var response = error.response;

            if (response && response.status === 409) {
                var name = _this.file.name;


                if (_this.overwrite) {
                    response.json().then(function (body) {
                        // Error response contains file ID to upload a new file version for
                        _this.createUploadSession({
                            fileId: body.context_info.conflicts.id,
                            fileName: name
                        });
                    });
                } else {
                    // Otherwise, reupload and append timestamp - 'test.jpg' becomes 'test-TIMESTAMP.jpg'
                    var extension = name.substr(name.lastIndexOf('.')) || '';
                    _this.createUploadSession({
                        fileName: name.substr(0, name.lastIndexOf('.')) + '-' + Date.now() + extension
                    });
                }
            } else if (typeof _this.errorCallback === 'function') {
                _this.errorCallback(response);
            }
        }, _this.handleChunkSuccess = function () {
            _this.numChunksUploaded += 1;

            _this.getNextChunk().then(function (anotherChunk) {
                return anotherChunk ? _this.uploadChunk(anotherChunk) : _this.commitFile();
            }).catch(function () {
                /* eslint-disable no-console */
                console.log('Error fetching next chunk');
                /* eslint-enable no-console */
            });
        }, _this.handleChunkProgress = function (chunk, event) {
            if (!event.lengthComputable) {
                return;
            }

            // Update chunk progress
            chunk.setProgress(event.loaded / event.total);

            // Calculate progress across all chunks
            var loaded = _this.chunks.reduce(function (progress, chk) {
                return progress + chk.getProgress();
            }, 0) * 100;

            // Generate an overall progress event
            _this.progressCallback(new ProgressEvent('progress', {
                lengthComputable: true,
                loaded: loaded,
                total: _this.totalNumChunks * 100
            }));
        }, _this.handleCommitSuccess = function (_ref2) {
            var entries = _ref2.entries,
                headers = _ref2.headers,
                status = _ref2.status;

            // Retry after a delay since server is still processing chunks
            if (status === 202) {
                _this.finished = false;
                var retryAfterSec = parseInt(headers.get('Retry-After'), 10);

                if (isNaN(retryAfterSec)) {
                    setTimeout(function () {
                        return _this.commitFile();
                    }, DEFAULT_RETRY_COMMIT_DELAY_MS);
                } else {
                    setTimeout(function () {
                        return _this.commitFile();
                    }, retryAfterSec * 1000);
                }
            } else if (entries) {
                _this.successCallback(entries);
            }
        }, _this.handleUploadError = function (error) {
            _this.cancel();
            _this.errorCallback(error);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * Handles a upload session success response
     *
     * @private
     * @param {Object} data - Upload session creation success data
     * @return {void}
     */


    /**
     * Handles a upload session error
     *
     * @private
     * @param {Object} error - Upload error
     * @return {void}
     */


    _createClass(ChunkedUpload, [{
        key: 'createUploadSession',


        /**
         * Creates upload session. If a file ID is supplied, use the Chunked Upload File Version
         * API to replace the file.
         *
         * @private
         * @param {Object} - Request options
         * @param {boolean} [options.url] - Upload URL to use
         * @param {string} [options.fileId] - ID of file to replace
         * @param {string} [options.fileName] - New name for file - required for new file upload
         * @return {void}
         */
        value: function createUploadSession(_ref3) {
            var url = _ref3.url,
                fileId = _ref3.fileId,
                fileName = _ref3.fileName;

            if (this.isDestroyed()) {
                return;
            }

            // Use provided upload URL if passed in, otherwise construct
            var uploadSessionUrl = url;
            if (!uploadSessionUrl) {
                uploadSessionUrl = this.getUploadSessionUrl();

                if (fileId) {
                    uploadSessionUrl = uploadSessionUrl.replace('upload_sessions', fileId + '/upload_sessions');
                }
            }

            // Set up post body
            var postData = {
                file_size: this.file.size
            };

            if (!fileId) {
                postData.folder_id = this.id;
            }

            if (fileName) {
                postData.file_name = fileName;
            }

            this.xhr.post({ url: uploadSessionUrl, data: postData }).then(this.uploadSessionSuccessHandler).catch(this.uploadSessionErrorHandler);
        }

        /**
         * Starts upload of file using chunked upload API.
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'startChunkedUpload',
        value: function startChunkedUpload() {
            var _this2 = this;

            if (this.isDestroyed()) {
                return;
            }

            for (var i = 0; i < UPLOAD_PARALLELISM; i += 1) {
                this.getNextChunk().then(function (chunk) {
                    return chunk ? _this2.uploadChunk(chunk) : _this2.commitFile();
                }).catch(function () {
                    /* eslint-disable no-console */
                    console.log('Error fetching next chunk');
                    /* eslint-enable no-console */
                    _this2.errorCallback();
                });
            }
        }

        /**
         * Retrieves next chunk and prepares it for uploading. Resolves with a chunk if there are chunks to process and
         * null if there are no more chunks. Rejects when there is an error reading a chunk as an ArrayBuffer.
         *
         * @private
         * @return {Promise}
         */

    }, {
        key: 'getNextChunk',
        value: function getNextChunk() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                if (_this3.isDestroyed()) {
                    reject();
                    return;
                }

                if (!_this3.file || _this3.position >= _this3.file.size) {
                    resolve(null);
                    return;
                }

                // Save current byte position and then increment for concurrency
                var bytePosition = _this3.position;
                _this3.position += _this3.chunkSize;

                // Slice the file as a blob for upload - XHR seems to work much better with a blob than with an ArrayBuffer
                var blobPart = _this3.file.slice(bytePosition, bytePosition + _this3.chunkSize);

                // Read the blob as an ArrayBuffer so SHA1 can be calculated with Rusha
                var fileReader = new FileReader();
                fileReader.addEventListener('load', function (event) {
                    if (!event || !event.target || !event.target.result) {
                        reject();
                        return;
                    }

                    var buffer = event.target.result;
                    _this3.updateDigest(buffer, bytePosition);

                    var chunk = new Chunk(_this3.options);
                    chunk.setup({
                        sessionId: _this3.sessionId,
                        part: blobPart,
                        offset: bytePosition,
                        sha1: int32ArrayToBase64(new Rusha().rawDigest(buffer)),
                        totalSize: _this3.file.size,
                        successCallback: _this3.handleChunkSuccess,
                        errorCallback: _this3.handleUploadError,
                        progressCallback: function progressCallback(progressEvent) {
                            return _this3.handleChunkProgress(chunk, progressEvent);
                        }
                    });

                    resolve(chunk);
                });

                fileReader.addEventListener('error', reject);
                fileReader.readAsArrayBuffer(blobPart);
            });
        }

        /**
         * Handles upload progress success event for a chunk.
         *
         * @private
         * @return {void}
         */


        /**
         * Handles upload progress event for a chunk.
         *
         * @private
         * @param {Chunk} chunk - Chunk
         * @param {ProgressEvent} event - Progress event
         * @return {void}
         */

    }, {
        key: 'uploadChunk',


        /**
         * Start upload for a specified chunk.
         *
         * @private
         * @param {Chunk} chunk - Chunk to upload
         * @return {void}
         */
        value: function uploadChunk(chunk) {
            chunk.upload();
            this.chunks.push(chunk);
        }

        /**
         * Finish chunked upload by commiting.
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'commitFile',
        value: function commitFile() {
            var _this4 = this;

            if (this.finished || this.numChunksUploaded !== this.totalNumChunks) {
                return;
            }

            this.finished = true;

            var postData = {
                parts: this.chunks.map(function (chunk) {
                    return chunk.getPart();
                }).sort(function (part1, part2) {
                    return part1.offset - part2.offset;
                })
            };

            this.getDigest().then(function (digest) {
                var headers = {
                    Digest: 'SHA=' + digest
                };

                _this4.xhr.post({ url: _this4.getUploadSessionUrl(_this4.sessionId, 'commit'), data: postData, headers: headers }).then(_this4.handleCommitSuccess).catch(_this4.handleUploadError);
            });
        }

        /**
         * Handles a successful commit file response.
         *
         * @param {Response} response - Fetch response object
         * @return {void}
         */


        /**
         * Handles an upload error. Cancels the pending upload and executes error callback.
         *
         * @param {Error} error - Error
         * @return {void}
         */

    }, {
        key: 'updateDigest',


        /**
         * Updates SHA1 digest, ensuring that parts are added in the right order.
         *
         * @param {ArrayBuffer} buffer - ArrayBuffer of part data
         * @param {number} bytePosition - Byte offset of this part
         * @return {void}
         */
        value: function updateDigest(buffer, bytePosition) {
            var _this5 = this;

            // If we are at the correct byte offset, use Rusha to update the digest with this part
            if (bytePosition === this.hashPosition) {
                this.sha1.append(buffer);
                this.hashPosition += this.chunkSize;

                // If not, retry updating after a short delay
            } else {
                setTimeout(function () {
                    return _this5.updateDigest(buffer, bytePosition);
                }, DIGEST_DELAY_MS);
            }
        }

        /**
         * Get SHA1 digest of file. This happens asynchronously since it's possible that the digest hasn't been updated
         * with all of the parts yet.
         *
         * @return {Promise<string>} Promise that resolves with digest
         */

    }, {
        key: 'getDigest',
        value: function getDigest() {
            var _this6 = this;

            return new Promise(function (resolve) {
                if (_this6.digest) {
                    resolve(_this6.digest);
                    return;
                }

                // Hash position will be at or beyond file size when complete
                if (_this6.hashPosition >= _this6.file.size) {
                    _this6.digest = int32ArrayToBase64(_this6.sha1.rawEnd());
                    resolve(_this6.digest);
                } else {
                    setTimeout(_this6.getDigest().then(function (digest) {
                        return resolve(digest);
                    }), DIGEST_DELAY_MS);
                }
            });
        }

        /**
         * Constructs an upload session URL
         *
         * @private
         * @param {string[]} [parts] - String parts to add to the upload URL
         */

    }, {
        key: 'getUploadSessionUrl',
        value: function getUploadSessionUrl() {
            var sessionUrl = this.uploadHost + '/api/2.0/files/upload_sessions';

            for (var _len2 = arguments.length, parts = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                parts[_key2] = arguments[_key2];
            }

            parts.forEach(function (part) {
                sessionUrl = sessionUrl + '/' + part;
            });

            return sessionUrl;
        }

        /**
         * Uploads a file using chunked upload API. If there is a conflict and overwrite is true,
         * replace the file. Otherwise, re-upload with a different name.
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
        value: function upload(_ref4) {
            var id = _ref4.id,
                file = _ref4.file,
                _ref4$successCallback = _ref4.successCallback,
                successCallback = _ref4$successCallback === undefined ? noop : _ref4$successCallback,
                _ref4$errorCallback = _ref4.errorCallback,
                errorCallback = _ref4$errorCallback === undefined ? noop : _ref4$errorCallback,
                _ref4$progressCallbac = _ref4.progressCallback,
                progressCallback = _ref4$progressCallbac === undefined ? noop : _ref4$progressCallbac,
                _ref4$overwrite = _ref4.overwrite,
                overwrite = _ref4$overwrite === undefined ? true : _ref4$overwrite;

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

            this.sha1 = new Rusha();
            this.sha1.resetState();

            this.createUploadSession({
                fileName: this.file.name
            });
        }

        /**
         * Cancels an upload in progress by cancelling all upload chunks.
         * This cannot be undone or resumed.
         *
         * @returns {void}
         */

    }, {
        key: 'cancel',
        value: function cancel() {
            if (this.isDestroyed()) {
                return;
            }

            // Cancel individual upload chunks
            this.chunks.forEach(function (chunk) {
                chunk.cancel();
            });

            this.chunks = [];

            // Abort upload session
            this.xhr.delete({ url: this.getUploadSessionUrl(this.sessionId) });
            this.destroy();
        }
    }]);

    return ChunkedUpload;
}(Base);

export default ChunkedUpload;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNodW5rZWRVcGxvYWQuanMiXSwibmFtZXMiOlsibm9vcCIsIlJ1c2hhIiwiQ2h1bmsiLCJCYXNlIiwiaW50MzJBcnJheVRvQmFzZTY0IiwiREVGQVVMVF9SRVRSWV9DT01NSVRfREVMQVlfTVMiLCJESUdFU1RfREVMQVlfTVMiLCJVUExPQURfUEFSQUxMRUxJU00iLCJDaHVua2VkVXBsb2FkIiwiZmluaXNoZWQiLCJjaHVua3MiLCJoYXNoUG9zaXRpb24iLCJudW1DaHVua3NVcGxvYWRlZCIsInBvc2l0aW9uIiwidXBsb2FkU2Vzc2lvblN1Y2Nlc3NIYW5kbGVyIiwiZGF0YSIsImlzRGVzdHJveWVkIiwiaWQiLCJwYXJ0X3NpemUiLCJ0b3RhbF9wYXJ0cyIsInNlc3Npb25JZCIsImNodW5rU2l6ZSIsInRvdGFsTnVtQ2h1bmtzIiwic3RhcnRDaHVua2VkVXBsb2FkIiwidXBsb2FkU2Vzc2lvbkVycm9ySGFuZGxlciIsImVycm9yIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJuYW1lIiwiZmlsZSIsIm92ZXJ3cml0ZSIsImpzb24iLCJ0aGVuIiwiYm9keSIsImNyZWF0ZVVwbG9hZFNlc3Npb24iLCJmaWxlSWQiLCJjb250ZXh0X2luZm8iLCJjb25mbGljdHMiLCJmaWxlTmFtZSIsImV4dGVuc2lvbiIsInN1YnN0ciIsImxhc3RJbmRleE9mIiwiRGF0ZSIsIm5vdyIsImVycm9yQ2FsbGJhY2siLCJoYW5kbGVDaHVua1N1Y2Nlc3MiLCJnZXROZXh0Q2h1bmsiLCJhbm90aGVyQ2h1bmsiLCJ1cGxvYWRDaHVuayIsImNvbW1pdEZpbGUiLCJjYXRjaCIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVDaHVua1Byb2dyZXNzIiwiY2h1bmsiLCJldmVudCIsImxlbmd0aENvbXB1dGFibGUiLCJzZXRQcm9ncmVzcyIsImxvYWRlZCIsInRvdGFsIiwicmVkdWNlIiwicHJvZ3Jlc3MiLCJjaGsiLCJnZXRQcm9ncmVzcyIsInByb2dyZXNzQ2FsbGJhY2siLCJQcm9ncmVzc0V2ZW50IiwiaGFuZGxlQ29tbWl0U3VjY2VzcyIsImVudHJpZXMiLCJoZWFkZXJzIiwicmV0cnlBZnRlclNlYyIsInBhcnNlSW50IiwiZ2V0IiwiaXNOYU4iLCJzZXRUaW1lb3V0Iiwic3VjY2Vzc0NhbGxiYWNrIiwiaGFuZGxlVXBsb2FkRXJyb3IiLCJjYW5jZWwiLCJ1cmwiLCJ1cGxvYWRTZXNzaW9uVXJsIiwiZ2V0VXBsb2FkU2Vzc2lvblVybCIsInJlcGxhY2UiLCJwb3N0RGF0YSIsImZpbGVfc2l6ZSIsInNpemUiLCJmb2xkZXJfaWQiLCJmaWxlX25hbWUiLCJ4aHIiLCJwb3N0IiwiaSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiYnl0ZVBvc2l0aW9uIiwiYmxvYlBhcnQiLCJzbGljZSIsImZpbGVSZWFkZXIiLCJGaWxlUmVhZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRhcmdldCIsInJlc3VsdCIsImJ1ZmZlciIsInVwZGF0ZURpZ2VzdCIsIm9wdGlvbnMiLCJzZXR1cCIsInBhcnQiLCJvZmZzZXQiLCJzaGExIiwicmF3RGlnZXN0IiwidG90YWxTaXplIiwicHJvZ3Jlc3NFdmVudCIsInJlYWRBc0FycmF5QnVmZmVyIiwidXBsb2FkIiwicHVzaCIsInBhcnRzIiwibWFwIiwiZ2V0UGFydCIsInNvcnQiLCJwYXJ0MSIsInBhcnQyIiwiZ2V0RGlnZXN0IiwiZGlnZXN0IiwiRGlnZXN0IiwiYXBwZW5kIiwicmF3RW5kIiwic2Vzc2lvblVybCIsInVwbG9hZEhvc3QiLCJmb3JFYWNoIiwicmVzZXRTdGF0ZSIsImRlbGV0ZSIsImRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7OztBQU1BLE9BQU9BLElBQVAsTUFBaUIsYUFBakI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixTQUFsQjtBQUNBLE9BQU9DLElBQVAsTUFBaUIsUUFBakI7O0FBRUEsT0FBT0Msa0JBQVAsTUFBK0IsZ0JBQS9COztBQUVBLElBQU1DLGdDQUFnQyxJQUF0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QkFBS2xDLFNBQUwsR0FBaUJBLFNBQWpCOztBQUVBLGlCQUFLNEUsSUFBTCxHQUFZLElBQUl6RyxLQUFKLEVBQVo7QUFDQSxpQkFBS3lHLElBQUwsQ0FBVXFCLFVBQVY7O0FBRUEsaUJBQUs3RixtQkFBTCxDQUF5QjtBQUNyQkksMEJBQVUsS0FBS1QsSUFBTCxDQUFVRDtBQURDLGFBQXpCO0FBR0g7O0FBRUQ7Ozs7Ozs7OztpQ0FNZTtBQUNYLGdCQUFJLEtBQUtaLFdBQUwsRUFBSixFQUF3QjtBQUNwQjtBQUNIOztBQUVEO0FBQ0EsaUJBQUtOLE1BQUwsQ0FBWW9ILE9BQVosQ0FBb0IsVUFBQ3hFLEtBQUQsRUFBVztBQUMzQkEsc0JBQU1zQixNQUFOO0FBQ0gsYUFGRDs7QUFJQSxpQkFBS2xFLE1BQUwsR0FBYyxFQUFkOztBQUVBO0FBQ0EsaUJBQUs0RSxHQUFMLENBQVMwQyxNQUFULENBQWdCLEVBQUVuRCxLQUFLLEtBQUtFLG1CQUFMLENBQXlCLEtBQUszRCxTQUE5QixDQUFQLEVBQWhCO0FBQ0EsaUJBQUs2RyxPQUFMO0FBQ0g7Ozs7RUF0Y3VCOUgsSTs7QUF5YzVCLGVBQWVLLGFBQWYiLCJmaWxlIjoiQ2h1bmtlZFVwbG9hZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBIZWxwZXIgZm9yIHRoZSBCb3ggQ2h1bmtlZCBVcGxvYWQgQVBJXHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IG5vb3AgZnJvbSAnbG9kYXNoLm5vb3AnO1xyXG5pbXBvcnQgUnVzaGEgZnJvbSAncnVzaGEnO1xyXG5pbXBvcnQgQ2h1bmsgZnJvbSAnLi9DaHVuayc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCB0eXBlIHsgQm94SXRlbSwgU3RyaW5nQW55TWFwIH0gZnJvbSAnLi4vZmxvd1R5cGVzJztcclxuaW1wb3J0IGludDMyQXJyYXlUb0Jhc2U2NCBmcm9tICcuLi91dGlsL2Jhc2U2NCc7XHJcblxyXG5jb25zdCBERUZBVUxUX1JFVFJZX0NPTU1JVF9ERUxBWV9NUyA9IDMwMDA7IC8vIFdhaXQgM3MgYmVmb3JlIHJldHJ5aW5nIGEgY2h1bmtcclxuY29uc3QgRElHRVNUX0RFTEFZX01TID0gMTAwMDsgLy8gRGVsYXkgMXMgYmVmb3JlIHJldHJ5LWluZyBkaWdlc3QgdXBkYXRlIG9yIGZldGNoXHJcbmNvbnN0IFVQTE9BRF9QQVJBTExFTElTTSA9IDM7IC8vIE1heGltdW0gY29uY3VycmVudCBjaHVua3MgdG8gdXBsb2FkIHBlciBmaWxlXHJcblxyXG5jbGFzcyBDaHVua2VkVXBsb2FkIGV4dGVuZHMgQmFzZSB7XHJcbiAgICBkaWdlc3Q6IHN0cmluZztcclxuICAgIGZpbGU6IEZpbGU7XHJcbiAgICBmaW5pc2hlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgY2h1bmtzOiBDaHVua1tdID0gW107XHJcbiAgICBjaHVua1NpemU6IG51bWJlcjtcclxuICAgIGhhc2hQb3NpdGlvbjogbnVtYmVyID0gMDtcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBudW1DaHVua3NVcGxvYWRlZDogbnVtYmVyID0gMDtcclxuICAgIG92ZXJ3cml0ZTogYm9vbGVhbjtcclxuICAgIHBvc2l0aW9uOiBudW1iZXIgPSAwO1xyXG4gICAgc2Vzc2lvbklkOiBzdHJpbmc7XHJcbiAgICBzaGExOiBhbnk7XHJcbiAgICB0b3RhbE51bUNodW5rczogbnVtYmVyO1xyXG4gICAgc3VjY2Vzc0NhbGxiYWNrOiBGdW5jdGlvbjtcclxuICAgIGVycm9yQ2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG4gICAgcHJvZ3Jlc3NDYWxsYmFjazogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGEgdXBsb2FkIHNlc3Npb24gc3VjY2VzcyByZXNwb25zZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIFVwbG9hZCBzZXNzaW9uIGNyZWF0aW9uIHN1Y2Nlc3MgZGF0YVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgdXBsb2FkU2Vzc2lvblN1Y2Nlc3NIYW5kbGVyID0gKGRhdGE6IGFueSk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVzdHJveWVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgeyBpZCwgcGFydF9zaXplLCB0b3RhbF9wYXJ0cyB9ID0gZGF0YTtcclxuICAgICAgICB0aGlzLnNlc3Npb25JZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuY2h1bmtTaXplID0gcGFydF9zaXplO1xyXG4gICAgICAgIHRoaXMudG90YWxOdW1DaHVua3MgPSB0b3RhbF9wYXJ0cztcclxuXHJcbiAgICAgICAgdGhpcy5zdGFydENodW5rZWRVcGxvYWQoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGEgdXBsb2FkIHNlc3Npb24gZXJyb3JcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVycm9yIC0gVXBsb2FkIGVycm9yXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICB1cGxvYWRTZXNzaW9uRXJyb3JIYW5kbGVyID0gKGVycm9yOiBhbnkpOiB2b2lkID0+IHtcclxuICAgICAgICBpZiAodGhpcy5pc0Rlc3Ryb3llZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEF1dG9tYXRpY2FsbHkgaGFuZGxlIG5hbWUgY29uZmxpY3QgZXJyb3JzXHJcbiAgICAgICAgY29uc3QgeyByZXNwb25zZSB9ID0gZXJyb3I7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgbmFtZSB9ID0gdGhpcy5maWxlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3ZlcndyaXRlKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5qc29uKCkudGhlbigoYm9keSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEVycm9yIHJlc3BvbnNlIGNvbnRhaW5zIGZpbGUgSUQgdG8gdXBsb2FkIGEgbmV3IGZpbGUgdmVyc2lvbiBmb3JcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVVwbG9hZFNlc3Npb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlSWQ6IGJvZHkuY29udGV4dF9pbmZvLmNvbmZsaWN0cy5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IG5hbWVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCByZXVwbG9hZCBhbmQgYXBwZW5kIHRpbWVzdGFtcCAtICd0ZXN0LmpwZycgYmVjb21lcyAndGVzdC1USU1FU1RBTVAuanBnJ1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXh0ZW5zaW9uID0gbmFtZS5zdWJzdHIobmFtZS5sYXN0SW5kZXhPZignLicpKSB8fCAnJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVXBsb2FkU2Vzc2lvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IGAke25hbWUuc3Vic3RyKDAsIG5hbWUubGFzdEluZGV4T2YoJy4nKSl9LSR7RGF0ZS5ub3coKX0ke2V4dGVuc2lvbn1gXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuZXJyb3JDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yQ2FsbGJhY2socmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHVwbG9hZCBzZXNzaW9uLiBJZiBhIGZpbGUgSUQgaXMgc3VwcGxpZWQsIHVzZSB0aGUgQ2h1bmtlZCBVcGxvYWQgRmlsZSBWZXJzaW9uXHJcbiAgICAgKiBBUEkgdG8gcmVwbGFjZSB0aGUgZmlsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IC0gUmVxdWVzdCBvcHRpb25zXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnVybF0gLSBVcGxvYWQgVVJMIHRvIHVzZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmZpbGVJZF0gLSBJRCBvZiBmaWxlIHRvIHJlcGxhY2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5maWxlTmFtZV0gLSBOZXcgbmFtZSBmb3IgZmlsZSAtIHJlcXVpcmVkIGZvciBuZXcgZmlsZSB1cGxvYWRcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVVwbG9hZFNlc3Npb24oeyB1cmwsIGZpbGVJZCwgZmlsZU5hbWUgfTogeyB1cmw/OiBzdHJpbmcsIGZpbGVJZD86IHN0cmluZywgZmlsZU5hbWU/OiBzdHJpbmcgfSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVzdHJveWVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXNlIHByb3ZpZGVkIHVwbG9hZCBVUkwgaWYgcGFzc2VkIGluLCBvdGhlcndpc2UgY29uc3RydWN0XHJcbiAgICAgICAgbGV0IHVwbG9hZFNlc3Npb25VcmwgPSB1cmw7XHJcbiAgICAgICAgaWYgKCF1cGxvYWRTZXNzaW9uVXJsKSB7XHJcbiAgICAgICAgICAgIHVwbG9hZFNlc3Npb25VcmwgPSB0aGlzLmdldFVwbG9hZFNlc3Npb25VcmwoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmaWxlSWQpIHtcclxuICAgICAgICAgICAgICAgIHVwbG9hZFNlc3Npb25VcmwgPSB1cGxvYWRTZXNzaW9uVXJsLnJlcGxhY2UoJ3VwbG9hZF9zZXNzaW9ucycsIGAke2ZpbGVJZH0vdXBsb2FkX3Nlc3Npb25zYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNldCB1cCBwb3N0IGJvZHlcclxuICAgICAgICBjb25zdCBwb3N0RGF0YTogU3RyaW5nQW55TWFwID0ge1xyXG4gICAgICAgICAgICBmaWxlX3NpemU6IHRoaXMuZmlsZS5zaXplXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKCFmaWxlSWQpIHtcclxuICAgICAgICAgICAgcG9zdERhdGEuZm9sZGVyX2lkID0gdGhpcy5pZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmaWxlTmFtZSkge1xyXG4gICAgICAgICAgICBwb3N0RGF0YS5maWxlX25hbWUgPSBmaWxlTmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMueGhyXHJcbiAgICAgICAgICAgIC5wb3N0KHsgdXJsOiB1cGxvYWRTZXNzaW9uVXJsLCBkYXRhOiBwb3N0RGF0YSB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLnVwbG9hZFNlc3Npb25TdWNjZXNzSGFuZGxlcilcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMudXBsb2FkU2Vzc2lvbkVycm9ySGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgdXBsb2FkIG9mIGZpbGUgdXNpbmcgY2h1bmtlZCB1cGxvYWQgQVBJLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBzdGFydENodW5rZWRVcGxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEZXN0cm95ZWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFVQTE9BRF9QQVJBTExFTElTTTsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0TmV4dENodW5rKCkudGhlbigoY2h1bmspID0+IChjaHVuayA/IHRoaXMudXBsb2FkQ2h1bmsoY2h1bmspIDogdGhpcy5jb21taXRGaWxlKCkpKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgZmV0Y2hpbmcgbmV4dCBjaHVuaycpO1xyXG4gICAgICAgICAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIG5leHQgY2h1bmsgYW5kIHByZXBhcmVzIGl0IGZvciB1cGxvYWRpbmcuIFJlc29sdmVzIHdpdGggYSBjaHVuayBpZiB0aGVyZSBhcmUgY2h1bmtzIHRvIHByb2Nlc3MgYW5kXHJcbiAgICAgKiBudWxsIGlmIHRoZXJlIGFyZSBubyBtb3JlIGNodW5rcy4gUmVqZWN0cyB3aGVuIHRoZXJlIGlzIGFuIGVycm9yIHJlYWRpbmcgYSBjaHVuayBhcyBhbiBBcnJheUJ1ZmZlci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgZ2V0TmV4dENodW5rKCk6IFByb21pc2U8P0NodW5rPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNEZXN0cm95ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5maWxlIHx8IHRoaXMucG9zaXRpb24gPj0gdGhpcy5maWxlLnNpemUpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNhdmUgY3VycmVudCBieXRlIHBvc2l0aW9uIGFuZCB0aGVuIGluY3JlbWVudCBmb3IgY29uY3VycmVuY3lcclxuICAgICAgICAgICAgY29uc3QgYnl0ZVBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiArPSB0aGlzLmNodW5rU2l6ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNsaWNlIHRoZSBmaWxlIGFzIGEgYmxvYiBmb3IgdXBsb2FkIC0gWEhSIHNlZW1zIHRvIHdvcmsgbXVjaCBiZXR0ZXIgd2l0aCBhIGJsb2IgdGhhbiB3aXRoIGFuIEFycmF5QnVmZmVyXHJcbiAgICAgICAgICAgIGNvbnN0IGJsb2JQYXJ0OiBCbG9iID0gdGhpcy5maWxlLnNsaWNlKGJ5dGVQb3NpdGlvbiwgYnl0ZVBvc2l0aW9uICsgdGhpcy5jaHVua1NpemUpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVhZCB0aGUgYmxvYiBhcyBhbiBBcnJheUJ1ZmZlciBzbyBTSEExIGNhbiBiZSBjYWxjdWxhdGVkIHdpdGggUnVzaGFcclxuICAgICAgICAgICAgY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgICAgIGZpbGVSZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldmVudDogRXZlbnQgJiB7IHRhcmdldDogRXZlbnRUYXJnZXQgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFldmVudCB8fCAhZXZlbnQudGFyZ2V0IHx8ICFldmVudC50YXJnZXQucmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURpZ2VzdChidWZmZXIsIGJ5dGVQb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2h1bmsgPSBuZXcgQ2h1bmsodGhpcy5vcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGNodW5rLnNldHVwKHtcclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uSWQ6IHRoaXMuc2Vzc2lvbklkLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnQ6IGJsb2JQYXJ0LFxyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldDogYnl0ZVBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHNoYTE6IGludDMyQXJyYXlUb0Jhc2U2NChuZXcgUnVzaGEoKS5yYXdEaWdlc3QoYnVmZmVyKSksXHJcbiAgICAgICAgICAgICAgICAgICAgdG90YWxTaXplOiB0aGlzLmZpbGUuc2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2s6IHRoaXMuaGFuZGxlQ2h1bmtTdWNjZXNzLFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2s6IHRoaXMuaGFuZGxlVXBsb2FkRXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NDYWxsYmFjazogKHByb2dyZXNzRXZlbnQpID0+IHRoaXMuaGFuZGxlQ2h1bmtQcm9ncmVzcyhjaHVuaywgcHJvZ3Jlc3NFdmVudClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlc29sdmUoY2h1bmspO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZpbGVSZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCByZWplY3QpO1xyXG4gICAgICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2JQYXJ0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdXBsb2FkIHByb2dyZXNzIHN1Y2Nlc3MgZXZlbnQgZm9yIGEgY2h1bmsuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZUNodW5rU3VjY2VzcyA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLm51bUNodW5rc1VwbG9hZGVkICs9IDE7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0TmV4dENodW5rKClcclxuICAgICAgICAgICAgLnRoZW4oKGFub3RoZXJDaHVuaykgPT4gKGFub3RoZXJDaHVuayA/IHRoaXMudXBsb2FkQ2h1bmsoYW5vdGhlckNodW5rKSA6IHRoaXMuY29tbWl0RmlsZSgpKSlcclxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBmZXRjaGluZyBuZXh0IGNodW5rJyk7XHJcbiAgICAgICAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB1cGxvYWQgcHJvZ3Jlc3MgZXZlbnQgZm9yIGEgY2h1bmsuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q2h1bmt9IGNodW5rIC0gQ2h1bmtcclxuICAgICAqIEBwYXJhbSB7UHJvZ3Jlc3NFdmVudH0gZXZlbnQgLSBQcm9ncmVzcyBldmVudFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgaGFuZGxlQ2h1bmtQcm9ncmVzcyA9IChjaHVuazogQ2h1bmssIGV2ZW50OiBQcm9ncmVzc0V2ZW50KTogdm9pZCA9PiB7XHJcbiAgICAgICAgaWYgKCFldmVudC5sZW5ndGhDb21wdXRhYmxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSBjaHVuayBwcm9ncmVzc1xyXG4gICAgICAgIGNodW5rLnNldFByb2dyZXNzKGV2ZW50LmxvYWRlZCAvIGV2ZW50LnRvdGFsKTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHByb2dyZXNzIGFjcm9zcyBhbGwgY2h1bmtzXHJcbiAgICAgICAgY29uc3QgbG9hZGVkID0gdGhpcy5jaHVua3MucmVkdWNlKChwcm9ncmVzcywgY2hrKSA9PiBwcm9ncmVzcyArIGNoay5nZXRQcm9ncmVzcygpLCAwKSAqIDEwMDtcclxuXHJcbiAgICAgICAgLy8gR2VuZXJhdGUgYW4gb3ZlcmFsbCBwcm9ncmVzcyBldmVudFxyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NDYWxsYmFjayhcclxuICAgICAgICAgICAgbmV3IFByb2dyZXNzRXZlbnQoJ3Byb2dyZXNzJywge1xyXG4gICAgICAgICAgICAgICAgbGVuZ3RoQ29tcHV0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGxvYWRlZCxcclxuICAgICAgICAgICAgICAgIHRvdGFsOiB0aGlzLnRvdGFsTnVtQ2h1bmtzICogMTAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydCB1cGxvYWQgZm9yIGEgc3BlY2lmaWVkIGNodW5rLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NodW5rfSBjaHVuayAtIENodW5rIHRvIHVwbG9hZFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgdXBsb2FkQ2h1bmsoY2h1bms6IENodW5rKTogdm9pZCB7XHJcbiAgICAgICAgY2h1bmsudXBsb2FkKCk7XHJcbiAgICAgICAgdGhpcy5jaHVua3MucHVzaChjaHVuayk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5pc2ggY2h1bmtlZCB1cGxvYWQgYnkgY29tbWl0aW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBjb21taXRGaWxlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmZpbmlzaGVkIHx8IHRoaXMubnVtQ2h1bmtzVXBsb2FkZWQgIT09IHRoaXMudG90YWxOdW1DaHVua3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5maW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGNvbnN0IHBvc3REYXRhID0ge1xyXG4gICAgICAgICAgICBwYXJ0czogdGhpcy5jaHVua3MubWFwKChjaHVuaykgPT4gY2h1bmsuZ2V0UGFydCgpKS5zb3J0KChwYXJ0MSwgcGFydDIpID0+IHBhcnQxLm9mZnNldCAtIHBhcnQyLm9mZnNldClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmdldERpZ2VzdCgpLnRoZW4oKGRpZ2VzdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJzID0ge1xyXG4gICAgICAgICAgICAgICAgRGlnZXN0OiBgU0hBPSR7ZGlnZXN0fWBcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMueGhyXHJcbiAgICAgICAgICAgICAgICAucG9zdCh7IHVybDogdGhpcy5nZXRVcGxvYWRTZXNzaW9uVXJsKHRoaXMuc2Vzc2lvbklkLCAnY29tbWl0JyksIGRhdGE6IHBvc3REYXRhLCBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZUNvbW1pdFN1Y2Nlc3MpXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVVcGxvYWRFcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGEgc3VjY2Vzc2Z1bCBjb21taXQgZmlsZSByZXNwb25zZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNwb25zZSAtIEZldGNoIHJlc3BvbnNlIG9iamVjdFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgaGFuZGxlQ29tbWl0U3VjY2VzcyA9ICh7XHJcbiAgICAgICAgZW50cmllcyxcclxuICAgICAgICBoZWFkZXJzLFxyXG4gICAgICAgIHN0YXR1c1xyXG4gICAgfToge1xyXG4gICAgICAgIGVudHJpZXM6IEJveEl0ZW1bXSxcclxuICAgICAgICBoZWFkZXJzOiBIZWFkZXJzLFxyXG4gICAgICAgIHN0YXR1czogbnVtYmVyXHJcbiAgICB9KTogdm9pZCA9PiB7XHJcbiAgICAgICAgLy8gUmV0cnkgYWZ0ZXIgYSBkZWxheSBzaW5jZSBzZXJ2ZXIgaXMgc3RpbGwgcHJvY2Vzc2luZyBjaHVua3NcclxuICAgICAgICBpZiAoc3RhdHVzID09PSAyMDIpIHtcclxuICAgICAgICAgICAgdGhpcy5maW5pc2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb25zdCByZXRyeUFmdGVyU2VjID0gcGFyc2VJbnQoaGVhZGVycy5nZXQoJ1JldHJ5LUFmdGVyJyksIDEwKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc05hTihyZXRyeUFmdGVyU2VjKSkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNvbW1pdEZpbGUoKSwgREVGQVVMVF9SRVRSWV9DT01NSVRfREVMQVlfTVMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNvbW1pdEZpbGUoKSwgcmV0cnlBZnRlclNlYyAqIDEwMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChlbnRyaWVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3VjY2Vzc0NhbGxiYWNrKGVudHJpZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGFuIHVwbG9hZCBlcnJvci4gQ2FuY2VscyB0aGUgcGVuZGluZyB1cGxvYWQgYW5kIGV4ZWN1dGVzIGVycm9yIGNhbGxiYWNrLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIC0gRXJyb3JcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZVVwbG9hZEVycm9yID0gKGVycm9yOiBFcnJvcik6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XHJcbiAgICAgICAgdGhpcy5lcnJvckNhbGxiYWNrKGVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIFNIQTEgZGlnZXN0LCBlbnN1cmluZyB0aGF0IHBhcnRzIGFyZSBhZGRlZCBpbiB0aGUgcmlnaHQgb3JkZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYnVmZmVyIC0gQXJyYXlCdWZmZXIgb2YgcGFydCBkYXRhXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYnl0ZVBvc2l0aW9uIC0gQnl0ZSBvZmZzZXQgb2YgdGhpcyBwYXJ0XHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICB1cGRhdGVEaWdlc3QoYnVmZmVyOiBBcnJheUJ1ZmZlciwgYnl0ZVBvc2l0aW9uOiBudW1iZXIpIHtcclxuICAgICAgICAvLyBJZiB3ZSBhcmUgYXQgdGhlIGNvcnJlY3QgYnl0ZSBvZmZzZXQsIHVzZSBSdXNoYSB0byB1cGRhdGUgdGhlIGRpZ2VzdCB3aXRoIHRoaXMgcGFydFxyXG4gICAgICAgIGlmIChieXRlUG9zaXRpb24gPT09IHRoaXMuaGFzaFBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhMS5hcHBlbmQoYnVmZmVyKTtcclxuICAgICAgICAgICAgdGhpcy5oYXNoUG9zaXRpb24gKz0gdGhpcy5jaHVua1NpemU7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBub3QsIHJldHJ5IHVwZGF0aW5nIGFmdGVyIGEgc2hvcnQgZGVsYXlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlRGlnZXN0KGJ1ZmZlciwgYnl0ZVBvc2l0aW9uKSwgRElHRVNUX0RFTEFZX01TKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgU0hBMSBkaWdlc3Qgb2YgZmlsZS4gVGhpcyBoYXBwZW5zIGFzeW5jaHJvbm91c2x5IHNpbmNlIGl0J3MgcG9zc2libGUgdGhhdCB0aGUgZGlnZXN0IGhhc24ndCBiZWVuIHVwZGF0ZWRcclxuICAgICAqIHdpdGggYWxsIG9mIHRoZSBwYXJ0cyB5ZXQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxzdHJpbmc+fSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCBkaWdlc3RcclxuICAgICAqL1xyXG4gICAgZ2V0RGlnZXN0KCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kaWdlc3QpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5kaWdlc3QpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBIYXNoIHBvc2l0aW9uIHdpbGwgYmUgYXQgb3IgYmV5b25kIGZpbGUgc2l6ZSB3aGVuIGNvbXBsZXRlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc2hQb3NpdGlvbiA+PSB0aGlzLmZpbGUuc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWdlc3QgPSBpbnQzMkFycmF5VG9CYXNlNjQodGhpcy5zaGExLnJhd0VuZCgpKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5kaWdlc3QpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLmdldERpZ2VzdCgpLnRoZW4oKGRpZ2VzdCkgPT4gcmVzb2x2ZShkaWdlc3QpKSwgRElHRVNUX0RFTEFZX01TKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0cyBhbiB1cGxvYWQgc2Vzc2lvbiBVUkxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gW3BhcnRzXSAtIFN0cmluZyBwYXJ0cyB0byBhZGQgdG8gdGhlIHVwbG9hZCBVUkxcclxuICAgICAqL1xyXG4gICAgZ2V0VXBsb2FkU2Vzc2lvblVybCguLi5wYXJ0czogc3RyaW5nW10pIHtcclxuICAgICAgICBsZXQgc2Vzc2lvblVybCA9IGAke3RoaXMudXBsb2FkSG9zdH0vYXBpLzIuMC9maWxlcy91cGxvYWRfc2Vzc2lvbnNgO1xyXG5cclxuICAgICAgICBwYXJ0cy5mb3JFYWNoKChwYXJ0KSA9PiB7XHJcbiAgICAgICAgICAgIHNlc3Npb25VcmwgPSBgJHtzZXNzaW9uVXJsfS8ke3BhcnR9YDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlc3Npb25Vcmw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGxvYWRzIGEgZmlsZSB1c2luZyBjaHVua2VkIHVwbG9hZCBBUEkuIElmIHRoZXJlIGlzIGEgY29uZmxpY3QgYW5kIG92ZXJ3cml0ZSBpcyB0cnVlLFxyXG4gICAgICogcmVwbGFjZSB0aGUgZmlsZS4gT3RoZXJ3aXNlLCByZS11cGxvYWQgd2l0aCBhIGRpZmZlcmVudCBuYW1lLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVXBsb2FkIG9wdGlvbnNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmlkIC0gRm9sZGVyIGlkXHJcbiAgICAgKiBAcGFyYW0ge0ZpbGV9IG9wdGlvbnMuZmlsZSAtIEZpbGUgYmxvYiBvYmplY3RcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnN1Y2Nlc3NDYWxsYmFja10gLSBGdW5jdGlvbiB0byBjYWxsIHdpdGggcmVzcG9uc2VcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmVycm9yQ2FsbGJhY2tdIC0gRnVuY3Rpb24gdG8gY2FsbCB3aXRoIGVycm9yc1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMucHJvZ3Jlc3NDYWxsYmFja10gLSBGdW5jdGlvbiB0byBjYWxsIHdpdGggcHJvZ3Jlc3NcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW292ZXJ3cml0ZV0gLSBTaG91bGQgdXBsb2FkIG92ZXJ3cml0ZSBmaWxlIHdpdGggc2FtZSBuYW1lXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICB1cGxvYWQoe1xyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIGZpbGUsXHJcbiAgICAgICAgc3VjY2Vzc0NhbGxiYWNrID0gbm9vcCxcclxuICAgICAgICBlcnJvckNhbGxiYWNrID0gbm9vcCxcclxuICAgICAgICBwcm9ncmVzc0NhbGxiYWNrID0gbm9vcCxcclxuICAgICAgICBvdmVyd3JpdGUgPSB0cnVlXHJcbiAgICB9OiB7XHJcbiAgICAgICAgaWQ6IHN0cmluZyxcclxuICAgICAgICBmaWxlOiBGaWxlLFxyXG4gICAgICAgIHN1Y2Nlc3NDYWxsYmFjazogRnVuY3Rpb24sXHJcbiAgICAgICAgZXJyb3JDYWxsYmFjazogRnVuY3Rpb24sXHJcbiAgICAgICAgcHJvZ3Jlc3NDYWxsYmFjazogRnVuY3Rpb24sXHJcbiAgICAgICAgb3ZlcndyaXRlOiBib29sZWFuXHJcbiAgICB9KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEZXN0cm95ZWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTYXZlIHJlZmVyZW5jZXNcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5maWxlID0gZmlsZTtcclxuICAgICAgICB0aGlzLnN1Y2Nlc3NDYWxsYmFjayA9IHN1Y2Nlc3NDYWxsYmFjaztcclxuICAgICAgICB0aGlzLmVycm9yQ2FsbGJhY2sgPSBlcnJvckNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NDYWxsYmFjayA9IHByb2dyZXNzQ2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5vdmVyd3JpdGUgPSBvdmVyd3JpdGU7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhMSA9IG5ldyBSdXNoYSgpO1xyXG4gICAgICAgIHRoaXMuc2hhMS5yZXNldFN0YXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlVXBsb2FkU2Vzc2lvbih7XHJcbiAgICAgICAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGUubmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FuY2VscyBhbiB1cGxvYWQgaW4gcHJvZ3Jlc3MgYnkgY2FuY2VsbGluZyBhbGwgdXBsb2FkIGNodW5rcy5cclxuICAgICAqIFRoaXMgY2Fubm90IGJlIHVuZG9uZSBvciByZXN1bWVkLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBjYW5jZWwoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEZXN0cm95ZWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDYW5jZWwgaW5kaXZpZHVhbCB1cGxvYWQgY2h1bmtzXHJcbiAgICAgICAgdGhpcy5jaHVua3MuZm9yRWFjaCgoY2h1bmspID0+IHtcclxuICAgICAgICAgICAgY2h1bmsuY2FuY2VsKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2h1bmtzID0gW107XHJcblxyXG4gICAgICAgIC8vIEFib3J0IHVwbG9hZCBzZXNzaW9uXHJcbiAgICAgICAgdGhpcy54aHIuZGVsZXRlKHsgdXJsOiB0aGlzLmdldFVwbG9hZFNlc3Npb25VcmwodGhpcy5zZXNzaW9uSWQpIH0pO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaHVua2VkVXBsb2FkO1xyXG4iXX0=