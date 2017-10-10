var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cache = function () {

    /**
     * [constructor]
     *
     * @return {Cache} Cache instance
     */
    function Cache() {
        _classCallCheck(this, Cache);

        this.cache = {};
    }

    /**
     * Caches a simple object in memory.
     *
     * @param {string} key The cache key
     * @param {*} value The cache value
     * @return {void}
     */

    /**
     * @property {*}
     */


    _createClass(Cache, [{
        key: 'set',
        value: function set(key, value) {
            this.cache[key] = value;
        }

        /**
         * Merges cached values or sets it.
         *
         * @param {string} key The cache key
         * @param {*} value The cache value
         * @return {void}
         */

    }, {
        key: 'merge',
        value: function merge(key, value) {
            if (this.has(key)) {
                Object.assign(this.get(key), value);
            } else {
                throw new Error('Key ' + key + ' not in cache!');
            }
        }

        /**
         * Deletes object from in-memory cache.
         *
         * @param {string} key The cache key
         * @return {void}
         */

    }, {
        key: 'unset',
        value: function unset(key) {
            delete this.cache[key];
        }

        /**
         * Deletes all object from in-memory cache
         * that match the key as prefix.
         *
         * @param {string} prefix The cache key prefix
         * @return {void}
         */

    }, {
        key: 'unsetAll',
        value: function unsetAll(prefix) {
            var _this = this;

            Object.keys(this.cache).forEach(function (key) {
                if (key.startsWith(prefix)) {
                    delete _this.cache[key];
                }
            });
        }

        /**
         * Checks if cache has provided key.
         *
         * @param {string} key The cache key
         * @return {boolean} Whether the cache has key
         */

    }, {
        key: 'has',
        value: function has(key) {
            return {}.hasOwnProperty.call(this.cache, key);
        }

        /**
         * Fetches a cached object from in-memory cache if available.
         *
         * @param {string} key Key of cached object
         * @return {*} Cached object
         */

    }, {
        key: 'get',
        value: function get(key) {
            if (this.has(key)) {
                return this.cache[key];
            }
            return undefined;
        }
    }]);

    return Cache;
}(); /**
      * 
      * @file A simple in-memory cache
      * @author Box
      */

