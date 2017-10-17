var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Content Explorer Component
 * @author Box
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import Modal from 'react-modal';
import debounce from 'lodash.debounce';
import noop from 'lodash.noop';
import uniqueid from 'lodash.uniqueid';
import cloneDeep from 'lodash.clonedeep';
import Content from './Content';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import RenameDialog from './RenameDialog';
import CreateFolderDialog from '../CreateFolderDialog';
import ShareDialog from './ShareDialog';
import UploadDialog from '../UploadDialog';
import PreviewDialog from './PreviewDialog';
import Header from '../Header';
import SubHeader from '../SubHeader/SubHeader';
import API from '../../api';
import makeResponsive from '../makeResponsive';
import openUrlInsideIframe from '../../util/iframe';
import { isFocusableElement, isInputElement, focus } from '../../util/dom';
import { DEFAULT_HOSTNAME_UPLOAD, DEFAULT_HOSTNAME_API, DEFAULT_HOSTNAME_APP, DEFAULT_HOSTNAME_STATIC, DEFAULT_SEARCH_DEBOUNCE, SORT_ASC, FIELD_NAME, FIELD_MODIFIED_AT, FIELD_INTERACTED_AT, DEFAULT_ROOT, VIEW_SEARCH, VIEW_FOLDER, VIEW_ERROR, VIEW_RECENTS, TYPE_FILE, TYPE_WEBLINK, TYPE_FOLDER, CLIENT_NAME_CONTENT_EXPLORER, DEFAULT_VIEW_FILES, DEFAULT_VIEW_RECENTS, ERROR_CODE_ITEM_NAME_INVALID, ERROR_CODE_ITEM_NAME_TOO_LONG, ERROR_CODE_ITEM_NAME_IN_USE, TYPED_ID_FOLDER_PREFIX } from '../../constants';

