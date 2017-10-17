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