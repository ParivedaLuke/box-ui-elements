var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Content Picker Component
 * @author Box
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import Modal from 'react-modal';
import debounce from 'lodash.debounce';
import uniqueid from 'lodash.uniqueid';
import noop from 'lodash.noop';
import Footer from './Footer';
import Content from './Content';
import Header from '../Header';
import SubHeader from '../SubHeader/SubHeader';
import UploadDialog from '../UploadDialog';
import CreateFolderDialog from '../CreateFolderDialog';
import API from '../../api';
import makeResponsive from '../makeResponsive';
import { isFocusableElement, isInputElement, focus } from '../../util/dom';
import { DEFAULT_HOSTNAME_UPLOAD, DEFAULT_HOSTNAME_API, DEFAULT_SEARCH_DEBOUNCE, SORT_ASC, FIELD_NAME, FIELD_MODIFIED_AT, FIELD_INTERACTED_AT, DEFAULT_ROOT, VIEW_SEARCH, VIEW_FOLDER, VIEW_SELECTED, VIEW_ERROR, VIEW_RECENTS, TYPE_FILE, TYPE_FOLDER, TYPE_WEBLINK, CLIENT_NAME_CONTENT_PICKER, DEFAULT_VIEW_FILES, DEFAULT_VIEW_RECENTS, ERROR_CODE_ITEM_NAME_INVALID, ERROR_CODE_ITEM_NAME_TOO_LONG, ERROR_CODE_ITEM_NAME_IN_USE, TYPED_ID_FOLDER_PREFIX } from '../../constants';


var defaultType = TYPE_FILE + ',' + TYPE_WEBLINK;

