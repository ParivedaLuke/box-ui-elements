var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box folder api
 * @author Box
 */

import noop from 'lodash.noop';
import Item from './Item';
import flatten from '../util/flatten';
import sort from '../util/sorter';
import FileAPI from '../api/File';
import WebLinkAPI from '../api/WebLink';
import getFields from '../util/fields';
import { CACHE_PREFIX_FOLDER, X_REP_HINTS } from '../constants';
import getBadItemError from '../util/error';


var LIMIT_ITEM_FETCH = 1000;

var Folder = function (_Item) {
    _inherits(Folder, _Item);

    function Folder() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Folder);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Folder.__proto__ || Object.getPrototypeOf(Folder)).call.apply(_ref, [this].concat(args))), _this), _this.folderSuccessHandler = function (response) {
            if (_this.isDestroyed()) {
                return;
            }

            var item_collection = response.item_collection;

            if (!item_collection) {
                throw getBadItemError();
            }

            var entries = item_collection.entries,
                total_count = item_collection.total_count,
                limit = item_collection.limit,
                offset = item_collection.offset;

            if (!Array.isArray(entries) || typeof total_count !== 'number' || typeof limit !== 'number' || typeof offset !== 'number') {
                throw getBadItemError();
            }

            var flattened = flatten(entries, new Folder(_this.options), new FileAPI(_this.options), new WebLinkAPI(_this.options));
            _this.itemCache = (_this.itemCache || []).concat(flattened);

            // Total count may be more than the actual number of entries, so don't rely
            // on it on its own. Good for calculating percentatge, but not good for
            // figuring our when the collection is done loading.
            var isLoaded = offset + limit >= total_count;

            _this.getCache().set(_this.key, Object.assign({}, response, {
                item_collection: Object.assign({}, item_collection, {
                    isLoaded: isLoaded,
                    entries: _this.itemCache
                })
            }));

            if (!isLoaded) {
                _this.offset += limit;
                _this.folderRequest();
            }

            _this.finish();
        }, _this.folderErrorHandler = function (error) {
            if (_this.isDestroyed()) {
                return;
            }
            _this.errorCallback(error);
        }, _this.createSuccessHandler = function (item) {
            var childId = item.id;

            if (_this.isDestroyed() || !childId) {
                return;
            }
            var childKey = _this.getCacheKey(childId);
            var cache = _this.getCache();
            var parent = cache.get(_this.key);

            var item_collection = parent.item_collection;

            if (!item_collection) {
                throw getBadItemError();
            }

            var total_count = item_collection.total_count,
                entries = item_collection.entries;

            if (!Array.isArray(entries) || typeof total_count !== 'number') {
                throw getBadItemError();
            }

            cache.set(childKey, item);
            item_collection.entries = [childKey].concat(entries);
            item_collection.total_count = total_count + 1;
            _this.successCallback(item);
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
     * @property {Array}
     */


    /**
     * @property {Function}
     */


    /**
     * @property {Function}
     */


    /**
     * @property {boolean}
     */


    /**
     * @property {boolean}
     */


    _createClass(Folder, [{
        key: 'getCacheKey',


        /**
         * Creates a key for the cache
         *
         * @param {string} id folder id
         * @return {string} key
         */
        value: function getCacheKey(id) {
            return '' + CACHE_PREFIX_FOLDER + id;
        }

        /**
         * Base URL for folder api
         *
         * @param {string} [id] optional file id
         * @return {string} base url for files
         */

    }, {
        key: 'getUrl',
        value: function getUrl(id) {
            var suffix = id ? '/' + id : '';
            return this.getBaseUrl() + '/folders' + suffix;
        }

        /**
         * Tells if a folder has its items all loaded
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
            var folder = cache.get(this.key);
            var sortedFolder = sort(folder, this.sortBy, this.sortDirection, cache);

            var id = sortedFolder.id,
                name = sortedFolder.name,
                permissions = sortedFolder.permissions,
                path_collection = sortedFolder.path_collection,
                item_collection = sortedFolder.item_collection;

            if (!item_collection || !path_collection) {
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
                id: id,
                name: name,
                percentLoaded: percentLoaded,
                permissions: permissions,
                boxItem: sortedFolder,
                breadcrumbs: path_collection.entries,
                sortBy: this.sortBy,
                sortDirection: this.sortDirection,
                items: entries.map(function (key) {
                    return cache.get(key);
                })
            };
            this.successCallback(collection);
        }

        /**
         * Handles the folder fetch response
         *
         * @param {Object} response
         * @return {void}
         */


        /**
         * Handles the folder fetch error
         *
         * @param {Error} error fetch error
         * @return {void}
         */

    }, {
        key: 'folderRequest',


        /**
         * Does the network request for fetching a folder
         *
         * @return {void}
         */
        value: function folderRequest() {
            if (this.isDestroyed()) {
                return Promise.reject();
            }

            return this.xhr.get({
                url: this.getUrl(this.id),
                params: {
                    offset: this.offset,
                    limit: LIMIT_ITEM_FETCH,
                    fields: getFields(this.includePreviewFields, this.includePreviewSidebarFields)
                },
                headers: { 'X-Rep-Hints': X_REP_HINTS }
            }).then(this.folderSuccessHandler).catch(this.folderErrorHandler);
        }

        /**
         * Gets a box folder and its items
         *
         * @param {string} id - Folder id
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
        key: 'folder',
        value: function folder(id, sortBy, sortDirection, successCallback, errorCallback) {
            var forceFetch = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
            var includePreviewFields = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
            var includePreviewSidebarFields = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

            if (this.isDestroyed()) {
                return;
            }

            // Save references
            this.offset = 0;
            this.id = id;
            this.key = this.getCacheKey(id);
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;
            this.sortBy = sortBy;
            this.sortDirection = sortDirection;
            this.includePreviewFields = includePreviewFields;
            this.includePreviewSidebarFields = includePreviewSidebarFields; // implies preview

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
            this.folderRequest();
        }

        /**
         * API to rename an Item
         *
         * @param {string} id - parent folder id
         * @param {string} name - new folder name
         * @param {Function} successCallback - success callback
         * @param {Function} errorCallback - error callback
         * @return {void}
         */

    }, {
        key: 'folderCreateRequest',


        /**
         * Does the network request for fetching a folder
         *
         * @return {void}
         */
        value: function folderCreateRequest(name) {
            if (this.isDestroyed()) {
                return Promise.reject();
            }

            var url = this.getUrl() + '?fields=' + getFields();
            return this.xhr.post({
                url: url,
                data: {
                    name: name,
                    parent: {
                        id: this.id
                    }
                }
            }).then(this.createSuccessHandler).catch(this.folderErrorHandler);
        }

        /**
         * API to rename an Item
         *
         * @param {string} id - parent folder id
         * @param {string} name - new folder name
         * @param {Function} successCallback - success callback
         * @param {Function} errorCallback - error callback
         * @return {void}
         */

    }, {
        key: 'create',
        value: function create(id, name, successCallback) {
            var errorCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;

            if (this.isDestroyed()) {
                return;
            }

            this.id = id;
            this.key = this.getCacheKey(id);
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;
            this.folderCreateRequest(name);
        }
    }]);

    return Folder;
}(Item);

