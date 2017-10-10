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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRlbnRFeHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImNsYXNzTmFtZXMiLCJNb2RhbCIsImRlYm91bmNlIiwibm9vcCIsInVuaXF1ZWlkIiwiY2xvbmVEZWVwIiwiQ29udGVudCIsIkRlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyIsIlJlbmFtZURpYWxvZyIsIkNyZWF0ZUZvbGRlckRpYWxvZyIsIlNoYXJlRGlhbG9nIiwiVXBsb2FkRGlhbG9nIiwiUHJldmlld0RpYWxvZyIsIkhlYWRlciIsIlN1YkhlYWRlciIsIkFQSSIsIm1ha2VSZXNwb25zaXZlIiwib3BlblVybEluc2lkZUlmcmFtZSIsImlzRm9jdXNhYmxlRWxlbWVudCIsImlzSW5wdXRFbGVtZW50IiwiZm9jdXMiLCJERUZBVUxUX0hPU1ROQU1FX1VQTE9BRCIsIkRFRkFVTFRfSE9TVE5BTUVfQVBJIiwiREVGQVVMVF9IT1NUTkFNRV9BUFAiLCJERUZBVUxUX0hPU1ROQU1FX1NUQVRJQyIsIkRFRkFVTFRfU0VBUkNIX0RFQk9VTkNFIiwiU09SVF9BU0MiLCJGSUVMRF9OQU1FIiwiRklFTERfTU9ESUZJRURfQVQiLCJGSUVMRF9JTlRFUkFDVEVEX0FUIiwiREVGQVVMVF9ST09UIiwiVklFV19TRUFSQ0giLCJWSUVXX0ZPTERFUiIsIlZJRVdfRVJST1IiLCJWSUVXX1JFQ0VOVFMiLCJUWVBFX0ZJTEUiLCJUWVBFX1dFQkxJTksiLCJUWVBFX0ZPTERFUiIsIkNMSUVOVF9OQU1FX0NPTlRFTlRfRVhQTE9SRVIiLCJERUZBVUxUX1ZJRVdfRklMRVMiLCJERUZBVUxUX1ZJRVdfUkVDRU5UUyIsIkVSUk9SX0NPREVfSVRFTV9OQU1FX0lOVkFMSUQiLCJFUlJPUl9DT0RFX0lURU1fTkFNRV9UT09fTE9ORyIsIkVSUk9SX0NPREVfSVRFTV9OQU1FX0lOX1VTRSIsIlRZUEVEX0lEX0ZPTERFUl9QUkVGSVgiLCJDb250ZW50RXhwbG9yZXIiLCJwcm9wcyIsInRva2VuIiwic2hhcmVkTGluayIsInNoYXJlZExpbmtQYXNzd29yZCIsImFwaUhvc3QiLCJ1cGxvYWRIb3N0Iiwic29ydEJ5Iiwic29ydERpcmVjdGlvbiIsInJlc3BvbnNlRmlsdGVyIiwicm9vdEZvbGRlcklkIiwiYXBpIiwiY2xpZW50TmFtZSIsImlkIiwic3RhdGUiLCJyb290TmFtZSIsImN1cnJlbnRDb2xsZWN0aW9uIiwic2VhcmNoUXVlcnkiLCJ2aWV3IiwiaXNEZWxldGVNb2RhbE9wZW4iLCJpc1JlbmFtZU1vZGFsT3BlbiIsImlzQ3JlYXRlRm9sZGVyTW9kYWxPcGVuIiwiaXNTaGFyZU1vZGFsT3BlbiIsImlzVXBsb2FkTW9kYWxPcGVuIiwiaXNQcmV2aWV3TW9kYWxPcGVuIiwiaXNMb2FkaW5nIiwiZXJyb3JDb2RlIiwiZm9jdXNlZFJvdyIsImRlc3Ryb3kiLCJjbGVhckNhY2hlIiwiZGVmYXVsdFZpZXciLCJjdXJyZW50Rm9sZGVySWQiLCJyb290RWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhcHBFbGVtZW50IiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJzaG93UmVjZW50cyIsImZldGNoRm9sZGVyIiwic2V0QXBwRWxlbWVudCIsIm5leHRQcm9wcyIsIm5ld0ZvbGRlcklkIiwiT2JqZWN0IiwiYXNzaWduIiwicGVyY2VudExvYWRlZCIsImF1dG9Gb2N1cyIsImZpcnN0TG9hZCIsImFjdGl2ZUVsZW1lbnQiLCJzZXRTdGF0ZSIsImNvbGxlY3Rpb24iLCJ0cmlnZ2VyRXZlbnQiLCJvbk5hdmlnYXRlIiwibmFtZSIsImJveEl0ZW0iLCJuZXdTdGF0ZSIsInNlbGVjdGVkIiwidW5kZWZpbmVkIiwidW5zZWxlY3QiLCJjbG9zZU1vZGFscyIsImZpbmlzaE5hdmlnYXRpb24iLCJsb2dvVXJsIiwiY2FuVXBsb2FkIiwiY2FuU2V0U2hhcmVBY2Nlc3MiLCJjYW5EZWxldGUiLCJjYW5SZW5hbWUiLCJjYW5Eb3dubG9hZCIsImNhblByZXZpZXciLCJjYW5TaGFyZSIsImdldExvY2FsaXplZE1lc3NhZ2UiLCJhcHBIb3N0Iiwic3RhdGljSG9zdCIsImlzU21hbGwiLCJpc1RvdWNoIiwiY2xhc3NOYW1lIiwibWVhc3VyZVJlZiIsIm9uUHJldmlldyIsIm9uVXBsb2FkIiwiaGFzUHJldmlld1NpZGViYXIiLCJwZXJtaXNzaW9ucyIsImNhbl91cGxvYWQiLCJzdHlsZUNsYXNzTmFtZSIsImFsbG93VXBsb2FkIiwib25LZXlEb3duIiwic2VhcmNoIiwidXBsb2FkIiwiY3JlYXRlRm9sZGVyIiwic29ydCIsInRhYmxlUmVmIiwic2VsZWN0Iiwib25JdGVtQ2xpY2siLCJkZWxldGUiLCJkb3dubG9hZCIsInJlbmFtZSIsInNoYXJlIiwicHJldmlldyIsInVwbG9hZFN1Y2Nlc3NIYW5kbGVyIiwiY3JlYXRlRm9sZGVyQ2FsbGJhY2siLCJkZWxldGVDYWxsYmFjayIsInJlbmFtZUNhbGxiYWNrIiwiY2hhbmdlU2hhcmVBY2Nlc3MiLCJnZXRDYWNoZSIsImRlZmF1bHRQcm9wcyIsIm9uRGVsZXRlIiwib25Eb3dubG9hZCIsIm9uUmVuYW1lIiwib25DcmVhdGUiLCJvblNlbGVjdCIsImVycm9yQ2FsbGJhY2siLCJlcnJvciIsImNvbnNvbGUiLCJmb3JjZUZldGNoIiwiZm9sZGVySWQiLCJjdXJyZW50VW5sb2FkZWRDb2xsZWN0aW9uIiwiZ2V0Rm9sZGVyQVBJIiwiZm9sZGVyIiwiZmV0Y2hGb2xkZXJTdWNjZXNzQ2FsbGJhY2siLCJpdGVtIiwidHlwZSIsInNlYXJjaFN1Y2Nlc3NDYWxsYmFjayIsImRlYm91bmNlZFNlYXJjaCIsInF1ZXJ5IiwiZ2V0U2VhcmNoQVBJIiwidHJpbW1lZFF1ZXJ5IiwidHJpbSIsInJlY2VudHNTdWNjZXNzQ2FsbGJhY2siLCJieSIsImdldFJlY2VudHNBUEkiLCJyZWNlbnRzIiwic2V0TW9kYWxBcHBFbGVtZW50IiwiYWNjZXNzIiwiY2FuX3NldF9zaGFyZV9hY2Nlc3MiLCJnZXRBUEkiLCJ1cGRhdGVkSXRlbSIsIkVycm9yIiwiY2FsbGJhY2siLCJpdGVtcyIsImZpbmRJbmRleCIsImkiLCJ1cmwiLCJ3aW5kb3ciLCJvcGVuIiwicHJldmlld0NhbGxiYWNrIiwiY2FuX3ByZXZpZXciLCJkb3dubG9hZENhbGxiYWNrIiwiY2FuX2Rvd25sb2FkIiwib3BlblVybCIsImdldEZpbGVBUEkiLCJnZXREb3dubG9hZFVybCIsInBhcmVudCIsInBhcmVudElkIiwiY2FuX2RlbGV0ZSIsIm5hbWVXaXRob3V0RXh0IiwiZXh0ZW5zaW9uIiwiY2FuX3JlbmFtZSIsImNvZGUiLCJsZW5ndGgiLCJjcmVhdGUiLCJzdGF0dXMiLCJyZXNwb25zZSIsInNoYXJlQ2FsbGJhY2siLCJ0YWJsZSIsImV2ZW50IiwidGFyZ2V0Iiwia2V5IiwidG9Mb3dlckNhc2UiLCJwcmV2ZW50RGVmYXVsdCIsImdsb2JhbE1vZGlmaWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7QUFNQSxPQUFPQSxLQUFQLElBQWdCQyxTQUFoQixRQUFpQyxPQUFqQztBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGFBQWxCO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixpQkFBckI7QUFDQSxPQUFPQyxJQUFQLE1BQWlCLGFBQWpCO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixpQkFBckI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLGtCQUF0QjtBQUNBLE9BQU9DLE9BQVAsTUFBb0IsV0FBcEI7QUFDQSxPQUFPQyx3QkFBUCxNQUFxQyw0QkFBckM7QUFDQSxPQUFPQyxZQUFQLE1BQXlCLGdCQUF6QjtBQUNBLE9BQU9DLGtCQUFQLE1BQStCLHVCQUEvQjtBQUNBLE9BQU9DLFdBQVAsTUFBd0IsZUFBeEI7QUFDQSxPQUFPQyxZQUFQLE1BQXlCLGlCQUF6QjtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsaUJBQTFCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixXQUFuQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0Isd0JBQXRCO0FBQ0EsT0FBT0MsR0FBUCxNQUFnQixXQUFoQjtBQUNBLE9BQU9DLGNBQVAsTUFBMkIs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QjtBQUNBNEgsMEJBQU1JLGNBQU47QUFDSDtBQUNEO0FBQ0osaUJBQUssR0FBTDtBQUNJLG9CQUFJLE9BQUtDLGNBQVQsRUFBeUI7QUFDckIsMkJBQUtqRixZQUFMO0FBQ0E0RSwwQkFBTUksY0FBTjtBQUNIO0FBQ0Q7QUFDSjtBQUNJLHVCQUFLQyxjQUFMLEdBQXNCLEtBQXRCO0FBQ0E7QUE1Q1I7O0FBK0NBLGVBQUtBLGNBQUwsR0FBc0JILFFBQVEsR0FBOUI7QUFDSCxLOzs7QUFtTUwsZUFBZWhNLGVBQWU2QixlQUFmLENBQWYiLCJmaWxlIjoiQ29udGVudEV4cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIENvbnRlbnQgRXhwbG9yZXIgQ29tcG9uZW50XHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcbmltcG9ydCBNb2RhbCBmcm9tICdyZWFjdC1tb2RhbCc7XHJcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2guZGVib3VuY2UnO1xyXG5pbXBvcnQgbm9vcCBmcm9tICdsb2Rhc2gubm9vcCc7XHJcbmltcG9ydCB1bmlxdWVpZCBmcm9tICdsb2Rhc2gudW5pcXVlaWQnO1xyXG5pbXBvcnQgY2xvbmVEZWVwIGZyb20gJ2xvZGFzaC5jbG9uZWRlZXAnO1xyXG5pbXBvcnQgQ29udGVudCBmcm9tICcuL0NvbnRlbnQnO1xyXG5pbXBvcnQgRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nIGZyb20gJy4vRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nJztcclxuaW1wb3J0IFJlbmFtZURpYWxvZyBmcm9tICcuL1JlbmFtZURpYWxvZyc7XHJcbmltcG9ydCBDcmVhdGVGb2xkZXJEaWFsb2cgZnJvbSAnLi4vQ3JlYXRlRm9sZGVyRGlhbG9nJztcclxuaW1wb3J0IFNoYXJlRGlhbG9nIGZyb20gJy4vU2hhcmVEaWFsb2cnO1xyXG5pbXBvcnQgVXBsb2FkRGlhbG9nIGZyb20gJy4uL1VwbG9hZERpYWxvZyc7XHJcbmltcG9ydCBQcmV2aWV3RGlhbG9nIGZyb20gJy4vUHJldmlld0RpYWxvZyc7XHJcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi4vSGVhZGVyJztcclxuaW1wb3J0IFN1YkhlYWRlciBmcm9tICcuLi9TdWJIZWFkZXIvU3ViSGVhZGVyJztcclxuaW1wb3J0IEFQSSBmcm9tICcuLi8uLi9hcGknO1xyXG5pbXBvcnQgbWFrZVJlc3BvbnNpdmUgZnJvbSAnLi4vbWFrZVJlc3BvbnNpdmUnO1xyXG5pbXBvcnQgb3BlblVybEluc2lkZUlmcmFtZSBmcm9tICcuLi8uLi91dGlsL2lmcmFtZSc7XHJcbmltcG9ydCB7IGlzRm9jdXNhYmxlRWxlbWVudCwgaXNJbnB1dEVsZW1lbnQsIGZvY3VzIH0gZnJvbSAnLi4vLi4vdXRpbC9kb20nO1xyXG5pbXBvcnQge1xyXG4gICAgREVGQVVMVF9IT1NUTkFNRV9VUExPQUQsXHJcbiAgICBERUZBVUxUX0hPU1ROQU1FX0FQSSxcclxuICAgIERFRkFVTFRfSE9TVE5BTUVfQVBQLFxyXG4gICAgREVGQVVMVF9IT1NUTkFNRV9TVEFUSUMsXHJcbiAgICBERUZBVUxUX1NFQVJDSF9ERUJPVU5DRSxcclxuICAgIFNPUlRfQVNDLFxyXG4gICAgRklFTERfTkFNRSxcclxuICAgIEZJRUxEX01PRElGSUVEX0FULFxyXG4gICAgRklFTERfSU5URVJBQ1RFRF9BVCxcclxuICAgIERFRkFVTFRfUk9PVCxcclxuICAgIFZJRVdfU0VBUkNILFxyXG4gICAgVklFV19GT0xERVIsXHJcbiAgICBWSUVXX0VSUk9SLFxyXG4gICAgVklFV19SRUNFTlRTLFxyXG4gICAgVFlQRV9GSUxFLFxyXG4gICAgVFlQRV9XRUJMSU5LLFxyXG4gICAgVFlQRV9GT0xERVIsXHJcbiAgICBDTElFTlRfTkFNRV9DT05URU5UX0VYUExPUkVSLFxyXG4gICAgREVGQVVMVF9WSUVXX0ZJTEVTLFxyXG4gICAgREVGQVVMVF9WSUVXX1JFQ0VOVFMsXHJcbiAgICBFUlJPUl9DT0RFX0lURU1fTkFNRV9JTlZBTElELFxyXG4gICAgRVJST1JfQ09ERV9JVEVNX05BTUVfVE9PX0xPTkcsXHJcbiAgICBFUlJPUl9DT0RFX0lURU1fTkFNRV9JTl9VU0UsXHJcbiAgICBUWVBFRF9JRF9GT0xERVJfUFJFRklYXHJcbn0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHR5cGUge1xyXG4gICAgQm94SXRlbSxcclxuICAgIENvbGxlY3Rpb24sXHJcbiAgICBWaWV3LFxyXG4gICAgU29ydERpcmVjdGlvbixcclxuICAgIFNvcnRCeSxcclxuICAgIEFjY2VzcyxcclxuICAgIEJveEl0ZW1QZXJtaXNzaW9uLFxyXG4gICAgVG9rZW4sXHJcbiAgICBEZWZhdWx0Vmlld1xyXG59IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcbmltcG9ydCAnLi4vZm9udHMuc2Nzcyc7XHJcbmltcG9ydCAnLi4vYmFzZS5zY3NzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICByb290Rm9sZGVySWQ6IHN0cmluZyxcclxuICAgIGN1cnJlbnRGb2xkZXJJZD86IHN0cmluZyxcclxuICAgIHNvcnRCeTogU29ydEJ5LFxyXG4gICAgc29ydERpcmVjdGlvbjogU29ydERpcmVjdGlvbixcclxuICAgIGNhblByZXZpZXc6IGJvb2xlYW4sXHJcbiAgICBjYW5Eb3dubG9hZDogYm9vbGVhbixcclxuICAgIGNhbkRlbGV0ZTogYm9vbGVhbixcclxuICAgIGNhblVwbG9hZDogYm9vbGVhbixcclxuICAgIGNhblJlbmFtZTogYm9vbGVhbixcclxuICAgIGNhblNoYXJlOiBib29sZWFuLFxyXG4gICAgY2FuU2V0U2hhcmVBY2Nlc3M6IGJvb2xlYW4sXHJcbiAgICBhcGlIb3N0OiBzdHJpbmcsXHJcbiAgICBhcHBIb3N0OiBzdHJpbmcsXHJcbiAgICBzdGF0aWNIb3N0OiBzdHJpbmcsXHJcbiAgICB1cGxvYWRIb3N0OiBzdHJpbmcsXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlOiBGdW5jdGlvbixcclxuICAgIHRva2VuOiBUb2tlbixcclxuICAgIGlzU21hbGw6IGJvb2xlYW4sXHJcbiAgICBpc0xhcmdlOiBib29sZWFuLFxyXG4gICAgaXNUb3VjaDogYm9vbGVhbixcclxuICAgIGF1dG9Gb2N1czogYm9vbGVhbixcclxuICAgIGNsYXNzTmFtZTogc3RyaW5nLFxyXG4gICAgbWVhc3VyZVJlZjogRnVuY3Rpb24sXHJcbiAgICBvbkRlbGV0ZTogRnVuY3Rpb24sXHJcbiAgICBvbkRvd25sb2FkOiBGdW5jdGlvbixcclxuICAgIG9uUHJldmlldzogRnVuY3Rpb24sXHJcbiAgICBvblJlbmFtZTogRnVuY3Rpb24sXHJcbiAgICBvbkNyZWF0ZTogRnVuY3Rpb24sXHJcbiAgICBvblNlbGVjdDogRnVuY3Rpb24sXHJcbiAgICBvblVwbG9hZDogRnVuY3Rpb24sXHJcbiAgICBvbk5hdmlnYXRlOiBGdW5jdGlvbixcclxuICAgIGRlZmF1bHRWaWV3OiBEZWZhdWx0VmlldyxcclxuICAgIGhhc1ByZXZpZXdTaWRlYmFyOiBib29sZWFuLFxyXG4gICAgbG9nb1VybD86IHN0cmluZyxcclxuICAgIHNoYXJlZExpbms/OiBzdHJpbmcsXHJcbiAgICBzaGFyZWRMaW5rUGFzc3dvcmQ/OiBzdHJpbmcsXHJcbiAgICByZXNwb25zZUZpbHRlcj86IEZ1bmN0aW9uXHJcbn07XHJcblxyXG50eXBlIFN0YXRlID0ge1xyXG4gICAgc29ydEJ5OiBTb3J0QnksXHJcbiAgICBzb3J0RGlyZWN0aW9uOiBTb3J0RGlyZWN0aW9uLFxyXG4gICAgcm9vdE5hbWU6IHN0cmluZyxcclxuICAgIGN1cnJlbnRDb2xsZWN0aW9uOiBDb2xsZWN0aW9uLFxyXG4gICAgc2VsZWN0ZWQ/OiBCb3hJdGVtLFxyXG4gICAgc2VhcmNoUXVlcnk6IHN0cmluZyxcclxuICAgIHZpZXc6IFZpZXcsXHJcbiAgICBpc0RlbGV0ZU1vZGFsT3BlbjogYm9vbGVhbixcclxuICAgIGlzUmVuYW1lTW9kYWxPcGVuOiBib29sZWFuLFxyXG4gICAgaXNDcmVhdGVGb2xkZXJNb2RhbE9wZW46IGJvb2xlYW4sXHJcbiAgICBpc1NoYXJlTW9kYWxPcGVuOiBib29sZWFuLFxyXG4gICAgaXNVcGxvYWRNb2RhbE9wZW46IGJvb2xlYW4sXHJcbiAgICBpc1ByZXZpZXdNb2RhbE9wZW46IGJvb2xlYW4sXHJcbiAgICBpc0xvYWRpbmc6IGJvb2xlYW4sXHJcbiAgICBlcnJvckNvZGU6IHN0cmluZyxcclxuICAgIGZvY3VzZWRSb3c6IG51bWJlclxyXG59O1xyXG5cclxudHlwZSBEZWZhdWx0UHJvcHMgPSB7fFxyXG4gICAgcm9vdEZvbGRlcklkOiBzdHJpbmcsXHJcbiAgICBzb3J0Qnk6IFNvcnRCeSxcclxuICAgIHNvcnREaXJlY3Rpb246IFNvcnREaXJlY3Rpb24sXHJcbiAgICBjYW5Eb3dubG9hZDogYm9vbGVhbixcclxuICAgIGNhbkRlbGV0ZTogYm9vbGVhbixcclxuICAgIGNhblVwbG9hZDogYm9vbGVhbixcclxuICAgIGNhblJlbmFtZTogYm9vbGVhbixcclxuICAgIGNhblByZXZpZXc6IGJvb2xlYW4sXHJcbiAgICBjYW5TaGFyZTogYm9vbGVhbixcclxuICAgIGNhblNldFNoYXJlQWNjZXNzOiBib29sZWFuLFxyXG4gICAgYXV0b0ZvY3VzOiBib29sZWFuLFxyXG4gICAgYXBpSG9zdDogc3RyaW5nLFxyXG4gICAgYXBwSG9zdDogc3RyaW5nLFxyXG4gICAgc3RhdGljSG9zdDogc3RyaW5nLFxyXG4gICAgdXBsb2FkSG9zdDogc3RyaW5nLFxyXG4gICAgY2xhc3NOYW1lOiBzdHJpbmcsXHJcbiAgICBvbkRlbGV0ZTogRnVuY3Rpb24sXHJcbiAgICBvbkRvd25sb2FkOiBGdW5jdGlvbixcclxuICAgIG9uUHJldmlldzogRnVuY3Rpb24sXHJcbiAgICBvblJlbmFtZTogRnVuY3Rpb24sXHJcbiAgICBvbkNyZWF0ZTogRnVuY3Rpb24sXHJcbiAgICBvblNlbGVjdDogRnVuY3Rpb24sXHJcbiAgICBvblVwbG9hZDogRnVuY3Rpb24sXHJcbiAgICBvbk5hdmlnYXRlOiBGdW5jdGlvbixcclxuICAgIGRlZmF1bHRWaWV3OiBEZWZhdWx0VmlldyxcclxuICAgIGhhc1ByZXZpZXdTaWRlYmFyOiBib29sZWFuXHJcbnx9O1xyXG5cclxuY2xhc3MgQ29udGVudEV4cGxvcmVyIGV4dGVuZHMgQ29tcG9uZW50PERlZmF1bHRQcm9wcywgUHJvcHMsIFN0YXRlPiB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgYXBpOiBBUEk7XHJcbiAgICBzdGF0ZTogU3RhdGU7XHJcbiAgICBwcm9wczogUHJvcHM7XHJcbiAgICB0YWJsZTogYW55O1xyXG4gICAgcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gICAgYXBwRWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgICBnbG9iYWxNb2RpZmllcjogYm9vbGVhbjtcclxuICAgIGZpcnN0TG9hZDogYm9vbGVhbiA9IHRydWU7IC8vIEtlZXBzIHRyYWNrIG9mIHZlcnkgMXN0IGxvYWRcclxuXHJcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzOiBEZWZhdWx0UHJvcHMgPSB7XHJcbiAgICAgICAgcm9vdEZvbGRlcklkOiBERUZBVUxUX1JPT1QsXHJcbiAgICAgICAgc29ydEJ5OiBGSUVMRF9OQU1FLFxyXG4gICAgICAgIHNvcnREaXJlY3Rpb246IFNPUlRfQVNDLFxyXG4gICAgICAgIGNhbkRvd25sb2FkOiB0cnVlLFxyXG4gICAgICAgIGNhbkRlbGV0ZTogdHJ1ZSxcclxuICAgICAgICBjYW5VcGxvYWQ6IHRydWUsXHJcbiAgICAgICAgY2FuUmVuYW1lOiB0cnVlLFxyXG4gICAgICAgIGNhblNoYXJlOiB0cnVlLFxyXG4gICAgICAgIGNhblByZXZpZXc6IHRydWUsXHJcbiAgICAgICAgY2FuU2V0U2hhcmVBY2Nlc3M6IHRydWUsXHJcbiAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuICAgICAgICBhcGlIb3N0OiBERUZBVUxUX0hPU1ROQU1FX0FQSSxcclxuICAgICAgICBhcHBIb3N0OiBERUZBVUxUX0hPU1ROQU1FX0FQUCxcclxuICAgICAgICBzdGF0aWNIb3N0OiBERUZBVUxUX0hPU1ROQU1FX1NUQVRJQyxcclxuICAgICAgICB1cGxvYWRIb3N0OiBERUZBVUxUX0hPU1ROQU1FX1VQTE9BRCxcclxuICAgICAgICBjbGFzc05hbWU6ICcnLFxyXG4gICAgICAgIG9uRGVsZXRlOiBub29wLFxyXG4gICAgICAgIG9uRG93bmxvYWQ6IG5vb3AsXHJcbiAgICAgICAgb25QcmV2aWV3OiBub29wLFxyXG4gICAgICAgIG9uUmVuYW1lOiBub29wLFxyXG4gICAgICAgIG9uQ3JlYXRlOiBub29wLFxyXG4gICAgICAgIG9uU2VsZWN0OiBub29wLFxyXG4gICAgICAgIG9uVXBsb2FkOiBub29wLFxyXG4gICAgICAgIG9uTmF2aWdhdGU6IG5vb3AsXHJcbiAgICAgICAgZGVmYXVsdFZpZXc6IERFRkFVTFRfVklFV19GSUxFUyxcclxuICAgICAgICBoYXNQcmV2aWV3U2lkZWJhcjogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBbY29uc3RydWN0b3JdXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge0l0ZW1QaWNrZXJ9XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBQcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICB0b2tlbixcclxuICAgICAgICAgICAgc2hhcmVkTGluayxcclxuICAgICAgICAgICAgc2hhcmVkTGlua1Bhc3N3b3JkLFxyXG4gICAgICAgICAgICBhcGlIb3N0LFxyXG4gICAgICAgICAgICB1cGxvYWRIb3N0LFxyXG4gICAgICAgICAgICBzb3J0QnksXHJcbiAgICAgICAgICAgIHNvcnREaXJlY3Rpb24sXHJcbiAgICAgICAgICAgIHJlc3BvbnNlRmlsdGVyLFxyXG4gICAgICAgICAgICByb290Rm9sZGVySWRcclxuICAgICAgICB9OiBQcm9wcyA9IHByb3BzO1xyXG5cclxuICAgICAgICB0aGlzLmFwaSA9IG5ldyBBUEkoe1xyXG4gICAgICAgICAgICB0b2tlbixcclxuICAgICAgICAgICAgc2hhcmVkTGluayxcclxuICAgICAgICAgICAgc2hhcmVkTGlua1Bhc3N3b3JkLFxyXG4gICAgICAgICAgICBhcGlIb3N0LFxyXG4gICAgICAgICAgICB1cGxvYWRIb3N0LFxyXG4gICAgICAgICAgICByZXNwb25zZUZpbHRlcixcclxuICAgICAgICAgICAgY2xpZW50TmFtZTogQ0xJRU5UX05BTUVfQ09OVEVOVF9FWFBMT1JFUixcclxuICAgICAgICAgICAgaWQ6IGAke1RZUEVEX0lEX0ZPTERFUl9QUkVGSVh9JHtyb290Rm9sZGVySWR9YFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmlkID0gdW5pcXVlaWQoJ2JjZV8nKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgc29ydEJ5LFxyXG4gICAgICAgICAgICBzb3J0RGlyZWN0aW9uLFxyXG4gICAgICAgICAgICByb290TmFtZTogJycsXHJcbiAgICAgICAgICAgIGN1cnJlbnRDb2xsZWN0aW9uOiB7fSxcclxuICAgICAgICAgICAgc2VhcmNoUXVlcnk6ICcnLFxyXG4gICAgICAgICAgICB2aWV3OiBWSUVXX0ZPTERFUixcclxuICAgICAgICAgICAgaXNEZWxldGVNb2RhbE9wZW46IGZhbHNlLFxyXG4gICAgICAgICAgICBpc1JlbmFtZU1vZGFsT3BlbjogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzQ3JlYXRlRm9sZGVyTW9kYWxPcGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNTaGFyZU1vZGFsT3BlbjogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzVXBsb2FkTW9kYWxPcGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNQcmV2aWV3TW9kYWxPcGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyb3JDb2RlOiAnJyxcclxuICAgICAgICAgICAgZm9jdXNlZFJvdzogMFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXN0cm95cyBhcGkgaW5zdGFuY2VzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGNsZWFyQ2FjaGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hcGkuZGVzdHJveSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFudXBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJDYWNoZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmV0Y2hlcyB0aGUgcm9vdCBmb2xkZXIgb24gbG9hZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgY29uc3QgeyBkZWZhdWx0VmlldywgY3VycmVudEZvbGRlcklkIH06IFByb3BzID0gdGhpcy5wcm9wcztcclxuICAgICAgICB0aGlzLnJvb3RFbGVtZW50ID0gKChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKTogYW55KTogSFRNTEVsZW1lbnQpO1xyXG4gICAgICAgIC8vICRGbG93Rml4TWU6IGNoaWxkIHdpbGwgZXhpc3RcclxuICAgICAgICB0aGlzLmFwcEVsZW1lbnQgPSB0aGlzLnJvb3RFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkO1xyXG5cclxuICAgICAgICBpZiAoZGVmYXVsdFZpZXcgPT09IERFRkFVTFRfVklFV19SRUNFTlRTKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1JlY2VudHModHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5mZXRjaEZvbGRlcihjdXJyZW50Rm9sZGVySWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWN0LW1vZGFsIGV4cGVjdHMgdGhlIE1vZGFscyBhcHAgZWxlbWVudFxyXG4gICAgICogdG8gYmUgc2V0IHNvIHRoYXQgaXQgY2FuIGFkZCBwcm9wZXIgYXJpYSB0YWdzLlxyXG4gICAgICogV2UgbmVlZCB0byBrZWVwIHNldHRpbmcgaXQsIHNpbmNlIHRoZXJlIG1pZ2h0IGJlXHJcbiAgICAgKiBtdWx0aXBsZSB3aWRnZXRzIG9uIHRoZSBzYW1lIHBhZ2Ugd2l0aCB0aGVpciBvd25cclxuICAgICAqIGFwcCBlbGVtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbGxlY3Rpb24gaXRlbSBjb2xsZWN0aW9uIG9iamVjdFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgc2V0TW9kYWxBcHBFbGVtZW50KCkge1xyXG4gICAgICAgIE1vZGFsLnNldEFwcEVsZW1lbnQodGhpcy5hcHBFbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZldGNoZXMgdGhlIGN1cnJlbnQgZm9sZGVyIGlmIGRpZmZlcmVudFxyXG4gICAgICogZnJvbSB3aGF0IHdhcyBhbHJlYWR5IGZldGNoZWQgYmVmb3JlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IFByb3BzKSB7XHJcbiAgICAgICAgY29uc3QgeyBjdXJyZW50Rm9sZGVySWQgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHsgY3VycmVudEZvbGRlcklkOiBuZXdGb2xkZXJJZCB9OiBQcm9wcyA9IG5leHRQcm9wcztcclxuICAgICAgICBpZiAoY3VycmVudEZvbGRlcklkICE9PSBuZXdGb2xkZXJJZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZldGNoRm9sZGVyKG5ld0ZvbGRlcklkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldHMgdGhlIHBlcmNlbnRMb2FkZWQgaW4gdGhlIGNvbGxlY3Rpb25cclxuICAgICAqIHNvIHRoYXQgdGhlIGxvYWRpbmcgYmFyIHN0YXJ0cyBzaG93aW5nXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBmaXJlcyBjYW5jZWxcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGN1cnJlbnRVbmxvYWRlZENvbGxlY3Rpb24oKTogQ29sbGVjdGlvbiB7XHJcbiAgICAgICAgY29uc3QgeyBjdXJyZW50Q29sbGVjdGlvbiB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oY3VycmVudENvbGxlY3Rpb24sIHtcclxuICAgICAgICAgICAgcGVyY2VudExvYWRlZDogMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmV0d29yayBlcnJvciBjYWxsYmFja1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBlcnJvciBvYmplY3RcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGVycm9yQ2FsbGJhY2sgPSAoZXJyb3I6IGFueSkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICB2aWV3OiBWSUVXX0VSUk9SXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvY3VzZXMgdGhlIGdyaWQgYW5kIGZpcmVzIG5hdmlnYXRlIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZpbmlzaE5hdmlnYXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgeyBhdXRvRm9jdXMgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHsgY3VycmVudENvbGxlY3Rpb246IHsgcGVyY2VudExvYWRlZCB9IH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICAgICAgLy8gSWYgbG9hZGluZyBmb3IgdGhlIHZlcnkgZmlyc3QgdGltZSwgb25seSBhbGxvdyBmb2N1cyBpZiBhdXRvRm9jdXMgaXMgdHJ1ZVxyXG4gICAgICAgIGlmICh0aGlzLmZpcnN0TG9hZCAmJiAhYXV0b0ZvY3VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RMb2FkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERvbid0IGZvY3VzIHRoZSBncmlkIHVudGlsIGl0cyBsb2FkZWQgYW5kIHVzZXIgaXMgbm90IGFscmVhZHkgb24gYW4gaW50ZXJhY3RhYmxlIGVsZW1lbnRcclxuICAgICAgICBpZiAocGVyY2VudExvYWRlZCA9PT0gMTAwICYmICFpc0ZvY3VzYWJsZUVsZW1lbnQoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgZm9jdXModGhpcy5yb290RWxlbWVudCwgJy5iY2UtaXRlbS1yb3cnKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWRSb3c6IDAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9sZGVyIGZldGNoIHN1Y2Nlc3MgY2FsbGJhY2tcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufHZvaWR9IFt0cmlnZ2VyRXZlbnRdIFRvIHRyaWdnZXIgbmF2aWdhdGUgZXZlbnRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb2xsZWN0aW9uIGl0ZW0gY29sbGVjdGlvbiBvYmplY3RcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZldGNoRm9sZGVyU3VjY2Vzc0NhbGxiYWNrKGNvbGxlY3Rpb246IENvbGxlY3Rpb24sIHRyaWdnZXJFdmVudDogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICBjb25zdCB7IG9uTmF2aWdhdGUsIHJvb3RGb2xkZXJJZCB9OiBQcm9wcyA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgeyBpZCwgbmFtZSwgYm94SXRlbSB9OiBDb2xsZWN0aW9uID0gY29sbGVjdGlvbjtcclxuXHJcbiAgICAgICAgLy8gTmV3IGZvbGRlciBzdGF0ZVxyXG4gICAgICAgIGNvbnN0IG5ld1N0YXRlID0ge1xyXG4gICAgICAgICAgICBzZWxlY3RlZDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBjdXJyZW50Q29sbGVjdGlvbjogY29sbGVjdGlvbixcclxuICAgICAgICAgICAgcm9vdE5hbWU6IGlkID09PSByb290Rm9sZGVySWQgPyBuYW1lIDogJydcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBVbnNlbGVjdCBhbnkgcm93cyB0aGF0IHdlcmUgc2VsZWN0ZWRcclxuICAgICAgICB0aGlzLnVuc2VsZWN0KCk7XHJcblxyXG4gICAgICAgIC8vIENsb3NlIGFueSBvcGVuIG1vZGFsc1xyXG4gICAgICAgIHRoaXMuY2xvc2VNb2RhbHMoKTtcclxuXHJcbiAgICAgICAgLy8gRmlyZSBmb2xkZXIgbmF2aWdhdGlvbiBldmVudFxyXG4gICAgICAgIGlmICh0cmlnZ2VyRXZlbnQgJiYgISFib3hJdGVtKSB7XHJcbiAgICAgICAgICAgIG9uTmF2aWdhdGUoY2xvbmVEZWVwKGJveEl0ZW0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNldCB0aGUgbmV3IHN0YXRlIGFuZCBmb2N1cyB0aGUgZ3JpZCBmb3IgdGFiYmluZ1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUsIHRoaXMuZmluaXNoTmF2aWdhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGZXRjaGVzIGEgZm9sZGVyLCBkZWZhdWx0cyB0byBmZXRjaGluZyByb290IGZvbGRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3x2b2lkfSBbaWRdIGZvbGRlciBpZFxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufHZvaWR9IFt0cmlnZ2VyRXZlbnRdIFRvIHRyaWdnZXIgbmF2aWdhdGUgZXZlbnRcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbnx2b2lkfSBbZm9yY2VGZXRjaF0gVG8gdm9pZCB0aGUgY2FjaGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZldGNoRm9sZGVyID0gKGlkPzogc3RyaW5nLCB0cmlnZ2VyRXZlbnQ6IGJvb2xlYW4gPSB0cnVlLCBmb3JjZUZldGNoOiBib29sZWFuID0gZmFsc2UpID0+IHtcclxuICAgICAgICBjb25zdCB7IHJvb3RGb2xkZXJJZCwgY2FuUHJldmlldywgaGFzUHJldmlld1NpZGViYXIgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHsgc29ydEJ5LCBzb3J0RGlyZWN0aW9uIH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBmb2xkZXJJZDogc3RyaW5nID0gdHlwZW9mIGlkID09PSAnc3RyaW5nJyA/IGlkIDogcm9vdEZvbGRlcklkO1xyXG5cclxuICAgICAgICAvLyBJZiB3ZSBhcmUgbmF2aWdhdGluZyBhcm91bmQsIGFrYSBub3QgZmlyc3QgbG9hZFxyXG4gICAgICAgIC8vIHRoZW4gcmVzZXQgdGhlIGZvY3VzIHRvIHRoZSByb290IHNvIHRoYXQgYWZ0ZXJcclxuICAgICAgICAvLyB0aGUgY29sbGVjdGlvbiBsb2FkcyB0aGUgYWN0aXZlRWxlbWVudCBpcyBub3QgdGhlXHJcbiAgICAgICAgLy8gYnV0dG9uIHRoYXQgd2FzIGNsaWNrZWQgdG8gZmV0Y2ggdGhlIGZvbGRlclxyXG4gICAgICAgIGlmICghdGhpcy5maXJzdExvYWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yb290RWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVzZXQgc2VhcmNoIHN0YXRlLCB0aGUgdmlldyBhbmQgc2hvdyBidXN5IGluZGljYXRvclxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBzZWFyY2hRdWVyeTogJycsXHJcbiAgICAgICAgICAgIHZpZXc6IFZJRVdfRk9MREVSLFxyXG4gICAgICAgICAgICBjdXJyZW50Q29sbGVjdGlvbjogdGhpcy5jdXJyZW50VW5sb2FkZWRDb2xsZWN0aW9uKClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRmV0Y2ggdGhlIGZvbGRlciB1c2luZyBmb2xkZXIgQVBJXHJcbiAgICAgICAgdGhpcy5hcGkuZ2V0Rm9sZGVyQVBJKCkuZm9sZGVyKFxyXG4gICAgICAgICAgICBmb2xkZXJJZCxcclxuICAgICAgICAgICAgc29ydEJ5LFxyXG4gICAgICAgICAgICBzb3J0RGlyZWN0aW9uLFxyXG4gICAgICAgICAgICAoY29sbGVjdGlvbjogQ29sbGVjdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaEZvbGRlclN1Y2Nlc3NDYWxsYmFjayhjb2xsZWN0aW9uLCB0cmlnZ2VyRXZlbnQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aGlzLmVycm9yQ2FsbGJhY2ssXHJcbiAgICAgICAgICAgIGZvcmNlRmV0Y2gsXHJcbiAgICAgICAgICAgIGNhblByZXZpZXcsXHJcbiAgICAgICAgICAgIGhhc1ByZXZpZXdTaWRlYmFyXHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3Rpb24gcGVyZm9ybWVkIHdoZW4gY2xpY2tpbmcgb24gYW4gaXRlbVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdHxzdHJpbmd9IGl0ZW0gLSB0aGUgY2xpY2tlZCBib3ggaXRlbVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgb25JdGVtQ2xpY2sgPSAoaXRlbTogQm94SXRlbSB8IHN0cmluZykgPT4ge1xyXG4gICAgICAgIC8vIElmIHRoZSBpZCB3YXMgcGFzc2VkIGluLCBqdXN0IHVzZSB0aGF0XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLmZldGNoRm9sZGVyKGl0ZW0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IGlkLCB0eXBlIH06IEJveEl0ZW0gPSBpdGVtO1xyXG4gICAgICAgIGNvbnN0IHsgaXNUb3VjaCB9OiBQcm9wcyA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09PSBUWVBFX0ZPTERFUikge1xyXG4gICAgICAgICAgICB0aGlzLmZldGNoRm9sZGVyKGlkKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzVG91Y2gpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcmV2aWV3KGl0ZW0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlYXJjaCBzdWNjZXNzIGNhbGxiYWNrXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb2xsZWN0aW9uIGl0ZW0gY29sbGVjdGlvbiBvYmplY3RcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHNlYXJjaFN1Y2Nlc3NDYWxsYmFjayA9IChjb2xsZWN0aW9uOiBDb2xsZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBjdXJyZW50Q29sbGVjdGlvbiB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgICAgIC8vIFVuc2VsZWN0IGFueSByb3dzIHRoYXQgd2VyZSBzZWxlY3RlZFxyXG4gICAgICAgIHRoaXMudW5zZWxlY3QoKTtcclxuXHJcbiAgICAgICAgLy8gQ2xvc2UgYW55IG9wZW4gbW9kYWxzXHJcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFscygpO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgY3VycmVudENvbGxlY3Rpb246IE9iamVjdC5hc3NpZ24oY3VycmVudENvbGxlY3Rpb24sIGNvbGxlY3Rpb24pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVib3VuY2VkIHNlYXJjaGluZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgZm9sZGVyIGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgc2VhcmNoIHN0cmluZ1xyXG4gICAgICogQHBhcmFtIHtCb29sZWFufHZvaWR9IFtmb3JjZUZldGNoXSBUbyB2b2lkIGNhY2hlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBkZWJvdW5jZWRTZWFyY2ggPSBkZWJvdW5jZSgoaWQ6IHN0cmluZywgcXVlcnk6IHN0cmluZywgZm9yY2VGZXRjaD86IGJvb2xlYW4pID0+IHtcclxuICAgICAgICBjb25zdCB7IGNhblByZXZpZXcsIGhhc1ByZXZpZXdTaWRlYmFyIH06IFByb3BzID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7IHNvcnRCeSwgc29ydERpcmVjdGlvbiB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgdGhpcy5hcGlcclxuICAgICAgICAgICAgLmdldFNlYXJjaEFQSSgpXHJcbiAgICAgICAgICAgIC5zZWFyY2goXHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIHF1ZXJ5LFxyXG4gICAgICAgICAgICAgICAgc29ydEJ5LFxyXG4gICAgICAgICAgICAgICAgc29ydERpcmVjdGlvbixcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoU3VjY2Vzc0NhbGxiYWNrLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvckNhbGxiYWNrLFxyXG4gICAgICAgICAgICAgICAgZm9yY2VGZXRjaCxcclxuICAgICAgICAgICAgICAgIGNhblByZXZpZXcsXHJcbiAgICAgICAgICAgICAgICBoYXNQcmV2aWV3U2lkZWJhclxyXG4gICAgICAgICAgICApO1xyXG4gICAgfSwgREVGQVVMVF9TRUFSQ0hfREVCT1VOQ0UpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VhcmNoZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IHNlYXJjaCBzdHJpbmdcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbnx2b2lkfSBbZm9yY2VGZXRjaF0gVG8gdm9pZCBjYWNoZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgc2VhcmNoID0gKHF1ZXJ5OiBzdHJpbmcsIGZvcmNlRmV0Y2g6IGJvb2xlYW4gPSBmYWxzZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgcm9vdEZvbGRlcklkIH06IFByb3BzID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7IGN1cnJlbnRDb2xsZWN0aW9uOiB7IGlkIH0gfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IGZvbGRlcklkID0gdHlwZW9mIGlkID09PSAnc3RyaW5nJyA/IGlkIDogcm9vdEZvbGRlcklkO1xyXG4gICAgICAgIGNvbnN0IHRyaW1tZWRRdWVyeTogc3RyaW5nID0gcXVlcnkudHJpbSgpO1xyXG5cclxuICAgICAgICBpZiAoIXF1ZXJ5KSB7XHJcbiAgICAgICAgICAgIC8vIFF1ZXJ5IHdhcyBjbGVhcmVkIG91dCwgbG9hZCB0aGUgcHJpb3IgZm9sZGVyXHJcbiAgICAgICAgICAgIC8vIFRoZSBwcmlvciBmb2xkZXIgaXMgYWx3YXlzIHRoZSBwYXJlbnQgZm9sZGVyIGZvciBzZWFyY2hcclxuICAgICAgICAgICAgdGhpcy5mZXRjaEZvbGRlcihmb2xkZXJJZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRyaW1tZWRRdWVyeSkge1xyXG4gICAgICAgICAgICAvLyBRdWVyeSBub3cgb25seSBoYXMgYnVuY2ggb2Ygc3BhY2VzXHJcbiAgICAgICAgICAgIC8vIGRvIG5vdGhpbmcgYW5kIGJ1dCB1cGRhdGUgcHJpb3Igc3RhdGVcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hRdWVyeTogcXVlcnlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBzZWxlY3RlZDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBzZWFyY2hRdWVyeTogcXVlcnksXHJcbiAgICAgICAgICAgIHZpZXc6IFZJRVdfU0VBUkNILFxyXG4gICAgICAgICAgICBjdXJyZW50Q29sbGVjdGlvbjogdGhpcy5jdXJyZW50VW5sb2FkZWRDb2xsZWN0aW9uKClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5kZWJvdW5jZWRTZWFyY2goZm9sZGVySWQsIHF1ZXJ5LCBmb3JjZUZldGNoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWNlbnRzIGZldGNoIHN1Y2Nlc3MgY2FsbGJhY2tcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbGxlY3Rpb24gaXRlbSBjb2xsZWN0aW9uIG9iamVjdFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgcmVjZW50c1N1Y2Nlc3NDYWxsYmFjayA9IChjb2xsZWN0aW9uOiBDb2xsZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgLy8gVW5zZWxlY3QgYW55IHJvd3MgdGhhdCB3ZXJlIHNlbGVjdGVkXHJcbiAgICAgICAgdGhpcy51bnNlbGVjdCgpO1xyXG5cclxuICAgICAgICAvLyBTZXQgdGhlIG5ldyBzdGF0ZSBhbmQgZm9jdXMgdGhlIGdyaWQgZm9yIHRhYmJpbmdcclxuICAgICAgICB0aGlzLnNldFN0YXRlKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29sbGVjdGlvbjogY29sbGVjdGlvblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aGlzLmZpbmlzaE5hdmlnYXRpb25cclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3dzIHJlY2VudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufHZvaWR9IFtmb3JjZUZldGNoXSBUbyB2b2lkIGNhY2hlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBzaG93UmVjZW50cyA9IChmb3JjZUZldGNoOiBib29sZWFuID0gZmFsc2UpID0+IHtcclxuICAgICAgICBjb25zdCB7IHJvb3RGb2xkZXJJZCwgY2FuUHJldmlldywgaGFzUHJldmlld1NpZGViYXIgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHsgc29ydEJ5LCBzb3J0RGlyZWN0aW9uIH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICAgICAgLy8gUmVjZW50cyBhcmUgc29ydGVkIGJ5IGEgZGlmZmVyZW50IGRhdGUgZmllbGQgdGhhbiB0aGUgcmVzdFxyXG4gICAgICAgIGNvbnN0IGJ5ID0gc29ydEJ5ID09PSBGSUVMRF9NT0RJRklFRF9BVCA/IEZJRUxEX0lOVEVSQUNURURfQVQgOiBzb3J0Qnk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IHNlYXJjaCBzdGF0ZSwgdGhlIHZpZXcgYW5kIHNob3cgYnVzeSBpbmRpY2F0b3JcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgc2VhcmNoUXVlcnk6ICcnLFxyXG4gICAgICAgICAgICB2aWV3OiBWSUVXX1JFQ0VOVFMsXHJcbiAgICAgICAgICAgIGN1cnJlbnRDb2xsZWN0aW9uOiB0aGlzLmN1cnJlbnRVbmxvYWRlZENvbGxlY3Rpb24oKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBGZXRjaCB0aGUgZm9sZGVyIHVzaW5nIGZvbGRlciBBUElcclxuICAgICAgICB0aGlzLmFwaVxyXG4gICAgICAgICAgICAuZ2V0UmVjZW50c0FQSSgpXHJcbiAgICAgICAgICAgIC5yZWNlbnRzKFxyXG4gICAgICAgICAgICAgICAgcm9vdEZvbGRlcklkLFxyXG4gICAgICAgICAgICAgICAgYnksXHJcbiAgICAgICAgICAgICAgICBzb3J0RGlyZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNlbnRzU3VjY2Vzc0NhbGxiYWNrLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvckNhbGxiYWNrLFxyXG4gICAgICAgICAgICAgICAgZm9yY2VGZXRjaCxcclxuICAgICAgICAgICAgICAgIGNhblByZXZpZXcsXHJcbiAgICAgICAgICAgICAgICBoYXNQcmV2aWV3U2lkZWJhclxyXG4gICAgICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwbG9hZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtGaWxlfSBmaWxlIGRvbSBmaWxlIG9iamVjdFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgdXBsb2FkID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgY3VycmVudENvbGxlY3Rpb246IHsgaWQsIHBlcm1pc3Npb25zIH0gfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHsgY2FuVXBsb2FkIH06IFByb3BzID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAoIWNhblVwbG9hZCB8fCAhaWQgfHwgIXBlcm1pc3Npb25zKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHsgY2FuX3VwbG9hZCB9OiBCb3hJdGVtUGVybWlzc2lvbiA9IHBlcm1pc3Npb25zO1xyXG4gICAgICAgIGlmICghY2FuX3VwbG9hZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldE1vZGFsQXBwRWxlbWVudCgpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBpc1VwbG9hZE1vZGFsT3BlbjogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwbG9hZCBzdWNjZXNzIGhhbmRsZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtGaWxlfSBmaWxlIGRvbSBmaWxlIG9iamVjdFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgdXBsb2FkU3VjY2Vzc0hhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBjdXJyZW50Q29sbGVjdGlvbjogeyBpZCB9IH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICB0aGlzLmZldGNoRm9sZGVyKGlkLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlcyB0aGUgc2hhcmUgYWNjZXNzIG9mIGFuIGl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZmlsZSBvciBmb2xkZXIgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWNjZXNzIHNoYXJlIGFjY2Vzc1xyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgY2hhbmdlU2hhcmVBY2Nlc3MgPSAoYWNjZXNzOiBBY2Nlc3MpID0+IHtcclxuICAgICAgICBjb25zdCB7IHNlbGVjdGVkIH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7IGNhblNldFNoYXJlQWNjZXNzIH06IFByb3BzID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAoIXNlbGVjdGVkIHx8ICFjYW5TZXRTaGFyZUFjY2Vzcykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IHBlcm1pc3Npb25zLCB0eXBlIH06IEJveEl0ZW0gPSBzZWxlY3RlZDtcclxuICAgICAgICBpZiAoIXBlcm1pc3Npb25zIHx8ICF0eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHsgY2FuX3NldF9zaGFyZV9hY2Nlc3MgfTogQm94SXRlbVBlcm1pc3Npb24gPSBwZXJtaXNzaW9ucztcclxuICAgICAgICBpZiAoIWNhbl9zZXRfc2hhcmVfYWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0xvYWRpbmc6IHRydWUgfSk7XHJcbiAgICAgICAgdGhpcy5hcGkuZ2V0QVBJKHR5cGUpLnNoYXJlKHNlbGVjdGVkLCBhY2Nlc3MsICh1cGRhdGVkSXRlbTogQm94SXRlbSkgPT4ge1xyXG4gICAgICAgICAgICB1cGRhdGVkSXRlbS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZDogdXBkYXRlZEl0ZW0sIGlzTG9hZGluZzogZmFsc2UgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhZ2VzIHRoZSBzb3J0IGJ5IGFuZCBzb3J0IGRpcmVjdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc29ydEJ5IC0gZmllbGQgdG8gc29ydHkgYnlcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3J0RGlyZWN0aW9uIC0gc29ydCBkaXJlY3Rpb25cclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHNvcnQgPSAoc29ydEJ5OiBTb3J0QnksIHNvcnREaXJlY3Rpb246IFNvcnREaXJlY3Rpb24pID0+IHtcclxuICAgICAgICBjb25zdCB7IGN1cnJlbnRDb2xsZWN0aW9uOiB7IGlkIH0sIHZpZXcsIHNlYXJjaFF1ZXJ5IH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBpZiAoIWlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzb3J0QnksIHNvcnREaXJlY3Rpb24gfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodmlldyA9PT0gVklFV19GT0xERVIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hGb2xkZXIoaWQsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh2aWV3ID09PSBWSUVXX1JFQ0VOVFMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JlY2VudHMoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh2aWV3ID09PSBWSUVXX1NFQVJDSCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2goc2VhcmNoUXVlcnkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc29ydCBpbmNvbXBhdGlibGUgdmlldyEnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuc2VsZWN0cyBhbiBpdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIC0gZmlsZSBvciBmb2xkZXIgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufHZvaWR9IFtvblNlbGVjdF0gLSBvcHRpb25hbCBvbiBzZWxlY3QgY2FsbGJhY2tcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHVuc2VsZWN0KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHsgc2VsZWN0ZWQgfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICBzZWxlY3RlZC5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdHMgb3IgdW5zZWxlY3RzIGFuIGl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gLSBmaWxlIG9yIGZvbGRlciBvYmplY3RcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258dm9pZH0gW29uU2VsZWN0XSAtIG9wdGlvbmFsIG9uIHNlbGVjdCBjYWxsYmFja1xyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgc2VsZWN0ID0gKGl0ZW06IEJveEl0ZW0sIGNhbGxiYWNrOiBGdW5jdGlvbiA9IG5vb3ApOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCB7IHNlbGVjdGVkLCBjdXJyZW50Q29sbGVjdGlvbjogeyBpdGVtcyA9IFtdIH0gfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHsgb25TZWxlY3QgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICBpZiAoaXRlbSA9PT0gc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soaXRlbSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudW5zZWxlY3QoKTtcclxuICAgICAgICBpdGVtLnNlbGVjdGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgZm9jdXNlZFJvdyA9IGl0ZW1zLmZpbmRJbmRleCgoaTogQm94SXRlbSkgPT4gaS5pZCA9PT0gaXRlbS5pZCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWRSb3csIHNlbGVjdGVkOiBpdGVtIH0sICgpID0+IHtcclxuICAgICAgICAgICAgb25TZWxlY3QoY2xvbmVEZWVwKFtpdGVtXSkpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3RzIHRoZSBjbGlja2VkIGZpbGUgYW5kIHRoZW4gcHJldmlld3MgaXRcclxuICAgICAqIG9yIG9wZW5zIGl0LCBpZiBpdCB3YXMgYSB3ZWIgbGlua1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSAtIGZpbGUgb3IgZm9sZGVyIG9iamVjdFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgcHJldmlldyA9IChpdGVtOiBCb3hJdGVtKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc3QgeyB0eXBlLCB1cmwgfTogQm94SXRlbSA9IGl0ZW07XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IFRZUEVfV0VCTElOSykge1xyXG4gICAgICAgICAgICB3aW5kb3cub3Blbih1cmwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdChpdGVtLCB0aGlzLnByZXZpZXdDYWxsYmFjayk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJldmlld3MgYSBmaWxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIC0gZmlsZSBvciBmb2xkZXIgb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBwcmV2aWV3Q2FsbGJhY2sgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBzZWxlY3RlZCB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgeyBjYW5QcmV2aWV3IH06IFByb3BzID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAoIXNlbGVjdGVkIHx8ICFjYW5QcmV2aWV3KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHsgcGVybWlzc2lvbnMgfSA9IHNlbGVjdGVkO1xyXG4gICAgICAgIGlmICghcGVybWlzc2lvbnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgeyBjYW5fcHJldmlldyB9OiBCb3hJdGVtUGVybWlzc2lvbiA9IHBlcm1pc3Npb25zO1xyXG4gICAgICAgIGlmICghY2FuX3ByZXZpZXcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUHJldmlld01vZGFsT3BlbjogdHJ1ZSB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3RzIHRoZSBjbGlja2VkIGZpbGUgYW5kIHRoZW4gZG93bmxvYWRzIGl0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIC0gZmlsZSBvciBmb2xkZXIgb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBkb3dubG9hZCA9IChpdGVtOiBCb3hJdGVtKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3QoaXRlbSwgdGhpcy5kb3dubG9hZENhbGxiYWNrKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEb3dubG9hZHMgYSBmaWxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGRvd25sb2FkQ2FsbGJhY2sgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBzZWxlY3RlZCB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgeyBjYW5Eb3dubG9hZCwgb25Eb3dubG9hZCB9OiBQcm9wcyA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKCFzZWxlY3RlZCB8fCAhY2FuRG93bmxvYWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgeyBpZCwgcGVybWlzc2lvbnMgfSA9IHNlbGVjdGVkO1xyXG4gICAgICAgIGlmICghaWQgfHwgIXBlcm1pc3Npb25zKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHsgY2FuX2Rvd25sb2FkIH06IEJveEl0ZW1QZXJtaXNzaW9uID0gcGVybWlzc2lvbnM7XHJcbiAgICAgICAgaWYgKCFjYW5fZG93bmxvYWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgb3BlblVybDogRnVuY3Rpb24gPSAodXJsOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgb3BlblVybEluc2lkZUlmcmFtZSh1cmwpO1xyXG4gICAgICAgICAgICBvbkRvd25sb2FkKGNsb25lRGVlcChbc2VsZWN0ZWRdKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCB7IHR5cGUgfTogQm94SXRlbSA9IHNlbGVjdGVkO1xyXG4gICAgICAgIGlmICh0eXBlID09PSBUWVBFX0ZJTEUpIHtcclxuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0RmlsZUFQSSgpLmdldERvd25sb2FkVXJsKGlkLCBvcGVuVXJsLCBub29wKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0cyB0aGUgY2xpY2tlZCBmaWxlIGFuZCB0aGVuIGRlbGV0ZXMgaXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gLSBmaWxlIG9yIGZvbGRlciBvYmplY3RcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZSA9IChpdGVtOiBCb3hJdGVtKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3QoaXRlbSwgdGhpcy5kZWxldGVDYWxsYmFjayk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyBhIGZpbGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZGVsZXRlQ2FsbGJhY2sgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBzZWxlY3RlZCwgaXNEZWxldGVNb2RhbE9wZW4sIHZpZXcsIHNlYXJjaFF1ZXJ5IH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7IGNhbkRlbGV0ZSwgb25EZWxldGUgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmICghc2VsZWN0ZWQgfHwgIWNhbkRlbGV0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IGlkLCBwZXJtaXNzaW9ucywgcGFyZW50LCB0eXBlIH06IEJveEl0ZW0gPSBzZWxlY3RlZDtcclxuICAgICAgICBpZiAoIWlkIHx8ICFwZXJtaXNzaW9ucyB8fCAhcGFyZW50IHx8ICF0eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHsgaWQ6IHBhcmVudElkIH0gPSBwYXJlbnQ7XHJcbiAgICAgICAgY29uc3QgeyBjYW5fZGVsZXRlIH06IEJveEl0ZW1QZXJtaXNzaW9uID0gcGVybWlzc2lvbnM7XHJcbiAgICAgICAgaWYgKCFjYW5fZGVsZXRlIHx8ICFwYXJlbnRJZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWlzRGVsZXRlTW9kYWxPcGVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW9kYWxBcHBFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0RlbGV0ZU1vZGFsT3BlbjogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzTG9hZGluZzogdHJ1ZSB9KTtcclxuICAgICAgICB0aGlzLmFwaS5nZXRBUEkodHlwZSkuZGVsZXRlKHNlbGVjdGVkLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG9uRGVsZXRlKGNsb25lRGVlcChbc2VsZWN0ZWRdKSk7XHJcbiAgICAgICAgICAgIGlmICh2aWV3ID09PSBWSUVXX0ZPTERFUikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaEZvbGRlcihwYXJlbnRJZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZpZXcgPT09IFZJRVdfUkVDRU5UUykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVjZW50cygpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZpZXcgPT09IFZJRVdfU0VBUkNIKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaChzZWFyY2hRdWVyeSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBzb3J0IGluY29tcGF0aWJsZSB2aWV3IScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0cyB0aGUgY2xpY2tlZCBmaWxlIGFuZCB0aGVuIHJlbmFtZXMgaXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gLSBmaWxlIG9yIGZvbGRlciBvYmplY3RcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHJlbmFtZSA9IChpdGVtOiBCb3hJdGVtKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3QoaXRlbSwgdGhpcy5yZW5hbWVDYWxsYmFjayk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgZm9yIHJlbmFtaW5nIGFuIGl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIG5ldyBpdGVtIG5hbWVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHJlbmFtZUNhbGxiYWNrID0gKG5hbWVXaXRob3V0RXh0OiBzdHJpbmcsIGV4dGVuc2lvbjogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBzZWxlY3RlZCwgaXNSZW5hbWVNb2RhbE9wZW4gfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHsgY2FuUmVuYW1lLCBvblJlbmFtZSB9OiBQcm9wcyA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKCFzZWxlY3RlZCB8fCAhY2FuUmVuYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHsgaWQsIHBlcm1pc3Npb25zLCB0eXBlIH06IEJveEl0ZW0gPSBzZWxlY3RlZDtcclxuICAgICAgICBpZiAoIWlkIHx8ICFwZXJtaXNzaW9ucyB8fCAhdHlwZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IGNhbl9yZW5hbWUgfTogQm94SXRlbVBlcm1pc3Npb24gPSBwZXJtaXNzaW9ucztcclxuICAgICAgICBpZiAoIWNhbl9yZW5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpc1JlbmFtZU1vZGFsT3BlbiB8fCAhbmFtZVdpdGhvdXRFeHQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRNb2RhbEFwcEVsZW1lbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUmVuYW1lTW9kYWxPcGVuOiB0cnVlLCBlcnJvckNvZGU6ICcnIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBuYW1lID0gYCR7bmFtZVdpdGhvdXRFeHR9JHtleHRlbnNpb259YDtcclxuICAgICAgICBpZiAoIW5hbWVXaXRob3V0RXh0LnRyaW0oKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3JDb2RlOiBFUlJPUl9DT0RFX0lURU1fTkFNRV9JTlZBTElELCBpc0xvYWRpbmc6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNMb2FkaW5nOiB0cnVlIH0pO1xyXG4gICAgICAgIHRoaXMuYXBpLmdldEFQSSh0eXBlKS5yZW5hbWUoXHJcbiAgICAgICAgICAgIHNlbGVjdGVkLFxyXG4gICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICAodXBkYXRlZEl0ZW06IEJveEl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIG9uUmVuYW1lKGNsb25lRGVlcChzZWxlY3RlZCkpO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlZEl0ZW0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IHVwZGF0ZWRJdGVtLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNSZW5hbWVNb2RhbE9wZW46IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKHsgY29kZSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3JDb2RlOiBjb2RlLCBpc0xvYWRpbmc6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGZvbGRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBjcmVhdGVGb2xkZXIgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVGb2xkZXJDYWxsYmFjaygpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5ldyBmb2xkZXIgY2FsbGJhY2tcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBmb2xkZXIgbmFtZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgY3JlYXRlRm9sZGVyQ2FsbGJhY2sgPSAobmFtZT86IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgaXNDcmVhdGVGb2xkZXJNb2RhbE9wZW4sIGN1cnJlbnRDb2xsZWN0aW9uIH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7IGNhblVwbG9hZCwgb25DcmVhdGUgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmICghY2FuVXBsb2FkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHsgaWQsIHBlcm1pc3Npb25zIH06IENvbGxlY3Rpb24gPSBjdXJyZW50Q29sbGVjdGlvbjtcclxuICAgICAgICBpZiAoIWlkIHx8ICFwZXJtaXNzaW9ucykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IGNhbl91cGxvYWQgfTogQm94SXRlbVBlcm1pc3Npb24gPSBwZXJtaXNzaW9ucztcclxuICAgICAgICBpZiAoIWNhbl91cGxvYWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpc0NyZWF0ZUZvbGRlck1vZGFsT3BlbiB8fCAhbmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vZGFsQXBwRWxlbWVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNDcmVhdGVGb2xkZXJNb2RhbE9wZW46IHRydWUsIGVycm9yQ29kZTogJycgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghbmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3JDb2RlOiBFUlJPUl9DT0RFX0lURU1fTkFNRV9JTlZBTElELCBpc0xvYWRpbmc6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobmFtZS5sZW5ndGggPiAyNTUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yQ29kZTogRVJST1JfQ09ERV9JVEVNX05BTUVfVE9PX0xPTkcsIGlzTG9hZGluZzogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0xvYWRpbmc6IHRydWUgfSk7XHJcbiAgICAgICAgdGhpcy5hcGkuZ2V0Rm9sZGVyQVBJKCkuY3JlYXRlKFxyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgKGl0ZW06IEJveEl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIG9uQ3JlYXRlKGNsb25lRGVlcChpdGVtKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoRm9sZGVyKGlkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdChpdGVtKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKHsgcmVzcG9uc2U6IHsgc3RhdHVzIH0gfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JDb2RlOiBzdGF0dXMgPT09IDQwOSA/IEVSUk9SX0NPREVfSVRFTV9OQU1FX0lOX1VTRSA6IEVSUk9SX0NPREVfSVRFTV9OQU1FX0lOVkFMSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdHMgdGhlIGNsaWNrZWQgZmlsZSBhbmQgdGhlbiBzaGFyZXMgaXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gLSBmaWxlIG9yIGZvbGRlciBvYmplY3RcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHNoYXJlID0gKGl0ZW06IEJveEl0ZW0pOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLnNlbGVjdChpdGVtLCB0aGlzLnNoYXJlQ2FsbGJhY2spO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYWdlcyB0aGUgc29ydCBieSBhbmQgc29ydCBkaXJlY3Rpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgc2hhcmVDYWxsYmFjayA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCB7IHNlbGVjdGVkIH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGNvbnN0IHsgY2FuU2hhcmUgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICBpZiAoIXNlbGVjdGVkIHx8ICFjYW5TaGFyZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IHBlcm1pc3Npb25zIH0gPSBzZWxlY3RlZDtcclxuICAgICAgICBpZiAoIXBlcm1pc3Npb25zKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHsgY2FuX3NoYXJlIH06IEJveEl0ZW1QZXJtaXNzaW9uID0gcGVybWlzc2lvbnM7XHJcbiAgICAgICAgaWYgKCFjYW5fc2hhcmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gKi9cclxuXHJcbiAgICAgICAgaWYoIXNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0TW9kYWxBcHBFbGVtZW50KCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzU2hhcmVNb2RhbE9wZW46IHRydWUgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2F2ZXMgcmVmZXJlbmNlIHRvIHRhYmxlIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gcmVhY3QgY29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICB0YWJsZVJlZiA9ICh0YWJsZTogUmVhY3QkQ29tcG9uZW50PCosICosICo+KTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy50YWJsZSA9IHRhYmxlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb3NlcyB0aGUgbW9kYWwgZGlhbG9ncyB0aGF0IG1heSBiZSBvcGVuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGNsb3NlTW9kYWxzID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgZm9jdXNlZFJvdyB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0RlbGV0ZU1vZGFsT3BlbjogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzUmVuYW1lTW9kYWxPcGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNDcmVhdGVGb2xkZXJNb2RhbE9wZW46IGZhbHNlLFxyXG4gICAgICAgICAgICBpc1NoYXJlTW9kYWxPcGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNVcGxvYWRNb2RhbE9wZW46IGZhbHNlLFxyXG4gICAgICAgICAgICBpc1ByZXZpZXdNb2RhbE9wZW46IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgc2VsZWN0ZWQsIGN1cnJlbnRDb2xsZWN0aW9uOiB7IGl0ZW1zID0gW10gfSB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9jdXModGhpcy5yb290RWxlbWVudCwgYC5iY2UtaXRlbS1yb3ctJHtmb2N1c2VkUm93fWApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBLZXlib2FyZCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIG9uS2V5RG93biA9IChldmVudDogU3ludGhldGljS2V5Ym9hcmRFdmVudCAmIHsgdGFyZ2V0OiBIVE1MRWxlbWVudCB9KSA9PiB7XHJcbiAgICAgICAgaWYgKGlzSW5wdXRFbGVtZW50KGV2ZW50LnRhcmdldCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgeyByb290Rm9sZGVySWQgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICBjYXNlICcvJzpcclxuICAgICAgICAgICAgICAgIGZvY3VzKHRoaXMucm9vdEVsZW1lbnQsICcuYnVpay1zZWFyY2ggaW5wdXRbdHlwZT1cInNlYXJjaFwiXScsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYXJyb3dkb3duJzpcclxuICAgICAgICAgICAgICAgIGZvY3VzKHRoaXMucm9vdEVsZW1lbnQsICcuYmNlLWl0ZW0tcm93JywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWRSb3c6IDAgfSk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2cnOlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2InOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFsTW9kaWZpZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb2N1cyh0aGlzLnJvb3RFbGVtZW50LCAnLmJ1aWstYnJlYWRjcnVtYiBidXR0b24nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdmJzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbE1vZGlmaWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZXRjaEZvbGRlcihyb290Rm9sZGVySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndSc6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxNb2RpZmllcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdyJzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbE1vZGlmaWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UmVjZW50cyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ24nOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFsTW9kaWZpZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUZvbGRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsTW9kaWZpZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2xvYmFsTW9kaWZpZXIgPSBrZXkgPT09ICdnJztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIHRoZSBmaWxlIHBpY2tlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQHJldHVybiB7RWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgcm9vdEZvbGRlcklkLFxyXG4gICAgICAgICAgICBsb2dvVXJsLFxyXG4gICAgICAgICAgICBjYW5VcGxvYWQsXHJcbiAgICAgICAgICAgIGNhblNldFNoYXJlQWNjZXNzLFxyXG4gICAgICAgICAgICBjYW5EZWxldGUsXHJcbiAgICAgICAgICAgIGNhblJlbmFtZSxcclxuICAgICAgICAgICAgY2FuRG93bmxvYWQsXHJcbiAgICAgICAgICAgIGNhblByZXZpZXcsXHJcbiAgICAgICAgICAgIGNhblNoYXJlLFxyXG4gICAgICAgICAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlLFxyXG4gICAgICAgICAgICB0b2tlbixcclxuICAgICAgICAgICAgc2hhcmVkTGluayxcclxuICAgICAgICAgICAgc2hhcmVkTGlua1Bhc3N3b3JkLFxyXG4gICAgICAgICAgICBhcGlIb3N0LFxyXG4gICAgICAgICAgICBhcHBIb3N0LFxyXG4gICAgICAgICAgICBzdGF0aWNIb3N0LFxyXG4gICAgICAgICAgICB1cGxvYWRIb3N0LFxyXG4gICAgICAgICAgICBpc1NtYWxsLFxyXG4gICAgICAgICAgICBpc1RvdWNoLFxyXG4gICAgICAgICAgICBjbGFzc05hbWUsXHJcbiAgICAgICAgICAgIG1lYXN1cmVSZWYsXHJcbiAgICAgICAgICAgIG9uUHJldmlldyxcclxuICAgICAgICAgICAgb25VcGxvYWQsXHJcbiAgICAgICAgICAgIGhhc1ByZXZpZXdTaWRlYmFyXHJcbiAgICAgICAgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgdmlldyxcclxuICAgICAgICAgICAgcm9vdE5hbWUsXHJcbiAgICAgICAgICAgIGN1cnJlbnRDb2xsZWN0aW9uLFxyXG4gICAgICAgICAgICBzZWFyY2hRdWVyeSxcclxuICAgICAgICAgICAgaXNEZWxldGVNb2RhbE9wZW4sXHJcbiAgICAgICAgICAgIGlzUmVuYW1lTW9kYWxPcGVuLFxyXG4gICAgICAgICAgICBpc1NoYXJlTW9kYWxPcGVuLFxyXG4gICAgICAgICAgICBpc1VwbG9hZE1vZGFsT3BlbixcclxuICAgICAgICAgICAgaXNQcmV2aWV3TW9kYWxPcGVuLFxyXG4gICAgICAgICAgICBpc0NyZWF0ZUZvbGRlck1vZGFsT3BlbixcclxuICAgICAgICAgICAgc2VsZWN0ZWQsXHJcbiAgICAgICAgICAgIGlzTG9hZGluZyxcclxuICAgICAgICAgICAgZXJyb3JDb2RlLFxyXG4gICAgICAgICAgICBmb2N1c2VkUm93XHJcbiAgICAgICAgfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHsgaWQsIHBlcm1pc3Npb25zIH06IENvbGxlY3Rpb24gPSBjdXJyZW50Q29sbGVjdGlvbjtcclxuICAgICAgICBjb25zdCB7IGNhbl91cGxvYWQgfTogQm94SXRlbVBlcm1pc3Npb24gPSBwZXJtaXNzaW9ucyB8fCB7fTtcclxuICAgICAgICBjb25zdCBzdHlsZUNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoJ2J1aWsgYmNlJywgY2xhc3NOYW1lKTtcclxuICAgICAgICBjb25zdCBhbGxvd1VwbG9hZCA9IGNhblVwbG9hZCAmJiBjYW5fdXBsb2FkO1xyXG5cclxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cclxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1ub25pbnRlcmFjdGl2ZS10YWJpbmRleCAqL1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9e3RoaXMuaWR9IGNsYXNzTmFtZT17c3R5bGVDbGFzc05hbWV9IHJlZj17bWVhc3VyZVJlZn0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYnVpay1hcHAtZWxlbWVudCcgb25LZXlEb3duPXt0aGlzLm9uS2V5RG93bn0gdGFiSW5kZXg9ezB9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxIZWFkZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldz17dmlld31cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTbWFsbD17aXNTbWFsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUXVlcnk9e3NlYXJjaFF1ZXJ5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dvVXJsPXtsb2dvVXJsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblNlYXJjaD17dGhpcy5zZWFyY2h9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldExvY2FsaXplZE1lc3NhZ2U9e2dldExvY2FsaXplZE1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8U3ViSGVhZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc9e3ZpZXd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RJZD17cm9vdEZvbGRlcklkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NtYWxsPXtpc1NtYWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb290TmFtZT17cm9vdE5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb2xsZWN0aW9uPXtjdXJyZW50Q29sbGVjdGlvbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuVXBsb2FkPXthbGxvd1VwbG9hZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25VcGxvYWQ9e3RoaXMudXBsb2FkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNyZWF0ZT17dGhpcy5jcmVhdGVGb2xkZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uSXRlbUNsaWNrPXt0aGlzLmZldGNoRm9sZGVyfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblNvcnRDaGFuZ2U9e3RoaXMuc29ydH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TG9jYWxpemVkTWVzc2FnZT17Z2V0TG9jYWxpemVkTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc9e3ZpZXd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RJZD17cm9vdEZvbGRlcklkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NtYWxsPXtpc1NtYWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RvdWNoPXtpc1RvdWNofVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb290RWxlbWVudD17dGhpcy5yb290RWxlbWVudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNlZFJvdz17Zm9jdXNlZFJvd31cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuU2V0U2hhcmVBY2Nlc3M9e2NhblNldFNoYXJlQWNjZXNzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5TaGFyZT17Y2FuU2hhcmV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhblByZXZpZXc9e2NhblByZXZpZXd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbkRlbGV0ZT17Y2FuRGVsZXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5SZW5hbWU9e2NhblJlbmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuRG93bmxvYWQ9e2NhbkRvd25sb2FkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29sbGVjdGlvbj17Y3VycmVudENvbGxlY3Rpb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlUmVmPXt0aGlzLnRhYmxlUmVmfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkl0ZW1TZWxlY3Q9e3RoaXMuc2VsZWN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkl0ZW1DbGljaz17dGhpcy5vbkl0ZW1DbGlja31cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25JdGVtRGVsZXRlPXt0aGlzLmRlbGV0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25JdGVtRG93bmxvYWQ9e3RoaXMuZG93bmxvYWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uSXRlbVJlbmFtZT17dGhpcy5yZW5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uSXRlbVNoYXJlPXt0aGlzLnNoYXJlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkl0ZW1QcmV2aWV3PXt0aGlzLnByZXZpZXd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU29ydENoYW5nZT17dGhpcy5zb3J0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlPXtnZXRMb2NhbGl6ZWRNZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHtjYW5VcGxvYWQgJiYgISF0aGlzLmFwcEVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICA/IDxVcGxvYWREaWFsb2dcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNPcGVuPXtpc1VwbG9hZE1vZGFsT3Blbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9vdEZvbGRlcklkPXtpZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW49e3Rva2VufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFyZWRMaW5rPXtzaGFyZWRMaW5rfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFyZWRMaW5rUGFzc3dvcmQ9e3NoYXJlZExpbmtQYXNzd29yZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBpSG9zdD17YXBpSG9zdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBsb2FkSG9zdD17dXBsb2FkSG9zdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZT17dGhpcy51cGxvYWRTdWNjZXNzSGFuZGxlcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TG9jYWxpemVkTWVzc2FnZT17Z2V0TG9jYWxpemVkTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudD17dGhpcy5yb290RWxlbWVudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25VcGxvYWQ9e29uVXBsb2FkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICB7Y2FuVXBsb2FkICYmICEhdGhpcy5hcHBFbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgPyA8Q3JlYXRlRm9sZGVyRGlhbG9nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3Blbj17aXNDcmVhdGVGb2xkZXJNb2RhbE9wZW59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ3JlYXRlPXt0aGlzLmNyZWF0ZUZvbGRlckNhbGxiYWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbD17dGhpcy5jbG9zZU1vZGFsc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TG9jYWxpemVkTWVzc2FnZT17Z2V0TG9jYWxpemVkTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nPXtpc0xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yQ29kZT17ZXJyb3JDb2RlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50PXt0aGlzLnJvb3RFbGVtZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICB7Y2FuRGVsZXRlICYmIHNlbGVjdGVkICYmICEhdGhpcy5hcHBFbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgPyA8RGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3Blbj17aXNEZWxldGVNb2RhbE9wZW59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlPXt0aGlzLmRlbGV0ZUNhbGxiYWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbD17dGhpcy5jbG9zZU1vZGFsc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbT17c2VsZWN0ZWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldExvY2FsaXplZE1lc3NhZ2U9e2dldExvY2FsaXplZE1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZz17aXNMb2FkaW5nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50PXt0aGlzLnJvb3RFbGVtZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICB7Y2FuUmVuYW1lICYmIHNlbGVjdGVkICYmICEhdGhpcy5hcHBFbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgPyA8UmVuYW1lRGlhbG9nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3Blbj17aXNSZW5hbWVNb2RhbE9wZW59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVuYW1lPXt0aGlzLnJlbmFtZUNhbGxiYWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbD17dGhpcy5jbG9zZU1vZGFsc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbT17c2VsZWN0ZWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldExvY2FsaXplZE1lc3NhZ2U9e2dldExvY2FsaXplZE1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZz17aXNMb2FkaW5nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvckNvZGU9e2Vycm9yQ29kZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudD17dGhpcy5yb290RWxlbWVudH1cclxuICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgOiBudWxsfVxyXG4gICAgICAgICAgICAgICAge2NhblNoYXJlICYmIHNlbGVjdGVkICYmICEhdGhpcy5hcHBFbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgPyA8U2hhcmVEaWFsb2dcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNPcGVuPXtpc1NoYXJlTW9kYWxPcGVufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5TZXRTaGFyZUFjY2Vzcz17Y2FuU2V0U2hhcmVBY2Nlc3N9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU2hhcmVBY2Nlc3NDaGFuZ2U9e3RoaXMuY2hhbmdlU2hhcmVBY2Nlc3N9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2FuY2VsPXt0aGlzLmNsb3NlTW9kYWxzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtPXtzZWxlY3RlZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TG9jYWxpemVkTWVzc2FnZT17Z2V0TG9jYWxpemVkTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nPXtpc0xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQ9e3RoaXMucm9vdEVsZW1lbnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbH1cclxuICAgICAgICAgICAgICAgIHtjYW5QcmV2aWV3ICYmIHNlbGVjdGVkICYmICEhdGhpcy5hcHBFbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgPyA8UHJldmlld0RpYWxvZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc09wZW49e2lzUHJldmlld01vZGFsT3Blbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNUb3VjaD17aXNUb3VjaH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw9e3RoaXMuY2xvc2VNb2RhbHN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW09e3NlbGVjdGVkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29sbGVjdGlvbj17Y3VycmVudENvbGxlY3Rpb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuPXt0b2tlbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TG9jYWxpemVkTWVzc2FnZT17Z2V0TG9jYWxpemVkTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudD17dGhpcy5yb290RWxlbWVudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25QcmV2aWV3PXtvblByZXZpZXd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc1ByZXZpZXdTaWRlYmFyPXtoYXNQcmV2aWV3U2lkZWJhcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGU9e3RoaXMuYXBpLmdldENhY2hlKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaUhvc3Q9e2FwaUhvc3R9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcEhvc3Q9e2FwcEhvc3R9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0hvc3Q9e3N0YXRpY0hvc3R9XHJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xyXG4gICAgICAgIC8qIGVzbGludC1lbmFibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtdGFiaW5kZXggKi9cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFrZVJlc3BvbnNpdmUoQ29udGVudEV4cGxvcmVyKTtcclxuIl19