var ContentExplorer = function (_Component) {
    _inherits(ContentExplorer, _Component);

    /**
     * [constructor]
     *
     * @private
     * @return {ItemPicker}
     */
    function ContentExplorer(props) {
        _classCallCheck(this, ContentExplorer);

        var _this = _possibleConstructorReturn(this, (ContentExplorer.__proto__ || Object.getPrototypeOf(ContentExplorer)).call(this, props));

        _initialiseProps.call(_this);

        var token = props.token,
            sharedLink = props.sharedLink,
            sharedLinkPassword = props.sharedLinkPassword,
            apiHost = props.apiHost,
            uploadHost = props.uploadHost,
            sortBy = props.sortBy,
            sortDirection = props.sortDirection,
            responseFilter = props.responseFilter,
            rootFolderId = props.rootFolderId;


        _this.api = new API({
            token: token,
            sharedLink: sharedLink,
            sharedLinkPassword: sharedLinkPassword,
            apiHost: apiHost,
            uploadHost: uploadHost,
            responseFilter: responseFilter,
            clientName: CLIENT_NAME_CONTENT_EXPLORER,
            id: '' + TYPED_ID_FOLDER_PREFIX + rootFolderId
        });

        _this.id = uniqueid('bce_');

        _this.state = {
            sortBy: sortBy,
            sortDirection: sortDirection,
            rootName: '',
            currentCollection: {},
            searchQuery: '',
            view: VIEW_FOLDER,
            isDeleteModalOpen: false,
            isRenameModalOpen: false,
            isCreateFolderModalOpen: false,
            isShareModalOpen: false,
            isUploadModalOpen: false,
            isPreviewModalOpen: false,
            isLoading: false,
            errorCode: '',
            focusedRow: 0
        };
        return _this;
    }

    /**
     * Destroys api instances
     *
     * @private
     * @return {void}
     */
    // Keeps track of very 1st load

    _createClass(ContentExplorer, [{
        key: 'clearCache',
        value: function clearCache() {
            this.api.destroy(true);
        }

        /**
         * Cleanup
         *
         * @private
         * @inheritdoc
         * @return {void}
         */

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.clearCache();
        }

        /**
         * Fetches the root folder on load
         *
         * @private
         * @inheritdoc
         * @return {void}
         */

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                defaultView = _props.defaultView,
                currentFolderId = _props.currentFolderId;

            this.rootElement = document.getElementById(this.id);
            // $FlowFixMe: child will exist
            this.appElement = this.rootElement.firstElementChild;

            if (defaultView === DEFAULT_VIEW_RECENTS) {
                this.showRecents(true);
            } else {
                this.fetchFolder(currentFolderId);
            }
        }

        /**
         * react-modal expects the Modals app element
         * to be set so that it can add proper aria tags.
         * We need to keep setting it, since there might be
         * multiple widgets on the same page with their own
         * app elements.
         *
         * @private
         * @param {Object} collection item collection object
         * @return {void}
         */

    }, {
        key: 'setModalAppElement',
        value: function setModalAppElement() {
            Modal.setAppElement(this.appElement);
        }

        /**
         * Fetches the current folder if different
         * from what was already fetched before.
         *
         * @private
         * @inheritdoc
         * @return {void}
         */

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var currentFolderId = this.props.currentFolderId;
            var newFolderId = nextProps.currentFolderId;

            if (currentFolderId !== newFolderId) {
                this.fetchFolder(newFolderId);
            }
        }

        /**
         * Resets the percentLoaded in the collection
         * so that the loading bar starts showing
         *
         * @private
         * @fires cancel
         * @return {void}
         */

    }, {
        key: 'currentUnloadedCollection',
        value: function currentUnloadedCollection() {
            var currentCollection = this.state.currentCollection;

            return Object.assign(currentCollection, {
                percentLoaded: 0
            });
        }

        /**
         * Network error callback
         *
         * @private
         * @param {Error} error error object
         * @return {void}
         */

    }, {
        key: 'finishNavigation',


        /**
         * Focuses the grid and fires navigate event
         *
         * @private
         * @return {void}
         */
        value: function finishNavigation() {
            var autoFocus = this.props.autoFocus;
            var percentLoaded = this.state.currentCollection.percentLoaded;

            // If loading for the very first time, only allow focus if autoFocus is true

            if (this.firstLoad && !autoFocus) {
                this.firstLoad = false;
                return;
            }

            // Don't focus the grid until its loaded and user is not already on an interactable element
            if (percentLoaded === 100 && !isFocusableElement(document.activeElement)) {
                focus(this.rootElement, '.bce-item-row');
                this.setState({ focusedRow: 0 });
            }

            this.firstLoad = false;
        }

        /**
         * Folder fetch success callback
         *
         * @private
         * @param {Boolean|void} [triggerEvent] To trigger navigate event
         * @param {Object} collection item collection object
         * @return {void}
         */

    }, {
        key: 'fetchFolderSuccessCallback',
        value: function fetchFolderSuccessCallback(collection) {
            var triggerEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var _props2 = this.props,
                onNavigate = _props2.onNavigate,
                rootFolderId = _props2.rootFolderId;
            var id = collection.id,
                name = collection.name,
                boxItem = collection.boxItem;

            // New folder state

            var newState = {
                selected: undefined,
                currentCollection: collection,
                rootName: id === rootFolderId ? name : ''
            };

            // Unselect any rows that were selected
            this.unselect();

            // Close any open modals
            this.closeModals();

            // Fire folder navigation event
            if (triggerEvent && !!boxItem) {
                onNavigate(cloneDeep(boxItem));
            }

            // Set the new state and focus the grid for tabbing
            this.setState(newState, this.finishNavigation);
        }

        /**
         * Fetches a folder, defaults to fetching root folder
         *
         * @private
         * @param {string|void} [id] folder id
         * @param {Boolean|void} [triggerEvent] To trigger navigate event
         * @param {Boolean|void} [forceFetch] To void the cache
         * @return {void}
         */


        /**
         * Action performed when clicking on an item
         *
         * @private
         * @param {Object|string} item - the clicked box item
         * @return {void}
         */


        /**
         * Search success callback
         *
         * @private
         * @param {Object} collection item collection object
         * @return {void}
         */


        /**
         * Debounced searching
         *
         * @private
         * @param {string} id folder id
         * @param {string} query search string
         * @param {Boolean|void} [forceFetch] To void cache
         * @return {void}
         */


        /**
         * Searches
         *
         * @private
         * @param {string} query search string
         * @param {Boolean|void} [forceFetch] To void cache
         * @return {void}
         */


        /**
         * Recents fetch success callback
         *
         * @private
         * @param {Object} collection item collection object
         * @return {void}
         */


        /**
         * Shows recents
         *
         * @private
         * @param {Boolean|void} [forceFetch] To void cache
         * @return {void}
         */


        /**
         * Uploads
         *
         * @private
         * @param {File} file dom file object
         * @return {void}
         */


        /**
         * Upload success handler
         *
         * @private
         * @param {File} file dom file object
         * @return {void}
         */


        /**
         * Changes the share access of an item
         *
         * @private
         * @param {Object} item file or folder object
         * @param {string} access share access
         * @return {void}
         */


        /**
         * Chages the sort by and sort direction
         *
         * @private
         * @param {string} sortBy - field to sorty by
         * @param {string} sortDirection - sort direction
         * @return {void}
         */

    }, {
        key: 'unselect',


        /**
         * Unselects an item
         *
         * @private
         * @param {Object} item - file or folder object
         * @param {Function|void} [onSelect] - optional on select callback
         * @return {void}
         */
        value: function unselect() {
            var selected = this.state.selected;

            if (selected) {
                selected.selected = false;
            }
        }

        /**
         * Selects or unselects an item
         *
         * @private
         * @param {Object} item - file or folder object
         * @param {Function|void} [onSelect] - optional on select callback
         * @return {void}
         */


        /**
         * Selects the clicked file and then previews it
         * or opens it, if it was a web link
         *
         * @private
         * @param {Object} item - file or folder object
         * @return {void}
         */


        /**
         * Previews a file
         *
         * @private
         * @param {Object} item - file or folder object
         * @return {void}
         */


        /**
         * Selects the clicked file and then downloads it
         *
         * @private
         * @param {Object} item - file or folder object
         * @return {void}
         */


        /**
         * Downloads a file
         *
         * @private
         * @return {void}
         */


        /**
         * Selects the clicked file and then deletes it
         *
         * @private
         * @param {Object} item - file or folder object
         * @return {void}
         */


        /**
         * Deletes a file
         *
         * @private
         * @return {void}
         */


        /**
         * Selects the clicked file and then renames it
         *
         * @private
         * @param {Object} item - file or folder object
         * @return {void}
         */


        /**
         * Callback for renaming an item
         *
         * @private
         * @param {string} value new item name
         * @return {void}
         */


        /**
         * Creates a new folder
         *
         * @private
         * @return {void}
         */


        /**
         * New folder callback
         *
         * @private
         * @param {string} name - folder name
         * @return {void}
         */


        /**
         * Selects the clicked file and then shares it
         *
         * @private
         * @param {Object} item - file or folder object
         * @return {void}
         */


        /**
         * Chages the sort by and sort direction
         *
         * @private
         * @return {void}
         */


        /**
         * Saves reference to table component
         *
         * @private
         * @param {Component} react component
         * @return {void}
         */


        /**
         * Closes the modal dialogs that may be open
         *
         * @private
         * @return {void}
         */


        /**
         * Keyboard events
         *
         * @private
         * @inheritdoc
         * @return {void}
         */

    }, {
        key: 'render',


        /**
         * Renders the file picker
         *
         * @private
         * @inheritdoc
         * @return {Element}
         */
        value: function render() {
            var _props3 = this.props,
                rootFolderId = _props3.rootFolderId,
                logoUrl = _props3.logoUrl,
                canUpload = _props3.canUpload,
                canSetShareAccess = _props3.canSetShareAccess,
                canDelete = _props3.canDelete,
                canRename = _props3.canRename,
                canDownload = _props3.canDownload,
                canPreview = _props3.canPreview,
                canShare = _props3.canShare,
                getLocalizedMessage = _props3.getLocalizedMessage,
                token = _props3.token,
                sharedLink = _props3.sharedLink,
                sharedLinkPassword = _props3.sharedLinkPassword,
                apiHost = _props3.apiHost,
                appHost = _props3.appHost,
                staticHost = _props3.staticHost,
                uploadHost = _props3.uploadHost,
                isSmall = _props3.isSmall,
                isTouch = _props3.isTouch,
                className = _props3.className,
                measureRef = _props3.measureRef,
                onPreview = _props3.onPreview,
                onUpload = _props3.onUpload,
                hasPreviewSidebar = _props3.hasPreviewSidebar;
            var _state = this.state,
                view = _state.view,
                rootName = _state.rootName,
                currentCollection = _state.currentCollection,
                searchQuery = _state.searchQuery,
                isDeleteModalOpen = _state.isDeleteModalOpen,
                isRenameModalOpen = _state.isRenameModalOpen,
                isShareModalOpen = _state.isShareModalOpen,
                isUploadModalOpen = _state.isUploadModalOpen,
                isPreviewModalOpen = _state.isPreviewModalOpen,
                isCreateFolderModalOpen = _state.isCreateFolderModalOpen,
                selected = _state.selected,
                isLoading = _state.isLoading,
                errorCode = _state.errorCode,
                focusedRow = _state.focusedRow;
            var id = currentCollection.id,
                permissions = currentCollection.permissions;

            var _ref = permissions || {},
                can_upload = _ref.can_upload;

            var styleClassName = classNames('buik bce', className);
            var allowUpload = canUpload && can_upload;

            /* eslint-disable jsx-a11y/no-static-element-interactions */
            /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
            return React.createElement(
                'div',
                { id: this.id, className: styleClassName, ref: measureRef },
                React.createElement(
                    'div',
                    { className: 'buik-app-element', onKeyDown: this.onKeyDown, tabIndex: 0 },
                    React.createElement(Header, {
                        view: view,
                        isSmall: isSmall,
                        searchQuery: searchQuery,
                        logoUrl: logoUrl,
                        onSearch: this.search,
                        getLocalizedMessage: getLocalizedMessage
                    }),
                    React.createElement(SubHeader, {
                        view: view,
                        rootId: rootFolderId,
                        isSmall: isSmall,
                        rootName: rootName,
                        currentCollection: currentCollection,
                        canUpload: allowUpload,
                        onUpload: this.upload,
                        onCreate: this.createFolder,
                        onItemClick: this.fetchFolder,
                        onSortChange: this.sort,
                        getLocalizedMessage: getLocalizedMessage
                    }),
                    React.createElement(Content, {
                        view: view,
                        rootId: rootFolderId,
                        isSmall: isSmall,
                        isTouch: isTouch,
                        rootElement: this.rootElement,
                        focusedRow: focusedRow,
                        canSetShareAccess: canSetShareAccess,
                        canShare: canShare,
                        canPreview: canPreview,
                        canDelete: canDelete,
                        canRename: canRename,
                        canDownload: canDownload,
                        currentCollection: currentCollection,
                        tableRef: this.tableRef,
                        onItemSelect: this.select,
                        onItemClick: this.onItemClick,
                        onItemDelete: this.delete,
                        onItemDownload: this.download,
                        onItemRename: this.rename,
                        onItemShare: this.share,
                        onItemPreview: this.preview,
                        onSortChange: this.sort,
                        getLocalizedMessage: getLocalizedMessage
                    })
                ),
                canUpload && !!this.appElement ? React.createElement(UploadDialog, {
                    isOpen: isUploadModalOpen,
                    rootFolderId: id,
                    token: token,
                    sharedLink: sharedLink,
                    sharedLinkPassword: sharedLinkPassword,
                    apiHost: apiHost,
                    uploadHost: uploadHost,
                    onClose: this.uploadSuccessHandler,
                    getLocalizedMessage: getLocalizedMessage,
                    parentElement: this.rootElement,
                    onUpload: onUpload
                }) : null,
                canUpload && !!this.appElement ? React.createElement(CreateFolderDialog, {
                    isOpen: isCreateFolderModalOpen,
                    onCreate: this.createFolderCallback,
                    onCancel: this.closeModals,
                    getLocalizedMessage: getLocalizedMessage,
                    isLoading: isLoading,
                    errorCode: errorCode,
                    parentElement: this.rootElement
                }) : null,
                canDelete && selected && !!this.appElement ? React.createElement(DeleteConfirmationDialog, {
                    isOpen: isDeleteModalOpen,
                    onDelete: this.deleteCallback,
                    onCancel: this.closeModals,
                    item: selected,
                    getLocalizedMessage: getLocalizedMessage,
                    isLoading: isLoading,
                    parentElement: this.rootElement
                }) : null,
                canRename && selected && !!this.appElement ? React.createElement(RenameDialog, {
                    isOpen: isRenameModalOpen,
                    onRename: this.renameCallback,
                    onCancel: this.closeModals,
                    item: selected,
                    getLocalizedMessage: getLocalizedMessage,
                    isLoading: isLoading,
                    errorCode: errorCode,
                    parentElement: this.rootElement
                }) : null,
                canShare && selected && !!this.appElement ? React.createElement(ShareDialog, {
                    isOpen: isShareModalOpen,
                    canSetShareAccess: canSetShareAccess,
                    onShareAccessChange: this.changeShareAccess,
                    onCancel: this.closeModals,
                    item: selected,
                    getLocalizedMessage: getLocalizedMessage,
                    isLoading: isLoading,
                    parentElement: this.rootElement
                }) : null,
                canPreview && selected && !!this.appElement ? React.createElement(PreviewDialog, {
                    isOpen: isPreviewModalOpen,
                    isTouch: isTouch,
                    onCancel: this.closeModals,
                    item: selected,
                    currentCollection: currentCollection,
                    token: token,
                    getLocalizedMessage: getLocalizedMessage,
                    parentElement: this.rootElement,
                    onPreview: onPreview,
                    showDownload: true,
                    hasPreviewSidebar: hasPreviewSidebar,
                    cache: this.api.getCache(),
                    apiHost: apiHost,
                    appHost: appHost,
                    staticHost: staticHost
                }) : null
            );
            /* eslint-enable jsx-a11y/no-static-element-interactions */
            /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
        }
    }]);

    return ContentExplorer;
}(Component);

