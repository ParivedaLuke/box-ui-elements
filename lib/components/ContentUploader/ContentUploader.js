var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Content Uploader component
 * @author Box
 */

/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import classNames from 'classnames';
import noop from 'lodash.noop';
import uniqueid from 'lodash.uniqueid';
import cloneDeep from 'lodash.clonedeep';
import API from '../../api';
import DroppableContent from './DroppableContent';
import Footer from './Footer';
import makeResponsive from '../makeResponsive';
import { isIE } from '../../util/browser';
import { CLIENT_NAME_CONTENT_UPLOADER, DEFAULT_HOSTNAME_UPLOAD, DEFAULT_HOSTNAME_API, VIEW_ERROR, VIEW_UPLOAD_EMPTY, VIEW_UPLOAD_IN_PROGRESS, VIEW_UPLOAD_SUCCESS, STATUS_PENDING, STATUS_IN_PROGRESS, STATUS_COMPLETE, STATUS_ERROR } from '../../constants';


var CHUNKED_UPLOAD_MIN_SIZE_BYTES = 52428800; // 50MB
var FILE_LIMIT_DEFAULT = 100; // Upload at most 100 files at once by default

var ContentUploader = function (_Component) {
    _inherits(ContentUploader, _Component);

    /**
     * [constructor]
     *
     * @return {ContentUploader}
     */
    function ContentUploader(props) {
        _classCallCheck(this, ContentUploader);

        var _this = _possibleConstructorReturn(this, (ContentUploader.__proto__ || Object.getPrototypeOf(ContentUploader)).call(this, props));

        _this.tableRef = function (table) {
            _this.table = table;
        };

        _this.addFilesToUploadQueue = function (files) {
            var _this$props = _this.props,
                chunked = _this$props.chunked,
                fileLimit = _this$props.fileLimit,
                getLocalizedMessage = _this$props.getLocalizedMessage;
            var _this$state = _this.state,
                view = _this$state.view,
                items = _this$state.items;

            // Disable chunked upload in IE11 for now until hashing is done in a worker

            var useChunked = chunked && !isIE();

            // Filter out files that are already in the upload queue
            var newItems = [].filter.call(files, function (file) {
                var name = file.name;

                return !items.some(function (item) {
                    return item.name === name;
                });

                // Convert files from the file API to upload items
            }).map(function (file) {
                var name = file.name,
                    size = file.size;

                // Extract extension or use empty string if file has no extension

                var extension = name.substr(name.lastIndexOf('.') + 1);
                if (extension.length === name.length) {
                    extension = '';
                }

                var factory = _this.createAPIFactory();
                var api = void 0;

                if (useChunked && size && size > CHUNKED_UPLOAD_MIN_SIZE_BYTES) {
                    api = factory.getChunkedUploadAPI();
                } else {
                    api = factory.getPlainUploadAPI();
                }

                var uploadItem = {
                    api: api,
                    extension: extension,
                    file: file,
                    name: name,
                    progress: 0,
                    size: size,
                    status: STATUS_PENDING
                };

                return uploadItem;
            });

            var updatedItems = [];
            var totalNumOfItems = items.length + newItems.length;

            // Don't add more than fileLimit # of items
            if (totalNumOfItems > fileLimit) {
                updatedItems = items.concat(newItems.slice(0, fileLimit - items.length));
                _this.setState({
                    message: getLocalizedMessage('buik.upload.message.toomanyfiles', { fileLimit: fileLimit })
                });
            } else {
                updatedItems = items.concat(newItems);
            }

            _this.updateViewAndCollection(updatedItems);

            // Automatically start upload if other files are being uploaded
            if (view === VIEW_UPLOAD_IN_PROGRESS) {
                _this.upload();
            }
        };

        _this.cancel = function () {
            var items = _this.state.items;

            items.forEach(function (uploadItem) {
                var api = uploadItem.api,
                    status = uploadItem.status;

                if (status === STATUS_IN_PROGRESS) {
                    api.cancel();
                }
            });

            // Reset upload collection
            _this.updateViewAndCollection([]);
        };

        _this.upload = function () {
            var items = _this.state.items;

            items.forEach(function (uploadItem) {
                if (uploadItem.status !== STATUS_IN_PROGRESS) {
                    _this.uploadFile(uploadItem);
                }
            });
        };

        _this.handleUploadSuccess = function (item, entries) {
            item.progress = 100;
            item.status = STATUS_COMPLETE;

            // Cache Box File object of successfully uploaded item
            if (entries && entries.length === 1) {
                item.boxFile = entries[0];
            }

            var items = _this.state.items;

            items[items.indexOf(item)] = item;

            _this.updateViewAndCollection(items);
        };

        _this.handleUploadError = function () {
            _this.setState({
                view: VIEW_ERROR,
                items: []
            });
        };

        _this.handleUploadProgress = function (item, event) {
            if (!event.lengthComputable || item.status === STATUS_COMPLETE) {
                return;
            }

            item.progress = Math.round(event.loaded / event.total * 100);
            item.status = STATUS_IN_PROGRESS;

            var items = _this.state.items;

            items[items.indexOf(item)] = item;

            _this.updateViewAndCollection(items);
        };

        _this.onClick = function (item) {
            var status = item.status;

            switch (status) {
                case STATUS_IN_PROGRESS:
                case STATUS_COMPLETE:
                case STATUS_PENDING:
                    _this.removeFileFromUploadQueue(item);
                    break;
                case STATUS_ERROR:
                    _this.uploadFile(item);
                    break;
                default:
                    break;
            }
        };

        var rootFolderId = props.rootFolderId,
            token = props.token;

        _this.state = {
            view: rootFolderId && token ? VIEW_UPLOAD_EMPTY : VIEW_ERROR,
            items: [],
            message: ''
        };
        _this.id = uniqueid('bcu_');
        return _this;
    }

    /**
     * Fetches the root folder on load
     *
     * @private
     * @inheritdoc
     * @return {void}
     */


    _createClass(ContentUploader, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.rootElement = document.getElementById(this.id);
            this.appElement = this.rootElement;
        }

        /**
         * Create and return new instance of API creator
         *
         * @return {API}
         */

    }, {
        key: 'createAPIFactory',
        value: function createAPIFactory() {
            var _props = this.props,
                rootFolderId = _props.rootFolderId,
                token = _props.token,
                sharedLink = _props.sharedLink,
                sharedLinkPassword = _props.sharedLinkPassword,
                apiHost = _props.apiHost,
                uploadHost = _props.uploadHost,
                clientName = _props.clientName,
                responseFilter = _props.responseFilter;

            return new API({
                token: token,
                sharedLink: sharedLink,
                sharedLinkPassword: sharedLinkPassword,
                apiHost: apiHost,
                uploadHost: uploadHost,
                clientName: clientName,
                responseFilter: responseFilter,
                id: 'folder_' + rootFolderId
            });
        }

        /**
         * Saves reference to table component
         *
         * @private
         * @param {Component} table - React virtualized Table component
         * @return {void}
         */


        /**
         * Converts File API to upload items and adds to upload queue.
         *
         * @private
         * @param {File[]} files - Files to be added to upload queue
         * @return {void}
         */

    }, {
        key: 'removeFileFromUploadQueue',


        /**
         * Removes an item from the upload queue. Cancels upload if in progress.
         *
         * @param {UploadItem} item - Item to remove
         * @return {void}
         */
        value: function removeFileFromUploadQueue(item) {
            var api = item.api;

            api.cancel();

            var items = this.state.items;

            items.splice(items.indexOf(item), 1);

            this.updateViewAndCollection(items);
        }

        /**
         * Aborts uploads in progress and clears upload list.
         *
         * @private
         * @return {void}
         */


        /**
         * Uploads all items in the upload collection.
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'uploadFile',


        /**
         * Helper to upload a single file.
         *
         * @param {UploadItem} item - Upload item object
         * @return {void}
         */
        value: function uploadFile(item) {
            var _this2 = this;

            var rootFolderId = this.props.rootFolderId;
            var api = item.api,
                file = item.file;


            api.upload({
                id: rootFolderId,
                file: file,
                successCallback: function successCallback(entries) {
                    return _this2.handleUploadSuccess(item, entries);
                },
                errorCallback: this.handleUploadError,
                progressCallback: function progressCallback(event) {
                    return _this2.handleUploadProgress(item, event);
                },
                overwrite: true
            });

            item.status = STATUS_IN_PROGRESS;
            var items = this.state.items;

            items[items.indexOf(item)] = item;

            this.updateViewAndCollection(items);
        }

        /**
         * Handles a successful upload.
         *
         * @private
         * @param {UploadItem} item - Upload item corresponding to success event
         * @param {BoxItem[]} entries - Successfully uploaded Box File objects
         * @return {void}
         */

    }, {
        key: 'updateViewAndCollection',


        /**
         * Updates view and internal upload collection with provided items.
         *
         * @private
         * @param {UploadItem[]} item - Itmes to update collection with
         * @return {void}
         */
        value: function updateViewAndCollection(items) {
            var onComplete = this.props.onComplete;

            var someUploadIsInProgress = items.some(function (uploadItem) {
                return uploadItem.status !== STATUS_COMPLETE;
            });
            var allFilesArePending = !items.some(function (uploadItem) {
                return uploadItem.status !== STATUS_PENDING;
            });

            var view = '';
            if (items && items.length === 0 || allFilesArePending) {
                view = VIEW_UPLOAD_EMPTY;
            } else if (someUploadIsInProgress) {
                view = VIEW_UPLOAD_IN_PROGRESS;
            } else {
                view = VIEW_UPLOAD_SUCCESS;
                onComplete(cloneDeep(items.map(function (item) {
                    return item.boxFile;
                })));
                items = []; // Reset item collection after successful upload
            }

            this.setState({
                view: view,
                items: items
            });
        }

        /**
         * Handles an upload error.
         *
         * @private
         * @return {void}
         */


        /**
         * Handles an upload progress event.
         *
         * @private
         * @param {UploadItem} item - Upload item corresponding to progress event
         * @param {ProgressEvent} event - Progress event
         * @return {void}
         */


        /**
         * Updates item based on its status.
         *
         * @private
         * @param {UploadItem} item - The upload item to update
         * @return {void}
         */

    }, {
        key: 'render',


        /**
         * Renders the content uploader
         *
         * @inheritdoc
         * @return {Component}
         */
        value: function render() {
            var _props2 = this.props,
                onClose = _props2.onClose,
                getLocalizedMessage = _props2.getLocalizedMessage,
                className = _props2.className,
                measureRef = _props2.measureRef,
                isTouch = _props2.isTouch;
            var _state = this.state,
                view = _state.view,
                items = _state.items,
                message = _state.message;


            var hasFiles = items.length !== 0;
            var isLoading = items.some(function (item) {
                return item.status === STATUS_IN_PROGRESS;
            });
            var styleClassName = classNames('buik buik-app-element bcu', className);

            return React.createElement(
                'div',
                { className: styleClassName, id: this.id, ref: measureRef },
                React.createElement(DroppableContent, {
                    addFiles: this.addFilesToUploadQueue,
                    allowedTypes: ['Files'],
                    getLocalizedMessage: getLocalizedMessage,
                    items: items,
                    isTouch: isTouch,
                    tableRef: this.tableRef,
                    view: view,
                    onClick: this.onClick
                }),
                React.createElement(Footer, {
                    getLocalizedMessage: getLocalizedMessage,
                    hasFiles: hasFiles,
                    isLoading: isLoading,
                    message: message,
                    onCancel: this.cancel,
                    onClose: onClose,
                    onUpload: this.upload
                })
            );
        }
    }]);

    return ContentUploader;
}(Component);

