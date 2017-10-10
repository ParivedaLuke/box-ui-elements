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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRlbnRQcmV2aWV3LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsInVuaXF1ZWlkIiwibm9vcCIsIk1lYXN1cmUiLCJTaWRlYmFyIiwiSGVhZGVyIiwiQVBJIiwiQ2FjaGUiLCJERUZBVUxUX0hPU1ROQU1FX0FQSSIsIkRFRkFVTFRfSE9TVE5BTUVfQVBQIiwiREVGQVVMVF9IT1NUTkFNRV9TVEFUSUMiLCJERUZBVUxUX1BSRVZJRVdfVkVSU0lPTiIsIkRFRkFVTFRfUFJFVklFV19MT0NBTEUiLCJERUZBVUxUX1BBVEhfU1RBVElDX1BSRVZJRVciLCJDTElFTlRfTkFNRV9DT05URU5UX1BSRVZJRVciLCJDb250ZW50UHJldmlldyIsInByb3BzIiwiZmlsZSIsImNhY2hlIiwidG9rZW4iLCJzaGFyZWRMaW5rIiwic2hhcmVkTGlua1Bhc3N3b3JkIiwiYXBpSG9zdCIsInN0YXRlIiwiaWQiLCJhcGkiLCJjbGllbnROYW1lIiwicHJldmlldyIsInJlbW92ZUFsbExpc3RlbmVycyIsImRlc3Ryb3kiLCJ1bmRlZmluZWQiLCJuZXh0UHJvcHMiLCJmaWxlSWQiLCJoYXNUb2tlbkNoYW5nZWQiLCJoYXNGaWxlSWRDaGFuZ2VkIiwiaGFzRmlsZUNoYW5nZWQiLCJuZXdTdGF0ZSIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJzZXRTdGF0ZSIsImxvYWRBc3NldHNBbmRQcmV2aWV3IiwiaXNQcmV2aWV3TGlicmFyeUxvYWRlZCIsImxvYWRTdHlsZXNoZWV0IiwibG9hZFNjcmlwdCIsImxvYWRQcmV2aWV3IiwiYXNzZXQiLCJzdGF0aWNIb3N0Iiwic3RhdGljUGF0aCIsImxvY2FsZSIsInZlcnNpb24iLCJwYXRoIiwic3VmZml4IiwiZW5kc1dpdGgiLCJnbG9iYWwiLCJCb3giLCJQcmV2aWV3IiwiZG9jdW1lbnQiLCJoZWFkIiwidXJsIiwiZ2V0QmFzZVBhdGgiLCJxdWVyeVNlbGVjdG9yIiwibGluayIsImNyZWF0ZUVsZW1lbnQiLCJyZWwiLCJ0eXBlIiwiaHJlZiIsImFwcGVuZENoaWxkIiwic2NyaXB0Iiwic3JjIiwiYWRkRXZlbnRMaXN0ZW5lciIsIkVycm9yIiwiZmV0Y2hGaWxlIiwiZm9yY2VGZXRjaCIsImhhc1NpZGViYXIiLCJnZXRGaWxlQVBJIiwiZmV0Y2hGaWxlU3VjY2Vzc0NhbGxiYWNrIiwiZXJyb3JDYWxsYmFjayIsImNsYXNzTmFtZSIsImhhc0hlYWRlciIsIm9uQ2xvc2UiLCJnZXRMb2NhbGl6ZWRNZXNzYWdlIiwiZ2V0UHJldmlld2VyIiwib25SZXNpemUiLCJtZWFzdXJlUmVmIiwiZGVmYXVsdFByb3BzIiwiYXBwSG9zdCIsIm9uTG9hZCIsIm9uTmF2aWdhdGUiLCJyZXN0IiwiZmlsZU9yRmlsZUlkIiwiYXNzaWduIiwiYWRkTGlzdGVuZXIiLCJ1cGRhdGVIZWFkZXJBbmRTaWRlYmFyIiwic2hvdyIsImNvbnRhaW5lciIsImhlYWRlciIsInJlc2l6ZSIsImVycm9yIiwiY29uc29sZSIsInZpZXdlciIsImdldEN1cnJlbnRWaWV3ZXIiLCJwcmV2aWV3aW5nRmlsZSIsImdldEN1cnJlbnRGaWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxJQUFnQkMsYUFBaEIsUUFBcUMsT0FBckM7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLGlCQUFyQjtBQUNBLE9BQU9DLElBQVAsTUFBaUIsYUFBakI7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLGVBQXBCO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQixXQUFwQjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsVUFBbkI7QUFDQSxPQUFPQyxHQUFQLE1BQWdCLFdBQWhCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixrQkFBbEI7QUFDQSxTQUNJQyxvQkFESixFQUVJQyxvQkFGSixFQUdJQyx1QkFISixFQUlJQyx1QkFKSixFQUtJQyxzQkFMSixFQU1JQywyQkFOSixFQU9JQywyQkFQSixRQVFPLGlCQVJQOztJQXlETUMsYzs7O0FBcUJGOzs7Ozs7QUFNQSw0QkFB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RUFBNEI7QUFDeEIsbUJBQU8sSUFBUDtBQUNIO0FBQ0QsWUFBTW1GLFNBQVMsT0FBS3pFLE9BQUwsQ0FBYTBFLGdCQUFiLEVBQWY7QUFDQSxZQUFNQyxpQkFBaUIsT0FBSzNFLE9BQUwsQ0FBYTRFLGNBQWIsRUFBdkI7QUFDQSxZQUFJLENBQUNELGNBQUQsSUFBbUIsQ0FBQ0YsTUFBcEIsSUFBOEJFLGVBQWU5RSxFQUFmLEtBQXNCUCxLQUFLTyxFQUE3RCxFQUFpRTtBQUM3RCxtQkFBTyxJQUFQO0FBQ0g7QUFDRCxlQUFPNEUsTUFBUDtBQUNILEs7OztBQXFDTCxlQUFlckYsY0FBZiIsImZpbGUiOiJDb250ZW50UHJldmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBDb250ZW50IFByZXZpZXcgQ29tcG9uZW50XHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB1bmlxdWVpZCBmcm9tICdsb2Rhc2gudW5pcXVlaWQnO1xyXG5pbXBvcnQgbm9vcCBmcm9tICdsb2Rhc2gubm9vcCc7XHJcbmltcG9ydCBNZWFzdXJlIGZyb20gJ3JlYWN0LW1lYXN1cmUnO1xyXG5pbXBvcnQgU2lkZWJhciBmcm9tICcuL1NpZGViYXInO1xyXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vSGVhZGVyJztcclxuaW1wb3J0IEFQSSBmcm9tICcuLi8uLi9hcGknO1xyXG5pbXBvcnQgQ2FjaGUgZnJvbSAnLi4vLi4vdXRpbC9DYWNoZSc7XHJcbmltcG9ydCB7XHJcbiAgICBERUZBVUxUX0hPU1ROQU1FX0FQSSxcclxuICAgIERFRkFVTFRfSE9TVE5BTUVfQVBQLFxyXG4gICAgREVGQVVMVF9IT1NUTkFNRV9TVEFUSUMsXHJcbiAgICBERUZBVUxUX1BSRVZJRVdfVkVSU0lPTixcclxuICAgIERFRkFVTFRfUFJFVklFV19MT0NBTEUsXHJcbiAgICBERUZBVUxUX1BBVEhfU1RBVElDX1BSRVZJRVcsXHJcbiAgICBDTElFTlRfTkFNRV9DT05URU5UX1BSRVZJRVdcclxufSBmcm9tICcuLi8uLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgdHlwZSB7IFRva2VuLCBCb3hJdGVtIH0gZnJvbSAnLi4vLi4vZmxvd1R5cGVzJztcclxuaW1wb3J0ICcuLi9mb250cy5zY3NzJztcclxuaW1wb3J0ICcuLi9iYXNlLnNjc3MnO1xyXG5pbXBvcnQgJy4vQ29udGVudFByZXZpZXcuc2Nzcyc7XHJcblxyXG50eXBlIERlZmF1bHRQcm9wcyA9IHt8XHJcbiAgICBhcGlIb3N0OiBzdHJpbmcsXHJcbiAgICBhcHBIb3N0OiBzdHJpbmcsXHJcbiAgICBzdGF0aWNIb3N0OiBzdHJpbmcsXHJcbiAgICBzdGF0aWNQYXRoOiBzdHJpbmcsXHJcbiAgICBsb2NhbGU6IHN0cmluZyxcclxuICAgIHZlcnNpb246IHN0cmluZyxcclxuICAgIGhhc1NpZGViYXI6IGJvb2xlYW4sXHJcbiAgICBoYXNIZWFkZXI6IGJvb2xlYW4sXHJcbiAgICBjbGFzc05hbWU6IHN0cmluZyxcclxuICAgIG9uTG9hZDogRnVuY3Rpb24sXHJcbiAgICBvbk5hdmlnYXRlOiBGdW5jdGlvblxyXG58fTtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBmaWxlPzogQm94SXRlbSxcclxuICAgIGZpbGVJZD86IHN0cmluZyxcclxuICAgIGxvY2FsZTogc3RyaW5nLFxyXG4gICAgdmVyc2lvbjogc3RyaW5nLFxyXG4gICAgaGFzU2lkZWJhcjogYm9vbGVhbixcclxuICAgIGhhc0hlYWRlcjogYm9vbGVhbixcclxuICAgIGFwaUhvc3Q6IHN0cmluZyxcclxuICAgIGFwcEhvc3Q6IHN0cmluZyxcclxuICAgIHN0YXRpY0hvc3Q6IHN0cmluZyxcclxuICAgIHN0YXRpY1BhdGg6IHN0cmluZyxcclxuICAgIHRva2VuOiBUb2tlbixcclxuICAgIGNsYXNzTmFtZTogc3RyaW5nLFxyXG4gICAgZ2V0TG9jYWxpemVkTWVzc2FnZTogRnVuY3Rpb24sXHJcbiAgICBvbkxvYWQ6IEZ1bmN0aW9uLFxyXG4gICAgb25OYXZpZ2F0ZTogRnVuY3Rpb24sXHJcbiAgICBvbkNsb3NlPzogRnVuY3Rpb24sXHJcbiAgICBza2lwU2VydmVyVXBkYXRlPzogYm9vbGVhbixcclxuICAgIGNhY2hlPzogQ2FjaGUsXHJcbiAgICBjb2xsZWN0aW9uPzogc3RyaW5nW10sXHJcbiAgICBsb2dvVXJsPzogc3RyaW5nLFxyXG4gICAgc2hhcmVkTGluaz86IHN0cmluZyxcclxuICAgIHNoYXJlZExpbmtQYXNzd29yZD86IHN0cmluZ1xyXG59O1xyXG5cclxudHlwZSBTdGF0ZSA9IHtcclxuICAgIGZpbGU/OiBCb3hJdGVtXHJcbn07XHJcblxyXG5jbGFzcyBDb250ZW50UHJldmlldyBleHRlbmRzIFB1cmVDb21wb25lbnQ8RGVmYXVsdFByb3BzLCBQcm9wcywgU3RhdGU+IHtcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBwcm9wczogUHJvcHM7XHJcbiAgICBzdGF0ZTogU3RhdGU7XHJcbiAgICBwcmV2aWV3OiBhbnk7XHJcbiAgICBhcGk6IEFQSTtcclxuXHJcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzOiBEZWZhdWx0UHJvcHMgPSB7XHJcbiAgICAgICAgY2xhc3NOYW1lOiAnJyxcclxuICAgICAgICBhcGlIb3N0OiBERUZBVUxUX0hPU1ROQU1FX0FQSSxcclxuICAgICAgICBhcHBIb3N0OiBERUZBVUxUX0hPU1ROQU1FX0FQUCxcclxuICAgICAgICBzdGF0aWNIb3N0OiBERUZBVUxUX0hPU1ROQU1FX1NUQVRJQyxcclxuICAgICAgICBzdGF0aWNQYXRoOiBERUZBVUxUX1BBVEhfU1RBVElDX1BSRVZJRVcsXHJcbiAgICAgICAgbG9jYWxlOiBERUZBVUxUX1BSRVZJRVdfTE9DQUxFLFxyXG4gICAgICAgIHZlcnNpb246IERFRkFVTFRfUFJFVklFV19WRVJTSU9OLFxyXG4gICAgICAgIGhhc1NpZGViYXI6IGZhbHNlLFxyXG4gICAgICAgIGhhc0hlYWRlcjogZmFsc2UsXHJcbiAgICAgICAgb25Mb2FkOiBub29wLFxyXG4gICAgICAgIG9uTmF2aWdhdGU6IG5vb3BcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBbY29uc3RydWN0b3JdXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge0NvbnRlbnRQcmV2aWV3fVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgY29uc3QgeyBmaWxlLCBjYWNoZSwgdG9rZW4sIHNoYXJlZExpbmssIHNoYXJlZExpbmtQYXNzd29yZCwgYXBpSG9zdCB9ID0gcHJvcHM7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IGZpbGUgfTtcclxuICAgICAgICB0aGlzLmlkID0gdW5pcXVlaWQoJ2JjcHJfJyk7XHJcbiAgICAgICAgdGhpcy5hcGkgPSBuZXcgQVBJKHtcclxuICAgICAgICAgICAgY2FjaGUsXHJcbiAgICAgICAgICAgIHRva2VuLFxyXG4gICAgICAgICAgICBzaGFyZWRMaW5rLFxyXG4gICAgICAgICAgICBzaGFyZWRMaW5rUGFzc3dvcmQsXHJcbiAgICAgICAgICAgIGFwaUhvc3QsXHJcbiAgICAgICAgICAgIGNsaWVudE5hbWU6IENMSUVOVF9OQU1FX0NPTlRFTlRfUFJFVklFV1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xlYW51cFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5wcmV2aWV3KSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlldy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcclxuICAgICAgICAgICAgdGhpcy5wcmV2aWV3LmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcmV2aWV3ID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIHNoZWxsIG1vdW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogUHJvcHMpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB7IGZpbGUsIGZpbGVJZCwgdG9rZW4gfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICBjb25zdCBoYXNUb2tlbkNoYW5nZWQgPSBuZXh0UHJvcHMudG9rZW4gIT09IHRva2VuO1xyXG4gICAgICAgIGNvbnN0IGhhc0ZpbGVJZENoYW5nZWQgPSBuZXh0UHJvcHMuZmlsZUlkICE9PSBmaWxlSWQ7XHJcbiAgICAgICAgY29uc3QgaGFzRmlsZUNoYW5nZWQgPSBuZXh0UHJvcHMuZmlsZSAhPT0gZmlsZTtcclxuXHJcbiAgICAgICAgY29uc3QgbmV3U3RhdGUgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKGhhc1Rva2VuQ2hhbmdlZCB8fCBoYXNGaWxlQ2hhbmdlZCB8fCBoYXNGaWxlSWRDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIGlmIChoYXNGaWxlQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgbmV3U3RhdGUuZmlsZSA9IG5leHRQcm9wcy5maWxlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3U3RhdGUuZmlsZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2aWV3KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXcuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aWV3ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBPbmx5IHVwZGF0ZSB0aGUgc3RhdGUgaWYgdGhlcmUgaXMgc29tZXRoaW5nIHRvIHVwZGF0ZVxyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhuZXdTdGF0ZSkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBhZnRlciBzaGVsbCBtb3VudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2FkQXNzZXRzQW5kUHJldmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIHNoZWxsIHVwZGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubG9hZEFzc2V0c0FuZFByZXZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIGFzc2V0cyBhbmQgcHJldmlld1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBsb2FkQXNzZXRzQW5kUHJldmlldygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNQcmV2aWV3TGlicmFyeUxvYWRlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFN0eWxlc2hlZXQoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NyaXB0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZFByZXZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgcHJldmlldyBhc3NldCB1cmxzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gYmFzZSB1cmxcclxuICAgICAqL1xyXG4gICAgZ2V0QmFzZVBhdGgoYXNzZXQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgeyBzdGF0aWNIb3N0LCBzdGF0aWNQYXRoLCBsb2NhbGUsIHZlcnNpb24gfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHBhdGg6IHN0cmluZyA9IGAke3N0YXRpY1BhdGh9LyR7dmVyc2lvbn0vJHtsb2NhbGV9LyR7YXNzZXR9YDtcclxuICAgICAgICBjb25zdCBzdWZmaXg6IHN0cmluZyA9IHN0YXRpY0hvc3QuZW5kc1dpdGgoJy8nKSA/IHBhdGggOiBgLyR7cGF0aH1gO1xyXG4gICAgICAgIHJldHVybiBgJHtzdGF0aWNIb3N0fSR7c3VmZml4fWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHByZXZpZXcgYXNzZXRzIGFyZSBsb2FkZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBwcmV2aWV3IGlzIGxvYWRlZFxyXG4gICAgICovXHJcbiAgICBpc1ByZXZpZXdMaWJyYXJ5TG9hZGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhIWdsb2JhbC5Cb3ggJiYgISFnbG9iYWwuQm94LlByZXZpZXc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyBleHRlcm5hbCBjc3MgYnkgYXBwZW5kaW5nIGEgPGxpbms+IGVsZW1lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzaGVldCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB7IGhlYWQgfSA9IGRvY3VtZW50O1xyXG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gdGhpcy5nZXRCYXNlUGF0aCgncHJldmlldy5jc3MnKTtcclxuXHJcbiAgICAgICAgaWYgKCFoZWFkIHx8IGhlYWQucXVlcnlTZWxlY3RvcihgbGlua1tyZWw9XCJzdHlsZXNoZWV0XCJdW2hyZWY9XCIke3VybH1cIl1gKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG4gICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xyXG4gICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XHJcbiAgICAgICAgbGluay5ocmVmID0gdXJsO1xyXG4gICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQobGluayk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyBleHRlcm5hbCBzY3JpcHQgYnkgYXBwZW5kaW5nIGEgPHNjcmlwdD4gZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGxvYWRTY3JpcHQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgeyBoZWFkIH0gPSBkb2N1bWVudDtcclxuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0QmFzZVBhdGgoJ3ByZXZpZXcuanMnKTtcclxuXHJcbiAgICAgICAgaWYgKCFoZWFkIHx8IGhlYWQucXVlcnlTZWxlY3Rvcihgc2NyaXB0W3NyYz1cIiR7dXJsfVwiXWApKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgICAgIHNjcmlwdC5zcmMgPSB1cmw7XHJcbiAgICAgICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCB0aGlzLmxvYWRQcmV2aWV3KTtcclxuICAgICAgICBoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgcHJldmlld1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGxvYWRQcmV2aWV3ID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ByZXZpZXdMaWJyYXJ5TG9hZGVkKCkgfHwgdGhpcy5wcmV2aWV3KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHsgUHJldmlldyB9ID0gZ2xvYmFsLkJveDtcclxuICAgICAgICBjb25zdCB7IGZpbGVJZCwgdG9rZW4sIG9uTG9hZCwgb25OYXZpZ2F0ZSwgLi4ucmVzdCB9OiBQcm9wcyA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgeyBmaWxlIH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBmaWxlT3JGaWxlSWQgPSBmaWxlID8gT2JqZWN0LmFzc2lnbih7fSwgZmlsZSkgOiBmaWxlSWQ7XHJcblxyXG4gICAgICAgIGlmICgoIWZpbGUgJiYgIWZpbGVJZCkgfHwgIXRva2VuKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBmaWxlIG9yIGZpbGVJZCBhbmQvb3IgdG9rZW4gZm9yIFByZXZpZXchJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnByZXZpZXcgPSBuZXcgUHJldmlldygpO1xyXG4gICAgICAgIHRoaXMucHJldmlldy5hZGRMaXN0ZW5lcignbmF2aWdhdGUnLCAoaWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlckFuZFNpZGViYXIoaWQpO1xyXG4gICAgICAgICAgICBvbk5hdmlnYXRlKGlkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnByZXZpZXcuYWRkTGlzdGVuZXIoJ2xvYWQnLCBvbkxvYWQpO1xyXG4gICAgICAgIHRoaXMucHJldmlldy5zaG93KGZpbGVPckZpbGVJZCwgdG9rZW4sIHtcclxuICAgICAgICAgICAgY29udGFpbmVyOiBgIyR7dGhpcy5pZH0gLmJjcHItY29udGVudGAsXHJcbiAgICAgICAgICAgIGhlYWRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICAuLi5yZXN0XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVIZWFkZXJBbmRTaWRlYmFyKGZpbGUgPyBmaWxlLmlkIDogZmlsZUlkKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGhlYWRlciBhbmQgc2lkZWJhclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgLSBmaWxlIGlkXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICB1cGRhdGVIZWFkZXJBbmRTaWRlYmFyKGlkPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFpZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaWQgZm9yIFByZXZpZXchJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZmV0Y2hGaWxlKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlbGxzIHRoZSBwcmV2aWV3IHRvIHJlc2l6ZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIG9uUmVzaXplID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnByZXZpZXcpIHtcclxuICAgICAgICAgICAgdGhpcy5wcmV2aWV3LnJlc2l6ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOZXR3b3JrIGVycm9yIGNhbGxiYWNrXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIGVycm9yIG9iamVjdFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZXJyb3JDYWxsYmFjayA9IChlcnJvcjogRXJyb3IpOiB2b2lkID0+IHtcclxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlsZSBmZXRjaCBzdWNjZXNzIGNhbGxiYWNrXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBmaWxlIC0gQm94IGZpbGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZldGNoRmlsZVN1Y2Nlc3NDYWxsYmFjayA9IChmaWxlOiBCb3hJdGVtKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGZpbGUgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmV0Y2hlcyBhIGZpbGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIGZpbGUgaWRcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbnx2b2lkfSBbZm9yY2VGZXRjaF0gVG8gdm9pZCBjYWNoZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZmV0Y2hGaWxlKGlkOiBzdHJpbmcsIGZvcmNlRmV0Y2g6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHsgaGFzU2lkZWJhciB9OiBQcm9wcyA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgdGhpcy5hcGkuZ2V0RmlsZUFQSSgpLmZpbGUoaWQsIHRoaXMuZmV0Y2hGaWxlU3VjY2Vzc0NhbGxiYWNrLCB0aGlzLmVycm9yQ2FsbGJhY2ssIGZvcmNlRmV0Y2gsIGhhc1NpZGViYXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdmlld2VyIGluc3RhbmNlIGJlaW5nIHVzZWQgYnkgcHJldmlldy5cclxuICAgICAqIFRoaXMgd2lsbCBsZXQgY2hpbGQgY29tcG9uZW50cyBhY2Nlc3MgdGhlIHZpZXdlcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge1ByZXZpZXd9IGN1cnJlbnQgaW5zdGFuY2Ugb2YgcHJldmlld1xyXG4gICAgICovXHJcbiAgICBnZXRQcmV2aWV3ZXIgPSAoKTogYW55ID0+IHtcclxuICAgICAgICBjb25zdCB7IGZpbGUgfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGlmICghdGhpcy5wcmV2aWV3IHx8ICFmaWxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB2aWV3ZXIgPSB0aGlzLnByZXZpZXcuZ2V0Q3VycmVudFZpZXdlcigpO1xyXG4gICAgICAgIGNvbnN0IHByZXZpZXdpbmdGaWxlID0gdGhpcy5wcmV2aWV3LmdldEN1cnJlbnRGaWxlKCk7XHJcbiAgICAgICAgaWYgKCFwcmV2aWV3aW5nRmlsZSB8fCAhdmlld2VyIHx8IHByZXZpZXdpbmdGaWxlLmlkICE9PSBmaWxlLmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmlld2VyO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgdGhlIGZpbGUgcHJldmlld1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQHJldHVybiB7RWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgY2xhc3NOYW1lLCBoYXNTaWRlYmFyLCBoYXNIZWFkZXIsIG9uQ2xvc2UsIGdldExvY2FsaXplZE1lc3NhZ2UgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHsgZmlsZSB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBpZD17dGhpcy5pZH0gY2xhc3NOYW1lPXtgYnVpayBiY3ByICR7Y2xhc3NOYW1lfWB9PlxyXG4gICAgICAgICAgICAgICAge2hhc0hlYWRlciAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxIZWFkZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZT17ZmlsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1NpZGViYXJCdXR0b249e2hhc1NpZGViYXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U9e29uQ2xvc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldExvY2FsaXplZE1lc3NhZ2U9e2dldExvY2FsaXplZE1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgLz59XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYmNwci1ib2R5Jz5cclxuICAgICAgICAgICAgICAgICAgICB7aGFzU2lkZWJhciAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8U2lkZWJhclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZT17ZmlsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldFByZXZpZXdlcj17dGhpcy5nZXRQcmV2aWV3ZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlPXtnZXRMb2NhbGl6ZWRNZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPn1cclxuICAgICAgICAgICAgICAgICAgICA8TWVhc3VyZSBib3VuZHMgb25SZXNpemU9e3RoaXMub25SZXNpemV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7KHsgbWVhc3VyZVJlZiB9KSA9PiA8ZGl2IHJlZj17bWVhc3VyZVJlZn0gY2xhc3NOYW1lPSdiY3ByLWNvbnRlbnQnIC8+fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvTWVhc3VyZT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250ZW50UHJldmlldztcclxuIl19