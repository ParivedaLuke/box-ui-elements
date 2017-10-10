var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box file api
 * @author Box
 */

import Item from './Item';
import getFields from '../util/fields';
import { FIELD_DOWNLOAD_URL, CACHE_PREFIX_FILE, X_REP_HINTS, TYPED_ID_FILE_PREFIX } from '../constants';

var File = function (_Item) {
    _inherits(File, _Item);

    function File() {
        _classCallCheck(this, File);

        return _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).apply(this, arguments));
    }

    _createClass(File, [{
        key: 'getCacheKey',

        /**
         * Creates a key for the cache
         *
         * @param {string} id folder id
         * @return {string} key
         */
        value: function getCacheKey(id) {
            return '' + CACHE_PREFIX_FILE + id;
        }

        /**
         * Returns typed id for file. Useful for when
         * making file based XHRs where auth token
         * can be per file as used by Preview.
         *
         * @return {string} typed id for file
         */

    }, {
        key: 'getTypedFileId',
        value: function getTypedFileId(id) {
            return '' + TYPED_ID_FILE_PREFIX + id;
        }

        /**
         * API URL for files
         *
         * @param {string} [id] optional file id
         * @return {string} base url for files
         */

    }, {
        key: 'getUrl',
        value: function getUrl(id) {
            var suffix = id ? '/' + id : '';
            return this.getBaseUrl() + '/files' + suffix;
        }

        /**
         * API for getting download URL for files
         *
         * @param {string} id - file id
         * @return {void}
         */

    }, {
        key: 'getDownloadUrl',
        value: function getDownloadUrl(id, successCallback, errorCallback) {
            return this.xhr.get({
                url: this.getUrl(id),
                params: {
                    fields: FIELD_DOWNLOAD_URL
                }
            }).then(function (data) {
                successCallback(data[FIELD_DOWNLOAD_URL]);
            }).catch(errorCallback);
        }

        /**
         * Gets a box file
         *
         * @param {string} id - File id
         * @param {Function} successCallback - Function to call with results
         * @param {Function} errorCallback - Function to call with errors
         * @param {boolean|void} [forceFetch] - Bypasses the cache
         * @param {boolean|void} [includePreviewSidebar] - Optionally include preview sidebar fields
         * @return {Promise}
         */

    }, {
        key: 'file',
        value: function file(id, successCallback, errorCallback) {
            var forceFetch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            var includePreviewSidebarFields = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

            if (this.isDestroyed()) {
                return Promise.reject();
            }

            var cache = this.getCache();
            var key = this.getCacheKey(id);

            // Clear the cache if needed
            if (forceFetch) {
                cache.unset(key);
            }

            // Return the Cache value if it exists
            if (cache.has(key)) {
                successCallback(cache.get(key));
                return Promise.resolve();
            }

            // Make the XHR request
            // We use per file auth tokens for file
            // as thats what needed by preview.
            return this.xhr.get({
                id: this.getTypedFileId(id),
                url: this.getUrl(id),
                params: {
                    fields: getFields(true, includePreviewSidebarFields)
                },
                headers: { 'X-Rep-Hints': X_REP_HINTS }
            }).then(function (file) {
                cache.set(key, file);
                successCallback(file);
            }).catch(errorCallback);
        }
    }]);

    return File;
}(Item);

