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