export default Cache;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhY2hlLmpzIl0sIm5hbWVzIjpbIkNhY2hlIiwiY2FjaGUiLCJrZXkiLCJ2YWx1ZSIsImhhcyIsIk9iamVjdCIsImFzc2lnbiIsImdldCIsIkVycm9yIiwicHJlZml4Iiwia2V5cyIsImZvckVhY2giLCJzdGFydHNXaXRoIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7O0lBUU1BLEs7O0FBTUY7Ozs7O0FBS0EscUJBQWM7QUFBQTs7QUFDVixhQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNIOztBQUVEOzs7Ozs7OztBQWRBOzs7Ozs7OzRCQXFCSUMsRyxFQUFhQyxLLEVBQWtCO0FBQy9CLGlCQUFLRixLQUFMLENBQVdDLEdBQVgsSUFBa0JDLEtBQWxCO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7OEJBT01ELEcsRUFBYUMsSyxFQUFrQjtBQUNqQyxnQkFBSSxLQUFLQyxHQUFMLENBQVNGLEdBQVQsQ0FBSixFQUFtQjtBQUNmRyx1QkFBT0MsTUFBUCxDQUFjLEtBQUtDLEdBQUwsQ0FBU0wsR0FBVCxDQUFkLEVBQTZCQyxLQUE3QjtBQUNILGFBRkQsTUFFTztBQUNILHNCQUFNLElBQUlLLEtBQUosVUFBaUJOLEdBQWpCLG9CQUFOO0FBQ0g7QUFDSjs7QUFFRDs7Ozs7Ozs7OzhCQU1NQSxHLEVBQW1CO0FBQ3JCLG1CQUFPLEtBQUtELEtBQUwsQ0FBV0MsR0FBWCxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7aUNBT1NPLE0sRUFBc0I7QUFBQTs7QUFDM0JKLG1CQUFPSyxJQUFQLENBQVksS0FBS1QsS0FBakIsRUFBd0JVLE9BQXhCLENBQWdDLFVBQUNULEdBQUQsRUFBaUI7QUFDN0Msb0JBQUlBLElBQUlVLFVBQUosQ0FBZUgsTUFBZixDQUFKLEVBQTRCO0FBQ3hCLDJCQUFPLE1BQUtSLEtBQUwsQ0FBV0MsR0FBWCxDQUFQO0FBQ0g7QUFDSixhQUpEO0FBS0g7O0FBRUQ7Ozs7Ozs7Ozs0QkFNSUEsRyxFQUFzQjtBQUN0QixtQkFBTyxHQUFHVyxjQUFILENBQWtCQyxJQUFsQixDQUF1QixLQUFLYixLQUE1QixFQUFtQ0MsR0FBbkMsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7NEJBTUlBLEcsRUFBa0I7QUFDbEIsZ0JBQUksS0FBS0UsR0FBTCxDQUFTRixHQUFULENBQUosRUFBbUI7QUFDZix1QkFBTyxLQUFLRCxLQUFMLENBQVdDLEdBQVgsQ0FBUDtBQUNIO0FBQ0QsbUJBQU9hLFNBQVA7QUFDSDs7OztLQS9GTDs7Ozs7O0FBa0dBLGVBQWVmLEtBQWYiLCJmaWxlIjoiQ2FjaGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgQSBzaW1wbGUgaW4tbWVtb3J5IGNhY2hlXHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IHR5cGUgeyBTdHJpbmdBbnlNYXAgfSBmcm9tICcuLi9mbG93VHlwZXMnO1xyXG5cclxuY2xhc3MgQ2FjaGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgeyp9XHJcbiAgICAgKi9cclxuICAgIGNhY2hlOiBTdHJpbmdBbnlNYXA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBbY29uc3RydWN0b3JdXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Q2FjaGV9IENhY2hlIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuY2FjaGUgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhY2hlcyBhIHNpbXBsZSBvYmplY3QgaW4gbWVtb3J5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGNhY2hlIGtleVxyXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgY2FjaGUgdmFsdWVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2FjaGVba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWVyZ2VzIGNhY2hlZCB2YWx1ZXMgb3Igc2V0cyBpdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBjYWNoZSBrZXlcclxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIGNhY2hlIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBtZXJnZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmhhcyhrZXkpKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5nZXQoa2V5KSwgdmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgS2V5ICR7a2V5fSBub3QgaW4gY2FjaGUhYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyBvYmplY3QgZnJvbSBpbi1tZW1vcnkgY2FjaGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgY2FjaGUga2V5XHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICB1bnNldChrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIGFsbCBvYmplY3QgZnJvbSBpbi1tZW1vcnkgY2FjaGVcclxuICAgICAqIHRoYXQgbWF0Y2ggdGhlIGtleSBhcyBwcmVmaXguXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCBUaGUgY2FjaGUga2V5IHByZWZpeFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgdW5zZXRBbGwocHJlZml4OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmNhY2hlKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgocHJlZml4KSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuY2FjaGVba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGNhY2hlIGhhcyBwcm92aWRlZCBrZXkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgY2FjaGUga2V5XHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIHRoZSBjYWNoZSBoYXMga2V5XHJcbiAgICAgKi9cclxuICAgIGhhcyhrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuY2FjaGUsIGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGZXRjaGVzIGEgY2FjaGVkIG9iamVjdCBmcm9tIGluLW1lbW9yeSBjYWNoZSBpZiBhdmFpbGFibGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBLZXkgb2YgY2FjaGVkIG9iamVjdFxyXG4gICAgICogQHJldHVybiB7Kn0gQ2FjaGVkIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBnZXQoa2V5OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLmhhcyhrZXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhY2hlO1xyXG4iXX0=