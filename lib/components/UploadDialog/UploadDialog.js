/**
 * 
 * @file Content Explorer Delete Confirmation Dialog
 * @author Box
 */

import React from 'react';
import Modal from 'react-modal';
import ContentUploader from '../ContentUploader';
import { CLASS_MODAL_CONTENT_FULL_BLEED, CLASS_MODAL_OVERLAY, CLASS_MODAL } from '../../constants';


/* eslint-disable jsx-a11y/label-has-for */
var UploadDialog = function UploadDialog(_ref) {
    var isOpen = _ref.isOpen,
        rootFolderId = _ref.rootFolderId,
        token = _ref.token,
        sharedLink = _ref.sharedLink,
        sharedLinkPassword = _ref.sharedLinkPassword,
        apiHost = _ref.apiHost,
        uploadHost = _ref.uploadHost,
        onClose = _ref.onClose,
        getLocalizedMessage = _ref.getLocalizedMessage,
        parentElement = _ref.parentElement,
        onUpload = _ref.onUpload;
    return React.createElement(
        Modal,
        {
            isOpen: isOpen,
            parentSelector: function parentSelector() {
                return parentElement;
            },
            portalClassName: CLASS_MODAL + ' buik-modal-upload',
            className: CLASS_MODAL_CONTENT_FULL_BLEED,
            overlayClassName: CLASS_MODAL_OVERLAY,
            onRequestClose: onClose,
            contentLabel: getLocalizedMessage('buik.modal.upload.dialog.label')
        },
        React.createElement(ContentUploader, {
            rootFolderId: rootFolderId,
            token: token,
            sharedLink: sharedLink,
            sharedLinkPassword: sharedLinkPassword,
            apiHost: apiHost,
            uploadHost: uploadHost,
            onClose: onClose,
            getLocalizedMessage: getLocalizedMessage,
            onComplete: onUpload
        })
    );
};

export default UploadDialog;