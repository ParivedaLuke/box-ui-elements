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