var ContentPicker = function (_Component) {
    _inherits(ContentPicker, _Component);

    /**
     * [constructor]
     *
     * @private
     * @return {ContentPicker}
     */
    function ContentPicker(props) {
        _classCallCheck(this, ContentPicker);

        var _this = _possibleConstructorReturn(this, (ContentPicker.__proto__ || Object.getPrototypeOf(ContentPicker)).call(this, props));

        _initialiseProps.call(_this);

        var token = props.token,
            sharedLink = props.sharedLink,
            sharedLinkPassword = props.sharedLinkPassword,
            apiHost = props.apiHost,
            uploadHost = props.uploadHost,
            sortBy = props.sortBy,
            sortDirection = props.sortDirection,
            clientName = props.clientName,
            responseFilter = props.responseFilter,
            rootFolderId = props.rootFolderId;


        _this.api = new API({
            token: token,
            sharedLink: sharedLink,
            sharedLinkPassword: sharedLinkPassword,
            apiHost: apiHost,
            uploadHost: uploadHost,
            clientName: clientName,
            responseFilter: responseFilter,
            id: '' + TYPED_ID_FOLDER_PREFIX + rootFolderId
        });

        _this.id = uniqueid('bcp_');

        _this.state = {
            sortBy: sortBy,
            sortDirection: sortDirection,
            rootName: '',
            currentCollection: {},
            selected: {},
            searchQuery: '',
            view: VIEW_FOLDER,
            isCreateFolderModalOpen: false,
            isUploadModalOpen: false,
            focusedRow: 0,
            isLoading: false,
            errorCode: ''
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

    _createClass(ContentPicker, [{
        key: 'clearCache',
        value: function clearCache() {
            this.api.destroy(true);
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
            this.rootElement = document.getElementById(this.id);
            // $FlowFixMe: child will exist
            this.appElement = this.rootElement.firstElementChild;

            var defaultView = this.props.defaultView;

            if (defaultView === DEFAULT_VIEW_RECENTS) {
                this.showRecents(true);
            } else {
                this.fetchFolder();
            }
        }

        /**
         * Choose button action.
         * Clones values before returning so that
         * object references are broken. Also cleans
         * up the selected attribute since it was
         * added by the file picker.
         *
         * @private
         * @fires choose
         * @return {void}
         */


        /**
         * Cancel button action
         *
         * @private
         * @fires cancel
         * @return {void}
         */

    }, {
        key: 'currentUnloadedCollection',


        /**
         * Resets the percentLoaded in the collection
         * so that the loading bar starts showing
         *
         * @private
         * @fires cancel
         * @return {void}
         */
        value: function currentUnloadedCollection() {
            var currentCollection = this.state.currentCollection;

            return Object.assign(currentCollection, {
                percentLoaded: 0
            });
        }

        /**
         * Helper function to refresh the grid.
         * This is useful when mutating the underlying data
         * structure and hence the state.
         *
         * @private
         * @fires cancel
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
         * Action performed when clicking on an item
         *
         * @private
         * @param {Object|string} item - the clicked box item
         * @return {void}
         */

    }, {
        key: 'finishNavigation',


        /**
         * Focuses the grid
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
                focus(this.rootElement, '.bcp-item-row');
                this.setState({ focusedRow: 0 });
            }

            this.firstLoad = false;
        }

        /**
         * Folder fetch success callback
         *
         * @private
         * @param {Object} collection item collection object
         * @return {void}
         */


        /**
         * Fetches a folder, defaults to fetching root folder
         *
         * @private
         * @param {string|void} [id] folder id
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
         * Shows the selected items
         *
         * @private
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
         * Selects or unselects an item
         *
         * @private
         * @param {Object} item file or folder object
         * @return {void}
         */


        /**
         * Changes the share access of an item
         *
         * @private
         * @param {string} access share access
         * @param {Object} item file or folder object
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


        /**
         * Updates the focused row based on key binder
         *
         * @private
         * @param {number} focusedRow - the row index thats focused
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
            var _props = this.props,
                rootFolderId = _props.rootFolderId,
                logoUrl = _props.logoUrl,
                canUpload = _props.canUpload,
                canSetShareAccess = _props.canSetShareAccess,
                extensions = _props.extensions,
                maxSelectable = _props.maxSelectable,
                type = _props.type,
                getLocalizedMessage = _props.getLocalizedMessage,
                token = _props.token,
                sharedLink = _props.sharedLink,
                sharedLinkPassword = _props.sharedLinkPassword,
                apiHost = _props.apiHost,
                uploadHost = _props.uploadHost,
                isSmall = _props.isSmall,
                className = _props.className,
                measureRef = _props.measureRef,
                chooseButtonLabel = _props.chooseButtonLabel,
                cancelButtonLabel = _props.cancelButtonLabel;
            var _state = this.state,
                view = _state.view,
                rootName = _state.rootName,
                selected = _state.selected,
                currentCollection = _state.currentCollection,
                searchQuery = _state.searchQuery,
                isCreateFolderModalOpen = _state.isCreateFolderModalOpen,
                isUploadModalOpen = _state.isUploadModalOpen,
                isLoading = _state.isLoading,
                errorCode = _state.errorCode,
                focusedRow = _state.focusedRow;
            var id = currentCollection.id,
                permissions = currentCollection.permissions;

            var _ref = permissions || {},
                can_upload = _ref.can_upload;

            var selectedCount = Object.keys(selected).length;
            var hasHitSelectionLimit = selectedCount === maxSelectable && maxSelectable !== 1;
            var allowUpload = canUpload && can_upload;
            var styleClassName = classNames('buik bcp', className);

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
                        isSmall: isSmall,
                        rootId: rootFolderId,
                        rootElement: this.rootElement,
                        focusedRow: focusedRow,
                        selectableType: type,
                        canSetShareAccess: canSetShareAccess,
                        extensionsWhitelist: extensions,
                        hasHitSelectionLimit: hasHitSelectionLimit,
                        currentCollection: currentCollection,
                        tableRef: this.tableRef,
                        onItemSelect: this.select,
                        onItemClick: this.onItemClick,
                        onFocusChange: this.onFocusChange,
                        onShareAccessChange: this.changeShareAccess,
                        getLocalizedMessage: getLocalizedMessage
                    }),
                    React.createElement(Footer, {
                        selectedCount: selectedCount,
                        hasHitSelectionLimit: hasHitSelectionLimit,
                        onSelectedClick: this.showSelected,
                        onChoose: this.choose,
                        onCancel: this.cancel,
                        getLocalizedMessage: getLocalizedMessage,
                        chooseButtonLabel: chooseButtonLabel,
                        cancelButtonLabel: cancelButtonLabel
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
                    parentElement: this.rootElement
                }) : null,
                canUpload && !!this.appElement ? React.createElement(CreateFolderDialog, {
                    isOpen: isCreateFolderModalOpen,
                    onCreate: this.createFolderCallback,
                    onCancel: this.closeModals,
                    getLocalizedMessage: getLocalizedMessage,
                    isLoading: isLoading,
                    errorCode: errorCode,
                    parentElement: this.rootElement
                }) : null
            );
            /* eslint-enable jsx-a11y/no-static-element-interactions */
            /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
        }
    }]);

    return ContentPicker;
}(Component);

ContentPicker.defaultProps = {
    type: defaultType,
    rootFolderId: DEFAULT_ROOT,
    onChoose: noop,
    onCancel: noop,
    sortBy: FIELD_NAME,
    sortDirection: SORT_ASC,
    extensions: [],
    maxSelectable: Infinity,
    canUpload: true,
    canSetShareAccess: true,
    autoFocus: false,
    className: '',
    apiHost: DEFAULT_HOSTNAME_API,
    uploadHost: DEFAULT_HOSTNAME_UPLOAD,
    clientName: CLIENT_NAME_CONTENT_PICKER,
    defaultView: DEFAULT_VIEW_FILES
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.firstLoad = true;

    this.choose = function () {
        var selected = _this2.state.selected;
        var onChoose = _this2.props.onChoose;

        var results = Object.keys(selected).map(function (key) {
            var clone = Object.assign({}, selected[key]);
            delete clone.selected;
            return clone;
        });
        onChoose(results);
    };

    this.cancel = function () {
        var onCancel = _this2.props.onCancel;
        var selected = _this2.state.selected;

        // Clear out the selected field

        Object.keys(selected).forEach(function (key) {
            return delete selected[key].selected;
        });

        // Reset the selected state
        _this2.setState({ selected: {} }, function () {
            return onCancel();
        });
    };

    this.refreshGrid = function () {
        if (_this2.table) {
            _this2.table.forceUpdateGrid();
        }
    };

    this.errorCallback = function (error) {
        _this2.setState({
            view: VIEW_ERROR
        });
        /* eslint-disable no-console */
        console.error(error);
        /* eslint-enable no-console */
    };

    this.onItemClick = function (item) {
        // If the id was passed in, just use that
        if (typeof item === 'string') {
            _this2.fetchFolder(item);
            return;
        }

        // If the item was passed in
        var id = item.id,
            type = item.type;

        if (type === TYPE_FOLDER) {
            _this2.fetchFolder(id);
        }
    };

    this.fetchFolderSuccessCallback = function (collection) {
        var rootFolderId = _this2.props.rootFolderId;
        var id = collection.id,
            name = collection.name;

        // New folder state

        var newState = {
            currentCollection: collection,
            rootName: id === rootFolderId ? name : ''
        };

        // Close any open modals
        _this2.closeModals();

        // Set the new state and focus the grid for tabbing
        _this2.setState(newState, _this2.finishNavigation);
    };

    this.fetchFolder = function (id) {
        var forceFetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var rootFolderId = _this2.props.rootFolderId;
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
        _this2.api.getFolderAPI().folder(folderId, sortBy, sortDirection, _this2.fetchFolderSuccessCallback, _this2.errorCallback, forceFetch);
    };

    this.recentsSuccessCallback = function (collection) {
        // Set the new state and focus the grid for tabbing
        _this2.setState({
            currentCollection: collection
        }, _this2.finishNavigation);
    };

    this.showRecents = function () {
        var forceFetch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var rootFolderId = _this2.props.rootFolderId;
        var _state3 = _this2.state,
            sortBy = _state3.sortBy,
            sortDirection = _state3.sortDirection;

        // Recents are sorted by a different date field than the rest

        var by = sortBy === FIELD_MODIFIED_AT ? FIELD_INTERACTED_AT : sortBy;

        // Reset search state, the view and show busy indicator
        _this2.setState({
            searchQuery: '',
            view: VIEW_RECENTS,
            currentCollection: _this2.currentUnloadedCollection()
        });

        // Fetch the folder using folder API
        _this2.api.getRecentsAPI().recents(rootFolderId, by, sortDirection, _this2.recentsSuccessCallback, _this2.errorCallback, forceFetch);
    };

    this.showSelected = function () {
        var _state4 = _this2.state,
            selected = _state4.selected,
            sortBy = _state4.sortBy,
            sortDirection = _state4.sortDirection;

        _this2.setState({
            searchQuery: '',
            view: VIEW_SELECTED,
            currentCollection: {
                sortBy: sortBy,
                sortDirection: sortDirection,
                percentLoaded: 100,
                items: Object.keys(selected).map(function (key) {
                    return selected[key];
                })
            }
        }, _this2.finishNavigation);
    };

    this.searchSuccessCallback = function (collection) {
        var currentCollection = _this2.state.currentCollection;

        _this2.setState({
            currentCollection: Object.assign(currentCollection, collection)
        });
    };

    this.debouncedSearch = debounce(function (id, query, forceFetch) {
        var _state5 = _this2.state,
            sortBy = _state5.sortBy,
            sortDirection = _state5.sortDirection;

        _this2.api.getSearchAPI().search(id, query, sortBy, sortDirection, _this2.searchSuccessCallback, _this2.errorCallback, forceFetch);
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
            _this2.fetchFolder(folderId);
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
            searchQuery: query,
            view: VIEW_SEARCH,
            currentCollection: _this2.currentUnloadedCollection()
        });

        _this2.debouncedSearch(folderId, query, forceFetch);
    };

    this.upload = function () {
        var _state$currentCollect = _this2.state.currentCollection,
            id = _state$currentCollect.id,
            permissions = _state$currentCollect.permissions;
        var canUpload = _this2.props.canUpload;

        if (!id || !permissions) {
            return;
        }

        var canUploadPermission = permissions.can_upload;

        if (!canUpload || !canUploadPermission) {
            return;
        }

        _this2.setModalAppElement();
        _this2.setState({
            isUploadModalOpen: true
        });
    };

    this.uploadSuccessHandler = function () {
        var id = _this2.state.currentCollection.id;

        _this2.fetchFolder(id, true);
    };

    this.createFolder = function () {
        _this2.createFolderCallback();
    };

    this.createFolderCallback = function (name) {
        var _state6 = _this2.state,
            isCreateFolderModalOpen = _state6.isCreateFolderModalOpen,
            currentCollection = _state6.currentCollection;
        var canUpload = _this2.props.canUpload;

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
        _this2.api.getFolderAPI().create(id, name, function () {
            _this2.fetchFolder(id);
        }, function (_ref2) {
            var status = _ref2.response.status;

            _this2.setState({
                errorCode: status === 409 ? ERROR_CODE_ITEM_NAME_IN_USE : ERROR_CODE_ITEM_NAME_INVALID,
                isLoading: false
            });
        });
    };

    this.select = function (item) {
        var _props2 = _this2.props,
            selectableType = _props2.type,
            maxSelectable = _props2.maxSelectable;
        var _state7 = _this2.state,
            view = _state7.view,
            selected = _state7.selected,
            _state7$currentCollec = _state7.currentCollection.items,
            items = _state7$currentCollec === undefined ? [] : _state7$currentCollec;
        var id = item.id,
            type = item.type;


        if (!id || !type || selectableType.indexOf(type) === -1) {
            return;
        }

        var selectedCount = Object.keys(selected).length;
        var hasHitSelectionLimit = selectedCount === maxSelectable;
        var isSingleFileSelection = maxSelectable === 1;
        var typedId = type + '_' + id;
        var existing = selected[typedId];

        if (existing) {
            // We are selecting the same item that was already
            // selected. Unselect it in this case. Toggle case.
            existing.selected = false;
            delete selected[typedId];
        } else {
            // We are selecting a new item that was never
            // selected before. However if we are in a single
            // item selection mode, we should also unselect any
            // prior item that was item that was selected.

            // Check if we hit the selection limit
            // Ignore when in single file selection mode.
            if (hasHitSelectionLimit && !isSingleFileSelection) {
                return;
            }

            var keys = Object.keys(selected);
            if (keys.length > 0 && isSingleFileSelection) {
                var key = keys[0]; // Only 1 in the map
                var prior = selected[key];
                prior.selected = false;
                delete selected[key];
            }

            // Select the new item
            item.selected = true;
            selected[typedId] = item;
        }

        var focusedRow = items.findIndex(function (i) {
            return i.id === item.id;
        });
        _this2.setState({ selected: selected, focusedRow: focusedRow }, function () {
            if (view === VIEW_SELECTED) {
                // Need to refresh the selected view
                _this2.showSelected();
            }
        });
    };

    this.changeShareAccess = function (access, item) {
        var canSetShareAccess = _this2.props.canSetShareAccess;

        if (!item || !canSetShareAccess) {
            return;
        }

        var permissions = item.permissions,
            type = item.type;

        if (!permissions || !type) {
            return;
        }

        var can_set_share_access = permissions.can_set_share_access;

        if (!can_set_share_access) {
            return;
        }

        _this2.api.getAPI(type).share(item, access, _this2.refreshGrid);
    };

    this.sort = function (sortBy, sortDirection) {
        var _state8 = _this2.state,
            id = _state8.currentCollection.id,
            view = _state8.view,
            searchQuery = _state8.searchQuery;

        if (!id) {
            return;
        }

        _this2.setState({ sortBy: sortBy, sortDirection: sortDirection }, function () {
            if (view === VIEW_FOLDER) {
                _this2.fetchFolder(id);
            } else if (view === VIEW_SEARCH) {
                _this2.search(searchQuery);
            } else if (view === VIEW_RECENTS) {
                _this2.showRecents();
            } else {
                throw new Error('Cannot sort incompatible view!');
            }
        });
    };

    this.tableRef = function (table) {
        _this2.table = table;
    };

    this.closeModals = function () {
        var focusedRow = _this2.state.focusedRow;


        _this2.setState({
            isLoading: false,
            isCreateFolderModalOpen: false,
            isUploadModalOpen: false
        });

        var _state9 = _this2.state,
            selected = _state9.selected,
            _state9$currentCollec = _state9.currentCollection.items,
            items = _state9$currentCollec === undefined ? [] : _state9$currentCollec;

        if (selected && items.length > 0) {
            focus(_this2.rootElement, '.bcp-item-row-' + focusedRow);
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
                focus(_this2.rootElement, '.bcp-item-row', false);
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
            case 'c':
                if (_this2.globalModifier) {
                    _this2.choose();
                    event.preventDefault();
                }
                break;
            case 'x':
                if (_this2.globalModifier) {
                    _this2.cancel();
                    event.preventDefault();
                }
                break;
            case 's':
                if (_this2.globalModifier) {
                    _this2.showSelected();
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

    this.onFocusChange = function (focusedRow) {
        _this2.setState({ focusedRow: focusedRow });
    };
};

export default makeResponsive(ContentPicker);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRlbnRQaWNrZXIuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJjbGFzc05hbWVzIiwiTW9kYWwiLCJkZWJvdW5jZSIsInVuaXF1ZWlkIiwibm9vcCIsIkZvb3RlciIsIkNvbnRlbnQiLCJIZWFkZXIiLCJTdWJIZWFkZXIiLCJVcGxvYWREaWFsb2ciLCJDcmVhdGVGb2xkZXJEaWFsb2ciLCJBUEkiLCJtYWtlUmVzcG9uc2l2ZSIsImlzRm9jdXNhYmxlRWxlbWVudCIsImlzSW5wdXRFbGVtZW50IiwiZm9jdXMiLCJERUZBVUxUX0hPU1ROQU1FX1VQTE9BRCIsIkRFRkFVTFRfSE9TVE5BTUVfQVBJIiwiREVGQVVMVF9TRUFSQ0hfREVCT1VOQ0UiLCJTT1JUX0FTQyIsIkZJRUxEX05BTUUiLCJGSUVMRF9NT0RJRklFRF9BVCIsIkZJRUxEX0lOVEVSQUNURURfQVQiLCJERUZBVUxUX1JPT1QiLCJWSUVXX1NFQVJDSCIsIlZJRVdfRk9MREVSIiwiVklFV19TRUxFQ1RFRCIsIlZJRVdfRVJST1IiLCJWSUVXX1JFQ0VOVFMiLCJUWVBFX0ZJTEUiLCJUWVBFX0ZPTERFUiIsIlRZUEVfV0VCTElOSyIsIkNMSUVOVF9OQU1FX0NPTlRFTlRfUElDS0VSIiwiREVGQVVMVF9WSUVXX0ZJTEVTIiwiREVGQVVMVF9WSUVXX1JFQ0VOVFMiLCJFUlJPUl9DT0RFX0lURU1fTkFNRV9JTlZBTElEIiwiRVJST1JfQ09ERV9JVEVNX05BTUVfVE9PX0xPTkciLCJFUlJPUl9DT0RFX0lURU1fTkFNRV9JTl9VU0UiLCJUWVBFRF9JRF9GT0xERVJfUFJFRklYIiwiZGVmYXVsdFR5cGUiLCJDb250ZW50UGlja2VyIiwicHJvcHMiLCJ0b2tlbiIsInNoYXJlZExpbmsiLCJzaGFyZWRMaW5rUGFzc3dvcmQiLCJhcGlIb3N0IiwidXBsb2FkSG9zdCIsInNvcnRCeSIsInNvcnREaXJlY3Rpb24iLCJjbGllbnROYW1lIiwicmVzcG9uc2VGaWx0ZXIiLCJyb290Rm9sZGVySWQiLCJhcGkiLCJpZCIsInN0YXRlIiwicm9vdE5hbWUiLCJjdXJyZW50Q29sbGVjdGlvbiIsInNlbGVjdGVkIiwic2VhcmNoUXVlcnkiLCJ2aWV3IiwiaXNDcmVhdGVGb2xkZXJNb2RhbE9wZW4iLCJpc1VwbG9hZE1vZGFsT3BlbiIsImZvY3VzZWRSb3ciLCJpc0xvYWRpbmciLCJlcnJvckNvZGUiLCJkZXN0cm95Iiwic2V0QXBwRWxlbWVudCIsImFwcEVsZW1lbnQiLCJjbGVhckNhY2hlIiwicm9vdEVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJkZWZhdWx0VmlldyIsInNob3dSZWNlbnRzIiwiZmV0Y2hGb2xkZXIiLCJPYmplY3QiLCJhc3NpZ24iLCJwZXJjZW50TG9hZGVkIiwiYXV0b0ZvY3VzIiwiZmlyc3RMb2FkIiwiYWN0aXZlRWxlbWVudCIsInNldFN0YXRlIiwibG9nb1VybCIsImNhblVwbG9hZCIsImNhblNldFNoYXJlQWNjZXNzIiwiZXh0ZW5zaW9ucyIsIm1heFNlbGVjdGFibGUiLCJ0eXBlIiwiZ2V0TG9jYWxpemVkTWVzc2FnZSIsImlzU21hbGwiLCJjbGFzc05hbWUiLCJtZWFzdXJlUmVmIiwiY2hvb3NlQnV0dG9uTGFiZWwiLCJjYW5jZWxCdXR0b25MYWJlbCIsInBlcm1pc3Npb25zIiwiY2FuX3VwbG9hZCIsInNlbGVjdGVkQ291bnQiLCJrZXlzIiwibGVuZ3RoIiwiaGFzSGl0U2VsZWN0aW9uTGltaXQiLCJhbGxvd1VwbG9hZCIsInN0eWxlQ2xhc3NOYW1lIiwib25LZXlEb3duIiwic2VhcmNoIiwidXBsb2FkIiwiY3JlYXRlRm9sZGVyIiwic29ydCIsInRhYmxlUmVmIiwic2VsZWN0Iiwib25JdGVtQ2xpY2siLCJvbkZvY3VzQ2hhbmdlIiwiY2hhbmdlU2hhcmVBY2Nlc3MiLCJzaG93U2VsZWN0ZWQiLCJjaG9vc2UiLCJjYW5jZWwiLCJ1cGxvYWRTdWNjZXNzSGFuZGxlciIsImNyZWF0ZUZvbGRlckNhbGxiYWNrIiwiY2xvc2VNb2RhbHMiLCJkZWZhdWx0UHJvcHMiLCJvbkNob29zZSIsIm9uQ2FuY2VsIiwiSW5maW5pdHkiLCJyZXN1bHRzIiwibWFwIiwia2V5IiwiY2xvbmUiLCJmb3JFYWNoIiwicmVmcmVzaEdyaWQiLCJ0YWJsZSIsImZvcmNlVXBkYXRlR3JpZCIsImVycm9yQ2FsbGJhY2siLCJlcnJvciIsImNvbnNvbGUiLCJpdGVtIiwiZmV0Y2hGb2xkZXJTdWNjZXNzQ2FsbGJhY2siLCJjb2xsZWN0aW9uIiwibmFtZSIsIm5ld1N0YXRlIiwiZmluaXNoTmF2aWdhdGlvbiIsImZvcmNlRmV0Y2giLCJmb2xkZXJJZCIsImN1cnJlbnRVbmxvYWRlZENvbGxlY3Rpb24iLCJnZXRGb2xkZXJBUEkiLCJmb2xkZXIiLCJyZWNlbnRzU3VjY2Vzc0NhbGxiYWNrIiwiYnkiLCJnZXRSZWNlbnRzQVBJIiwicmVjZW50cyIsIml0ZW1zIiwic2VhcmNoU3VjY2Vzc0NhbGxiYWNrIiwiZGVib3VuY2VkU2VhcmNoIiwicXVlcnkiLCJnZXRTZWFyY2hBUEkiLCJ0cmltbWVkUXVlcnkiLCJ0cmltIiwiY2FuVXBsb2FkUGVybWlzc2lvbiIsInNldE1vZGFsQXBwRWxlbWVudCIsImNyZWF0ZSIsInN0YXR1cyIsInJlc3BvbnNlIiwic2VsZWN0YWJsZVR5cGUiLCJpbmRleE9mIiwiaXNTaW5nbGVGaWxlU2VsZWN0aW9uIiwidHlwZWRJZCIsImV4aXN0aW5nIiwicHJpb3IiLCJmaW5kSW5kZXgiLCJpIiwiYWNjZXNzIiwiY2FuX3NldF9zaGFyZV9hY2Nlc3MiLCJnZXRBUEkiLCJzaGFyZSIsIkVycm9yIiwiZXZlbnQiLCJ0YXJnZXQiLCJ0b0xvd2VyQ2FzZSIsInByZXZlbnREZWZhdWx0IiwiZ2xvYmFsTW9kaWZpZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixZQUF2QjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsYUFB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QyxjQUFULEVBQXlCO0FBQ3JCLDJCQUFLakUsWUFBTDtBQUNBNkQsMEJBQU1HLGNBQU47QUFDSDtBQUNEO0FBQ0osaUJBQUssR0FBTDtBQUNJLG9CQUFJLE9BQUtDLGNBQVQsRUFBeUI7QUFDckIsMkJBQUt6RSxNQUFMO0FBQ0FxRSwwQkFBTUcsY0FBTjtBQUNIO0FBQ0Q7QUFDSixpQkFBSyxHQUFMO0FBQ0ksb0JBQUksT0FBS0MsY0FBVCxFQUF5QjtBQUNyQiwyQkFBS3hHLFdBQUwsQ0FBaUIsSUFBakI7QUFDQW9HLDBCQUFNRyxjQUFOO0FBQ0g7QUFDRDtBQUNKLGlCQUFLLEdBQUw7QUFDSSxvQkFBSSxPQUFLQyxjQUFULEVBQXlCO0FBQ3JCLDJCQUFLeEUsWUFBTDtBQUNBb0UsMEJBQU1HLGNBQU47QUFDSDtBQUNEO0FBQ0o7QUFDSSx1QkFBS0MsY0FBTCxHQUFzQixLQUF0QjtBQUNBO0FBOURSOztBQWlFQSxlQUFLQSxjQUFMLEdBQXNCckQsUUFBUSxHQUE5QjtBQUNILEs7O1NBU0RkLGEsR0FBZ0IsVUFBQ2pELFVBQUQsRUFBd0I7QUFDcEMsZUFBS29CLFFBQUwsQ0FBYyxFQUFFcEIsc0JBQUYsRUFBZDtBQUNILEs7OztBQXdJTCxlQUFlbEQsZUFBZTRCLGFBQWYsQ0FBZiIsImZpbGUiOiJDb250ZW50UGlja2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIENvbnRlbnQgUGlja2VyIENvbXBvbmVudFxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5pbXBvcnQgTW9kYWwgZnJvbSAncmVhY3QtbW9kYWwnO1xyXG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnbG9kYXNoLmRlYm91bmNlJztcclxuaW1wb3J0IHVuaXF1ZWlkIGZyb20gJ2xvZGFzaC51bmlxdWVpZCc7XHJcbmltcG9ydCBub29wIGZyb20gJ2xvZGFzaC5ub29wJztcclxuaW1wb3J0IEZvb3RlciBmcm9tICcuL0Zvb3Rlcic7XHJcbmltcG9ydCBDb250ZW50IGZyb20gJy4vQ29udGVudCc7XHJcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi4vSGVhZGVyJztcclxuaW1wb3J0IFN1YkhlYWRlciBmcm9tICcuLi9TdWJIZWFkZXIvU3ViSGVhZGVyJztcclxuaW1wb3J0IFVwbG9hZERpYWxvZyBmcm9tICcuLi9VcGxvYWREaWFsb2cnO1xyXG5pbXBvcnQgQ3JlYXRlRm9sZGVyRGlhbG9nIGZyb20gJy4uL0NyZWF0ZUZvbGRlckRpYWxvZyc7XHJcbmltcG9ydCBBUEkgZnJvbSAnLi4vLi4vYXBpJztcclxuaW1wb3J0IG1ha2VSZXNwb25zaXZlIGZyb20gJy4uL21ha2VSZXNwb25zaXZlJztcclxuaW1wb3J0IHsgaXNGb2N1c2FibGVFbGVtZW50LCBpc0lucHV0RWxlbWVudCwgZm9jdXMgfSBmcm9tICcuLi8uLi91dGlsL2RvbSc7XHJcbmltcG9ydCB7XHJcbiAgICBERUZBVUxUX0hPU1ROQU1FX1VQTE9BRCxcclxuICAgIERFRkFVTFRfSE9TVE5BTUVfQVBJLFxyXG4gICAgREVGQVVMVF9TRUFSQ0hfREVCT1VOQ0UsXHJcbiAgICBTT1JUX0FTQyxcclxuICAgIEZJRUxEX05BTUUsXHJcbiAgICBGSUVMRF9NT0RJRklFRF9BVCxcclxuICAgIEZJRUxEX0lOVEVSQUNURURfQVQsXHJcbiAgICBERUZBVUxUX1JPT1QsXHJcbiAgICBWSUVXX1NFQVJDSCxcclxuICAgIFZJRVdfRk9MREVSLFxyXG4gICAgVklFV19TRUxFQ1RFRCxcclxuICAgIFZJRVdfRVJST1IsXHJcbiAgICBWSUVXX1JFQ0VOVFMsXHJcbiAgICBUWVBFX0ZJTEUsXHJcbiAgICBUWVBFX0ZPTERFUixcclxuICAgIFRZUEVfV0VCTElOSyxcclxuICAgIENMSUVOVF9OQU1FX0NPTlRFTlRfUElDS0VSLFxyXG4gICAgREVGQVVMVF9WSUVXX0ZJTEVTLFxyXG4gICAgREVGQVVMVF9WSUVXX1JFQ0VOVFMsXHJcbiAgICBFUlJPUl9DT0RFX0lURU1fTkFNRV9JTlZBTElELFxyXG4gICAgRVJST1JfQ09ERV9JVEVNX05BTUVfVE9PX0xPTkcsXHJcbiAgICBFUlJPUl9DT0RFX0lURU1fTkFNRV9JTl9VU0UsXHJcbiAgICBUWVBFRF9JRF9GT0xERVJfUFJFRklYXHJcbn0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHR5cGUge1xyXG4gICAgQm94SXRlbSxcclxuICAgIENvbGxlY3Rpb24sXHJcbiAgICBWaWV3LFxyXG4gICAgU29ydERpcmVjdGlvbixcclxuICAgIFNvcnRCeSxcclxuICAgIEFjY2VzcyxcclxuICAgIEJveEl0ZW1QZXJtaXNzaW9uLFxyXG4gICAgVG9rZW4sXHJcbiAgICBEZWZhdWx0Vmlld1xyXG59IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcbmltcG9ydCAnLi4vZm9udHMuc2Nzcyc7XHJcbmltcG9ydCAnLi4vYmFzZS5zY3NzJztcclxuXHJcbnR5cGUgQm94SXRlbU1hcCA9IHsgW3N0cmluZ106IEJveEl0ZW0gfTtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICB0eXBlOiBzdHJpbmcsXHJcbiAgICByb290Rm9sZGVySWQ6IHN0cmluZyxcclxuICAgIG9uQ2hvb3NlOiBGdW5jdGlvbixcclxuICAgIG9uQ2FuY2VsOiBGdW5jdGlvbixcclxuICAgIHNvcnRCeTogU29ydEJ5LFxyXG4gICAgc29ydERpcmVjdGlvbjogU29ydERpcmVjdGlvbixcclxuICAgIGV4dGVuc2lvbnM6IHN0cmluZ1tdLFxyXG4gICAgbWF4U2VsZWN0YWJsZTogbnVtYmVyLFxyXG4gICAgY2FuVXBsb2FkOiBib29sZWFuLFxyXG4gICAgY2FuU2V0U2hhcmVBY2Nlc3M6IGJvb2xlYW4sXHJcbiAgICBhdXRvRm9jdXM6IGJvb2xlYW4sXHJcbiAgICBhcGlIb3N0OiBzdHJpbmcsXHJcbiAgICB1cGxvYWRIb3N0OiBzdHJpbmcsXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlOiBGdW5jdGlvbixcclxuICAgIGNsaWVudE5hbWU6IHN0cmluZyxcclxuICAgIHRva2VuOiBUb2tlbixcclxuICAgIGlzU21hbGw6IGJvb2xlYW4sXHJcbiAgICBpc0xhcmdlOiBib29sZWFuLFxyXG4gICAgaXNUb3VjaDogYm9vbGVhbixcclxuICAgIGNsYXNzTmFtZTogc3RyaW5nLFxyXG4gICAgbWVhc3VyZVJlZjogRnVuY3Rpb24sXHJcbiAgICBkZWZhdWx0VmlldzogRGVmYXVsdFZpZXcsXHJcbiAgICBjaG9vc2VCdXR0b25MYWJlbD86IHN0cmluZyxcclxuICAgIGNhbmNlbEJ1dHRvbkxhYmVsPzogc3RyaW5nLFxyXG4gICAgbG9nb1VybD86IHN0cmluZyxcclxuICAgIHNoYXJlZExpbms/OiBzdHJpbmcsXHJcbiAgICBzaGFyZWRMaW5rUGFzc3dvcmQ/OiBzdHJpbmcsXHJcbiAgICByZXNwb25zZUZpbHRlcj86IEZ1bmN0aW9uXHJcbn07XHJcblxyXG50eXBlIFN0YXRlID0ge1xyXG4gICAgc29ydEJ5OiBTb3J0QnksXHJcbiAgICBzb3J0RGlyZWN0aW9uOiBTb3J0RGlyZWN0aW9uLFxyXG4gICAgcm9vdE5hbWU6IHN0cmluZyxcclxuICAgIGVycm9yQ29kZTogc3RyaW5nLFxyXG4gICAgY3VycmVudENvbGxlY3Rpb246IENvbGxlY3Rpb24sXHJcbiAgICBzZWxlY3RlZDogQm94SXRlbU1hcCxcclxuICAgIHNlYXJjaFF1ZXJ5OiBzdHJpbmcsXHJcbiAgICBpc0xvYWRpbmc6IGJvb2xlYW4sXHJcbiAgICB2aWV3OiBWaWV3LFxyXG4gICAgaXNVcGxvYWRNb2RhbE9wZW46IGJvb2xlYW4sXHJcbiAgICBpc0NyZWF0ZUZvbGRlck1vZGFsT3BlbjogYm9vbGVhbixcclxuICAgIGZvY3VzZWRSb3c6IG51bWJlclxyXG59O1xyXG5cclxudHlwZSBEZWZhdWx0UHJvcHMgPSB7fFxyXG4gICAgdHlwZTogc3RyaW5nLFxyXG4gICAgcm9vdEZvbGRlcklkOiBzdHJpbmcsXHJcbiAgICBvbkNob29zZTogRnVuY3Rpb24sXHJcbiAgICBvbkNhbmNlbDogRnVuY3Rpb24sXHJcbiAgICBzb3J0Qnk6IFNvcnRCeSxcclxuICAgIHNvcnREaXJlY3Rpb246IFNvcnREaXJlY3Rpb24sXHJcbiAgICBleHRlbnNpb25zOiBzdHJpbmdbXSxcclxuICAgIG1heFNlbGVjdGFibGU6IG51bWJlcixcclxuICAgIGNhblVwbG9hZDogYm9vbGVhbixcclxuICAgIGNhblNldFNoYXJlQWNjZXNzOiBib29sZWFuLFxyXG4gICAgYXV0b0ZvY3VzOiBib29sZWFuLFxyXG4gICAgYXBpSG9zdDogc3RyaW5nLFxyXG4gICAgdXBsb2FkSG9zdDogc3RyaW5nLFxyXG4gICAgY2xpZW50TmFtZTogc3RyaW5nLFxyXG4gICAgY2xhc3NOYW1lOiBzdHJpbmcsXHJcbiAgICBkZWZhdWx0VmlldzogRGVmYXVsdFZpZXdcclxufH07XHJcblxyXG5jb25zdCBkZWZhdWx0VHlwZSA9IGAke1RZUEVfRklMRX0sJHtUWVBFX1dFQkxJTkt9YDtcclxuXHJcbmNsYXNzIENvbnRlbnRQaWNrZXIgZXh0ZW5kcyBDb21wb25lbnQ8RGVmYXVsdFByb3BzLCBQcm9wcywgU3RhdGU+IHtcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBhcGk6IEFQSTtcclxuICAgIHN0YXRlOiBTdGF0ZTtcclxuICAgIHByb3BzOiBQcm9wcztcclxuICAgIHRhYmxlOiBhbnk7XHJcbiAgICByb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgICBhcHBFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICAgIGdsb2JhbE1vZGlmaWVyOiBib29sZWFuO1xyXG4gICAgZmlyc3RMb2FkOiBib29sZWFuID0gdHJ1ZTsgLy8gS2VlcHMgdHJhY2sgb2YgdmVyeSAxc3QgbG9hZFxyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM6IERlZmF1bHRQcm9wcyA9IHtcclxuICAgICAgICB0eXBlOiBkZWZhdWx0VHlwZSxcclxuICAgICAgICByb290Rm9sZGVySWQ6IERFRkFVTFRfUk9PVCxcclxuICAgICAgICBvbkNob29zZTogbm9vcCxcclxuICAgICAgICBvbkNhbmNlbDogbm9vcCxcclxuICAgICAgICBzb3J0Qnk6IEZJRUxEX05BTUUsXHJcbiAgICAgICAgc29ydERpcmVjdGlvbjogU09SVF9BU0MsXHJcbiAgICAgICAgZXh0ZW5zaW9uczogW10sXHJcbiAgICAgICAgbWF4U2VsZWN0YWJsZTogSW5maW5pdHksXHJcbiAgICAgICAgY2FuVXBsb2FkOiB0cnVlLFxyXG4gICAgICAgIGNhblNldFNoYXJlQWNjZXNzOiB0cnVlLFxyXG4gICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcbiAgICAgICAgY2xhc3NOYW1lOiAnJyxcclxuICAgICAgICBhcGlIb3N0OiBERUZBVUxUX0hPU1ROQU1FX0FQSSxcclxuICAgICAgICB1cGxvYWRIb3N0OiBERUZBVUxUX0hPU1ROQU1FX1VQTE9BRCxcclxuICAgICAgICBjbGllbnROYW1lOiBDTElFTlRfTkFNRV9DT05URU5UX1BJQ0tFUixcclxuICAgICAgICBkZWZhdWx0VmlldzogREVGQVVMVF9WSUVXX0ZJTEVTXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogW2NvbnN0cnVjdG9yXVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHtDb250ZW50UGlja2VyfVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgdG9rZW4sXHJcbiAgICAgICAgICAgIHNoYXJlZExpbmssXHJcbiAgICAgICAgICAgIHNoYXJlZExpbmtQYXNzd29yZCxcclxuICAgICAgICAgICAgYXBpSG9zdCxcclxuICAgICAgICAgICAgdXBsb2FkSG9zdCxcclxuICAgICAgICAgICAgc29ydEJ5LFxyXG4gICAgICAgICAgICBzb3J0RGlyZWN0aW9uLFxyXG4gICAgICAgICAgICBjbGllbnROYW1lLFxyXG4gICAgICAgICAgICByZXNwb25zZUZpbHRlcixcclxuICAgICAgICAgICAgcm9vdEZvbGRlcklkXHJcbiAgICAgICAgfSA9IHByb3BzO1xyXG5cclxuICAgICAgICB0aGlzLmFwaSA9IG5ldyBBUEkoe1xyXG4gICAgICAgICAgICB0b2tlbixcclxuICAgICAgICAgICAgc2hhcmVkTGluayxcclxuICAgICAgICAgICAgc2hhcmVkTGlua1Bhc3N3b3JkLFxyXG4gICAgICAgICAgICBhcGlIb3N0LFxyXG4gICAgICAgICAgICB1cGxvYWRIb3N0LFxyXG4gICAgICAgICAgICBjbGllbnROYW1lLFxyXG4gICAgICAgICAgICByZXNwb25zZUZpbHRlcixcclxuICAgICAgICAgICAgaWQ6IGAke1RZUEVEX0lEX0ZPTERFUl9QUkVGSVh9JHtyb290Rm9sZGVySWR9YFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmlkID0gdW5pcXVlaWQoJ2JjcF8nKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgc29ydEJ5LFxyXG4gICAgICAgICAgICBzb3J0RGlyZWN0aW9uLFxyXG4gICAgICAgICAgICByb290TmFtZTogJycsXHJcbiAgICAgICAgICAgIGN1cnJlbnRDb2xsZWN0aW9uOiB7fSxcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHt9LFxyXG4gICAgICAgICAgICBzZWFyY2hRdWVyeTogJycsXHJcbiAgICAgICAgICAgIHZpZXc6IFZJRVdfRk9MREVSLFxyXG4gICAgICAgICAgICBpc0NyZWF0ZUZvbGRlck1vZGFsT3BlbjogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzVXBsb2FkTW9kYWxPcGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgZm9jdXNlZFJvdzogMCxcclxuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyb3JDb2RlOiAnJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXN0cm95cyBhcGkgaW5zdGFuY2VzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGNsZWFyQ2FjaGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hcGkuZGVzdHJveSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWN0LW1vZGFsIGV4cGVjdHMgdGhlIE1vZGFscyBhcHAgZWxlbWVudFxyXG4gICAgICogdG8gYmUgc2V0IHNvIHRoYXQgaXQgY2FuIGFkZCBwcm9wZXIgYXJpYSB0YWdzLlxyXG4gICAgICogV2UgbmVlZCB0byBrZWVwIHNldHRpbmcgaXQsIHNpbmNlIHRoZXJlIG1pZ2h0IGJlXHJcbiAgICAgKiBtdWx0aXBsZSB3aWRnZXRzIG9uIHRoZSBzYW1lIHBhZ2Ugd2l0aCB0aGVpciBvd25cclxuICAgICAqIGFwcCBlbGVtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbGxlY3Rpb24gaXRlbSBjb2xsZWN0aW9uIG9iamVjdFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgc2V0TW9kYWxBcHBFbGVtZW50KCkge1xyXG4gICAgICAgIE1vZGFsLnNldEFwcEVsZW1lbnQodGhpcy5hcHBFbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFudXBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJDYWNoZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmV0Y2hlcyB0aGUgcm9vdCBmb2xkZXIgb24gbG9hZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5yb290RWxlbWVudCA9ICgoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCk6IGFueSk6IEhUTUxFbGVtZW50KTtcclxuICAgICAgICAvLyAkRmxvd0ZpeE1lOiBjaGlsZCB3aWxsIGV4aXN0XHJcbiAgICAgICAgdGhpcy5hcHBFbGVtZW50ID0gdGhpcy5yb290RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcclxuXHJcbiAgICAgICAgY29uc3QgeyBkZWZhdWx0VmlldyB9OiBQcm9wcyA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKGRlZmF1bHRWaWV3ID09PSBERUZBVUxUX1ZJRVdfUkVDRU5UUykge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dSZWNlbnRzKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hGb2xkZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaG9vc2UgYnV0dG9uIGFjdGlvbi5cclxuICAgICAqIENsb25lcyB2YWx1ZXMgYmVmb3JlIHJldHVybmluZyBzbyB0aGF0XHJcbiAgICAgKiBvYmplY3QgcmVmZXJlbmNlcyBhcmUgYnJva2VuLiBBbHNvIGNsZWFuc1xyXG4gICAgICogdXAgdGhlIHNlbGVjdGVkIGF0dHJpYnV0ZSBzaW5jZSBpdCB3YXNcclxuICAgICAqIGFkZGVkIGJ5IHRoZSBmaWxlIHBpY2tlci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQGZpcmVzIGNob29zZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgY2hvb3NlID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgc2VsZWN0ZWQgfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHsgb25DaG9vc2UgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdHM6IEJveEl0ZW1bXSA9IE9iamVjdC5rZXlzKHNlbGVjdGVkKS5tYXAoKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjbG9uZTogQm94SXRlbSA9IE9iamVjdC5hc3NpZ24oe30sIHNlbGVjdGVkW2tleV0pO1xyXG4gICAgICAgICAgICBkZWxldGUgY2xvbmUuc2VsZWN0ZWQ7XHJcbiAgICAgICAgICAgIHJldHVybiBjbG9uZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBvbkNob29zZShyZXN1bHRzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYW5jZWwgYnV0dG9uIGFjdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAZmlyZXMgY2FuY2VsXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBjYW5jZWwgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBvbkNhbmNlbCB9OiBQcm9wcyA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgeyBzZWxlY3RlZCB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgICAgIC8vIENsZWFyIG91dCB0aGUgc2VsZWN0ZWQgZmllbGRcclxuICAgICAgICBPYmplY3Qua2V5cyhzZWxlY3RlZCkuZm9yRWFjaCgoa2V5KSA9PiBkZWxldGUgc2VsZWN0ZWRba2V5XS5zZWxlY3RlZCk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IHRoZSBzZWxlY3RlZCBzdGF0ZVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZDoge30gfSwgKCkgPT4gb25DYW5jZWwoKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXRzIHRoZSBwZXJjZW50TG9hZGVkIGluIHRoZSBjb2xsZWN0aW9uXHJcbiAgICAgKiBzbyB0aGF0IHRoZSBsb2FkaW5nIGJhciBzdGFydHMgc2hvd2luZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAZmlyZXMgY2FuY2VsXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBjdXJyZW50VW5sb2FkZWRDb2xsZWN0aW9uKCk6IENvbGxlY3Rpb24ge1xyXG4gICAgICAgIGNvbnN0IHsgY3VycmVudENvbGxlY3Rpb24gfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGN1cnJlbnRDb2xsZWN0aW9uLCB7XHJcbiAgICAgICAgICAgIHBlcmNlbnRMb2FkZWQ6IDBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhlbHBlciBmdW5jdGlvbiB0byByZWZyZXNoIHRoZSBncmlkLlxyXG4gICAgICogVGhpcyBpcyB1c2VmdWwgd2hlbiBtdXRhdGluZyB0aGUgdW5kZXJseWluZyBkYXRhXHJcbiAgICAgKiBzdHJ1Y3R1cmUgYW5kIGhlbmNlIHRoZSBzdGF0ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQGZpcmVzIGNhbmNlbFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgcmVmcmVzaEdyaWQgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMudGFibGUpIHtcclxuICAgICAgICAgICAgdGhpcy50YWJsZS5mb3JjZVVwZGF0ZUdyaWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmV0d29yayBlcnJvciBjYWxsYmFja1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBlcnJvciBvYmplY3RcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGVycm9yQ2FsbGJhY2sgPSAoZXJyb3I6IEVycm9yKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHZpZXc6IFZJRVdfRVJST1JcclxuICAgICAgICB9KTtcclxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aW9uIHBlcmZvcm1lZCB3aGVuIGNsaWNraW5nIG9uIGFuIGl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R8c3RyaW5nfSBpdGVtIC0gdGhlIGNsaWNrZWQgYm94IGl0ZW1cclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIG9uSXRlbUNsaWNrID0gKGl0ZW06IEJveEl0ZW0gfCBzdHJpbmcpID0+IHtcclxuICAgICAgICAvLyBJZiB0aGUgaWQgd2FzIHBhc3NlZCBpbiwganVzdCB1c2UgdGhhdFxyXG4gICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5mZXRjaEZvbGRlcihpdGVtKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIGl0ZW0gd2FzIHBhc3NlZCBpblxyXG4gICAgICAgIGNvbnN0IHsgaWQsIHR5cGUgfTogQm94SXRlbSA9IGl0ZW07XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IFRZUEVfRk9MREVSKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hGb2xkZXIoaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb2N1c2VzIHRoZSBncmlkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZpbmlzaE5hdmlnYXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgeyBhdXRvRm9jdXMgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHsgY3VycmVudENvbGxlY3Rpb246IHsgcGVyY2VudExvYWRlZCB9IH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICAgICAgLy8gSWYgbG9hZGluZyBmb3IgdGhlIHZlcnkgZmlyc3QgdGltZSwgb25seSBhbGxvdyBmb2N1cyBpZiBhdXRvRm9jdXMgaXMgdHJ1ZVxyXG4gICAgICAgIGlmICh0aGlzLmZpcnN0TG9hZCAmJiAhYXV0b0ZvY3VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RMb2FkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERvbid0IGZvY3VzIHRoZSBncmlkIHVudGlsIGl0cyBsb2FkZWQgYW5kIHVzZXIgaXMgbm90IGFscmVhZHkgb24gYW4gaW50ZXJhY3RhYmxlIGVsZW1lbnRcclxuICAgICAgICBpZiAocGVyY2VudExvYWRlZCA9PT0gMTAwICYmICFpc0ZvY3VzYWJsZUVsZW1lbnQoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgZm9jdXModGhpcy5yb290RWxlbWVudCwgJy5iY3AtaXRlbS1yb3cnKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWRSb3c6IDAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9sZGVyIGZldGNoIHN1Y2Nlc3MgY2FsbGJhY2tcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbGxlY3Rpb24gaXRlbSBjb2xsZWN0aW9uIG9iamVjdFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZmV0Y2hGb2xkZXJTdWNjZXNzQ2FsbGJhY2sgPSAoY29sbGVjdGlvbjogQ29sbGVjdGlvbik6IHZvaWQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgcm9vdEZvbGRlcklkIH06IFByb3BzID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7IGlkLCBuYW1lIH06IENvbGxlY3Rpb24gPSBjb2xsZWN0aW9uO1xyXG5cclxuICAgICAgICAvLyBOZXcgZm9sZGVyIHN0YXRlXHJcbiAgICAgICAgY29uc3QgbmV3U3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRDb2xsZWN0aW9uOiBjb2xsZWN0aW9uLFxyXG4gICAgICAgICAgICByb290TmFtZTogaWQgPT09IHJvb3RGb2xkZXJJZCA/IG5hbWUgOiAnJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIENsb3NlIGFueSBvcGVuIG1vZGFsc1xyXG4gICAgICAgIHRoaXMuY2xvc2VNb2RhbHMoKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHRoZSBuZXcgc3RhdGUgYW5kIGZvY3VzIHRoZSBncmlkIGZvciB0YWJiaW5nXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSwgdGhpcy5maW5pc2hOYXZpZ2F0aW9uKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGZXRjaGVzIGEgZm9sZGVyLCBkZWZhdWx0cyB0byBmZXRjaGluZyByb290IGZvbGRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3x2b2lkfSBbaWRdIGZvbGRlciBpZFxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufHZvaWR9IFtmb3JjZUZldGNoXSBUbyB2b2lkIGNhY2hlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmZXRjaEZvbGRlciA9IChpZD86IHN0cmluZywgZm9yY2VGZXRjaDogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc3QgeyByb290Rm9sZGVySWQgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHsgc29ydEJ5LCBzb3J0RGlyZWN0aW9uIH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBmb2xkZXJJZDogc3RyaW5nID0gdHlwZW9mIGlkID09PSAnc3RyaW5nJyA/IGlkIDogcm9vdEZvbGRlcklkO1xyXG5cclxuICAgICAgICAvLyBJZiB3ZSBhcmUgbmF2aWdhdGluZyBhcm91bmQsIGFrYSBub3QgZmlyc3QgbG9hZFxyXG4gICAgICAgIC8vIHRoZW4gcmVzZXQgdGhlIGZvY3VzIHRvIHRoZSByb290IHNvIHRoYXQgYWZ0ZXJcclxuICAgICAgICAvLyB0aGUgY29sbGVjdGlvbiBsb2FkcyB0aGUgYWN0aXZlRWxlbWVudCBpcyBub3QgdGhlXHJcbiAgICAgICAgLy8gYnV0dG9uIHRoYXQgd2FzIGNsaWNrZWQgdG8gZmV0Y2ggdGhlIGZvbGRlclxyXG4gICAgICAgIGlmICghdGhpcy5maXJzdExvYWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yb290RWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVzZXQgc2VhcmNoIHN0YXRlLCB0aGUgdmlldyBhbmQgc2hvdyBidXN5IGluZGljYXRvclxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBzZWFyY2hRdWVyeTogJycsXHJcbiAgICAgICAgICAgIHZpZXc6IFZJRVdfRk9MREVSLFxyXG4gICAgICAgICAgICBjdXJyZW50Q29sbGVjdGlvbjogdGhpcy5jdXJyZW50VW5sb2FkZWRDb2xsZWN0aW9uKClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRmV0Y2ggdGhlIGZvbGRlciB1c2luZyBmb2xkZXIgQVBJXHJcbiAgICAgICAgdGhpcy5hcGlcclxuICAgICAgICAgICAgLmdldEZvbGRlckFQSSgpXHJcbiAgICAgICAgICAgIC5mb2xkZXIoZm9sZGVySWQsIHNvcnRCeSwgc29ydERpcmVjdGlvbiwgdGhpcy5mZXRjaEZvbGRlclN1Y2Nlc3NDYWxsYmFjaywgdGhpcy5lcnJvckNhbGxiYWNrLCBmb3JjZUZldGNoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWNlbnRzIGZldGNoIHN1Y2Nlc3MgY2FsbGJhY2tcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbGxlY3Rpb24gaXRlbSBjb2xsZWN0aW9uIG9iamVjdFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgcmVjZW50c1N1Y2Nlc3NDYWxsYmFjayA9IChjb2xsZWN0aW9uOiBDb2xsZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgLy8gU2V0IHRoZSBuZXcgc3RhdGUgYW5kIGZvY3VzIHRoZSBncmlkIGZvciB0YWJiaW5nXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudENvbGxlY3Rpb246IGNvbGxlY3Rpb25cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGhpcy5maW5pc2hOYXZpZ2F0aW9uXHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93cyByZWNlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbnx2b2lkfSBbZm9yY2VGZXRjaF0gVG8gdm9pZCBjYWNoZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgc2hvd1JlY2VudHMgPSAoZm9yY2VGZXRjaDogYm9vbGVhbiA9IGZhbHNlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyByb290Rm9sZGVySWQgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHsgc29ydEJ5LCBzb3J0RGlyZWN0aW9uIH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICAgICAgLy8gUmVjZW50cyBhcmUgc29ydGVkIGJ5IGEgZGlmZmVyZW50IGRhdGUgZmllbGQgdGhhbiB0aGUgcmVzdFxyXG4gICAgICAgIGNvbnN0IGJ5ID0gc29ydEJ5ID09PSBGSUVMRF9NT0RJRklFRF9BVCA/IEZJRUxEX0lOVEVSQUNURURfQVQgOiBzb3J0Qnk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IHNlYXJjaCBzdGF0ZSwgdGhlIHZpZXcgYW5kIHNob3cgYnVzeSBpbmRpY2F0b3JcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgc2VhcmNoUXVlcnk6ICcnLFxyXG4gICAgICAgICAgICB2aWV3OiBWSUVXX1JFQ0VOVFMsXHJcbiAgICAgICAgICAgIGN1cnJlbnRDb2xsZWN0aW9uOiB0aGlzLmN1cnJlbnRVbmxvYWRlZENvbGxlY3Rpb24oKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBGZXRjaCB0aGUgZm9sZGVyIHVzaW5nIGZvbGRlciBBUElcclxuICAgICAgICB0aGlzLmFwaVxyXG4gICAgICAgICAgICAuZ2V0UmVjZW50c0FQSSgpXHJcbiAgICAgICAgICAgIC5yZWNlbnRzKHJvb3RGb2xkZXJJZCwgYnksIHNvcnREaXJlY3Rpb24sIHRoaXMucmVjZW50c1N1Y2Nlc3NDYWxsYmFjaywgdGhpcy5lcnJvckNhbGxiYWNrLCBmb3JjZUZldGNoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93cyB0aGUgc2VsZWN0ZWQgaXRlbXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgc2hvd1NlbGVjdGVkID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgc2VsZWN0ZWQsIHNvcnRCeSwgc29ydERpcmVjdGlvbiB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoUXVlcnk6ICcnLFxyXG4gICAgICAgICAgICAgICAgdmlldzogVklFV19TRUxFQ1RFRCxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2xsZWN0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc29ydEJ5LFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnREaXJlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudExvYWRlZDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBPYmplY3Qua2V5cyhzZWxlY3RlZCkubWFwKChrZXkpID0+IHNlbGVjdGVkW2tleV0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRoaXMuZmluaXNoTmF2aWdhdGlvblxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VhcmNoIHN1Y2Nlc3MgY2FsbGJhY2tcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbGxlY3Rpb24gaXRlbSBjb2xsZWN0aW9uIG9iamVjdFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgc2VhcmNoU3VjY2Vzc0NhbGxiYWNrID0gKGNvbGxlY3Rpb246IENvbGxlY3Rpb24pOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCB7IGN1cnJlbnRDb2xsZWN0aW9uIH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgY3VycmVudENvbGxlY3Rpb246IE9iamVjdC5hc3NpZ24oY3VycmVudENvbGxlY3Rpb24sIGNvbGxlY3Rpb24pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVib3VuY2VkIHNlYXJjaGluZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgZm9sZGVyIGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgc2VhcmNoIHN0cmluZ1xyXG4gICAgICogQHBhcmFtIHtCb29sZWFufHZvaWR9IFtmb3JjZUZldGNoXSBUbyB2b2lkIGNhY2hlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBkZWJvdW5jZWRTZWFyY2g6IEZ1bmN0aW9uID0gZGVib3VuY2UoKGlkOiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcsIGZvcmNlRmV0Y2g/OiBib29sZWFuKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBzb3J0QnksIHNvcnREaXJlY3Rpb24gfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIHRoaXMuYXBpXHJcbiAgICAgICAgICAgIC5nZXRTZWFyY2hBUEkoKVxyXG4gICAgICAgICAgICAuc2VhcmNoKGlkLCBxdWVyeSwgc29ydEJ5LCBzb3J0RGlyZWN0aW9uLCB0aGlzLnNlYXJjaFN1Y2Nlc3NDYWxsYmFjaywgdGhpcy5lcnJvckNhbGxiYWNrLCBmb3JjZUZldGNoKTtcclxuICAgIH0sIERFRkFVTFRfU0VBUkNIX0RFQk9VTkNFKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlYXJjaGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeSBzZWFyY2ggc3RyaW5nXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW58dm9pZH0gW2ZvcmNlRmV0Y2hdIFRvIHZvaWQgY2FjaGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHNlYXJjaCA9IChxdWVyeTogc3RyaW5nLCBmb3JjZUZldGNoOiBib29sZWFuID0gZmFsc2UpOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCB7IHJvb3RGb2xkZXJJZCB9OiBQcm9wcyA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgeyBjdXJyZW50Q29sbGVjdGlvbjogeyBpZCB9IH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBmb2xkZXJJZCA9IHR5cGVvZiBpZCA9PT0gJ3N0cmluZycgPyBpZCA6IHJvb3RGb2xkZXJJZDtcclxuICAgICAgICBjb25zdCB0cmltbWVkUXVlcnk6IHN0cmluZyA9IHF1ZXJ5LnRyaW0oKTtcclxuXHJcbiAgICAgICAgaWYgKCFxdWVyeSkge1xyXG4gICAgICAgICAgICAvLyBRdWVyeSB3YXMgY2xlYXJlZCBvdXQsIGxvYWQgdGhlIHByaW9yIGZvbGRlclxyXG4gICAgICAgICAgICAvLyBUaGUgcHJpb3IgZm9sZGVyIGlzIGFsd2F5cyB0aGUgcGFyZW50IGZvbGRlciBmb3Igc2VhcmNoXHJcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hGb2xkZXIoZm9sZGVySWQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRyaW1tZWRRdWVyeSkge1xyXG4gICAgICAgICAgICAvLyBRdWVyeSBub3cgb25seSBoYXMgYnVuY2ggb2Ygc3BhY2VzXHJcbiAgICAgICAgICAgIC8vIGRvIG5vdGhpbmcgYW5kIGJ1dCB1cGRhdGUgcHJpb3Igc3RhdGVcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hRdWVyeTogcXVlcnlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBzZWFyY2hRdWVyeTogcXVlcnksXHJcbiAgICAgICAgICAgIHZpZXc6IFZJRVdfU0VBUkNILFxyXG4gICAgICAgICAgICBjdXJyZW50Q29sbGVjdGlvbjogdGhpcy5jdXJyZW50VW5sb2FkZWRDb2xsZWN0aW9uKClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5kZWJvdW5jZWRTZWFyY2goZm9sZGVySWQsIHF1ZXJ5LCBmb3JjZUZldGNoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGxvYWRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7RmlsZX0gZmlsZSBkb20gZmlsZSBvYmplY3RcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHVwbG9hZCA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCB7IGN1cnJlbnRDb2xsZWN0aW9uOiB7IGlkLCBwZXJtaXNzaW9ucyB9IH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7IGNhblVwbG9hZCB9OiBQcm9wcyA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKCFpZCB8fCAhcGVybWlzc2lvbnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgeyBjYW5fdXBsb2FkOiBjYW5VcGxvYWRQZXJtaXNzaW9uIH06IEJveEl0ZW1QZXJtaXNzaW9uID0gcGVybWlzc2lvbnM7XHJcbiAgICAgICAgaWYgKCFjYW5VcGxvYWQgfHwgIWNhblVwbG9hZFBlcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRNb2RhbEFwcEVsZW1lbnQoKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNVcGxvYWRNb2RhbE9wZW46IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGxvYWQgc3VjY2VzcyBoYW5kbGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7RmlsZX0gZmlsZSBkb20gZmlsZSBvYmplY3RcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHVwbG9hZFN1Y2Nlc3NIYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgY3VycmVudENvbGxlY3Rpb246IHsgaWQgfSB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgdGhpcy5mZXRjaEZvbGRlcihpZCwgdHJ1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBmb2xkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgY3JlYXRlRm9sZGVyID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlRm9sZGVyQ2FsbGJhY2soKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOZXcgZm9sZGVyIGNhbGxiYWNrXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gZm9sZGVyIG5hbWVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUZvbGRlckNhbGxiYWNrID0gKG5hbWU/OiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCB7IGlzQ3JlYXRlRm9sZGVyTW9kYWxPcGVuLCBjdXJyZW50Q29sbGVjdGlvbiB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgeyBjYW5VcGxvYWQgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmICghY2FuVXBsb2FkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHsgaWQsIHBlcm1pc3Npb25zIH06IENvbGxlY3Rpb24gPSBjdXJyZW50Q29sbGVjdGlvbjtcclxuICAgICAgICBpZiAoIWlkIHx8ICFwZXJtaXNzaW9ucykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IGNhbl91cGxvYWQgfTogQm94SXRlbVBlcm1pc3Npb24gPSBwZXJtaXNzaW9ucztcclxuICAgICAgICBpZiAoIWNhbl91cGxvYWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpc0NyZWF0ZUZvbGRlck1vZGFsT3BlbiB8fCAhbmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vZGFsQXBwRWxlbWVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNDcmVhdGVGb2xkZXJNb2RhbE9wZW46IHRydWUsIGVycm9yQ29kZTogJycgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghbmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3JDb2RlOiBFUlJPUl9DT0RFX0lURU1fTkFNRV9JTlZBTElELCBpc0xvYWRpbmc6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobmFtZS5sZW5ndGggPiAyNTUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yQ29kZTogRVJST1JfQ09ERV9JVEVNX05BTUVfVE9PX0xPTkcsIGlzTG9hZGluZzogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0xvYWRpbmc6IHRydWUgfSk7XHJcbiAgICAgICAgdGhpcy5hcGkuZ2V0Rm9sZGVyQVBJKCkuY3JlYXRlKFxyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaEZvbGRlcihpZCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICh7IHJlc3BvbnNlOiB7IHN0YXR1cyB9IH0pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yQ29kZTogc3RhdHVzID09PSA0MDkgPyBFUlJPUl9DT0RFX0lURU1fTkFNRV9JTl9VU0UgOiBFUlJPUl9DT0RFX0lURU1fTkFNRV9JTlZBTElELFxyXG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3RzIG9yIHVuc2VsZWN0cyBhbiBpdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGZpbGUgb3IgZm9sZGVyIG9iamVjdFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgc2VsZWN0ID0gKGl0ZW06IEJveEl0ZW0pOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCB7IHR5cGU6IHNlbGVjdGFibGVUeXBlLCBtYXhTZWxlY3RhYmxlIH06IFByb3BzID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7IHZpZXcsIHNlbGVjdGVkLCBjdXJyZW50Q29sbGVjdGlvbjogeyBpdGVtcyA9IFtdIH0gfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHsgaWQsIHR5cGUgfTogQm94SXRlbSA9IGl0ZW07XHJcblxyXG4gICAgICAgIGlmICghaWQgfHwgIXR5cGUgfHwgc2VsZWN0YWJsZVR5cGUuaW5kZXhPZih0eXBlKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRDb3VudDogbnVtYmVyID0gT2JqZWN0LmtleXMoc2VsZWN0ZWQpLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBoYXNIaXRTZWxlY3Rpb25MaW1pdDogYm9vbGVhbiA9IHNlbGVjdGVkQ291bnQgPT09IG1heFNlbGVjdGFibGU7XHJcbiAgICAgICAgY29uc3QgaXNTaW5nbGVGaWxlU2VsZWN0aW9uOiBib29sZWFuID0gbWF4U2VsZWN0YWJsZSA9PT0gMTtcclxuICAgICAgICBjb25zdCB0eXBlZElkOiBzdHJpbmcgPSBgJHt0eXBlfV8ke2lkfWA7XHJcbiAgICAgICAgY29uc3QgZXhpc3Rpbmc6IEJveEl0ZW0gPSBzZWxlY3RlZFt0eXBlZElkXTtcclxuXHJcbiAgICAgICAgaWYgKGV4aXN0aW5nKSB7XHJcbiAgICAgICAgICAgIC8vIFdlIGFyZSBzZWxlY3RpbmcgdGhlIHNhbWUgaXRlbSB0aGF0IHdhcyBhbHJlYWR5XHJcbiAgICAgICAgICAgIC8vIHNlbGVjdGVkLiBVbnNlbGVjdCBpdCBpbiB0aGlzIGNhc2UuIFRvZ2dsZSBjYXNlLlxyXG4gICAgICAgICAgICBleGlzdGluZy5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBkZWxldGUgc2VsZWN0ZWRbdHlwZWRJZF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gV2UgYXJlIHNlbGVjdGluZyBhIG5ldyBpdGVtIHRoYXQgd2FzIG5ldmVyXHJcbiAgICAgICAgICAgIC8vIHNlbGVjdGVkIGJlZm9yZS4gSG93ZXZlciBpZiB3ZSBhcmUgaW4gYSBzaW5nbGVcclxuICAgICAgICAgICAgLy8gaXRlbSBzZWxlY3Rpb24gbW9kZSwgd2Ugc2hvdWxkIGFsc28gdW5zZWxlY3QgYW55XHJcbiAgICAgICAgICAgIC8vIHByaW9yIGl0ZW0gdGhhdCB3YXMgaXRlbSB0aGF0IHdhcyBzZWxlY3RlZC5cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHdlIGhpdCB0aGUgc2VsZWN0aW9uIGxpbWl0XHJcbiAgICAgICAgICAgIC8vIElnbm9yZSB3aGVuIGluIHNpbmdsZSBmaWxlIHNlbGVjdGlvbiBtb2RlLlxyXG4gICAgICAgICAgICBpZiAoaGFzSGl0U2VsZWN0aW9uTGltaXQgJiYgIWlzU2luZ2xlRmlsZVNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBrZXlzOiBBcnJheTxzdHJpbmc+ID0gT2JqZWN0LmtleXMoc2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICBpZiAoa2V5cy5sZW5ndGggPiAwICYmIGlzU2luZ2xlRmlsZVNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5OiBzdHJpbmcgPSBrZXlzWzBdOyAvLyBPbmx5IDEgaW4gdGhlIG1hcFxyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJpb3I6IEJveEl0ZW0gPSBzZWxlY3RlZFtrZXldO1xyXG4gICAgICAgICAgICAgICAgcHJpb3Iuc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBzZWxlY3RlZFtrZXldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTZWxlY3QgdGhlIG5ldyBpdGVtXHJcbiAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZWxlY3RlZFt0eXBlZElkXSA9IGl0ZW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBmb2N1c2VkUm93ID0gaXRlbXMuZmluZEluZGV4KChpOiBCb3hJdGVtKSA9PiBpLmlkID09PSBpdGVtLmlkKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWQsIGZvY3VzZWRSb3cgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodmlldyA9PT0gVklFV19TRUxFQ1RFRCkge1xyXG4gICAgICAgICAgICAgICAgLy8gTmVlZCB0byByZWZyZXNoIHRoZSBzZWxlY3RlZCB2aWV3XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWxlY3RlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlcyB0aGUgc2hhcmUgYWNjZXNzIG9mIGFuIGl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFjY2VzcyBzaGFyZSBhY2Nlc3NcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGZpbGUgb3IgZm9sZGVyIG9iamVjdFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgY2hhbmdlU2hhcmVBY2Nlc3MgPSAoYWNjZXNzOiBBY2Nlc3MsIGl0ZW06IEJveEl0ZW0pOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCB7IGNhblNldFNoYXJlQWNjZXNzIH06IFByb3BzID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAoIWl0ZW0gfHwgIWNhblNldFNoYXJlQWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHsgcGVybWlzc2lvbnMsIHR5cGUgfTogQm94SXRlbSA9IGl0ZW07XHJcbiAgICAgICAgaWYgKCFwZXJtaXNzaW9ucyB8fCAhdHlwZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IGNhbl9zZXRfc2hhcmVfYWNjZXNzIH06IEJveEl0ZW1QZXJtaXNzaW9uID0gcGVybWlzc2lvbnM7XHJcbiAgICAgICAgaWYgKCFjYW5fc2V0X3NoYXJlX2FjY2Vzcykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFwaS5nZXRBUEkodHlwZSkuc2hhcmUoaXRlbSwgYWNjZXNzLCB0aGlzLnJlZnJlc2hHcmlkKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFnZXMgdGhlIHNvcnQgYnkgYW5kIHNvcnQgZGlyZWN0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3J0QnkgLSBmaWVsZCB0byBzb3J0eSBieVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNvcnREaXJlY3Rpb24gLSBzb3J0IGRpcmVjdGlvblxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgc29ydCA9IChzb3J0Qnk6IFNvcnRCeSwgc29ydERpcmVjdGlvbjogU29ydERpcmVjdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgY3VycmVudENvbGxlY3Rpb246IHsgaWQgfSwgdmlldywgc2VhcmNoUXVlcnkgfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGlmICghaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNvcnRCeSwgc29ydERpcmVjdGlvbiB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2aWV3ID09PSBWSUVXX0ZPTERFUikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaEZvbGRlcihpZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmlldyA9PT0gVklFV19TRUFSQ0gpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoKHNlYXJjaFF1ZXJ5KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh2aWV3ID09PSBWSUVXX1JFQ0VOVFMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JlY2VudHMoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHNvcnQgaW5jb21wYXRpYmxlIHZpZXchJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTYXZlcyByZWZlcmVuY2UgdG8gdGFibGUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSByZWFjdCBjb21wb25lbnRcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHRhYmxlUmVmID0gKHRhYmxlOiBSZWFjdCRDb21wb25lbnQ8KiwgKiwgKj4pID0+IHtcclxuICAgICAgICB0aGlzLnRhYmxlID0gdGFibGU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvc2VzIHRoZSBtb2RhbCBkaWFsb2dzIHRoYXQgbWF5IGJlIG9wZW5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgY2xvc2VNb2RhbHMgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBmb2N1c2VkUm93IH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzQ3JlYXRlRm9sZGVyTW9kYWxPcGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNVcGxvYWRNb2RhbE9wZW46IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgc2VsZWN0ZWQsIGN1cnJlbnRDb2xsZWN0aW9uOiB7IGl0ZW1zID0gW10gfSB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9jdXModGhpcy5yb290RWxlbWVudCwgYC5iY3AtaXRlbS1yb3ctJHtmb2N1c2VkUm93fWApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBLZXlib2FyZCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIG9uS2V5RG93biA9IChldmVudDogU3ludGhldGljS2V5Ym9hcmRFdmVudCAmIHsgdGFyZ2V0OiBIVE1MRWxlbWVudCB9KSA9PiB7XHJcbiAgICAgICAgaWYgKGlzSW5wdXRFbGVtZW50KGV2ZW50LnRhcmdldCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgeyByb290Rm9sZGVySWQgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICBjYXNlICcvJzpcclxuICAgICAgICAgICAgICAgIGZvY3VzKHRoaXMucm9vdEVsZW1lbnQsICcuYnVpay1zZWFyY2ggaW5wdXRbdHlwZT1cInNlYXJjaFwiXScsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYXJyb3dkb3duJzpcclxuICAgICAgICAgICAgICAgIGZvY3VzKHRoaXMucm9vdEVsZW1lbnQsICcuYmNwLWl0ZW0tcm93JywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWRSb3c6IDAgfSk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2cnOlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2InOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFsTW9kaWZpZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb2N1cyh0aGlzLnJvb3RFbGVtZW50LCAnLmJ1aWstYnJlYWRjcnVtYiBidXR0b24nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdmJzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbE1vZGlmaWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZXRjaEZvbGRlcihyb290Rm9sZGVySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYyc6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxNb2RpZmllcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd4JzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbE1vZGlmaWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3MnOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFsTW9kaWZpZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWxlY3RlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndSc6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxNb2RpZmllcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdyJzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbE1vZGlmaWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UmVjZW50cyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ24nOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFsTW9kaWZpZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUZvbGRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsTW9kaWZpZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2xvYmFsTW9kaWZpZXIgPSBrZXkgPT09ICdnJztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBmb2N1c2VkIHJvdyBiYXNlZCBvbiBrZXkgYmluZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmb2N1c2VkUm93IC0gdGhlIHJvdyBpbmRleCB0aGF0cyBmb2N1c2VkXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBvbkZvY3VzQ2hhbmdlID0gKGZvY3VzZWRSb3c6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkUm93IH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgdGhlIGZpbGUgcGlja2VyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiBAcmV0dXJuIHtFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICByb290Rm9sZGVySWQsXHJcbiAgICAgICAgICAgIGxvZ29VcmwsXHJcbiAgICAgICAgICAgIGNhblVwbG9hZCxcclxuICAgICAgICAgICAgY2FuU2V0U2hhcmVBY2Nlc3MsXHJcbiAgICAgICAgICAgIGV4dGVuc2lvbnMsXHJcbiAgICAgICAgICAgIG1heFNlbGVjdGFibGUsXHJcbiAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgIGdldExvY2FsaXplZE1lc3NhZ2UsXHJcbiAgICAgICAgICAgIHRva2VuLFxyXG4gICAgICAgICAgICBzaGFyZWRMaW5rLFxyXG4gICAgICAgICAgICBzaGFyZWRMaW5rUGFzc3dvcmQsXHJcbiAgICAgICAgICAgIGFwaUhvc3QsXHJcbiAgICAgICAgICAgIHVwbG9hZEhvc3QsXHJcbiAgICAgICAgICAgIGlzU21hbGwsXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZSxcclxuICAgICAgICAgICAgbWVhc3VyZVJlZixcclxuICAgICAgICAgICAgY2hvb3NlQnV0dG9uTGFiZWwsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkxhYmVsXHJcbiAgICAgICAgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgdmlldyxcclxuICAgICAgICAgICAgcm9vdE5hbWUsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkLFxyXG4gICAgICAgICAgICBjdXJyZW50Q29sbGVjdGlvbixcclxuICAgICAgICAgICAgc2VhcmNoUXVlcnksXHJcbiAgICAgICAgICAgIGlzQ3JlYXRlRm9sZGVyTW9kYWxPcGVuLFxyXG4gICAgICAgICAgICBpc1VwbG9hZE1vZGFsT3BlbixcclxuICAgICAgICAgICAgaXNMb2FkaW5nLFxyXG4gICAgICAgICAgICBlcnJvckNvZGUsXHJcbiAgICAgICAgICAgIGZvY3VzZWRSb3dcclxuICAgICAgICB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgeyBpZCwgcGVybWlzc2lvbnMgfTogQ29sbGVjdGlvbiA9IGN1cnJlbnRDb2xsZWN0aW9uO1xyXG4gICAgICAgIGNvbnN0IHsgY2FuX3VwbG9hZCB9OiBCb3hJdGVtUGVybWlzc2lvbiA9IHBlcm1pc3Npb25zIHx8IHt9O1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQ291bnQ6IG51bWJlciA9IE9iamVjdC5rZXlzKHNlbGVjdGVkKS5sZW5ndGg7XHJcbiAgICAgICAgY29uc3QgaGFzSGl0U2VsZWN0aW9uTGltaXQ6IGJvb2xlYW4gPSBzZWxlY3RlZENvdW50ID09PSBtYXhTZWxlY3RhYmxlICYmIG1heFNlbGVjdGFibGUgIT09IDE7XHJcbiAgICAgICAgY29uc3QgYWxsb3dVcGxvYWQgPSBjYW5VcGxvYWQgJiYgY2FuX3VwbG9hZDtcclxuICAgICAgICBjb25zdCBzdHlsZUNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoJ2J1aWsgYmNwJywgY2xhc3NOYW1lKTtcclxuXHJcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXHJcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtdGFiaW5kZXggKi9cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGlkPXt0aGlzLmlkfSBjbGFzc05hbWU9e3N0eWxlQ2xhc3NOYW1lfSByZWY9e21lYXN1cmVSZWZ9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2J1aWstYXBwLWVsZW1lbnQnIG9uS2V5RG93bj17dGhpcy5vbktleURvd259IHRhYkluZGV4PXswfT5cclxuICAgICAgICAgICAgICAgICAgICA8SGVhZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc9e3ZpZXd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU21hbGw9e2lzU21hbGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFF1ZXJ5PXtzZWFyY2hRdWVyeX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nb1VybD17bG9nb1VybH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25TZWFyY2g9e3RoaXMuc2VhcmNofVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlPXtnZXRMb2NhbGl6ZWRNZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPFN1YkhlYWRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3PXt2aWV3fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb290SWQ9e3Jvb3RGb2xkZXJJZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTbWFsbD17aXNTbWFsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9vdE5hbWU9e3Jvb3ROYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29sbGVjdGlvbj17Y3VycmVudENvbGxlY3Rpb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhblVwbG9hZD17YWxsb3dVcGxvYWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBsb2FkPXt0aGlzLnVwbG9hZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DcmVhdGU9e3RoaXMuY3JlYXRlRm9sZGVyfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkl0ZW1DbGljaz17dGhpcy5mZXRjaEZvbGRlcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Tb3J0Q2hhbmdlPXt0aGlzLnNvcnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldExvY2FsaXplZE1lc3NhZ2U9e2dldExvY2FsaXplZE1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8Q29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3PXt2aWV3fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NtYWxsPXtpc1NtYWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb290SWQ9e3Jvb3RGb2xkZXJJZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9vdEVsZW1lbnQ9e3RoaXMucm9vdEVsZW1lbnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzZWRSb3c9e2ZvY3VzZWRSb3d9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGVUeXBlPXt0eXBlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5TZXRTaGFyZUFjY2Vzcz17Y2FuU2V0U2hhcmVBY2Nlc3N9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbnNXaGl0ZWxpc3Q9e2V4dGVuc2lvbnN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0hpdFNlbGVjdGlvbkxpbWl0PXtoYXNIaXRTZWxlY3Rpb25MaW1pdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbGxlY3Rpb249e2N1cnJlbnRDb2xsZWN0aW9ufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZVJlZj17dGhpcy50YWJsZVJlZn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25JdGVtU2VsZWN0PXt0aGlzLnNlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25JdGVtQ2xpY2s9e3RoaXMub25JdGVtQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXNDaGFuZ2U9e3RoaXMub25Gb2N1c0NoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25TaGFyZUFjY2Vzc0NoYW5nZT17dGhpcy5jaGFuZ2VTaGFyZUFjY2Vzc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TG9jYWxpemVkTWVzc2FnZT17Z2V0TG9jYWxpemVkTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb290ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDb3VudD17c2VsZWN0ZWRDb3VudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzSGl0U2VsZWN0aW9uTGltaXQ9e2hhc0hpdFNlbGVjdGlvbkxpbWl0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGVkQ2xpY2s9e3RoaXMuc2hvd1NlbGVjdGVkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNob29zZT17dGhpcy5jaG9vc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2FuY2VsPXt0aGlzLmNhbmNlbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TG9jYWxpemVkTWVzc2FnZT17Z2V0TG9jYWxpemVkTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hvb3NlQnV0dG9uTGFiZWw9e2Nob29zZUJ1dHRvbkxhYmVsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25MYWJlbD17Y2FuY2VsQnV0dG9uTGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAge2NhblVwbG9hZCAmJiAhIXRoaXMuYXBwRWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgID8gPFVwbG9hZERpYWxvZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc09wZW49e2lzVXBsb2FkTW9kYWxPcGVufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb290Rm9sZGVySWQ9e2lkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbj17dG9rZW59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYXJlZExpbms9e3NoYXJlZExpbmt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYXJlZExpbmtQYXNzd29yZD17c2hhcmVkTGlua1Bhc3N3b3JkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcGlIb3N0PXthcGlIb3N0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRIb3N0PXt1cGxvYWRIb3N0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLnVwbG9hZFN1Y2Nlc3NIYW5kbGVyfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlPXtnZXRMb2NhbGl6ZWRNZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50PXt0aGlzLnJvb3RFbGVtZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICB7Y2FuVXBsb2FkICYmICEhdGhpcy5hcHBFbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgPyA8Q3JlYXRlRm9sZGVyRGlhbG9nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3Blbj17aXNDcmVhdGVGb2xkZXJNb2RhbE9wZW59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ3JlYXRlPXt0aGlzLmNyZWF0ZUZvbGRlckNhbGxiYWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbD17dGhpcy5jbG9zZU1vZGFsc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TG9jYWxpemVkTWVzc2FnZT17Z2V0TG9jYWxpemVkTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nPXtpc0xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yQ29kZT17ZXJyb3JDb2RlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50PXt0aGlzLnJvb3RFbGVtZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA6IG51bGx9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cclxuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIGpzeC1hMTF5L25vLW5vbmludGVyYWN0aXZlLXRhYmluZGV4ICovXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1ha2VSZXNwb25zaXZlKENvbnRlbnRQaWNrZXIpO1xyXG4iXX0=