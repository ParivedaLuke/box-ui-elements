var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box item api
 * @author Box
 */

import noop from 'lodash.noop';
import Base from './Base';
import getBadItemError from '../util/error';
import { ACCESS_NONE, CACHE_PREFIX_SEARCH, CACHE_PREFIX_FOLDER, TYPE_FOLDER } from '../constants';

var Item = function (_Base) {
    _inherits(Item, _Base);

    function Item() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Item);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Item.__proto__ || Object.getPrototypeOf(Item)).call.apply(_ref, [this].concat(args))), _this), _this.errorHandler = function (error) {
            if (_this.isDestroyed()) {
                return;
            }
            var response = error.response;

            if (response) {
                response.json().then(_this.errorCallback);
            } else if (error instanceof Error) {
                _this.errorCallback();
                throw error;
            }
        }, _this.deleteSuccessHandler = function () {
            if (_this.isDestroyed()) {
                return;
            }

            // When fetching the parent folder from the cache
            // we have no guarantees that it will be there since
            // search results happen across folders and we only
            // add those folders to cache that have been navigated to.
            var parentKey = _this.getParentCacheKey(_this.parentId);
            var folder = _this.getCache().get(parentKey);
            if (!folder) {
                _this.postDeleteCleanup();
                return;
            }

            // Same logic as above but in this case we may have the parent
            // folders meta data in cache but not its contents.
            var item_collection = folder.item_collection;

            if (!item_collection) {
                _this.postDeleteCleanup();
                return;
            }

            var entries = item_collection.entries,
                total_count = item_collection.total_count;

            if (!Array.isArray(entries) || typeof total_count !== 'number') {
                throw getBadItemError();
            }

            var childKey = _this.getCacheKey(_this.id);
            var oldCount = entries.length;
            var newEntries = entries.filter(function (entry) {
                return entry !== childKey;
            });
            var newCount = newEntries.length;

            _this.merge(parentKey, 'item_collection', Object.assign(item_collection, {
                entries: newEntries,
                total_count: total_count - (oldCount - newCount)
            }));
            _this.postDeleteCleanup();
        }, _this.renameSuccessHandler = function (item) {
            // Get rid of all searches
            _this.getCache().unsetAll(CACHE_PREFIX_SEARCH);
            _this.merge(_this.getCacheKey(_this.id), 'name', item.name);
        }, _this.shareSuccessHandler = function (item) {
            _this.merge(_this.getCacheKey(_this.id), 'shared_link', item.shared_link);
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


    _createClass(Item, [{
        key: 'getParentCacheKey',


        /**
         * Creates a key for the item's parent
         * This is always a folder
         *
         * @param {string} id folder id
         * @return {string} key
         */
        value: function getParentCacheKey(id) {
            return '' + CACHE_PREFIX_FOLDER + id;
        }

        /**
         * Handles error responses
         *
         * @param {Response} error.response - error response
         * @return {Function} Function that handles response
         */

    }, {
        key: 'getCacheKey',


        /**
         * Creates a key for the cache
         *
         * @param {string} id folder id
         * @return {string} key
         */
        value: function getCacheKey(id) {
            return 'getCacheKey(' + id + ') should be overriden';
        }

        /**
         * API URL for items
         *
         * @param {string} id - item id
         * @protected
         * @return {string} base url for files
         */

    }, {
        key: 'getUrl',
        value: function getUrl(id) {
            return 'getUrl(' + id + ') should be overriden';
        }

        /**
         * Merges new data with old data and returns new data
         *
         * @param {String} cacheKey - the cache key of item to merge
         * @param {String} key - the attribute to merge
         * @param {Object} value - the value to merge
         * @return {void}
         */

    }, {
        key: 'merge',
        value: function merge(cacheKey, key, value) {
            if (this.isDestroyed()) {
                return;
            }
            var cache = this.getCache();
            cache.merge(cacheKey, _defineProperty({}, key, value));
            this.successCallback(cache.get(cacheKey));
        }

        /**
         * Steps to do after deletion
         *
         * @return {void}
         */

    }, {
        key: 'postDeleteCleanup',
        value: function postDeleteCleanup() {
            if (this.isDestroyed()) {
                return;
            }

            // Get rid of all searches
            this.getCache().unsetAll(CACHE_PREFIX_SEARCH);
            this.successCallback();
        }

        /**
         * Handles response for deletion
         *
         * @return {void}
         */

    }, {
        key: 'delete',


        /**
         * API to delete an Item
         *
         * @param {Object} item - item to delete
         * @param {Function} successCallback - success callback
         * @param {Function} errorCallback - error callback
         * @param {Boolean} recursive - true for folders
         * @return {void}
         */
        value: function _delete(item, successCallback) {
            var errorCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

            if (this.isDestroyed()) {
                return Promise.reject();
            }

            var id = item.id,
                permissions = item.permissions,
                parent = item.parent,
                type = item.type;

            if (!id || !permissions || !parent || !type) {
                errorCallback();
                return Promise.reject();
            }

            var parentId = parent.id;
            var can_delete = permissions.can_delete;

            if (!can_delete || !parentId) {
                errorCallback();
                return Promise.reject();
            }

            this.id = id;
            this.parentId = parentId;
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;

            var url = '' + this.getUrl(id) + (type === TYPE_FOLDER ? '?recursive=true' : '');
            return this.xhr.delete({ url: url }).then(this.deleteSuccessHandler).catch(this.errorHandler);
        }

        /**
         * Handles response for rename
         *
         * @param {BoxItem} item - the updated item
         * @return {void}
         */

    }, {
        key: 'rename',


        /**
         * API to rename an Item
         *
         * @param {Object} item - item to rename
         * @param {string} name - item new name
         * @param {Function} successCallback - success callback
         * @param {Function} errorCallback - error callback
         * @return {void}
         */
        value: function rename(item, name, successCallback) {
            var errorCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;

            if (this.isDestroyed()) {
                return Promise.reject();
            }

            var id = item.id,
                permissions = item.permissions;

            if (!id || !permissions) {
                errorCallback();
                return Promise.reject();
            }

            var can_rename = permissions.can_rename;

            if (!can_rename) {
                errorCallback();
                return Promise.reject();
            }

            this.id = id;
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;

            return this.xhr.put({ url: '' + this.getUrl(id), data: { name: name } }).then(this.renameSuccessHandler).catch(this.errorHandler);
        }

        /**
         * Handles response for shared link
         *
         * @param {BoxItem} item - the updated item
         * @return {void}
         */

    }, {
        key: 'share',


        /**
         * Api to create or remove a shared link
         *
         * @param {Object} item - item to share
         * @param {string} access - shared access level
         * @param {Function} successCallback - success callback
         * @param {Function|void} errorCallback - error callback
         * @return {void}
         */
        value: function share(item, access, successCallback) {
            var errorCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;

            if (this.isDestroyed()) {
                return Promise.reject();
            }

            var id = item.id,
                permissions = item.permissions;

            if (!id || !permissions) {
                errorCallback();
                return Promise.reject();
            }

            var can_share = permissions.can_share,
                can_set_share_access = permissions.can_set_share_access;

            if (!can_share || !can_set_share_access) {
                errorCallback();
                return Promise.reject();
            }

            this.id = id;
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;

            // We use the parent folder's auth token since use case involves
            // only content explorer or picker which works onf folder tokens
            return this.xhr.put({
                url: this.getUrl(this.id),
                data: {
                    shared_link: access === ACCESS_NONE ? null : { access: access }
                }
            }).then(this.shareSuccessHandler).catch(this.errorHandler);
        }
    }]);

    return Item;
}(Base);

