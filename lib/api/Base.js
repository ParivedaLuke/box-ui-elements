var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 
 * @file Base class with utility methods for API calls
 * @author Box
 */

import Xhr from '../util/Xhr';
import Cache from '../util/Cache';
import { DEFAULT_HOSTNAME_API, DEFAULT_HOSTNAME_UPLOAD } from '../constants';

var Base = function () {

    /**
     * [constructor]
     *
     * @param {Object} [options]
     * @param {string} [options.token] - Auth token
     * @param {string} [options.sharedLink] - Shared link
     * @param {string} [options.sharedLinkPassword] - Shared link password
     * @param {string} [options.apiHost] - Api host
     * @param {string} [options.uploadHost] - Upload host name
     * @return {Base} Base instance
     */


    /**
     * @property {string}
     */


    /**
     * @property {Xhr}
     */

    /**
     * @property {Cache}
     */
    function Base() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Base);

        this.cache = options.cache || new Cache();
        this.apiHost = options.apiHost || DEFAULT_HOSTNAME_API;
        this.uploadHost = options.uploadHost || DEFAULT_HOSTNAME_UPLOAD;
        this.options = Object.assign({}, options, {
            apiHost: this.apiHost,
            uploadHost: this.uploadHost,
            cache: this.cache
        });
        this.xhr = new Xhr(this.options);
        this.destroyed = false;
    }

    /**
     * [destructor]
     *
     * @return {void}
     */


    /**
     * @property {*}
     */


    /**
     * @property {string}
     */


    /**
     * @property {boolean}
     */


    _createClass(Base, [{
        key: 'destroy',
        value: function destroy() {
            this.destroyed = true;
        }

        /**
         * Asks the API if its destructor has been called
         * @return {void}
         */

    }, {
        key: 'isDestroyed',
        value: function isDestroyed() {
            return this.destroyed;
        }

        /**
         * Base URL for api
         *
         * @return {string} base url
         */

    }, {
        key: 'getBaseUrl',
        value: function getBaseUrl() {
            var suffix = this.apiHost.endsWith('/') ? '2.0' : '/2.0';
            return '' + this.apiHost + suffix;
        }

        /**
         * Gets the cache instance
         *
         * @return {Cache} cache instance
         */

    }, {
        key: 'getCache',
        value: function getCache() {
            return this.cache;
        }
    }]);

    return Base;
}();

