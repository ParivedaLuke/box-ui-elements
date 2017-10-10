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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNodW5rLmpzIl0sIm5hbWVzIjpbIm5vb3AiLCJCYXNlIiwiVVBMT0FEX1JFVFJZX0lOVEVSVkFMX01TIiwiQ2h1bmsiLCJkYXRhIiwicHJvZ3Jlc3MiLCJwYXJ0Iiwic2Vzc2lvbklkIiwib2Zmc2V0Iiwic2hhMSIsInRvdGFsU2l6ZSIsInN1Y2Nlc3NDYWxsYmFjayIsImVycm9yQ2FsbGJhY2siLCJwcm9ncmVzc0NhbGxiYWNrIiwidXBsb2FkVXJsIiwidXBsb2FkSG9zdCIsInJhbmdlU3RhcnQiLCJyYW5nZUVuZCIsInNpemUiLCJ1cGxvYWRIZWFkZXJzIiwiRGlnZXN0IiwiY2h1bmsiLCJpc0Rlc3Ryb3llZCIsInhociIsInVwbG9hZEZpbGUiLCJ1cmwiLCJoZWFkZXJzIiwibWV0aG9kIiwic3VjY2Vzc0hhbmRsZXIiLCJlcnJvckhhbmRsZXIiLCJlcnIiLCJjb2RlIiwiY2FuY2VsIiwicmV0cnkiLCJzZXRUaW1lb3V0IiwidXBsb2FkIiwicHJvZ3Jlc3NIYW5kbGVyIiwiYWJvcnQiLCJjbGVhclRpbWVvdXQiLCJkZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7QUFNQSxPQUFPQSxJQUFQLE1BQWlCLGFBQWpCO0FBQ0EsT0FBT0MsSUFBUCxNQUFpQixRQUFqQjs7O0FBR0EsSUFBTUMsMkJBQTJCLElBQWpDOztJQUVNQyxLOzs7Ozs7Ozs7Ozs7Ozt3TEFHRkMsSSxHQUFlLEUsUUFDZkMsUSxHQUFtQixDOzs7Ozs7O0FBUW5COzs7OztrQ0FLVTtBQUNOLG1CQUFPLEtBQUtELElBQUwsQ0FBVUUsSUFBakI7QUFDSDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7cUNBZ0NTO0FBQUEsZ0JBakJMQyxTQWlCSyxTQWpCTEEsU0FpQks7QUFBQSxnQkFoQkxELElBZ0JLLFNBaEJMQSxJQWdCSztBQUFBLGdCQWZMRSxNQWVLLFNBZkxBLE1BZUs7QUFBQSxnQkFkTEMsSUFjSyxTQWRMQSxJQWNLO0FBQUEsZ0JBYkxDLFNBYUssU0FiTEEsU0FhSztBQUFBLDhDQVpMQyxlQVlLO0FBQUEsZ0JBWkxBLGVBWUsseUNBWmFYLElBWWI7QUFBQSw0Q0FYTFksYUFXSztBQUFBLGdCQVhMQSxhQVdLLHVDQVhXWixJQVdYO0FBQUEsOENBVkxhLGdCQVVLO0FBQUEsZ0JBVkxBLGdCQVVLLHlDQVZjYixJQVVkOztBQUNMLGlCQUFLYyxTQUFMLEdBQW9CLEtBQUtDLFVBQXpCLHVDQUFxRVIsU0FBckU7O0FBRUE7QUFDQSxnQkFBTVMsYUFBYVIsTUFBbkI7QUFDQSxnQkFBSVMsV0FBV1QsU0FBU0YsS0FBS1ksSUFBZCxHQUFxQixDQUFwQztBQUNBLGdCQUFJRCxXQUFXUCxZQUFZLENBQTNCLEVBQThCO0FBQzFCTywyQkFBV1AsWUFBWSxDQUF2QjtBQUNIOztBQUVELGlCQUFLUyxhQUFMLEdBQXFCO0FBQ2pCLGdDQUFnQiwwQkFEQztBQUVqQkMsaUNBQWVYLElBQWYsTUFGaUI7QUFHakIsNENBQTBCTyxVQUExQixTQUF3Q0MsUUFBeEMsU0FBb0RQO0FBSG5DLGFBQXJCOztBQU1BLGlCQUFLVyxLQUFMLEdBQWFmLElBQWI7QUFDQSxpQkFBS0ssZUFBTCxHQUF1QkEsZUFBdkI7QUFDQSxpQkFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxpQkFBS0MsZ0JBQUwsR0FBd0JBLGdCQUF4QjtBQUNIOztBQUVEOzs7Ozs7OztpQ0FLZTtBQUFBOztBQUNYLGdCQUFJLEtBQUtTLFdBQUwsRUFBSixFQUF3QjtBQUNwQixxQkFBS0QsS0FBTCxHQUFhLElBQWI7QUFDQTtBQUNIOztBQUVELGlCQUFLRSxHQUFMLENBQVNDLFVBQVQsQ0FBb0I7QUFDaEJDLHFCQUFLLEtBQUtYLFNBRE07QUFFaEJWLHNCQUFNLEtBQUtpQixLQUZLO0FBR2hCSyx5QkFBUyxLQUFLUCxhQUhFO0FBSWhCUSx3QkFBUSxLQUpRO0FBS2hCQyxnQ0FBZ0Isd0JBQUN4QixJQUFELEVBQVU7QUFDdEIsMkJBQUtDLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSwyQkFBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsMkJBQUtpQixLQUFMLEdBQWEsSUFBYjtBQUNBLDJCQUFLVixlQUFMLENBQXFCUCxJQUFyQjtBQUNILGlCQVZlO0FBV2hCeUIsOEJBQWMsc0JBQUNDLEdBQUQsRUFBUztBQUNuQjtBQUNBLHdCQUFJQSxJQUFJQyxJQUFKLElBQVlELElBQUlDLElBQUosS0FBYSxHQUE3QixFQUFrQztBQUM5QiwrQkFBS0MsTUFBTDtBQUNBLCtCQUFLcEIsYUFBTCxDQUFtQmtCLEdBQW5COztBQUVBO0FBQ0gscUJBTEQsTUFLTztBQUNILCtCQUFLRyxLQUFMLEdBQWFDLFdBQVc7QUFBQSxtQ0FBTSxPQUFLQyxNQUFMLEVBQU47QUFBQSx5QkFBWCxFQUFnQ2pDLHdCQUFoQyxDQUFiO0FBQ0g7QUFDSixpQkFyQmU7QUFzQmhCa0MsaUNBQWlCLEtBQUt2QjtBQXRCTixhQUFwQjtBQXdCSDs7QUFFRDs7Ozs7Ozs7aUNBS2U7QUFDWCxnQkFBSSxLQUFLVSxHQUFMLElBQVksT0FBTyxLQUFLQSxHQUFMLENBQVNjLEtBQWhCLEtBQTBCLFVBQTFDLEVBQXNEO0FBQ2xELHFCQUFLZCxHQUFMLENBQVNjLEtBQVQ7QUFDSDs7QUFFREMseUJBQWEsS0FBS0wsS0FBbEI7QUFDQSxpQkFBS1osS0FBTCxHQUFhLElBQWI7QUFDQSxpQkFBS2pCLElBQUwsR0FBWSxFQUFaO0FBQ0EsaUJBQUttQyxPQUFMO0FBQ0g7O0FBRUQ7Ozs7Ozs7O3NDQUtzQjtBQUNsQixtQkFBTyxLQUFLbEMsUUFBWjtBQUNIOztBQUVEOzs7Ozs7OztvQ0FLWUEsUSxFQUF3QjtBQUNoQyxpQkFBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDSDs7OztFQWhKZUosSTs7QUFtSnBCLGVBQWVFLEtBQWYiLCJmaWxlIjoiQ2h1bmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgUmVwcmVzZW50cyBhIGNodW5rZWQgcGFydCBvZiBhIGZpbGUgLSB1c2VkIGJ5IHRoZSBjaHVua2VkIHVwbG9hZCBBUElcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgbm9vcCBmcm9tICdsb2Rhc2gubm9vcCc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCB0eXBlIHsgU3RyaW5nTWFwIH0gZnJvbSAnLi4vZmxvd1R5cGVzJztcclxuXHJcbmNvbnN0IFVQTE9BRF9SRVRSWV9JTlRFUlZBTF9NUyA9IDEwMDA7XHJcblxyXG5jbGFzcyBDaHVuayBleHRlbmRzIEJhc2Uge1xyXG4gICAgY2FuY2VsbGVkOiBib29sZWFuO1xyXG4gICAgY2h1bms6ID9CbG9iO1xyXG4gICAgZGF0YTogT2JqZWN0ID0ge307XHJcbiAgICBwcm9ncmVzczogbnVtYmVyID0gMDtcclxuICAgIHJldHJ5OiBudW1iZXI7XHJcbiAgICB1cGxvYWRIZWFkZXJzOiBTdHJpbmdNYXA7XHJcbiAgICB1cGxvYWRVcmw6IHN0cmluZztcclxuICAgIHN1Y2Nlc3NDYWxsYmFjazogRnVuY3Rpb247XHJcbiAgICBlcnJvckNhbGxiYWNrOiBGdW5jdGlvbjtcclxuICAgIHByb2dyZXNzQ2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBmaWxlIHBhcnQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2h1bmsuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXRQYXJ0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEucGFydDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIGNodW5rIGZvciB1cGxvYWRpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnNlc3Npb25JZCAtIElEIG9mIHVwbG9hZCBzZXNzaW9uIHRoYXQgdGhpcyBjaHVuayBiZWxvbmdzIHRvXHJcbiAgICAgKiBAcGFyYW0ge0Jsb2J9IG9wdGlvbnMucGFydCAtIENodW5rIGJsb2JcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLm9mZnNldCA9IENodW5rIG9mZnNldFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuc2hhMSAtIENodW5rIHNoYTFcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnRvdGFsU2l6ZSAtIFRvdGFsIHNpemUgb2YgZmlsZSB0aGF0IHRoaXMgY2h1bmsgYmVsb25ncyB0b1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuc3VjY2Vzc0NhbGxiYWNrXSAtIENodW5rIHVwbG9hZCBzdWNjZXNzIGNhbGxiYWNrXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5lcnJvckNhbGxiYWNrXSAtIENodW5rIHVwbG9hZCBlcnJvciBjYWxsYmFja1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMucHJvZ3Jlc3NDYWxsYmFja10gLSBDaHVuayB1cGxvYWQgcHJvZ3Jlc3MgY2FsbGJhY2tcclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XHJcbiAgICAgKi9cclxuICAgIHNldHVwKHtcclxuICAgICAgICBzZXNzaW9uSWQsXHJcbiAgICAgICAgcGFydCxcclxuICAgICAgICBvZmZzZXQsXHJcbiAgICAgICAgc2hhMSxcclxuICAgICAgICB0b3RhbFNpemUsXHJcbiAgICAgICAgc3VjY2Vzc0NhbGxiYWNrID0gbm9vcCxcclxuICAgICAgICBlcnJvckNhbGxiYWNrID0gbm9vcCxcclxuICAgICAgICBwcm9ncmVzc0NhbGxiYWNrID0gbm9vcFxyXG4gICAgfToge1xyXG4gICAgICAgIHNlc3Npb25JZDogc3RyaW5nLFxyXG4gICAgICAgIHBhcnQ6IEJsb2IsXHJcbiAgICAgICAgb2Zmc2V0OiBudW1iZXIsXHJcbiAgICAgICAgc2hhMTogc3RyaW5nLFxyXG4gICAgICAgIHRvdGFsU2l6ZTogbnVtYmVyLFxyXG4gICAgICAgIHN1Y2Nlc3NDYWxsYmFjaz86IEZ1bmN0aW9uLFxyXG4gICAgICAgIGVycm9yQ2FsbGJhY2s/OiBGdW5jdGlvbixcclxuICAgICAgICBwcm9ncmVzc0NhbGxiYWNrPzogRnVuY3Rpb25cclxuICAgIH0pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVwbG9hZFVybCA9IGAke3RoaXMudXBsb2FkSG9zdH0vYXBpLzIuMC9maWxlcy91cGxvYWRfc2Vzc2lvbnMvJHtzZXNzaW9uSWR9YDtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHJhbmdlXHJcbiAgICAgICAgY29uc3QgcmFuZ2VTdGFydCA9IG9mZnNldDtcclxuICAgICAgICBsZXQgcmFuZ2VFbmQgPSBvZmZzZXQgKyBwYXJ0LnNpemUgLSAxO1xyXG4gICAgICAgIGlmIChyYW5nZUVuZCA+IHRvdGFsU2l6ZSAtIDEpIHtcclxuICAgICAgICAgICAgcmFuZ2VFbmQgPSB0b3RhbFNpemUgLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGxvYWRIZWFkZXJzID0ge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScsXHJcbiAgICAgICAgICAgIERpZ2VzdDogYFNIQT0ke3NoYTF9fWAsXHJcbiAgICAgICAgICAgICdDb250ZW50LVJhbmdlJzogYGJ5dGVzICR7cmFuZ2VTdGFydH0tJHtyYW5nZUVuZH0vJHt0b3RhbFNpemV9YFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY2h1bmsgPSBwYXJ0O1xyXG4gICAgICAgIHRoaXMuc3VjY2Vzc0NhbGxiYWNrID0gc3VjY2Vzc0NhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuZXJyb3JDYWxsYmFjayA9IGVycm9yQ2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0NhbGxiYWNrID0gcHJvZ3Jlc3NDYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwbG9hZHMgdGhpcyBjaHVuayB2aWEgdGhlIEFQSS4gV2lsbCByZXRyeSBvbiBuZXR3b3JrIGZhaWx1cmVzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICB1cGxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEZXN0cm95ZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNodW5rID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy54aHIudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIHVybDogdGhpcy51cGxvYWRVcmwsXHJcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuY2h1bmssXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMudXBsb2FkSGVhZGVycyxcclxuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcclxuICAgICAgICAgICAgc3VjY2Vzc0hhbmRsZXI6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNodW5rID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VjY2Vzc0NhbGxiYWNrKGRhdGEpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvckhhbmRsZXI6IChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYW4gZXJyb3IgY29kZSBhbmQgaXQncyBub3QgNDI5IGZyb20gcmF0ZSBsaW1pdGluZywgZmFpbCB0aGUgdXBsb2FkXHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyLmNvZGUgJiYgZXJyLmNvZGUgIT09IDQyOSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvckNhbGxiYWNrKGVycik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHJ5IG9uIG90aGVyIGZhaWx1cmVzIHNpbmNlIHRoZXNlIGFyZSBsaWtlbHkgdG8gYmUgbmV0d29yayBlcnJvcnNcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXRyeSA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGxvYWQoKSwgVVBMT0FEX1JFVFJZX0lOVEVSVkFMX01TKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJvZ3Jlc3NIYW5kbGVyOiB0aGlzLnByb2dyZXNzQ2FsbGJhY2tcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbmNlbHMgdXBsb2FkIGZvciB0aGlzIGNodW5rLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBjYW5jZWwoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMueGhyICYmIHR5cGVvZiB0aGlzLnhoci5hYm9ydCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnhoci5hYm9ydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmV0cnkpO1xyXG4gICAgICAgIHRoaXMuY2h1bmsgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHt9O1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBwcm9ncmVzcy4gUHJvZ3Jlc3MgZ29lcyBmcm9tIDAtMS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IFByb2dyZXNzIGZyb20gMC0xXHJcbiAgICAgKi9cclxuICAgIGdldFByb2dyZXNzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgcHJvZ3Jlc3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHByb2dyZXNzIC0gTnVtZXJpY2FsIHByb2dyZXNzXHJcbiAgICAgKi9cclxuICAgIHNldFByb2dyZXNzKHByb2dyZXNzOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENodW5rO1xyXG4iXX0=