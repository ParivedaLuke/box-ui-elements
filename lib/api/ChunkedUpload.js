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