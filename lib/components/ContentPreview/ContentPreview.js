var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Content Preview Component
 * @author Box
 */

import React, { PureComponent } from 'react';
import uniqueid from 'lodash.uniqueid';
import noop from 'lodash.noop';
import Measure from 'react-measure';
import Sidebar from './Sidebar';
import Header from './Header';
import API from '../../api';
import Cache from '../../util/Cache';
import { DEFAULT_HOSTNAME_API, DEFAULT_HOSTNAME_APP, DEFAULT_HOSTNAME_STATIC, DEFAULT_PREVIEW_VERSION, DEFAULT_PREVIEW_LOCALE, DEFAULT_PATH_STATIC_PREVIEW, CLIENT_NAME_CONTENT_PREVIEW } from '../../constants';

var ContentPreview = function (_PureComponent) {
    _inherits(ContentPreview, _PureComponent);

    /**
     * [constructor]
     *
     * @private
     * @return {ContentPreview}
     */
    function ContentPreview(props) {
        _classCallCheck(this, ContentPreview);

        var _this = _possibleConstructorReturn(this, (ContentPreview.__proto__ || Object.getPrototypeOf(ContentPreview)).call(this, props));

        _initialiseProps.call(_this);

        var file = props.file,
            cache = props.cache,
            token = props.token,
            sharedLink = props.sharedLink,
            sharedLinkPassword = props.sharedLinkPassword,
            apiHost = props.apiHost;


        _this.state = { file: file };
        _this.id = uniqueid('bcpr_');
        _this.api = new API({
            cache: cache,
            token: token,
            sharedLink: sharedLink,
            sharedLinkPassword: sharedLinkPassword,
            apiHost: apiHost,
            clientName: CLIENT_NAME_CONTENT_PREVIEW
        });
        return _this;
    }

    /**
     * Cleanup
     *
     * @private
     * @return {void}
     */


    _createClass(ContentPreview, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.preview) {
                this.preview.removeAllListeners();
                this.preview.destroy();
            }
            this.preview = undefined;
        }

        /**
         * Called after shell mounts
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _props = this.props,
                file = _props.file,
                fileId = _props.fileId,
                token = _props.token;


            var hasTokenChanged = nextProps.token !== token;
            var hasFileIdChanged = nextProps.fileId !== fileId;
            var hasFileChanged = nextProps.file !== file;

            var newState = {};

            if (hasTokenChanged || hasFileChanged || hasFileIdChanged) {
                if (hasFileChanged) {
                    newState.file = nextProps.file;
                } else {
                    newState.file = undefined;
                }
                if (this.preview) {
                    this.preview.destroy();
                    this.preview = undefined;
                }
            }

            // Only update the state if there is something to update
            if (Object.keys(newState).length) {
                this.setState(newState);
            }
        }

        /**
         * Called after shell mounts
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadAssetsAndPreview();
        }

        /**
         * Called after shell updates
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.loadAssetsAndPreview();
        }

        /**
         * Loads assets and preview
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'loadAssetsAndPreview',
        value: function loadAssetsAndPreview() {
            if (!this.isPreviewLibraryLoaded()) {
                this.loadStylesheet();
                this.loadScript();
            }
            this.loadPreview();
        }

        /**
         * Returns preview asset urls
         *
         * @private
         * @return {string} base url
         */

    }, {
        key: 'getBasePath',
        value: function getBasePath(asset) {
            var _props2 = this.props,
                staticHost = _props2.staticHost,
                staticPath = _props2.staticPath,
                locale = _props2.locale,
                version = _props2.version;

            var path = staticPath + '/' + version + '/' + locale + '/' + asset;
            var suffix = staticHost.endsWith('/') ? path : '/' + path;
            return '' + staticHost + suffix;
        }

        /**
         * Determines if preview assets are loaded
         *
         * @private
         * @return {boolean} true if preview is loaded
         */

    }, {
        key: 'isPreviewLibraryLoaded',
        value: function isPreviewLibraryLoaded() {
            return !!global.Box && !!global.Box.Preview;
        }

        /**
         * Loads external css by appending a <link> element
         *
         * @return {void}
         */

    }, {
        key: 'loadStylesheet',
        value: function loadStylesheet() {
            var _document = document,
                head = _document.head;

            var url = this.getBasePath('preview.css');

            if (!head || head.querySelector('link[rel="stylesheet"][href="' + url + '"]')) {
                return;
            }

            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = url;
            head.appendChild(link);
        }

        /**
         * Loads external script by appending a <script> element
         *
         * @return {void}
         */

    }, {
        key: 'loadScript',
        value: function loadScript() {
            var _document2 = document,
                head = _document2.head;

            var url = this.getBasePath('preview.js');

            if (!head || head.querySelector('script[src="' + url + '"]')) {
                return;
            }

            var script = document.createElement('script');
            script.src = url;
            script.addEventListener('load', this.loadPreview);
            head.appendChild(script);
        }

        /**
         * Loads the preview
         *
         * @return {void}
         */

    }, {
        key: 'updateHeaderAndSidebar',


        /**
         * Updates header and sidebar
         *
         * @private
         * @param {String} id - file id
         * @return {void}
         */
        value: function updateHeaderAndSidebar(id) {
            if (!id) {
                throw new Error('Invalid id for Preview!');
            }
            this.fetchFile(id);
        }

        /**
         * Tells the preview to resize
         *
         * @return {void}
         */


        /**
         * Network error callback
         *
         * @private
         * @param {Error} error error object
         * @return {void}
         */


        /**
         * File fetch success callback
         *
         * @private
         * @param {Object} file - Box file
         * @return {void}
         */

    }, {
        key: 'fetchFile',


        /**
         * Fetches a file
         *
         * @private
         * @param {string} id file id
         * @param {Boolean|void} [forceFetch] To void cache
         * @return {void}
         */
        value: function fetchFile(id) {
            var forceFetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var hasSidebar = this.props.hasSidebar;

            this.api.getFileAPI().file(id, this.fetchFileSuccessCallback, this.errorCallback, forceFetch, hasSidebar);
        }

        /**
         * Returns the viewer instance being used by preview.
         * This will let child components access the viewers.
         *
         * @private
         * @return {Preview} current instance of preview
         */

    }, {
        key: 'render',


        /**
         * Renders the file preview
         *
         * @private
         * @inheritdoc
         * @return {Element}
         */
        value: function render() {
            var _props3 = this.props,
                className = _props3.className,
                hasSidebar = _props3.hasSidebar,
                hasHeader = _props3.hasHeader,
                onClose = _props3.onClose,
                getLocalizedMessage = _props3.getLocalizedMessage;
            var file = this.state.file;

            return React.createElement(
                'div',
                { id: this.id, className: 'buik bcpr ' + className },
                hasHeader && React.createElement(Header, {
                    file: file,
                    showSidebarButton: hasSidebar,
                    onClose: onClose,
                    getLocalizedMessage: getLocalizedMessage
                }),
                React.createElement(
                    'div',
                    { className: 'bcpr-body' },
                    hasSidebar && React.createElement(Sidebar, {
                        file: file,
                        getPreviewer: this.getPreviewer,
                        getLocalizedMessage: getLocalizedMessage
                    }),
                    React.createElement(
                        Measure,
                        { bounds: true, onResize: this.onResize },
                        function (_ref) {
                            var measureRef = _ref.measureRef;
                            return React.createElement('div', { ref: measureRef, className: 'bcpr-content' });
                        }
                    )
                )
            );
        }
    }]);

    return ContentPreview;
}(PureComponent);

