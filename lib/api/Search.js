var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box search api
 * @author Box
 */

import Base from './Base';
import FileAPI from './File';
import FolderAPI from './Folder';
import WebLinkAPI from '../api/WebLink';
import flatten from '../util/flatten';
import sort from '../util/sorter';
import getFields from '../util/fields';
import { CACHE_PREFIX_SEARCH, X_REP_HINTS } from '../constants';
import getBadItemError from '../util/error';


var LIMIT_ITEM_FETCH = 200;

var Search = function (_Base) {
    _inherits(Search, _Base);

    function Search() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Search);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref, [this].concat(args))), _this), _this.searchSuccessHandler = function (response) {
            if (_this.isDestroyed()) {
                return;
            }

            var entries = response.entries,
                total_count = response.total_count,
                limit = response.limit,
                offset = response.offset;

            if (!Array.isArray(entries) || typeof total_count !== 'number' || typeof limit !== 'number' || typeof offset !== 'number') {
                throw getBadItemError();
            }

            var flattened = flatten(entries, new FolderAPI(_this.options), new FileAPI(_this.options), new WebLinkAPI(_this.options));
            _this.itemCache = (_this.itemCache || []).concat(flattened);

            // Total count may be more than the actual number of entries, so don't rely
            // on it on its own. Good for calculating percentatge, but not good for
            // figuring our when the collection is done loading.
            var isLoaded = offset + limit >= total_count;

            _this.getCache().set(_this.key, {
                item_collection: Object.assign({}, response, {
                    isLoaded: isLoaded,
                    entries: _this.itemCache
                })
            });

            if (!isLoaded) {
                _this.offset += limit;
                _this.searchRequest();
            }

            _this.finish();
        }, _this.searchErrorHandler = function (error) {
            if (_this.isDestroyed()) {
                return;
            }
            _this.errorCallback(error);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    /**
     * @property {number}
     */


    /**
     * @property {string}
     */


    /**
     * @property {string}
     */


    /**
     * @property {string}
     */


    /**
     * @property {string}
     */


    /**
     * @property {string}
     */


    /**
     * @property {Function}
     */


    /**
     * @property {Function}
     */


    /**
     * @property {Array}
     */


    /**
     * @property {boolean}
     */


    /**
     * @property {boolean}
     */


    _createClass(Search, [{
        key: 'getEncodedQuery',


        /**
         * Creates a key for the cache
         *
         * @param {string} id folder id
         * @param {string} query search string
         * @return {string} key
         */
        value: function getEncodedQuery(query) {
            return encodeURIComponent(query);
        }

        /**
         * Creates a key for the cache
         *
         * @param {string} id folder id
         * @param {string} query search string
         * @return {string} key
         */

    }, {
        key: 'getCacheKey',
        value: function getCacheKey(id, query) {
            return '' + CACHE_PREFIX_SEARCH + id + '|' + query;
        }

        /**
         * URL for search api
         *
         * @param {string} [id] optional file id
         * @return {string} base url for files
         */

    }, {
        key: 'getUrl',
        value: function getUrl() {
            return this.getBaseUrl() + '/search';
        }

        /**
         * Tells if a search results has its items all loaded
         *
         * @return {boolean} if items are loaded
         */

    }, {
        key: 'isLoaded',
        value: function isLoaded() {
            var cache = this.getCache();
            if (!cache.has(this.key)) {
                return false;
            }

            var _cache$get = cache.get(this.key),
                _cache$get$item_colle = _cache$get.item_collection,
                item_collection = _cache$get$item_colle === undefined ? {} : _cache$get$item_colle;

            return !!item_collection.isLoaded;
        }

        /**
         * Sorts and returns the results
         *
         * @return {void}
         */

    }, {
        key: 'finish',
        value: function finish() {
            if (this.isDestroyed()) {
                return;
            }

            var cache = this.getCache();
            var search = cache.get(this.key);
            var sortedSearch = sort(search, this.sortBy, this.sortDirection, cache);
            var item_collection = sortedSearch.item_collection;

            if (!item_collection) {
                throw getBadItemError();
            }

            var entries = item_collection.entries,
                total_count = item_collection.total_count;

            if (!Array.isArray(entries) || typeof total_count !== 'number') {
                throw getBadItemError();
            }

            // Total count may be more than the actual number of entries, so don't rely
            // on it on its own. Good for calculating percentatge, but not good for
            // figuring our when the collection is done loading.
            var percentLoaded = !!item_collection.isLoaded || total_count === 0 ? 100 : entries.length * 100 / total_count;

            var collection = {
                percentLoaded: percentLoaded,
                id: this.id,
                sortBy: this.sortBy,
                sortDirection: this.sortDirection,
                items: entries.map(function (key) {
                    return cache.get(key);
                })
            };
            this.successCallback(collection);
        }

        /**
         * Handles the folder search response
         *
         * @param {Object} response
         * @return {void}
         */


        /**
         * Handles the search error
         *
         * @param {Error} error fetch error
         * @return {void}
         */

    }, {
        key: 'searchRequest',


        /**
         * Does the network request
         *
         * @return {void}
         */
        value: function searchRequest() {
            if (this.isDestroyed()) {
                return Promise.reject();
            }

            return this.xhr.get({
                url: this.getUrl(),
                params: {
                    offset: this.offset,
                    query: this.query,
                    ancestor_folder_ids: this.id,
                    limit: LIMIT_ITEM_FETCH,
                    fields: getFields(this.includePreviewFields, this.includePreviewSidebarFields)
                },
                headers: { 'X-Rep-Hints': X_REP_HINTS }
            }).then(this.searchSuccessHandler).catch(this.searchErrorHandler);
        }

        /**
         * Gets search results
         *
         * @param {string} id - folder id
         * @param {string} query - search string
         * @param {string} sortBy - sort by field
         * @param {string} sortDirection - sort direction
         * @param {Function} successCallback - Function to call with results
         * @param {Function} errorCallback - Function to call with errors
         * @param {boolean|void} [forceFetch] - Bypasses the cache
         * @param {boolean|void} [includePreview] - Optionally include preview fields
         * @param {boolean|void} [includePreviewSidebar] - Optionally include preview sidebar fields
         * @return {void}
         */

    }, {
        key: 'search',
        value: function search(id, query, sortBy, sortDirection, successCallback, errorCallback) {
            var forceFetch = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
            var includePreviewFields = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
            var includePreviewSidebarFields = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;

            if (this.isDestroyed()) {
                return;
            }

            // Save references
            this.offset = 0;
            this.query = query;
            this.id = id;
            this.key = this.getCacheKey(id, this.getEncodedQuery(this.query));
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;
            this.sortBy = sortBy;
            this.sortDirection = sortDirection;
            this.includePreviewFields = includePreviewFields;
            this.includePreviewSidebarFields = includePreviewSidebarFields;

            // Clear the cache if needed
            if (forceFetch) {
                this.getCache().unset(this.key);
            }

            // Return the Cache value if it exists
            if (this.isLoaded()) {
                this.finish();
                return;
            }

            // Make the XHR request
            this.searchRequest();
        }
    }]);

    return Search;
}(Base);

