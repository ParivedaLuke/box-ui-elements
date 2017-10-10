var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 
 * @file Main entry point for the box api
 * @author Box
 */

import Cache from '../util/Cache';
import ChunkedUploadAPI from './ChunkedUpload';
import PlainUploadAPI from './PlainUpload';
import FolderAPI from './Folder';
import FileAPI from './File';
import WebLinkAPI from './WebLink';
import SearchAPI from './Search';
import RecentsAPI from './Recents';
import { DEFAULT_HOSTNAME_API, DEFAULT_HOSTNAME_UPLOAD, TYPE_FOLDER, TYPE_FILE, TYPE_WEBLINK } from '../constants';

var APIFactory = function () {

    /**
     * [constructor]
     *
     * @param {Object} options
     * @param {string} options.id - item id
     * @param {string|function} options.token - Auth token
     * @param {string} [options.sharedLink] - Shared link
     * @param {string} [options.sharedLinkPassword] - Shared link password
     * @param {string} [options.apiHost] - Api host
     * @param {string} [options.uploadHost] - Upload host name
     * @return {API} Api instance
     */


    /**
     * @property {SearchAPI}
     */


    /**
     * @property {PlainUploadAPI}
     */


    /**
     * @property {WebLink}
     */

    /**
     * @property {*}
     */
    function APIFactory() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, APIFactory);

        this.options = Object.assign({}, options, {
            apiHost: options.apiHost || DEFAULT_HOSTNAME_API,
            uploadHost: options.uploadHost || DEFAULT_HOSTNAME_UPLOAD,
            cache: options.cache || new Cache()
        });
    }

    /**
     * [destructor]
     *
     * @param {boolean} destroyCache - true to destroy cache
     * @return {void}
     */


    /**
     * @property {RecentsAPI}
     */


    /**
     * @property {ChunkedUploadAPI}
     */


    /**
     * @property {FolderAPI}
     */


    /**
     * @property {FileAPI}
     */


    _createClass(APIFactory, [{
        key: 'destroy',
        value: function destroy() {
            var destroyCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (this.fileAPI) {
                this.fileAPI.destroy();
                delete this.fileAPI;
            }
            if (this.weblinkAPI) {
                this.weblinkAPI.destroy();
                delete this.weblinkAPI;
            }
            if (this.plainUploadAPI) {
                this.plainUploadAPI.destroy();
                delete this.plainUploadAPI;
            }
            if (this.chunkedUploadAPI) {
                this.chunkedUploadAPI.destroy();
                delete this.chunkedUploadAPI;
            }
            if (this.folderAPI) {
                this.folderAPI.destroy();
                delete this.folderAPI;
            }
            if (this.searchAPI) {
                this.searchAPI.destroy();
                delete this.searchAPI;
            }
            if (this.recentsAPI) {
                this.recentsAPI.destroy();
                delete this.recentsAPI;
            }
            if (destroyCache) {
                this.options.cache = new Cache();
            }
        }

        /**
         * Gets the cache instance
         *
         * @return {Cache} cache instance
         */

    }, {
        key: 'getCache',
        value: function getCache() {
            return this.options.cache;
        }

        /**
         * Returns the API based on type of item
         *
         * @private
         * @param {String} type - item type
         * @return {ItemAPI} api
         */

    }, {
        key: 'getAPI',
        value: function getAPI(type) {
            var api = void 0;

            switch (type) {
                case TYPE_FOLDER:
                    api = this.getFolderAPI();
                    break;
                case TYPE_FILE:
                    api = this.getFileAPI();
                    break;
                case TYPE_WEBLINK:
                    api = this.getWebLinkAPI();
                    break;
                default:
                    throw new Error('Unknown Type!');
            }

            return api;
        }

        /**
         * API for file
         *
         * @return {FileAPI} FileAPI instance
         */

    }, {
        key: 'getFileAPI',
        value: function getFileAPI() {
            this.destroy();
            this.fileAPI = new FileAPI(this.options);
            return this.fileAPI;
        }

        /**
         * API for web links
         *
         * @return {WebLinkAPI} WebLinkAPI instance
         */

    }, {
        key: 'getWebLinkAPI',
        value: function getWebLinkAPI() {
            this.destroy();
            this.weblinkAPI = new WebLinkAPI(this.options);
            return this.weblinkAPI;
        }

        /**
         * API for plain uploads
         *
         * @return {UploadAPI} UploadAPI instance
         */

    }, {
        key: 'getPlainUploadAPI',
        value: function getPlainUploadAPI() {
            this.destroy();
            this.plainUploadAPI = new PlainUploadAPI(this.options);
            return this.plainUploadAPI;
        }

        /**
         * API for chunked uploads
         *
         * @return {UploadAPI} UploadAPI instance
         */

    }, {
        key: 'getChunkedUploadAPI',
        value: function getChunkedUploadAPI() {
            this.destroy();
            this.chunkedUploadAPI = new ChunkedUploadAPI(this.options);
            return this.chunkedUploadAPI;
        }

        /**
         * API for folder
         *
         * @return {FolderAPI} FolderAPI instance
         */

    }, {
        key: 'getFolderAPI',
        value: function getFolderAPI() {
            this.destroy();
            this.folderAPI = new FolderAPI(this.options);
            return this.folderAPI;
        }

        /**
         * API for search
         *
         * @return {SearchAPI} SearchAPI instance
         */

    }, {
        key: 'getSearchAPI',
        value: function getSearchAPI() {
            this.destroy();
            this.searchAPI = new SearchAPI(this.options);
            return this.searchAPI;
        }

        /**
         * API for recents
         *
         * @return {RecentsAPI} RecentsAPI instance
         */

    }, {
        key: 'getRecentsAPI',
        value: function getRecentsAPI() {
            this.destroy();
            this.recentsAPI = new RecentsAPI(this.options);
            return this.recentsAPI;
        }
    }]);

    return APIFactory;
}();

