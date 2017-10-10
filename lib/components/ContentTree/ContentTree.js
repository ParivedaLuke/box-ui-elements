var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Content Tree Component
 * @author Box
 */

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import uniqueid from 'lodash.uniqueid';
import noop from 'lodash.noop';
import Content from './Content';
import API from '../../api';
import makeResponsive from '../makeResponsive';
import { isFocusableElement } from '../../util/dom';
import { DEFAULT_HOSTNAME_API, DEFAULT_ROOT, VIEW_FOLDER, VIEW_ERROR, TYPE_FOLDER, TYPE_FILE, TYPE_WEBLINK, CLIENT_NAME_CONTENT_TREE, SORT_NAME, SORT_ASC, TYPED_ID_FOLDER_PREFIX } from '../../constants';

var ContentTree = function (_Component) {
    _inherits(ContentTree, _Component);

    /**
     * [constructor]
     *
     * @private
     * @return {ContentPicker}
     */
    function ContentTree(props) {
        _classCallCheck(this, ContentTree);

        var _this = _possibleConstructorReturn(this, (ContentTree.__proto__ || Object.getPrototypeOf(ContentTree)).call(this, props));

        _initialiseProps.call(_this);

        var rootFolderId = props.rootFolderId,
            token = props.token,
            sharedLink = props.sharedLink,
            sharedLinkPassword = props.sharedLinkPassword,
            apiHost = props.apiHost,
            clientName = props.clientName,
            responseFilter = props.responseFilter;


        _this.api = new API({
            token: token,
            sharedLink: sharedLink,
            sharedLinkPassword: sharedLinkPassword,
            apiHost: apiHost,
            clientName: clientName,
            responseFilter: responseFilter,
            id: '' + TYPED_ID_FOLDER_PREFIX + rootFolderId
        });

        _this.id = uniqueid('bct_');

        _this.state = {
            currentCollection: {},
            view: VIEW_FOLDER
        };
        return _this;
    }

    /**
     * Destroys api instances
     *
     * @private
     * @return {void}
     */


    _createClass(ContentTree, [{
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
            this.fetchFolder();
        }

        /**
         * Calls the passed on onClick funcsion
         *
         * @private
         * @param {Object} item - clicked item
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
         * Network error callback
         *
         * @private
         * @param {Error} error error object
         * @return {void}
         */


        /**
         * Action performed when clicking on an item expand button
         *
         * @private
         * @param {Object} item - the clicked box item
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

            // Don't focus the grid until its loaded and user is not already on an interactable element

            if (!autoFocus || percentLoaded !== 100 || !this.table || !this.table.Grid || isFocusableElement(document.activeElement)) {
                return;
            }
            var grid = findDOMNode(this.table.Grid);
            grid.focus();
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
         * Saves reference to table component
         *
         * @private
         * @param {Component} react component
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
                type = _props.type,
                getLocalizedMessage = _props.getLocalizedMessage,
                isSmall = _props.isSmall,
                className = _props.className,
                measureRef = _props.measureRef;
            var _state = this.state,
                view = _state.view,
                currentCollection = _state.currentCollection;

            var styleClassName = classNames('buik bct buik-app-element', className);

            return React.createElement(
                'div',
                { id: this.id, className: styleClassName, ref: measureRef },
                React.createElement(Content, {
                    view: view,
                    isSmall: isSmall,
                    rootId: rootFolderId,
                    selectableType: type,
                    currentCollection: currentCollection,
                    tableRef: this.tableRef,
                    onItemClick: this.onItemClick,
                    onExpanderClick: this.onExpanderClick,
                    getLocalizedMessage: getLocalizedMessage
                })
            );
        }
    }]);

    return ContentTree;
}(Component);

ContentTree.defaultProps = {
    type: TYPE_FILE + ',' + TYPE_WEBLINK + ',' + TYPE_FOLDER,
    rootFolderId: DEFAULT_ROOT,
    onClick: noop,
    className: '',
    autoFocus: false,
    apiHost: DEFAULT_HOSTNAME_API,
    clientName: CLIENT_NAME_CONTENT_TREE
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.onItemClick = function (item) {
        var onClick = _this2.props.onClick;

        delete item.selected;
        onClick(item);
    };

    this.errorCallback = function (error) {
        _this2.setState({
            view: VIEW_ERROR
        });
        /* eslint-disable no-console */
        console.error(error);
        /* eslint-enable no-console */
    };

    this.onExpanderClick = function (folder) {
        var currentCollection = _this2.state.currentCollection;
        var id = folder.id,
            path_collection = folder.path_collection,
            _folder$selected = folder.selected,
            selected = _folder$selected === undefined ? false : _folder$selected;


        if (!path_collection || !currentCollection.items) {
            throw new Error('Bad state!');
        }

        if (selected) {
            folder.selected = false;
            var length = path_collection.total_count;
            var newItems = currentCollection.items.filter(function (item) {
                if (item.path_collection && item.path_collection.total_count > length) {
                    return item.path_collection.entries[length].id !== id;
                }
                return true;
            });
            currentCollection.items = newItems;
            _this2.setState({ currentCollection: currentCollection });
        } else {
            _this2.fetchFolder(id);
        }
    };

    this.fetchFolderSuccessCallback = function (collection) {
        var _collection$items = collection.items,
            newItems = _collection$items === undefined ? [] : _collection$items,
            percentLoaded = collection.percentLoaded;
        var type = _this2.props.type;


        var filteredItems = newItems.filter(function (item) {
            if (item.type) {
                return type.indexOf(item.type) > -1;
            }
            return false;
        });
        var currentCollection = _this2.state.currentCollection;
        var _currentCollection = currentCollection,
            items = _currentCollection.items;


        if (items) {
            var parentIndex = items.findIndex(function (item) {
                return item.type === TYPE_FOLDER && item.id === collection.id;
            });
            items[parentIndex].selected = true;
            items.splice.apply(items, [parentIndex + 1, 0].concat(_toConsumableArray(filteredItems)));
            currentCollection.percentLoaded = percentLoaded;
        } else {
            currentCollection = collection;
            currentCollection.items = filteredItems;
        }

        // Set the new state and focus the grid for tabbing
        _this2.setState({ currentCollection: currentCollection }, _this2.finishNavigation);
    };

    this.fetchFolder = function (id) {
        var forceFetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var rootFolderId = _this2.props.rootFolderId;

        var folderId = typeof id === 'string' ? id : rootFolderId;

        // Reset the view and show busy indicator
        _this2.setState({
            view: VIEW_FOLDER,
            currentCollection: _this2.currentUnloadedCollection()
        });

        // Fetch the folder using folder API
        _this2.api.getFolderAPI().folder(folderId, SORT_NAME, SORT_ASC, _this2.fetchFolderSuccessCallback, _this2.errorCallback, forceFetch);
    };

    this.tableRef = function (table) {
        _this2.table = table;
    };
};

export default makeResponsive(ContentTree);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRlbnRUcmVlLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiZmluZERPTU5vZGUiLCJjbGFzc05hbWVzIiwidW5pcXVlaWQiLCJub29wIiwiQ29udGVudCIsIkFQSSIsIm1ha2VSZXNwb25zaXZlIiwiaXNGb2N1c2FibGVFbGVtZW50IiwiREVGQVVMVF9IT1NUTkFNRV9BUEkiLCJERUZBVUxUX1JPT1QiLCJWSUVXX0ZPTERFUiIsIlZJRVdfRVJST1IiLCJUWVBFX0ZPTERFUiIsIlRZUEVfRklMRSIsIlRZUEVfV0VCTElOSyIsIkNMSUVOVF9OQU1FX0NPTlRFTlRfVFJFRSIsIlNPUlRfTkFNRSIsIlNPUlRfQVNDIiwiVFlQRURfSURfRk9MREVSX1BSRUZJWCIsIkNvbnRlbnRUcmVlIiwicHJvcHMiLCJyb290Rm9sZGVySWQiLCJ0b2tlbiIsInNoYXJlZExpbmsiLCJzaGFyZWRMaW5rUGFzc3dvcmQiLCJhcGlIb3N0IiwiY2xpZW50TmFtZSIsInJlc3BvbnNlRmlsdGVyIiwiYXBpIiwiaWQiLCJzdGF0ZSIsImN1cnJlbnRDb2xsZWN0aW9uIiwidmlldyIsImRlc3Ryb3kiLCJjbGVhckNhY2hlIiwiZmV0Y2hGb2xkZXIiLCJPYmplY3QiLCJhc3NpZ24iLCJwZXJjZW50TG9hZGVkIiwiYXV0b0ZvY3VzIiwidGFibGUiLCJHcmlkIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiZ3JpZCIsImZvY3VzIiwidHlwZSIsImdldExvY2FsaXplZE1lc3NhZ2UiLCJpc1NtYWxsIiwiY2xhc3NOYW1lIiwibWVhc3VyZVJlZiIsInN0eWxlQ2xhc3NOYW1lIiwidGFibGVSZWYiLCJvbkl0ZW1DbGljayIsIm9uRXhwYW5kZXJDbGljayIsImRlZmF1bHRQcm9wcyIsIm9uQ2xpY2siLCJpdGVtIiwic2VsZWN0ZWQiLCJlcnJvckNhbGxiYWNrIiwiZXJyb3IiLCJzZXRTdGF0ZSIsImNvbnNvbGUiLCJmb2xkZXIiLCJwYXRoX2NvbGxlY3Rpb24iLCJpdGVtcyIsIkVycm9yIiwibGVuZ3RoIiwidG90YWxfY291bnQiLCJuZXdJdGVtcyIsImZpbHRlciIsImVudHJpZXMiLCJmZXRjaEZvbGRlclN1Y2Nlc3NDYWxsYmFjayIsImNvbGxlY3Rpb24iLCJmaWx0ZXJlZEl0ZW1zIiwiaW5kZXhPZiIsInBhcmVudEluZGV4IiwiZmluZEluZGV4Iiwic3BsaWNlIiwiZmluaXNoTmF2aWdhdGlvbiIsImZvcmNlRmV0Y2giLCJmb2xkZXJJZCIsImN1cnJlbnRVbmxvYWRlZENvbGxlY3Rpb24iLCJnZXRGb2xkZXJBUEkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxJQUFnQkMsU0FBaEIsUUFBaUMsT0FBakM7QUFDQSxTQUFTQyxXQUFULFFBQTRCLFdBQTVCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixZQUF2QjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsaUJBQXJCO0FBQ0EsT0FBT0MsSUFBUCxNQUFpQixhQUFqQjtBQUNBLE9BQU9DLE9BQVAsTUFBb0IsV0FBcEI7QUFDQSxPQUFPQyxHQUFQLE1BQWdCLFdBQWhCO0FBQ0EsT0FBT0MsY0FBUCxNQUEyQixtQkFBM0I7QUFDQSxTQUFTQyxrQkFBVCxRQUFtQyxnQkFBbkM7QUFDQSxTQUNJQyxvQkFESixFQUVJQyxZQUZKLEVBR0lDLFdBSEosRUFJSUMsVUFKSixFQUtJQyxXQUxKLEVBTUlDLFNBTkosRUFPSUMsWUFQSixFQVFJQyx3QkFSSixFQVNJQyxTQVRKLEVBVUlDLFFBVkosRUFXSUMsc0JBWEosUUFZTyxpQkFaUDs7SUFtRE1DLFc7OztBQWlCRjs7Ozs7O0FBTUEseUJBQVlDLEtBQVosRUFBMEI7QUFBQTs7QUFBQSw4SEFDaEJBLEtBRGdCOztBQUFBOztBQUFBLFlBR2RDLFlBSGMsR0FHK0VELEtBSC9FLENBR2RDLFlBSGM7QUFBQSxZQUdBQyxLQUhBLEdBRytFRixLQUgvRSxDQUdBRSxLQUhBO0FBQUEsWUFHT0MsVUFIUCxHQUcrRUgsS0FIL0UsQ0FHT0csVUFIUDtBQUFBLFlBR21CQyxrQkFIbkIsR0FHK0VKLEtBSC9FLENBR21CSSxrQkFIbkI7QUFBQSxZQUd1Q0MsT0FIdkMsR0FHK0VMLEtBSC9FLENBR3VDSyxPQUh2QztBQUFBLFlBR2dEQyxVQUhoRCxHQUcrRU4sS0FIL0UsQ0FHZ0RNLFVBSGhEO0FBQUEsWUFHNERDLGNBSDVELEdBRytFUCxLQUgvRSxDQUc0RE8sY0FINUQ7OztBQUt0QixjQUFLQyxHQUFMLEdBQVcsSUFBSXZCLEdBQUosQ0FBUTtBQUNmaUIsd0JBRGU7QUFFZkMsa0NBRmU7QUFHZkMsa0RBSGU7QUFJZkMsNEJBSmU7QUFLZkMsa0NBTGU7QUFNZkMsMENBTmU7QUFPZkUscUJBQU9YLHNCQUFQLEdBQWdDRztBQVBqQixTQUFSLENBQVg7O0FBVUEsY0FBS1EsRUFBTCxHQUFVM0IsU0FBUyxNQUFULENBQVY7O0FBRUEsY0FBSzRCLEtBQUwsR0FBYTtBQUNUQywrQkFBbUIsRUFEVjtBQUVUQyxrQkFBTXRCO0FBRkcsU0FBYjtBQWpCc0I7QUFxQnpCOztBQUVEOzs7Ozs7Ozs7O3FDQU1tQjtBQUNmLGlCQUFLa0IsR0FBTCxDQUFTSyxPQUFULENBQWlCLElBQWpCO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7K0NBT3VCO0FBQ25CLGlCQUFLQyxVQUFMO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7NENBT29CO0FBQ2hCLGlCQUFLQyxXQUFMO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7OztBQWFBOzs7Ozs7OztvREFRd0M7QUFBQSxnQkFDNUJKLGlCQUQ0QixHQUNDLEtBQUtELEtBRE4sQ0FDNUJDLGlCQUQ0Qjs7QUFFcEMsbUJBQU9LLE9BQU9DLE1BQVAsQ0FBY04saUJBQWQsRUFBaUM7QUFDcENPLCtCQUFlO0FBRHFCLGFBQWpDLENBQVA7QUFHSDs7QUFFRDs7Ozs7Ozs7O0FBZ0JBOzs7Ozs7Ozs7Ozs7QUErQkE7Ozs7OzsyQ0FNbUI7QUFBQSxnQkFDUEMsU0FETyxHQUNjLEtBQUtuQixLQURuQixDQUNQbUIsU0FETztBQUFBLGdCQUVjRCxhQUZkLEdBRXlDLEtBQUtSLEtBRjlDLENBRVBDLGlCQUZPLENBRWNPLGFBRmQ7O0FBSWY7O0FBQ0EsZ0JBQ0ksQ0FBQ0MsU0FBRCxJQUNBRCxrQkFBa0IsR0FEbEIsSUFFQSxDQUFDLEtBQUtFLEtBRk4sSUFHQSxDQUFDLEtBQUtBLEtBQUwsQ0FBV0MsSUFIWixJQUlBbEMsbUJBQW1CbUMsU0FBU0MsYUFBNUIsQ0FMSixFQU1FO0FBQ0U7QUFDSDtBQUNELGdCQUFNQyxPQUFZNUMsWUFBWSxLQUFLd0MsS0FBTCxDQUFXQyxJQUF2QixDQUFsQjtBQUNBRyxpQkFBS0MsS0FBTDtBQUNIOztBQUVEOzs7Ozs7Ozs7QUFrQ0E7Ozs7Ozs7Ozs7QUF3QkE7Ozs7Ozs7Ozs7OztBQVdBOzs7Ozs7O2lDQU9TO0FBQUEseUJBQ3NGLEtBQUt6QixLQUQzRjtBQUFBLGdCQUNHQyxZQURILFVBQ0dBLFlBREg7QUFBQSxnQkFDaUJ5QixJQURqQixVQUNpQkEsSUFEakI7QUFBQSxnQkFDdUJDLG1CQUR2QixVQUN1QkEsbUJBRHZCO0FBQUEsZ0JBQzRDQyxPQUQ1QyxVQUM0Q0EsT0FENUM7QUFBQSxnQkFDcURDLFNBRHJELFVBQ3FEQSxTQURyRDtBQUFBLGdCQUNnRUMsVUFEaEUsVUFDZ0VBLFVBRGhFO0FBQUEseUJBRXNDLEtBQUtwQixLQUYzQztBQUFBLGdCQUVHRSxJQUZILFVBRUdBLElBRkg7QUFBQSxnQkFFU0QsaUJBRlQsVUFFU0EsaUJBRlQ7O0FBR0wsZ0JBQU1vQixpQkFBaUJsRCxXQUFXLDJCQUFYLEVBQXdDZ0QsU0FBeEMsQ0FBdkI7O0FBRUEsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLElBQUksS0FBS3BCLEVBQWQsRUFBa0IsV0FBV3NCLGNBQTdCLEVBQTZDLEtBQUtELFVBQWxEO0FBQ0ksb0NBQUMsT0FBRDtBQUNJLDBCQUFNbEIsSUFEVjtBQUVJLDZCQUFTZ0IsT0FGYjtBQUdJLDRCQUFRM0IsWUFIWjtBQUlJLG9DQUFnQnlCLElBSnBCO0FBS0ksdUNBQW1CZixpQkFMdkI7QUFNSSw4QkFBVSxLQUFLcUIsUUFObkI7QUFPSSxpQ0FBYSxLQUFLQyxXQVB0QjtBQVFJLHFDQUFpQixLQUFLQyxlQVIxQjtBQVNJLHlDQUFxQlA7QUFUekI7QUFESixhQURKO0FBZUg7Ozs7RUFqUnFCaEQsUzs7QUFBcEJvQixXLENBT0tvQyxZLEdBQTZCO0FBQ2hDVCxVQUFTakMsU0FBVCxTQUFzQkMsWUFBdEIsU0FBc0NGLFdBRE47QUFFaENTLGtCQUFjWixZQUZrQjtBQUdoQytDLGFBQVNyRCxJQUh1QjtBQUloQzhDLGVBQVcsRUFKcUI7QUFLaENWLGVBQVcsS0FMcUI7QUFNaENkLGFBQVNqQixvQkFOdUI7QUFPaENrQixnQkFBWVg7QUFQb0IsQzs7Ozs7U0E4RXBDc0MsVyxHQUFjLFVBQUNJLElBQUQsRUFBeUI7QUFBQSxZQUMzQkQsT0FEMkIsR0FDUixPQUFLcEMsS0FERyxDQUMzQm9DLE9BRDJCOztBQUVuQyxlQUFPQyxLQUFLQyxRQUFaO0FBQ0FGLGdCQUFRQyxJQUFSO0FBQ0gsSzs7U0F3QkRFLGEsR0FBZ0IsVUFBQ0MsS0FBRCxFQUF3QjtBQUNwQyxlQUFLQyxRQUFMLENBQWM7QUFDVjdCLGtCQUFNckI7QUFESSxTQUFkO0FBR0E7QUFDQW1ELGdCQUFRRixLQUFSLENBQWNBLEtBQWQ7QUFDQTtBQUNILEs7O1NBU0ROLGUsR0FBa0IsVUFBQ1MsTUFBRCxFQUFxQjtBQUFBLFlBQzNCaEMsaUJBRDJCLEdBQ0UsT0FBS0QsS0FEUCxDQUMzQkMsaUJBRDJCO0FBQUEsWUFFM0JGLEVBRjJCLEdBRXdCa0MsTUFGeEIsQ0FFM0JsQyxFQUYyQjtBQUFBLFlBRXZCbUMsZUFGdUIsR0FFd0JELE1BRnhCLENBRXZCQyxlQUZ1QjtBQUFBLCtCQUV3QkQsTUFGeEIsQ0FFTkwsUUFGTTtBQUFBLFlBRU5BLFFBRk0sb0NBRUssS0FGTDs7O0FBSW5DLFlBQUksQ0FBQ00sZUFBRCxJQUFvQixDQUFDakMsa0JBQWtCa0MsS0FBM0MsRUFBa0Q7QUFDOUMsa0JBQU0sSUFBSUMsS0FBSixDQUFVLFlBQVYsQ0FBTjtBQUNIOztBQUVELFlBQUlSLFFBQUosRUFBYztBQUNWSyxtQkFBT0wsUUFBUCxHQUFrQixLQUFsQjtBQUNBLGdCQUFNUyxTQUFTSCxnQkFBZ0JJLFdBQS9CO0FBQ0EsZ0JBQU1DLFdBQVd0QyxrQkFBa0JrQyxLQUFsQixDQUF3QkssTUFBeEIsQ0FBK0IsVUFBQ2IsSUFBRCxFQUFVO0FBQ3RELG9CQUFJQSxLQUFLTyxlQUFMLElBQXdCUCxLQUFLTyxlQUFMLENBQXFCSSxXQUFyQixHQUFtQ0QsTUFBL0QsRUFBdUU7QUFDbkUsMkJBQU9WLEtBQUtPLGVBQUwsQ0FBcUJPLE9BQXJCLENBQTZCSixNQUE3QixFQUFxQ3RDLEVBQXJDLEtBQTRDQSxFQUFuRDtBQUNIO0FBQ0QsdUJBQU8sSUFBUDtBQUNILGFBTGdCLENBQWpCO0FBTUFFLDhCQUFrQmtDLEtBQWxCLEdBQTBCSSxRQUExQjtBQUNBLG1CQUFLUixRQUFMLENBQWMsRUFBRTlCLG9DQUFGLEVBQWQ7QUFDSCxTQVhELE1BV087QUFDSCxtQkFBS0ksV0FBTCxDQUFpQk4sRUFBakI7QUFDSDtBQUNKLEs7O1NBaUNEMkMsMEIsR0FBNkIsVUFBQ0MsVUFBRCxFQUFrQztBQUFBLGdDQUNDQSxVQURELENBQ25EUixLQURtRDtBQUFBLFlBQzVDSSxRQUQ0QyxxQ0FDakMsRUFEaUM7QUFBQSxZQUM3Qi9CLGFBRDZCLEdBQ0NtQyxVQURELENBQzdCbkMsYUFENkI7QUFBQSxZQUVuRFEsSUFGbUQsR0FFbkMsT0FBSzFCLEtBRjhCLENBRW5EMEIsSUFGbUQ7OztBQUkzRCxZQUFNNEIsZ0JBQWdCTCxTQUFTQyxNQUFULENBQWdCLFVBQUNiLElBQUQsRUFBbUI7QUFDckQsZ0JBQUlBLEtBQUtYLElBQVQsRUFBZTtBQUNYLHVCQUFPQSxLQUFLNkIsT0FBTCxDQUFhbEIsS0FBS1gsSUFBbEIsSUFBMEIsQ0FBQyxDQUFsQztBQUNIO0FBQ0QsbUJBQU8sS0FBUDtBQUNILFNBTHFCLENBQXRCO0FBSjJELFlBVXJEZixpQkFWcUQsR0FVeEIsT0FBS0QsS0FWbUIsQ0FVckRDLGlCQVZxRDtBQUFBLGlDQVc3QkEsaUJBWDZCO0FBQUEsWUFXbkRrQyxLQVhtRCxzQkFXbkRBLEtBWG1EOzs7QUFhM0QsWUFBSUEsS0FBSixFQUFXO0FBQ1AsZ0JBQU1XLGNBQWNYLE1BQU1ZLFNBQU4sQ0FBZ0IsVUFBQ3BCLElBQUQ7QUFBQSx1QkFBVUEsS0FBS1gsSUFBTCxLQUFjbEMsV0FBZCxJQUE2QjZDLEtBQUs1QixFQUFMLEtBQVk0QyxXQUFXNUMsRUFBOUQ7QUFBQSxhQUFoQixDQUFwQjtBQUNBb0Msa0JBQU1XLFdBQU4sRUFBbUJsQixRQUFuQixHQUE4QixJQUE5QjtBQUNBTyxrQkFBTWEsTUFBTixlQUFhRixjQUFjLENBQTNCLEVBQThCLENBQTlCLDRCQUFvQ0YsYUFBcEM7QUFDQTNDLDhCQUFrQk8sYUFBbEIsR0FBa0NBLGFBQWxDO0FBQ0gsU0FMRCxNQUtPO0FBQ0hQLGdDQUFvQjBDLFVBQXBCO0FBQ0ExQyw4QkFBa0JrQyxLQUFsQixHQUEwQlMsYUFBMUI7QUFDSDs7QUFFRDtBQUNBLGVBQUtiLFFBQUwsQ0FBYyxFQUFFOUIsb0NBQUYsRUFBZCxFQUFxQyxPQUFLZ0QsZ0JBQTFDO0FBQ0gsSzs7U0FVRDVDLFcsR0FBYyxVQUFDTixFQUFELEVBQW9EO0FBQUEsWUFBdENtRCxVQUFzQyx1RUFBaEIsS0FBZ0I7QUFBQSxZQUN0RDNELFlBRHNELEdBQzlCLE9BQUtELEtBRHlCLENBQ3REQyxZQURzRDs7QUFFOUQsWUFBTTRELFdBQW1CLE9BQU9wRCxFQUFQLEtBQWMsUUFBZCxHQUF5QkEsRUFBekIsR0FBOEJSLFlBQXZEOztBQUVBO0FBQ0EsZUFBS3dDLFFBQUwsQ0FBYztBQUNWN0Isa0JBQU10QixXQURJO0FBRVZxQiwrQkFBbUIsT0FBS21ELHlCQUFMO0FBRlQsU0FBZDs7QUFLQTtBQUNBLGVBQUt0RCxHQUFMLENBQ0t1RCxZQURMLEdBRUtwQixNQUZMLENBRVlrQixRQUZaLEVBRXNCakUsU0FGdEIsRUFFaUNDLFFBRmpDLEVBRTJDLE9BQUt1RCwwQkFGaEQsRUFFNEUsT0FBS2IsYUFGakYsRUFFZ0dxQixVQUZoRztBQUdILEs7O1NBU0Q1QixRLEdBQVcsVUFBQ1osS0FBRCxFQUFxQztBQUM1QyxlQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDSCxLOzs7QUFnQ0wsZUFBZWxDLGVBQWVhLFdBQWYsQ0FBZiIsImZpbGUiOiJDb250ZW50VHJlZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBDb250ZW50IFRyZWUgQ29tcG9uZW50XHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgZmluZERPTU5vZGUgfSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0IHVuaXF1ZWlkIGZyb20gJ2xvZGFzaC51bmlxdWVpZCc7XHJcbmltcG9ydCBub29wIGZyb20gJ2xvZGFzaC5ub29wJztcclxuaW1wb3J0IENvbnRlbnQgZnJvbSAnLi9Db250ZW50JztcclxuaW1wb3J0IEFQSSBmcm9tICcuLi8uLi9hcGknO1xyXG5pbXBvcnQgbWFrZVJlc3BvbnNpdmUgZnJvbSAnLi4vbWFrZVJlc3BvbnNpdmUnO1xyXG5pbXBvcnQgeyBpc0ZvY3VzYWJsZUVsZW1lbnQgfSBmcm9tICcuLi8uLi91dGlsL2RvbSc7XHJcbmltcG9ydCB7XHJcbiAgICBERUZBVUxUX0hPU1ROQU1FX0FQSSxcclxuICAgIERFRkFVTFRfUk9PVCxcclxuICAgIFZJRVdfRk9MREVSLFxyXG4gICAgVklFV19FUlJPUixcclxuICAgIFRZUEVfRk9MREVSLFxyXG4gICAgVFlQRV9GSUxFLFxyXG4gICAgVFlQRV9XRUJMSU5LLFxyXG4gICAgQ0xJRU5UX05BTUVfQ09OVEVOVF9UUkVFLFxyXG4gICAgU09SVF9OQU1FLFxyXG4gICAgU09SVF9BU0MsXHJcbiAgICBUWVBFRF9JRF9GT0xERVJfUFJFRklYXHJcbn0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHR5cGUgeyBCb3hJdGVtLCBDb2xsZWN0aW9uLCBWaWV3LCBUb2tlbiB9IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcbmltcG9ydCAnLi4vZm9udHMuc2Nzcyc7XHJcbmltcG9ydCAnLi4vYmFzZS5zY3NzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICB0eXBlOiBzdHJpbmcsXHJcbiAgICByb290Rm9sZGVySWQ6IHN0cmluZyxcclxuICAgIG9uQ2xpY2s6IEZ1bmN0aW9uLFxyXG4gICAgYXBpSG9zdDogc3RyaW5nLFxyXG4gICAgZ2V0TG9jYWxpemVkTWVzc2FnZTogRnVuY3Rpb24sXHJcbiAgICBjbGllbnROYW1lOiBzdHJpbmcsXHJcbiAgICB0b2tlbjogVG9rZW4sXHJcbiAgICBpc1NtYWxsOiBib29sZWFuLFxyXG4gICAgaXNMYXJnZTogYm9vbGVhbixcclxuICAgIGlzVG91Y2g6IGJvb2xlYW4sXHJcbiAgICBhdXRvRm9jdXM6IGJvb2xlYW4sXHJcbiAgICBjbGFzc05hbWU6IHN0cmluZyxcclxuICAgIG1lYXN1cmVSZWY6IEZ1bmN0aW9uLFxyXG4gICAgc2hhcmVkTGluaz86IHN0cmluZyxcclxuICAgIHNoYXJlZExpbmtQYXNzd29yZD86IHN0cmluZyxcclxuICAgIHJlc3BvbnNlRmlsdGVyPzogRnVuY3Rpb25cclxufTtcclxuXHJcbnR5cGUgU3RhdGUgPSB7XHJcbiAgICBjdXJyZW50Q29sbGVjdGlvbjogQ29sbGVjdGlvbixcclxuICAgIHZpZXc6IFZpZXdcclxufTtcclxuXHJcbnR5cGUgRGVmYXVsdFByb3BzID0ge3xcclxuICAgIHR5cGU6IHN0cmluZyxcclxuICAgIHJvb3RGb2xkZXJJZDogc3RyaW5nLFxyXG4gICAgb25DbGljazogRnVuY3Rpb24sXHJcbiAgICBhcGlIb3N0OiBzdHJpbmcsXHJcbiAgICBjbGllbnROYW1lOiBzdHJpbmcsXHJcbiAgICBhdXRvRm9jdXM6IGJvb2xlYW4sXHJcbiAgICBjbGFzc05hbWU6IHN0cmluZ1xyXG58fTtcclxuXHJcbmNsYXNzIENvbnRlbnRUcmVlIGV4dGVuZHMgQ29tcG9uZW50PERlZmF1bHRQcm9wcywgUHJvcHMsIFN0YXRlPiB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgYXBpOiBBUEk7XHJcbiAgICBzdGF0ZTogU3RhdGU7XHJcbiAgICBwcm9wczogUHJvcHM7XHJcbiAgICB0YWJsZTogYW55O1xyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM6IERlZmF1bHRQcm9wcyA9IHtcclxuICAgICAgICB0eXBlOiBgJHtUWVBFX0ZJTEV9LCR7VFlQRV9XRUJMSU5LfSwke1RZUEVfRk9MREVSfWAsXHJcbiAgICAgICAgcm9vdEZvbGRlcklkOiBERUZBVUxUX1JPT1QsXHJcbiAgICAgICAgb25DbGljazogbm9vcCxcclxuICAgICAgICBjbGFzc05hbWU6ICcnLFxyXG4gICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcbiAgICAgICAgYXBpSG9zdDogREVGQVVMVF9IT1NUTkFNRV9BUEksXHJcbiAgICAgICAgY2xpZW50TmFtZTogQ0xJRU5UX05BTUVfQ09OVEVOVF9UUkVFXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogW2NvbnN0cnVjdG9yXVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHtDb250ZW50UGlja2VyfVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgcm9vdEZvbGRlcklkLCB0b2tlbiwgc2hhcmVkTGluaywgc2hhcmVkTGlua1Bhc3N3b3JkLCBhcGlIb3N0LCBjbGllbnROYW1lLCByZXNwb25zZUZpbHRlciB9ID0gcHJvcHM7XHJcblxyXG4gICAgICAgIHRoaXMuYXBpID0gbmV3IEFQSSh7XHJcbiAgICAgICAgICAgIHRva2VuLFxyXG4gICAgICAgICAgICBzaGFyZWRMaW5rLFxyXG4gICAgICAgICAgICBzaGFyZWRMaW5rUGFzc3dvcmQsXHJcbiAgICAgICAgICAgIGFwaUhvc3QsXHJcbiAgICAgICAgICAgIGNsaWVudE5hbWUsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlRmlsdGVyLFxyXG4gICAgICAgICAgICBpZDogYCR7VFlQRURfSURfRk9MREVSX1BSRUZJWH0ke3Jvb3RGb2xkZXJJZH1gXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuaWQgPSB1bmlxdWVpZCgnYmN0XycpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBjdXJyZW50Q29sbGVjdGlvbjoge30sXHJcbiAgICAgICAgICAgIHZpZXc6IFZJRVdfRk9MREVSXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlc3Ryb3lzIGFwaSBpbnN0YW5jZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgY2xlYXJDYWNoZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFwaS5kZXN0cm95KHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xlYW51cFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckNhY2hlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGZXRjaGVzIHRoZSByb290IGZvbGRlciBvbiBsb2FkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmZldGNoRm9sZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxscyB0aGUgcGFzc2VkIG9uIG9uQ2xpY2sgZnVuY3Npb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gLSBjbGlja2VkIGl0ZW1cclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIG9uSXRlbUNsaWNrID0gKGl0ZW06IEJveEl0ZW0pOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCB7IG9uQ2xpY2sgfTogUHJvcHMgPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGRlbGV0ZSBpdGVtLnNlbGVjdGVkO1xyXG4gICAgICAgIG9uQ2xpY2soaXRlbSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXRzIHRoZSBwZXJjZW50TG9hZGVkIGluIHRoZSBjb2xsZWN0aW9uXHJcbiAgICAgKiBzbyB0aGF0IHRoZSBsb2FkaW5nIGJhciBzdGFydHMgc2hvd2luZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAZmlyZXMgY2FuY2VsXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBjdXJyZW50VW5sb2FkZWRDb2xsZWN0aW9uKCk6IENvbGxlY3Rpb24ge1xyXG4gICAgICAgIGNvbnN0IHsgY3VycmVudENvbGxlY3Rpb24gfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGN1cnJlbnRDb2xsZWN0aW9uLCB7XHJcbiAgICAgICAgICAgIHBlcmNlbnRMb2FkZWQ6IDBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE5ldHdvcmsgZXJyb3IgY2FsbGJhY2tcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgZXJyb3Igb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBlcnJvckNhbGxiYWNrID0gKGVycm9yOiBFcnJvcik6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICB2aWV3OiBWSUVXX0VSUk9SXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjdGlvbiBwZXJmb3JtZWQgd2hlbiBjbGlja2luZyBvbiBhbiBpdGVtIGV4cGFuZCBidXR0b25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gLSB0aGUgY2xpY2tlZCBib3ggaXRlbVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgb25FeHBhbmRlckNsaWNrID0gKGZvbGRlcjogQm94SXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgY3VycmVudENvbGxlY3Rpb24gfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHsgaWQsIHBhdGhfY29sbGVjdGlvbiwgc2VsZWN0ZWQgPSBmYWxzZSB9OiBCb3hJdGVtID0gZm9sZGVyO1xyXG5cclxuICAgICAgICBpZiAoIXBhdGhfY29sbGVjdGlvbiB8fCAhY3VycmVudENvbGxlY3Rpb24uaXRlbXMpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCYWQgc3RhdGUhJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgZm9sZGVyLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IHBhdGhfY29sbGVjdGlvbi50b3RhbF9jb3VudDtcclxuICAgICAgICAgICAgY29uc3QgbmV3SXRlbXMgPSBjdXJyZW50Q29sbGVjdGlvbi5pdGVtcy5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLnBhdGhfY29sbGVjdGlvbiAmJiBpdGVtLnBhdGhfY29sbGVjdGlvbi50b3RhbF9jb3VudCA+IGxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnBhdGhfY29sbGVjdGlvbi5lbnRyaWVzW2xlbmd0aF0uaWQgIT09IGlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjdXJyZW50Q29sbGVjdGlvbi5pdGVtcyA9IG5ld0l0ZW1zO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY3VycmVudENvbGxlY3Rpb24gfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5mZXRjaEZvbGRlcihpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvY3VzZXMgdGhlIGdyaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZmluaXNoTmF2aWdhdGlvbigpIHtcclxuICAgICAgICBjb25zdCB7IGF1dG9Gb2N1cyB9OiBQcm9wcyA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgeyBjdXJyZW50Q29sbGVjdGlvbjogeyBwZXJjZW50TG9hZGVkIH0gfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgICAgICAvLyBEb24ndCBmb2N1cyB0aGUgZ3JpZCB1bnRpbCBpdHMgbG9hZGVkIGFuZCB1c2VyIGlzIG5vdCBhbHJlYWR5IG9uIGFuIGludGVyYWN0YWJsZSBlbGVtZW50XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAhYXV0b0ZvY3VzIHx8XHJcbiAgICAgICAgICAgIHBlcmNlbnRMb2FkZWQgIT09IDEwMCB8fFxyXG4gICAgICAgICAgICAhdGhpcy50YWJsZSB8fFxyXG4gICAgICAgICAgICAhdGhpcy50YWJsZS5HcmlkIHx8XHJcbiAgICAgICAgICAgIGlzRm9jdXNhYmxlRWxlbWVudChkb2N1bWVudC5hY3RpdmVFbGVtZW50KVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGdyaWQ6IGFueSA9IGZpbmRET01Ob2RlKHRoaXMudGFibGUuR3JpZCk7XHJcbiAgICAgICAgZ3JpZC5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9sZGVyIGZldGNoIHN1Y2Nlc3MgY2FsbGJhY2tcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbGxlY3Rpb24gaXRlbSBjb2xsZWN0aW9uIG9iamVjdFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZmV0Y2hGb2xkZXJTdWNjZXNzQ2FsbGJhY2sgPSAoY29sbGVjdGlvbjogQ29sbGVjdGlvbik6IHZvaWQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgaXRlbXM6IG5ld0l0ZW1zID0gW10sIHBlcmNlbnRMb2FkZWQgfTogQ29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XHJcbiAgICAgICAgY29uc3QgeyB0eXBlIH06IFByb3BzID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgY29uc3QgZmlsdGVyZWRJdGVtcyA9IG5ld0l0ZW1zLmZpbHRlcigoaXRlbTogQm94SXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZS5pbmRleE9mKGl0ZW0udHlwZSkgPiAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHsgY3VycmVudENvbGxlY3Rpb24gfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHsgaXRlbXMgfTogQ29sbGVjdGlvbiA9IGN1cnJlbnRDb2xsZWN0aW9uO1xyXG5cclxuICAgICAgICBpZiAoaXRlbXMpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50SW5kZXggPSBpdGVtcy5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0udHlwZSA9PT0gVFlQRV9GT0xERVIgJiYgaXRlbS5pZCA9PT0gY29sbGVjdGlvbi5pZCk7XHJcbiAgICAgICAgICAgIGl0ZW1zW3BhcmVudEluZGV4XS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGl0ZW1zLnNwbGljZShwYXJlbnRJbmRleCArIDEsIDAsIC4uLmZpbHRlcmVkSXRlbXMpO1xyXG4gICAgICAgICAgICBjdXJyZW50Q29sbGVjdGlvbi5wZXJjZW50TG9hZGVkID0gcGVyY2VudExvYWRlZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjdXJyZW50Q29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XHJcbiAgICAgICAgICAgIGN1cnJlbnRDb2xsZWN0aW9uLml0ZW1zID0gZmlsdGVyZWRJdGVtcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNldCB0aGUgbmV3IHN0YXRlIGFuZCBmb2N1cyB0aGUgZ3JpZCBmb3IgdGFiYmluZ1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyZW50Q29sbGVjdGlvbiB9LCB0aGlzLmZpbmlzaE5hdmlnYXRpb24pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZldGNoZXMgYSBmb2xkZXIsIGRlZmF1bHRzIHRvIGZldGNoaW5nIHJvb3QgZm9sZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfHZvaWR9IFtpZF0gZm9sZGVyIGlkXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW58dm9pZH0gW2ZvcmNlRmV0Y2hdIFRvIHZvaWQgY2FjaGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZldGNoRm9sZGVyID0gKGlkPzogc3RyaW5nLCBmb3JjZUZldGNoOiBib29sZWFuID0gZmFsc2UpOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCB7IHJvb3RGb2xkZXJJZCB9OiBQcm9wcyA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgZm9sZGVySWQ6IHN0cmluZyA9IHR5cGVvZiBpZCA9PT0gJ3N0cmluZycgPyBpZCA6IHJvb3RGb2xkZXJJZDtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgdGhlIHZpZXcgYW5kIHNob3cgYnVzeSBpbmRpY2F0b3JcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgdmlldzogVklFV19GT0xERVIsXHJcbiAgICAgICAgICAgIGN1cnJlbnRDb2xsZWN0aW9uOiB0aGlzLmN1cnJlbnRVbmxvYWRlZENvbGxlY3Rpb24oKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBGZXRjaCB0aGUgZm9sZGVyIHVzaW5nIGZvbGRlciBBUElcclxuICAgICAgICB0aGlzLmFwaVxyXG4gICAgICAgICAgICAuZ2V0Rm9sZGVyQVBJKClcclxuICAgICAgICAgICAgLmZvbGRlcihmb2xkZXJJZCwgU09SVF9OQU1FLCBTT1JUX0FTQywgdGhpcy5mZXRjaEZvbGRlclN1Y2Nlc3NDYWxsYmFjaywgdGhpcy5lcnJvckNhbGxiYWNrLCBmb3JjZUZldGNoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTYXZlcyByZWZlcmVuY2UgdG8gdGFibGUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSByZWFjdCBjb21wb25lbnRcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHRhYmxlUmVmID0gKHRhYmxlOiBSZWFjdCRDb21wb25lbnQ8KiwgKiwgKj4pID0+IHtcclxuICAgICAgICB0aGlzLnRhYmxlID0gdGFibGU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyB0aGUgZmlsZSBwaWNrZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEByZXR1cm4ge0VsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IHJvb3RGb2xkZXJJZCwgdHlwZSwgZ2V0TG9jYWxpemVkTWVzc2FnZSwgaXNTbWFsbCwgY2xhc3NOYW1lLCBtZWFzdXJlUmVmIH06IFByb3BzID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7IHZpZXcsIGN1cnJlbnRDb2xsZWN0aW9uIH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBzdHlsZUNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoJ2J1aWsgYmN0IGJ1aWstYXBwLWVsZW1lbnQnLCBjbGFzc05hbWUpO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGlkPXt0aGlzLmlkfSBjbGFzc05hbWU9e3N0eWxlQ2xhc3NOYW1lfSByZWY9e21lYXN1cmVSZWZ9PlxyXG4gICAgICAgICAgICAgICAgPENvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICB2aWV3PXt2aWV3fVxyXG4gICAgICAgICAgICAgICAgICAgIGlzU21hbGw9e2lzU21hbGx9XHJcbiAgICAgICAgICAgICAgICAgICAgcm9vdElkPXtyb290Rm9sZGVySWR9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0YWJsZVR5cGU9e3R5cGV9XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbGxlY3Rpb249e2N1cnJlbnRDb2xsZWN0aW9ufVxyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlUmVmPXt0aGlzLnRhYmxlUmVmfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uSXRlbUNsaWNrPXt0aGlzLm9uSXRlbUNsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRXhwYW5kZXJDbGljaz17dGhpcy5vbkV4cGFuZGVyQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0TG9jYWxpemVkTWVzc2FnZT17Z2V0TG9jYWxpemVkTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1ha2VSZXNwb25zaXZlKENvbnRlbnRUcmVlKTtcclxuIl19