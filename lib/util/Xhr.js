var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 
 * @file Network utilities
 * @author Box
 */

import 'whatwg-fetch';
import { stringify } from 'querystring';


var HEADER_CLIENT_NAME = 'X-Box-Client-Name';
var HEADER_CLIENT_VERSION = 'X-Box-Client-Version';
var CONTENT_TYPE_HEADER = 'Content-Type';
var SUCCESS_RESPONSE_FILTER = function SUCCESS_RESPONSE_FILTER(_ref) {
    var response = _ref.response;
    return response;
};
var error = new Error('Bad id or auth token!');

var Xhr = function () {

    /**
     * [constructor]
     *
     * @param {Object} options
     * @param {string} options.id - item id
     * @param {string} options.clientName - Client Name
     * @param {string|function} options.token - Auth token
     * @param {string} [options.sharedLink] - Shared link
     * @param {string} [options.sharedLinkPassword] - Shared link password
     * @return {Xhr} Cache instance
     */
    function Xhr() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            id = _ref2.id,
            clientName = _ref2.clientName,
            token = _ref2.token,
            version = _ref2.version,
            sharedLink = _ref2.sharedLink,
            sharedLinkPassword = _ref2.sharedLinkPassword,
            responseFilter = _ref2.responseFilter;

        _classCallCheck(this, Xhr);

        this.id = id;
        this.token = token;
        this.clientName = clientName;
        this.version = version;
        this.sharedLink = sharedLink;
        this.sharedLinkPassword = sharedLinkPassword;
        this.responseFilter = typeof responseFilter === 'function' ? responseFilter : SUCCESS_RESPONSE_FILTER;

        // Tokens should either be null or undefuned or string or functions
        // Anything else is not supported and throw error
        if (token !== null && token !== undefined && typeof token !== 'string' && typeof token !== 'function') {
            throw error;
        }
    }

    /**
     * Helper function to convert HTTP status codes into throwable errors
     *
     * @param {Response} response - fetch's Response object
     * @throws {Error} - Throws when the HTTP status is not 2XX
     * @return {Response} - Pass-thru the response if ther are no errors
     */


    _createClass(Xhr, [{
        key: 'applyResponseFiltering',


        /**
         * Function that applies filtering
         *
         * @param {Object} data - JS Object representation of JSON data to send
         * @return {string} - Stringifyed data
         */
        value: function applyResponseFiltering(url, method, body) {
            var _this = this;

            var a = document.createElement('a');
            a.href = url;

            return function (response) {
                var filteredResponse = _this.responseFilter({
                    request: {
                        method: method,
                        url: url,
                        body: body,
                        api: url.replace(a.origin + '/2.0', ''),
                        host: a.host,
                        hostname: a.hostname,
                        pathname: a.pathname,
                        origin: a.origin,
                        protocol: a.protocol,
                        search: a.search,
                        hash: a.hash,
                        port: a.port
                    },
                    response: response
                });
                return filteredResponse instanceof Promise ? filteredResponse : Promise.resolve(filteredResponse);
            };
        }

        /**
         * The token can either be a simple string or a function that returns
         * a promise which resolves to a key value map where key is the file
         * id and value is the token. The function accepts either a simple id
         * or an array of file ids
         *
         * @private
         * @param {string} [id] - Optional box item id
         * @return {Promise} that resolves to a token
         */

    }, {
        key: 'getToken',
        value: function getToken(id) {
            var _this2 = this;

            var itemId = id || this.id || '';

            // Make sure we are getting typed ids
            if (!itemId.includes('_')) {
                return Promise.reject(error);
            }

            if (!this.token || typeof this.token === 'string') {
                // Token is a simple string or null or undefined
                return Promise.resolve(this.token);
            }

            // Token is a function which returns a promise
            // that on resolution returns an id to token map.
            return new Promise(function (resolve, reject) {
                // $FlowFixMe Nulls and strings already checked above
                _this2.token(itemId).then(function (token) {
                    if (typeof token === 'string') {
                        resolve(token);
                    } else if ((typeof token === 'undefined' ? 'undefined' : _typeof(token)) === 'object' && !!token[itemId]) {
                        resolve(token[itemId]);
                    } else {
                        reject(error);
                    }
                }).catch(reject);
            });
        }

        /**
         * Builds a list of required XHR headers.
         *
         * @param {string} [id] - Optional box item id
         * @param {Object} [args] - Optional existing headers
         * @return {Object} Headers
         */

    }, {
        key: 'getHeaders',
        value: function getHeaders(id) {
            var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var headers = Object.assign(_defineProperty({
                Accept: 'application/json'
            }, CONTENT_TYPE_HEADER, 'application/json'), args);

            if (this.sharedLink) {
                headers.BoxApi = 'shared_link=' + this.sharedLink;

                if (this.sharedLinkPassword) {
                    headers.BoxApi = headers.BoxApi + '&shared_link_password=' + this.sharedLinkPassword;
                }
            }
            if (this.clientName) {
                headers[HEADER_CLIENT_NAME] = this.clientName;
            }
            if (this.version) {
                headers[HEADER_CLIENT_VERSION] = this.version;
            }

            return this.getToken(id).then(function (token) {
                if (token) {
                    // Only add a token when there was one found
                    headers.Authorization = 'Bearer ' + token;
                }
                return headers;
            }).catch(function () {
                throw error;
            });
        }

        /**
         * HTTP GETs a URL
         *
         * @param {string} id - Box item id
         * @param {string} url - The URL to fetch
         * @param {Object} [headers] - Key-value map of headers
         * @param {Object} [params] - Key-value map of querystring params
         * @return {Promise} - HTTP response
         */

    }, {
        key: 'get',
        value: function get(_ref3) {
            var _this3 = this;

            var url = _ref3.url,
                id = _ref3.id,
                _ref3$params = _ref3.params,
                params = _ref3$params === undefined ? {} : _ref3$params,
                _ref3$headers = _ref3.headers,
                headers = _ref3$headers === undefined ? {} : _ref3$headers;

            var querystring = stringify(params);
            var fullUrl = querystring.length > 0 ? url + '?' + querystring : url;

            return this.getHeaders(id, headers).then(function (hdrs) {
                return fetch(fullUrl, { headers: hdrs, mode: 'cors' }).then(Xhr.checkStatus).then(Xhr.parseJSON).then(_this3.applyResponseFiltering(fullUrl, 'GET'));
            });
        }

        /**
         * HTTP POSTs a URL with JSON data
         *
         * @param {string} id - Box item id
         * @param {string} url - The URL to fetch
         * @param {Object} data - JS Object representation of JSON data to send
         * @param {Object} [headers] - Key-value map of headers
         * @param {string} [method] - xhr type
         * @return {Promise} - HTTP response
         */

    }, {
        key: 'post',
        value: function post(_ref4) {
            var _this4 = this;

            var url = _ref4.url,
                id = _ref4.id,
                _ref4$data = _ref4.data,
                data = _ref4$data === undefined ? {} : _ref4$data,
                _ref4$headers = _ref4.headers,
                headers = _ref4$headers === undefined ? {} : _ref4$headers,
                _ref4$method = _ref4.method,
                method = _ref4$method === undefined ? 'POST' : _ref4$method;

            return this.getHeaders(id, headers).then(function (hdrs) {
                return fetch(url, {
                    method: method,
                    headers: hdrs,
                    body: Xhr.stringifyData(data)
                }).then(Xhr.checkStatus).then(Xhr.parseJSON).then(_this4.applyResponseFiltering(url, method, data));
            });
        }

        /**
         * HTTP PUTs a URL with JSON data
         *
         * @param {string} id - Box item id
         * @param {string} url - The URL to fetch
         * @param {Object} data - JS Object representation of JSON data to send
         * @param {Object} [headers] - Key-value map of headers
         * @return {Promise} - HTTP response
         */

    }, {
        key: 'put',
        value: function put(_ref5) {
            var url = _ref5.url,
                id = _ref5.id,
                _ref5$data = _ref5.data,
                data = _ref5$data === undefined ? {} : _ref5$data,
                _ref5$headers = _ref5.headers,
                headers = _ref5$headers === undefined ? {} : _ref5$headers;

            return this.post({ id: id, url: url, data: data, headers: headers, method: 'PUT' });
        }

        /**
         * HTTP DELETEs a URL with JSON data
         *
         * @param {string} id - Box item id
         * @param {string} url - The URL to fetch
         * @param {Object} data - JS Object representation of JSON data to send
         * @param {Object} [headers] - Key-value map of headers
         * @return {Promise} - HTTP response
         */

    }, {
        key: 'delete',
        value: function _delete(_ref6) {
            var url = _ref6.url,
                id = _ref6.id,
                _ref6$data = _ref6.data,
                data = _ref6$data === undefined ? {} : _ref6$data,
                _ref6$headers = _ref6.headers,
                headers = _ref6$headers === undefined ? {} : _ref6$headers;

            return this.post({ id: id, url: url, data: data, headers: headers, method: 'DELETE' });
        }

        /**
         * HTTP OPTIONs a URL with JSON data.
         *
         * @param {string} id - Box item id
         * @param {string} url - The URL to post to
         * @param {Object} data - The non-file post data that should accompany the post
         * @param {Object} [headers] - Key-value map of headers
         * @param {Function} successHandler - Load success handler
         * @param {Function} errorHandler - Error handler
         * @returns {void}
         */

    }, {
        key: 'options',
        value: function options(_ref7) {
            var id = _ref7.id,
                url = _ref7.url,
                data = _ref7.data,
                _ref7$headers = _ref7.headers,
                headers = _ref7$headers === undefined ? {} : _ref7$headers,
                successHandler = _ref7.successHandler,
                errorHandler = _ref7.errorHandler;

            return this.getHeaders(id, headers).then(function (hdrs) {
                return fetch(url, {
                    method: 'OPTIONS',
                    headers: hdrs,
                    body: Xhr.stringifyData(data)
                }).then(Xhr.parseJSON).then(function (response) {
                    if (response.type === 'error') {
                        errorHandler(response);
                    } else {
                        successHandler(response);
                    }
                }).catch(errorHandler);
            });
        }

        /**
         * HTTP POST or PUT a URL with File data. Uses native XHR for progress event.
         *
         * @param {string} id - Box item id
         * @param {string} url - The URL to post to
         * @param {Object} [data] - File data and attributes
         * @param {Object} [headers] - Key-value map of headers
         * @param {string} [method] - XHR method, supports 'POST' and 'PUT'
         * @param {Function} successHandler - Load success handler
         * @param {Function} errorHandler - Error handler
         * @param {Function} progressHandler - Progress handler
         * @return {void}
         */

    }, {
        key: 'uploadFile',
        value: function uploadFile(_ref8) {
            var _this5 = this;

            var id = _ref8.id,
                url = _ref8.url,
                data = _ref8.data,
                _ref8$headers = _ref8.headers,
                headers = _ref8$headers === undefined ? {} : _ref8$headers,
                _ref8$method = _ref8.method,
                method = _ref8$method === undefined ? 'POST' : _ref8$method,
                successHandler = _ref8.successHandler,
                errorHandler = _ref8.errorHandler,
                progressHandler = _ref8.progressHandler;

            var formData = void 0;
            if (data && !(data instanceof Blob) && data.attributes) {
                formData = new FormData();
                Object.keys(data).forEach(function (key) {
                    // $FlowFixMe Already checked above
                    formData.append(key, data[key]);
                });
            }

            return this.getHeaders(id, headers).then(function (hdrs) {
                // Remove Accept/Content-Type added by getHeaders()
                delete hdrs.Accept;
                delete hdrs[CONTENT_TYPE_HEADER];

                if (headers[CONTENT_TYPE_HEADER]) {
                    hdrs[CONTENT_TYPE_HEADER] = headers[CONTENT_TYPE_HEADER];
                }

                _this5.xhr = new XMLHttpRequest();
                _this5.xhr.open(method, url, true);

                Object.keys(hdrs).forEach(function (header) {
                    _this5.xhr.setRequestHeader(header, hdrs[header]);
                });

                _this5.xhr.addEventListener('load', function () {
                    var _xhr = _this5.xhr,
                        readyState = _xhr.readyState,
                        status = _xhr.status,
                        responseText = _xhr.responseText;

                    if (readyState === XMLHttpRequest.DONE) {
                        var response = status === 204 ? responseText : JSON.parse(responseText);
                        if (status >= 200 && status < 300) {
                            successHandler(response);
                        } else {
                            errorHandler(response);
                        }
                    }
                });

                _this5.xhr.addEventListener('error', errorHandler);

                if (progressHandler && _this5.xhr.upload) {
                    _this5.xhr.upload.addEventListener('progress', progressHandler);
                }

                if (formData) {
                    _this5.xhr.send(formData);
                } else {
                    _this5.xhr.send(data);
                }
            }).catch(errorHandler);
        }

        /**
         * Aborts a request made with native XHR. Currently, this only
         * works for aborting a file upload.
         *
         * @return {void}
         */

    }, {
        key: 'abort',
        value: function abort() {
            if (!this.xhr) {
                return;
            }

            // readyState is set to UNSENT if request has already been aborted
            var readyState = this.xhr.readyState;

            if (readyState !== XMLHttpRequest.UNSENT && readyState !== XMLHttpRequest.DONE) {
                this.xhr.abort();
            }
        }
    }], [{
        key: 'checkStatus',
        value: function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response;
            }

            var err = new Error(response.statusText);
            err.response = response;
            throw err;
        }

        /**
         * Gets the JSON from a response if the response is not 204
         *
         * @param {Response} response - fetch's Response object
         * @return {Object} JS Object representation of the JSON response or the response
         */

    }, {
        key: 'parseJSON',
        value: function parseJSON(response) {
            // Return plain response if it is 202 or 204 since they don't have a body
            if (response.status === 202 || response.status === 204) {
                return response;
            }
            return response.json();
        }

        /**
         * Helper function to convert HTTP status codes into throwable errors
         *
         * @param {Object} data - JS Object representation of JSON data to send
         * @return {string} - Stringifyed data
         */

    }, {
        key: 'stringifyData',
        value: function stringifyData(data) {
            return JSON.stringify(data).replace(/"\s+|\s+"/g, '"');
        }
    }]);

    return Xhr;
}();

export default Xhr;