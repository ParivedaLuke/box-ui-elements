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