export default Folder;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZvbGRlci5qcyJdLCJuYW1lcyI6WyJub29wIiwiSXRlbSIsImZsYXR0ZW4iLCJzb3J0IiwiRmlsZUFQSSIsIldlYkxpbmtBUEkiLCJnZXRGaWVsZHMiLCJDQUNIRV9QUkVGSVhfRk9MREVSIiwiWF9SRVBfSElOVFMiLCJnZXRCYWRJdGVtRXJyb3IiLCJMSU1JVF9JVEVNX0ZFVENIIiwiRm9sZGVyIiwiZm9sZGVyU3VjY2Vzc0hhbmRsZXIiLCJyZXNwb25zZSIsImlzRGVzdHJveWVkIiwiaXRlbV9jb2xsZWN0aW9uIiwiZW50cmllcyIsInRvdGFsX2NvdW50IiwibGltaXQiLCJvZmZzZXQiLCJBcnJheSIsImlzQXJyYXkiLCJmbGF0dGVuZWQiLCJvcHRpb25zIiwiaXRlbUNhY2hlIiwiY29uY2F0IiwiaXNMb2FkZWQiLCJnZXRDYWNoZSIsInNldCIsImtleSIsIk9iamVjdCIsImFzc2lnbiIsImZvbGRlclJlcXVlc3QiLCJmaW5pc2giLCJmb2xkZXJFcnJvckhhbmRsZXIiLCJlcnJvciIsImVycm9yQ2FsbGJhY2siLCJjcmVhdGVTdWNjZXNzSGFuZGxlciIsIml0ZW0iLCJjaGlsZElkIiwiaWQiLCJjaGlsZEtleSIsImdldENhY2hlS2V5IiwiY2FjaGUiLCJwYXJlbnQiLCJnZXQiLCJzdWNjZXNzQ2FsbGJhY2siLCJzdWZmaXgiLCJnZXRCYXNlVXJsIiwiaGFzIiwiZm9sZGVyIiwic29ydGVkRm9sZGVyIiwic29ydEJ5Iiwic29ydERpcmVjdGlvbiIsIm5hbWUiLCJwZXJtaXNzaW9ucyIsInBhdGhfY29sbGVjdGlvbiIsInBlcmNlbnRMb2FkZWQiLCJsZW5ndGgiLCJjb2xsZWN0aW9uIiwiYm94SXRlbSIsImJyZWFkY3J1bWJzIiwiaXRlbXMiLCJtYXAiLCJQcm9taXNlIiwicmVqZWN0IiwieGhyIiwidXJsIiwiZ2V0VXJsIiwicGFyYW1zIiwiZmllbGRzIiwiaW5jbHVkZVByZXZpZXdGaWVsZHMiLCJpbmNsdWRlUHJldmlld1NpZGViYXJGaWVsZHMiLCJoZWFkZXJzIiwidGhlbiIsImNhdGNoIiwiZm9yY2VGZXRjaCIsInVuc2V0IiwicG9zdCIsImRhdGEiLCJmb2xkZXJDcmVhdGVSZXF1ZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7QUFNQSxPQUFPQSxJQUFQLE1BQWlCLGFBQWpCO0FBQ0EsT0FBT0MsSUFBUCxNQUFpQixRQUFqQjtBQUNBLE9BQU9DLE9BQVAsTUFBb0IsaUJBQXBCO0FBQ0EsT0FBT0MsSUFBUCxNQUFpQixnQkFBakI7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLGFBQXBCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixnQkFBdkI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLGdCQUF0QjtBQUNBLFNBQVNDLG1CQUFULEVBQThCQyxXQUE5QixRQUFpRCxjQUFqRDtBQUNBLE9BQU9DLGVBQVAsTUFBNEIsZUFBNUI7OztBQVlBLElBQU1DLG1CQUFtQixJQUF6Qjs7SUFFTUMsTTs7Ozs7Ozs7Ozs7Ozs7MExBd0lGQyxvQixHQUF1QixVQUFDQyxRQUFELEVBQTZCO0FBQ2hELGdCQUFJLE1BQUtDLFdBQUwsRUFBSixFQUF3QjtBQUNwQjtBQUNIOztBQUgrQyxnQkFLeENDLGVBTHdDLEdBS1hGLFFBTFcsQ0FLeENFLGVBTHdDOztBQU1oRCxnQkFBSSxDQUFDQSxlQUFMLEVBQXNCO0FBQ2xCLHNCQUFNTixpQkFBTjtBQUNIOztBQVIrQyxnQkFVeENPLE9BVndDLEdBVW1CRCxlQVZuQixDQVV4Q0MsT0FWd0M7QUFBQSxnQkFVL0JDLFdBVitCLEdBVW1CRixlQVZuQixDQVUvQkUsV0FWK0I7QUFBQSxnQkFVbEJDLEtBVmtCLEdBVW1CSCxlQVZuQixDQVVsQkcsS0FWa0I7QUFBQSxnQkFVWEMsTUFWVyxHQVVtQkosZUFWbkIsQ0FVWEksTUFWVzs7QUFXaEQsZ0JBQ0ksQ0FBQ0MsTUFBTUMsT0FBTixDQUFjTCxPQUFkLENBQUQsSUFDQSxPQUFPQyxXQUFQLEtBQXVCLFFBRHZCLElBRUEsT0FBT0MsS0FBUCxLQUFpQixRQUZqQixJQUdBLE9BQU9DLE1B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RUFBUDtBQUNIOztBQUVELGdCQUFNRSxNQUFTLEtBQUtDLE1BQUwsRUFBVCxnQkFBaUM5RCxXQUF2QztBQUNBLG1CQUFPLEtBQUs0RCxHQUFMLENBQ0ZZLElBREUsQ0FDRztBQUNGWCx3QkFERTtBQUVGWSxzQkFBTTtBQUNGekIsOEJBREU7QUFFRlYsNEJBQVE7QUFDSkosNEJBQUksS0FBS0E7QUFETDtBQUZOO0FBRkosYUFESCxFQVVGa0MsSUFWRSxDQVVHLEtBQUtyQyxvQkFWUixFQVdGc0MsS0FYRSxDQVdJLEtBQUt6QyxrQkFYVCxDQUFQO0FBWUg7O0FBRUQ7Ozs7Ozs7Ozs7OzsrQkFTT00sRSxFQUFZYyxJLEVBQWNSLGUsRUFBaUU7QUFBQSxnQkFBdENWLGFBQXNDLHVFQUFacEMsSUFBWTs7QUFDOUYsZ0JBQUksS0FBS2MsV0FBTCxFQUFKLEVBQXdCO0FBQ3BCO0FBQ0g7O0FBRUQsaUJBQUswQixFQUFMLEdBQVVBLEVBQVY7QUFDQSxpQkFBS1gsR0FBTCxHQUFXLEtBQUthLFdBQUwsQ0FBaUJGLEVBQWpCLENBQVg7QUFDQSxpQkFBS00sZUFBTCxHQUF1QkEsZUFBdkI7QUFDQSxpQkFBS1YsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxpQkFBSzRDLG1CQUFMLENBQXlCMUIsSUFBekI7QUFDSDs7OztFQW5XZ0JyRCxJOztBQXNXckIsZUFBZVUsTUFBZiIsImZpbGUiOiJGb2xkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgSGVscGVyIGZvciB0aGUgYm94IGZvbGRlciBhcGlcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgbm9vcCBmcm9tICdsb2Rhc2gubm9vcCc7XHJcbmltcG9ydCBJdGVtIGZyb20gJy4vSXRlbSc7XHJcbmltcG9ydCBmbGF0dGVuIGZyb20gJy4uL3V0aWwvZmxhdHRlbic7XHJcbmltcG9ydCBzb3J0IGZyb20gJy4uL3V0aWwvc29ydGVyJztcclxuaW1wb3J0IEZpbGVBUEkgZnJvbSAnLi4vYXBpL0ZpbGUnO1xyXG5pbXBvcnQgV2ViTGlua0FQSSBmcm9tICcuLi9hcGkvV2ViTGluayc7XHJcbmltcG9ydCBnZXRGaWVsZHMgZnJvbSAnLi4vdXRpbC9maWVsZHMnO1xyXG5pbXBvcnQgeyBDQUNIRV9QUkVGSVhfRk9MREVSLCBYX1JFUF9ISU5UUyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCBnZXRCYWRJdGVtRXJyb3IgZnJvbSAnLi4vdXRpbC9lcnJvcic7XHJcbmltcG9ydCB0eXBlIENhY2hlIGZyb20gJy4uL3V0aWwvQ2FjaGUnO1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgICBCb3hJdGVtLFxyXG4gICAgQm94SXRlbUNvbGxlY3Rpb24sXHJcbiAgICBGbGF0dGVuZWRCb3hJdGVtLFxyXG4gICAgRmxhdHRlbmVkQm94SXRlbUNvbGxlY3Rpb24sXHJcbiAgICBTb3J0QnksXHJcbiAgICBTb3J0RGlyZWN0aW9uLFxyXG4gICAgQ29sbGVjdGlvblxyXG59IGZyb20gJy4uL2Zsb3dUeXBlcyc7XHJcblxyXG5jb25zdCBMSU1JVF9JVEVNX0ZFVENIID0gMTAwMDtcclxuXHJcbmNsYXNzIEZvbGRlciBleHRlbmRzIEl0ZW0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgb2Zmc2V0OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgaWQ6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBrZXk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBzb3J0Qnk6IFNvcnRCeTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBzb3J0RGlyZWN0aW9uOiBTb3J0RGlyZWN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtBcnJheX1cclxuICAgICAqL1xyXG4gICAgaXRlbUNhY2hlOiBzdHJpbmdbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259XHJcbiAgICAgKi9cclxuICAgIHN1Y2Nlc3NDYWxsYmFjazogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufVxyXG4gICAgICovXHJcbiAgICBlcnJvckNhbGxiYWNrOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaW5jbHVkZVByZXZpZXdGaWVsZHM6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGluY2x1ZGVQcmV2aWV3U2lkZWJhckZpZWxkczogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBrZXkgZm9yIHRoZSBjYWNoZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBmb2xkZXIgaWRcclxuICAgICAqIEByZXR1cm4ge3N0cmluZ30ga2V5XHJcbiAgICAgKi9cclxuICAgIGdldENhY2hlS2V5KGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgJHtDQUNIRV9QUkVGSVhfRk9MREVSfSR7aWR9YDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJhc2UgVVJMIGZvciBmb2xkZXIgYXBpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtpZF0gb3B0aW9uYWwgZmlsZSBpZFxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBiYXNlIHVybCBmb3IgZmlsZXNcclxuICAgICAqL1xyXG4gICAgZ2V0VXJsKGlkPzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBzdWZmaXg6IHN0cmluZyA9IGlkID8gYC8ke2lkfWAgOiAnJztcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRCYXNlVXJsKCl9L2ZvbGRlcnMke3N1ZmZpeH1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVsbHMgaWYgYSBmb2xkZXIgaGFzIGl0cyBpdGVtcyBhbGwgbG9hZGVkXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gaWYgaXRlbXMgYXJlIGxvYWRlZFxyXG4gICAgICovXHJcbiAgICBpc0xvYWRlZCgpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBjYWNoZTogQ2FjaGUgPSB0aGlzLmdldENhY2hlKCk7XHJcbiAgICAgICAgaWYgKCFjYWNoZS5oYXModGhpcy5rZXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgeyBpdGVtX2NvbGxlY3Rpb24gPSB7fSB9OiBGbGF0dGVuZWRCb3hJdGVtID0gY2FjaGUuZ2V0KHRoaXMua2V5KTtcclxuICAgICAgICByZXR1cm4gISFpdGVtX2NvbGxlY3Rpb24uaXNMb2FkZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTb3J0cyBhbmQgcmV0dXJucyB0aGUgcmVzdWx0c1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZpbmlzaCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc0Rlc3Ryb3llZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNhY2hlOiBDYWNoZSA9IHRoaXMuZ2V0Q2FjaGUoKTtcclxuICAgICAgICBjb25zdCBmb2xkZXI6IEZsYXR0ZW5lZEJveEl0ZW0gPSBjYWNoZS5nZXQodGhpcy5rZXkpO1xyXG4gICAgICAgIGNvbnN0IHNvcnRlZEZvbGRlcjogRmxhdHRlbmVkQm94SXRlbSA9IHNvcnQoZm9sZGVyLCB0aGlzLnNvcnRCeSwgdGhpcy5zb3J0RGlyZWN0aW9uLCBjYWNoZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgaWQsIG5hbWUsIHBlcm1pc3Npb25zLCBwYXRoX2NvbGxlY3Rpb24sIGl0ZW1fY29sbGVjdGlvbiB9OiBGbGF0dGVuZWRCb3hJdGVtID0gc29ydGVkRm9sZGVyO1xyXG4gICAgICAgIGlmICghaXRlbV9jb2xsZWN0aW9uIHx8ICFwYXRoX2NvbGxlY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhyb3cgZ2V0QmFkSXRlbUVycm9yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IGVudHJpZXMsIHRvdGFsX2NvdW50IH06IEZsYXR0ZW5lZEJveEl0ZW1Db2xsZWN0aW9uID0gaXRlbV9jb2xsZWN0aW9uO1xyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShlbnRyaWVzKSB8fCB0eXBlb2YgdG90YWxfY291bnQgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHRocm93IGdldEJhZEl0ZW1FcnJvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVG90YWwgY291bnQgbWF5IGJlIG1vcmUgdGhhbiB0aGUgYWN0dWFsIG51bWJlciBvZiBlbnRyaWVzLCBzbyBkb24ndCByZWx5XHJcbiAgICAgICAgLy8gb24gaXQgb24gaXRzIG93bi4gR29vZCBmb3IgY2FsY3VsYXRpbmcgcGVyY2VudGF0Z2UsIGJ1dCBub3QgZ29vZCBmb3JcclxuICAgICAgICAvLyBmaWd1cmluZyBvdXIgd2hlbiB0aGUgY29sbGVjdGlvbiBpcyBkb25lIGxvYWRpbmcuXHJcbiAgICAgICAgY29uc3QgcGVyY2VudExvYWRlZDogbnVtYmVyID1cclxuICAgICAgICAgICAgISFpdGVtX2NvbGxlY3Rpb24uaXNMb2FkZWQgfHwgdG90YWxfY291bnQgPT09IDAgPyAxMDAgOiBlbnRyaWVzLmxlbmd0aCAqIDEwMCAvIHRvdGFsX2NvdW50O1xyXG5cclxuICAgICAgICBjb25zdCBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uID0ge1xyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgcGVyY2VudExvYWRlZCxcclxuICAgICAgICAgICAgcGVybWlzc2lvbnMsXHJcbiAgICAgICAgICAgIGJveEl0ZW06IHNvcnRlZEZvbGRlcixcclxuICAgICAgICAgICAgYnJlYWRjcnVtYnM6IHBhdGhfY29sbGVjdGlvbi5lbnRyaWVzLFxyXG4gICAgICAgICAgICBzb3J0Qnk6IHRoaXMuc29ydEJ5LFxyXG4gICAgICAgICAgICBzb3J0RGlyZWN0aW9uOiB0aGlzLnNvcnREaXJlY3Rpb24sXHJcbiAgICAgICAgICAgIGl0ZW1zOiBlbnRyaWVzLm1hcCgoa2V5OiBzdHJpbmcpID0+IGNhY2hlLmdldChrZXkpKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zdWNjZXNzQ2FsbGJhY2soY29sbGVjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBmb2xkZXIgZmV0Y2ggcmVzcG9uc2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZvbGRlclN1Y2Nlc3NIYW5kbGVyID0gKHJlc3BvbnNlOiBCb3hJdGVtKTogdm9pZCA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEZXN0cm95ZWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IGl0ZW1fY29sbGVjdGlvbiB9OiBCb3hJdGVtID0gcmVzcG9uc2U7XHJcbiAgICAgICAgaWYgKCFpdGVtX2NvbGxlY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhyb3cgZ2V0QmFkSXRlbUVycm9yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IGVudHJpZXMsIHRvdGFsX2NvdW50LCBsaW1pdCwgb2Zmc2V0IH06IEJveEl0ZW1Db2xsZWN0aW9uID0gaXRlbV9jb2xsZWN0aW9uO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgIUFycmF5LmlzQXJyYXkoZW50cmllcykgfHxcclxuICAgICAgICAgICAgdHlwZW9mIHRvdGFsX2NvdW50ICE9PSAnbnVtYmVyJyB8fFxyXG4gICAgICAgICAgICB0eXBlb2YgbGltaXQgIT09ICdudW1iZXInIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiBvZmZzZXQgIT09ICdudW1iZXInXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRocm93IGdldEJhZEl0ZW1FcnJvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZmxhdHRlbmVkOiBzdHJpbmdbXSA9IGZsYXR0ZW4oXHJcbiAgICAgICAgICAgIGVudHJpZXMsXHJcbiAgICAgICAgICAgIG5ldyBGb2xkZXIodGhpcy5vcHRpb25zKSxcclxuICAgICAgICAgICAgbmV3IEZpbGVBUEkodGhpcy5vcHRpb25zKSxcclxuICAgICAgICAgICAgbmV3IFdlYkxpbmtBUEkodGhpcy5vcHRpb25zKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5pdGVtQ2FjaGUgPSAodGhpcy5pdGVtQ2FjaGUgfHwgW10pLmNvbmNhdChmbGF0dGVuZWQpO1xyXG5cclxuICAgICAgICAvLyBUb3RhbCBjb3VudCBtYXkgYmUgbW9yZSB0aGFuIHRoZSBhY3R1YWwgbnVtYmVyIG9mIGVudHJpZXMsIHNvIGRvbid0IHJlbHlcclxuICAgICAgICAvLyBvbiBpdCBvbiBpdHMgb3duLiBHb29kIGZvciBjYWxjdWxhdGluZyBwZXJjZW50YXRnZSwgYnV0IG5vdCBnb29kIGZvclxyXG4gICAgICAgIC8vIGZpZ3VyaW5nIG91ciB3aGVuIHRoZSBjb2xsZWN0aW9uIGlzIGRvbmUgbG9hZGluZy5cclxuICAgICAgICBjb25zdCBpc0xvYWRlZDogYm9vbGVhbiA9IG9mZnNldCArIGxpbWl0ID49IHRvdGFsX2NvdW50O1xyXG5cclxuICAgICAgICB0aGlzLmdldENhY2hlKCkuc2V0KFxyXG4gICAgICAgICAgICB0aGlzLmtleSxcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgcmVzcG9uc2UsIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1fY29sbGVjdGlvbjogT2JqZWN0LmFzc2lnbih7fSwgaXRlbV9jb2xsZWN0aW9uLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNMb2FkZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZW50cmllczogdGhpcy5pdGVtQ2FjaGVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKCFpc0xvYWRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9mZnNldCArPSBsaW1pdDtcclxuICAgICAgICAgICAgdGhpcy5mb2xkZXJSZXF1ZXN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmZpbmlzaCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIGZvbGRlciBmZXRjaCBlcnJvclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIGZldGNoIGVycm9yXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmb2xkZXJFcnJvckhhbmRsZXIgPSAoZXJyb3I6IGFueSk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVzdHJveWVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVycm9yQ2FsbGJhY2soZXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERvZXMgdGhlIG5ldHdvcmsgcmVxdWVzdCBmb3IgZmV0Y2hpbmcgYSBmb2xkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmb2xkZXJSZXF1ZXN0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVzdHJveWVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy54aHJcclxuICAgICAgICAgICAgLmdldCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuZ2V0VXJsKHRoaXMuaWQpLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldCxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDogTElNSVRfSVRFTV9GRVRDSCxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZHM6IGdldEZpZWxkcyh0aGlzLmluY2x1ZGVQcmV2aWV3RmllbGRzLCB0aGlzLmluY2x1ZGVQcmV2aWV3U2lkZWJhckZpZWxkcylcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcC1IaW50cyc6IFhfUkVQX0hJTlRTIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5mb2xkZXJTdWNjZXNzSGFuZGxlcilcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuZm9sZGVyRXJyb3JIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYSBib3ggZm9sZGVyIGFuZCBpdHMgaXRlbXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBGb2xkZXIgaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3J0QnkgLSBzb3J0IGJ5IGZpZWxkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc29ydERpcmVjdGlvbiAtIHNvcnQgZGlyZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdWNjZXNzQ2FsbGJhY2sgLSBGdW5jdGlvbiB0byBjYWxsIHdpdGggcmVzdWx0c1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZXJyb3JDYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGNhbGwgd2l0aCBlcnJvcnNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnx2b2lkfSBbZm9yY2VGZXRjaF0gLSBCeXBhc3NlcyB0aGUgY2FjaGVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnx2b2lkfSBbaW5jbHVkZVByZXZpZXddIC0gT3B0aW9uYWxseSBpbmNsdWRlIHByZXZpZXcgZmllbGRzXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW58dm9pZH0gW2luY2x1ZGVQcmV2aWV3U2lkZWJhcl0gLSBPcHRpb25hbGx5IGluY2x1ZGUgcHJldmlldyBzaWRlYmFyIGZpZWxkc1xyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZm9sZGVyKFxyXG4gICAgICAgIGlkOiBzdHJpbmcsXHJcbiAgICAgICAgc29ydEJ5OiBTb3J0QnksXHJcbiAgICAgICAgc29ydERpcmVjdGlvbjogU29ydERpcmVjdGlvbixcclxuICAgICAgICBzdWNjZXNzQ2FsbGJhY2s6IEZ1bmN0aW9uLFxyXG4gICAgICAgIGVycm9yQ2FsbGJhY2s6IEZ1bmN0aW9uLFxyXG4gICAgICAgIGZvcmNlRmV0Y2g6IGJvb2xlYW4gPSBmYWxzZSxcclxuICAgICAgICBpbmNsdWRlUHJldmlld0ZpZWxkczogYm9vbGVhbiA9IGZhbHNlLFxyXG4gICAgICAgIGluY2x1ZGVQcmV2aWV3U2lkZWJhckZpZWxkczogYm9vbGVhbiA9IGZhbHNlXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc0Rlc3Ryb3llZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNhdmUgcmVmZXJlbmNlc1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gMDtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5rZXkgPSB0aGlzLmdldENhY2hlS2V5KGlkKTtcclxuICAgICAgICB0aGlzLnN1Y2Nlc3NDYWxsYmFjayA9IHN1Y2Nlc3NDYWxsYmFjaztcclxuICAgICAgICB0aGlzLmVycm9yQ2FsbGJhY2sgPSBlcnJvckNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuc29ydEJ5ID0gc29ydEJ5O1xyXG4gICAgICAgIHRoaXMuc29ydERpcmVjdGlvbiA9IHNvcnREaXJlY3Rpb247XHJcbiAgICAgICAgdGhpcy5pbmNsdWRlUHJldmlld0ZpZWxkcyA9IGluY2x1ZGVQcmV2aWV3RmllbGRzO1xyXG4gICAgICAgIHRoaXMuaW5jbHVkZVByZXZpZXdTaWRlYmFyRmllbGRzID0gaW5jbHVkZVByZXZpZXdTaWRlYmFyRmllbGRzOyAvLyBpbXBsaWVzIHByZXZpZXdcclxuXHJcbiAgICAgICAgLy8gQ2xlYXIgdGhlIGNhY2hlIGlmIG5lZWRlZFxyXG4gICAgICAgIGlmIChmb3JjZUZldGNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2FjaGUoKS51bnNldCh0aGlzLmtleSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIENhY2hlIHZhbHVlIGlmIGl0IGV4aXN0c1xyXG4gICAgICAgIGlmICh0aGlzLmlzTG9hZGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5maW5pc2goKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWFrZSB0aGUgWEhSIHJlcXVlc3RcclxuICAgICAgICB0aGlzLmZvbGRlclJlcXVlc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFQSSB0byByZW5hbWUgYW4gSXRlbVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHBhcmVudCBmb2xkZXIgaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gbmV3IGZvbGRlciBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdWNjZXNzQ2FsbGJhY2sgLSBzdWNjZXNzIGNhbGxiYWNrXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcnJvckNhbGxiYWNrIC0gZXJyb3IgY2FsbGJhY2tcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVN1Y2Nlc3NIYW5kbGVyID0gKGl0ZW06IEJveEl0ZW0pOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCB7IGlkOiBjaGlsZElkIH0gPSBpdGVtO1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVzdHJveWVkKCkgfHwgIWNoaWxkSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjaGlsZEtleTogc3RyaW5nID0gdGhpcy5nZXRDYWNoZUtleShjaGlsZElkKTtcclxuICAgICAgICBjb25zdCBjYWNoZTogQ2FjaGUgPSB0aGlzLmdldENhY2hlKCk7XHJcbiAgICAgICAgY29uc3QgcGFyZW50OiBGbGF0dGVuZWRCb3hJdGVtID0gY2FjaGUuZ2V0KHRoaXMua2V5KTtcclxuXHJcbiAgICAgICAgY29uc3QgeyBpdGVtX2NvbGxlY3Rpb24gfTogRmxhdHRlbmVkQm94SXRlbSA9IHBhcmVudDtcclxuICAgICAgICBpZiAoIWl0ZW1fY29sbGVjdGlvbikge1xyXG4gICAgICAgICAgICB0aHJvdyBnZXRCYWRJdGVtRXJyb3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHsgdG90YWxfY291bnQsIGVudHJpZXMgfTogRmxhdHRlbmVkQm94SXRlbUNvbGxlY3Rpb24gPSBpdGVtX2NvbGxlY3Rpb247XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGVudHJpZXMpIHx8IHR5cGVvZiB0b3RhbF9jb3VudCAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgdGhyb3cgZ2V0QmFkSXRlbUVycm9yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYWNoZS5zZXQoY2hpbGRLZXksIGl0ZW0pO1xyXG4gICAgICAgIGl0ZW1fY29sbGVjdGlvbi5lbnRyaWVzID0gW2NoaWxkS2V5XS5jb25jYXQoZW50cmllcyk7XHJcbiAgICAgICAgaXRlbV9jb2xsZWN0aW9uLnRvdGFsX2NvdW50ID0gdG90YWxfY291bnQgKyAxO1xyXG4gICAgICAgIHRoaXMuc3VjY2Vzc0NhbGxiYWNrKGl0ZW0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERvZXMgdGhlIG5ldHdvcmsgcmVxdWVzdCBmb3IgZmV0Y2hpbmcgYSBmb2xkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmb2xkZXJDcmVhdGVSZXF1ZXN0KG5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVzdHJveWVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmdldFVybCgpfT9maWVsZHM9JHtnZXRGaWVsZHMoKX1gO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnhoclxyXG4gICAgICAgICAgICAucG9zdCh7XHJcbiAgICAgICAgICAgICAgICB1cmwsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMuaWRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuY3JlYXRlU3VjY2Vzc0hhbmRsZXIpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmZvbGRlckVycm9ySGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBUEkgdG8gcmVuYW1lIGFuIEl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBwYXJlbnQgZm9sZGVyIGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIG5ldyBmb2xkZXIgbmFtZVxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gc3VjY2Vzc0NhbGxiYWNrIC0gc3VjY2VzcyBjYWxsYmFja1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZXJyb3JDYWxsYmFjayAtIGVycm9yIGNhbGxiYWNrXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBjcmVhdGUoaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBzdWNjZXNzQ2FsbGJhY2s6IEZ1bmN0aW9uLCBlcnJvckNhbGxiYWNrOiBGdW5jdGlvbiA9IG5vb3ApOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc0Rlc3Ryb3llZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLmtleSA9IHRoaXMuZ2V0Q2FjaGVLZXkoaWQpO1xyXG4gICAgICAgIHRoaXMuc3VjY2Vzc0NhbGxiYWNrID0gc3VjY2Vzc0NhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuZXJyb3JDYWxsYmFjayA9IGVycm9yQ2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5mb2xkZXJDcmVhdGVSZXF1ZXN0KG5hbWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGb2xkZXI7XHJcbiJdfQ==