ContentUploader.defaultProps = {
    apiHost: DEFAULT_HOSTNAME_API,
    chunked: true,
    className: '',
    clientName: CLIENT_NAME_CONTENT_UPLOADER,
    fileLimit: FILE_LIMIT_DEFAULT,
    uploadHost: DEFAULT_HOSTNAME_UPLOAD,
    onClose: noop,
    onComplete: noop
};


export default makeResponsive(ContentUploader);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRlbnRVcGxvYWRlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImNsYXNzTmFtZXMiLCJub29wIiwidW5pcXVlaWQiLCJjbG9uZURlZXAiLCJBUEkiLCJEcm9wcGFibGVDb250ZW50IiwiRm9vdGVyIiwibWFrZVJlc3BvbnNpdmUiLCJpc0lFIiwiQ0xJRU5UX05BTUVfQ09OVEVOVF9VUExPQURFUiIsIkRFRkFVTFRfSE9TVE5BTUVfVVBMT0FEIiwiREVGQVVMVF9IT1NUTkFNRV9BUEkiLCJWSUVXX0VSUk9SIiwiVklFV19VUExPQURfRU1QVFkiLCJWSUVXX1VQTE9BRF9JTl9QUk9HUkVTUyIsIlZJRVdfVVBMT0FEX1NVQ0NFU1MiLCJTVEFUVVNfUEVORElORyIsIlNUQVRVU19JTl9QUk9HUkVTUyIsIlNUQVRVU19DT01QTEVURSIsIlNUQVRVU19FUlJPUiIsIkNIVU5LRURfVVBMT0FEX01JTl9TSVpFX0JZVEVTIiwiRklMRV9MSU1JVF9ERUZBVUxUIiwiQ29udGVudFVwbG9hZGVyIiwicHJvcHMiLCJ0YWJsZVJlZiIsInRhYmxlIiwiYWRkRmlsZXNUb1VwbG9hZFF1ZXVlIiwiZmlsZXMiLCJjaHVua2VkIiwiZmlsZUxpbWl0IiwiZ2V0TG9jYWxpemVkTWVzc2FnZSIsInN0YXRlIiwidmlldyIsIml0ZW1zIiwidXNlQ2h1bmtlZCIsIm5ld0l0ZW1zIiwiZmlsdGVyIiwiY2FsbCIsImZpbGUiLCJuYW1lIiwic29tZSIsIml0ZW0iLCJtYXAiLCJzaXplIiwiZXh0ZW5zaW9uIiwic3Vic3RyIiwibGFzdEluZGV4T2YiLCJsZW5ndGgiLCJmYWN0b3J5IiwiY3JlYXRlQVBJRmFjdG9yeSIsImFwaSIsImdldENodW5rZWRVcGxvYWRBUEkiLCJnZXRQbGFpblVwbG9hZEFQSSIsInVwbG9hZEl0ZW0iLCJwcm9ncmVzcyIsInN0YXR1cyIsInVwZGF0ZWRJdGVtcyIsInRvdGFsTnVtT2ZJdGVtcyIsImNvbmNhdCIsInNsaWNlIiwic2V0U3RhdGUiLCJtZXNzYWdlIiwidXBkYXRlVmlld0FuZENvbGxlY3Rpb24iLCJ1cGxvYWQiLCJjYW5jZWwiLCJmb3JFYWNoIiwidXBsb2FkRmlsZSIsImhhbmRsZVVwbG9hZFN1Y2Nlc3MiLCJlbnRyaWVzIiwiYm94RmlsZSIsImluZGV4T2YiLCJoYW5kbGVVcGxvYWRFcnJvciIsImhhbmRsZVVwbG9hZFByb2dyZXNzIiwiZXZlbnQiLCJsZW5ndGhDb21wdXRhYmxlIiwiTWF0aCIsInJvdW5kIiwibG9hZGVkIiwidG90YWwiLCJvbkNsaWNrIiwicmVtb3ZlRmlsZUZyb21VcGxvYWRRdWV1ZSIsInJvb3RGb2xkZXJJZCIsInRva2VuIiwiaWQiLCJyb290RWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhcHBFbGVtZW50Iiwic2hhcmVkTGluayIsInNoYXJlZExpbmtQYXNzd29yZCIsImFwaUhvc3QiLCJ1cGxvYWRIb3N0IiwiY2xpZW50TmFtZSIsInJlc3BvbnNlRmlsdGVyIiwic3BsaWNlIiwic3VjY2Vzc0NhbGxiYWNrIiwiZXJyb3JDYWxsYmFjayIsInByb2dyZXNzQ2FsbGJhY2siLCJvdmVyd3JpdGUiLCJvbkNvbXBsZXRlIiwic29tZVVwbG9hZElzSW5Qcm9ncmVzcyIsImFsbEZpbGVzQXJlUGVuZGluZyIsIm9uQ2xvc2UiLCJjbGFzc05hbWUiLCJtZWFzdXJlUmVmIiwiaXNUb3VjaCIsImhhc0ZpbGVzIiwiaXNMb2FkaW5nIiwic3R5bGVDbGFzc05hbWUiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7OztBQU1BO0FBQ0EsT0FBT0EsS0FBUCxJQUFnQkMsU0FBaEIsUUFBaUMsT0FBakM7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLFlBQXZCO0FBQ0EsT0FBT0MsSUFBUCxNQUFpQixhQUFqQjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsaUJBQXJCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixrQkFBdEI7QUFDQSxPQUFPQyxHQUFQLE1BQWdCLFdBQWhCO0FBQ0EsT0FBT0MsZ0JBQVAsTUFBNkIsb0JBQTdCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixVQUFuQjtBQUNBLE9BQU9DLGNBQVAsTUFBMkIsbUJBQTNCO0FBQ0EsU0FBU0MsSUFBVCxRQUFxQixvQkFBckI7QUFDQSxTQUNJQyw0QkFESixFQUVJQyx1QkFGSixFQUdJQyxvQkFISixFQUlJQyxVQUpKLEVBS0lDLGlCQUxKLEVBTUlDLHVCQU5KLEVBT0lDLG1CQVBKLEVBUUlDLGNBUkosRUFTSUMsa0JBVEosRUFVSUMsZUFWSixFQVdJQyxZQVhKLFFBWU8saUJBWlA7OztBQXVEQSxJQUFNQyxnQ0FBZ0MsUUFBdEMsQyxDQUFnRDtBQUNoRCxJQUFNQyxxQkFBcUIsR0FBM0IsQyxDQUFnQzs7SUFFMUJDLGU7OztBQW1CRjs7Ozs7QUFLQSw2QkFBWUMsS0FBWixFQUEwQjtBQUFBOztBQUFBLHNJQUNoQkEsS0FEZ0I7O0FBQUEsY0EyRDFCQyxRQTNEMEIsR0EyRGYsVUFBQ0MsS0FBRCxFQUFnQjtBQUN2QixrQkFBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0gsU0E3RHlCOztBQUFBLGNBc0UxQkMscUJBdEUwQixHQXNFRixVQUFDQyxLQUFELEVBQW1CO0FBQUEsOEJBQ2EsTUFBS0osS0FEbEI7QUFBQSxnQkFDL0JLLE9BRCtCLGVBQy9CQSxPQUQrQjtBQUFBLGdCQUN0QkMsU0FEc0IsZUFDdEJBLFNBRHNCO0FBQUEsZ0JBQ1hDLG1CQURXLGVBQ1hBLG1CQURXO0FBQUEsOEJBRWYsTUFBS0MsS0FGVTtBQUFBLGdCQUUvQkMsSUFGK0IsZUFFL0JBLElBRitCO0FBQUEsZ0JBRXpCQyxLQUZ5QixlQUV6QkEsS0FGeUI7O0FBSXZDOztBQUNBLGdCQUFNQyxhQUFhTixXQUFXLENBQUNwQixNQUEvQjs7QUFFQTtBQUNBLGdCQUFNMkIsV0FBVyxHQUFHQyxNQUFILENBQ1pDLElBRFksQ0FDUFYsS0FETyxFQUNBLFVBQUNXLElBQUQsRUFBVTtBQUFBLG9CQUNYQyxJQURXLEdBQ0ZELElBREUsQ0FDWEMsSUFEVzs7QUFFbkIsdUJBQU8sQ0FBQ04sTUFBTU8sSUFBTixDQUFXLFVBQUNDLElBQUQ7QUFBQSwyQkFBVUEsS0FBS0YsSUFBTCxLQUFjQSxJQUF4QjtBQUFBLGlCQUFYLENBQVI7O0FBRUE7QUFDSCxhQU5ZLEVBT1pHLEdBUFksQ0FPUixVQUFDSixJQUFELEVBQVU7QUFBQSxvQkFDSEMsSUFERyxHQUNZRCxJQURaLENBQ0hDLElBREc7QUFBQSxvQkFDR0ksSUFESCxHQUNZTCxJQURaLENBQ0dLLElBREg7O0FBR1g7O0FBQ0Esb0JBQUlDLFlBQVlMLEtBQUtNLE1BQUwsQ0FBWU4sS0FBS08sV0FBTCxDQUFpQixHQUFqQixJQUF3QixDQUFwQyxDQUFoQjtBQUNBLG9CQUFJRixVQUFVRyxNQUFWLEtBQXFCUixLQUFLUSxNQUE5QixFQUFzQztBQUNsQ0gsZ0NBQVksRUFBWjtBQUNIOztBQUVELG9CQUFNSSxVQUFVLE1BQUtDLGdCQUFMLEVBQWhCO0FBQ0Esb0JBQUlDLFlBQUo7O0FBRUEsb0JBQUloQixjQUFjUyxJQUFkLElBQXNCQSxPQUFPdkIsNkJBQWpDLEVBQWdFO0FBQzVEOEIsMEJBQU1GLFFBQVFHLG1CQUFSLEVBQU47QUFDSCxpQkFGRCxNQUVPO0FBQ0hELDBCQUFNRixRQUFRSSxpQkFBUixFQUFOO0FBQ0g7O0FBRUQsb0JBQU1DLGFBQWE7QUFDZkgsNEJBRGU7QUFFZk4sd0NBRmU7QUFHZk4sOEJBSGU7QUFJZkMsOEJBSmU7QUFLZmUsOEJBQVUsQ0FMSztBQU1mWCw4QkFOZTtBQU9mWSw0QkFBUXZDO0FBUE8saUJBQW5COztBQVVBLHVCQUFPcUMsVUFBUDtBQUNILGFBcENZLENBQWpCOztBQXNDQSxnQkFBSUcsZUFBZSxFQUFuQjtBQUNBLGdCQUFNQyxrQkFBa0J4QixNQUFNYyxNQUFOLEdBQWVaLFNBQVNZLE1BQWhEOztBQUVBO0FBQ0EsZ0JBQUlVLGtCQUFrQjVCLFNBQXRCLEVBQWlDO0FBQzdCMkIsK0JBQWV2QixNQUFNeUIsTUFBTixDQUFhdkIsU0FBU3dCLEtBQVQsQ0FBZSxDQUFmLEVBQWtCOUIsWUFBWUksTUFBTWMsTUFBcEMsQ0FBYixDQUFmO0FBQ0Esc0JBQUthLFFBQUwsQ0FBYztBQUNWQyw2QkFBUy9CLG9CQUFvQixrQ0FBcEIsRUFBd0QsRUFBRUQsb0JBQUYsRUFBeEQ7QUFEQyxpQkFBZDtBQUdILGFBTEQsTUFLTztBQUNIMkIsK0JBQWV2QixNQUFNeUIsTUFBTixDQUFhdkIsUUFBYixDQUFmO0FBQ0g7O0FBRUQsa0JBQUsyQix1QkFBTCxDQUE2Qk4sWUFBN0I7O0FBRUE7QUFDQSxnQkFBSXhCLFNBQVNsQix1QkFBYixFQUFzQztBQUNsQyxzQkFBS2lELE1BQUw7QUFDSDtBQUNKLFNBdkl5Qjs7QUFBQSxjQStKMUJDLE1BL0owQixHQStKakIsWUFBTTtBQUFBLGdCQUNIL0IsS0FERyxHQUNPLE1BQUtGLEtBRFosQ0FDSEUsS0FERzs7QUFFWEEsa0JBQU1nQyxPQUFOLENBQWMsVUFBQ1osVUFBRCxFQUFnQjtBQUFBLG9CQUNsQkgsR0FEa0IsR0FDRkcsVUFERSxDQUNsQkgsR0FEa0I7QUFBQSxvQkFDYkssTUFEYSxHQUNGRixVQURFLENBQ2JFLE1BRGE7O0FBRTFCLG9CQUFJQSxXQUFXdEMsa0JBQWYsRUFBbUM7QUFDL0JpQyx3QkFBSWMsTUFBSjtBQUNIO0FBQ0osYUFMRDs7QUFPQTtBQUNBLGtCQUFLRix1QkFBTCxDQUE2QixFQUE3QjtBQUNILFNBMUt5Qjs7QUFBQSxjQWtMMUJDLE1BbEwwQixHQWtMakIsWUFBTTtBQUFBLGdCQUNIOUIsS0FERyxHQUNPLE1BQUtGLEtBRFosQ0FDSEUsS0FERzs7QUFFWEEsa0JBQU1nQyxPQUFOLENBQWMsVUFBQ1osVUFBRCxFQUFnQjtBQUMxQixvQkFBSUEsV0FBV0UsTUFBWCxLQUFzQnRDLGtCQUExQixFQUE4QztBQUMxQywwQkFBS2lELFVBQUwsQ0FBZ0JiLFVBQWhCO0FBQ0g7QUFDSixhQUpEO0FBS0gsU0F6THlCOztBQUFBLGNBNk4xQmMsbUJBN04wQixHQTZOSixVQUFDMUIsSUFBRCxFQUFtQjJCLE9BQW5CLEVBQTJDO0FBQzdEM0IsaUJBQUthLFFBQUwsR0FBZ0IsR0FBaEI7QUFDQWIsaUJBQUtjLE1BQUwsR0FBY3JDLGVBQWQ7O0FBRUE7QUFDQSxnQkFBSWtELFdBQVdBLFFBQVFyQixNQUFSLEtBQW1CLENBQWxDLEVBQXFDO0FBQ2pDTixxQkFBSzRCLE9BQUwsR0FBZUQsUUFBUSxDQUFSLENBQWY7QUFDSDs7QUFQNEQsZ0JBU3JEbkMsS0FUcUQsR0FTM0MsTUFBS0YsS0FUc0MsQ0FTckRFLEtBVHFEOztBQVU3REEsa0JBQU1BLE1BQU1xQyxPQUFOLENBQWM3QixJQUFkLENBQU4sSUFBNkJBLElBQTdCOztBQUVBLGtCQUFLcUIsdUJBQUwsQ0FBNkI3QixLQUE3QjtBQUNILFNBMU95Qjs7QUFBQSxjQStRMUJzQyxpQkEvUTBCLEdBK1FOLFlBQU07QUFDdEIsa0JBQUtYLFFBQUwsQ0FBYztBQUNWNUIsc0JBQU1wQixVQURJO0FBRVZxQix1QkFBTztBQUZHLGFBQWQ7QUFJSCxTQXBSeUI7O0FBQUEsY0E4UjFCdUMsb0JBOVIwQixHQThSSCxVQUFDL0IsSUFBRCxFQUFtQmdDLEtBQW5CLEVBQTRDO0FBQy9ELGdCQUFJLENBQUNBLE1BQU1DLGdCQUFQLElBQTJCakMsS0FBS2MsTUFBTCxLQUFnQnJDLGVBQS9DLEVBQWdFO0FBQzVEO0FBQ0g7O0FBRUR1QixpQkFBS2EsUUFBTCxHQUFnQnFCLEtBQUtDLEtBQUwsQ0FBV0gsTUFBTUksTUFBTixHQUFlSixNQUFNSyxLQUFyQixHQUE2QixHQUF4QyxDQUFoQjtBQUNBckMsaUJBQUtjLE1BQUwsR0FBY3RDLGtCQUFkOztBQU4rRCxnQkFRdkRnQixLQVJ1RCxHQVE3QyxNQUFLRixLQVJ3QyxDQVF2REUsS0FSdUQ7O0FBUy9EQSxrQkFBTUEsTUFBTXFDLE9BQU4sQ0FBYzdCLElBQWQsQ0FBTixJQUE2QkEsSUFBN0I7O0FBRUEsa0JBQUtxQix1QkFBTCxDQUE2QjdCLEtBQTdCO0FBQ0gsU0ExU3lCOztBQUFBLGNBbVQxQjhDLE9BblQwQixHQW1UaEIsVUFBQ3RDLElBQUQsRUFBc0I7QUFBQSxnQkFDcEJjLE1BRG9CLEdBQ1RkLElBRFMsQ0FDcEJjLE1BRG9COztBQUU1QixvQkFBUUEsTUFBUjtBQUNJLHFCQUFLdEMsa0JBQUw7QUFDQSxxQkFBS0MsZUFBTDtBQUNBLHFCQUFLRixjQUFMO0FBQ0ksMEJBQUtnRSx5QkFBTCxDQUErQnZDLElBQS9CO0FBQ0E7QUFDSixxQkFBS3RCLFlBQUw7QUFDSSwwQkFBSytDLFVBQUwsQ0FBZ0J6QixJQUFoQjtBQUNBO0FBQ0o7QUFDSTtBQVZSO0FBWUgsU0FqVXlCOztBQUFBLFlBR2R3QyxZQUhjLEdBR1UxRCxLQUhWLENBR2QwRCxZQUhjO0FBQUEsWUFHQUMsS0FIQSxHQUdVM0QsS0FIVixDQUdBMkQsS0FIQTs7QUFJdEIsY0FBS25ELEtBQUwsR0FBYTtBQUNUQyxrQkFBTWlELGdCQUFnQkMsS0FBaEIsR0FBd0JyRSxpQkFBeEIsR0FBNENELFVBRHpDO0FBRVRxQixtQkFBTyxFQUZFO0FBR1Q0QixxQkFBUztBQUhBLFNBQWI7QUFLQSxjQUFLc0IsRUFBTCxHQUFVakYsU0FBUyxNQUFULENBQVY7QUFUc0I7QUFVekI7O0FBRUQ7Ozs7Ozs7Ozs7OzRDQU9vQjtBQUNoQixpQkFBS2tGLFdBQUwsR0FBcUJDLFNBQVNDLGNBQVQsQ0FBd0IsS0FBS0gsRUFBN0IsQ0FBckI7QUFDQSxpQkFBS0ksVUFBTCxHQUFrQixLQUFLSCxXQUF2QjtBQUNIOztBQUVEOzs7Ozs7OzsyQ0FLd0I7QUFBQSx5QkFVaEIsS0FBSzdELEtBVlc7QUFBQSxnQkFFaEIwRCxZQUZnQixVQUVoQkEsWUFGZ0I7QUFBQSxnQkFHaEJDLEtBSGdCLFVBR2hCQSxLQUhnQjtBQUFBLGdCQUloQk0sVUFKZ0IsVUFJaEJBLFVBSmdCO0FBQUEsZ0JBS2hCQyxrQkFMZ0IsVUFLaEJBLGtCQUxnQjtBQUFBLGdCQU1oQkMsT0FOZ0IsVUFNaEJBLE9BTmdCO0FBQUEsZ0JBT2hCQyxVQVBnQixVQU9oQkEsVUFQZ0I7QUFBQSxnQkFRaEJDLFVBUmdCLFVBUWhCQSxVQVJnQjtBQUFBLGdCQVNoQkMsY0FUZ0IsVUFTaEJBLGNBVGdCOztBQVdwQixtQkFBTyxJQUFJekYsR0FBSixDQUFRO0FBQ1g4RSw0QkFEVztBQUVYTSxzQ0FGVztBQUdYQyxzREFIVztBQUlYQyxnQ0FKVztBQUtYQyxzQ0FMVztBQU1YQyxzQ0FOVztBQU9YQyw4Q0FQVztBQVFYVixnQ0FBY0Y7QUFSSCxhQUFSLENBQVA7QUFVSDs7QUFFRDs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7Ozs7OztBQTBFQTs7Ozs7O2tEQU0wQnhDLEksRUFBa0I7QUFBQSxnQkFDaENTLEdBRGdDLEdBQ3hCVCxJQUR3QixDQUNoQ1MsR0FEZ0M7O0FBRXhDQSxnQkFBSWMsTUFBSjs7QUFGd0MsZ0JBSWhDL0IsS0FKZ0MsR0FJdEIsS0FBS0YsS0FKaUIsQ0FJaENFLEtBSmdDOztBQUt4Q0Esa0JBQU02RCxNQUFOLENBQWE3RCxNQUFNcUMsT0FBTixDQUFjN0IsSUFBZCxDQUFiLEVBQWtDLENBQWxDOztBQUVBLGlCQUFLcUIsdUJBQUwsQ0FBNkI3QixLQUE3QjtBQUNIOztBQUVEOzs7Ozs7OztBQW1CQTs7Ozs7Ozs7Ozs7QUFlQTs7Ozs7O21DQU1XUSxJLEVBQWtCO0FBQUE7O0FBQUEsZ0JBQ2pCd0MsWUFEaUIsR0FDQSxLQUFLMUQsS0FETCxDQUNqQjBELFlBRGlCO0FBQUEsZ0JBRWpCL0IsR0FGaUIsR0FFSFQsSUFGRyxDQUVqQlMsR0FGaUI7QUFBQSxnQkFFWlosSUFGWSxHQUVIRyxJQUZHLENBRVpILElBRlk7OztBQUl6QlksZ0JBQUlhLE1BQUosQ0FBVztBQUNQb0Isb0JBQUlGLFlBREc7QUFFUDNDLDBCQUZPO0FBR1B5RCxpQ0FBaUIseUJBQUMzQixPQUFEO0FBQUEsMkJBQWEsT0FBS0QsbUJBQUwsQ0FBeUIxQixJQUF6QixFQUErQjJCLE9BQS9CLENBQWI7QUFBQSxpQkFIVjtBQUlQNEIsK0JBQWUsS0FBS3pCLGlCQUpiO0FBS1AwQixrQ0FBa0IsMEJBQUN4QixLQUFEO0FBQUEsMkJBQVcsT0FBS0Qsb0JBQUwsQ0FBMEIvQixJQUExQixFQUFnQ2dDLEtBQWhDLENBQVg7QUFBQSxpQkFMWDtBQU1QeUIsMkJBQVc7QUFOSixhQUFYOztBQVNBekQsaUJBQUtjLE1BQUwsR0FBY3RDLGtCQUFkO0FBYnlCLGdCQWNqQmdCLEtBZGlCLEdBY1AsS0FBS0YsS0FkRSxDQWNqQkUsS0FkaUI7O0FBZXpCQSxrQkFBTUEsTUFBTXFDLE9BQU4sQ0FBYzdCLElBQWQsQ0FBTixJQUE2QkEsSUFBN0I7O0FBRUEsaUJBQUtxQix1QkFBTCxDQUE2QjdCLEtBQTdCO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7QUF1QkE7Ozs7Ozs7Z0RBT3dCQSxLLEVBQXFCO0FBQUEsZ0JBQ2pDa0UsVUFEaUMsR0FDWCxLQUFLNUUsS0FETSxDQUNqQzRFLFVBRGlDOztBQUV6QyxnQkFBTUMseUJBQXlCbkUsTUFBTU8sSUFBTixDQUFXLFVBQUNhLFVBQUQ7QUFBQSx1QkFBZ0JBLFdBQVdFLE1BQVgsS0FBc0JyQyxlQUF0QztBQUFBLGFBQVgsQ0FBL0I7QUFDQSxnQkFBTW1GLHFCQUFxQixDQUFDcEUsTUFBTU8sSUFBTixDQUFXLFVBQUNhLFVBQUQ7QUFBQSx1QkFBZ0JBLFdBQVdFLE1BQVgsS0FBc0J2QyxjQUF0QztBQUFBLGFBQVgsQ0FBNUI7O0FBRUEsZ0JBQUlnQixPQUFPLEVBQVg7QUFDQSxnQkFBS0MsU0FBU0EsTUFBTWMsTUFBTixLQUFpQixDQUEzQixJQUFpQ3NELGtCQUFyQyxFQUF5RDtBQUNyRHJFLHVCQUFPbkIsaUJBQVA7QUFDSCxhQUZELE1BRU8sSUFBSXVGLHNCQUFKLEVBQTRCO0FBQy9CcEUsdUJBQU9sQix1QkFBUDtBQUNILGFBRk0sTUFFQTtBQUNIa0IsdUJBQU9qQixtQkFBUDtBQUNBb0YsMkJBQVdoRyxVQUFVOEIsTUFBTVMsR0FBTixDQUFVLFVBQUNELElBQUQ7QUFBQSwyQkFBVUEsS0FBSzRCLE9BQWY7QUFBQSxpQkFBVixDQUFWLENBQVg7QUFDQXBDLHdCQUFRLEVBQVIsQ0FIRyxDQUdTO0FBQ2Y7O0FBRUQsaUJBQUsyQixRQUFMLENBQWM7QUFDVjVCLDBCQURVO0FBRVZDO0FBRlUsYUFBZDtBQUlIOztBQUVEOzs7Ozs7OztBQWFBOzs7Ozs7Ozs7O0FBc0JBOzs7Ozs7Ozs7Ozs7QUF1QkE7Ozs7OztpQ0FNUztBQUFBLDBCQUMyRSxLQUFLVixLQURoRjtBQUFBLGdCQUNHK0UsT0FESCxXQUNHQSxPQURIO0FBQUEsZ0JBQ1l4RSxtQkFEWixXQUNZQSxtQkFEWjtBQUFBLGdCQUNpQ3lFLFNBRGpDLFdBQ2lDQSxTQURqQztBQUFBLGdCQUM0Q0MsVUFENUMsV0FDNENBLFVBRDVDO0FBQUEsZ0JBQ3dEQyxPQUR4RCxXQUN3REEsT0FEeEQ7QUFBQSx5QkFFbUMsS0FBSzFFLEtBRnhDO0FBQUEsZ0JBRUdDLElBRkgsVUFFR0EsSUFGSDtBQUFBLGdCQUVTQyxLQUZULFVBRVNBLEtBRlQ7QUFBQSxnQkFFZ0I0QixPQUZoQixVQUVnQkEsT0FGaEI7OztBQUlMLGdCQUFNNkMsV0FBV3pFLE1BQU1jLE1BQU4sS0FBaUIsQ0FBbEM7QUFDQSxnQkFBTTRELFlBQVkxRSxNQUFNTyxJQUFOLENBQVcsVUFBQ0MsSUFBRDtBQUFBLHVCQUFVQSxLQUFLYyxNQUFMLEtBQWdCdEMsa0JBQTFCO0FBQUEsYUFBWCxDQUFsQjtBQUNBLGdCQUFNMkYsaUJBQWlCNUcsV0FBVywyQkFBWCxFQUF3Q3VHLFNBQXhDLENBQXZCOztBQUVBLG1CQUNJO0FBQUE7QUFBQSxrQkFBSyxXQUFXSyxjQUFoQixFQUFnQyxJQUFJLEtBQUt6QixFQUF6QyxFQUE2QyxLQUFLcUIsVUFBbEQ7QUFDSSxvQ0FBQyxnQkFBRDtBQUNJLDhCQUFVLEtBQUs5RSxxQkFEbkI7QUFFSSxrQ0FBYyxDQUFDLE9BQUQsQ0FGbEI7QUFHSSx5Q0FBcUJJLG1CQUh6QjtBQUlJLDJCQUFPRyxLQUpYO0FBS0ksNkJBQVN3RSxPQUxiO0FBTUksOEJBQVUsS0FBS2pGLFFBTm5CO0FBT0ksMEJBQU1RLElBUFY7QUFRSSw2QkFBUyxLQUFLK0M7QUFSbEIsa0JBREo7QUFXSSxvQ0FBQyxNQUFEO0FBQ0kseUNBQXFCakQsbUJBRHpCO0FBRUksOEJBQVU0RSxRQUZkO0FBR0ksK0JBQVdDLFNBSGY7QUFJSSw2QkFBUzlDLE9BSmI7QUFLSSw4QkFBVSxLQUFLRyxNQUxuQjtBQU1JLDZCQUFTc0MsT0FOYjtBQU9JLDhCQUFVLEtBQUt2QztBQVBuQjtBQVhKLGFBREo7QUF1Qkg7Ozs7RUFoWXlCaEUsUzs7QUFBeEJ1QixlLENBUUt1RixZLEdBQTZCO0FBQ2hDbkIsYUFBUy9FLG9CQUR1QjtBQUVoQ2lCLGFBQVMsSUFGdUI7QUFHaEMyRSxlQUFXLEVBSHFCO0FBSWhDWCxnQkFBWW5GLDRCQUpvQjtBQUtoQ29CLGVBQVdSLGtCQUxxQjtBQU1oQ3NFLGdCQUFZakYsdUJBTm9CO0FBT2hDNEYsYUFBU3JHLElBUHVCO0FBUWhDa0csZ0JBQVlsRztBQVJvQixDOzs7QUEyWHhDLGVBQWVNLGVBQWVlLGVBQWYsQ0FBZiIsImZpbGUiOiJDb250ZW50VXBsb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgQ29udGVudCBVcGxvYWRlciBjb21wb25lbnRcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0IG5vb3AgZnJvbSAnbG9kYXNoLm5vb3AnO1xyXG5pbXBvcnQgdW5pcXVlaWQgZnJvbSAnbG9kYXNoLnVuaXF1ZWlkJztcclxuaW1wb3J0IGNsb25lRGVlcCBmcm9tICdsb2Rhc2guY2xvbmVkZWVwJztcclxuaW1wb3J0IEFQSSBmcm9tICcuLi8uLi9hcGknO1xyXG5pbXBvcnQgRHJvcHBhYmxlQ29udGVudCBmcm9tICcuL0Ryb3BwYWJsZUNvbnRlbnQnO1xyXG5pbXBvcnQgRm9vdGVyIGZyb20gJy4vRm9vdGVyJztcclxuaW1wb3J0IG1ha2VSZXNwb25zaXZlIGZyb20gJy4uL21ha2VSZXNwb25zaXZlJztcclxuaW1wb3J0IHsgaXNJRSB9IGZyb20gJy4uLy4uL3V0aWwvYnJvd3Nlcic7XHJcbmltcG9ydCB7XHJcbiAgICBDTElFTlRfTkFNRV9DT05URU5UX1VQTE9BREVSLFxyXG4gICAgREVGQVVMVF9IT1NUTkFNRV9VUExPQUQsXHJcbiAgICBERUZBVUxUX0hPU1ROQU1FX0FQSSxcclxuICAgIFZJRVdfRVJST1IsXHJcbiAgICBWSUVXX1VQTE9BRF9FTVBUWSxcclxuICAgIFZJRVdfVVBMT0FEX0lOX1BST0dSRVNTLFxyXG4gICAgVklFV19VUExPQURfU1VDQ0VTUyxcclxuICAgIFNUQVRVU19QRU5ESU5HLFxyXG4gICAgU1RBVFVTX0lOX1BST0dSRVNTLFxyXG4gICAgU1RBVFVTX0NPTVBMRVRFLFxyXG4gICAgU1RBVFVTX0VSUk9SXHJcbn0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHR5cGUgeyBCb3hJdGVtLCBVcGxvYWRJdGVtLCBWaWV3LCBUb2tlbiB9IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcbmltcG9ydCAnLi4vZm9udHMuc2Nzcyc7XHJcbmltcG9ydCAnLi4vYmFzZS5zY3NzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICByb290Rm9sZGVySWQ6IHN0cmluZyxcclxuICAgIHRva2VuOiBUb2tlbixcclxuICAgIHNoYXJlZExpbms/OiBzdHJpbmcsXHJcbiAgICBzaGFyZWRMaW5rUGFzc3dvcmQ/OiBzdHJpbmcsXHJcbiAgICBhcGlIb3N0OiBzdHJpbmcsXHJcbiAgICB1cGxvYWRIb3N0OiBzdHJpbmcsXHJcbiAgICBjbGllbnROYW1lOiBzdHJpbmcsXHJcbiAgICBjbGFzc05hbWU6IHN0cmluZyxcclxuICAgIGNodW5rZWQ6IGJvb2xlYW4sXHJcbiAgICBmaWxlTGltaXQ6IG51bWJlcixcclxuICAgIG9uQ2xvc2U6IEZ1bmN0aW9uLFxyXG4gICAgb25Db21wbGV0ZTogRnVuY3Rpb24sXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlOiBGdW5jdGlvbixcclxuICAgIGlzU21hbGw6IGJvb2xlYW4sXHJcbiAgICBpc0xhcmdlOiBib29sZWFuLFxyXG4gICAgaXNUb3VjaDogYm9vbGVhbixcclxuICAgIG1lYXN1cmVSZWY6IEZ1bmN0aW9uLFxyXG4gICAgcmVzcG9uc2VGaWx0ZXI/OiBGdW5jdGlvblxyXG59O1xyXG5cclxudHlwZSBEZWZhdWx0UHJvcHMgPSB7fFxyXG4gICAgYXBpSG9zdDogc3RyaW5nLFxyXG4gICAgY2h1bmtlZDogYm9vbGVhbixcclxuICAgIGNsYXNzTmFtZTogc3RyaW5nLFxyXG4gICAgY2xpZW50TmFtZTogc3RyaW5nLFxyXG4gICAgZmlsZUxpbWl0OiBudW1iZXIsXHJcbiAgICB1cGxvYWRIb3N0OiBzdHJpbmcsXHJcbiAgICBvbkNsb3NlOiBGdW5jdGlvbixcclxuICAgIG9uQ29tcGxldGU6IEZ1bmN0aW9uXHJcbnx9O1xyXG5cclxudHlwZSBTdGF0ZSA9IHtcclxuICAgIHZpZXc6IFZpZXcsXHJcbiAgICBpdGVtczogVXBsb2FkSXRlbVtdLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nXHJcbn07XHJcblxyXG5jb25zdCBDSFVOS0VEX1VQTE9BRF9NSU5fU0laRV9CWVRFUyA9IDUyNDI4ODAwOyAvLyA1ME1CXHJcbmNvbnN0IEZJTEVfTElNSVRfREVGQVVMVCA9IDEwMDsgLy8gVXBsb2FkIGF0IG1vc3QgMTAwIGZpbGVzIGF0IG9uY2UgYnkgZGVmYXVsdFxyXG5cclxuY2xhc3MgQ29udGVudFVwbG9hZGVyIGV4dGVuZHMgQ29tcG9uZW50PERlZmF1bHRQcm9wcywgUHJvcHMsIFN0YXRlPiB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgc3RhdGU6IFN0YXRlO1xyXG4gICAgcHJvcHM6IFByb3BzO1xyXG4gICAgdGFibGU6IGFueTtcclxuICAgIHJvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICAgIGFwcEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM6IERlZmF1bHRQcm9wcyA9IHtcclxuICAgICAgICBhcGlIb3N0OiBERUZBVUxUX0hPU1ROQU1FX0FQSSxcclxuICAgICAgICBjaHVua2VkOiB0cnVlLFxyXG4gICAgICAgIGNsYXNzTmFtZTogJycsXHJcbiAgICAgICAgY2xpZW50TmFtZTogQ0xJRU5UX05BTUVfQ09OVEVOVF9VUExPQURFUixcclxuICAgICAgICBmaWxlTGltaXQ6IEZJTEVfTElNSVRfREVGQVVMVCxcclxuICAgICAgICB1cGxvYWRIb3N0OiBERUZBVUxUX0hPU1ROQU1FX1VQTE9BRCxcclxuICAgICAgICBvbkNsb3NlOiBub29wLFxyXG4gICAgICAgIG9uQ29tcGxldGU6IG5vb3BcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBbY29uc3RydWN0b3JdXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Q29udGVudFVwbG9hZGVyfVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgcm9vdEZvbGRlcklkLCB0b2tlbiB9ID0gcHJvcHM7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdmlldzogcm9vdEZvbGRlcklkICYmIHRva2VuID8gVklFV19VUExPQURfRU1QVFkgOiBWSUVXX0VSUk9SLFxyXG4gICAgICAgICAgICBpdGVtczogW10sXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICcnXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmlkID0gdW5pcXVlaWQoJ2JjdV8nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZldGNoZXMgdGhlIHJvb3QgZm9sZGVyIG9uIGxvYWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQgPSAoKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpOiBhbnkpOiBIVE1MRWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5hcHBFbGVtZW50ID0gdGhpcy5yb290RWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhbmQgcmV0dXJuIG5ldyBpbnN0YW5jZSBvZiBBUEkgY3JlYXRvclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0FQSX1cclxuICAgICAqL1xyXG4gICAgY3JlYXRlQVBJRmFjdG9yeSgpOiBBUEkge1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgcm9vdEZvbGRlcklkLFxyXG4gICAgICAgICAgICB0b2tlbixcclxuICAgICAgICAgICAgc2hhcmVkTGluayxcclxuICAgICAgICAgICAgc2hhcmVkTGlua1Bhc3N3b3JkLFxyXG4gICAgICAgICAgICBhcGlIb3N0LFxyXG4gICAgICAgICAgICB1cGxvYWRIb3N0LFxyXG4gICAgICAgICAgICBjbGllbnROYW1lLFxyXG4gICAgICAgICAgICByZXNwb25zZUZpbHRlclxyXG4gICAgICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiBuZXcgQVBJKHtcclxuICAgICAgICAgICAgdG9rZW4sXHJcbiAgICAgICAgICAgIHNoYXJlZExpbmssXHJcbiAgICAgICAgICAgIHNoYXJlZExpbmtQYXNzd29yZCxcclxuICAgICAgICAgICAgYXBpSG9zdCxcclxuICAgICAgICAgICAgdXBsb2FkSG9zdCxcclxuICAgICAgICAgICAgY2xpZW50TmFtZSxcclxuICAgICAgICAgICAgcmVzcG9uc2VGaWx0ZXIsXHJcbiAgICAgICAgICAgIGlkOiBgZm9sZGVyXyR7cm9vdEZvbGRlcklkfWBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNhdmVzIHJlZmVyZW5jZSB0byB0YWJsZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9IHRhYmxlIC0gUmVhY3QgdmlydHVhbGl6ZWQgVGFibGUgY29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICB0YWJsZVJlZiA9ICh0YWJsZTogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy50YWJsZSA9IHRhYmxlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIEZpbGUgQVBJIHRvIHVwbG9hZCBpdGVtcyBhbmQgYWRkcyB0byB1cGxvYWQgcXVldWUuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7RmlsZVtdfSBmaWxlcyAtIEZpbGVzIHRvIGJlIGFkZGVkIHRvIHVwbG9hZCBxdWV1ZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgYWRkRmlsZXNUb1VwbG9hZFF1ZXVlID0gKGZpbGVzOiBGaWxlW10pID0+IHtcclxuICAgICAgICBjb25zdCB7IGNodW5rZWQsIGZpbGVMaW1pdCwgZ2V0TG9jYWxpemVkTWVzc2FnZSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7IHZpZXcsIGl0ZW1zIH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgICAgICAvLyBEaXNhYmxlIGNodW5rZWQgdXBsb2FkIGluIElFMTEgZm9yIG5vdyB1bnRpbCBoYXNoaW5nIGlzIGRvbmUgaW4gYSB3b3JrZXJcclxuICAgICAgICBjb25zdCB1c2VDaHVua2VkID0gY2h1bmtlZCAmJiAhaXNJRSgpO1xyXG5cclxuICAgICAgICAvLyBGaWx0ZXIgb3V0IGZpbGVzIHRoYXQgYXJlIGFscmVhZHkgaW4gdGhlIHVwbG9hZCBxdWV1ZVxyXG4gICAgICAgIGNvbnN0IG5ld0l0ZW1zID0gW10uZmlsdGVyXHJcbiAgICAgICAgICAgIC5jYWxsKGZpbGVzLCAoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBuYW1lIH0gPSBmaWxlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICFpdGVtcy5zb21lKChpdGVtKSA9PiBpdGVtLm5hbWUgPT09IG5hbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENvbnZlcnQgZmlsZXMgZnJvbSB0aGUgZmlsZSBBUEkgdG8gdXBsb2FkIGl0ZW1zXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKGZpbGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgbmFtZSwgc2l6ZSB9ID0gZmlsZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IGV4dGVuc2lvbiBvciB1c2UgZW1wdHkgc3RyaW5nIGlmIGZpbGUgaGFzIG5vIGV4dGVuc2lvblxyXG4gICAgICAgICAgICAgICAgbGV0IGV4dGVuc2lvbiA9IG5hbWUuc3Vic3RyKG5hbWUubGFzdEluZGV4T2YoJy4nKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV4dGVuc2lvbi5sZW5ndGggPT09IG5hbWUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uID0gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuY3JlYXRlQVBJRmFjdG9yeSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFwaTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodXNlQ2h1bmtlZCAmJiBzaXplICYmIHNpemUgPiBDSFVOS0VEX1VQTE9BRF9NSU5fU0laRV9CWVRFUykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwaSA9IGZhY3RvcnkuZ2V0Q2h1bmtlZFVwbG9hZEFQSSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhcGkgPSBmYWN0b3J5LmdldFBsYWluVXBsb2FkQVBJKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXBsb2FkSXRlbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBhcGksXHJcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzczogMCxcclxuICAgICAgICAgICAgICAgICAgICBzaXplLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogU1RBVFVTX1BFTkRJTkdcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVwbG9hZEl0ZW07XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgdXBkYXRlZEl0ZW1zID0gW107XHJcbiAgICAgICAgY29uc3QgdG90YWxOdW1PZkl0ZW1zID0gaXRlbXMubGVuZ3RoICsgbmV3SXRlbXMubGVuZ3RoO1xyXG5cclxuICAgICAgICAvLyBEb24ndCBhZGQgbW9yZSB0aGFuIGZpbGVMaW1pdCAjIG9mIGl0ZW1zXHJcbiAgICAgICAgaWYgKHRvdGFsTnVtT2ZJdGVtcyA+IGZpbGVMaW1pdCkge1xyXG4gICAgICAgICAgICB1cGRhdGVkSXRlbXMgPSBpdGVtcy5jb25jYXQobmV3SXRlbXMuc2xpY2UoMCwgZmlsZUxpbWl0IC0gaXRlbXMubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogZ2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay51cGxvYWQubWVzc2FnZS50b29tYW55ZmlsZXMnLCB7IGZpbGVMaW1pdCB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1cGRhdGVkSXRlbXMgPSBpdGVtcy5jb25jYXQobmV3SXRlbXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3QW5kQ29sbGVjdGlvbih1cGRhdGVkSXRlbXMpO1xyXG5cclxuICAgICAgICAvLyBBdXRvbWF0aWNhbGx5IHN0YXJ0IHVwbG9hZCBpZiBvdGhlciBmaWxlcyBhcmUgYmVpbmcgdXBsb2FkZWRcclxuICAgICAgICBpZiAodmlldyA9PT0gVklFV19VUExPQURfSU5fUFJPR1JFU1MpIHtcclxuICAgICAgICAgICAgdGhpcy51cGxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIHVwbG9hZCBxdWV1ZS4gQ2FuY2VscyB1cGxvYWQgaWYgaW4gcHJvZ3Jlc3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtVcGxvYWRJdGVtfSBpdGVtIC0gSXRlbSB0byByZW1vdmVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUZpbGVGcm9tVXBsb2FkUXVldWUoaXRlbTogVXBsb2FkSXRlbSkge1xyXG4gICAgICAgIGNvbnN0IHsgYXBpIH0gPSBpdGVtO1xyXG4gICAgICAgIGFwaS5jYW5jZWwoKTtcclxuXHJcbiAgICAgICAgY29uc3QgeyBpdGVtcyB9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBpdGVtcy5zcGxpY2UoaXRlbXMuaW5kZXhPZihpdGVtKSwgMSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlVmlld0FuZENvbGxlY3Rpb24oaXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWJvcnRzIHVwbG9hZHMgaW4gcHJvZ3Jlc3MgYW5kIGNsZWFycyB1cGxvYWQgbGlzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgY2FuY2VsID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgaXRlbXMgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgaXRlbXMuZm9yRWFjaCgodXBsb2FkSXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB7IGFwaSwgc3RhdHVzIH0gPSB1cGxvYWRJdGVtO1xyXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSBTVEFUVVNfSU5fUFJPR1JFU1MpIHtcclxuICAgICAgICAgICAgICAgIGFwaS5jYW5jZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBSZXNldCB1cGxvYWQgY29sbGVjdGlvblxyXG4gICAgICAgIHRoaXMudXBkYXRlVmlld0FuZENvbGxlY3Rpb24oW10pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwbG9hZHMgYWxsIGl0ZW1zIGluIHRoZSB1cGxvYWQgY29sbGVjdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgdXBsb2FkID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgaXRlbXMgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgaXRlbXMuZm9yRWFjaCgodXBsb2FkSXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodXBsb2FkSXRlbS5zdGF0dXMgIT09IFNUQVRVU19JTl9QUk9HUkVTUykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWRGaWxlKHVwbG9hZEl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGVscGVyIHRvIHVwbG9hZCBhIHNpbmdsZSBmaWxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7VXBsb2FkSXRlbX0gaXRlbSAtIFVwbG9hZCBpdGVtIG9iamVjdFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgdXBsb2FkRmlsZShpdGVtOiBVcGxvYWRJdGVtKSB7XHJcbiAgICAgICAgY29uc3QgeyByb290Rm9sZGVySWQgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgeyBhcGksIGZpbGUgfSA9IGl0ZW07XHJcblxyXG4gICAgICAgIGFwaS51cGxvYWQoe1xyXG4gICAgICAgICAgICBpZDogcm9vdEZvbGRlcklkLFxyXG4gICAgICAgICAgICBmaWxlLFxyXG4gICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2s6IChlbnRyaWVzKSA9PiB0aGlzLmhhbmRsZVVwbG9hZFN1Y2Nlc3MoaXRlbSwgZW50cmllcyksXHJcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2s6IHRoaXMuaGFuZGxlVXBsb2FkRXJyb3IsXHJcbiAgICAgICAgICAgIHByb2dyZXNzQ2FsbGJhY2s6IChldmVudCkgPT4gdGhpcy5oYW5kbGVVcGxvYWRQcm9ncmVzcyhpdGVtLCBldmVudCksXHJcbiAgICAgICAgICAgIG92ZXJ3cml0ZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdGVtLnN0YXR1cyA9IFNUQVRVU19JTl9QUk9HUkVTUztcclxuICAgICAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGl0ZW1zW2l0ZW1zLmluZGV4T2YoaXRlbSldID0gaXRlbTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3QW5kQ29sbGVjdGlvbihpdGVtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGEgc3VjY2Vzc2Z1bCB1cGxvYWQuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VXBsb2FkSXRlbX0gaXRlbSAtIFVwbG9hZCBpdGVtIGNvcnJlc3BvbmRpbmcgdG8gc3VjY2VzcyBldmVudFxyXG4gICAgICogQHBhcmFtIHtCb3hJdGVtW119IGVudHJpZXMgLSBTdWNjZXNzZnVsbHkgdXBsb2FkZWQgQm94IEZpbGUgb2JqZWN0c1xyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgaGFuZGxlVXBsb2FkU3VjY2VzcyA9IChpdGVtOiBVcGxvYWRJdGVtLCBlbnRyaWVzPzogQm94SXRlbVtdKSA9PiB7XHJcbiAgICAgICAgaXRlbS5wcm9ncmVzcyA9IDEwMDtcclxuICAgICAgICBpdGVtLnN0YXR1cyA9IFNUQVRVU19DT01QTEVURTtcclxuXHJcbiAgICAgICAgLy8gQ2FjaGUgQm94IEZpbGUgb2JqZWN0IG9mIHN1Y2Nlc3NmdWxseSB1cGxvYWRlZCBpdGVtXHJcbiAgICAgICAgaWYgKGVudHJpZXMgJiYgZW50cmllcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgaXRlbS5ib3hGaWxlID0gZW50cmllc1swXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHsgaXRlbXMgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgaXRlbXNbaXRlbXMuaW5kZXhPZihpdGVtKV0gPSBpdGVtO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVZpZXdBbmRDb2xsZWN0aW9uKGl0ZW1zKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHZpZXcgYW5kIGludGVybmFsIHVwbG9hZCBjb2xsZWN0aW9uIHdpdGggcHJvdmlkZWQgaXRlbXMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VXBsb2FkSXRlbVtdfSBpdGVtIC0gSXRtZXMgdG8gdXBkYXRlIGNvbGxlY3Rpb24gd2l0aFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgdXBkYXRlVmlld0FuZENvbGxlY3Rpb24oaXRlbXM6IFVwbG9hZEl0ZW1bXSkge1xyXG4gICAgICAgIGNvbnN0IHsgb25Db21wbGV0ZSB9OiBQcm9wcyA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qgc29tZVVwbG9hZElzSW5Qcm9ncmVzcyA9IGl0ZW1zLnNvbWUoKHVwbG9hZEl0ZW0pID0+IHVwbG9hZEl0ZW0uc3RhdHVzICE9PSBTVEFUVVNfQ09NUExFVEUpO1xyXG4gICAgICAgIGNvbnN0IGFsbEZpbGVzQXJlUGVuZGluZyA9ICFpdGVtcy5zb21lKCh1cGxvYWRJdGVtKSA9PiB1cGxvYWRJdGVtLnN0YXR1cyAhPT0gU1RBVFVTX1BFTkRJTkcpO1xyXG5cclxuICAgICAgICBsZXQgdmlldyA9ICcnO1xyXG4gICAgICAgIGlmICgoaXRlbXMgJiYgaXRlbXMubGVuZ3RoID09PSAwKSB8fCBhbGxGaWxlc0FyZVBlbmRpbmcpIHtcclxuICAgICAgICAgICAgdmlldyA9IFZJRVdfVVBMT0FEX0VNUFRZO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc29tZVVwbG9hZElzSW5Qcm9ncmVzcykge1xyXG4gICAgICAgICAgICB2aWV3ID0gVklFV19VUExPQURfSU5fUFJPR1JFU1M7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmlldyA9IFZJRVdfVVBMT0FEX1NVQ0NFU1M7XHJcbiAgICAgICAgICAgIG9uQ29tcGxldGUoY2xvbmVEZWVwKGl0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5ib3hGaWxlKSkpO1xyXG4gICAgICAgICAgICBpdGVtcyA9IFtdOyAvLyBSZXNldCBpdGVtIGNvbGxlY3Rpb24gYWZ0ZXIgc3VjY2Vzc2Z1bCB1cGxvYWRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICB2aWV3LFxyXG4gICAgICAgICAgICBpdGVtc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyBhbiB1cGxvYWQgZXJyb3IuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZVVwbG9hZEVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICB2aWV3OiBWSUVXX0VSUk9SLFxyXG4gICAgICAgICAgICBpdGVtczogW11cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGFuIHVwbG9hZCBwcm9ncmVzcyBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtVcGxvYWRJdGVtfSBpdGVtIC0gVXBsb2FkIGl0ZW0gY29ycmVzcG9uZGluZyB0byBwcm9ncmVzcyBldmVudFxyXG4gICAgICogQHBhcmFtIHtQcm9ncmVzc0V2ZW50fSBldmVudCAtIFByb2dyZXNzIGV2ZW50XHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBoYW5kbGVVcGxvYWRQcm9ncmVzcyA9IChpdGVtOiBVcGxvYWRJdGVtLCBldmVudDogUHJvZ3Jlc3NFdmVudCkgPT4ge1xyXG4gICAgICAgIGlmICghZXZlbnQubGVuZ3RoQ29tcHV0YWJsZSB8fCBpdGVtLnN0YXR1cyA9PT0gU1RBVFVTX0NPTVBMRVRFKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0ZW0ucHJvZ3Jlc3MgPSBNYXRoLnJvdW5kKGV2ZW50LmxvYWRlZCAvIGV2ZW50LnRvdGFsICogMTAwKTtcclxuICAgICAgICBpdGVtLnN0YXR1cyA9IFNUQVRVU19JTl9QUk9HUkVTUztcclxuXHJcbiAgICAgICAgY29uc3QgeyBpdGVtcyB9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBpdGVtc1tpdGVtcy5pbmRleE9mKGl0ZW0pXSA9IGl0ZW07XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlVmlld0FuZENvbGxlY3Rpb24oaXRlbXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgaXRlbSBiYXNlZCBvbiBpdHMgc3RhdHVzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1VwbG9hZEl0ZW19IGl0ZW0gLSBUaGUgdXBsb2FkIGl0ZW0gdG8gdXBkYXRlXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBvbkNsaWNrID0gKGl0ZW06IFVwbG9hZEl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCB7IHN0YXR1cyB9ID0gaXRlbTtcclxuICAgICAgICBzd2l0Y2ggKHN0YXR1cykge1xyXG4gICAgICAgICAgICBjYXNlIFNUQVRVU19JTl9QUk9HUkVTUzpcclxuICAgICAgICAgICAgY2FzZSBTVEFUVVNfQ09NUExFVEU6XHJcbiAgICAgICAgICAgIGNhc2UgU1RBVFVTX1BFTkRJTkc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZpbGVGcm9tVXBsb2FkUXVldWUoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTVEFUVVNfRVJST1I6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZEZpbGUoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIHRoZSBjb250ZW50IHVwbG9hZGVyXHJcbiAgICAgKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH1cclxuICAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgb25DbG9zZSwgZ2V0TG9jYWxpemVkTWVzc2FnZSwgY2xhc3NOYW1lLCBtZWFzdXJlUmVmLCBpc1RvdWNoIH06IFByb3BzID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7IHZpZXcsIGl0ZW1zLCBtZXNzYWdlIH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICAgICAgY29uc3QgaGFzRmlsZXMgPSBpdGVtcy5sZW5ndGggIT09IDA7XHJcbiAgICAgICAgY29uc3QgaXNMb2FkaW5nID0gaXRlbXMuc29tZSgoaXRlbSkgPT4gaXRlbS5zdGF0dXMgPT09IFNUQVRVU19JTl9QUk9HUkVTUyk7XHJcbiAgICAgICAgY29uc3Qgc3R5bGVDbGFzc05hbWUgPSBjbGFzc05hbWVzKCdidWlrIGJ1aWstYXBwLWVsZW1lbnQgYmN1JywgY2xhc3NOYW1lKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlQ2xhc3NOYW1lfSBpZD17dGhpcy5pZH0gcmVmPXttZWFzdXJlUmVmfT5cclxuICAgICAgICAgICAgICAgIDxEcm9wcGFibGVDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkRmlsZXM9e3RoaXMuYWRkRmlsZXNUb1VwbG9hZFF1ZXVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93ZWRUeXBlcz17WydGaWxlcyddfVxyXG4gICAgICAgICAgICAgICAgICAgIGdldExvY2FsaXplZE1lc3NhZ2U9e2dldExvY2FsaXplZE1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2l0ZW1zfVxyXG4gICAgICAgICAgICAgICAgICAgIGlzVG91Y2g9e2lzVG91Y2h9XHJcbiAgICAgICAgICAgICAgICAgICAgdGFibGVSZWY9e3RoaXMudGFibGVSZWZ9XHJcbiAgICAgICAgICAgICAgICAgICAgdmlldz17dmlld31cclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPEZvb3RlclxyXG4gICAgICAgICAgICAgICAgICAgIGdldExvY2FsaXplZE1lc3NhZ2U9e2dldExvY2FsaXplZE1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzRmlsZXM9e2hhc0ZpbGVzfVxyXG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZz17aXNMb2FkaW5nfVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U9e21lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw9e3RoaXMuY2FuY2VsfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U9e29uQ2xvc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgb25VcGxvYWQ9e3RoaXMudXBsb2FkfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFrZVJlc3BvbnNpdmUoQ29udGVudFVwbG9hZGVyKTtcclxuIl19