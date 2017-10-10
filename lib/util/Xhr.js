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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlhoci5qcyJdLCJuYW1lcyI6WyJzdHJpbmdpZnkiLCJIRUFERVJfQ0xJRU5UX05BTUUiLCJIRUFERVJfQ0xJRU5UX1ZFUlNJT04iLCJDT05URU5UX1RZUEVfSEVBREVSIiwiU1VDQ0VTU19SRVNQT05TRV9GSUxURVIiLCJyZXNwb25zZSIsImVycm9yIiwiRXJyb3IiLCJYaHIiLCJpZCIsImNsaWVudE5hbWUiLCJ0b2tlbiIsInZlcnNpb24iLCJzaGFyZWRMaW5rIiwic2hhcmVkTGlua1Bhc3N3b3JkIiwicmVzcG9uc2VGaWx0ZXIiLCJ1bmRlZmluZWQiLCJ1cmwiLCJtZXRob2QiLCJib2R5IiwiYSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImhyZWYiLCJmaWx0ZXJlZFJlc3BvbnNlIiwicmVxdWVzdCIsImFwaSIsInJlcGxhY2UiLCJvcmlnaW4iLCJob3N0IiwiaG9zdG5hbWUiLCJwYXRobmFtZSIsInByb3RvY29sIiwic2VhcmNoIiwiaGFzaCIsInBvcnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsIml0ZW1JZCIsImluY2x1ZGVzIiwicmVqZWN0IiwidGhlbiIsImNhdGNoIiwiYXJncyIsImhlYWRlcnMiLCJPYmplY3QiLCJhc3NpZ24iLCJBY2NlcHQiLCJCb3hBcGkiLCJnZXRUb2tlbiIsIkF1dGhvcml6YXRpb24iLCJwYXJhbXMiLCJxdWVyeXN0cmluZyIsImZ1bGxVcmwiLCJsZW5ndGgiLCJnZXRIZWFkZXJzIiwiaGRycyIsImZldGNoIiwibW9kZSIsImNoZWNrU3RhdHVzIiwicGFyc2VKU09OIiwiYXBwbHlSZXNwb25zZUZpbHRlcmluZyIsImRhdGEiLCJzdHJpbmdpZnlEYXRhIiwicG9zdCIsInN1Y2Nlc3NIYW5kbGVyIiwiZXJyb3JIYW5kbGVyIiwidHlwZSIsInByb2dyZXNzSGFuZGxlciIsImZvcm1EYXRhIiwiQmxvYiIsImF0dHJpYnV0ZXMiLCJGb3JtRGF0YSIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXBwZW5kIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwiaGVhZGVyIiwic2V0UmVxdWVzdEhlYWRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0IiwiRE9ORSIsIkpTT04iLCJwYXJzZSIsInVwbG9hZCIsInNlbmQiLCJVTlNFTlQiLCJhYm9ydCIsImVyciIsInN0YXR1c1RleHQiLCJqc29uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7QUFNQSxPQUFPLGNBQVA7QUFDQSxTQUFTQSxTQUFULFFBQTBCLGFBQTFCOzs7QUFHQSxJQUFNQyxxQkFBcUIsbUJBQTNCO0FBQ0EsSUFBTUMsd0JBQXdCLHNCQUE5QjtBQUNBLElBQU1DLHNCQUFzQixjQUE1QjtBQUNBLElBQU1DLDBCQUEwQixTQUExQkEsdUJBQTBCO0FBQUEsUUFBR0MsUUFBSCxRQUFHQSxRQUFIO0FBQUEsV0FBa0JBLFFBQWxCO0FBQUEsQ0FBaEM7QUFDQSxJQUFNQyxRQUFRLElBQUlDLEtBQUosQ0FBVSx1QkFBVixDQUFkOztJQUVNQyxHOztBQVVGOzs7Ozs7Ozs7OztBQVdBLG1CQUE4RztBQUFBLHdGQUFKLEVBQUk7QUFBQSxZQUFoR0MsRUFBZ0csU0FBaEdBLEVBQWdHO0FBQUEsWUFBNUZDLFVBQTRGLFNBQTVGQSxVQUE0RjtBQUFBLFlBQWhGQyxLQUFnRixTQUFoRkEsS0FBZ0Y7QUFBQSxZQUF6RUMsT0FBeUUsU0FBekVBLE9BQXlFO0FBQUEsWUFBaEVDLFVBQWdFLFNBQWhFQSxVQUFnRTtBQUFBLFlBQXBEQyxrQkFBb0QsU0FBcERBLGtCQUFvRDtBQUFBLFlBQWhDQyxjQUFnQyxTQUFoQ0EsY0FBZ0M7O0FBQUE7O0FBQzFHLGFBQUtOLEVBQUwsR0FBVUEsRUFBVjtBQUNBLGFBQUtFLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQUtELFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsYUFBS0UsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0MsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxhQUFLQyxrQkFB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LG1CQUFPQSxTQUFTMEYsSUFBVCxFQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7OztzQ0FNcUJqQyxJLEVBQTRCO0FBQzdDLG1CQUFPeUIsS0FBS3ZGLFNBQUwsQ0FBZThELElBQWYsRUFBcUJuQyxPQUFyQixDQUE2QixZQUE3QixFQUEyQyxHQUEzQyxDQUFQO0FBQ0g7Ozs7OztBQTJYTCxlQUFlbkIsR0FBZiIsImZpbGUiOiJYaHIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgTmV0d29yayB1dGlsaXRpZXNcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgJ3doYXR3Zy1mZXRjaCc7XHJcbmltcG9ydCB7IHN0cmluZ2lmeSB9IGZyb20gJ3F1ZXJ5c3RyaW5nJztcclxuaW1wb3J0IHR5cGUgeyBNZXRob2QsIFN0cmluZ01hcCwgU3RyaW5nQW55TWFwLCBPcHRpb25zLCBUb2tlbiB9IGZyb20gJy4uL2Zsb3dUeXBlcyc7XHJcblxyXG5jb25zdCBIRUFERVJfQ0xJRU5UX05BTUUgPSAnWC1Cb3gtQ2xpZW50LU5hbWUnO1xyXG5jb25zdCBIRUFERVJfQ0xJRU5UX1ZFUlNJT04gPSAnWC1Cb3gtQ2xpZW50LVZlcnNpb24nO1xyXG5jb25zdCBDT05URU5UX1RZUEVfSEVBREVSID0gJ0NvbnRlbnQtVHlwZSc7XHJcbmNvbnN0IFNVQ0NFU1NfUkVTUE9OU0VfRklMVEVSID0gKHsgcmVzcG9uc2UgfSkgPT4gcmVzcG9uc2U7XHJcbmNvbnN0IGVycm9yID0gbmV3IEVycm9yKCdCYWQgaWQgb3IgYXV0aCB0b2tlbiEnKTtcclxuXHJcbmNsYXNzIFhociB7XHJcbiAgICBpZDogP3N0cmluZztcclxuICAgIGNsaWVudE5hbWU6ID9zdHJpbmc7XHJcbiAgICB0b2tlbjogP1Rva2VuO1xyXG4gICAgdmVyc2lvbjogP3N0cmluZztcclxuICAgIHNoYXJlZExpbms6ID9zdHJpbmc7XHJcbiAgICBzaGFyZWRMaW5rUGFzc3dvcmQ6ID9zdHJpbmc7XHJcbiAgICB4aHI6IFhNTEh0dHBSZXF1ZXN0O1xyXG4gICAgcmVzcG9uc2VGaWx0ZXI6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogW2NvbnN0cnVjdG9yXVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pZCAtIGl0ZW0gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNsaWVudE5hbWUgLSBDbGllbnQgTmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8ZnVuY3Rpb259IG9wdGlvbnMudG9rZW4gLSBBdXRoIHRva2VuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuc2hhcmVkTGlua10gLSBTaGFyZWQgbGlua1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnNoYXJlZExpbmtQYXNzd29yZF0gLSBTaGFyZWQgbGluayBwYXNzd29yZFxyXG4gICAgICogQHJldHVybiB7WGhyfSBDYWNoZSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih7IGlkLCBjbGllbnROYW1lLCB0b2tlbiwgdmVyc2lvbiwgc2hhcmVkTGluaywgc2hhcmVkTGlua1Bhc3N3b3JkLCByZXNwb25zZUZpbHRlciB9OiBPcHRpb25zID0ge30pIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuO1xyXG4gICAgICAgIHRoaXMuY2xpZW50TmFtZSA9IGNsaWVudE5hbWU7XHJcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcclxuICAgICAgICB0aGlzLnNoYXJlZExpbmsgPSBzaGFyZWRMaW5rO1xyXG4gICAgICAgIHRoaXMuc2hhcmVkTGlua1Bhc3N3b3JkID0gc2hhcmVkTGlua1Bhc3N3b3JkO1xyXG4gICAgICAgIHRoaXMucmVzcG9uc2VGaWx0ZXIgPSB0eXBlb2YgcmVzcG9uc2VGaWx0ZXIgPT09ICdmdW5jdGlvbicgPyByZXNwb25zZUZpbHRlciA6IFNVQ0NFU1NfUkVTUE9OU0VfRklMVEVSO1xyXG5cclxuICAgICAgICAvLyBUb2tlbnMgc2hvdWxkIGVpdGhlciBiZSBudWxsIG9yIHVuZGVmdW5lZCBvciBzdHJpbmcgb3IgZnVuY3Rpb25zXHJcbiAgICAgICAgLy8gQW55dGhpbmcgZWxzZSBpcyBub3Qgc3VwcG9ydGVkIGFuZCB0aHJvdyBlcnJvclxyXG4gICAgICAgIGlmICh0b2tlbiAhPT0gbnVsbCAmJiB0b2tlbiAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB0b2tlbiAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIHRva2VuICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhlbHBlciBmdW5jdGlvbiB0byBjb252ZXJ0IEhUVFAgc3RhdHVzIGNvZGVzIGludG8gdGhyb3dhYmxlIGVycm9yc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc3BvbnNlIC0gZmV0Y2gncyBSZXNwb25zZSBvYmplY3RcclxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSAtIFRocm93cyB3aGVuIHRoZSBIVFRQIHN0YXR1cyBpcyBub3QgMlhYXHJcbiAgICAgKiBAcmV0dXJuIHtSZXNwb25zZX0gLSBQYXNzLXRocnUgdGhlIHJlc3BvbnNlIGlmIHRoZXIgYXJlIG5vIGVycm9yc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2hlY2tTdGF0dXMocmVzcG9uc2U6IFJlc3BvbnNlKTogUmVzcG9uc2Uge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDMwMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBlcnI6IGFueSA9IG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KTtcclxuICAgICAgICBlcnIucmVzcG9uc2UgPSByZXNwb25zZTtcclxuICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBKU09OIGZyb20gYSByZXNwb25zZSBpZiB0aGUgcmVzcG9uc2UgaXMgbm90IDIwNFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc3BvbnNlIC0gZmV0Y2gncyBSZXNwb25zZSBvYmplY3RcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gSlMgT2JqZWN0IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBKU09OIHJlc3BvbnNlIG9yIHRoZSByZXNwb25zZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcGFyc2VKU09OKHJlc3BvbnNlOiBSZXNwb25zZSk6IFJlc3BvbnNlIHwgUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAvLyBSZXR1cm4gcGxhaW4gcmVzcG9uc2UgaWYgaXQgaXMgMjAyIG9yIDIwNCBzaW5jZSB0aGV5IGRvbid0IGhhdmUgYSBib2R5XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAyIHx8IHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhlbHBlciBmdW5jdGlvbiB0byBjb252ZXJ0IEhUVFAgc3RhdHVzIGNvZGVzIGludG8gdGhyb3dhYmxlIGVycm9yc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gSlMgT2JqZWN0IHJlcHJlc2VudGF0aW9uIG9mIEpTT04gZGF0YSB0byBzZW5kXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gU3RyaW5naWZ5ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc3RyaW5naWZ5RGF0YShkYXRhOiBTdHJpbmdBbnlNYXApOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKS5yZXBsYWNlKC9cIlxccyt8XFxzK1wiL2csICdcIicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdGhhdCBhcHBsaWVzIGZpbHRlcmluZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gSlMgT2JqZWN0IHJlcHJlc2VudGF0aW9uIG9mIEpTT04gZGF0YSB0byBzZW5kXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gU3RyaW5naWZ5ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBhcHBseVJlc3BvbnNlRmlsdGVyaW5nKHVybDogc3RyaW5nLCBtZXRob2Q6IE1ldGhvZCwgYm9keT86IFN0cmluZ0FueU1hcCk6IEZ1bmN0aW9uIHtcclxuICAgICAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgIGEuaHJlZiA9IHVybDtcclxuXHJcbiAgICAgICAgcmV0dXJuIChyZXNwb25zZTogU3RyaW5nQW55TWFwKTogUHJvbWlzZTxTdHJpbmdBbnlNYXA+ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRSZXNwb25zZSA9IHRoaXMucmVzcG9uc2VGaWx0ZXIoe1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZCxcclxuICAgICAgICAgICAgICAgICAgICB1cmwsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keSxcclxuICAgICAgICAgICAgICAgICAgICBhcGk6IHVybC5yZXBsYWNlKGAke2Eub3JpZ2lufS8yLjBgLCAnJyksXHJcbiAgICAgICAgICAgICAgICAgICAgaG9zdDogYS5ob3N0LFxyXG4gICAgICAgICAgICAgICAgICAgIGhvc3RuYW1lOiBhLmhvc3RuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiBhLnBhdGhuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbjogYS5vcmlnaW4sXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdG9jb2w6IGEucHJvdG9jb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoOiBhLnNlYXJjaCxcclxuICAgICAgICAgICAgICAgICAgICBoYXNoOiBhLmhhc2gsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9ydDogYS5wb3J0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZFJlc3BvbnNlIGluc3RhbmNlb2YgUHJvbWlzZSA/IGZpbHRlcmVkUmVzcG9uc2UgOiBQcm9taXNlLnJlc29sdmUoZmlsdGVyZWRSZXNwb25zZSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0b2tlbiBjYW4gZWl0aGVyIGJlIGEgc2ltcGxlIHN0cmluZyBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJuc1xyXG4gICAgICogYSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHRvIGEga2V5IHZhbHVlIG1hcCB3aGVyZSBrZXkgaXMgdGhlIGZpbGVcclxuICAgICAqIGlkIGFuZCB2YWx1ZSBpcyB0aGUgdG9rZW4uIFRoZSBmdW5jdGlvbiBhY2NlcHRzIGVpdGhlciBhIHNpbXBsZSBpZFxyXG4gICAgICogb3IgYW4gYXJyYXkgb2YgZmlsZSBpZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtpZF0gLSBPcHRpb25hbCBib3ggaXRlbSBpZFxyXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gdGhhdCByZXNvbHZlcyB0byBhIHRva2VuXHJcbiAgICAgKi9cclxuICAgIGdldFRva2VuKGlkPzogc3RyaW5nKTogUHJvbWlzZTw/c3RyaW5nPiB7XHJcbiAgICAgICAgY29uc3QgaXRlbUlkID0gaWQgfHwgdGhpcy5pZCB8fCAnJztcclxuXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGFyZSBnZXR0aW5nIHR5cGVkIGlkc1xyXG4gICAgICAgIGlmICghaXRlbUlkLmluY2x1ZGVzKCdfJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy50b2tlbiB8fCB0eXBlb2YgdGhpcy50b2tlbiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgLy8gVG9rZW4gaXMgYSBzaW1wbGUgc3RyaW5nIG9yIG51bGwgb3IgdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy50b2tlbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUb2tlbiBpcyBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYSBwcm9taXNlXHJcbiAgICAgICAgLy8gdGhhdCBvbiByZXNvbHV0aW9uIHJldHVybnMgYW4gaWQgdG8gdG9rZW4gbWFwLlxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZTogRnVuY3Rpb24sIHJlamVjdDogRnVuY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgLy8gJEZsb3dGaXhNZSBOdWxscyBhbmQgc3RyaW5ncyBhbHJlYWR5IGNoZWNrZWQgYWJvdmVcclxuICAgICAgICAgICAgdGhpcy50b2tlbihpdGVtSWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigodG9rZW4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ29iamVjdCcgJiYgISF0b2tlbltpdGVtSWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodG9rZW5baXRlbUlkXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCdWlsZHMgYSBsaXN0IG9mIHJlcXVpcmVkIFhIUiBoZWFkZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbaWRdIC0gT3B0aW9uYWwgYm94IGl0ZW0gaWRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbYXJnc10gLSBPcHRpb25hbCBleGlzdGluZyBoZWFkZXJzXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEhlYWRlcnNcclxuICAgICAqL1xyXG4gICAgZ2V0SGVhZGVycyhpZD86IHN0cmluZywgYXJnczogU3RyaW5nTWFwID0ge30pIHtcclxuICAgICAgICBjb25zdCBoZWFkZXJzOiBTdHJpbmdNYXAgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgIFtDT05URU5UX1RZUEVfSEVBREVSXTogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFyZ3NcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zaGFyZWRMaW5rKSB7XHJcbiAgICAgICAgICAgIGhlYWRlcnMuQm94QXBpID0gYHNoYXJlZF9saW5rPSR7dGhpcy5zaGFyZWRMaW5rfWA7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGFyZWRMaW5rUGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcnMuQm94QXBpID0gYCR7aGVhZGVycy5Cb3hBcGl9JnNoYXJlZF9saW5rX3Bhc3N3b3JkPSR7dGhpcy5zaGFyZWRMaW5rUGFzc3dvcmR9YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jbGllbnROYW1lKSB7XHJcbiAgICAgICAgICAgIGhlYWRlcnNbSEVBREVSX0NMSUVOVF9OQU1FXSA9IHRoaXMuY2xpZW50TmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudmVyc2lvbikge1xyXG4gICAgICAgICAgICBoZWFkZXJzW0hFQURFUl9DTElFTlRfVkVSU0lPTl0gPSB0aGlzLnZlcnNpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRUb2tlbihpZClcclxuICAgICAgICAgICAgLnRoZW4oKHRva2VuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IGFkZCBhIHRva2VuIHdoZW4gdGhlcmUgd2FzIG9uZSBmb3VuZFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIVFRQIEdFVHMgYSBVUkxcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBCb3ggaXRlbSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFRoZSBVUkwgdG8gZmV0Y2hcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbaGVhZGVyc10gLSBLZXktdmFsdWUgbWFwIG9mIGhlYWRlcnNcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIEtleS12YWx1ZSBtYXAgb2YgcXVlcnlzdHJpbmcgcGFyYW1zXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIEhUVFAgcmVzcG9uc2VcclxuICAgICAqL1xyXG4gICAgZ2V0KHtcclxuICAgICAgICB1cmwsXHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgcGFyYW1zID0ge30sXHJcbiAgICAgICAgaGVhZGVycyA9IHt9XHJcbiAgICB9OiB7XHJcbiAgICAgICAgdXJsOiBzdHJpbmcsXHJcbiAgICAgICAgaWQ/OiBzdHJpbmcsXHJcbiAgICAgICAgcGFyYW1zPzogU3RyaW5nQW55TWFwLFxyXG4gICAgICAgIGhlYWRlcnM/OiBTdHJpbmdNYXBcclxuICAgIH0pOiBQcm9taXNlPFN0cmluZ0FueU1hcD4ge1xyXG4gICAgICAgIGNvbnN0IHF1ZXJ5c3RyaW5nID0gc3RyaW5naWZ5KHBhcmFtcyk7XHJcbiAgICAgICAgY29uc3QgZnVsbFVybCA9IHF1ZXJ5c3RyaW5nLmxlbmd0aCA+IDAgPyBgJHt1cmx9PyR7cXVlcnlzdHJpbmd9YCA6IHVybDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SGVhZGVycyhpZCwgaGVhZGVycykudGhlbigoaGRycykgPT5cclxuICAgICAgICAgICAgZmV0Y2goZnVsbFVybCwgeyBoZWFkZXJzOiBoZHJzLCBtb2RlOiAnY29ycycgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKFhoci5jaGVja1N0YXR1cylcclxuICAgICAgICAgICAgICAgIC50aGVuKFhoci5wYXJzZUpTT04pXHJcbiAgICAgICAgICAgICAgICAudGhlbih0aGlzLmFwcGx5UmVzcG9uc2VGaWx0ZXJpbmcoZnVsbFVybCwgJ0dFVCcpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIVFRQIFBPU1RzIGEgVVJMIHdpdGggSlNPTiBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gQm94IGl0ZW0gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBUaGUgVVJMIHRvIGZldGNoXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIEpTIE9iamVjdCByZXByZXNlbnRhdGlvbiBvZiBKU09OIGRhdGEgdG8gc2VuZFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtoZWFkZXJzXSAtIEtleS12YWx1ZSBtYXAgb2YgaGVhZGVyc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFttZXRob2RdIC0geGhyIHR5cGVcclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gSFRUUCByZXNwb25zZVxyXG4gICAgICovXHJcbiAgICBwb3N0KHtcclxuICAgICAgICB1cmwsXHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgZGF0YSA9IHt9LFxyXG4gICAgICAgIGhlYWRlcnMgPSB7fSxcclxuICAgICAgICBtZXRob2QgPSAnUE9TVCdcclxuICAgIH06IHtcclxuICAgICAgICB1cmw6IHN0cmluZyxcclxuICAgICAgICBpZD86IHN0cmluZyxcclxuICAgICAgICBkYXRhPzogU3RyaW5nQW55TWFwLFxyXG4gICAgICAgIGhlYWRlcnM/OiBTdHJpbmdNYXAsXHJcbiAgICAgICAgbWV0aG9kPzogTWV0aG9kXHJcbiAgICB9KTogUHJvbWlzZTxTdHJpbmdBbnlNYXA+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRIZWFkZXJzKGlkLCBoZWFkZXJzKS50aGVuKChoZHJzKSA9PlxyXG4gICAgICAgICAgICBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZCxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhkcnMsXHJcbiAgICAgICAgICAgICAgICBib2R5OiBYaHIuc3RyaW5naWZ5RGF0YShkYXRhKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oWGhyLmNoZWNrU3RhdHVzKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oWGhyLnBhcnNlSlNPTilcclxuICAgICAgICAgICAgICAgIC50aGVuKHRoaXMuYXBwbHlSZXNwb25zZUZpbHRlcmluZyh1cmwsIG1ldGhvZCwgZGF0YSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhUVFAgUFVUcyBhIFVSTCB3aXRoIEpTT04gZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIEJveCBpdGVtIGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVGhlIFVSTCB0byBmZXRjaFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBKUyBPYmplY3QgcmVwcmVzZW50YXRpb24gb2YgSlNPTiBkYXRhIHRvIHNlbmRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbaGVhZGVyc10gLSBLZXktdmFsdWUgbWFwIG9mIGhlYWRlcnNcclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gSFRUUCByZXNwb25zZVxyXG4gICAgICovXHJcbiAgICBwdXQoe1xyXG4gICAgICAgIHVybCxcclxuICAgICAgICBpZCxcclxuICAgICAgICBkYXRhID0ge30sXHJcbiAgICAgICAgaGVhZGVycyA9IHt9XHJcbiAgICB9OiB7XHJcbiAgICAgICAgdXJsOiBzdHJpbmcsXHJcbiAgICAgICAgaWQ/OiBzdHJpbmcsXHJcbiAgICAgICAgZGF0YT86IFN0cmluZ0FueU1hcCxcclxuICAgICAgICBoZWFkZXJzPzogU3RyaW5nTWFwXHJcbiAgICB9KTogUHJvbWlzZTxTdHJpbmdBbnlNYXA+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3N0KHsgaWQsIHVybCwgZGF0YSwgaGVhZGVycywgbWV0aG9kOiAnUFVUJyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhUVFAgREVMRVRFcyBhIFVSTCB3aXRoIEpTT04gZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIEJveCBpdGVtIGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVGhlIFVSTCB0byBmZXRjaFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBKUyBPYmplY3QgcmVwcmVzZW50YXRpb24gb2YgSlNPTiBkYXRhIHRvIHNlbmRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbaGVhZGVyc10gLSBLZXktdmFsdWUgbWFwIG9mIGhlYWRlcnNcclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gSFRUUCByZXNwb25zZVxyXG4gICAgICovXHJcbiAgICBkZWxldGUoe1xyXG4gICAgICAgIHVybCxcclxuICAgICAgICBpZCxcclxuICAgICAgICBkYXRhID0ge30sXHJcbiAgICAgICAgaGVhZGVycyA9IHt9XHJcbiAgICB9OiB7XHJcbiAgICAgICAgdXJsOiBzdHJpbmcsXHJcbiAgICAgICAgaWQ/OiBzdHJpbmcsXHJcbiAgICAgICAgZGF0YT86IFN0cmluZ0FueU1hcCxcclxuICAgICAgICBoZWFkZXJzPzogU3RyaW5nTWFwXHJcbiAgICB9KTogUHJvbWlzZTxTdHJpbmdBbnlNYXA+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3N0KHsgaWQsIHVybCwgZGF0YSwgaGVhZGVycywgbWV0aG9kOiAnREVMRVRFJyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhUVFAgT1BUSU9OcyBhIFVSTCB3aXRoIEpTT04gZGF0YS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBCb3ggaXRlbSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFRoZSBVUkwgdG8gcG9zdCB0b1xyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBUaGUgbm9uLWZpbGUgcG9zdCBkYXRhIHRoYXQgc2hvdWxkIGFjY29tcGFueSB0aGUgcG9zdFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtoZWFkZXJzXSAtIEtleS12YWx1ZSBtYXAgb2YgaGVhZGVyc1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gc3VjY2Vzc0hhbmRsZXIgLSBMb2FkIHN1Y2Nlc3MgaGFuZGxlclxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZXJyb3JIYW5kbGVyIC0gRXJyb3IgaGFuZGxlclxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIG9wdGlvbnMoe1xyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIHVybCxcclxuICAgICAgICBkYXRhLFxyXG4gICAgICAgIGhlYWRlcnMgPSB7fSxcclxuICAgICAgICBzdWNjZXNzSGFuZGxlcixcclxuICAgICAgICBlcnJvckhhbmRsZXJcclxuICAgIH06IHtcclxuICAgICAgICB1cmw6IHN0cmluZyxcclxuICAgICAgICBkYXRhOiBTdHJpbmdBbnlNYXAsXHJcbiAgICAgICAgaWQ/OiBzdHJpbmcsXHJcbiAgICAgICAgaGVhZGVycz86IFN0cmluZ01hcCxcclxuICAgICAgICBzdWNjZXNzSGFuZGxlcjogRnVuY3Rpb24sXHJcbiAgICAgICAgZXJyb3JIYW5kbGVyOiBGdW5jdGlvbixcclxuICAgICAgICBwcm9ncmVzc0hhbmRsZXI/OiBGdW5jdGlvblxyXG4gICAgfSk6IFByb21pc2U8U3RyaW5nQW55TWFwPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SGVhZGVycyhpZCwgaGVhZGVycykudGhlbigoaGRycykgPT5cclxuICAgICAgICAgICAgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdPUFRJT05TJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhkcnMsXHJcbiAgICAgICAgICAgICAgICBib2R5OiBYaHIuc3RyaW5naWZ5RGF0YShkYXRhKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oWGhyLnBhcnNlSlNPTilcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZTogU3RyaW5nQW55TWFwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnR5cGUgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JIYW5kbGVyKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzSGFuZGxlcihyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvckhhbmRsZXIpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhUVFAgUE9TVCBvciBQVVQgYSBVUkwgd2l0aCBGaWxlIGRhdGEuIFVzZXMgbmF0aXZlIFhIUiBmb3IgcHJvZ3Jlc3MgZXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gQm94IGl0ZW0gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBUaGUgVVJMIHRvIHBvc3QgdG9cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbZGF0YV0gLSBGaWxlIGRhdGEgYW5kIGF0dHJpYnV0ZXNcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbaGVhZGVyc10gLSBLZXktdmFsdWUgbWFwIG9mIGhlYWRlcnNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbbWV0aG9kXSAtIFhIUiBtZXRob2QsIHN1cHBvcnRzICdQT1NUJyBhbmQgJ1BVVCdcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHN1Y2Nlc3NIYW5kbGVyIC0gTG9hZCBzdWNjZXNzIGhhbmRsZXJcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGVycm9ySGFuZGxlciAtIEVycm9yIGhhbmRsZXJcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHByb2dyZXNzSGFuZGxlciAtIFByb2dyZXNzIGhhbmRsZXJcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHVwbG9hZEZpbGUoe1xyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIHVybCxcclxuICAgICAgICBkYXRhLFxyXG4gICAgICAgIGhlYWRlcnMgPSB7fSxcclxuICAgICAgICBtZXRob2QgPSAnUE9TVCcsXHJcbiAgICAgICAgc3VjY2Vzc0hhbmRsZXIsXHJcbiAgICAgICAgZXJyb3JIYW5kbGVyLFxyXG4gICAgICAgIHByb2dyZXNzSGFuZGxlclxyXG4gICAgfToge1xyXG4gICAgICAgIHVybDogc3RyaW5nLFxyXG4gICAgICAgIGlkPzogc3RyaW5nLFxyXG4gICAgICAgIGRhdGE/OiA/QmxvYiB8ID9TdHJpbmdBbnlNYXAsXHJcbiAgICAgICAgaGVhZGVycz86IFN0cmluZ01hcCxcclxuICAgICAgICBtZXRob2Q/OiBNZXRob2QsXHJcbiAgICAgICAgc3VjY2Vzc0hhbmRsZXI6IEZ1bmN0aW9uLFxyXG4gICAgICAgIGVycm9ySGFuZGxlcjogRnVuY3Rpb24sXHJcbiAgICAgICAgcHJvZ3Jlc3NIYW5kbGVyOiBGdW5jdGlvblxyXG4gICAgfSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgbGV0IGZvcm1EYXRhO1xyXG4gICAgICAgIGlmIChkYXRhICYmICEoZGF0YSBpbnN0YW5jZW9mIEJsb2IpICYmIGRhdGEuYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICRGbG93Rml4TWUgQWxyZWFkeSBjaGVja2VkIGFib3ZlXHJcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEhlYWRlcnMoaWQsIGhlYWRlcnMpXHJcbiAgICAgICAgICAgIC50aGVuKChoZHJzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgQWNjZXB0L0NvbnRlbnQtVHlwZSBhZGRlZCBieSBnZXRIZWFkZXJzKClcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBoZHJzLkFjY2VwdDtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBoZHJzW0NPTlRFTlRfVFlQRV9IRUFERVJdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChoZWFkZXJzW0NPTlRFTlRfVFlQRV9IRUFERVJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGRyc1tDT05URU5UX1RZUEVfSEVBREVSXSA9IGhlYWRlcnNbQ09OVEVOVF9UWVBFX0hFQURFUl07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMueGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGhkcnMpLmZvckVhY2goKGhlYWRlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBoZHJzW2hlYWRlcl0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy54aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHJlYWR5U3RhdGUsIHN0YXR1cywgcmVzcG9uc2VUZXh0IH0gPSB0aGlzLnhocjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVhZHlTdGF0ZSA9PT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHN0YXR1cyA9PT0gMjA0ID8gcmVzcG9uc2VUZXh0IDogSlNPTi5wYXJzZShyZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NIYW5kbGVyKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ySGFuZGxlcihyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnhoci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9ySGFuZGxlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzSGFuZGxlciAmJiB0aGlzLnhoci51cGxvYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBwcm9ncmVzc0hhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChmb3JtRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueGhyLnNlbmQoZm9ybURhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnhoci5zZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3JIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFib3J0cyBhIHJlcXVlc3QgbWFkZSB3aXRoIG5hdGl2ZSBYSFIuIEN1cnJlbnRseSwgdGhpcyBvbmx5XHJcbiAgICAgKiB3b3JrcyBmb3IgYWJvcnRpbmcgYSBmaWxlIHVwbG9hZC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBhYm9ydCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMueGhyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJlYWR5U3RhdGUgaXMgc2V0IHRvIFVOU0VOVCBpZiByZXF1ZXN0IGhhcyBhbHJlYWR5IGJlZW4gYWJvcnRlZFxyXG4gICAgICAgIGNvbnN0IHsgcmVhZHlTdGF0ZSB9ID0gdGhpcy54aHI7XHJcbiAgICAgICAgaWYgKHJlYWR5U3RhdGUgIT09IFhNTEh0dHBSZXF1ZXN0LlVOU0VOVCAmJiByZWFkeVN0YXRlICE9PSBYTUxIdHRwUmVxdWVzdC5ET05FKSB7XHJcbiAgICAgICAgICAgIHRoaXMueGhyLmFib3J0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBYaHI7XHJcbiJdfQ==