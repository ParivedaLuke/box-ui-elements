/**
 * 
 * @file Content Explorer Create Folder Dialog
 * @author Box
 */

import React from 'react';
import Modal from 'react-modal';
import { Button, PrimaryButton } from '../Button';
import { CLASS_MODAL_CONTENT, CLASS_MODAL_OVERLAY, CLASS_MODAL, ERROR_CODE_ITEM_NAME_TOO_LONG, ERROR_CODE_ITEM_NAME_IN_USE } from '../../constants';

/* eslint-disable jsx-a11y/label-has-for */
var CreateFolderDialog = function CreateFolderDialog(_ref) {
    var isOpen = _ref.isOpen,
        onCreate = _ref.onCreate,
        onCancel = _ref.onCancel,
        getLocalizedMessage = _ref.getLocalizedMessage,
        isLoading = _ref.isLoading,
        errorCode = _ref.errorCode,
        parentElement = _ref.parentElement;

    var textInput = null;
    var error = '';

    /**
     * Appends the extension and calls rename function
     */
    var create = function create() {
        if (textInput && textInput.value) {
            onCreate(textInput.value);
        }
    };

    /**
     * Grabs reference to the input element
     */
    var ref = function ref(input) {
        textInput = input;
        if (textInput instanceof HTMLInputElement) {
            textInput.focus();
            textInput.select();
        }
    };

    /**
     * Handles enter key down
     */
    var onKeyDown = function onKeyDown(_ref2) {
        var key = _ref2.key;

        switch (key) {
            case 'Enter':
                create();
                break;
            default:
                break;
        }
    };

    switch (errorCode) {
        case ERROR_CODE_ITEM_NAME_IN_USE:
            error = getLocalizedMessage('buik.modal.create.dialog.error.inuse');
            break;
        case ERROR_CODE_ITEM_NAME_TOO_LONG:
            error = getLocalizedMessage('buik.modal.create.dialog.error.toolong');
            break;
        default:
            error = errorCode ? getLocalizedMessage('buik.modal.create.dialog.error.invalid') : '';
            break;
    }

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
            contentLabel: getLocalizedMessage('buik.modal.create.dialog.label')
        },
        React.createElement(
            'label',
            null,
            error ? React.createElement(
                'div',
                { className: 'buik-modal-error' },
                error
            ) : null,
            React.createElement(
                'div',
                null,
                getLocalizedMessage('buik.modal.create.dialog.text')
            ),
            React.createElement('input', { type: 'text', required: true, ref: ref, onKeyDown: onKeyDown })
        ),
        React.createElement(
            'div',
            { className: 'buik-modal-btns' },
            React.createElement(
                PrimaryButton,
                { onClick: create, isLoading: isLoading },
                getLocalizedMessage('buik.modal.create.dialog.button')
            ),
            React.createElement(
                Button,
                { onClick: onCancel, isDisabled: isLoading },
                getLocalizedMessage('buik.footer.button.cancel')
            )
        )
    );
};

export default CreateFolderDialog;