export default Search;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlYXJjaC5qcyJdLCJuYW1lcyI6WyJCYXNlIiwiRmlsZUFQSSIsIkZvbGRlckFQSSIsIldlYkxpbmtBUEkiLCJmbGF0dGVuIiwic29ydCIsImdldEZpZWxkcyIsIkNBQ0hFX1BSRUZJWF9TRUFSQ0giLCJYX1JFUF9ISU5UUyIsImdldEJhZEl0ZW1FcnJvciIsIkxJTUlUX0lURU1fRkVUQ0giLCJTZWFyY2giLCJzZWFyY2hTdWNjZXNzSGFuZGxlciIsInJlc3BvbnNlIiwiaXNEZXN0cm95ZWQiLCJlbnRyaWVzIiwidG90YWxfY291bnQiLCJsaW1pdCIsIm9mZnNldCIsIkFycmF5IiwiaXNBcnJheSIsImZsYXR0ZW5lZCIsIm9wdGlvbnMiLCJpdGVtQ2FjaGUiLCJjb25jYXQiLCJpc0xvYWRlZCIsImdldENhY2hlIiwic2V0Iiwia2V5IiwiaXRlbV9jb2xsZWN0aW9uIiwiT2JqZWN0IiwiYXNzaWduIiwic2VhcmNoUmVxdWVzdCIsImZpbmlzaCIsInNlYXJjaEVycm9ySGFuZGxlciIsImVycm9yIiwiZXJyb3JDYWxsYmFjayIsInF1ZXJ5IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiaWQiLCJnZXRCYXNlVXJsIiwiY2FjaGUiLCJoYXMiLCJnZXQiLCJzZWFyY2giLCJzb3J0ZWRTZWFyY2giLCJzb3J0QnkiLCJzb3J0RGlyZWN0aW9uIiwicGVyY2VudExvYWRlZCIsImxlbmd0aCIsImNvbGxlY3Rpb24iLCJpdGVtcyIsIm1hcCIsInN1Y2Nlc3NDYWxsYmFjayIsIlByb21pc2UiLCJyZWplY3QiLCJ4aHIiLCJ1cmwiLCJnZXRVcmwiLCJwYXJhbXMiLCJhbmNlc3Rvcl9mb2xkZXJfaWRzIiwiZmllbGRzIiwiaW5jbHVkZVByZXZpZXdGaWVsZHMiLCJpbmNsdWRlUHJldmlld1NpZGViYXJGaWVsZHMiLCJoZWFkZXJzIiwidGhlbiIsImNhdGNoIiwiZm9yY2VGZXRjaCIsImdldENhY2hlS2V5IiwiZ2V0RW5jb2RlZFF1ZXJ5IiwidW5zZXQiXSwibWFwcGluZ3MiOiI7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Q3BCO0FBQ0g7O0FBRUQ7QUFDQSxpQkFBS0ksTUFBTCxHQUFjLENBQWQ7QUFDQSxpQkFBS21CLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGlCQUFLRSxFQUFMLEdBQVVBLEVBQVY7QUFDQSxpQkFBS1gsR0FBTCxHQUFXLEtBQUt3QyxXQUFMLENBQWlCN0IsRUFBakIsRUFBcUIsS0FBSzhCLGVBQUwsQ0FBcUIsS0FBS2hDLEtBQTFCLENBQXJCLENBQVg7QUFDQSxpQkFBS2dCLGVBQUwsR0FBdUJBLGVBQXZCO0FBQ0EsaUJBQUtqQixhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLGlCQUFLVSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxpQkFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxpQkFBS2Usb0JBQUwsR0FBNEJBLG9CQUE1QjtBQUNBLGlCQUFLQywyQkFBTCxHQUFtQ0EsMkJBQW5DOztBQUVBO0FBQ0EsZ0JBQUlJLFVBQUosRUFBZ0I7QUFDWixxQkFBS3pDLFFBQUwsR0FBZ0I0QyxLQUFoQixDQUFzQixLQUFLMUMsR0FBM0I7QUFDSDs7QUFFRDtBQUNBLGdCQUFJLEtBQUtILFFBQUwsRUFBSixFQUFxQjtBQUNqQixxQkFBS1EsTUFBTDtBQUNBO0FBQ0g7O0FBRUQ7QUFDQSxpQkFBS0QsYUFBTDtBQUNIOzs7O0VBM1JnQmhDLEk7O0FBOFJyQixlQUFlVyxNQUFmIiwiZmlsZSI6IlNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBIZWxwZXIgZm9yIHRoZSBib3ggc2VhcmNoIGFwaVxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBGaWxlQVBJIGZyb20gJy4vRmlsZSc7XHJcbmltcG9ydCBGb2xkZXJBUEkgZnJvbSAnLi9Gb2xkZXInO1xyXG5pbXBvcnQgV2ViTGlua0FQSSBmcm9tICcuLi9hcGkvV2ViTGluayc7XHJcbmltcG9ydCBmbGF0dGVuIGZyb20gJy4uL3V0aWwvZmxhdHRlbic7XHJcbmltcG9ydCBzb3J0IGZyb20gJy4uL3V0aWwvc29ydGVyJztcclxuaW1wb3J0IGdldEZpZWxkcyBmcm9tICcuLi91dGlsL2ZpZWxkcyc7XHJcbmltcG9ydCB7IENBQ0hFX1BSRUZJWF9TRUFSQ0gsIFhfUkVQX0hJTlRTIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IGdldEJhZEl0ZW1FcnJvciBmcm9tICcuLi91dGlsL2Vycm9yJztcclxuaW1wb3J0IHR5cGUgQ2FjaGUgZnJvbSAnLi4vdXRpbC9DYWNoZSc7XHJcbmltcG9ydCB0eXBlIHtcclxuICAgIEJveEl0ZW1Db2xsZWN0aW9uLFxyXG4gICAgRmxhdHRlbmVkQm94SXRlbSxcclxuICAgIEZsYXR0ZW5lZEJveEl0ZW1Db2xsZWN0aW9uLFxyXG4gICAgU29ydEJ5LFxyXG4gICAgU29ydERpcmVjdGlvbixcclxuICAgIENvbGxlY3Rpb25cclxufSBmcm9tICcuLi9mbG93VHlwZXMnO1xyXG5cclxuY29uc3QgTElNSVRfSVRFTV9GRVRDSCA9IDIwMDtcclxuXHJcbmNsYXNzIFNlYXJjaCBleHRlbmRzIEJhc2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgb2Zmc2V0OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgaWQ6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBrZXk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBxdWVyeTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHNvcnRCeTogU29ydEJ5O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHNvcnREaXJlY3Rpb246IFNvcnREaXJlY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufVxyXG4gICAgICovXHJcbiAgICBzdWNjZXNzQ2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn1cclxuICAgICAqL1xyXG4gICAgZXJyb3JDYWxsYmFjazogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge0FycmF5fVxyXG4gICAgICovXHJcbiAgICBpdGVtQ2FjaGU6IHN0cmluZ1tdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBpbmNsdWRlUHJldmlld0ZpZWxkczogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaW5jbHVkZVByZXZpZXdTaWRlYmFyRmllbGRzOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGtleSBmb3IgdGhlIGNhY2hlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIGZvbGRlciBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IHNlYXJjaCBzdHJpbmdcclxuICAgICAqIEByZXR1cm4ge3N0cmluZ30ga2V5XHJcbiAgICAgKi9cclxuICAgIGdldEVuY29kZWRRdWVyeShxdWVyeTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBrZXkgZm9yIHRoZSBjYWNoZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBmb2xkZXIgaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeSBzZWFyY2ggc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IGtleVxyXG4gICAgICovXHJcbiAgICBnZXRDYWNoZUtleShpZDogc3RyaW5nLCBxdWVyeTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCR7Q0FDSEVfUFJFRklYX1NFQVJDSH0ke2lkfXwke3F1ZXJ5fWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVUkwgZm9yIHNlYXJjaCBhcGlcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2lkXSBvcHRpb25hbCBmaWxlIGlkXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IGJhc2UgdXJsIGZvciBmaWxlc1xyXG4gICAgICovXHJcbiAgICBnZXRVcmwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRCYXNlVXJsKCl9L3NlYXJjaGA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZWxscyBpZiBhIHNlYXJjaCByZXN1bHRzIGhhcyBpdHMgaXRlbXMgYWxsIGxvYWRlZFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IGlmIGl0ZW1zIGFyZSBsb2FkZWRcclxuICAgICAqL1xyXG4gICAgaXNMb2FkZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgY2FjaGU6IENhY2hlID0gdGhpcy5nZXRDYWNoZSgpO1xyXG4gICAgICAgIGlmICghY2FjaGUuaGFzKHRoaXMua2V5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHsgaXRlbV9jb2xsZWN0aW9uID0ge30gfTogRmxhdHRlbmVkQm94SXRlbSA9IGNhY2hlLmdldCh0aGlzLmtleSk7XHJcbiAgICAgICAgcmV0dXJuICEhaXRlbV9jb2xsZWN0aW9uLmlzTG9hZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU29ydHMgYW5kIHJldHVybnMgdGhlIHJlc3VsdHNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmaW5pc2goKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEZXN0cm95ZWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjYWNoZTogQ2FjaGUgPSB0aGlzLmdldENhY2hlKCk7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoOiBGbGF0dGVuZWRCb3hJdGVtID0gY2FjaGUuZ2V0KHRoaXMua2V5KTtcclxuICAgICAgICBjb25zdCBzb3J0ZWRTZWFyY2g6IEZsYXR0ZW5lZEJveEl0ZW0gPSBzb3J0KHNlYXJjaCwgdGhpcy5zb3J0QnksIHRoaXMuc29ydERpcmVjdGlvbiwgY2FjaGUpO1xyXG4gICAgICAgIGNvbnN0IHsgaXRlbV9jb2xsZWN0aW9uIH06IEZsYXR0ZW5lZEJveEl0ZW0gPSBzb3J0ZWRTZWFyY2g7XHJcbiAgICAgICAgaWYgKCFpdGVtX2NvbGxlY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhyb3cgZ2V0QmFkSXRlbUVycm9yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IGVudHJpZXMsIHRvdGFsX2NvdW50IH06IEZsYXR0ZW5lZEJveEl0ZW1Db2xsZWN0aW9uID0gaXRlbV9jb2xsZWN0aW9uO1xyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShlbnRyaWVzKSB8fCB0eXBlb2YgdG90YWxfY291bnQgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHRocm93IGdldEJhZEl0ZW1FcnJvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVG90YWwgY291bnQgbWF5IGJlIG1vcmUgdGhhbiB0aGUgYWN0dWFsIG51bWJlciBvZiBlbnRyaWVzLCBzbyBkb24ndCByZWx5XHJcbiAgICAgICAgLy8gb24gaXQgb24gaXRzIG93bi4gR29vZCBmb3IgY2FsY3VsYXRpbmcgcGVyY2VudGF0Z2UsIGJ1dCBub3QgZ29vZCBmb3JcclxuICAgICAgICAvLyBmaWd1cmluZyBvdXIgd2hlbiB0aGUgY29sbGVjdGlvbiBpcyBkb25lIGxvYWRpbmcuXHJcbiAgICAgICAgY29uc3QgcGVyY2VudExvYWRlZDogbnVtYmVyID1cclxuICAgICAgICAgICAgISFpdGVtX2NvbGxlY3Rpb24uaXNMb2FkZWQgfHwgdG90YWxfY291bnQgPT09IDAgPyAxMDAgOiBlbnRyaWVzLmxlbmd0aCAqIDEwMCAvIHRvdGFsX2NvdW50O1xyXG5cclxuICAgICAgICBjb25zdCBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uID0ge1xyXG4gICAgICAgICAgICBwZXJjZW50TG9hZGVkLFxyXG4gICAgICAgICAgICBpZDogdGhpcy5pZCxcclxuICAgICAgICAgICAgc29ydEJ5OiB0aGlzLnNvcnRCeSxcclxuICAgICAgICAgICAgc29ydERpcmVjdGlvbjogdGhpcy5zb3J0RGlyZWN0aW9uLFxyXG4gICAgICAgICAgICBpdGVtczogZW50cmllcy5tYXAoKGtleTogc3RyaW5nKSA9PiBjYWNoZS5nZXQoa2V5KSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc3VjY2Vzc0NhbGxiYWNrKGNvbGxlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgZm9sZGVyIHNlYXJjaCByZXNwb25zZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgc2VhcmNoU3VjY2Vzc0hhbmRsZXIgPSAocmVzcG9uc2U6IEJveEl0ZW1Db2xsZWN0aW9uKTogdm9pZCA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEZXN0cm95ZWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IGVudHJpZXMsIHRvdGFsX2NvdW50LCBsaW1pdCwgb2Zmc2V0IH06IEJveEl0ZW1Db2xsZWN0aW9uID0gcmVzcG9uc2U7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAhQXJyYXkuaXNBcnJheShlbnRyaWVzKSB8fFxyXG4gICAgICAgICAgICB0eXBlb2YgdG90YWxfY291bnQgIT09ICdudW1iZXInIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiBsaW1pdCAhPT0gJ251bWJlcicgfHxcclxuICAgICAgICAgICAgdHlwZW9mIG9mZnNldCAhPT0gJ251bWJlcidcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhyb3cgZ2V0QmFkSXRlbUVycm9yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBmbGF0dGVuZWQ6IHN0cmluZ1tdID0gZmxhdHRlbihcclxuICAgICAgICAgICAgZW50cmllcyxcclxuICAgICAgICAgICAgbmV3IEZvbGRlckFQSSh0aGlzLm9wdGlvbnMpLFxyXG4gICAgICAgICAgICBuZXcgRmlsZUFQSSh0aGlzLm9wdGlvbnMpLFxyXG4gICAgICAgICAgICBuZXcgV2ViTGlua0FQSSh0aGlzLm9wdGlvbnMpXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLml0ZW1DYWNoZSA9ICh0aGlzLml0ZW1DYWNoZSB8fCBbXSkuY29uY2F0KGZsYXR0ZW5lZCk7XHJcblxyXG4gICAgICAgIC8vIFRvdGFsIGNvdW50IG1heSBiZSBtb3JlIHRoYW4gdGhlIGFjdHVhbCBudW1iZXIgb2YgZW50cmllcywgc28gZG9uJ3QgcmVseVxyXG4gICAgICAgIC8vIG9uIGl0IG9uIGl0cyBvd24uIEdvb2QgZm9yIGNhbGN1bGF0aW5nIHBlcmNlbnRhdGdlLCBidXQgbm90IGdvb2QgZm9yXHJcbiAgICAgICAgLy8gZmlndXJpbmcgb3VyIHdoZW4gdGhlIGNvbGxlY3Rpb24gaXMgZG9uZSBsb2FkaW5nLlxyXG4gICAgICAgIGNvbnN0IGlzTG9hZGVkOiBib29sZWFuID0gb2Zmc2V0ICsgbGltaXQgPj0gdG90YWxfY291bnQ7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0Q2FjaGUoKS5zZXQodGhpcy5rZXksIHtcclxuICAgICAgICAgICAgaXRlbV9jb2xsZWN0aW9uOiBPYmplY3QuYXNzaWduKHt9LCByZXNwb25zZSwge1xyXG4gICAgICAgICAgICAgICAgaXNMb2FkZWQsXHJcbiAgICAgICAgICAgICAgICBlbnRyaWVzOiB0aGlzLml0ZW1DYWNoZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIWlzTG9hZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0ICs9IGxpbWl0O1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFJlcXVlc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZmluaXNoKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgc2VhcmNoIGVycm9yXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgZmV0Y2ggZXJyb3JcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHNlYXJjaEVycm9ySGFuZGxlciA9IChlcnJvcjogRXJyb3IpOiB2b2lkID0+IHtcclxuICAgICAgICBpZiAodGhpcy5pc0Rlc3Ryb3llZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lcnJvckNhbGxiYWNrKGVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEb2VzIHRoZSBuZXR3b3JrIHJlcXVlc3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBzZWFyY2hSZXF1ZXN0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVzdHJveWVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy54aHJcclxuICAgICAgICAgICAgLmdldCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuZ2V0VXJsKCksXHJcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IHRoaXMub2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiB0aGlzLnF1ZXJ5LFxyXG4gICAgICAgICAgICAgICAgICAgIGFuY2VzdG9yX2ZvbGRlcl9pZHM6IHRoaXMuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IExJTUlUX0lURU1fRkVUQ0gsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiBnZXRGaWVsZHModGhpcy5pbmNsdWRlUHJldmlld0ZpZWxkcywgdGhpcy5pbmNsdWRlUHJldmlld1NpZGViYXJGaWVsZHMpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXAtSGludHMnOiBYX1JFUF9ISU5UUyB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuc2VhcmNoU3VjY2Vzc0hhbmRsZXIpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLnNlYXJjaEVycm9ySGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHNlYXJjaCByZXN1bHRzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gZm9sZGVyIGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgLSBzZWFyY2ggc3RyaW5nXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc29ydEJ5IC0gc29ydCBieSBmaWVsZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNvcnREaXJlY3Rpb24gLSBzb3J0IGRpcmVjdGlvblxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gc3VjY2Vzc0NhbGxiYWNrIC0gRnVuY3Rpb24gdG8gY2FsbCB3aXRoIHJlc3VsdHNcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGVycm9yQ2FsbGJhY2sgLSBGdW5jdGlvbiB0byBjYWxsIHdpdGggZXJyb3JzXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW58dm9pZH0gW2ZvcmNlRmV0Y2hdIC0gQnlwYXNzZXMgdGhlIGNhY2hlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW58dm9pZH0gW2luY2x1ZGVQcmV2aWV3XSAtIE9wdGlvbmFsbHkgaW5jbHVkZSBwcmV2aWV3IGZpZWxkc1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufHZvaWR9IFtpbmNsdWRlUHJldmlld1NpZGViYXJdIC0gT3B0aW9uYWxseSBpbmNsdWRlIHByZXZpZXcgc2lkZWJhciBmaWVsZHNcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHNlYXJjaChcclxuICAgICAgICBpZDogc3RyaW5nLFxyXG4gICAgICAgIHF1ZXJ5OiBzdHJpbmcsXHJcbiAgICAgICAgc29ydEJ5OiBTb3J0QnksXHJcbiAgICAgICAgc29ydERpcmVjdGlvbjogU29ydERpcmVjdGlvbixcclxuICAgICAgICBzdWNjZXNzQ2FsbGJhY2s6IEZ1bmN0aW9uLFxyXG4gICAgICAgIGVycm9yQ2FsbGJhY2s6IEZ1bmN0aW9uLFxyXG4gICAgICAgIGZvcmNlRmV0Y2g6IGJvb2xlYW4gPSBmYWxzZSxcclxuICAgICAgICBpbmNsdWRlUHJldmlld0ZpZWxkczogYm9vbGVhbiA9IGZhbHNlLFxyXG4gICAgICAgIGluY2x1ZGVQcmV2aWV3U2lkZWJhckZpZWxkczogYm9vbGVhbiA9IGZhbHNlXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc0Rlc3Ryb3llZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNhdmUgcmVmZXJlbmNlc1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gMDtcclxuICAgICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMua2V5ID0gdGhpcy5nZXRDYWNoZUtleShpZCwgdGhpcy5nZXRFbmNvZGVkUXVlcnkodGhpcy5xdWVyeSkpO1xyXG4gICAgICAgIHRoaXMuc3VjY2Vzc0NhbGxiYWNrID0gc3VjY2Vzc0NhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuZXJyb3JDYWxsYmFjayA9IGVycm9yQ2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5zb3J0QnkgPSBzb3J0Qnk7XHJcbiAgICAgICAgdGhpcy5zb3J0RGlyZWN0aW9uID0gc29ydERpcmVjdGlvbjtcclxuICAgICAgICB0aGlzLmluY2x1ZGVQcmV2aWV3RmllbGRzID0gaW5jbHVkZVByZXZpZXdGaWVsZHM7XHJcbiAgICAgICAgdGhpcy5pbmNsdWRlUHJldmlld1NpZGViYXJGaWVsZHMgPSBpbmNsdWRlUHJldmlld1NpZGViYXJGaWVsZHM7XHJcblxyXG4gICAgICAgIC8vIENsZWFyIHRoZSBjYWNoZSBpZiBuZWVkZWRcclxuICAgICAgICBpZiAoZm9yY2VGZXRjaCkge1xyXG4gICAgICAgICAgICB0aGlzLmdldENhY2hlKCkudW5zZXQodGhpcy5rZXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBDYWNoZSB2YWx1ZSBpZiBpdCBleGlzdHNcclxuICAgICAgICBpZiAodGhpcy5pc0xvYWRlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmluaXNoKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1ha2UgdGhlIFhIUiByZXF1ZXN0XHJcbiAgICAgICAgdGhpcy5zZWFyY2hSZXF1ZXN0KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlYXJjaDtcclxuIl19