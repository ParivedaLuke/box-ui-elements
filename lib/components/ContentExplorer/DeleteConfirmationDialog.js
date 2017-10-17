/**
 * 
 * @file Content Explorer Delete Confirmation Dialog
 * @author Box
 */

import React from 'react';
import Modal from 'react-modal';

import { Button, PrimaryButton } from '../Button';
import { CLASS_MODAL_CONTENT, CLASS_MODAL_OVERLAY, CLASS_MODAL, TYPE_FOLDER } from '../../constants';

var DeleteConfirmationDialog = function DeleteConfirmationDialog(_ref) {
    var isOpen = _ref.isOpen,
        onDelete = _ref.onDelete,
        onCancel = _ref.onCancel,
        item = _ref.item,
        getLocalizedMessage = _ref.getLocalizedMessage,
        isLoading = _ref.isLoading,
        parentElement = _ref.parentElement;
    return React.createElement(
        Modal,
        {
            isOpen: isOpen,
            parentSelector: function parentSelector() {
                return parentElement;
            },
            portalClassName: CLASS_MODAL,
            className: CLASS_MODAL_CONTENT,
            overlayClassName: CLASS_MODAL_OVERLAY,
            onRequestClose: onCancel,
            contentLabel: getLocalizedMessage('buik.modal.delete.confirmation.label')
        },
        React.createElement(
            'div',
            null,
            getLocalizedMessage('buik.modal.delete.confirmation.text' + (item.type === TYPE_FOLDER ? '.folder' : ''), {
                name: item.name
            })
        ),
        React.createElement(
            'div',
            { className: 'buik-modal-btns' },
            React.createElement(
                PrimaryButton,
                { onClick: onDelete, isLoading: isLoading },
                getLocalizedMessage('buik.more.options.delete')
            ),
            React.createElement(
                Button,
                { onClick: onCancel, isDisabled: isLoading, autoFocus: true },
                getLocalizedMessage('buik.footer.button.cancel')
            )
        )
    );
};

export default DeleteConfirmationDialog;