export default Base;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJhc2UuanMiXSwibmFtZXMiOlsiWGhyIiwiQ2FjaGUiLCJERUZBVUxUX0hPU1ROQU1FX0FQSSIsIkRFRkFVTFRfSE9TVE5BTUVfVVBMT0FEIiwiQmFzZSIsIm9wdGlvbnMiLCJjYWNoZSIsImFwaUhvc3QiLCJ1cGxvYWRIb3N0IiwiT2JqZWN0IiwiYXNzaWduIiwieGhyIiwiZGVzdHJveWVkIiwic3VmZml4IiwiZW5kc1dpdGgiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7O0FBTUEsT0FBT0EsR0FBUCxNQUFnQixhQUFoQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsZUFBbEI7QUFDQSxTQUFTQyxvQkFBVCxFQUErQkMsdUJBQS9CLFFBQThELGNBQTlEOztJQUdNQyxJOztBQStCRjs7Ozs7Ozs7Ozs7OztBQVZBOzs7OztBQVZBOzs7O0FBVkE7OztBQXlDQSxvQkFBbUM7QUFBQSxZQUF2QkMsT0FBdUIsdUVBQUosRUFBSTs7QUFBQTs7QUFDL0IsYUFBS0MsS0FBTCxHQUFhRCxRQUFRQyxLQUFSLElBQWlCLElBQUlMLEtBQUosRUFBOUI7QUFDQSxhQUFLTSxPQUFMLEdBQWVGLFFBQVFFLE9BQVIsSUFBbUJMLG9CQUFsQztBQUNBLGFBQUtNLFVBQUwsR0FBa0JILFFBQVFHLFVBQVIsSUFBc0JMLHVCQUF4QztBQUNBLGFBQUtFLE9BQUwsR0FBZUksT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JMLE9BQWxCLEVBQTJCO0FBQ3RDRSxxQkFBUyxLQUFLQSxPQUR3QjtBQUV0Q0Msd0JBQVksS0FBS0EsVUFGcUI7QUFHdENGLG1CQUFPLEtBQUtBO0FBSDBCLFNBQTNCLENBQWY7QUFLQSxhQUFLSyxHQUFMLEdBQVcsSUFBSVgsR0FBSixDQUFRLEtBQUtLLE9BQWIsQ0FBWDtBQUNBLGFBQUtPLFNBQUwsR0FBaUIsS0FBakI7QUFDSDs7QUFFRDs7Ozs7OztBQTdCQTs7Ozs7QUFWQTs7Ozs7QUFWQTs7Ozs7OztrQ0FzRGdCO0FBQ1osaUJBQUtBLFNBQUwsR0FBaUIsSUFBakI7QUFDSDs7QUFFRDs7Ozs7OztzQ0FJdUI7QUFDbkIsbUJBQU8sS0FBS0EsU0FBWjtBQUNIOztBQUVEOzs7Ozs7OztxQ0FLcUI7QUFDakIsZ0JBQU1DLFNBQWlCLEtBQUtOLE9BQUwsQ0FBYU8sUUFBYixDQUFzQixHQUF0QixJQUE2QixLQUE3QixHQUFxQyxNQUE1RDtBQUNBLHdCQUFVLEtBQUtQLE9BQWYsR0FBeUJNLE1BQXpCO0FBQ0g7O0FBRUQ7Ozs7Ozs7O21DQUtrQjtBQUNkLG1CQUFPLEtBQUtQLEtBQVo7QUFDSDs7Ozs7O0FBR0wsZUFBZUYsSUFBZiIsImZpbGUiOiJCYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEJhc2UgY2xhc3Mgd2l0aCB1dGlsaXR5IG1ldGhvZHMgZm9yIEFQSSBjYWxsc1xyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBYaHIgZnJvbSAnLi4vdXRpbC9YaHInO1xyXG5pbXBvcnQgQ2FjaGUgZnJvbSAnLi4vdXRpbC9DYWNoZSc7XHJcbmltcG9ydCB7IERFRkFVTFRfSE9TVE5BTUVfQVBJLCBERUZBVUxUX0hPU1ROQU1FX1VQTE9BRCB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB0eXBlIHsgT3B0aW9ucyB9IGZyb20gJy4uL2Zsb3dUeXBlcyc7XHJcblxyXG5jbGFzcyBCYXNlIHtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtDYWNoZX1cclxuICAgICAqL1xyXG4gICAgY2FjaGU6IENhY2hlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBkZXN0cm95ZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge1hocn1cclxuICAgICAqL1xyXG4gICAgeGhyOiBYaHI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgYXBpSG9zdDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHVwbG9hZEhvc3Q6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7Kn1cclxuICAgICAqL1xyXG4gICAgb3B0aW9uczogT3B0aW9ucztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFtjb25zdHJ1Y3Rvcl1cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMudG9rZW5dIC0gQXV0aCB0b2tlblxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnNoYXJlZExpbmtdIC0gU2hhcmVkIGxpbmtcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5zaGFyZWRMaW5rUGFzc3dvcmRdIC0gU2hhcmVkIGxpbmsgcGFzc3dvcmRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5hcGlIb3N0XSAtIEFwaSBob3N0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMudXBsb2FkSG9zdF0gLSBVcGxvYWQgaG9zdCBuYW1lXHJcbiAgICAgKiBAcmV0dXJuIHtCYXNlfSBCYXNlIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuY2FjaGUgPSBvcHRpb25zLmNhY2hlIHx8IG5ldyBDYWNoZSgpO1xyXG4gICAgICAgIHRoaXMuYXBpSG9zdCA9IG9wdGlvbnMuYXBpSG9zdCB8fCBERUZBVUxUX0hPU1ROQU1FX0FQSTtcclxuICAgICAgICB0aGlzLnVwbG9hZEhvc3QgPSBvcHRpb25zLnVwbG9hZEhvc3QgfHwgREVGQVVMVF9IT1NUTkFNRV9VUExPQUQ7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge1xyXG4gICAgICAgICAgICBhcGlIb3N0OiB0aGlzLmFwaUhvc3QsXHJcbiAgICAgICAgICAgIHVwbG9hZEhvc3Q6IHRoaXMudXBsb2FkSG9zdCxcclxuICAgICAgICAgICAgY2FjaGU6IHRoaXMuY2FjaGVcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnhociA9IG5ldyBYaHIodGhpcy5vcHRpb25zKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3llZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogW2Rlc3RydWN0b3JdXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBc2tzIHRoZSBBUEkgaWYgaXRzIGRlc3RydWN0b3IgaGFzIGJlZW4gY2FsbGVkXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBpc0Rlc3Ryb3llZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kZXN0cm95ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCYXNlIFVSTCBmb3IgYXBpXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBiYXNlIHVybFxyXG4gICAgICovXHJcbiAgICBnZXRCYXNlVXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qgc3VmZml4OiBzdHJpbmcgPSB0aGlzLmFwaUhvc3QuZW5kc1dpdGgoJy8nKSA/ICcyLjAnIDogJy8yLjAnO1xyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLmFwaUhvc3R9JHtzdWZmaXh9YDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGNhY2hlIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Q2FjaGV9IGNhY2hlIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIGdldENhY2hlKCk6IENhY2hlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcclxuIl19