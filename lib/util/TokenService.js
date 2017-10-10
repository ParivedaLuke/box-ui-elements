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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRva2VuU2VydmljZS5qcyJdLCJuYW1lcyI6WyJUT09fTUFOWV9SRVFVRVNUUyIsIlJFUVVFU1RfTElNSVRfSEFSRCIsIlJFUVVFU1RfTElNSVQiLCJUb2tlblNlcnZpY2UiLCJ1cmwiLCJ0aW1lb3V0IiwicmVxdWVzdExpbWl0IiwiaGFyZExpbWl0IiwiZGF0YSIsImhlYWRlcnMiLCJPYmplY3QiLCJhc3NpZ24iLCJBY2NlcHQiLCJ0b2tlbnMiLCJEYXRlIiwibm93IiwiaWRzIiwiZm9yRWFjaCIsImlkIiwidG9rZW4iLCJleHBpcmF0aW9uIiwibWFwIiwicHJvbWlzZSIsImZpbHRlciIsImNodW5rcyIsImxlbiIsImxlbmd0aCIsImkiLCJwdXNoIiwic2xpY2UiLCJQcm9taXNlIiwicmVqZWN0IiwiRXJyb3IiLCJnZXRFeHBpcmF0aW9uIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInJlcGxhY2UiLCJjcmVkZW50aWFscyIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjYXRjaCIsImNsZWFuVXBFeHBpcmVkVG9rZW5zIiwicHJldmlvdXNseVJlcXVlc3RlZGlkcyIsImdldFByZXZpb3VzbHlSZXF1ZXN0ZWRJZHMiLCJuZXdseVJlcXVlc3RlZElkcyIsImdldE5ld2x5UmVxdWVzdGVkSWRzIiwicHJvbWlzZXMiLCJnZXRFeGlzdGluZ1Rva2VuUmVxdWVzdFByb21pc2VzIiwibnVtYmVyT2ZOZXdSZXF1ZXN0cyIsImdldENodW5rc09mSWRzIiwiY2h1bmsiLCJjcmVhdGVUb2tlbnMiLCJhbGwiLCJnZXRJZFRva2VuTWFwIiwiQXJyYXkiLCJpc0FycmF5IiwiZ2V0VG9rZW5zIiwiZ2xvYmFsIiwiQm94Il0sIm1hcHBpbmdzIjoiOzs7O0FBT0EsSUFBTUEsb0JBQW9CLDZDQUExQixDLENBUEE7Ozs7OztBQVFBLElBQU1DLHFCQUFxQixHQUEzQjtBQUNBLElBQU1DLGdCQUFnQixHQUF0Qjs7SUFnQk1DLFk7O0FBb0NGOzs7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QUEsdUJBQXVCNkMsTUFBTUMsT0FBTixDQUFjekMsRUFBZCxJQUFvQkwsTUFBcEIsR0FBNkJBLE9BQU9LLEVBQVAsQ0FBcEQ7QUFBQSxhQUF6QixDQUFQO0FBQ0g7Ozs7OztBQUdMMkMsT0FBT0MsR0FBUCxDQUFXM0QsWUFBWCxHQUEwQkEsWUFBMUI7QUFDQSxlQUFlQSxZQUFmIiwiZmlsZSI6IlRva2VuU2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBBbiBleGFtcGxlIG9mIGEgdG9rZW4gbWFuYWdpbmcgc2VydmljZVxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuaW1wb3J0IHR5cGUgeyBUb2tlbiB9IGZyb20gJy4uL2Zsb3dUeXBlcyc7XHJcblxyXG5jb25zdCBUT09fTUFOWV9SRVFVRVNUUyA9ICdUb28gbWFueSB0b2tlbnMgcmVxdWVzdGVkIGF0IGEgc2luZ2xlIHRpbWUhJztcclxuY29uc3QgUkVRVUVTVF9MSU1JVF9IQVJEID0gMjAwO1xyXG5jb25zdCBSRVFVRVNUX0xJTUlUID0gMTAwO1xyXG5cclxudHlwZSBUb2tlbldyYXBwZXIgPSB7XHJcbiAgICB0b2tlbjogVG9rZW4sXHJcbiAgICBwcm9taXNlOiBQcm9taXNlPGFueT4sXHJcbiAgICBleHBpcmF0aW9uOiBudW1iZXJcclxufTtcclxuXHJcbnR5cGUgVG9rZW5zID0ge1xyXG4gICAgW2lkOiBzdHJpbmddOiBUb2tlbldyYXBwZXJcclxufTtcclxuXHJcbnR5cGUgVG9rZW5NYXAgPSB7XHJcbiAgICBbaWQ6IHN0cmluZ106IFRva2VuXHJcbn07XHJcblxyXG5jbGFzcyBUb2tlblNlcnZpY2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgdG9rZW5zOiBUb2tlbnM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgdXJsOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGltZW91dDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHJlcXVlc3RMaW1pdDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGhhcmRMaW1pdDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtPYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGRhdGE6IHsgW2lkOiBzdHJpbmddOiBhbnkgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBoZWFkZXJzOiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBbY29uc3RydWN0b3JdXHJcbiAgICAgKlxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIHRva2VuIGZldGNoIHVybFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVvdXQgLSB0b2tlbiB0aW1lb3V0XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcnx2b2lkfSBbcmVxdWVzdExpbWl0XSAtIG9wdGlvbmFsIGxpbWl0cyBudW1iZXIgb2YgdG9rZW5zIGZldGNoZWQgcGVyIHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfHZvaWR9IFtoYXJkTGltaXRdIC0gb3B0aW9uYWwgaGFyZCBvdmVyYWxsIGxpbWl0IGZvciBudW1iZXIgb2YgdG9rZW5zIHRvIGZldGNoXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdHx2b2lkfSBbZGF0YV0gLSBvcHRpb25hbCBkYXRhIHRvIHNlbmQgdG8gYXV0aCBlbmQgcG9pbnRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fHZvaWR9IFtoZWFkZXJzXSAtIG9wdGlvbmFsIGhlYWRlcnMgdG8gc2VuZCB0byBhdXRoIGVuZCBwb2ludFxyXG4gICAgICogQHJldHVybiB7VG9rZW5TZXJ2aWNlfVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih7XHJcbiAgICAgICAgdXJsLFxyXG4gICAgICAgIHRpbWVvdXQsXHJcbiAgICAgICAgcmVxdWVzdExpbWl0ID0gUkVRVUVTVF9MSU1JVCxcclxuICAgICAgICBoYXJkTGltaXQgPSBSRVFVRVNUX0xJTUlUX0hBUkQsXHJcbiAgICAgICAgZGF0YSA9IHt9LFxyXG4gICAgICAgIGhlYWRlcnMgPSB7fVxyXG4gICAgfToge1xyXG4gICAgICAgIHVybDogc3RyaW5nLFxyXG4gICAgICAgIHRpbWVvdXQ6IG51bWJlcixcclxuICAgICAgICByZXF1ZXN0TGltaXQ6IG51bWJlcixcclxuICAgICAgICBoYXJkTGltaXQ6IG51bWJlcixcclxuICAgICAgICBkYXRhOiB7IFtpZDogc3RyaW5nXTogYW55IH0sXHJcbiAgICAgICAgaGVhZGVyczogeyBbaWQ6IHN0cmluZ106IGFueSB9XHJcbiAgICB9KSB7XHJcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcclxuICAgICAgICB0aGlzLnJlcXVlc3RMaW1pdCA9IHJlcXVlc3RMaW1pdDtcclxuICAgICAgICB0aGlzLmhhcmRMaW1pdCA9IGhhcmRMaW1pdDtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXJzXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnRva2VucyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZXhwaXJhdGlvbiBkYXRlIGZvciB0b2tlbnNcclxuICAgICAqIFRocmVzaG9sZCBpcyBzZXQgdG8gOTAlIG9mIGFjdHVhbCB0b2tlbiB0aW1lb3V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0RXhwaXJhdGlvbigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBEYXRlLm5vdygpICsgMC45ICogdGhpcy50aW1lb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xlYW5zIHVwIGFueSBmaWxlIHRva2VucyB0aGF0IGhhdmUgcGFzc2VkIHRoZWlyIGV4cGlyYXRpb24gdGltZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gaWRzIC0gTGlzdCBvZiBJRHMgdG8gY2hlY2tcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBjbGVhblVwRXhwaXJlZFRva2VucyhpZHM6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBpZHMuZm9yRWFjaCgoaWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IHRoaXMudG9rZW5zW2lkXTtcclxuICAgICAgICAgICAgaWYgKHRva2VuICYmIHRva2VuLmV4cGlyYXRpb24gPCBub3cpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnRva2Vuc1tpZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGV4aXN0aW5nIHByb21pc2VzIGZvciBpZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gaWRzIC0gTGlzdCBvZiBJRHMgdG8gY2hlY2tcclxuICAgICAqIEByZXR1cm4ge1Byb21pc2VbXX1cclxuICAgICAqL1xyXG4gICAgZ2V0RXhpc3RpbmdUb2tlblJlcXVlc3RQcm9taXNlcyhpZHM6IHN0cmluZ1tdKTogUHJvbWlzZTxhbnk+W10ge1xyXG4gICAgICAgIHJldHVybiBpZHMubWFwKChpZDogc3RyaW5nKSA9PiB0aGlzLnRva2Vuc1tpZF0ucHJvbWlzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBuZXcsIHVucmVxdWVzdGVkIGlkc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBpZHMgLSBMaXN0IG9mIElEcyB0byBjaGVja1xyXG4gICAgICogQHJldHVybiB7c3RyaW5nW119XHJcbiAgICAgKi9cclxuICAgIGdldE5ld2x5UmVxdWVzdGVkSWRzKGlkczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIGlkcy5maWx0ZXIoKGlkOiBzdHJpbmcpID0+ICF0aGlzLnRva2Vuc1tpZF0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxyZWFkeSByZXF1ZXN0ZWQgaWRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IGlkcyAtIExpc3Qgb2YgSURzIHRvIGNoZWNrXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmdbXX1cclxuICAgICAqL1xyXG4gICAgZ2V0UHJldmlvdXNseVJlcXVlc3RlZElkcyhpZHM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBpZHMuZmlsdGVyKChpZDogc3RyaW5nKSA9PiAhIXRoaXMudG9rZW5zW2lkXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBhbHJlYWR5IHJlcXVlc3RlZCBpZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gaWRzIC0gTGlzdCBvZiBJRHMgdG8gY2hlY2tcclxuICAgICAqIEByZXR1cm4ge3N0cmluZ1tdfVxyXG4gICAgICovXHJcbiAgICBnZXRJZFRva2VuTWFwKGlkczogc3RyaW5nW10pOiBUb2tlbk1hcCB7XHJcbiAgICAgICAgY29uc3QgbWFwOiBUb2tlbk1hcCA9IHt9O1xyXG4gICAgICAgIGlkcy5mb3JFYWNoKChpZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIG1hcFtpZF0gPSB0aGlzLnRva2Vuc1tpZF0udG9rZW47XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG1hcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENodW5rcyBpZHMgaW50byBhcnJheXMgb2Ygc2l6ZSByZXF1ZXN0TGltaXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gaWRzIC0gTGlzdCBvZiBmaWxlIElEcyB0byBjaGVja1xyXG4gICAgICogQHJldHVybiB7c3RyaW5nW11bXX0gQW4gYXJyYXkgb2Ygc3RyaW5nW11cclxuICAgICAqL1xyXG4gICAgZ2V0Q2h1bmtzT2ZJZHMoaWRzOiBzdHJpbmdbXSk6IHN0cmluZ1tdW10ge1xyXG4gICAgICAgIGNvbnN0IGNodW5rczogc3RyaW5nW11bXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3RMaW1pdDogbnVtYmVyID0gdGhpcy5yZXF1ZXN0TGltaXQ7XHJcbiAgICAgICAgY29uc3QgbGVuOiBudW1iZXIgPSBpZHMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBsZW47IGkgKz0gcmVxdWVzdExpbWl0KSB7XHJcbiAgICAgICAgICAgIGNodW5rcy5wdXNoKGlkcy5zbGljZShpLCBpICsgcmVxdWVzdExpbWl0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjaHVua3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGF1dGggdG9rZW5zIGZvciBhIGxpc3Qgb2YgZmlsZSBpZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gaWRzIEZpbGUgSURzIHRvIGNyZWF0ZSB0b2tlbnMgZm9yXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgcmVzb2x2ZSB3aGVuIHRva2VucyBhcmUgZG9uZSBmZXRjaGluZ1xyXG4gICAgICovXHJcbiAgICBjcmVhdGVUb2tlbnMoaWRzOiBzdHJpbmdbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgaWYgKGlkcy5sZW5ndGggPiB0aGlzLnJlcXVlc3RMaW1pdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFRPT19NQU5ZX1JFUVVFU1RTKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBleHBpcmF0aW9uOiBudW1iZXIgPSB0aGlzLmdldEV4cGlyYXRpb24oKTtcclxuICAgICAgICBjb25zdCBwcm9taXNlOiBQcm9taXNlPGFueT4gPSBmZXRjaCh0aGlzLnVybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShPYmplY3QuYXNzaWduKHsgaWRzIH0sIHRoaXMuZGF0YSkpLnJlcGxhY2UoL1wiXFxzK3xcXHMrXCIvZywgJ1wiJyksXHJcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBwcm9taXNlXHJcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWRzLmZvckVhY2goKGlkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2tlbnNbaWRdID0geyBwcm9taXNlLCBleHBpcmF0aW9uLCB0b2tlbjogZGF0YVtpZF0gfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWRzLmZvckVhY2goKGlkOiBzdHJpbmcpID0+IGRlbGV0ZSB0aGlzLnRva2Vuc1tpZF0pO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoIHRva2VucyBjb3VsZCBub3QgYmUgZmV0Y2hlZCEnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFuIGlkIHRvIHRva2VuIG1hcFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBpZHMgTGlzdCBvZiBJRHMgdG8gY2hlY2tcclxuICAgICAqIEByZXR1cm4ge3N0cmluZ1tdfVxyXG4gICAgICovXHJcbiAgICBnZXRUb2tlbnMoaWRzOiBzdHJpbmdbXSk6IFByb21pc2U8VG9rZW5NYXA+IHtcclxuICAgICAgICB0aGlzLmNsZWFuVXBFeHBpcmVkVG9rZW5zKGlkcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzbHlSZXF1ZXN0ZWRpZHMgPSB0aGlzLmdldFByZXZpb3VzbHlSZXF1ZXN0ZWRJZHMoaWRzKTtcclxuICAgICAgICBjb25zdCBuZXdseVJlcXVlc3RlZElkcyA9IHRoaXMuZ2V0TmV3bHlSZXF1ZXN0ZWRJZHMoaWRzKTtcclxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IHByZXZpb3VzbHlSZXF1ZXN0ZWRpZHMubGVuZ3RoXHJcbiAgICAgICAgICAgID8gdGhpcy5nZXRFeGlzdGluZ1Rva2VuUmVxdWVzdFByb21pc2VzKHByZXZpb3VzbHlSZXF1ZXN0ZWRpZHMpXHJcbiAgICAgICAgICAgIDogW107XHJcbiAgICAgICAgY29uc3QgbnVtYmVyT2ZOZXdSZXF1ZXN0cyA9IG5ld2x5UmVxdWVzdGVkSWRzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgaWYgKG51bWJlck9mTmV3UmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgaWYgKG51bWJlck9mTmV3UmVxdWVzdHMgPiB0aGlzLmhhcmRMaW1pdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihUT09fTUFOWV9SRVFVRVNUUykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2h1bmtzT2ZJZHMobmV3bHlSZXF1ZXN0ZWRJZHMpLmZvckVhY2goKGNodW5rOiBzdHJpbmdbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmNyZWF0ZVRva2VucyhjaHVuaykpO1xyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB0aGlzLmdldElkVG9rZW5NYXAoaWRzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgdG9rZW4gZm9yIHRoZSBnaXZlbiBpdGVtIGlkXHJcbiAgICAgKiBvciBhIG1hcCBvZiBpZHMgdG8gdG9rZW5zXHJcbiAgICAgKlxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IGlkIGlkIHRvIGNoZWNrXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd8T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXRUb2tlbihpZDogc3RyaW5nIHwgc3RyaW5nW10pOiBQcm9taXNlPFRva2VuIHwgVG9rZW5NYXA+IHtcclxuICAgICAgICBjb25zdCBpZHM6IHN0cmluZ1tdID0gQXJyYXkuaXNBcnJheShpZCkgPyBpZCA6IFtpZF07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5zKGlkcykudGhlbigodG9rZW5zOiBUb2tlbk1hcCkgPT4gKEFycmF5LmlzQXJyYXkoaWQpID8gdG9rZW5zIDogdG9rZW5zW2lkXSkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5nbG9iYWwuQm94LlRva2VuU2VydmljZSA9IFRva2VuU2VydmljZTtcclxuZXhwb3J0IGRlZmF1bHQgVG9rZW5TZXJ2aWNlO1xyXG4iXX0=