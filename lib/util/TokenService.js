var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TOO_MANY_REQUESTS = 'Too many tokens requested at a single time!'; /**
                                                                        * 
                                                                        * @file An example of a token managing service
                                                                        * @author Box
                                                                        */

var REQUEST_LIMIT_HARD = 200;
var REQUEST_LIMIT = 100;

var TokenService = function () {

    /**
     * [constructor]
     *
     * @public
     * @param {string} url - token fetch url
     * @param {number} timeout - token timeout
     * @param {number|void} [requestLimit] - optional limits number of tokens fetched per request
     * @param {number|void} [hardLimit] - optional hard overall limit for number of tokens to fetch
     * @param {Object|void} [data] - optional data to send to auth end point
     * @param {Object|void} [headers] - optional headers to send to auth end point
     * @return {TokenService}
     */


    /**
     * @property {Object}
     */


    /**
     * @property {number}
     */


    /**
     * @property {string}
     */
    function TokenService(_ref) {
        var url = _ref.url,
            timeout = _ref.timeout,
            _ref$requestLimit = _ref.requestLimit,
            requestLimit = _ref$requestLimit === undefined ? REQUEST_LIMIT : _ref$requestLimit,
            _ref$hardLimit = _ref.hardLimit,
            hardLimit = _ref$hardLimit === undefined ? REQUEST_LIMIT_HARD : _ref$hardLimit,
            _ref$data = _ref.data,
            data = _ref$data === undefined ? {} : _ref$data,
            _ref$headers = _ref.headers,
            headers = _ref$headers === undefined ? {} : _ref$headers;

        _classCallCheck(this, TokenService);

        this.url = url;
        this.timeout = timeout;
        this.requestLimit = requestLimit;
        this.hardLimit = hardLimit;
        this.data = data;
        this.headers = Object.assign({
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }, headers);
        this.tokens = {};
    }

    /**
     * Returns the expiration date for tokens
     * Threshold is set to 90% of actual token timeout
     *
     * @private
     * @return {number}
     */


    /**
     * @property {Object}
     */


    /**
     * @property {number}
     */


    /**
     * @property {number}
     */

    /**
     * @property {Object}
     */


    _createClass(TokenService, [{
        key: 'getExpiration',
        value: function getExpiration() {
            return Date.now() + 0.9 * this.timeout;
        }

        /**
         * Cleans up any file tokens that have passed their expiration times
         *
         * @private
         * @param {string[]} ids - List of IDs to check
         * @returns {void}
         */

    }, {
        key: 'cleanUpExpiredTokens',
        value: function cleanUpExpiredTokens(ids) {
            var _this = this;

            var now = Date.now();
            ids.forEach(function (id) {
                var token = _this.tokens[id];
                if (token && token.expiration < now) {
                    delete _this.tokens[id];
                }
            });
        }

        /**
         * Returns a list of existing promises for ids
         *
         * @private
         * @param {string[]} ids - List of IDs to check
         * @return {Promise[]}
         */

    }, {
        key: 'getExistingTokenRequestPromises',
        value: function getExistingTokenRequestPromises(ids) {
            var _this2 = this;

            return ids.map(function (id) {
                return _this2.tokens[id].promise;
            });
        }

        /**
         * Returns a list of new, unrequested ids
         *
         * @private
         * @param {string[]} ids - List of IDs to check
         * @return {string[]}
         */

    }, {
        key: 'getNewlyRequestedIds',
        value: function getNewlyRequestedIds(ids) {
            var _this3 = this;

            return ids.filter(function (id) {
                return !_this3.tokens[id];
            });
        }

        /**
         * Returns a list of already requested ids
         *
         * @private
         * @param {string[]} ids - List of IDs to check
         * @return {string[]}
         */

    }, {
        key: 'getPreviouslyRequestedIds',
        value: function getPreviouslyRequestedIds(ids) {
            var _this4 = this;

            return ids.filter(function (id) {
                return !!_this4.tokens[id];
            });
        }

        /**
         * Returns a list of already requested ids
         *
         * @private
         * @param {string[]} ids - List of IDs to check
         * @return {string[]}
         */

    }, {
        key: 'getIdTokenMap',
        value: function getIdTokenMap(ids) {
            var _this5 = this;

            var map = {};
            ids.forEach(function (id) {
                map[id] = _this5.tokens[id].token;
            });
            return map;
        }

        /**
         * Chunks ids into arrays of size requestLimit
         *
         * @private
         * @param {string[]} ids - List of file IDs to check
         * @return {string[][]} An array of string[]
         */

    }, {
        key: 'getChunksOfIds',
        value: function getChunksOfIds(ids) {
            var chunks = [];
            var requestLimit = this.requestLimit;
            var len = ids.length;
            for (var i = 0; i < len; i += requestLimit) {
                chunks.push(ids.slice(i, i + requestLimit));
            }
            return chunks;
        }

        /**
         * Creates auth tokens for a list of file ids
         *
         * @private
         * @param {string[]} ids File IDs to create tokens for
         * @return {Promise} Returns a promise that will resolve when tokens are done fetching
         */

    }, {
        key: 'createTokens',
        value: function createTokens(ids) {
            var _this6 = this;

            if (ids.length > this.requestLimit) {
                return Promise.reject(new Error(TOO_MANY_REQUESTS));
            }

            var expiration = this.getExpiration();
            var promise = fetch(this.url, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(Object.assign({ ids: ids }, this.data)).replace(/"\s+|\s+"/g, '"'),
                credentials: 'same-origin'
            });

            return promise.then(function (response) {
                return response.json();
            }).then(function (data) {
                ids.forEach(function (id) {
                    _this6.tokens[id] = { promise: promise, expiration: expiration, token: data[id] };
                });
            }).catch(function () {
                ids.forEach(function (id) {
                    return delete _this6.tokens[id];
                });
                throw new Error('Auth tokens could not be fetched!');
            });
        }

        /**
         * Returns an id to token map
         *
         * @private
         * @param {string[]} ids List of IDs to check
         * @return {string[]}
         */

    }, {
        key: 'getTokens',
        value: function getTokens(ids) {
            var _this7 = this;

            this.cleanUpExpiredTokens(ids);

            var previouslyRequestedids = this.getPreviouslyRequestedIds(ids);
            var newlyRequestedIds = this.getNewlyRequestedIds(ids);
            var promises = previouslyRequestedids.length ? this.getExistingTokenRequestPromises(previouslyRequestedids) : [];
            var numberOfNewRequests = newlyRequestedIds.length;

            if (numberOfNewRequests) {
                if (numberOfNewRequests > this.hardLimit) {
                    return Promise.reject(new Error(TOO_MANY_REQUESTS));
                }
                this.getChunksOfIds(newlyRequestedIds).forEach(function (chunk) {
                    promises.push(_this7.createTokens(chunk));
                }, this);
            }

            return Promise.all(promises).then(function () {
                return _this7.getIdTokenMap(ids);
            });
        }

        /**
         * Returns a token for the given item id
         * or a map of ids to tokens
         *
         * @public
         * @param {string|string[]} id id to check
         * @return {string|Object}
         */

    }, {
        key: 'getToken',
        value: function getToken(id) {
            var ids = Array.isArray(id) ? id : [id];
            return this.getTokens(ids).then(function (tokens) {
                return Array.isArray(id) ? tokens : tokens[id];
            });
        }
    }]);

    return TokenService;
}();

global.Box.TokenService = TokenService;
export default TokenService;