export default APIFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFQSUZhY3RvcnkuanMiXSwibmFtZXMiOlsiQ2FjaGUiLCJDaHVua2VkVXBsb2FkQVBJIiwiUGxhaW5VcGxvYWRBUEkiLCJGb2xkZXJBUEkiLCJGaWxlQVBJIiwiV2ViTGlua0FQSSIsIlNlYXJjaEFQSSIsIlJlY2VudHNBUEkiLCJERUZBVUxUX0hPU1ROQU1FX0FQSSIsIkRFRkFVTFRfSE9TVE5BTUVfVVBMT0FEIiwiVFlQRV9GT0xERVIiLCJUWVBFX0ZJTEUiLCJUWVBFX1dFQkxJTksiLCJBUElGYWN0b3J5Iiwib3B0aW9ucyIsIk9iamVjdCIsImFzc2lnbiIsImFwaUhvc3QiLCJ1cGxvYWRIb3N0IiwiY2FjaGUiLCJkZXN0cm95Q2FjaGUiLCJmaWxlQVBJIiwiZGVzdHJveSIsIndlYmxpbmtBUEkiLCJwbGFpblVwbG9hZEFQSSIsImNodW5rZWRVcGxvYWRBUEkiLCJmb2xkZXJBUEkiLCJzZWFyY2hBUEkiLCJyZWNlbnRzQVBJIiwidHlwZSIsImFwaSIsImdldEZvbGRlckFQSSIsImdldEZpbGVBUEkiLCJnZXRXZWJMaW5rQVBJIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxNQUFrQixlQUFsQjtBQUNBLE9BQU9DLGdCQUFQLE1BQTZCLGlCQUE3QjtBQUNBLE9BQU9DLGNBQVAsTUFBMkIsZUFBM0I7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFVBQXRCO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQixRQUFwQjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsV0FBdkI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFVBQXRCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixXQUF2QjtBQUNBLFNBQVNDLG9CQUFULEVBQStCQyx1QkFBL0IsRUFBd0RDLFdBQXhELEVBQXFFQyxTQUFyRSxFQUFnRkMsWUFBaEYsUUFBb0csY0FBcEc7O0lBR01DLFU7O0FBeUNGOzs7Ozs7Ozs7Ozs7OztBQVZBOzs7OztBQVZBOzs7OztBQVZBOzs7O0FBVkE7OztB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TCxHQUF3QixJQUFJeEIsZ0JBQUosQ0FBcUIsS0FBS2EsT0FBMUIsQ0FBeEI7QUFDQSxtQkFBTyxLQUFLVyxnQkFBWjtBQUNIOztBQUVEOzs7Ozs7Ozt1Q0FLMEI7QUFDdEIsaUJBQUtILE9BQUw7QUFDQSxpQkFBS0ksU0FBTCxHQUFpQixJQUFJdkIsU0FBSixDQUFjLEtBQUtXLE9BQW5CLENBQWpCO0FBQ0EsbUJBQU8sS0FBS1ksU0FBWjtBQUNIOztBQUVEOzs7Ozs7Ozt1Q0FLMEI7QUFDdEIsaUJBQUtKLE9BQUw7QUFDQSxpQkFBS0ssU0FBTCxHQUFpQixJQUFJckIsU0FBSixDQUFjLEtBQUtRLE9BQW5CLENBQWpCO0FBQ0EsbUJBQU8sS0FBS2EsU0FBWjtBQUNIOztBQUVEOzs7Ozs7Ozt3Q0FLNEI7QUFDeEIsaUJBQUtMLE9BQUw7QUFDQSxpQkFBS00sVUFBTCxHQUFrQixJQUFJckIsVUFBSixDQUFlLEtBQUtPLE9BQXBCLENBQWxCO0FBQ0EsbUJBQU8sS0FBS2MsVUFBWjtBQUNIOzs7Ozs7QUFHTCxlQUFlZixVQUFmIiwiZmlsZSI6IkFQSUZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgTWFpbiBlbnRyeSBwb2ludCBmb3IgdGhlIGJveCBhcGlcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgQ2FjaGUgZnJvbSAnLi4vdXRpbC9DYWNoZSc7XHJcbmltcG9ydCBDaHVua2VkVXBsb2FkQVBJIGZyb20gJy4vQ2h1bmtlZFVwbG9hZCc7XHJcbmltcG9ydCBQbGFpblVwbG9hZEFQSSBmcm9tICcuL1BsYWluVXBsb2FkJztcclxuaW1wb3J0IEZvbGRlckFQSSBmcm9tICcuL0ZvbGRlcic7XHJcbmltcG9ydCBGaWxlQVBJIGZyb20gJy4vRmlsZSc7XHJcbmltcG9ydCBXZWJMaW5rQVBJIGZyb20gJy4vV2ViTGluayc7XHJcbmltcG9ydCBTZWFyY2hBUEkgZnJvbSAnLi9TZWFyY2gnO1xyXG5pbXBvcnQgUmVjZW50c0FQSSBmcm9tICcuL1JlY2VudHMnO1xyXG5pbXBvcnQgeyBERUZBVUxUX0hPU1ROQU1FX0FQSSwgREVGQVVMVF9IT1NUTkFNRV9VUExPQUQsIFRZUEVfRk9MREVSLCBUWVBFX0ZJTEUsIFRZUEVfV0VCTElOSyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB0eXBlIHsgT3B0aW9ucywgSXRlbVR5cGUsIEl0ZW1BUEkgfSBmcm9tICcuLi9mbG93VHlwZXMnO1xyXG5cclxuY2xhc3MgQVBJRmFjdG9yeSB7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7Kn1cclxuICAgICAqL1xyXG4gICAgb3B0aW9uczogT3B0aW9ucztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7RmlsZUFQSX1cclxuICAgICAqL1xyXG4gICAgZmlsZUFQSTogRmlsZUFQSTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7V2ViTGlua31cclxuICAgICAqL1xyXG4gICAgd2VibGlua0FQSTogV2ViTGlua0FQSTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7Rm9sZGVyQVBJfVxyXG4gICAgICovXHJcbiAgICBmb2xkZXJBUEk6IEZvbGRlckFQSTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7UGxhaW5VcGxvYWRBUEl9XHJcbiAgICAgKi9cclxuICAgIHBsYWluVXBsb2FkQVBJOiBQbGFpblVwbG9hZEFQSTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7Q2h1bmtlZFVwbG9hZEFQSX1cclxuICAgICAqL1xyXG4gICAgY2h1bmtlZFVwbG9hZEFQSTogQ2h1bmtlZFVwbG9hZEFQSTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7U2VhcmNoQVBJfVxyXG4gICAgICovXHJcbiAgICBzZWFyY2hBUEk6IFNlYXJjaEFQSTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7UmVjZW50c0FQSX1cclxuICAgICAqL1xyXG4gICAgcmVjZW50c0FQSTogUmVjZW50c0FQSTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFtjb25zdHJ1Y3Rvcl1cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaWQgLSBpdGVtIGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xmdW5jdGlvbn0gb3B0aW9ucy50b2tlbiAtIEF1dGggdG9rZW5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5zaGFyZWRMaW5rXSAtIFNoYXJlZCBsaW5rXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuc2hhcmVkTGlua1Bhc3N3b3JkXSAtIFNoYXJlZCBsaW5rIHBhc3N3b3JkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuYXBpSG9zdF0gLSBBcGkgaG9zdFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnVwbG9hZEhvc3RdIC0gVXBsb2FkIGhvc3QgbmFtZVxyXG4gICAgICogQHJldHVybiB7QVBJfSBBcGkgaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogT3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge1xyXG4gICAgICAgICAgICBhcGlIb3N0OiBvcHRpb25zLmFwaUhvc3QgfHwgREVGQVVMVF9IT1NUTkFNRV9BUEksXHJcbiAgICAgICAgICAgIHVwbG9hZEhvc3Q6IG9wdGlvbnMudXBsb2FkSG9zdCB8fCBERUZBVUxUX0hPU1ROQU1FX1VQTE9BRCxcclxuICAgICAgICAgICAgY2FjaGU6IG9wdGlvbnMuY2FjaGUgfHwgbmV3IENhY2hlKClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFtkZXN0cnVjdG9yXVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGVzdHJveUNhY2hlIC0gdHJ1ZSB0byBkZXN0cm95IGNhY2hlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBkZXN0cm95KGRlc3Ryb3lDYWNoZTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsZUFQSSkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbGVBUEkuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5maWxlQVBJO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy53ZWJsaW5rQVBJKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2VibGlua0FQSS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLndlYmxpbmtBUEk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnBsYWluVXBsb2FkQVBJKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxhaW5VcGxvYWRBUEkuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5wbGFpblVwbG9hZEFQSTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY2h1bmtlZFVwbG9hZEFQSSkge1xyXG4gICAgICAgICAgICB0aGlzLmNodW5rZWRVcGxvYWRBUEkuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jaHVua2VkVXBsb2FkQVBJO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5mb2xkZXJBUEkpIHtcclxuICAgICAgICAgICAgdGhpcy5mb2xkZXJBUEkuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5mb2xkZXJBUEk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEFQSSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaEFQSS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNlYXJjaEFQSTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucmVjZW50c0FQSSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlY2VudHNBUEkuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5yZWNlbnRzQVBJO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGVzdHJveUNhY2hlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5jYWNoZSA9IG5ldyBDYWNoZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGNhY2hlIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Q2FjaGV9IGNhY2hlIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIGdldENhY2hlKCk6ID9DYWNoZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5jYWNoZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIEFQSSBiYXNlZCBvbiB0eXBlIG9mIGl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBpdGVtIHR5cGVcclxuICAgICAqIEByZXR1cm4ge0l0ZW1BUEl9IGFwaVxyXG4gICAgICovXHJcbiAgICBnZXRBUEkodHlwZTogSXRlbVR5cGUpOiBJdGVtQVBJIHtcclxuICAgICAgICBsZXQgYXBpOiBJdGVtQVBJO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBUWVBFX0ZPTERFUjpcclxuICAgICAgICAgICAgICAgIGFwaSA9IHRoaXMuZ2V0Rm9sZGVyQVBJKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUWVBFX0ZJTEU6XHJcbiAgICAgICAgICAgICAgICBhcGkgPSB0aGlzLmdldEZpbGVBUEkoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRZUEVfV0VCTElOSzpcclxuICAgICAgICAgICAgICAgIGFwaSA9IHRoaXMuZ2V0V2ViTGlua0FQSSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gVHlwZSEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhcGk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBUEkgZm9yIGZpbGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtGaWxlQVBJfSBGaWxlQVBJIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIGdldEZpbGVBUEkoKTogRmlsZUFQSSB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5maWxlQVBJID0gbmV3IEZpbGVBUEkodGhpcy5vcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5maWxlQVBJO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIGZvciB3ZWIgbGlua3NcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtXZWJMaW5rQVBJfSBXZWJMaW5rQVBJIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIGdldFdlYkxpbmtBUEkoKTogV2ViTGlua0FQSSB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy53ZWJsaW5rQVBJID0gbmV3IFdlYkxpbmtBUEkodGhpcy5vcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gdGhpcy53ZWJsaW5rQVBJO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIGZvciBwbGFpbiB1cGxvYWRzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7VXBsb2FkQVBJfSBVcGxvYWRBUEkgaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgZ2V0UGxhaW5VcGxvYWRBUEkoKTogUGxhaW5VcGxvYWRBUEkge1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMucGxhaW5VcGxvYWRBUEkgPSBuZXcgUGxhaW5VcGxvYWRBUEkodGhpcy5vcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGFpblVwbG9hZEFQSTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFQSSBmb3IgY2h1bmtlZCB1cGxvYWRzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7VXBsb2FkQVBJfSBVcGxvYWRBUEkgaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgZ2V0Q2h1bmtlZFVwbG9hZEFQSSgpOiBDaHVua2VkVXBsb2FkQVBJIHtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLmNodW5rZWRVcGxvYWRBUEkgPSBuZXcgQ2h1bmtlZFVwbG9hZEFQSSh0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNodW5rZWRVcGxvYWRBUEk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBUEkgZm9yIGZvbGRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0ZvbGRlckFQSX0gRm9sZGVyQVBJIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIGdldEZvbGRlckFQSSgpOiBGb2xkZXJBUEkge1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuZm9sZGVyQVBJID0gbmV3IEZvbGRlckFQSSh0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvbGRlckFQSTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFQSSBmb3Igc2VhcmNoXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7U2VhcmNoQVBJfSBTZWFyY2hBUEkgaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgZ2V0U2VhcmNoQVBJKCk6IFNlYXJjaEFQSSB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hBUEkgPSBuZXcgU2VhcmNoQVBJKHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoQVBJO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIGZvciByZWNlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7UmVjZW50c0FQSX0gUmVjZW50c0FQSSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBnZXRSZWNlbnRzQVBJKCk6IFJlY2VudHNBUEkge1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMucmVjZW50c0FQSSA9IG5ldyBSZWNlbnRzQVBJKHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjZW50c0FQSTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQVBJRmFjdG9yeTtcclxuIl19