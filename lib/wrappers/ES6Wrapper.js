var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Base class for the Box UI Elements ES6 wrapper
 * @author Box
 */

/* eslint-disable */
import localeData from 'i18n-locale-data'; // this is a webpack alias
import EventEmitter from 'events';
import { IntlProvider, addLocaleData } from 'react-intl';
import { unmountComponentAtNode } from 'react-dom';
/* eslint-enable */
import { DEFAULT_CONTAINER } from '../constants';
import messages from '../messages';

var ES6Wrapper = function (_EventEmitter) {
    _inherits(ES6Wrapper, _EventEmitter);

    /**
     * [constructor]
     *
     * @private
     * @return {ES6Wrapper}
     */


    /**
     * @property {Object}
     */


    /**
     * @property {string}
     */


    /**
     * @property {string}
     */


    /**
     * @property {HTMLElement}
     */
    function ES6Wrapper() {
        _classCallCheck(this, ES6Wrapper);

        var _this = _possibleConstructorReturn(this, (ES6Wrapper.__proto__ || Object.getPrototypeOf(ES6Wrapper)).call(this));

        _this.locale = __LOCALE__;
        _this.translations = __TRANSLATIONS__;

        _this.getLocalizedMessage = function (id) {
            var replacements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (!messages[id]) {
                unmountComponentAtNode(_this.container);
                throw new Error('Cannot get localized message for ' + id);
            }
            var message = _this.intl.formatMessage(messages[id], replacements);
            if (!message) {
                unmountComponentAtNode(_this.container);
                throw new Error('Cannot get localized message for ' + id);
            }
            return message;
        };

        _this.setComponent = function (component) {
            _this.component = component;
        };

        addLocaleData(localeData);
        _this.intl = new IntlProvider({ locale: _this.locale, messages: _this.translations }, {}).getChildContext().intl;
        return _this;
    }

    /**
     * Uses react intl to format messages
     *
     * @public
     * @param {string} id - The message id.
     * @param {Object|undefined} [replacements] - Optional replacements.
     * @return {string}
     */


    /**
     * @property {Element}
     */


    /**
     * @property {string}
     */


    /**
     * @property {string}
     */


    /**
     * @property {string}
     */

    /**
     * @property {Function}
     */


    _createClass(ES6Wrapper, [{
        key: 'show',


        /**
         * Shows the content picker.
         *
         * @public
         * @param {string} root The root folder id.
         * @param {string} token The API access token.
         * @param {Object|void} [options] Optional options.
         * @return {void}
         */
        value: function show(root, token) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            this.root = root;
            this.token = token;
            this.options = options;
            this.options.version = __VERSION__;
            this.emit = this.emit.bind(this);
            var container = options.container || DEFAULT_CONTAINER;
            this.container = container instanceof HTMLElement ? container : document.querySelector(container);
            this.render();
        }

        /**
         * Hides the content picker.
         * Removes all event listeners.
         * Clears out the DOM inside container.
         *
         * @public
         * @return {void}
         */

    }, {
        key: 'hide',
        value: function hide() {
            this.removeAllListeners();
            if (this.container) {
                this.container.innerHTML = '';
            }
        }

        /**
         * Renders the component.
         * Should be overriden.
         *
         * @protected
         * @return {void}
         */

    }, {
        key: 'render',
        value: function render() {
            throw new Error('Unimplemented!');
        }

        /**
         * Sets reference to the inner component
         *
         * @protected
         * @return {void}
         */

    }, {
        key: 'getComponent',


        /**
         * Gets reference to the inner component
         *
         * @public
         * @return {Element}
         */
        value: function getComponent() {
            return this.component;
        }

        /**
         * Clears out the cache used by the component
         *
         * @public
         * @return {Element}
         */

    }, {
        key: 'clearCache',
        value: function clearCache() {
            var component = this.getComponent();
            if (component && typeof component.clearCache === 'function') {
                component.clearCache();
            }
        }

        /**
         * Wrapper for emit to prevent JS exceptions
         * in the listeners own code.
         *
         * @public
         * @param {string} eventName - name of the event
         * @param {Object} data - event data
         * @return {boolean} true if the event had listeners, false otherwise.
         */

    }, {
        key: 'emit',
        value: function emit(eventName, data) {
            try {
                return _get(ES6Wrapper.prototype.__proto__ || Object.getPrototypeOf(ES6Wrapper.prototype), 'emit', this).call(this, eventName, data);
            } catch (e) {
                // do nothing
            }
            return false;
        }
    }]);

    return ES6Wrapper;
}(EventEmitter);