export default File;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZpbGUuanMiXSwibmFtZXMiOlsiSXRlbSIsImdldEZpZWxkcyIsIkZJRUxEX0RPV05MT0FEX1VSTCIsIkNBQ0hFX1BSRUZJWF9GSUxFIiwiWF9SRVBfSElOVFMiLCJUWVBFRF9JRF9GSUxFX1BSRUZJWCIsIkZpbGUiLCJpZCIsInN1ZmZpeCIsImdldEJhc2VVcmwiLCJzdWNjZXNzQ2FsbGJhY2siLCJlcnJvckNhbGxiYWNrIiwieGhyIiwiZ2V0IiwidXJsIiwiZ2V0VXJsIiwicGFyYW1zIiwiZmllbGRzIiwidGhlbiIsImRhdGEiLCJjYXRjaCIsImZvcmNlRmV0Y2giLCJpbmNsdWRlUHJldmlld1NpZGViYXJGaWVsZHMiLCJpc0Rlc3Ryb3llZCIsIlByb21pc2UiLCJyZWplY3QiLCJjYWNoZSIsImdldENhY2hlIiwia2V5IiwiZ2V0Q2FjaGVLZXkiLCJ1bnNldCIsImhhcyIsInJlc29sdmUiLCJnZXRUeXBlZEZpbGVJZCIsImhlYWRlcnMiLCJmaWxlIiwic2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7QUFNQSxPQUFPQSxJQUFQLE1BQWlCLFFBQWpCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixnQkFBdEI7QUFDQSxTQUFTQyxrQkFBVCxFQUE2QkMsaUJBQTdCLEVBQWdEQyxXQUFoRCxFQUE2REMsb0JBQTdELFFBQXlGLGNBQXpGOztJQUlNQyxJOzs7Ozs7Ozs7Ozs7QUFDRjs7Ozs7O29DQU1ZQyxFLEVBQW9CO0FBQzVCLHdCQUFVSixpQkFBVixHQUE4QkksRUFBOUI7QUFDSDs7QUFFRDs7Ozs7Ozs7Ozt1Q0FPZUEsRSxFQUFvQjtBQUMvQix3QkFBVUYsb0JBQVYsR0FBaUNFLEVBQWpDO0FBQ0g7O0FBRUQ7Ozs7Ozs7OzsrQkFNT0EsRSxFQUFvQjtBQUN2QixnQkFBTUMsU0FBaUJELFdBQVNBLEVBQVQsR0FBZ0IsRUFBdkM7QUFDQSxtQkFBVSxLQUFLRSxVQUFMLEVBQVYsY0FBb0NELE1BQXBDO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozt1Q0FNZUQsRSxFQUFZRyxlLEVBQTJCQyxhLEVBQXdDO0FBQzFGLG1CQUFPLEtBQUtDLEdBQUwsQ0FDRkMsR0FERSxDQUNFO0FBQ0RDLHFCQUFLLEtBQUtDLE1BQUwsQ0FBWVIsRUFBWixDQURKO0FBRURTLHdCQUFRO0FBQ0pDLDRCQUFRZjtBQURKO0FBRlAsYUFERixFQU9GZ0IsSUFQRSxDQU9HLFVBQUNDLElBQUQsRUFBbUI7QUFDckJULGdDQUFnQlMsS0FBS2pCLGtCQUFMLENBQWhCO0FBQ0gsYUFURSxFQVVGa0IsS0FWRSxDQVVJVCxhQVZKLENBQVA7QUFXSDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs2QkFXSUosRSxFQUNBRyxlLEVBQ0FDLGEsRUFHYTtBQUFBLGdCQUZiVSxVQUVhLHVFQUZTLEtBRVQ7QUFBQSxnQkFEYkMsMkJBQ2EsdUVBRDBCLEtBQzFCOztBQUNiLGdCQUFJLEtBQUtDLFdBQUwsRUFBSixFQUF3QjtBQUNwQix1QkFBT0MsUUFBUUMsTUFBUixFQUFQO0FBQ0g7O0FBRUQsZ0JBQU1DLFFBQWUsS0FBS0MsUUFBTCxFQUFyQjtBQUNBLGdCQUFNQyxNQUFNLEtBQUtDLFdBQUwsQ0FBaUJ0QixFQUFqQixDQUFaOztBQUVBO0FBQ0EsZ0JBQUljLFVBQUosRUFBZ0I7QUFDWkssc0JBQU1JLEtBQU4sQ0FBWUYsR0FBWjtBQUNIOztBQUVEO0FBQ0EsZ0JBQUlGLE1BQU1LLEdBQU4sQ0FBVUgsR0FBVixDQUFKLEVBQW9CO0FBQ2hCbEIsZ0NBQWdCZ0IsTUFBTWIsR0FBTixDQUFVZSxHQUFWLENBQWhCO0FBQ0EsdUJBQU9KLFFBQVFRLE9BQVIsRUFBUDtBQUNIOztBQUVEO0FBQ0E7QUFDQTtBQUNBLG1CQUFPLEtBQUtwQixHQUFMLENBQ0ZDLEdBREUsQ0FDRTtBQUNETixvQkFBSSxLQUFLMEIsY0FBTCxDQUFvQjFCLEVBQXBCLENBREg7QUFFRE8scUJBQUssS0FBS0MsTUFBTCxDQUFZUixFQUFaLENBRko7QUFHRFMsd0JBQVE7QUFDSkMsNEJBQVFoQixVQUFVLElBQVYsRUFBZ0JxQiwyQkFBaEI7QUFESixpQkFIUDtBQU1EWSx5QkFBUyxFQUFFLGVBQWU5QixXQUFqQjtBQU5SLGFBREYsRUFTRmMsSUFURSxDQVNHLFVBQUNpQixJQUFELEVBQW1CO0FBQ3JCVCxzQkFBTVUsR0FBTixDQUFVUixHQUFWLEVBQWVPLElBQWY7QUFDQXpCLGdDQUFnQnlCLElBQWhCO0FBQ0gsYUFaRSxFQWFGZixLQWJFLENBYUlULGFBYkosQ0FBUDtBQWNIOzs7O0VBekdjWCxJOztBQTRHbkIsZUFBZU0sSUFBZiIsImZpbGUiOiJGaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEhlbHBlciBmb3IgdGhlIGJveCBmaWxlIGFwaVxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBJdGVtIGZyb20gJy4vSXRlbSc7XHJcbmltcG9ydCBnZXRGaWVsZHMgZnJvbSAnLi4vdXRpbC9maWVsZHMnO1xyXG5pbXBvcnQgeyBGSUVMRF9ET1dOTE9BRF9VUkwsIENBQ0hFX1BSRUZJWF9GSUxFLCBYX1JFUF9ISU5UUywgVFlQRURfSURfRklMRV9QUkVGSVggfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgdHlwZSBDYWNoZSBmcm9tICcuLi91dGlsL0NhY2hlJztcclxuaW1wb3J0IHR5cGUgeyBCb3hJdGVtIH0gZnJvbSAnLi4vZmxvd1R5cGVzJztcclxuXHJcbmNsYXNzIEZpbGUgZXh0ZW5kcyBJdGVtIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGtleSBmb3IgdGhlIGNhY2hlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIGZvbGRlciBpZFxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBrZXlcclxuICAgICAqL1xyXG4gICAgZ2V0Q2FjaGVLZXkoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGAke0NBQ0hFX1BSRUZJWF9GSUxFfSR7aWR9YDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHlwZWQgaWQgZm9yIGZpbGUuIFVzZWZ1bCBmb3Igd2hlblxyXG4gICAgICogbWFraW5nIGZpbGUgYmFzZWQgWEhScyB3aGVyZSBhdXRoIHRva2VuXHJcbiAgICAgKiBjYW4gYmUgcGVyIGZpbGUgYXMgdXNlZCBieSBQcmV2aWV3LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gdHlwZWQgaWQgZm9yIGZpbGVcclxuICAgICAqL1xyXG4gICAgZ2V0VHlwZWRGaWxlSWQoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGAke1RZUEVEX0lEX0ZJTEVfUFJFRklYfSR7aWR9YDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFQSSBVUkwgZm9yIGZpbGVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtpZF0gb3B0aW9uYWwgZmlsZSBpZFxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBiYXNlIHVybCBmb3IgZmlsZXNcclxuICAgICAqL1xyXG4gICAgZ2V0VXJsKGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHN1ZmZpeDogc3RyaW5nID0gaWQgPyBgLyR7aWR9YCA6ICcnO1xyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLmdldEJhc2VVcmwoKX0vZmlsZXMke3N1ZmZpeH1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIGZvciBnZXR0aW5nIGRvd25sb2FkIFVSTCBmb3IgZmlsZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBmaWxlIGlkXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBnZXREb3dubG9hZFVybChpZDogc3RyaW5nLCBzdWNjZXNzQ2FsbGJhY2s6IEZ1bmN0aW9uLCBlcnJvckNhbGxiYWNrOiBGdW5jdGlvbik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnhoclxyXG4gICAgICAgICAgICAuZ2V0KHtcclxuICAgICAgICAgICAgICAgIHVybDogdGhpcy5nZXRVcmwoaWQpLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiBGSUVMRF9ET1dOTE9BRF9VUkxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKGRhdGE6IEJveEl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayhkYXRhW0ZJRUxEX0RPV05MT0FEX1VSTF0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3JDYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgYm94IGZpbGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBGaWxlIGlkXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdWNjZXNzQ2FsbGJhY2sgLSBGdW5jdGlvbiB0byBjYWxsIHdpdGggcmVzdWx0c1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZXJyb3JDYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGNhbGwgd2l0aCBlcnJvcnNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnx2b2lkfSBbZm9yY2VGZXRjaF0gLSBCeXBhc3NlcyB0aGUgY2FjaGVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnx2b2lkfSBbaW5jbHVkZVByZXZpZXdTaWRlYmFyXSAtIE9wdGlvbmFsbHkgaW5jbHVkZSBwcmV2aWV3IHNpZGViYXIgZmllbGRzXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBmaWxlKFxyXG4gICAgICAgIGlkOiBzdHJpbmcsXHJcbiAgICAgICAgc3VjY2Vzc0NhbGxiYWNrOiBGdW5jdGlvbixcclxuICAgICAgICBlcnJvckNhbGxiYWNrOiBGdW5jdGlvbixcclxuICAgICAgICBmb3JjZUZldGNoOiBib29sZWFuID0gZmFsc2UsXHJcbiAgICAgICAgaW5jbHVkZVByZXZpZXdTaWRlYmFyRmllbGRzOiBib29sZWFuID0gZmFsc2VcclxuICAgICk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVzdHJveWVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjYWNoZTogQ2FjaGUgPSB0aGlzLmdldENhY2hlKCk7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5nZXRDYWNoZUtleShpZCk7XHJcblxyXG4gICAgICAgIC8vIENsZWFyIHRoZSBjYWNoZSBpZiBuZWVkZWRcclxuICAgICAgICBpZiAoZm9yY2VGZXRjaCkge1xyXG4gICAgICAgICAgICBjYWNoZS51bnNldChrZXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBDYWNoZSB2YWx1ZSBpZiBpdCBleGlzdHNcclxuICAgICAgICBpZiAoY2FjaGUuaGFzKGtleSkpIHtcclxuICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKGNhY2hlLmdldChrZXkpKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWFrZSB0aGUgWEhSIHJlcXVlc3RcclxuICAgICAgICAvLyBXZSB1c2UgcGVyIGZpbGUgYXV0aCB0b2tlbnMgZm9yIGZpbGVcclxuICAgICAgICAvLyBhcyB0aGF0cyB3aGF0IG5lZWRlZCBieSBwcmV2aWV3LlxyXG4gICAgICAgIHJldHVybiB0aGlzLnhoclxyXG4gICAgICAgICAgICAuZ2V0KHtcclxuICAgICAgICAgICAgICAgIGlkOiB0aGlzLmdldFR5cGVkRmlsZUlkKGlkKSxcclxuICAgICAgICAgICAgICAgIHVybDogdGhpcy5nZXRVcmwoaWQpLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiBnZXRGaWVsZHModHJ1ZSwgaW5jbHVkZVByZXZpZXdTaWRlYmFyRmllbGRzKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVwLUhpbnRzJzogWF9SRVBfSElOVFMgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigoZmlsZTogQm94SXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2FjaGUuc2V0KGtleSwgZmlsZSk7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2soZmlsZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvckNhbGxiYWNrKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmlsZTtcclxuIl19