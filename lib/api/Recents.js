var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box recents api
 * @author Box
 */

import Base from './Base';
import FileAPI from './File';
import FolderAPI from './Folder';
import WebLinkAPI from '../api/WebLink';
import flatten from '../util/flatten';
import sort from '../util/sorter';
import getBadItemError from '../util/error';
import getFields from '../util/fields';
import { DEFAULT_ROOT, CACHE_PREFIX_RECENTS, SORT_DESC, FIELD_INTERACTED_AT, X_REP_HINTS } from '../constants';

var Recents = function (_Base) {
    _inherits(Recents, _Base);

    function Recents() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Recents);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Recents.__proto__ || Object.getPrototypeOf(Recents)).call.apply(_ref, [this].concat(args))), _this), _this.recentsSuccessHandler = function (response) {
            if (_this.isDestroyed()) {
                return;
            }

            var entries = response.entries,
                _response$order = response.order,
                by = _response$order.by,
                direction = _response$order.direction;

            var items = [];

            entries.forEach(function (_ref2) {
                var item = _ref2.item,
                    interacted_at = _ref2.interacted_at;
                var path_collection = item.path_collection;

                var shouldInclude = _this.id === DEFAULT_ROOT || !!path_collection && path_collection.entries.findIndex(function (crumb) {
                    return crumb.id === _this.id;
                }) !== -1;
                if (shouldInclude) {
                    items.push(Object.assign(item, { interacted_at: interacted_at }));
                }
            });

            var flattenedItems = flatten(items, new FolderAPI(_this.options), new FileAPI(_this.options), new WebLinkAPI(_this.options));

            _this.getCache().set(_this.key, {
                item_collection: {
                    isLoaded: true,
                    entries: flattenedItems,
                    order: [{
                        by: by,
                        direction: direction
                    }]
                }
            });
            _this.finish();
        }, _this.recentsErrorHandler = function (error) {
            if (_this.isDestroyed()) {
                return;
            }
            _this.errorCallback(error);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
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
     * @property {string}
     */


    /**
     * @property {string}
     */


    /**
     * @property {boolean}
     */


    /**
     * @property {boolean}
     */


    _createClass(Recents, [{
        key: 'getCacheKey',


        /**
         * Creates a key for the cache
         *
         * @param {string} id folder id
         * @return {string} key
         */
        value: function getCacheKey(id) {
            return '' + CACHE_PREFIX_RECENTS + id;
        }

        /**
         * URL for recents api
         *
         * @return {string} base url for files
         */

    }, {
        key: 'getUrl',
        value: function getUrl() {
            return this.getBaseUrl() + '/recent_items';
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
            var recents = cache.get(this.key);
            var sortedRecents = sort(recents, this.sortBy, this.sortDirection, cache);
            var item_collection = sortedRecents.item_collection;

            if (!item_collection) {
                throw getBadItemError();
            }

            var entries = item_collection.entries;

            if (!Array.isArray(entries)) {
                throw getBadItemError();
            }

            var collection = {
                percentLoaded: 100,
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
         * Handles the folder Recents response
         *
         * @param {Object} response
         * @return {void}
         */


        /**
         * Handles the Recents error
         *
         * @param {Error} error fetch error
         * @return {void}
         */

    }, {
        key: 'recentsRequest',


        /**
         * Does the network request
         *
         * @return {Promise}
         */
        value: function recentsRequest() {
            if (this.isDestroyed()) {
                return Promise.reject();
            }
            return this.xhr.get({
                url: this.getUrl(),
                params: {
                    fields: getFields(this.includePreviewFields, this.includePreviewSidebarFields)
                },
                headers: { 'X-Rep-Hints': X_REP_HINTS }
            }).then(this.recentsSuccessHandler).catch(this.recentsErrorHandler);
        }

        /**
         * Gets recent files
         *
         * @param {string} id - parent folder id
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
        key: 'recents',
        value: function recents(id, sortBy, sortDirection, successCallback, errorCallback) {
            var forceFetch = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
            var includePreviewFields = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
            var includePreviewSidebarFields = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

            if (this.isDestroyed()) {
                return;
            }

            // Save references
            this.id = id;
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;
            this.sortBy = sortBy;
            this.sortDirection = sortDirection;
            this.includePreviewFields = includePreviewFields;
            this.includePreviewSidebarFields = includePreviewSidebarFields;

            var cache = this.getCache();
            this.key = this.getCacheKey(this.id);

            // Clear the cache if needed
            if (forceFetch) {
                cache.unset(this.key);
            }

            // Return the Cache value if it exists
            if (cache.has(this.key)) {
                this.finish();
                return;
            }

            // Recents should always be sorted with date desc
            // on non cached loads, aka newest to oldest
            this.sortBy = FIELD_INTERACTED_AT;
            this.sortDirection = SORT_DESC;

            // Make the XHR request
            this.recentsRequest();
        }
    }]);

    return Recents;
}(Base);

export default Recents;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlY2VudHMuanMiXSwibmFtZXMiOlsiQmFzZSIsIkZpbGVBUEkiLCJGb2xkZXJBUEkiLCJXZWJMaW5rQVBJIiwiZmxhdHRlbiIsInNvcnQiLCJnZXRCYWRJdGVtRXJyb3IiLCJnZXRGaWVsZHMiLCJERUZBVUxUX1JPT1QiLCJDQUNIRV9QUkVGSVhfUkVDRU5UUyIsIlNPUlRfREVTQyIsIkZJRUxEX0lOVEVSQUNURURfQVQiLCJYX1JFUF9ISU5UUyIsIlJlY2VudHMiLCJyZWNlbnRzU3VjY2Vzc0hhbmRsZXIiLCJyZXNwb25zZSIsImlzRGVzdHJveWVkIiwiZW50cmllcyIsIm9yZGVyIiwiYnkiLCJkaXJlY3Rpb24iLCJpdGVtcyIsImZvckVhY2giLCJpdGVtIiwiaW50ZXJhY3RlZF9hdCIsInBhdGhfY29sbGVjdGlvbiIsInNob3VsZEluY2x1ZGUiLCJpZCIsImZpbmRJbmRleCIsImNydW1iIiwicHVzaCIsIk9iamVjdCIsImFzc2lnbiIsImZsYXR0ZW5lZEl0ZW1zIiwib3B0aW9ucyIsImdldENhY2hlIiwic2V0Iiwia2V5IiwiaXRlbV9jb2xsZWN0aW9uIiwiaXNMb2FkZWQiLCJmaW5pc2giLCJyZWNlbnRzRXJyb3JIYW5kbGVyIiwiZXJyb3IiLCJlcnJvckNhbGxiYWNrIiwiZ2V0QmFzZVVybCIsImNhY2hlIiwicmVjZW50cyIsImdldCIsInNvcnRlZFJlY2VudHMiLCJzb3J0QnkiLCJzb3J0RGlyZWN0aW9uIiwiQXJyYXkiLCJpc0FycmF5IiwiY29sbGVjdGlvbiIsInBlcmNlbnRMb2FkZWQiLCJtYXAiLCJzdWNjZXNzQ2FsbGJhY2siLCJQcm9taXNlIiwicmVqZWN0IiwieGhyIiwidXJsIiwiZ2V0VXJsIiwicGFyYW1zIiwiZmllbGRzIiwiaW5jbHVkZVByZXZpZXdGaWVsZHMiLCJpbmNsdWRlUHJldmlld1NpZGViYXJGaWVsZHMiLCJoZWFkZXJzIiwidGhlbiIsImNhdGNoIiwiZm9yY2VGZXRjaCIsImdldENhY2hlS2V5IiwidW5zZXQiLCJoYXMi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aUJ6RSxJOztBQXlPdEIsZUFBZWEsT0FBZiIsImZpbGUiOiJSZWNlbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEhlbHBlciBmb3IgdGhlIGJveCByZWNlbnRzIGFwaVxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBGaWxlQVBJIGZyb20gJy4vRmlsZSc7XHJcbmltcG9ydCBGb2xkZXJBUEkgZnJvbSAnLi9Gb2xkZXInO1xyXG5pbXBvcnQgV2ViTGlua0FQSSBmcm9tICcuLi9hcGkvV2ViTGluayc7XHJcbmltcG9ydCBmbGF0dGVuIGZyb20gJy4uL3V0aWwvZmxhdHRlbic7XHJcbmltcG9ydCBzb3J0IGZyb20gJy4uL3V0aWwvc29ydGVyJztcclxuaW1wb3J0IGdldEJhZEl0ZW1FcnJvciBmcm9tICcuLi91dGlsL2Vycm9yJztcclxuaW1wb3J0IGdldEZpZWxkcyBmcm9tICcuLi91dGlsL2ZpZWxkcyc7XHJcbmltcG9ydCB7IERFRkFVTFRfUk9PVCwgQ0FDSEVfUFJFRklYX1JFQ0VOVFMsIFNPUlRfREVTQywgRklFTERfSU5URVJBQ1RFRF9BVCwgWF9SRVBfSElOVFMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgdHlwZSBDYWNoZSBmcm9tICcuLi91dGlsL0NhY2hlJztcclxuaW1wb3J0IHR5cGUge1xyXG4gICAgQ3J1bWIsXHJcbiAgICBCb3hJdGVtLFxyXG4gICAgUmVjZW50LFxyXG4gICAgUmVjZW50Q29sbGVjdGlvbixcclxuICAgIENvbGxlY3Rpb24sXHJcbiAgICBTb3J0QnksXHJcbiAgICBTb3J0RGlyZWN0aW9uLFxyXG4gICAgRmxhdHRlbmVkQm94SXRlbSxcclxuICAgIEZsYXR0ZW5lZEJveEl0ZW1Db2xsZWN0aW9uXHJcbn0gZnJvbSAnLi4vZmxvd1R5cGVzJztcclxuXHJcbmNsYXNzIFJlY2VudHMgZXh0ZW5kcyBCYXNlIHtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGtleTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGlkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufVxyXG4gICAgICovXHJcbiAgICBzdWNjZXNzQ2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn1cclxuICAgICAqL1xyXG4gICAgZXJyb3JDYWxsYmFjazogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgc29ydEJ5OiBTb3J0Qnk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgc29ydERpcmVjdGlvbjogU29ydERpcmVjdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaW5jbHVkZVByZXZpZXdGaWVsZHM6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGluY2x1ZGVQcmV2aWV3U2lkZWJhckZpZWxkczogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBrZXkgZm9yIHRoZSBjYWNoZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBmb2xkZXIgaWRcclxuICAgICAqIEByZXR1cm4ge3N0cmluZ30ga2V5XHJcbiAgICAgKi9cclxuICAgIGdldENhY2hlS2V5KGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgJHtDQUNIRV9QUkVGSVhfUkVDRU5UU30ke2lkfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVUkwgZm9yIHJlY2VudHMgYXBpXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBiYXNlIHVybCBmb3IgZmlsZXNcclxuICAgICAqL1xyXG4gICAgZ2V0VXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0QmFzZVVybCgpfS9yZWNlbnRfaXRlbXNgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU29ydHMgYW5kIHJldHVybnMgdGhlIHJlc3VsdHNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmaW5pc2goKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEZXN0cm95ZWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjYWNoZTogQ2FjaGUgPSB0aGlzLmdldENhY2hlKCk7XHJcbiAgICAgICAgY29uc3QgcmVjZW50czogRmxhdHRlbmVkQm94SXRlbSA9IGNhY2hlLmdldCh0aGlzLmtleSk7XHJcbiAgICAgICAgY29uc3Qgc29ydGVkUmVjZW50czogRmxhdHRlbmVkQm94SXRlbSA9IHNvcnQocmVjZW50cywgdGhpcy5zb3J0QnksIHRoaXMuc29ydERpcmVjdGlvbiwgY2FjaGUpO1xyXG4gICAgICAgIGNvbnN0IHsgaXRlbV9jb2xsZWN0aW9uIH06IEZsYXR0ZW5lZEJveEl0ZW0gPSBzb3J0ZWRSZWNlbnRzO1xyXG4gICAgICAgIGlmICghaXRlbV9jb2xsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRocm93IGdldEJhZEl0ZW1FcnJvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgeyBlbnRyaWVzIH06IEZsYXR0ZW5lZEJveEl0ZW1Db2xsZWN0aW9uID0gaXRlbV9jb2xsZWN0aW9uO1xyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShlbnRyaWVzKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBnZXRCYWRJdGVtRXJyb3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbGxlY3Rpb246IENvbGxlY3Rpb24gPSB7XHJcbiAgICAgICAgICAgIHBlcmNlbnRMb2FkZWQ6IDEwMCxcclxuICAgICAgICAgICAgaWQ6IHRoaXMuaWQsXHJcbiAgICAgICAgICAgIHNvcnRCeTogdGhpcy5zb3J0QnksXHJcbiAgICAgICAgICAgIHNvcnREaXJlY3Rpb246IHRoaXMuc29ydERpcmVjdGlvbixcclxuICAgICAgICAgICAgaXRlbXM6IGVudHJpZXMubWFwKChrZXk6IHN0cmluZykgPT4gY2FjaGUuZ2V0KGtleSkpXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnN1Y2Nlc3NDYWxsYmFjayhjb2xsZWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIGZvbGRlciBSZWNlbnRzIHJlc3BvbnNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICByZWNlbnRzU3VjY2Vzc0hhbmRsZXIgPSAocmVzcG9uc2U6IFJlY2VudENvbGxlY3Rpb24pOiB2b2lkID0+IHtcclxuICAgICAgICBpZiAodGhpcy5pc0Rlc3Ryb3llZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHsgZW50cmllcywgb3JkZXI6IHsgYnksIGRpcmVjdGlvbiB9IH06IFJlY2VudENvbGxlY3Rpb24gPSByZXNwb25zZTtcclxuICAgICAgICBjb25zdCBpdGVtczogQm94SXRlbVtdID0gW107XHJcblxyXG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCgoeyBpdGVtLCBpbnRlcmFjdGVkX2F0IH06IFJlY2VudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB7IHBhdGhfY29sbGVjdGlvbiB9OiBCb3hJdGVtID0gaXRlbTtcclxuICAgICAgICAgICAgY29uc3Qgc2hvdWxkSW5jbHVkZSA9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlkID09PSBERUZBVUxUX1JPT1QgfHxcclxuICAgICAgICAgICAgICAgICghIXBhdGhfY29sbGVjdGlvbiAmJiBwYXRoX2NvbGxlY3Rpb24uZW50cmllcy5maW5kSW5kZXgoKGNydW1iOiBDcnVtYikgPT4gY3J1bWIuaWQgPT09IHRoaXMuaWQpICE9PSAtMSk7XHJcbiAgICAgICAgICAgIGlmIChzaG91bGRJbmNsdWRlKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKE9iamVjdC5hc3NpZ24oaXRlbSwgeyBpbnRlcmFjdGVkX2F0IH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBmbGF0dGVuZWRJdGVtczogc3RyaW5nW10gPSBmbGF0dGVuKFxyXG4gICAgICAgICAgICBpdGVtcyxcclxuICAgICAgICAgICAgbmV3IEZvbGRlckFQSSh0aGlzLm9wdGlvbnMpLFxyXG4gICAgICAgICAgICBuZXcgRmlsZUFQSSh0aGlzLm9wdGlvbnMpLFxyXG4gICAgICAgICAgICBuZXcgV2ViTGlua0FQSSh0aGlzLm9wdGlvbnMpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRDYWNoZSgpLnNldCh0aGlzLmtleSwge1xyXG4gICAgICAgICAgICBpdGVtX2NvbGxlY3Rpb246IHtcclxuICAgICAgICAgICAgICAgIGlzTG9hZGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW50cmllczogZmxhdHRlbmVkSXRlbXMsXHJcbiAgICAgICAgICAgICAgICBvcmRlcjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZmluaXNoKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgUmVjZW50cyBlcnJvclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIGZldGNoIGVycm9yXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICByZWNlbnRzRXJyb3JIYW5kbGVyID0gKGVycm9yOiBFcnJvcik6IHZvaWQgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVzdHJveWVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVycm9yQ2FsbGJhY2soZXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERvZXMgdGhlIG5ldHdvcmsgcmVxdWVzdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XHJcbiAgICAgKi9cclxuICAgIHJlY2VudHNSZXF1ZXN0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVzdHJveWVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnhoclxyXG4gICAgICAgICAgICAuZ2V0KHtcclxuICAgICAgICAgICAgICAgIHVybDogdGhpcy5nZXRVcmwoKSxcclxuICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkczogZ2V0RmllbGRzKHRoaXMuaW5jbHVkZVByZXZpZXdGaWVsZHMsIHRoaXMuaW5jbHVkZVByZXZpZXdTaWRlYmFyRmllbGRzKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVwLUhpbnRzJzogWF9SRVBfSElOVFMgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLnJlY2VudHNTdWNjZXNzSGFuZGxlcilcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMucmVjZW50c0Vycm9ySGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHJlY2VudCBmaWxlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHBhcmVudCBmb2xkZXIgaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3J0QnkgLSBzb3J0IGJ5IGZpZWxkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc29ydERpcmVjdGlvbiAtIHNvcnQgZGlyZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdWNjZXNzQ2FsbGJhY2sgLSBGdW5jdGlvbiB0byBjYWxsIHdpdGggcmVzdWx0c1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZXJyb3JDYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGNhbGwgd2l0aCBlcnJvcnNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnx2b2lkfSBbZm9yY2VGZXRjaF0gLSBCeXBhc3NlcyB0aGUgY2FjaGVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnx2b2lkfSBbaW5jbHVkZVByZXZpZXddIC0gT3B0aW9uYWxseSBpbmNsdWRlIHByZXZpZXcgZmllbGRzXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW58dm9pZH0gW2luY2x1ZGVQcmV2aWV3U2lkZWJhcl0gLSBPcHRpb25hbGx5IGluY2x1ZGUgcHJldmlldyBzaWRlYmFyIGZpZWxkc1xyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgcmVjZW50cyhcclxuICAgICAgICBpZDogc3RyaW5nLFxyXG4gICAgICAgIHNvcnRCeTogU29ydEJ5LFxyXG4gICAgICAgIHNvcnREaXJlY3Rpb246IFNvcnREaXJlY3Rpb24sXHJcbiAgICAgICAgc3VjY2Vzc0NhbGxiYWNrOiBGdW5jdGlvbixcclxuICAgICAgICBlcnJvckNhbGxiYWNrOiBGdW5jdGlvbixcclxuICAgICAgICBmb3JjZUZldGNoOiBib29sZWFuID0gZmFsc2UsXHJcbiAgICAgICAgaW5jbHVkZVByZXZpZXdGaWVsZHM6IGJvb2xlYW4gPSBmYWxzZSxcclxuICAgICAgICBpbmNsdWRlUHJldmlld1NpZGViYXJGaWVsZHM6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEZXN0cm95ZWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTYXZlIHJlZmVyZW5jZXNcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5zdWNjZXNzQ2FsbGJhY2sgPSBzdWNjZXNzQ2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5lcnJvckNhbGxiYWNrID0gZXJyb3JDYWxsYmFjaztcclxuICAgICAgICB0aGlzLnNvcnRCeSA9IHNvcnRCeTtcclxuICAgICAgICB0aGlzLnNvcnREaXJlY3Rpb24gPSBzb3J0RGlyZWN0aW9uO1xyXG4gICAgICAgIHRoaXMuaW5jbHVkZVByZXZpZXdGaWVsZHMgPSBpbmNsdWRlUHJldmlld0ZpZWxkcztcclxuICAgICAgICB0aGlzLmluY2x1ZGVQcmV2aWV3U2lkZWJhckZpZWxkcyA9IGluY2x1ZGVQcmV2aWV3U2lkZWJhckZpZWxkcztcclxuXHJcbiAgICAgICAgY29uc3QgY2FjaGU6IENhY2hlID0gdGhpcy5nZXRDYWNoZSgpO1xyXG4gICAgICAgIHRoaXMua2V5ID0gdGhpcy5nZXRDYWNoZUtleSh0aGlzLmlkKTtcclxuXHJcbiAgICAgICAgLy8gQ2xlYXIgdGhlIGNhY2hlIGlmIG5lZWRlZFxyXG4gICAgICAgIGlmIChmb3JjZUZldGNoKSB7XHJcbiAgICAgICAgICAgIGNhY2hlLnVuc2V0KHRoaXMua2V5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgQ2FjaGUgdmFsdWUgaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgaWYgKGNhY2hlLmhhcyh0aGlzLmtleSkpIHtcclxuICAgICAgICAgICAgdGhpcy5maW5pc2goKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVjZW50cyBzaG91bGQgYWx3YXlzIGJlIHNvcnRlZCB3aXRoIGRhdGUgZGVzY1xyXG4gICAgICAgIC8vIG9uIG5vbiBjYWNoZWQgbG9hZHMsIGFrYSBuZXdlc3QgdG8gb2xkZXN0XHJcbiAgICAgICAgdGhpcy5zb3J0QnkgPSBGSUVMRF9JTlRFUkFDVEVEX0FUO1xyXG4gICAgICAgIHRoaXMuc29ydERpcmVjdGlvbiA9IFNPUlRfREVTQztcclxuXHJcbiAgICAgICAgLy8gTWFrZSB0aGUgWEhSIHJlcXVlc3RcclxuICAgICAgICB0aGlzLnJlY2VudHNSZXF1ZXN0KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlY2VudHM7XHJcbiJdfQ==