export default ES6Wrapper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVTNldyYXBwZXIuanMiXSwibmFtZXMiOlsibG9jYWxlRGF0YSIsIkV2ZW50RW1pdHRlciIsIkludGxQcm92aWRlciIsImFkZExvY2FsZURhdGEiLCJ1bm1vdW50Q29tcG9uZW50QXROb2RlIiwiREVGQVVMVF9DT05UQUlORVIiLCJtZXNzYWdlcyIsIkVTNldyYXBwZXIiLCJsb2NhbGUiLCJfX0xPQ0FMRV9fIiwidHJhbnNsYXRpb25zIiwiX19UUkFOU0xBVElPTlNfXyIsImdldExvY2FsaXplZE1lc3NhZ2UiLCJpZCIsInJlcGxhY2VtZW50cyIsImNvbnRhaW5lciIsIkVycm9yIiwibWVzc2FnZSIsImludGwiLCJmb3JtYXRNZXNzYWdlIiwic2V0Q29tcG9uZW50IiwiY29tcG9uZW50IiwiZ2V0Q2hpbGRDb250ZXh0Iiwicm9vdCIsInRva2VuIiwib3B0aW9ucyIsInZlcnNpb24iLCJfX1ZFUlNJT05fXyIsImVtaXQiLCJiaW5kIiwiSFRNTEVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJyZW5kZXIiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJpbm5lckhUTUwiLCJnZXRDb21wb25lbnQiLCJjbGVhckNhY2hlIiwiZXZlbnROYW1lIiwiZGF0YSIsImUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBTUE7QUFDQSxPQUFPQSxVQUFQLE1BQXVCLGtCQUF2QixDLENBQTJDO0FBQzNDLE9BQU9DLFlBQVAsTUFBeUIsUUFBekI7QUFDQSxTQUFTQyxZQUFULEVBQXVCQyxhQUF2QixRQUE0QyxZQUE1QztBQUNBLFNBQVNDLHNCQUFULFFBQXVDLFdBQXZDO0FBQ0E7QUFDQSxTQUFTQyxpQkFBVCxRQUFrQyxjQUFsQztBQUNBLE9BQU9DLFFBQVAsTUFBcUIsYUFBckI7O0lBT01DLFU7OztBQThDRjs7Ozs7Ozs7QUFWQTs7Ozs7QUFWQTs7Ozs7QUFWQTs7Ozs7QUFWQTs7O0FBOENBLDBCQUFjO0FBQUE7O0FBQUE7O0FBQUEsY0F2QmRDLE1BdUJjLEdBdkJHQyxVQXVCSDtBQUFBLGNBbEJkQyxZQWtCYyxHQWxCWUMsZ0JBa0JaOztBQUFBLGNBY2RDLG1CQWRjLEdBY1EsVUFBQ0MsRUFBRCxFQUF1RDtBQUFBLGdCQUExQ0MsWUFBMEMsdUVBQWYsRUFBZTs7QUFDekUsZ0JBQUksQ0FBQ1IsU0FBU08sRUFBVCxDQUFMLEVBQW1CO0FBQ2ZULHVDQUF1QixNQUFLVyxTQUE1QjtBQUNBLHNCQUFNLElBQUlDLEtBQUosdUNBQThDSCxFQUE5QyxDQUFOO0FBQ0g7QUFDRCxnQkFBTUksVUFBa0IsTUFBS0MsSUFBTCxDQUFVQyxhQUFWLENBQXdCYixTQUFTTyxFQUFULENBQXhCLEVBQXNDQyxZQUF0QyxDQUF4QjtBQUNBLGdCQUFJLENBQUNHLE9BQUwsRUFBYztBQUNWYix1Q0FBdUIsTUFBS1csU0FBNUI7QUFDQSxzQkFBTSxJQUFJQyxLQUFKLHVDQUE4Q0gsRUFBOUMsQ0FBTjtBQUNIO0FBQ0QsbUJBQU9JLE9BQVA7QUFDSCxTQXpCYTs7QUFBQSxjQStFZEcsWUEvRWMsR0ErRUMsVUFBQ0MsU0FBRCxFQUFvQjtBQUMvQixrQkFBS0EsU0FBTCxHQUFpQkEsU0FBakI7QUFDSCxTQWpGYTs7QUFFVmxCLHNCQUFjSCxVQUFkO0FBQ0EsY0FBS2tCLElBQUwsR0FBWSxJQUFJaEIsWUFBSixDQUFpQixFQUFFTSxRQUFRLE1BQUtBLE1BQWYsRUFBdUJGLFVBQVUsTUFBS0ksWUFBdEMsRUFBakIsRUFBdUUsRUFBdkUsRUFBMkVZLGVBQTNFLEdBQTZGSixJQUF6RztBQUhVO0FBSWI7O0FBRUQ7Ozs7Ozs7Ozs7QUFqQkE7Ozs7O0FBVkE7Ozs7O0FBVkE7Ozs7O0FBVkE7Ozs7QUFWQTs7Ozs7Ozs7O0FBOEVBOzs7Ozs7Ozs7NkJBU0tLLEksRUFBY0MsSyxFQUEwRDtBQUFBLGdCQUE1Q0MsT0FBNEMsdUVBQVYsRUFBVTs7QUFDekUsaUJBQUtGLElBQUwsR0FBWUEsSUFBWjtBQUNBLGlCQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxpQkFBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsaUJBQUtBLE9BQUwsQ0FBYUMsT0FBYixHQUF1QkMsV0FBdkI7QUFDQSxpQkFBS0MsSUFBTCxHQUFZLEtBQUtBLElBQUwsQ0FBVUMsSUFBVixDQUFlLElBQWYsQ0FBWjtBQUNBLGdCQUFNZCxZQUFZVSxRQUFRVixTQUFSLElBQXFCVixpQkFBdkM7QUFDQSxpQkFBS1UsU0FBTCxHQUFpQkEscUJBQXFCZSxXQUFyQixHQUFtQ2YsU0FBbkMsR0FBK0NnQixTQUFTQyxhQUFULENBQXVCakIsU0FBdkIsQ0FBaEU7QUFDQSxpQkFBS2tCLE1BQUw7QUFDSDs7QUFFRDs7Ozs7Ozs7Ozs7K0JBUWE7QUFDVCxpQkFBS0Msa0JBQUw7QUFDQSxnQkFBSSxLQUFLbkIsU0FBVCxFQUFvQjtBQUNoQixxQkFBS0EsU0FBTCxDQUFlb0IsU0FBZixHQUEyQixFQUEzQjtBQUNIO0FBQ0o7O0FBRUQ7Ozs7Ozs7Ozs7aUNBT1M7QUFDTCxrQkFBTSxJQUFJbkIsS0FBSixDQUFVLGdCQUFWLENBQU47QUFDSDs7QUFFRDs7Ozs7Ozs7Ozs7QUFVQTs7Ozs7O3VDQU1vQjtBQUNoQixtQkFBTyxLQUFLSyxTQUFaO0FBQ0g7O0FBRUQ7Ozs7Ozs7OztxQ0FNbUI7QUFDZixnQkFBTUEsWUFBWSxLQUFLZSxZQUFMLEVBQWxCO0FBQ0EsZ0JBQUlmLGFBQWEsT0FBT0EsVUFBVWdCLFVBQWpCLEtBQWdDLFVBQWpELEVBQTZEO0FBQ3pEaEIsMEJBQVVnQixVQUFWO0FBQ0g7QUFDSjs7QUFFRDs7Ozs7Ozs7Ozs7OzZCQVNLQyxTLEVBQW1CQyxJLEVBQW9CO0FBQ3hDLGdCQUFJO0FBQ0Esb0lBQWtCRCxTQUFsQixFQUE2QkMsSUFBN0I7QUFDSCxhQUZELENBRUUsT0FBT0MsQ0FBUCxFQUFVO0FBQ1I7QUFDSDtBQUNELG1CQUFPLEtBQVA7QUFDSDs7OztFQTlLb0J2QyxZOztBQWlMekIsZUFBZU0sVUFBZiIsImZpbGUiOiJFUzZXcmFwcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEJhc2UgY2xhc3MgZm9yIHRoZSBCb3ggVUkgRWxlbWVudHMgRVM2IHdyYXBwZXJcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG5pbXBvcnQgbG9jYWxlRGF0YSBmcm9tICdpMThuLWxvY2FsZS1kYXRhJzsgLy8gdGhpcyBpcyBhIHdlYnBhY2sgYWxpYXNcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnO1xyXG5pbXBvcnQgeyBJbnRsUHJvdmlkZXIsIGFkZExvY2FsZURhdGEgfSBmcm9tICdyZWFjdC1pbnRsJztcclxuaW1wb3J0IHsgdW5tb3VudENvbXBvbmVudEF0Tm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XHJcbi8qIGVzbGludC1lbmFibGUgKi9cclxuaW1wb3J0IHsgREVGQVVMVF9DT05UQUlORVIgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgbWVzc2FnZXMgZnJvbSAnLi4vbWVzc2FnZXMnO1xyXG5pbXBvcnQgdHlwZSB7IFN0cmluZ01hcCwgVG9rZW4gfSBmcm9tICcuLi9mbG93VHlwZXMnO1xyXG5cclxuZGVjbGFyZSB2YXIgX19MT0NBTEVfXzogc3RyaW5nO1xyXG5kZWNsYXJlIHZhciBfX1ZFUlNJT05fXzogc3RyaW5nO1xyXG5kZWNsYXJlIHZhciBfX1RSQU5TTEFUSU9OU19fOiBTdHJpbmdNYXA7XHJcblxyXG5jbGFzcyBFUzZXcmFwcGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn1cclxuICAgICAqL1xyXG4gICAgZW1pdDogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICBjb250YWluZXI6ID9IVE1MRWxlbWVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICByb290OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgdG9rZW46IFRva2VuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIG9wdGlvbnM6IHsgW2tleTogc3RyaW5nXTogYW55IH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgbG9jYWxlOiBzdHJpbmcgPSBfX0xPQ0FMRV9fO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHRyYW5zbGF0aW9uczogU3RyaW5nTWFwID0gX19UUkFOU0xBVElPTlNfXztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBpbnRsOiBhbnk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge0VsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudDogYW55O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogW2NvbnN0cnVjdG9yXVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHtFUzZXcmFwcGVyfVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGFkZExvY2FsZURhdGEobG9jYWxlRGF0YSk7XHJcbiAgICAgICAgdGhpcy5pbnRsID0gbmV3IEludGxQcm92aWRlcih7IGxvY2FsZTogdGhpcy5sb2NhbGUsIG1lc3NhZ2VzOiB0aGlzLnRyYW5zbGF0aW9ucyB9LCB7fSkuZ2V0Q2hpbGRDb250ZXh0KCkuaW50bDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVzZXMgcmVhY3QgaW50bCB0byBmb3JtYXQgbWVzc2FnZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHVibGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBUaGUgbWVzc2FnZSBpZC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fHVuZGVmaW5lZH0gW3JlcGxhY2VtZW50c10gLSBPcHRpb25hbCByZXBsYWNlbWVudHMuXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldExvY2FsaXplZE1lc3NhZ2UgPSAoaWQ6IHN0cmluZywgcmVwbGFjZW1lbnRzOiA/U3RyaW5nTWFwID0ge30pOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIGlmICghbWVzc2FnZXNbaWRdKSB7XHJcbiAgICAgICAgICAgIHVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy5jb250YWluZXIpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBnZXQgbG9jYWxpemVkIG1lc3NhZ2UgZm9yICR7aWR9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2U6IHN0cmluZyA9IHRoaXMuaW50bC5mb3JtYXRNZXNzYWdlKG1lc3NhZ2VzW2lkXSwgcmVwbGFjZW1lbnRzKTtcclxuICAgICAgICBpZiAoIW1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgdW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLmNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGdldCBsb2NhbGl6ZWQgbWVzc2FnZSBmb3IgJHtpZH1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvd3MgdGhlIGNvbnRlbnQgcGlja2VyLlxyXG4gICAgICpcclxuICAgICAqIEBwdWJsaWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByb290IFRoZSByb290IGZvbGRlciBpZC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0b2tlbiBUaGUgQVBJIGFjY2VzcyB0b2tlbi5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fHZvaWR9IFtvcHRpb25zXSBPcHRpb25hbCBvcHRpb25zLlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgc2hvdyhyb290OiBzdHJpbmcsIHRva2VuOiBUb2tlbiwgb3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yb290ID0gcm9vdDtcclxuICAgICAgICB0aGlzLnRva2VuID0gdG9rZW47XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICB0aGlzLm9wdGlvbnMudmVyc2lvbiA9IF9fVkVSU0lPTl9fO1xyXG4gICAgICAgIHRoaXMuZW1pdCA9IHRoaXMuZW1pdC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyIHx8IERFRkFVTFRfQ09OVEFJTkVSO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBjb250YWluZXIgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lcik7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZGVzIHRoZSBjb250ZW50IHBpY2tlci5cclxuICAgICAqIFJlbW92ZXMgYWxsIGV2ZW50IGxpc3RlbmVycy5cclxuICAgICAqIENsZWFycyBvdXQgdGhlIERPTSBpbnNpZGUgY29udGFpbmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwdWJsaWNcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGhpZGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcclxuICAgICAgICBpZiAodGhpcy5jb250YWluZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyB0aGUgY29tcG9uZW50LlxyXG4gICAgICogU2hvdWxkIGJlIG92ZXJyaWRlbi5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmltcGxlbWVudGVkIScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyByZWZlcmVuY2UgdG8gdGhlIGlubmVyIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHNldENvbXBvbmVudCA9IChjb21wb25lbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgcmVmZXJlbmNlIHRvIHRoZSBpbm5lciBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHVibGljXHJcbiAgICAgKiBAcmV0dXJuIHtFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICBnZXRDb21wb25lbnQoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgb3V0IHRoZSBjYWNoZSB1c2VkIGJ5IHRoZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHVibGljXHJcbiAgICAgKiBAcmV0dXJuIHtFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICBjbGVhckNhY2hlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuZ2V0Q29tcG9uZW50KCk7XHJcbiAgICAgICAgaWYgKGNvbXBvbmVudCAmJiB0eXBlb2YgY29tcG9uZW50LmNsZWFyQ2FjaGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50LmNsZWFyQ2FjaGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcGVyIGZvciBlbWl0IHRvIHByZXZlbnQgSlMgZXhjZXB0aW9uc1xyXG4gICAgICogaW4gdGhlIGxpc3RlbmVycyBvd24gY29kZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHVibGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIC0gbmFtZSBvZiB0aGUgZXZlbnRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gZXZlbnQgZGF0YVxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZXZlbnQgaGFkIGxpc3RlbmVycywgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICovXHJcbiAgICBlbWl0KGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3VwZXIuZW1pdChldmVudE5hbWUsIGRhdGEpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVTNldyYXBwZXI7XHJcbiJdfQ==