ContentPreview.defaultProps = {
    className: '',
    apiHost: DEFAULT_HOSTNAME_API,
    appHost: DEFAULT_HOSTNAME_APP,
    staticHost: DEFAULT_HOSTNAME_STATIC,
    staticPath: DEFAULT_PATH_STATIC_PREVIEW,
    locale: DEFAULT_PREVIEW_LOCALE,
    version: DEFAULT_PREVIEW_VERSION,
    hasSidebar: false,
    hasHeader: false,
    onLoad: noop,
    onNavigate: noop
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.loadPreview = function () {
        if (!_this2.isPreviewLibraryLoaded() || _this2.preview) {
            return;
        }

        var Preview = global.Box.Preview;

        var _props4 = _this2.props,
            fileId = _props4.fileId,
            token = _props4.token,
            onLoad = _props4.onLoad,
            onNavigate = _props4.onNavigate,
            rest = _objectWithoutProperties(_props4, ['fileId', 'token', 'onLoad', 'onNavigate']);

        var file = _this2.state.file;

        var fileOrFileId = file ? Object.assign({}, file) : fileId;

        if (!file && !fileId || !token) {
            throw new Error('Missing file or fileId and/or token for Preview!');
        }

        _this2.preview = new Preview();
        _this2.preview.addListener('navigate', function (id) {
            _this2.updateHeaderAndSidebar(id);
            onNavigate(id);
        });
        _this2.preview.addListener('load', onLoad);
        _this2.preview.show(fileOrFileId, token, _extends({
            container: '#' + _this2.id + ' .bcpr-content',
            header: 'none'
        }, rest));
        _this2.updateHeaderAndSidebar(file ? file.id : fileId);
    };

    this.onResize = function () {
        if (_this2.preview) {
            _this2.preview.resize();
        }
    };

    this.errorCallback = function (error) {
        /* eslint-disable no-console */
        console.error(error);
        /* eslint-enable no-console */
    };

    this.fetchFileSuccessCallback = function (file) {
        _this2.setState({ file: file });
    };

    this.getPreviewer = function () {
        var file = _this2.state.file;

        if (!_this2.preview || !file) {
            return null;
        }
        var viewer = _this2.preview.getCurrentViewer();
        var previewingFile = _this2.preview.getCurrentFile();
        if (!previewingFile || !viewer || previewingFile.id !== file.id) {
            return null;
        }
        return viewer;
    };
};

export default ContentPreview;