var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box web link api
 * @author Box
 */

import Item from './Item';
import { CACHE_PREFIX_WEBLINK } from '../constants';

var WebLink = function (_Item) {
    _inherits(WebLink, _Item);

    function WebLink() {
        _classCallCheck(this, WebLink);

        return _possibleConstructorReturn(this, (WebLink.__proto__ || Object.getPrototypeOf(WebLink)).apply(this, arguments));
    }

    _createClass(WebLink, [{
        key: 'getCacheKey',

        /**
         * Creates a key for the cache
         *
         * @param {string} id folder id
         * @return {string} key
         */
        value: function getCacheKey(id) {
            return '' + CACHE_PREFIX_WEBLINK + id;
        }

        /**
         * URL for weblink api
         *
         * @param {string} [id] optional file id
         * @return {string} base url for files
         */

    }, {
        key: 'getUrl',
        value: function getUrl(id) {
            var suffix = id ? '/' + id : '';
            return this.getBaseUrl() + '/web_links' + suffix;
        }
    }]);

    return WebLink;
}(Item);

export default WebLink;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIldlYkxpbmsuanMiXSwibmFtZXMiOlsiSXRlbSIsIkNBQ0hFX1BSRUZJWF9XRUJMSU5LIiwiV2ViTGluayIsImlkIiwic3VmZml4IiwiZ2V0QmFzZVVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7O0FBTUEsT0FBT0EsSUFBUCxNQUFpQixRQUFqQjtBQUNBLFNBQVNDLG9CQUFULFFBQXFDLGNBQXJDOztJQUVNQyxPOzs7Ozs7Ozs7Ozs7QUFDRjs7Ozs7O29DQU1ZQyxFLEVBQW9CO0FBQzVCLHdCQUFVRixvQkFBVixHQUFpQ0UsRUFBakM7QUFDSDs7QUFFRDs7Ozs7Ozs7OytCQU1PQSxFLEVBQW9CO0FBQ3ZCLGdCQUFNQyxTQUFpQkQsV0FBU0EsRUFBVCxHQUFnQixFQUF2QztBQUNBLG1CQUFVLEtBQUtFLFVBQUwsRUFBVixrQkFBd0NELE1BQXhDO0FBQ0g7Ozs7RUFwQmlCSixJOztBQXVCdEIsZUFBZUUsT0FBZiIsImZpbGUiOiJXZWJMaW5rLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEhlbHBlciBmb3IgdGhlIGJveCB3ZWIgbGluayBhcGlcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgSXRlbSBmcm9tICcuL0l0ZW0nO1xyXG5pbXBvcnQgeyBDQUNIRV9QUkVGSVhfV0VCTElOSyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcblxyXG5jbGFzcyBXZWJMaW5rIGV4dGVuZHMgSXRlbSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBrZXkgZm9yIHRoZSBjYWNoZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBmb2xkZXIgaWRcclxuICAgICAqIEByZXR1cm4ge3N0cmluZ30ga2V5XHJcbiAgICAgKi9cclxuICAgIGdldENhY2hlS2V5KGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgJHtDQUNIRV9QUkVGSVhfV0VCTElOS30ke2lkfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVUkwgZm9yIHdlYmxpbmsgYXBpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtpZF0gb3B0aW9uYWwgZmlsZSBpZFxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBiYXNlIHVybCBmb3IgZmlsZXNcclxuICAgICAqL1xyXG4gICAgZ2V0VXJsKGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHN1ZmZpeDogc3RyaW5nID0gaWQgPyBgLyR7aWR9YCA6ICcnO1xyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLmdldEJhc2VVcmwoKX0vd2ViX2xpbmtzJHtzdWZmaXh9YDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgV2ViTGluaztcclxuIl19