export default Item;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkl0ZW0uanMiXSwibmFtZXMiOlsibm9vcCIsIkJhc2UiLCJnZXRCYWRJdGVtRXJyb3IiLCJBQ0NFU1NfTk9ORSIsIkNBQ0hFX1BSRUZJWF9TRUFSQ0giLCJDQUNIRV9QUkVGSVhfRk9MREVSIiwiVFlQRV9GT0xERVIiLCJJdGVtIiwiZXJyb3JIYW5kbGVyIiwiZXJyb3IiLCJpc0Rlc3Ryb3llZCIsInJlc3BvbnNlIiwianNvbiIsInRoZW4iLCJlcnJvckNhbGxiYWNrIiwiRXJyb3IiLCJkZWxldGVTdWNjZXNzSGFuZGxlciIsInBhcmVudEtleSIsImdldFBhcmVudENhY2hlS2V5IiwicGFyZW50SWQiLCJmb2xkZXIiLCJnZXRDYWNoZSIsImdldCIsInBvc3REZWxldGVDbGVhbnVwIiwiaXRlbV9jb2xsZWN0aW9uIiwiZW50cmllcyIsInRvdGFsX2NvdW50IiwiQXJyYXkiLCJpc0FycmF5IiwiY2hpbGRLZXkiLCJnZXRDYWNoZUtleSIsImlkIiwib2xkQ291bnQiLCJsZW5ndGgiLCJuZXdFbnRyaWVzIiwiZmlsdGVyIiwiZW50cnkiLCJuZXdDb3VudCIsIm1lcmdlIiwiT2JqZWN0IiwiYXNzaWduIiwicmVuYW1lU3VjY2Vzc0hhbmRsZXIiLCJpdGVtIiwidW5zZXRBbGwiLCJuYW1lIiwic2hhcmVTdWNjZXNzSGFuZGxlciIsInNoYXJlZF9saW5rIiwiY2FjaGVLZXkiLCJrZXkiLCJ2YWx1ZSIsImNhY2hlIiwic3VjY2Vzc0NhbGxiYWNrIiwiUHJvbWlzZSIsInJlamVjdCIsInBlcm1pc3Npb25zIiwicGFyZW50IiwidHlwZSIsImNhbl9kZWxldGUiLCJ1cmwiLCJnZXRVcmwiLCJ4aHIiLCJkZWxldGUiLCJjYXRjaCIsImNhbl9yZW5hbWUiLCJwdXQiLCJkYXRhIiwiYWNjZXNzIiwiY2FuX3NoYXJlIiwiY2FuX3NldF9zaGFyZV9hY2Nlc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBTUEsT0FBT0EsSUFBUCxNQUFpQixhQUFqQjtBQUNB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OztBQVkzRyxnQkFBSSxDQUFDRCxTQUFELElBQWMsQ0FBQ0Msb0JBQW5CLEVBQXlDO0FBQ3JDdEQ7QUFDQSx1QkFBT3NDLFFBQVFDLE1BQVIsRUFBUDtBQUNIOztBQUVELGlCQUFLdEIsRUFBTCxHQUFVQSxFQUFWO0FBQ0EsaUJBQUtvQixlQUFMLEdBQXVCQSxlQUF2QjtBQUNBLGlCQUFLckMsYUFBTCxHQUFxQkEsYUFBckI7O0FBRUE7QUFDQTtBQUNBLG1CQUFPLEtBQUs4QyxHQUFMLENBQ0ZJLEdBREUsQ0FDRTtBQUNETixxQkFBSyxLQUFLQyxNQUFMLENBQVksS0FBSzVCLEVBQWpCLENBREo7QUFFRGtDLHNCQUFNO0FBQ0ZuQixpQ0FBYW9CLFdBQVcvRCxXQUFYLEdBQXlCLElBQXpCLEdBQWdDLEVBQUUrRCxjQUFGO0FBRDNDO0FBRkwsYUFERixFQU9GckQsSUFQRSxDQU9HLEtBQUtnQyxtQkFQUixFQVFGaUIsS0FSRSxDQVFJLEtBQUt0RCxZQVJULENBQVA7QUFTSDs7OztFQW5TY1AsSTs7QUFzU25CLGVBQWVNLElBQWYiLCJmaWxlIjoiSXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBIZWxwZXIgZm9yIHRoZSBib3ggaXRlbSBhcGlcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgbm9vcCBmcm9tICdsb2Rhc2gubm9vcCc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBnZXRCYWRJdGVtRXJyb3IgZnJvbSAnLi4vdXRpbC9lcnJvcic7XHJcbmltcG9ydCB7IEFDQ0VTU19OT05FLCBDQUNIRV9QUkVGSVhfU0VBUkNILCBDQUNIRV9QUkVGSVhfRk9MREVSLCBUWVBFX0ZPTERFUiB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB0eXBlIENhY2hlIGZyb20gJy4uL3V0aWwvQ2FjaGUnO1xyXG5pbXBvcnQgdHlwZSB7IEJveEl0ZW0sIEZsYXR0ZW5lZEJveEl0ZW0sIEZsYXR0ZW5lZEJveEl0ZW1Db2xsZWN0aW9uLCBCb3hJdGVtUGVybWlzc2lvbiB9IGZyb20gJy4uL2Zsb3dUeXBlcyc7XHJcblxyXG5jbGFzcyBJdGVtIGV4dGVuZHMgQmFzZSB7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBpZDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHBhcmVudElkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufVxyXG4gICAgICovXHJcbiAgICBzdWNjZXNzQ2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn1cclxuICAgICAqL1xyXG4gICAgZXJyb3JDYWxsYmFjazogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEga2V5IGZvciB0aGUgaXRlbSdzIHBhcmVudFxyXG4gICAgICogVGhpcyBpcyBhbHdheXMgYSBmb2xkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgZm9sZGVyIGlkXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IGtleVxyXG4gICAgICovXHJcbiAgICBnZXRQYXJlbnRDYWNoZUtleShpZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCR7Q0FDSEVfUFJFRklYX0ZPTERFUn0ke2lkfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGVycm9yIHJlc3BvbnNlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzcG9uc2V9IGVycm9yLnJlc3BvbnNlIC0gZXJyb3IgcmVzcG9uc2VcclxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBGdW5jdGlvbiB0aGF0IGhhbmRsZXMgcmVzcG9uc2VcclxuICAgICAqL1xyXG4gICAgZXJyb3JIYW5kbGVyID0gKGVycm9yOiBhbnkpOiB2b2lkID0+IHtcclxuICAgICAgICBpZiAodGhpcy5pc0Rlc3Ryb3llZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgeyByZXNwb25zZSB9ID0gZXJyb3I7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKHRoaXMuZXJyb3JDYWxsYmFjayk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGtleSBmb3IgdGhlIGNhY2hlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIGZvbGRlciBpZFxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBrZXlcclxuICAgICAqL1xyXG4gICAgZ2V0Q2FjaGVLZXkoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGBnZXRDYWNoZUtleSgke2lkfSkgc2hvdWxkIGJlIG92ZXJyaWRlbmA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBUEkgVVJMIGZvciBpdGVtc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIGl0ZW0gaWRcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gYmFzZSB1cmwgZm9yIGZpbGVzXHJcbiAgICAgKi9cclxuICAgIGdldFVybChpZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYGdldFVybCgke2lkfSkgc2hvdWxkIGJlIG92ZXJyaWRlbmA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXJnZXMgbmV3IGRhdGEgd2l0aCBvbGQgZGF0YSBhbmQgcmV0dXJucyBuZXcgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjYWNoZUtleSAtIHRoZSBjYWNoZSBrZXkgb2YgaXRlbSB0byBtZXJnZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleSAtIHRoZSBhdHRyaWJ1dGUgdG8gbWVyZ2VcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBtZXJnZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgbWVyZ2UoY2FjaGVLZXk6IHN0cmluZywga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc0Rlc3Ryb3llZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY2FjaGU6IENhY2hlID0gdGhpcy5nZXRDYWNoZSgpO1xyXG4gICAgICAgIGNhY2hlLm1lcmdlKGNhY2hlS2V5LCB7XHJcbiAgICAgICAgICAgIFtrZXldOiB2YWx1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3VjY2Vzc0NhbGxiYWNrKGNhY2hlLmdldChjYWNoZUtleSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RlcHMgdG8gZG8gYWZ0ZXIgZGVsZXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBwb3N0RGVsZXRlQ2xlYW51cCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc0Rlc3Ryb3llZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEdldCByaWQgb2YgYWxsIHNlYXJjaGVzXHJcbiAgICAgICAgdGhpcy5nZXRDYWNoZSgpLnVuc2V0QWxsKENBQ0hFX1BSRUZJWF9TRUFSQ0gpO1xyXG4gICAgICAgIHRoaXMuc3VjY2Vzc0NhbGxiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHJlc3BvbnNlIGZvciBkZWxldGlvblxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZVN1Y2Nlc3NIYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVzdHJveWVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gV2hlbiBmZXRjaGluZyB0aGUgcGFyZW50IGZvbGRlciBmcm9tIHRoZSBjYWNoZVxyXG4gICAgICAgIC8vIHdlIGhhdmUgbm8gZ3VhcmFudGVlcyB0aGF0IGl0IHdpbGwgYmUgdGhlcmUgc2luY2VcclxuICAgICAgICAvLyBzZWFyY2ggcmVzdWx0cyBoYXBwZW4gYWNyb3NzIGZvbGRlcnMgYW5kIHdlIG9ubHlcclxuICAgICAgICAvLyBhZGQgdGhvc2UgZm9sZGVycyB0byBjYWNoZSB0aGF0IGhhdmUgYmVlbiBuYXZpZ2F0ZWQgdG8uXHJcbiAgICAgICAgY29uc3QgcGFyZW50S2V5OiBzdHJpbmcgPSB0aGlzLmdldFBhcmVudENhY2hlS2V5KHRoaXMucGFyZW50SWQpO1xyXG4gICAgICAgIGNvbnN0IGZvbGRlcjogP0ZsYXR0ZW5lZEJveEl0ZW0gPSB0aGlzLmdldENhY2hlKCkuZ2V0KHBhcmVudEtleSk7XHJcbiAgICAgICAgaWYgKCFmb2xkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3N0RGVsZXRlQ2xlYW51cCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTYW1lIGxvZ2ljIGFzIGFib3ZlIGJ1dCBpbiB0aGlzIGNhc2Ugd2UgbWF5IGhhdmUgdGhlIHBhcmVudFxyXG4gICAgICAgIC8vIGZvbGRlcnMgbWV0YSBkYXRhIGluIGNhY2hlIGJ1dCBub3QgaXRzIGNvbnRlbnRzLlxyXG4gICAgICAgIGNvbnN0IHsgaXRlbV9jb2xsZWN0aW9uIH06IEZsYXR0ZW5lZEJveEl0ZW0gPSBmb2xkZXI7XHJcbiAgICAgICAgaWYgKCFpdGVtX2NvbGxlY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5wb3N0RGVsZXRlQ2xlYW51cCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IGVudHJpZXMsIHRvdGFsX2NvdW50IH06IEZsYXR0ZW5lZEJveEl0ZW1Db2xsZWN0aW9uID0gaXRlbV9jb2xsZWN0aW9uO1xyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShlbnRyaWVzKSB8fCB0eXBlb2YgdG90YWxfY291bnQgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHRocm93IGdldEJhZEl0ZW1FcnJvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY2hpbGRLZXk6IHN0cmluZyA9IHRoaXMuZ2V0Q2FjaGVLZXkodGhpcy5pZCk7XHJcbiAgICAgICAgY29uc3Qgb2xkQ291bnQ6IG51bWJlciA9IGVudHJpZXMubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IG5ld0VudHJpZXM6IHN0cmluZ1tdID0gZW50cmllcy5maWx0ZXIoKGVudHJ5OiBzdHJpbmcpID0+IGVudHJ5ICE9PSBjaGlsZEtleSk7XHJcbiAgICAgICAgY29uc3QgbmV3Q291bnQ6IG51bWJlciA9IG5ld0VudHJpZXMubGVuZ3RoO1xyXG5cclxuICAgICAgICB0aGlzLm1lcmdlKFxyXG4gICAgICAgICAgICBwYXJlbnRLZXksXHJcbiAgICAgICAgICAgICdpdGVtX2NvbGxlY3Rpb24nLFxyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW1fY29sbGVjdGlvbiwge1xyXG4gICAgICAgICAgICAgICAgZW50cmllczogbmV3RW50cmllcyxcclxuICAgICAgICAgICAgICAgIHRvdGFsX2NvdW50OiB0b3RhbF9jb3VudCAtIChvbGRDb3VudCAtIG5ld0NvdW50KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5wb3N0RGVsZXRlQ2xlYW51cCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFQSSB0byBkZWxldGUgYW4gSXRlbVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIC0gaXRlbSB0byBkZWxldGVcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHN1Y2Nlc3NDYWxsYmFjayAtIHN1Y2Nlc3MgY2FsbGJhY2tcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGVycm9yQ2FsbGJhY2sgLSBlcnJvciBjYWxsYmFja1xyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZWN1cnNpdmUgLSB0cnVlIGZvciBmb2xkZXJzXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBkZWxldGUoaXRlbTogQm94SXRlbSwgc3VjY2Vzc0NhbGxiYWNrOiBGdW5jdGlvbiwgZXJyb3JDYWxsYmFjazogRnVuY3Rpb24gPSBub29wKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEZXN0cm95ZWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHsgaWQsIHBlcm1pc3Npb25zLCBwYXJlbnQsIHR5cGUgfTogQm94SXRlbSA9IGl0ZW07XHJcbiAgICAgICAgaWYgKCFpZCB8fCAhcGVybWlzc2lvbnMgfHwgIXBhcmVudCB8fCAhdHlwZSkge1xyXG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgeyBpZDogcGFyZW50SWQgfSA9IHBhcmVudDtcclxuICAgICAgICBjb25zdCB7IGNhbl9kZWxldGUgfTogQm94SXRlbVBlcm1pc3Npb24gPSBwZXJtaXNzaW9ucztcclxuICAgICAgICBpZiAoIWNhbl9kZWxldGUgfHwgIXBhcmVudElkKSB7XHJcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5wYXJlbnRJZCA9IHBhcmVudElkO1xyXG4gICAgICAgIHRoaXMuc3VjY2Vzc0NhbGxiYWNrID0gc3VjY2Vzc0NhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuZXJyb3JDYWxsYmFjayA9IGVycm9yQ2FsbGJhY2s7XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IGAke3RoaXMuZ2V0VXJsKGlkKX0ke3R5cGUgPT09IFRZUEVfRk9MREVSID8gJz9yZWN1cnNpdmU9dHJ1ZScgOiAnJ31gO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnhoci5kZWxldGUoeyB1cmwgfSkudGhlbih0aGlzLmRlbGV0ZVN1Y2Nlc3NIYW5kbGVyKS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHJlc3BvbnNlIGZvciByZW5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0JveEl0ZW19IGl0ZW0gLSB0aGUgdXBkYXRlZCBpdGVtXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICByZW5hbWVTdWNjZXNzSGFuZGxlciA9IChpdGVtOiBCb3hJdGVtKTogdm9pZCA9PiB7XHJcbiAgICAgICAgLy8gR2V0IHJpZCBvZiBhbGwgc2VhcmNoZXNcclxuICAgICAgICB0aGlzLmdldENhY2hlKCkudW5zZXRBbGwoQ0FDSEVfUFJFRklYX1NFQVJDSCk7XHJcbiAgICAgICAgdGhpcy5tZXJnZSh0aGlzLmdldENhY2hlS2V5KHRoaXMuaWQpLCAnbmFtZScsIGl0ZW0ubmFtZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIHRvIHJlbmFtZSBhbiBJdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gLSBpdGVtIHRvIHJlbmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBpdGVtIG5ldyBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdWNjZXNzQ2FsbGJhY2sgLSBzdWNjZXNzIGNhbGxiYWNrXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcnJvckNhbGxiYWNrIC0gZXJyb3IgY2FsbGJhY2tcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHJlbmFtZShpdGVtOiBCb3hJdGVtLCBuYW1lOiBzdHJpbmcsIHN1Y2Nlc3NDYWxsYmFjazogRnVuY3Rpb24sIGVycm9yQ2FsbGJhY2s6IEZ1bmN0aW9uID0gbm9vcCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVzdHJveWVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IGlkLCBwZXJtaXNzaW9ucyB9OiBCb3hJdGVtID0gaXRlbTtcclxuICAgICAgICBpZiAoIWlkIHx8ICFwZXJtaXNzaW9ucykge1xyXG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgeyBjYW5fcmVuYW1lIH06IEJveEl0ZW1QZXJtaXNzaW9uID0gcGVybWlzc2lvbnM7XHJcbiAgICAgICAgaWYgKCFjYW5fcmVuYW1lKSB7XHJcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5zdWNjZXNzQ2FsbGJhY2sgPSBzdWNjZXNzQ2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5lcnJvckNhbGxiYWNrID0gZXJyb3JDYWxsYmFjaztcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMueGhyXHJcbiAgICAgICAgICAgIC5wdXQoeyB1cmw6IGAke3RoaXMuZ2V0VXJsKGlkKX1gLCBkYXRhOiB7IG5hbWUgfSB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLnJlbmFtZVN1Y2Nlc3NIYW5kbGVyKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyByZXNwb25zZSBmb3Igc2hhcmVkIGxpbmtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0JveEl0ZW19IGl0ZW0gLSB0aGUgdXBkYXRlZCBpdGVtXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBzaGFyZVN1Y2Nlc3NIYW5kbGVyID0gKGl0ZW06IEJveEl0ZW0pOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLm1lcmdlKHRoaXMuZ2V0Q2FjaGVLZXkodGhpcy5pZCksICdzaGFyZWRfbGluaycsIGl0ZW0uc2hhcmVkX2xpbmspO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFwaSB0byBjcmVhdGUgb3IgcmVtb3ZlIGEgc2hhcmVkIGxpbmtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSAtIGl0ZW0gdG8gc2hhcmVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhY2Nlc3MgLSBzaGFyZWQgYWNjZXNzIGxldmVsXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdWNjZXNzQ2FsbGJhY2sgLSBzdWNjZXNzIGNhbGxiYWNrXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufHZvaWR9IGVycm9yQ2FsbGJhY2sgLSBlcnJvciBjYWxsYmFja1xyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgc2hhcmUoaXRlbTogQm94SXRlbSwgYWNjZXNzOiBzdHJpbmcsIHN1Y2Nlc3NDYWxsYmFjazogRnVuY3Rpb24sIGVycm9yQ2FsbGJhY2s6IEZ1bmN0aW9uID0gbm9vcCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVzdHJveWVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IGlkLCBwZXJtaXNzaW9ucyB9OiBCb3hJdGVtID0gaXRlbTtcclxuICAgICAgICBpZiAoIWlkIHx8ICFwZXJtaXNzaW9ucykge1xyXG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgeyBjYW5fc2hhcmUsIGNhbl9zZXRfc2hhcmVfYWNjZXNzIH06IEJveEl0ZW1QZXJtaXNzaW9uID0gcGVybWlzc2lvbnM7XHJcbiAgICAgICAgaWYgKCFjYW5fc2hhcmUgfHwgIWNhbl9zZXRfc2hhcmVfYWNjZXNzKSB7XHJcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5zdWNjZXNzQ2FsbGJhY2sgPSBzdWNjZXNzQ2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5lcnJvckNhbGxiYWNrID0gZXJyb3JDYWxsYmFjaztcclxuXHJcbiAgICAgICAgLy8gV2UgdXNlIHRoZSBwYXJlbnQgZm9sZGVyJ3MgYXV0aCB0b2tlbiBzaW5jZSB1c2UgY2FzZSBpbnZvbHZlc1xyXG4gICAgICAgIC8vIG9ubHkgY29udGVudCBleHBsb3JlciBvciBwaWNrZXIgd2hpY2ggd29ya3Mgb25mIGZvbGRlciB0b2tlbnNcclxuICAgICAgICByZXR1cm4gdGhpcy54aHJcclxuICAgICAgICAgICAgLnB1dCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuZ2V0VXJsKHRoaXMuaWQpLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYXJlZF9saW5rOiBhY2Nlc3MgPT09IEFDQ0VTU19OT05FID8gbnVsbCA6IHsgYWNjZXNzIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5zaGFyZVN1Y2Nlc3NIYW5kbGVyKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJdGVtO1xyXG4iXX0=