ContentExplorer.defaultProps = {
    rootFolderId: DEFAULT_ROOT,
    sortBy: FIELD_NAME,
    sortDirection: SORT_ASC,
    canDownload: true,
    canDelete: true,
    canUpload: true,
    canRename: true,
    canShare: true,
    canPreview: true,
    canSetShareAccess: true,
    autoFocus: false,
    apiHost: DEFAULT_HOSTNAME_API,
    appHost: DEFAULT_HOSTNAME_APP,
    staticHost: DEFAULT_HOSTNAME_STATIC,
    uploadHost: DEFAULT_HOSTNAME_UPLOAD,
    className: '',
    onDelete: noop,
    onDownload: noop,
    onPreview: noop,
    onRename: noop,
    onCreate: noop,
    onSelect: noop,
    onUpload: noop,
    onNavigate: noop,
    defaultView: DEFAULT_VIEW_FILES,
    hasPreviewSidebar: false
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.firstLoad = true;

    this.errorCallback = function (error) {
        _this2.setState({
            view: VIEW_ERROR
        });
        /* eslint-disable no-console */
        console.error(error);
        /* eslint-enable no-console */
    };

    this.fetchFolder = function (id) {
        var triggerEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var forceFetch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var _props4 = _this2.props,
            rootFolderId = _props4.rootFolderId,
            canPreview = _props4.canPreview,
            hasPreviewSidebar = _props4.hasPreviewSidebar;
        var _state2 = _this2.state,
            sortBy = _state2.sortBy,
            sortDirection = _state2.sortDirection;

        var folderId = typeof id === 'string' ? id : rootFolderId;

        // If we are navigating around, aka not first load
        // then reset the focus to the root so that after
        // the collection loads the activeElement is not the
        // button that was clicked to fetch the folder
        if (!_this2.firstLoad) {
            _this2.rootElement.focus();
        }

        // Reset search state, the view and show busy indicator
        _this2.setState({
            searchQuery: '',
            view: VIEW_FOLDER,
            currentCollection: _this2.currentUnloadedCollection()
        });

        // Fetch the folder using folder API
        _this2.api.getFolderAPI().folder(folderId, sortBy, sortDirection, function (collection) {
            _this2.fetchFolderSuccessCallback(collection, triggerEvent);
        }, _this2.errorCallback, forceFetch, canPreview, hasPreviewSidebar);
    };

    this.onItemClick = function (item) {
        // If the id was passed in, just use that
        if (typeof item === 'string') {
            _this2.fetchFolder(item);
            return;
        }

        var id = item.id,
            type = item.type;
        var isTouch = _this2.props.isTouch;


        if (type === TYPE_FOLDER) {
            _this2.fetchFolder(id);
            return;
        }

        if (isTouch) {
            return;
        }

        _this2.preview(item);
    };

    this.searchSuccessCallback = function (collection) {
        var currentCollection = _this2.state.currentCollection;

        // Unselect any rows that were selected

        _this2.unselect();

        // Close any open modals
        _this2.closeModals();

        _this2.setState({
            selected: undefined,
            currentCollection: Object.assign(currentCollection, collection)
        });
    };

    this.debouncedSearch = debounce(function (id, query, forceFetch) {
        var _props5 = _this2.props,
            canPreview = _props5.canPreview,
            hasPreviewSidebar = _props5.hasPreviewSidebar;
        var _state3 = _this2.state,
            sortBy = _state3.sortBy,
            sortDirection = _state3.sortDirection;

        _this2.api.getSearchAPI().search(id, query, sortBy, sortDirection, _this2.searchSuccessCallback, _this2.errorCallback, forceFetch, canPreview, hasPreviewSidebar);
    }, DEFAULT_SEARCH_DEBOUNCE);

    this.search = function (query) {
        var forceFetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var rootFolderId = _this2.props.rootFolderId;
        var id = _this2.state.currentCollection.id;

        var folderId = typeof id === 'string' ? id : rootFolderId;
        var trimmedQuery = query.trim();

        if (!query) {
            // Query was cleared out, load the prior folder
            // The prior folder is always the parent folder for search
            _this2.fetchFolder(folderId, false);
            return;
        }

        if (!trimmedQuery) {
            // Query now only has bunch of spaces
            // do nothing and but update prior state
            _this2.setState({
                searchQuery: query
            });
            return;
        }

        _this2.setState({
            selected: undefined,
            searchQuery: query,
            view: VIEW_SEARCH,
            currentCollection: _this2.currentUnloadedCollection()
        });

        _this2.debouncedSearch(folderId, query, forceFetch);
    };

    this.recentsSuccessCallback = function (collection) {
        // Unselect any rows that were selected
        _this2.unselect();

        // Set the new state and focus the grid for tabbing
        _this2.setState({
            currentCollection: collection
        }, _this2.finishNavigation);
    };

    this.showRecents = function () {
        var forceFetch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var _props6 = _this2.props,
            rootFolderId = _props6.rootFolderId,
            canPreview = _props6.canPreview,
            hasPreviewSidebar = _props6.hasPreviewSidebar;
        var _state4 = _this2.state,
            sortBy = _state4.sortBy,
            sortDirection = _state4.sortDirection;

        // Recents are sorted by a different date field than the rest

        var by = sortBy === FIELD_MODIFIED_AT ? FIELD_INTERACTED_AT : sortBy;

        // Reset search state, the view and show busy indicator
        _this2.setState({
            searchQuery: '',
            view: VIEW_RECENTS,
            currentCollection: _this2.currentUnloadedCollection()
        });

        // Fetch the folder using folder API
        _this2.api.getRecentsAPI().recents(rootFolderId, by, sortDirection, _this2.recentsSuccessCallback, _this2.errorCallback, forceFetch, canPreview, hasPreviewSidebar);
    };

    this.upload = function () {
        var _state$currentCollect = _this2.state.currentCollection,
            id = _state$currentCollect.id,
            permissions = _state$currentCollect.permissions;
        var canUpload = _this2.props.canUpload;

        if (!canUpload || !id || !permissions) {
            return;
        }

        var can_upload = permissions.can_upload;

        if (!can_upload) {
            return;
        }

        _this2.setModalAppElement();
        _this2.setState({
            isUploadModalOpen: true
        });
    };

    this.uploadSuccessHandler = function () {
        var id = _this2.state.currentCollection.id;

        _this2.fetchFolder(id, false, true);
    };

    this.changeShareAccess = function (access) {
        var selected = _this2.state.selected;
        var canSetShareAccess = _this2.props.canSetShareAccess;

        if (!selected || !canSetShareAccess) {
            return;
        }

        var permissions = selected.permissions,
            type = selected.type;

        if (!permissions || !type) {
            return;
        }

        var can_set_share_access = permissions.can_set_share_access;

        if (!can_set_share_access) {
            return;
        }

        _this2.setState({ isLoading: true });
        _this2.api.getAPI(type).share(selected, access, function (updatedItem) {
            updatedItem.selected = true;
            _this2.setState({ selected: updatedItem, isLoading: false });
        });
    };

    this.sort = function (sortBy, sortDirection) {
        var _state5 = _this2.state,
            id = _state5.currentCollection.id,
            view = _state5.view,
            searchQuery = _state5.searchQuery;

        if (!id) {
            return;
        }

        _this2.setState({ sortBy: sortBy, sortDirection: sortDirection }, function () {
            if (view === VIEW_FOLDER) {
                _this2.fetchFolder(id, false);
            } else if (view === VIEW_RECENTS) {
                _this2.showRecents();
            } else if (view === VIEW_SEARCH) {
                _this2.search(searchQuery);
            } else {
                throw new Error('Cannot sort incompatible view!');
            }
        });
    };

    this.select = function (item) {
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
        var _state6 = _this2.state,
            selected = _state6.selected,
            _state6$currentCollec = _state6.currentCollection.items,
            items = _state6$currentCollec === undefined ? [] : _state6$currentCollec;
        var onSelect = _this2.props.onSelect;


        if (item === selected) {
            callback(item);
            return;
        }

        _this2.unselect();
        item.selected = true;

        var focusedRow = items.findIndex(function (i) {
            return i.id === item.id;
        });
        _this2.setState({ focusedRow: focusedRow, selected: item }, function () {
            onSelect(cloneDeep([item]));
            callback(item);
        });
    };

    this.preview = function (item) {
        var type = item.type,
            url = item.url;

        if (type === TYPE_WEBLINK) {
            window.open(url);
            return;
        }

        _this2.select(item, _this2.previewCallback);
    };

    this.previewCallback = function () {
        var selected = _this2.state.selected;
        var canPreview = _this2.props.canPreview;

        if (!selected || !canPreview) {
            return;
        }

        var permissions = selected.permissions;

        if (!permissions) {
            return;
        }

        var can_preview = permissions.can_preview;

        if (!can_preview) {
            return;
        }

        _this2.setState({ isPreviewModalOpen: true });
    };

    this.download = function (item) {
        _this2.select(item, _this2.downloadCallback);
    };

    this.downloadCallback = function () {
        var selected = _this2.state.selected;
        var _props7 = _this2.props,
            canDownload = _props7.canDownload,
            onDownload = _props7.onDownload;

        if (!selected || !canDownload) {
            return;
        }

        var id = selected.id,
            permissions = selected.permissions;

        if (!id || !permissions) {
            return;
        }

        var can_download = permissions.can_download;

        if (!can_download) {
            return;
        }

        var openUrl = function openUrl(url) {
            openUrlInsideIframe(url);
            onDownload(cloneDeep([selected]));
        };
        var type = selected.type;

        if (type === TYPE_FILE) {
            _this2.api.getFileAPI().getDownloadUrl(id, openUrl, noop);
        }
    };

    this.delete = function (item) {
        _this2.select(item, _this2.deleteCallback);
    };

    this.deleteCallback = function () {
        var _state7 = _this2.state,
            selected = _state7.selected,
            isDeleteModalOpen = _state7.isDeleteModalOpen,
            view = _state7.view,
            searchQuery = _state7.searchQuery;
        var _props8 = _this2.props,
            canDelete = _props8.canDelete,
            onDelete = _props8.onDelete;

        if (!selected || !canDelete) {
            return;
        }

        var id = selected.id,
            permissions = selected.permissions,
            parent = selected.parent,
            type = selected.type;

        if (!id || !permissions || !parent || !type) {
            return;
        }

        var parentId = parent.id;
        var can_delete = permissions.can_delete;

        if (!can_delete || !parentId) {
            return;
        }

        if (!isDeleteModalOpen) {
            _this2.setModalAppElement();
            _this2.setState({ isDeleteModalOpen: true });
            return;
        }

        _this2.setState({ isLoading: true });
        _this2.api.getAPI(type).delete(selected, function () {
            onDelete(cloneDeep([selected]));
            if (view === VIEW_FOLDER) {
                _this2.fetchFolder(parentId, false);
            } else if (view === VIEW_RECENTS) {
                _this2.showRecents();
            } else if (view === VIEW_SEARCH) {
                _this2.search(searchQuery);
            } else {
                throw new Error('Cannot sort incompatible view!');
            }
        });
    };

    this.rename = function (item) {
        _this2.select(item, _this2.renameCallback);
    };

    this.renameCallback = function (nameWithoutExt, extension) {
        var _state8 = _this2.state,
            selected = _state8.selected,
            isRenameModalOpen = _state8.isRenameModalOpen;
        var _props9 = _this2.props,
            canRename = _props9.canRename,
            onRename = _props9.onRename;

        if (!selected || !canRename) {
            return;
        }

        var id = selected.id,
            permissions = selected.permissions,
            type = selected.type;

        if (!id || !permissions || !type) {
            return;
        }

        var can_rename = permissions.can_rename;

        if (!can_rename) {
            return;
        }

        if (!isRenameModalOpen || !nameWithoutExt) {
            _this2.setModalAppElement();
            _this2.setState({ isRenameModalOpen: true, errorCode: '' });
            return;
        }

        var name = '' + nameWithoutExt + extension;
        if (!nameWithoutExt.trim()) {
            _this2.setState({ errorCode: ERROR_CODE_ITEM_NAME_INVALID, isLoading: false });
            return;
        }

        _this2.setState({ isLoading: true });
        _this2.api.getAPI(type).rename(selected, name, function (updatedItem) {
            onRename(cloneDeep(selected));
            updatedItem.selected = true;
            _this2.setState({
                selected: updatedItem,
                isLoading: false,
                isRenameModalOpen: false
            });
        }, function (_ref2) {
            var code = _ref2.code;

            _this2.setState({ errorCode: code, isLoading: false });
        });
    };

    this.createFolder = function () {
        _this2.createFolderCallback();
    };

    this.createFolderCallback = function (name) {
        var _state9 = _this2.state,
            isCreateFolderModalOpen = _state9.isCreateFolderModalOpen,
            currentCollection = _state9.currentCollection;
        var _props10 = _this2.props,
            canUpload = _props10.canUpload,
            onCreate = _props10.onCreate;

        if (!canUpload) {
            return;
        }

        var id = currentCollection.id,
            permissions = currentCollection.permissions;

        if (!id || !permissions) {
            return;
        }

        var can_upload = permissions.can_upload;

        if (!can_upload) {
            return;
        }

        if (!isCreateFolderModalOpen || !name) {
            _this2.setModalAppElement();
            _this2.setState({ isCreateFolderModalOpen: true, errorCode: '' });
            return;
        }

        if (!name) {
            _this2.setState({ errorCode: ERROR_CODE_ITEM_NAME_INVALID, isLoading: false });
            return;
        }

        if (name.length > 255) {
            _this2.setState({ errorCode: ERROR_CODE_ITEM_NAME_TOO_LONG, isLoading: false });
            return;
        }

        _this2.setState({ isLoading: true });
        _this2.api.getFolderAPI().create(id, name, function (item) {
            onCreate(cloneDeep(item));
            _this2.fetchFolder(id, false);
            _this2.select(item);
        }, function (_ref3) {
            var status = _ref3.response.status;

            _this2.setState({
                errorCode: status === 409 ? ERROR_CODE_ITEM_NAME_IN_USE : ERROR_CODE_ITEM_NAME_INVALID,
                isLoading: false
            });
        });
    };

    this.share = function (item) {
        _this2.select(item, _this2.shareCallback);
    };

    this.shareCallback = function () {
        var selected = _this2.state.selected;
        /*
        const { canShare }: Props = this.props;
          if (!selected || !canShare) {
            return;
        }
          const { permissions } = selected;
        if (!permissions) {
            return;
        }
          const { can_share }: BoxItemPermission = permissions;
        if (!can_share) {
            return;
        } */

        if (!selected) {
            return;
        }

        _this2.setModalAppElement();
        _this2.setState({ isShareModalOpen: true });
    };

    this.tableRef = function (table) {
        _this2.table = table;
    };

    this.closeModals = function () {
        var focusedRow = _this2.state.focusedRow;


        _this2.setState({
            isLoading: false,
            isDeleteModalOpen: false,
            isRenameModalOpen: false,
            isCreateFolderModalOpen: false,
            isShareModalOpen: false,
            isUploadModalOpen: false,
            isPreviewModalOpen: false
        });

        var _state10 = _this2.state,
            selected = _state10.selected,
            _state10$currentColle = _state10.currentCollection.items,
            items = _state10$currentColle === undefined ? [] : _state10$currentColle;

        if (selected && items.length > 0) {
            focus(_this2.rootElement, '.bce-item-row-' + focusedRow);
        }
    };

    this.onKeyDown = function (event) {
        if (isInputElement(event.target)) {
            return;
        }

        var rootFolderId = _this2.props.rootFolderId;

        var key = event.key.toLowerCase();

        switch (key) {
            case '/':
                focus(_this2.rootElement, '.buik-search input[type="search"]', false);
                event.preventDefault();
                break;
            case 'arrowdown':
                focus(_this2.rootElement, '.bce-item-row', false);
                _this2.setState({ focusedRow: 0 });
                event.preventDefault();
                break;
            case 'g':
                break;
            case 'b':
                if (_this2.globalModifier) {
                    focus(_this2.rootElement, '.buik-breadcrumb button', false);
                    event.preventDefault();
                }
                break;
            case 'f':
                if (_this2.globalModifier) {
                    _this2.fetchFolder(rootFolderId);
                    event.preventDefault();
                }
                break;
            case 'u':
                if (_this2.globalModifier) {
                    _this2.upload();
                    event.preventDefault();
                }
                break;
            case 'r':
                if (_this2.globalModifier) {
                    _this2.showRecents(true);
                    event.preventDefault();
                }
                break;
            case 'n':
                if (_this2.globalModifier) {
                    _this2.createFolder();
                    event.preventDefault();
                }
                break;
            default:
                _this2.globalModifier = false;
                return;
        }

        _this2.globalModifier = key === 'g';
    };
};

export default makeResponsive(ContentExplorer);