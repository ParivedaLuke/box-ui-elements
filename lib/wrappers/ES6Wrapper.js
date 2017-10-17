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