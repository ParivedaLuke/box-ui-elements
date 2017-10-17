/**
 * 
 * @file Content Explorer Preview dialog
 * @author Box
 */

import React from 'react';
import Modal from 'react-modal';
import cloneDeep from 'lodash.clonedeep';
import ContentPreview from '../ContentPreview';
import { TYPE_FILE, CLASS_MODAL_CONTENT_FULL_BLEED, CLASS_MODAL_OVERLAY, CLASS_MODAL } from '../../constants';
import Cache from '../../util/Cache';


var PreviewDialog = function PreviewDialog(_ref) {
    var item = _ref.item,
        isOpen = _ref.isOpen,
        getLocalizedMessage = _ref.getLocalizedMessage,
        parentElement = _ref.parentElement,
        token = _ref.token,
        cache = _ref.cache,
        currentCollection = _ref.currentCollection,
        hasPreviewSidebar = _ref.hasPreviewSidebar,
        onCancel = _ref.onCancel,
        onPreview = _ref.onPreview,
        apiHost = _ref.apiHost,
        appHost = _ref.appHost,
        staticHost = _ref.staticHost;
    var items = currentCollection.items;

    var onLoad = function onLoad(data) {
        onPreview(cloneDeep(data));
    };

    if (!item || !items) {
        return null;
    }

    var files = items.filter(function (_ref2) {
        var type = _ref2.type;
        return type === TYPE_FILE;
    });
    return React.createElement(
        Modal,
        {
            isOpen: isOpen,
            parentSelector: function parentSelector() {
                return parentElement;
            },
            portalClassName: CLASS_MODAL + ' buik-modal-preview',
            className: CLASS_MODAL_CONTENT_FULL_BLEED,
            overlayClassName: CLASS_MODAL_OVERLAY,
            contentLabel: getLocalizedMessage('buik.modal.preview.dialog.label'),
            onRequestClose: onCancel
        },
        React.createElement(ContentPreview, {
            skipServerUpdate: true,
            apiHost: apiHost,
            appHost: appHost,
            staticHost: staticHost,
            cache: cache,
            file: item,
            token: token,
            hasHeader: true,
            collection: files,
            showDownload: true,
            onLoad: onLoad,
            onClose: onCancel,
            hasSidebar: hasPreviewSidebar,
            getLocalizedMessage: getLocalizedMessage
        })
    );
};

export default PreviewDialog;